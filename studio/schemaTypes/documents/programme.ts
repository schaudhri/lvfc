import { StarIcon } from "@sanity/icons/Star";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A programme a parent can register for.
 *
 * `bookingKey` is the join to the club's booking portal. Without one, the
 * programme's call to action becomes "Contact us" instead of "Book A Spot" —
 * which is correct for programmes the portal does not sell, and is why the
 * field is optional. Never set a key for a programme that has no portal item.
 */
export const programme = defineType({
  name: "programme",
  title: "Programme",
  type: "document",
  icon: StarIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
    { name: "booking", title: "Booking" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      group: "content",
      description: "Forms the programme page's web address.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      type: "string",
      group: "content",
      description: 'Two or three words shown on the card, for example "Ball mastery".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "agesLabel",
      title: "Ages label",
      type: "string",
      group: "content",
      description: 'The short age line on the card, for example "5–8".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 2,
      group: "content",
      description: "One sentence, shown on the programme card.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 5,
      group: "content",
      description: "The opening paragraph on the programme's own page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "Used as the card thumbnail and at the top of the programme page.",
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
      group: "content",
      description: "The full programme page. Leave empty to show the description alone.",
    }),
    defineField({
      name: "detailsHeading",
      type: "string",
      group: "details",
      description: 'Heading above the list below, for example "What\'s included".',
    }),
    defineField({
      name: "details",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "details",
      description: "What a place on this programme includes. Leave empty to hide the list.",
    }),
    defineField({
      name: "ageRange",
      title: "Age range",
      type: "object",
      group: "details",
      description: "Drives the age filter on the programmes page. Inclusive at both ends.",
      fields: [
        defineField({
          name: "min",
          title: "Youngest",
          type: "number",
          validation: (rule) => rule.required().min(0),
        }),
        defineField({
          name: "max",
          title: "Oldest",
          type: "number",
          validation: (rule) => rule.required().min(0),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ageGroups",
      title: "Pathway stages covered",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "ageGroup" }] })],
      group: "details",
      description: "Leave empty where the programme does not break down into stages.",
    }),
    defineField({
      name: "branches",
      title: "Runs at",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "branch" }] })],
      group: "details",
      description:
        "Which branches run this programme. Leave empty if it is not settled — the programme then shows at every branch with a note to confirm locally, rather than being hidden.",
    }),
    defineField({
      name: "season",
      type: "string",
      group: "details",
      description: 'When it runs across the year, for example "2026–27 season".',
    }),
    defineField({
      name: "ref",
      title: "Content pack reference",
      type: "string",
      group: "details",
      description: "Section number in the club's content pack, where it came from one.",
    }),
    defineField({
      name: "order",
      type: "number",
      group: "details",
      description: "Position in the programmes list. Lower numbers come first.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "flagship",
      type: "boolean",
      group: "booking",
      description: "Highlighted on cards and in the main navigation.",
      initialValue: false,
    }),
    defineField({
      name: "bookingKey",
      title: "Booking portal item",
      type: "string",
      group: "booking",
      description:
        'The portal item this books into. Leave empty if the portal does not sell it — the button then reads "Contact us" rather than sending a parent to a product that does not exist.',
      options: {
        list: [
          { title: "Mini-Kickers", value: "mini_kickers" },
          { title: "Pre-Academy", value: "pre_academy" },
          { title: "Foundation", value: "foundation" },
          { title: "Youth Development", value: "youth_development" },
          { title: "Weekend Morning", value: "weekend_morning" },
          { title: "Trial", value: "trial" },
          { title: "Seniors", value: "seniors" },
          { title: "Competitive", value: "competitive" },
        ],
      },
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
    select: {
      title: "name",
      agesLabel: "agesLabel",
      media: "image",
      bookingKey: "bookingKey",
    },
    prepare({ title, agesLabel, media, bookingKey }) {
      return {
        title,
        subtitle: `Ages ${agesLabel} · ${bookingKey ? "Bookable" : "Enquiry only"}`,
        media,
      };
    },
  },
});
