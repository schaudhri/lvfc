/**
 * The programmes the site presents.
 *
 * SOURCE OF TRUTH: the bookable list on https://virgil-sports.odoo.com/programmes
 * (read 28 July 2026 — see `data/booking.ts` for the verbatim transcription and
 * deep links). The eight portal items are what a parent can actually register
 * for, so they are what the site lists.
 *
 * Two further programmes are described in the client content pack but are not
 * sellable on the portal — Summer Leagues (1.4) and the mass-participation
 * Lahore Virgil Football Club programme (1.2). They are kept here with no
 * `bookingKey`, which renders a "get in touch" CTA instead of "Book A Spot"
 * rather than dropping them from the site or pointing a parent at a product
 * that does not exist.
 *
 * COPY: rewritten in the site's own voice. The portal's descriptions are not
 * reproduced — they refer throughout to "Legends Academy" and "a Legends
 * venue", which is a different club. Facts (names, age ranges) are the
 * portal's; phrasing is ours. Nothing here states a session count, price or
 * venue that isn't in a client document or on the portal.
 */

import { branches } from "@/data/locations";
import type { BookingKey } from "@/data/booking";

export type AgeGroup = {
  name: string;
  ages: string;
  focus: string;
  /** Inclusive age span, so a programme can be located on the pathway. */
  min: number;
  max: number;
};

export type Programme = {
  slug: string;
  /** Content pack numbering, where the programme comes from that document. */
  ref?: string;
  name: string;
  tag: string;
  /** Short age line shown under the title on programme cards. */
  agesLabel: string;
  summary: string;
  description: string;
  /** Omitted where neither the pack nor the portal gives a list worth showing. */
  detailsHeading?: string;
  details?: string[];
  ageGroups?: AgeGroup[];
  /** Inclusive age span the programme serves, used by the age filter. */
  ageRange: { min: number; max: number };
  /**
   * Branch slugs the programme runs at. `undefined` where no source says —
   * those programmes always pass the branch filter and show a "confirm at your
   * branch" note rather than being silently excluded.
   */
  branchSlugs?: string[];
  /**
   * The portal item this books into. Its absence is meaningful: no key means
   * the programme cannot be booked online, and its CTA becomes "Contact us".
   */
  bookingKey?: BookingKey;
  /** Highlighted on cards and in the nav. */
  flagship?: true;
  /**
   * When the programme runs across the year. Sourced per programme: the
   * weekday academy groups follow the "standard 2026–27 season timetable"
   * (`data/schedule.ts`), Competitive and Summer Leagues carry their own dates
   * from the content pack, and Trials run year-round per the FAQ.
   */
  season?: string;
};

/** Age bands offered as filters — aligned to the portal's own age ranges. */
export const ageFilters = [
  { id: "1-4", label: "1–4 years", min: 1, max: 4 },
  { id: "5-8", label: "5–8 years", min: 5, max: 8 },
  { id: "9-12", label: "9–12 years", min: 9, max: 12 },
  { id: "13-15", label: "13–15 years", min: 13, max: 15 },
  { id: "16-plus", label: "16+", min: 16, max: 60 },
];

/**
 * The coaching pathway, from content pack 1.1.
 *
 * This is a *development* model, not a booking one — it is what the club
 * teaches at each stage, and it drives the pathway timeline on the landing and
 * coaching pages. It deliberately still uses the pack's five stage names even
 * though the portal sells four of them under different labels; `locations.ts`
 * records which stages run at which branch against these names.
 */
export const academyAgeGroups: AgeGroup[] = [
  {
    name: "Fundamentals",
    ages: "2 years",
    min: 2,
    max: 2,
    focus: "Fun, play-based introduction to football.",
  },
  {
    name: "Little Robbins",
    ages: "3–4 years",
    min: 3,
    max: 4,
    focus: "Fun, play-based introduction to football, coordination and game confidence.",
  },
  {
    name: "Pre Academy",
    ages: "5–8 years",
    min: 5,
    max: 8,
    focus: "Ball mastery and 1v1 skills.",
  },
  {
    name: "Foundation",
    ages: "9–12 years",
    min: 9,
    max: 12,
    focus: "Technical foundations and small-sided games.",
  },
  {
    name: "Youth Development",
    ages: "13+ years",
    min: 13,
    max: 18,
    focus:
      "Positional awareness, tactical concepts and team shape, transition play and physical conditioning, pre-elite preparation and competitive matchplay.",
  },
];

/**
 * What every weekday academy age group includes.
 *
 * From content pack 1.1, which lists these against the Academy Recreational
 * Programme as a whole. The portal splits that programme into its age groups
 * and sells them separately, so the inclusions carry down to each one.
 */
