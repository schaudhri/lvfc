import { FolderIcon } from "@sanity/icons/Folder";
import { defineField, defineType } from "sanity";

/** A heading on the FAQ page — "Enrolment & registration", "Fees", and so on. */
export const faqCategory = defineType({
  name: "faqCategory",
  title: "FAQ category",
  type: "document",
  icon: FolderIcon,
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
      description: "Used as the anchor link to this section of the FAQ page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Position on the FAQ page. Lower numbers come first.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Page order",
      name: "page",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "order" },
  },
});
