/**
 * One-shot migration: turns today's `src/data` literals into an NDJSON file for
 * `sanity dataset import`.
 *
 * This runs ONCE, before the data modules are rewired to read from JSON. After
 * that the modules source their values from Sanity, so re-running this would
 * simply write the dataset back to itself — with fresh ids, duplicating every
 * document. There is a guard for that below, but the honest rule is: run it
 * once, then delete nothing and never run it again.
 *
 * Ids are random rather than derived from slugs. Slug-shaped ids look tidy and
 * then trap you the first time the club renames something.
 *
 * Run with `npm run content:seed`, then import the file it writes.
 */

import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { LANDING_FAQ_ORDER, LEGACY_POST_BODIES, WHATSAPP_NUMBER } from "./lib/legacy";
import { launchPosts } from "../src/data/blog";
import { club, leaguesContact, safeguardingContacts } from "../src/data/club";
import { faqCategories } from "../src/data/faqs";
import { branches } from "../src/data/locations";
import { leadership } from "../src/data/people";
import { academyAgeGroups, programmes } from "../src/data/programmes";
import { resourceGroups, resourceLinks } from "../src/data/resources";
import { scheduleDays, weeklySchedule } from "../src/data/schedule";

const OUT_FILE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "./seed.ndjson",
);

/**
 * The migration has already run. `src/data` now reads the JSON pulled from
 * Sanity, so running this again would read the dataset back out, mint fresh ids
 * for every document and import a complete duplicate set. Kept as the record of
 * how the content got there, behind a flag so it cannot happen by accident.
 */
if (!process.argv.includes("--force")) {
  console.error(
    [
      "The dataset has already been seeded — refusing to run.",
      "",
      "Re-importing the file this writes would duplicate all 95 documents,",
      "because the ids are regenerated on every run.",
      "",
      "Pass --force only if you are rebuilding an empty dataset from scratch.",
    ].join("\n"),
  );
  process.exit(1);
}

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Doc = Record<string, unknown> & { _id: string; _type: string };

const docs: Doc[] = [];
const add = (doc: Doc) => {
  docs.push(doc);
  return doc._id;
};

const ref = (id: string) => ({ _type: "reference", _ref: id, _key: key() });
const slug = (current: string) => ({ _type: "slug", current });

// ---------------------------------------------------------------------------
// Pathway stages
//
// The five stages of the coaching pathway, plus Seniors. Seniors is not part of
// the pathway story the site tells, but branches list it alongside the stages
// and write it the same way ("Seniors · 16+ years"), so it is modelled as a
// stage that sits outside the pathway rather than as a special case.
// ---------------------------------------------------------------------------

const ageGroupIds = new Map<string, string>();

academyAgeGroups.forEach((group, index) => {
  const id = add({
    _id: randomUUID(),
    _type: "ageGroup",
    name: group.name,
    slug: slug(slugify(group.name)),
    ages: group.ages,
    min: group.min,
    max: group.max,
    focus: group.focus,
    inPathway: true,
    order: index + 1,
  });
  ageGroupIds.set(group.name, id);
});

ageGroupIds.set(
  "Seniors",
  add({
    _id: randomUUID(),
    _type: "ageGroup",
    name: "Seniors",
    slug: slug("seniors-stage"),
    ages: "16+ years",
    min: 16,
    max: 60,
    focus: "The next step for players who've come through the pathway.",
    inPathway: false,
    order: academyAgeGroups.length + 1,
  }),
);

// ---------------------------------------------------------------------------
// People
// ---------------------------------------------------------------------------

const personIds = new Map<string, string>();

leadership.forEach((individual, index) => {
  const id = add({
    _id: randomUUID(),
    _type: "person",
    name: individual.name,
    slug: slug(slugify(individual.name)),
    kind: "leadership",
    role: individual.role,
    alsoRole: individual.alsoRole,
    description: individual.description,
    order: index + 1,
  });
  personIds.set(individual.name, id);
});

