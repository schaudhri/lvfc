/**
 * Pulls published content out of Sanity and writes it to `src/content/*.json`.
 *
 * The site imports those JSON files synchronously, so nothing in the app has to
 * know about Sanity, wait on a network request or render a loading state. The
 * cost is that publishing takes a rebuild rather than being instant — the right
 * trade for a marketing site, and the reason the JSON is committed: a content
 * change arrives as a reviewable diff.
 *
 * Run with `npm run content:pull`.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createImageUrlBuilder } from "@sanity/image-url";

import { formatBytes, rekey, serialise } from "./lib/shape";
import { client } from "../src/sanity/client";
import {
  BRANCHES_QUERY,
  FAQ_CATEGORIES_QUERY,
  LEADERSHIP_QUERY,
  PATHWAY_QUERY,
  POSTS_QUERY,
  PROGRAMMES_QUERY,
  RESOURCE_GROUPS_QUERY,
  RESOURCE_LINKS_QUERY,
  SETTINGS_QUERY,
} from "../src/sanity/queries";

const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/content");

const builder = createImageUrlBuilder(client);

type SanityImage = { asset?: { _ref?: string }; alt?: string | null } | null | undefined;

/**
 * Turns a Sanity image into the `{ src, alt }` pair the components already take
 * for the placeholder art they are replacing. Width is capped because the
 * originals are full-resolution camera files.
 */
const toImage = (image: SanityImage, width = 1600) => {
  if (!image?.asset?._ref) return undefined;
  return {
    src: builder.image(image as never).width(width).auto("format").url(),
    alt: image.alt ?? "",
  };
};

/** Resolves any images embedded in a portable-text body to real URLs. */
const resolveBody = (body: unknown) => {
  if (!Array.isArray(body)) return undefined;
  const blocks = rekey(body).map((block) => {
    const node = block as { _type?: string };
    if (node._type !== "image") return block;
    const image = toImage(block as SanityImage);
    return image ? { ...node, ...image } : node;
  });
  return blocks.length > 0 ? blocks : undefined;
};

const write = async (name: string, data: unknown) => {
  const file = path.join(OUT_DIR, `${name}.json`);
  await writeFile(file, serialise(data), "utf8");
  const count = Array.isArray(data) ? `${data.length} item(s)` : "1 record";
  console.log(`  ${name}.json — ${count}`);
};

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("Pulling content from Sanity…");

  const [settings, branches, programmes, pathway, leadership, posts, faqs, resourceGroups, resourceLinks] =
    await Promise.all([
      client.fetch(SETTINGS_QUERY),
      client.fetch(BRANCHES_QUERY),
      client.fetch(PROGRAMMES_QUERY),
      client.fetch(PATHWAY_QUERY),
      client.fetch(LEADERSHIP_QUERY),
      client.fetch(POSTS_QUERY),
      client.fetch(FAQ_CATEGORIES_QUERY),
      client.fetch(RESOURCE_GROUPS_QUERY),
      client.fetch(RESOURCE_LINKS_QUERY),
    ]);

  if (!settings) {
    throw new Error("No siteSettings document found — seed the dataset before pulling.");
  }

  await write("settings", {
    ...settings,
    heroImages: (settings.heroImages ?? [])
      .map((image) => toImage(image as SanityImage))
      .filter((image): image is NonNullable<typeof image> => Boolean(image)),
  });

  await write(
    "branches",
    (branches ?? []).map((branch) => ({
      slug: branch.slug,
      name: branch.name,
      shortName: branch.shortName,
      address: branch.address,
      about: branch.about,
      /**
       * A pathway stage reads "Foundation · 9–12 years"; a programme is named on
       * its own. That is how the club writes the list, and the `ages` line —
       * which only a stage carries — is what tells the two apart.
       */
      programmes: (branch.programmes ?? []).map((entry) =>
        entry?.ages ? `${entry.name} · ${entry.ages}` : entry?.name,
      ),
      sessions: branch.sessions ?? [],
      coaches: (branch.coaches ?? []).map((coach) => ({
        name: coach.name,
        role: coach.role,
        alsoRole: coach.alsoRole,
        description: coach.description,
        photo: toImage(coach.photo as SanityImage, 800),
      })),
      image: toImage(branch.image as SanityImage),
      gallery: (branch.gallery ?? [])
        .map((item) => toImage(item as SanityImage))
        .filter(Boolean),
      status: branch.status,
    })),
  );

  await write(
    "programmes",
    (programmes ?? []).map((programme) => ({
      slug: programme.slug,
      ref: programme.ref,
      name: programme.name,
      tag: programme.tag,
      agesLabel: programme.agesLabel,
      summary: programme.summary,
      description: programme.description,
      detailsHeading: programme.detailsHeading,
      details: programme.details,
      ageGroups: programme.ageGroups,
      ageRange: programme.ageRange,
      branchSlugs: programme.branchSlugs,
      bookingKey: programme.bookingKey,
      /** Optional-and-true in the site's type, so false is an absence, not a value. */
      flagship: programme.flagship ? true : undefined,
      season: programme.season,
      image: toImage(programme.image as SanityImage),
      body: resolveBody(programme.body),
    })),
  );

  await write("pathway", pathway ?? []);

  await write(
    "leadership",
    (leadership ?? []).map((person) => ({
      name: person.name,
      role: person.role,
      alsoRole: person.alsoRole,
      description: person.description,
      photo: toImage(person.photo as SanityImage, 800),
    })),
  );

  await write(
    "posts",
    (posts ?? []).map((post) => ({
      slug: post.slug,
      title: post.title,
      category: post.category,
      brief: post.brief,
      /** `array::join` returns an empty string when a post is unsigned. */
      byline: post.byline || undefined,
      publishedAt: post.publishedAt,
      image: toImage(post.heroImage as SanityImage),
      body: resolveBody(post.body),
    })),
  );

  await write("faqs", faqs ?? []);

  await write(
    "resource-groups",
    (resourceGroups ?? []).map((group) => ({
      id: group.id,
      title: group.title,
      description: group.description,
      items: (group.items ?? []).map((item) => {
        const href = item.file?.url ?? item.url ?? undefined;
        return {
          name: item.name,
          kind: item.kind,
          /**
           * Derived, never stored: a resource is live the moment it has a file
           * or a link, and shows as awaiting until then. That is what makes
           * uploading the PDF the only step needed to publish it.
           */
          status: href ? "available" : "awaiting",
          url: href,
          size: formatBytes(item.file?.size),
          note: item.note,
        };
      }),
    })),
  );

  await write("resource-links", resourceLinks ?? []);

  console.log("Done.");
}

main().catch((error) => {
  console.error("\nContent pull failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