const academyIncludes = [
  "3 sessions per week",
  "UEFA qualified Director of Coaching",
  "Monthly player progress reports",
  "Kit and training materials (seasonal)",
  "Access to league fixtures",
];

/** Every branch except Pine Avenue, which does not yet run Youth Development. */
const ALL_BRANCHES = ["gulberg", "dha-phase-v", "dha-phase-viii", "pine-avenue"];
const WITHOUT_PINE = ["gulberg", "dha-phase-v", "dha-phase-viii"];

export const programmes: Programme[] = [
  {
    slug: "mini-kickers",
    name: "Mini-Kickers",
    tag: "First touch",
    agesLabel: "1–4",
    summary: "A first taste of football, built almost entirely out of games.",
    description:
      "Where it starts. Mini-Kickers is built around small games rather than drills, so children get moving, get confident and get used to a ball at their feet. The focus is agility, balance and coordination — the things everything else is built on later.",
    detailsHeading: "What's included",
    details: academyIncludes,
    ageRange: { min: 1, max: 4 },
    branchSlugs: ALL_BRANCHES,
    season: "2026–27 season",
    bookingKey: "mini_kickers",
  },
  {
    slug: "pre-academy",
    name: "LVFC Pre-Academy",
    tag: "Ball mastery",
    agesLabel: "5–8",
    summary: "Match-focused sessions that build a young player's confidence on the ball.",
    description:
      "Pre-Academy is where children start to look like footballers. Sessions lean heavily on matches and small-sided games, with room to try things and get them wrong — the quickest way to build the confidence to take someone on.",
    detailsHeading: "What's included",
    details: academyIncludes,
    ageRange: { min: 5, max: 8 },
    branchSlugs: ALL_BRANCHES,
    season: "2026–27 season",
    bookingKey: "pre_academy",
    flagship: true,
  },
  {
    slug: "foundation",
    name: "Join The Foundation",
    tag: "Team play",
    agesLabel: "9–12",
    summary: "Learning to play as part of a team, with the emphasis still on enjoying it.",
    description:
      "Foundation builds on everything learned so far and puts it into a team. Players work on their technique in small-sided games and start to understand their part in a side — without losing the reason they started playing.",
    detailsHeading: "What's included",
    details: academyIncludes,
    ageRange: { min: 9, max: 12 },
    branchSlugs: ALL_BRANCHES,
    season: "2026–27 season",
    bookingKey: "foundation",
  },
  {
    slug: "youth-development",
    name: "Youth Development",
    tag: "Tactical",
    agesLabel: "13–15",
    summary: "Reading the game, handling pressure, and owning a role in the team.",
    description:
      "Youth Development is about decisions. Players work on positional awareness, team shape and how to handle the awkward moments in a match, while taking on a defined role in the side and the fitness to hold it for ninety minutes.",
    detailsHeading: "What's included",
    details: academyIncludes,
    ageRange: { min: 13, max: 15 },
    // Pine Avenue stops at Foundation — see `locations.ts`.
    branchSlugs: WITHOUT_PINE,
    season: "2026–27 season",
    bookingKey: "youth_development",
  },
  {
    slug: "weekend-mornings",
    name: "Weekend Morning Programme",
    tag: "Saturdays & Sundays",
    agesLabel: "2–12",
    summary: "Weekend morning football for families who can't make weekday evenings.",
    description:
      "The same coaching, on a Saturday or Sunday morning instead. Built for families whose week doesn't allow an evening session, with as much attention on character and discipline as on the football.",
    detailsHeading: "At a glance",
    details: [
      "Saturday and Sunday mornings",
      "Ages 2–12",
      "Runs at DHA Phase V and DHA Phase VIII",
    ],
    ageRange: { min: 2, max: 12 },
    // Only these two branches list a weekend programme in the content pack.
    branchSlugs: ["dha-phase-v", "dha-phase-viii"],
    season: "2026–27 season",
    bookingKey: "weekend_morning",
  },
  {
    slug: "competitive",
    ref: "1.3",
    name: "Competitive Programme",
    tag: "Selected squads",
    agesLabel: "U8–U14",
    summary: "Higher intensity and real fixtures, for players selected into a squad.",
    description:
      "For players selected into an LVFC squad. Training is harder, the tactical work goes deeper, and the season is built around preparing for regional and national tournaments under Steve Hamilton, our Director of Football.",
    detailsHeading: "At a glance",
    details: [
      "Bands: U8, U10, U12, U14",
      "September 2026 – May 2027",
      "Five days per week, structured periodisation",
      "One-off fee",
    ],
    // AGE CONFLICT: the content pack says U8–U15, the portal sells "Ages 7-14"
    // in U8/U10/U12/U14 bands. The portal's range is used because it is what a
    // parent can actually book. Confirm which is current with the club.
    ageRange: { min: 7, max: 14 },
    season: "September 2026 – May 2027",
    bookingKey: "competitive",
  },
  {
    slug: "seniors",
    name: "Seniors",
    tag: "16+",
    agesLabel: "16+",
    summary: "The next step for players who've come through the pathway.",
    description:
      "An advanced pathway for players aged 16 and over. Get in touch and we'll talk through where you are and which group fits.",
    // Deliberately no details list — the portal gives one line and no client
    // document covers this programme. Add real content before inventing any.
    ageRange: { min: 16, max: 60 },
    season: "2026–27 season",
    bookingKey: "seniors",
  },
  {
    slug: "trials",
    name: "Trials",
    tag: "Any age",
    agesLabel: "All ages",
    summary: "One, two or three days, to see whether the club suits your child.",
    description:
      "Not sure yet? Book a trial before committing to a programme. Come for one day, two or three, meet the coaches and the group, and decide afterwards. Open to players of any age.",
    detailsHeading: "At a glance",
    details: ["One, two or three days", "Open to players of any age", "Book before you commit"],
    ageRange: { min: 1, max: 60 },
    season: "Year-round",
    bookingKey: "trial",
  },
  {
    slug: "summer-leagues",
    ref: "1.4",
    name: "Summer Leagues",
    tag: "July–August",
    agesLabel: "U8–U14",
    summary: "An organised summer league across three grounds, through the school holidays.",
    description:
      "Every July and August we run a Summer League across our grounds — a proper competitive environment during the school holidays, open to academy and non-academy players alike. Teams play round-robin at Gulberg, DHA Phase V and DHA Phase VIII.",
    detailsHeading: "At a glance",
    details: [
      "July – August, annually",
      "Open to academy and non-academy players",
      "Age groups: U8–U14",
      "Round-robin format",
      "Played at Gulberg, DHA Phase V and DHA Phase VIII",
    ],
    ageRange: { min: 8, max: 14 },
    branchSlugs: WITHOUT_PINE,
    season: "July – August, annually",
  },
  {
    slug: "community",
    ref: "1.2",
    name: "Lahore Virgil Football Club",
    tag: "Open to all",
    agesLabel: "All ages",
    summary: "Mass-participation football across all four branches, open to every age and ability.",
    description:
      "Our mass-participation programme, powered by Virgil Sports, exists to make good coaching reachable across Lahore. Open to boys and girls at any level, running at all four branches — whether you're starting out or just want somewhere supportive to keep playing.",
    detailsHeading: "Key features",
    details: [
      "Open to all ages and abilities",
      "Weekend and weekday session options",
      "UEFA-trained coaching staff",
      "Pathway into the LVFC Academy for high performers",
      "End-of-term showcases and certificates",
    ],
    ageRange: { min: 2, max: 18 },
    branchSlugs: ALL_BRANCHES,
    season: "2026–27 season",
  },
];

