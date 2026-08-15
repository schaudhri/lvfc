import { defineField, defineType } from "sanity";

/**
 * One entry in the external resource directory.
 *
 * `url` is deliberately optional: the source document lists a number of
 * organisations as plain text with no hyperlink, and those render as un-linked
 * names rather than as guesses at the right address.
 */
export const linkItem = defineType({
  name: "linkItem",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      description: "Leave empty if you do not have a verified address — the name will show unlinked.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "url" },
  },
});
