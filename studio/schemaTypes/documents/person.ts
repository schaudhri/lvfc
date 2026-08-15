import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

/**
 * Club leadership and branch coaches.
 *
 * Do not attribute a coaching licence to an individual unless a club document
 * names it for that person. The club's position is a collective one — that all
 * head coaches are qualified — and it is stated at club level, not per person.
 */
export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      description: "Leadership appear on the About and Coaching pages; coaches appear on their branch.",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Coach", value: "coach" },
        ],
        layout: "radio",
      },
      initialValue: "coach",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: 'Job title as the club writes it, for example "Director of Football".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alsoRole",
      title: "Second role",
      type: "string",
      description: "Only where the person formally holds a second title.",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      description: "What this person is responsible for.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describes the photo for screen readers.",
        }),
      ],
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Position in the list. Lower numbers come first.",
    }),
  ],
  orderings: [
    {
      title: "Listed order",
      name: "listed",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
