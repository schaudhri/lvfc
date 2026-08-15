import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

/** Blog taxonomy — "Club announcement", "Coaching", "Competitions", "Branches". */
export const category = defineType({
  name: "category",
  title: "Blog category",
  type: "document",
  icon: TagIcon,
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
  ],
  preview: {
    select: { title: "title" },
  },
});
