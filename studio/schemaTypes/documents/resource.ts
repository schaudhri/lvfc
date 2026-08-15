import { DocumentPdfIcon } from "@sanity/icons/DocumentPdf";
import { defineField, defineType } from "sanity";

/**
 * A downloadable document, form or linked page in the resources hub.
 *
 * There is deliberately no "status" field. A resource is live once it has a
 * file or a link, and shows as "coming soon" until then — so uploading the PDF
 * is the only step needed to publish it. The file size shown on the site is
 * read from the uploaded file itself and never typed by hand.
 */
export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      description:
        'The document title as it should appear on the card. Use "ELJPL" for the Elite Lahore Junior Premier League — some source documents write "ELVJL", which is the same league.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "group",
      type: "reference",
      to: [{ type: "resourceGroup" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      description: "What the reader gets when they click.",
      options: {
        list: [
          { title: "PDF", value: "PDF" },
          { title: "Online form", value: "Online form" },
          { title: "Web page", value: "Web page" },
        ],
        layout: "radio",
      },
      initialValue: "PDF",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      type: "file",
      description:
        "Upload the PDF here. Until a file is uploaded the card shows as coming soon rather than as a broken link.",
      hidden: ({ parent }) => parent?.kind !== "PDF",
    }),
    defineField({
      name: "url",
      type: "url",
      description: "Where this form or page lives. Leave empty until you have the real address.",
      hidden: ({ parent }) => parent?.kind === "PDF",
      validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto"], allowRelative: true }),
    }),
    defineField({
      name: "note",
      type: "string",
      description: 'Optional line under the title, for example "Opens the LVFC booking portal".',
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Position within its group. Lower numbers come first.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Group, then order",
      name: "grouped",
      by: [
        { field: "group.order", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      kind: "kind",
      file: "file.asset",
      url: "url",
      group: "group.title",
    },
    prepare({ title, kind, file, url, group }) {
      const live = Boolean(file || url);
      return {
        title,
        subtitle: `${group ?? "No group"} · ${kind} · ${live ? "Live" : "Coming soon"}`,
      };
    },
  },
});
