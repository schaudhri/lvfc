/**
 * Blog — the five launch articles named in content pack Section 6, plus the
 * ongoing content framework the client asked the web team to plan against.
 *
 * The content pack supplies a brief for each article, not a written article, so
 * these render as the announced launch line-up with no live link. `url` stays
 * undefined until the real posts land in the CMS — a card with a `#` href reads
 * as a broken promise to a parent who clicks it.
 */

/** Article body. Paragraphs and sub-headings — no rich text yet. */
export type BlogBlock = { type: "paragraph" | "heading"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  /** The brief as written in the content pack. */
  brief: string;
  byline?: string;
  /**
   * The written article. Absent until the club writes it — the post page shows
   * the brief and a "still being written" state instead of inventing copy.
   */
  body?: BlogBlock[];
};

export const launchPosts: BlogPost[] = [
  {
    slug: "welcome-to-the-new-lvfc-website",
    title: "Welcome to the New LVFC Website",
    category: "Club announcement",
    brief:
      "A warm welcome from Director of Football Steve Hamilton and CEO Hamza Syed, introducing the new website, the 2026–27 season and what's new at LVFC.",
    byline: "Steve Hamilton & Hamza Syed",
  },
  {
    slug: "pine-avenue-is-live",
    title: "Pine Avenue Is Live — Meet Our Fourth Branch",
    category: "Branches",
    brief:
      "An introduction to The Box Football Academy on Pine Avenue as LVFC's newest location, with photos of the ground, the coaching team and opening day.",
    /*
     * DRAFT — written by the web team from facts already published on the site
     * (the branch record in `locations.ts` and the academy age groups), purely
     * so the article template can be seen in its published state. It states
     * nothing that isn't already on the Locations page, carries no byline and
     * quotes nobody. Replace with the club's own copy before launch, or delete
     * `body` to put the post back into its "coming soon" state.
     */
    body: [
      {
        type: "paragraph",
        text: "Pine Avenue is open. Our fourth branch in Lahore runs out of The Box, on Pine Avenue near Alhamd Garden, and is taking registrations now.",
      },
      { type: "heading", text: "What runs there" },
      {
        type: "paragraph",
        text: "Pine Avenue opens with four of our five pathway stages: Fundamentals for two-year-olds, Little Robbins at three to four, Pre Academy at five to eight and Foundation at nine to twelve. Youth Development is not running at Pine Avenue yet — players aged thirteen and over train at Gulberg, DHA Phase V or DHA Phase VIII.",
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
  },
  {
    slug: "vsnl-2026",
    title: "VSNL 2026 — Pakistan's Premier Youth National League Returns",
    category: "Competitions",
    brief:
      "A preview of the Virgil Sports National League 2026 season, covering participating clubs, format, fixtures and how to follow the action.",
  },
  {
    slug: "uefa-licensed-coaching-in-pakistan",
    title: "How UEFA-Licensed Coaching Is Changing Youth Football in Pakistan",
    category: "Coaching",
    brief:
      "A thought-leadership piece on the impact of European coaching methodology in Pakistani youth football, covering LVFC's development philosophy and player success stories.",
    byline: "Steve Hamilton",
  },
  {
    slug: "summer-league-2026",
    title: "Summer League 2026 — Preview & Draw",
    category: "Competitions",
    brief:
      "A match-day preview of the LVFC Summer League 2026 across three branches, with team names, age groups and fixtures.",
  },
];

export type ContentStream = {
  cadence: string;
  items: string[];
};

export const contentFramework: ContentStream[] = [
  {
    cadence: "Monthly",
    items: [
      "Match reports from LJPL, ELJPL and VSNL fixtures",
      "Player of the Month spotlight",
      "Branch spotlight, rotating across Gulberg, Phase V, Phase VIII and Pine Avenue",
    ],
  },
  {
    cadence: "Seasonal",
    items: [
      "Trial announcements and season preview",
      "End of season awards and review",
      "Summer camp and holiday programme announcements",
    ],
  },
  {
    cadence: "Ongoing",
    items: [
      "Coaching tips for parents",
      "Player development guides by age group",
      "Partnership and sponsor announcements",
      "Community events and outreach",
    ],
  },
];

export const getPost = (slug: string) => launchPosts.find((post) => post.slug === slug);
