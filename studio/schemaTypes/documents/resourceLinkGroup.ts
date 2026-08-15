import { LinkIcon } from "@sanity/icons/Link";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A themed section of the external resource directory — governing bodies,
 * safeguarding organisations, and so on.
 *
 * The source document was supplied as a first batch, so expect this list to
 * grow. Entries without a verified address are listed unlinked rather than
 * pointed at a guessed URL.
 */
export const resourceLinkGroup = defineType({
  name: "resourceLinkGroup",
  title: "External link group",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
      validation: (rule) => rule.min(1),
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
    select: { title: "title", items: "items" },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return { title, subtitle: `${count} link${count === 1 ? "" : "s"}` };
    },
  },
});
