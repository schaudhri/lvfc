import { FolderIcon } from "@sanity/icons/Folder";
import { defineField, defineType } from "sanity";

/** A section of the resources hub — "For parents & players", "Forms", and so on. */
export const resourceGroup = defineType({
  name: "resourceGroup",
  title: "Resource group",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "One or two sentences introducing this group of documents.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
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
    select: { title: "title", subtitle: "description" },
  },
});
