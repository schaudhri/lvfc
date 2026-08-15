import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A blog article.
 *
 * `body` is optional on purpose. A post with a brief but no body renders as an
 * announced, not-yet-written article rather than as a live link to an empty
 * page — a card that goes nowhere reads as a broken promise to a parent.
 */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      description: "Forms the article's web address. Avoid changing it once the post is live.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brief",
      type: "text",
      rows: 3,
      description: "The summary shown on cards, and on the article page before it is written.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authors",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "person" }] })],
      description: "Leave empty for an unsigned club post. Two authors show as a joint byline.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
    }),
    defineField({
      name: "order",
      title: "Position on the blog page",
      type: "number",
      description:
        "Lower numbers come first. The launch articles carry no publication date, so position is set by hand rather than by date.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describes the image for screen readers.",
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "blockContent",
      description: "Leave empty until the article is written — the post will show as coming soon.",
    }),
  ],
  orderings: [
    {
      title: "Page order",
      name: "page",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      media: "heroImage",
      body: "body",
    },
    prepare({ title, category, media, body }) {
      const written = Array.isArray(body) && body.length > 0;
      return {
        title,
        subtitle: `${category ?? "No category"} · ${written ? "Written" : "Coming soon"}`,
        media,
      };
    },
  },
});