/** True when the programme's age span overlaps the selected band. */
export const matchesAge = (programme: Programme, filterId: string) => {
  if (filterId === "all") return true;
  const band = ageFilters.find((filter) => filter.id === filterId);
  if (!band) return true;
  return programme.ageRange.min <= band.max && programme.ageRange.max >= band.min;
};

/** Programmes with no stated branches always pass — we don't guess availability. */
export const matchesBranch = (programme: Programme, branchSlug: string) => {
  if (branchSlug === "all" || !programme.branchSlugs) return true;
  return programme.branchSlugs.includes(branchSlug);
};

/**
 * The age groups a programme actually runs at a given branch.
 *
 * Branches do not all run the full pathway — Pine Avenue stops at Foundation.
 * `locations.ts` is the single source of truth for what runs where; this reads
 * it rather than duplicating it.
 */
export const ageGroupsAtBranch = (programme: Programme, branchSlug: string) => {
  if (!programme.ageGroups) return undefined;
  if (branchSlug === "all") return programme.ageGroups;

  const branch = branches.find((item) => item.slug === branchSlug);
  if (!branch) return programme.ageGroups;

  return programme.ageGroups.filter((group) =>
    branch.programmes.some((entry) => entry.startsWith(group.name)),
  );
};

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);

/**
 * The pathway, with each stage marked for whether this programme covers it.
 *
 * Used to show a programme in context: the full five-stage pathway renders on
 * every programme page, with the stages outside that programme's age span
 * dimmed rather than hidden — a parent can see where their child sits *and*
 * what comes before and after it.
 *
 * Membership is derived from age overlap rather than a hand-kept mapping, so
 * adding a programme or changing an age range can't drift out of sync.
 */
export const pathwayFor = (programme: Programme) =>
  academyAgeGroups.map((group) => ({
    ...group,
    dimmed: !(programme.ageRange.min <= group.max && programme.ageRange.max >= group.min),
  }));
