/**
 * Club-level facts and contact channels.
 *
 * Every value here is transcribed from the client content pack
 * (`docs/LVFC_Website_Content_Pack_July2026`) or the FAQ document
 * (`docs/FAQs_`). Nothing in this file is inferred — if a detail is not in a
 * client document it is left out rather than guessed.
 */

export const club = {
  name: "Lahore Virgil Football Club",
  shortName: "LVFC",
  parent: "Virgil Sports (Pvt.) Ltd.",

  /** Content pack, Section 4 — "How can I contact LVFC?" */
  email: "info@virgilsports.com",
  instagram: {
    handle: "@lahorevirgilfootballacademy",
    url: "https://www.instagram.com/lahorevirgilfootballacademy/",
  },
  bookingPortal: {
    label: "virgil-sports.odoo.com",
    url: "https://virgil-sports.odoo.com",
    /**
     * The programme catalogue. Every "Book A Spot" CTA lands here rather than
     * on the portal root — the root is a shop homepage, so a parent arriving
     * from a programme page had to find the programme list themselves.
     * Per-programme deep links live in `data/booking.ts`.
     */
    programmes: "https://virgil-sports.odoo.com/programmes",
  },

  /**
   * The number parents call to report an absence.
   *
   * The FAQ document prints this as 10 digits (0329144333), one short of a
   * Pakistani mobile. The club's own website contact block gives the general
   * line as 0329-1444333 — 11 digits — so the missing digit is almost certainly
   * a "4". Note the club's live FAQ page repeats the 10-digit version, so the
   * error exists upstream too.
   *
   * TODO: confirm with the club before launch.
   */
  absenceLine: "0329 1444333",
};

/**
 * Safeguarding contacts.
 *
 * The client documents disagree on who the Club Welfare Officer is:
 *   • Safeguarding policy + content pack Section 4 → Abdul Rehman (CWO),
 *     Steve Hamilton (Designated Safeguarding Lead).
 *   • FAQ doc → "Hamza our child welfare officer",
 *     hamza@virgilsports.com / +923091444428.
 *
 * RESOLVED — the client directed us to follow the content pack, so the named
 * roles below are Steve Hamilton (DSL) and Abdul Rehman (CWO). The contact
 * details are the only ones supplied anywhere in the pack, so they are kept but
 * presented as the club's welfare channel rather than attributed to a person.
 */
export const safeguardingContacts = {
  designatedSafeguardingLead: {
    name: "Steve Hamilton",
    role: "Director of Football",
  },
  clubWelfareOfficer: {
    name: "Abdul Rehman",
    role: "Club Welfare Officer",
  },
  /** As printed in the FAQ document. */
  welfareEmail: "hamza@virgilsports.com",
  welfarePhone: "+92 309 1444428",
};

/** Content pack, Section 4 — league registration enquiries. */
export const leaguesContact = {
  name: "Zain Shoukat",
  role: "President of Leagues",
  email: "zain@virgilsports.com",
};
