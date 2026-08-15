import { PinIcon } from "@sanity/icons/Pin";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One of the club's grounds.
 *
 * `programmes` and a programme's own "Runs at" list answer different questions
 * and are both maintained by hand, as they were before: this field is the
 * branch's own noticeboard of what it offers, while "Runs at" drives the filter
 * on the programmes page. Keep them consistent when you change either.
 */
export const branch = defineType({
  name: "branch",
  title: "Branch",
  type: "document",
  icon: PinIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "schedule", title: "Schedule" },
    { name: "people", title: "People" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      type: "string",
      group: "content",
      description: 'Used in filter pills and schedule rows, for example "Phase V".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "about",
      type: "text",
      rows: 5,
      group: "content",
      description: "A paragraph introducing the ground and the area it serves.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "The main photograph of the ground.",
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
      name: "gallery",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
            }),
          ],
        }),
      ],
      description: "Further photographs of the ground and sessions.",
    }),
    defineField({
      name: "programmes",
      title: "What runs here",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "ageGroup" }, { type: "programme" }],
        }),
      ],
      description: "The pathway stages and programmes this branch offers.",
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "status",
      type: "statusNote",
      group: "content",
      description: "Only set this where the branch needs a flag, such as a new ground taking registrations.",
    }),
    defineField({
      name: "sessions",
      title: "Weekly sessions",
      type: "array",
      group: "schedule",
      of: [defineArrayMember({ type: "sessionBand" })],
      description:
        "Add one entry per day the branch trains. Days you leave out show as no session on the timetable.",
      validation: (rule) =>
        rule.custom((sessions) => {
          if (!Array.isArray(sessions)) return true;
          const days = sessions.map((s) => (s as { day?: string })?.day).filter(Boolean);
          const duplicate = days.find((day, index) => days.indexOf(day) !== index);
          return duplicate ? `${duplicate} is listed more than once` : true;
        }),
    }),
    defineField({
      name: "coaches",
      type: "array",
      group: "people",
      of: [defineArrayMember({ type: "reference", to: [{ type: "person" }] })],
      description: "The coaching team based at this branch.",
    }),
    defineField({
      name: "order",
      type: "number",
      group: "content",
      description: "Position in the branches list. Lower numbers come first.",
      validation: (rule) => rule.required(),
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
    select: { title: "name", subtitle: "address", media: "image" },
  },
});
