import { defineField, defineType } from "sanity";

/**
 * One training band on one day at one branch.
 *
 * The site previously stored this as a fixed six-slot array per branch, where a
 * `null` slot meant "no session". Modelling it as a list of real sessions means
 * a day with no football is simply absent — and it lets a branch run on Sunday,
 * which the old fixed Monday–Saturday shape could not express.
 */
export const sessionBand = defineType({
  name: "sessionBand",
  title: "Session",
  type: "object",
  fields: [
    defineField({
      name: "day",
      type: "string",
      options: {
        list: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "time",
      type: "string",
      description: 'The band as parents should read it — for example "6:00–8:00 PM".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      type: "string",
      description: "Optional qualifier shown with this band, if it differs from the branch norm.",
    }),
  ],
  preview: {
    select: { title: "day", subtitle: "time" },
  },
});
