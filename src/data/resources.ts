/**
 * Resources hub — the downloadable documents and forms listed in content pack
 * Section 5. (The external link directory is separate; it lives in the
 * `resourceLinks` export at the bottom of this file.)
 *
 * Most of these files do not exist yet. The content pack states that "PDF files
 * [are] to be uploaded to CMS by Virgil Sports admin team", so each item
 * carries an explicit `status`:
 *   • `available` — we have it and it is linked
 *   • `awaiting`  — the client still owes us the file
 * An `awaiting` item renders as a disabled card, never a dead link.
 *
 * ACRONYM INCONSISTENCY — the source pack calls the elite league "ELJPL" in
 * Section 4 and "ELVJL" in Section 5. "ELJPL" (Elite Lahore Junior Premier
 * League) is expanded in full in Section 4, so it is used here. Confirm.
 */

import { club } from "@/data/club";

export type ResourceStatus = "available" | "awaiting";

export type ResourceItem = {
  name: string;
  /** What the reader gets — shown on the card. */
  kind: "PDF" | "Online form" | "Web page";
  status: ResourceStatus;
  /** Present only when `status` is "available". */
  url?: string;
  /** File weight, shown next to the download once the real file is uploaded. */
  size?: string;
  note?: string;
};

export type ResourceGroup = {
  id: string;
  title: string;
  description: string;
  items: ResourceItem[];
};

export const resourceGroups: ResourceGroup[] = [
  {
    id: "parents",
    title: "For parents & players",
    description:
      "Club policies, forms and guides for families. Everything here is free to download — no account needed.",
    items: [
      {
        name: "LVFC Safeguarding Policy",
        kind: "Web page",
        status: "available",
        url: "/safeguarding",
        note: "Implemented March 2026 · reviewed annually",
      },
      { name: "Code of Conduct — Players", kind: "PDF", status: "awaiting" },
      { name: "Code of Conduct — Parents & Spectators", kind: "PDF", status: "awaiting" },
      { name: "Medical & Consent Form", kind: "PDF", status: "awaiting" },
      { name: "Fee Structure & Payment Guide 2026–27", kind: "PDF", status: "awaiting" },
      { name: "LVFC Academy Programme Overview", kind: "PDF", status: "awaiting" },
      { name: "Player Development Framework", kind: "PDF", status: "awaiting" },
    ],
  },
  {
    id: "clubs",
    title: "For clubs & partners",
    description:
      "League documentation for visiting clubs, and partnership information for sponsors.",
    items: [
      { name: "ELJPL Club Registration Pack", kind: "PDF", status: "awaiting" },
      { name: "ELJPL Season Guidelines", kind: "PDF", status: "awaiting" },
      { name: "Sponsorship & Partnership Opportunities", kind: "PDF", status: "awaiting" },
    ],
  },
  {
    id: "forms",
    title: "Forms",
    description: "Register a player, apply for a trial, or get in touch about a partnership.",
    items: [
      {
        // The FAQ states registration is done through the Odoo booking portal,
        // so the player registration form points there.
        name: "Player Registration Form",
        kind: "Online form",
        status: "available",
        url: club.bookingPortal.programmes,
        note: "Opens the LVFC booking portal",
      },
      { name: "Trial Registration Form", kind: "Online form", status: "awaiting" },
      { name: "Club Invitation / Application Form (ELJPL)", kind: "Online form", status: "awaiting" },
      { name: "Sponsorship Enquiry Form", kind: "Online form", status: "awaiting" },
    ],
  },
];

/**
 * External resource directory, transcribed from `docs/Resource Center..docx`.
 *
 * Items without a `url` are listed in the source document as plain text with no
 * hyperlink — they render as un-linked names rather than guessed URLs. The
 * document's author signs off "this is my first batch", so more links are
 * expected.
 *
 * OMITTED — the source lists "Spanish FA" but hyperlinks it to fff.fr, the
 * French FA's URL (a copy-paste error). It is listed here without a link rather
 * than pointing at the wrong federation.
 */
export const resourceLinks = [
  {
    title: "Federations & governing bodies",
    items: [
      { name: "FIFA", url: "https://www.fifatrainingcentre.com/en/" },
      { name: "UEFA", url: "https://www.uefa.com/" },
      { name: "Pakistan FA", url: "https://pff.com.pk/" },
      { name: "English FA", url: "https://www.thefa.com/" },
      { name: "Scottish FA", url: "https://www.scottishfa.co.uk/en/coaches/coach-education" },
      { name: "Irish FA", url: "https://www.irishfa.com/" },
      { name: "French FA", url: "https://www.fff.fr/" },
      { name: "Spanish FA" },
      { name: "Football Federation Australia" },
      { name: "United States Soccer Federation" },
      { name: "US Club Soccer" },
      { name: "United Soccer Coaches" },
    ],
  },
  {
    title: "Professional leadership & management",
    items: [
      { name: "Women in Football" },
      { name: "League Managers Association" },
      { name: "Sports Management Worldwide" },
      { name: "Life after Professional Sports" },
      { name: "The Professional Body of Sport and Leadership" },
      { name: "UK Professional Development Academy" },
      { name: "USSF Coach Mentor Program" },
    ],
  },
  {
    title: "Tactical football organisations",
    items: [
      { name: "The Coaching Manual" },
      { name: "Keep it on the Deck" },
      { name: "Institute of Football Coaches and Teachers" },
      { name: "ProConnect Coaching" },
      { name: "World Class Coaching" },
      { name: "The Coaches Link" },
      { name: "On the Ball" },
      { name: "English FA Coach Index" },
    ],
  },
  {
    title: "Safeguarding",
    items: [
      { name: "NSPCC" },
      { name: "UK Anti-Doping" },
      { name: "The Alliance for Child Protection in Humanitarian Action" },
    ],
  },
  {
    title: "Female advocacy",
    items: [
      { name: "Women's Coaches Community" },
      { name: "Women's Sports Foundation" },
      { name: "#CorrectTheInternet Campaign" },
      { name: "Level Playing Field" },
      { name: "Fearless Capable" },
      { name: "Women Onside" },
      { name: "Coaching Her" },
    ],
  },
  {
    title: "Inclusivity",
    items: [
      { name: "Kick it Out" },
      { name: "Nujum Sports" },
      { name: "International Sport and Culture Association" },
    ],
  },
  {
    title: "Video & stat analysis",
    items: [
      { name: "The Video Analyst" },
      { name: "The Association of Professional Football Analysis" },
      { name: "ProZone" },
    ],
  },
  {
    title: "Committee memberships",
    items: [
      { name: "USC Committee for Asian Pacific Islander Minority Heritage" },
      { name: "USC Committee for Native American Minorities" },
    ],
  },
  {
    title: "Sustainability",
    items: [{ name: "UK Sport — Powering Success" }],
  },
];
