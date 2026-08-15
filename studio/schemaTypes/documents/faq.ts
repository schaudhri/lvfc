import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { defineField, defineType } from "sanity";

/**
 * One question and its answer.
 *
 * `featuredOnLanding` picks the short set shown on the home page. The site used
 * to select those by matching question text, which broke silently the moment a
 * question was reworded — this flag is the fix.
 */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "faqCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredOnLanding",
      title: "Show on the home page",
      type: "boolean",
      description: "The home page shows a short selection. Tick this to include the question there.",
      initialValue: false,
    }),
    defineField({
      name: "landingOrder",
      title: "Position on the home page",
      type: "number",
      description: "The home page runs its own order, which need not match the FAQ page's.",
      hidden: ({ parent }) => !parent?.featuredOnLanding,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Position within its category. Lower numbers come first.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Category, then order",
      name: "grouped",
      by: [
        { field: "category.order", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "question", subtitle: "category.title" },
  },
});
