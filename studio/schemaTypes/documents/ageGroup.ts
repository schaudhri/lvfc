import { StackCompactIcon } from "@sanity/icons/StackCompact";
import { defineField, defineType } from "sanity";

/**
 * A stage of the coaching pathway.
 *
 * This is a *development* model, not a booking one — it is what the club
 * teaches at each stage, and it drives the pathway timeline on the landing and
 * coaching pages. Branches list which stages they run; programmes list which
 * stages they cover.
 */
export const ageGroup = defineType({
  name: "ageGroup",
  title: "Pathway stage",
  type: "document",
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: 'The stage name, for example "Little Robbins".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ages",
      type: "string",
      description: 'The age line as parents read it, for example "3–4 years".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "min",
      title: "Youngest age",
      type: "number",
      description: "Used to work out which stage a child belongs to. Inclusive.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "max",
      title: "Oldest age",
      type: "number",
      description: "Inclusive. Must not be lower than the youngest age.",
      validation: (rule) =>
        rule.required().custom((max, context) => {
          const min = (context.document as { min?: number } | undefined)?.min;
          if (typeof min === "number" && typeof max === "number" && max < min) {
            return "The oldest age cannot be lower than the youngest age";
          }
          return true;
        }),
    }),
    defineField({
      name: "focus",
      type: "text",
      rows: 3,
      description: "What the coaching concentrates on at this stage.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "inPathway",
      title: "Part of the coaching pathway",
      type: "boolean",
      description:
        "Ticked stages make up the pathway timeline shown on the landing, coaching and programme pages. Untick for an age band a branch offers that sits outside that five-stage story, such as Seniors.",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Position in the pathway, youngest first.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Pathway order",
      name: "pathway",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "ages" },
  },
});
