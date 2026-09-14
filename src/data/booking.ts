/**
 * The bookable programme catalogue on the Odoo portal.
 *
 * Transcribed first-hand from https://virgil-sports.odoo.com/programmes on
 * 28 July 2026 — names, age lines and deep links are verbatim from the live
 * page, not from the content pack.
 *
 * WHY THIS FILE EXISTS SEPARATELY FROM `programmes.ts`: the two disagree.
 * `programmes.ts` holds the four programmes the client's content pack
 * describes (Academy Recreational, Lahore Virgil Football Club, Competitive
 * Training, Summer Leagues). The portal instead sells eight items, most of
 * which are what the content pack calls *age groups inside* the Academy
 * Recreational Programme. Until the club says which structure the site should
 * present, this file is the booking layer only — it is what a CTA links to,
 * not what the site claims to offer.
 *
 * FLAG: the portal's own copy refers to "Legends Academy" and "a Legends
 * venue", and its footer contact is info@legendsacademypakistan.com. That
 * suggests this Odoo instance may be carried over from another club rather
 * than being finished LVFC content. Worth confirming before treating the
 * portal as the source of truth for programme naming.
 */

import { club } from "@/data/club";

/** The `club_programme` query key each item is deep-linked by. */
export type BookingKey =
  | "mini_kickers"
  | "pre_academy"
  | "foundation"
  | "youth_development"
  | "weekend_morning"
  | "trial"
  | "seniors"
  | "competitive";

export type BookableProgramme = {
  key: BookingKey;
  /** Exactly as the portal writes it. */
  name: string;
  ages: string;
  description: string;
  url: string;
};

/**
 * Trials sit on a different product (`trial-session-1716`); everything else
 * hangs off `programme-991`. Both are copied from the live page rather than
 * constructed, so a change to the portal's product ids is caught here.
 */
const PROGRAMME_PRODUCT = `${club.bookingPortal.url}/shop/shop-programme-programme-991`;
const TRIAL_PRODUCT = `${club.bookingPortal.url}/shop/shop-programme-trial-trial-session-1716`;

export const bookableProgrammes: BookableProgramme[] = [
  {
    key: "mini_kickers",
    name: "Mini-Kickers",
    ages: "Ages 3-4",
    description:
      "Mini-Kickers revolves around lots of minigames, establishing a strong foundation in ABCs (Agility, Balance and Coordination).",
    url: `${PROGRAMME_PRODUCT}?club_programme=mini_kickers`,
  },
  {
    key: "pre_academy",
    name: "Pre-Academy",
    ages: "Ages 5-8",
    description:
      "Pre-Academy nurtures a love for the game with plenty of match-focused activities and freedom for self-expression, building the confidence of a footballer.",
    url: `${PROGRAMME_PRODUCT}?club_programme=pre_academy`,
  },
  {
    key: "foundation",
    name: "Foundation",
    ages: "Ages 9-12",
    description:
      "Building on the FUNdamentals, Foundation ensures players can work effectively in a team environment, with the main emphasis on fun.",
    url: `${PROGRAMME_PRODUCT}?club_programme=foundation`,
  },
  {
    key: "youth_development",
    name: "Youth Development",
    ages: "Ages 13-15",
    description:
      "Youth Development focuses on getting players more tactically aware and learning to handle tricky game situations while developing their role within the team.",
    url: `${PROGRAMME_PRODUCT}?club_programme=youth_development`,
  },
  {
    key: "weekend_morning",
    name: "Weekend Morning Program",
    ages: "Ages 2-12",
    description:
      "Saturday and Sunday morning academy programme focused on character, discipline, and football skills for players aged 2 to 12.",
    url: `${PROGRAMME_PRODUCT}?club_programme=weekend_morning`,
  },
  {
    key: "trial",
    name: "Trials",
    ages: "Ages: All",
    description:
      "Book a one, two, or three day trial before choosing a regular programme. Trials are open to players of any age.",
    url: `${TRIAL_PRODUCT}?club_programme=trial`,
  },
  {
    key: "seniors",
    name: "Seniors",
    ages: "Ages 16+",
    description: "Advanced age-group pathway for 16+.",
    url: `${PROGRAMME_PRODUCT}?club_programme=seniors`,
  },
  {
    key: "competitive",
    name: "Competitive Programme",
    ages: "Ages 7-14",
    description: "Competitive programme bands U8, U10, U12, U14 with one-off fee.",
    url: `${PROGRAMME_PRODUCT}?club_programme=competitive`,
  },
];

/**
 * Every Book A Spot lands on the portal's home page for now (client direction,
 * 14 Sept 2026): the catalogue and every product deep link above have
 * returned 404 since at least 4 Sept. The map stays so deep links can come
 * back once the portal's products are live again — restore the lookup here.
 */
export const getBookingUrl = (_key?: BookingKey) => club.bookingPortal.url;