// ---------------------------------------------------------------------------
// Programmes and branches
//
// These reference each other, so both sets of ids are minted before either
// document is built.
// ---------------------------------------------------------------------------

const programmeIds = new Map<string, string>(programmes.map((p) => [p.slug, randomUUID()]));
const branchIds = new Map<string, string>(branches.map((b) => [b.slug, randomUUID()]));
const programmeIdByName = new Map<string, string>(
  programmes.map((p) => [p.name, programmeIds.get(p.slug)!]),
);

programmes.forEach((programme, index) => {
  add({
    _id: programmeIds.get(programme.slug)!,
    _type: "programme",
    name: programme.name,
    slug: slug(programme.slug),
    ref: programme.ref,
    tag: programme.tag,
    agesLabel: programme.agesLabel,
    summary: programme.summary,
    description: programme.description,
    detailsHeading: programme.detailsHeading,
    details: programme.details,
    ageRange: programme.ageRange,
    ageGroups: programme.ageGroups?.map((group) => ref(ageGroupIds.get(group.name)!)),
    branches: programme.branchSlugs?.map((branchSlug) => ref(branchIds.get(branchSlug)!)),
    bookingKey: programme.bookingKey,
    flagship: Boolean(programme.flagship),
    season: programme.season,
    order: index + 1,
  });
});

/**
 * Branch listings are written as "Foundation · 9–12 years" for a pathway stage
 * and "Weekend Morning Programme" for a programme. Split on the separator and
 * look the name up as a stage first, then as a programme.
 */
const resolveOffering = (entry: string) => {
  const name = entry.split("·")[0]!.trim();
  const ageGroupId = ageGroupIds.get(name);
  if (ageGroupId) return ref(ageGroupId);
  const programmeId = programmeIdByName.get(name);
  if (programmeId) return ref(programmeId);
  throw new Error(`Branch lists "${entry}" but no stage or programme is named "${name}"`);
};

branches.forEach((branch, index) => {
  const cells = weeklySchedule[branch.slug] ?? [];
  add({
    _id: branchIds.get(branch.slug)!,
    _type: "branch",
    name: branch.name,
    shortName: branch.shortName,
    slug: slug(branch.slug),
    address: branch.address,
    about: branch.about,
    programmes: branch.programmes.map(resolveOffering),
    /** A blank cell in the source table means no session, so it is simply not listed. */
    sessions: scheduleDays
      .map((day, dayIndex) => ({ day, time: cells[dayIndex] }))
      .filter((session): session is { day: string; time: string } => Boolean(session.time))
      .map((session) => ({ _type: "sessionBand", _key: key(), ...session })),
    status: branch.status ? { _type: "statusNote", ...branch.status } : undefined,
    order: index + 1,
  });
});

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

const categoryIds = new Map<string, string>();

[...new Set(launchPosts.map((post) => post.category))].forEach((title) => {
  categoryIds.set(
    title,
    add({
      _id: randomUUID(),
      _type: "category",
      title,
      slug: slug(slugify(title)),
    }),
  );
});

launchPosts.forEach((post, index) => {
  const authors = post.byline
    ?.split("&")
    .map((name) => name.trim())
    .map((name) => personIds.get(name))
    .filter((id): id is string => Boolean(id))
    .map(ref);

  add({
    _id: randomUUID(),
    _type: "post",
    title: post.title,
    slug: slug(post.slug),
    category: { _type: "reference", _ref: categoryIds.get(post.category)! },
    brief: post.brief,
    authors,
    order: index + 1,
    body: LEGACY_POST_BODIES[post.slug]?.map((block) => ({
      _type: "block",
      _key: key(),
      style: block.type === "heading" ? "h2" : "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: block.text, marks: [] }],
    })),
  });
});

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

/** The home page's shortlist, in the order it shows them. */
const landingPosition = new Map(LANDING_FAQ_ORDER.map((question, index) => [question, index + 1]));

