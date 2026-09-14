/**
 * Values that existed only as constants in `src/data` before the CMS, and which
 * the migration has to carry across because nothing else records them.
 *
 * Migration-only. Once the dataset is seeded, Sanity is the source of truth for
 * everything here and this file can go with the rest of the seed scaffolding.
 */

/**
 * The home page FAQ shortlist, in the order it showed them.
 *
 * This was `LANDING_QUESTIONS` in `src/data/faqs.ts`. It matters because the
 * order is not the FAQ page's order — "How is your booking fee structured?"
 * came third on the home page but fourth in its category — so deriving the
 * shortlist from category order alone silently reshuffles it.
 */
export const LANDING_FAQ_ORDER = [
  "How do I register my child?",
  "What age groups do you accept?",
  "How is your booking fee structured?",
  "What should my child wear and bring?",
  "Are there trials for the academy?",
  "What safeguarding policies are in place?",
];

/**
 * The club's WhatsApp number, from `src/data/site.tsx`.
 *
 * Copied rather than imported because that module pulls in React components and
 * icons, which a plain Node script cannot load.
 */
export const WHATSAPP_NUMBER = "923291444333";

/**
 * The one launch article that had a written body, as the paragraph/heading
 * blocks `src/data/blog.ts` used before portable text.
 *
 * Held here rather than read back out of `blog.ts` because that module now
 * reads the JSON these scripts write. Converting its output a second time would
 * treat portable text as the old shape and quietly strip every word — which is
 * exactly what happened once already.
 *
 * DRAFT — written by the web team from facts already published on the site, so
 * the article template could be seen in its published state. It states nothing
 * that isn't on the Locations page, carries no byline and quotes nobody.
 * Replace with the club's own copy.
 */
export const LEGACY_POST_BODIES: Record<string, { type: "paragraph" | "heading"; text: string }[]> = {
  "pine-avenue-is-live": [
    {
      type: "paragraph",
      text: "Pine Avenue is open. Our fourth branch in Lahore runs out of The Box, on Pine Avenue near Alhamd Garden, and is taking registrations now.",
    },
    { type: "heading", text: "What runs there" },
    {
      type: "paragraph",
      text: "Pine Avenue opens with four of our five pathway stages: FUNdamentals for two-year-olds, Mini-Kickers at three to four, Pre-Academy at five to eight and Foundation at nine to twelve. Youth Development is not running at Pine Avenue yet — players aged thirteen and over train at Gulberg, DHA Phase V or DHA Phase VIII.",
    },
    { type: "heading", text: "When it trains" },
    {
      type: "paragraph",
      text: "Sessions run Monday to Wednesday, 6:00–9:00 PM — a longer evening band than our other three branches, which train 6:00–8:00 PM six days a week. Exact times by age group are confirmed at the branch.",
    },
    { type: "heading", text: "Getting a place" },
    {
      type: "paragraph",
      text: "Places are limited while the branch settles in. Register through the booking portal and we will confirm within 24–48 hours, or come and watch a session first — the touchline is the best way to judge whether it suits your child.",
    },
  ],
};
