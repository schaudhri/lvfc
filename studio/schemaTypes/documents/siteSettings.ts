import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Club-level facts and contact channels — the single settings document.
 *
 * Everything here is a published club detail that appears in the footer, the
 * contact page or a call to action. If a detail is not confirmed by the club,
 * leave it empty rather than guessing: several of these values are printed
 * inconsistently across the club's own source documents.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Club settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "homepage", title: "Homepage" },
    { name: "contact", title: "Contact" },
    { name: "booking", title: "Booking" },
    { name: "safeguarding", title: "Safeguarding" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent company",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "heroImages",
      title: "Homepage hero images",
      type: "array",
      group: "homepage",
      description:
        "The background behind the homepage headline. One photo shows as a static background; add three or four and they rotate automatically every few seconds.",
      of: [
        defineArrayMember({
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
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "absenceLine",
      title: "Absence line",
      type: "string",
      group: "contact",
      description:
        "The number parents call to report an absence. The club's FAQ document prints this one digit short of a Pakistani mobile — confirm the full number with the club before changing it.",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description:
        'International format, digits only, no "+" or spaces — Pakistan 0329 1444333 becomes "923291444333". Clear this field to hide the floating WhatsApp button across the whole site.',
      validation: (rule) =>
        rule.custom((value) =>
          !value || /^\d{8,15}$/.test(value)
            ? true
            : 'Digits only, no "+" or spaces — for example "923291444333"',
        ),
    }),
    defineField({
      name: "instagram",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "handle", type: "string" }),
        defineField({ name: "url", type: "url" }),
      ],
    }),
    defineField({
      name: "bookingPortal",
      title: "Booking portal",
      type: "object",
      group: "booking",
      description: "Where every 'Book A Spot' button sends a parent.",
      fields: [
        defineField({
          name: "label",
          type: "string",
          description: "How the portal address is written on the page.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "url",
          title: "Portal home",
          type: "url",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "programmes",
          title: "Programme catalogue",
          type: "url",
          description:
            "The programme list, not the portal home — the home page is a shop front, and a parent arriving from a programme page would have to find the list themselves.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "safeguarding",
      type: "object",
      group: "safeguarding",
      description:
        "The club's source documents disagree on who holds these roles. The content pack is the agreed authority: Steve Hamilton as Designated Safeguarding Lead, Abdul Rehman as Club Welfare Officer.",
      fields: [
        defineField({
          name: "designatedSafeguardingLead",
          title: "Designated Safeguarding Lead",
          type: "reference",
          to: [{ type: "person" }],
        }),
        defineField({
          name: "clubWelfareOfficer",
          title: "Club Welfare Officer",
          type: "reference",
          to: [{ type: "person" }],
        }),
        defineField({
          name: "welfareEmail",
          type: "string",
          description:
            "The club's welfare channel. Presented as a club address rather than attributed to a named person, because the source documents attribute it inconsistently.",
          validation: (rule) => rule.email(),
        }),
        defineField({
          name: "welfarePhone",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "leaguesContact",
      title: "Leagues contact",
      type: "object",
      group: "contact",
      description: "Who handles club league registration enquiries.",
      fields: [
        defineField({
          name: "person",
          type: "reference",
          to: [{ type: "person" }],
        }),
        defineField({
          name: "email",
          type: "string",
          validation: (rule) => rule.email(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Club settings" }),
  },
});