faqCategories.forEach((category, categoryIndex) => {
  const categoryId = add({
    _id: randomUUID(),
    _type: "faqCategory",
    title: category.title,
    slug: slug(category.id),
    order: categoryIndex + 1,
  });

  category.questions.forEach((item, index) => {
    add({
      _id: randomUUID(),
      _type: "faq",
      question: item.question,
      answer: item.answer,
      category: { _type: "reference", _ref: categoryId },
      featuredOnLanding: landingPosition.has(item.question),
      landingOrder: landingPosition.get(item.question),
      order: index + 1,
    });
  });
});

// ---------------------------------------------------------------------------
// Resources
//
// Items the club has not supplied yet are seeded with no file and no link,
// which is exactly what makes them render as awaiting. Uploading the PDF in the
// Studio is the whole of the work needed to publish one.
// ---------------------------------------------------------------------------

resourceGroups.forEach((group, groupIndex) => {
  const groupId = add({
    _id: randomUUID(),
    _type: "resourceGroup",
    title: group.title,
    slug: slug(group.id),
    description: group.description,
    order: groupIndex + 1,
  });

  group.items.forEach((item, index) => {
    add({
      _id: randomUUID(),
      _type: "resource",
      name: item.name,
      group: { _type: "reference", _ref: groupId },
      kind: item.kind,
      url: item.kind === "PDF" ? undefined : item.url,
      note: item.note,
      order: index + 1,
    });
  });
});

resourceLinks.forEach((group, index) => {
  add({
    _id: randomUUID(),
    _type: "resourceLinkGroup",
    title: group.title,
    order: index + 1,
    items: group.items.map((item) => ({
      _type: "linkItem",
      _key: key(),
      name: item.name,
      url: "url" in item ? item.url : undefined,
    })),
  });
});

// ---------------------------------------------------------------------------
// Club settings
//
// The one document with a fixed id: the Studio pins it as a single record, so
// it has to be findable by a known id rather than by query.
// ---------------------------------------------------------------------------

add({
  _id: "siteSettings",
  _type: "siteSettings",
  name: club.name,
  shortName: club.shortName,
  parent: club.parent,
  email: club.email,
  absenceLine: club.absenceLine,
  whatsappNumber: WHATSAPP_NUMBER,
  instagram: club.instagram,
  bookingPortal: club.bookingPortal,
  safeguarding: {
    designatedSafeguardingLead: {
      _type: "reference",
      _ref: personIds.get(safeguardingContacts.designatedSafeguardingLead.name)!,
    },
    clubWelfareOfficer: {
      _type: "reference",
      _ref: personIds.get(safeguardingContacts.clubWelfareOfficer.name)!,
    },
    welfareEmail: safeguardingContacts.welfareEmail,
    welfarePhone: safeguardingContacts.welfarePhone,
  },
  leaguesContact: {
    person: { _type: "reference", _ref: personIds.get(leaguesContact.name)! },
    email: leaguesContact.email,
  },
});

// ---------------------------------------------------------------------------

/** `undefined` is not valid JSON; dropping the keys keeps the fields unset. */
const stripUndefined = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripUndefined);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, val]) => val !== undefined)
        .map(([k, val]) => [k, stripUndefined(val)]),
    );
  }
  return value;
};

const ndjson = docs.map((doc) => JSON.stringify(stripUndefined(doc))).join("\n");
await writeFile(OUT_FILE, `${ndjson}\n`, "utf8");

const counts = docs.reduce<Record<string, number>>((acc, doc) => {
  acc[doc._type] = (acc[doc._type] ?? 0) + 1;
  return acc;
}, {});

console.log(`Wrote ${docs.length} documents to ${path.relative(process.cwd(), OUT_FILE)}`);
Object.entries(counts)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([type, count]) => console.log(`  ${type.padEnd(20)} ${count}`));
console.log("\nImport with:");
console.log("  cd studio && npx sanity dataset import ../scripts/seed.ndjson production");
