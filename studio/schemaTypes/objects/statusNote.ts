import { defineField, defineType } from "sanity";

/** A short status flag on a branch — "Now enrolling", and the line beneath it. */
export const statusNote = defineType({
  name: "statusNote",
  title: "Status",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      description: 'Short badge text, for example "Now enrolling".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      type: "text",
      rows: 2,
      description: "One sentence explaining the status to a parent.",
      validation: (rule) => rule.required(),
    }),
  ],
});
