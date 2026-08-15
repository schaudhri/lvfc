/**
 * Club-level facts and contact channels.
 *
 * Every value here came from the client content pack
 * (`docs/LVFC_Website_Content_Pack_July2026`) or the FAQ document (`docs/FAQs_`).
 * Nothing is inferred — if a detail is not in a client document it is left out
 * rather than guessed.
 *
 * Edited in Sanity under "Club settings", a single record.
 */

import settings from "@/content/settings.json";
import type { Image } from "@/data/people";

type Contact = { name: string; role: string };

type Settings = {
  name: string;
  shortName: string;
  parent: string;
  /** The rotating background behind the homepage headline. Empty until the club uploads photos. */
  heroImages?: Image[];
  email: string;
  /**
   * The number parents call to report an absence.
   *
   * The FAQ document prints this as 10 digits (0329144333), one short of a
   * Pakistani mobile. The club's own website contact block gives the general
   * line as 0329-1444333 — 11 digits — so the missing digit is almost certainly
   * a "4". The club's live FAQ page repeats the 10-digit version, so the error
   * exists upstream too.
   *
   * TODO: confirm with the club before launch.
   */
  absenceLine: string;
  /**
   * The same line in the international format wa.me requires: country code, no
   * leading zero, digits only. Cleared in Sanity, the floating WhatsApp button
   * disappears from every page.
   */
  whatsappNumber: string;
  instagram: { handle: string; url: string };
  bookingPortal: {
    label: string;
    url: string;
    /**
     * The programme catalogue. Every "Book A Spot" CTA lands here rather than
     * on the portal root — the root is a shop homepage, so a parent arriving
     * from a programme page had to find the programme list themselves.
     * Per-programme deep links live in `data/booking.ts`.
     */
    programmes: string;
  };
  safeguarding: {
    designatedSafeguardingLead: Contact;
    clubWelfareOfficer: Contact;
    welfareEmail: string;
    welfarePhone: string;
  };
  leaguesContact: Contact & { email: string };
};

const site = settings as Settings;

export const club = {
  name: site.name,
  shortName: site.shortName,
  parent: site.parent,
  email: site.email,
  instagram: site.instagram,
  bookingPortal: site.bookingPortal,
  absenceLine: site.absenceLine,
  whatsappNumber: site.whatsappNumber,
};

/**
 * The homepage hero background. One photo renders static; from two onward
 * `Header54` rotates through them automatically.
 */
export const heroImages: Image[] = site.heroImages ?? [];

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
 * roles are Steve Hamilton (DSL) and Abdul Rehman (CWO). The contact details
 * are the only ones supplied anywhere in the pack, so they are kept but
 * presented as the club's welfare channel rather than attributed to a person.
 */
export const safeguardingContacts = site.safeguarding;

/** Content pack, Section 4 — league registration enquiries. */
export const leaguesContact = site.leaguesContact;
