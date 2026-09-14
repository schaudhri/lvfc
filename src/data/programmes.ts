/**
 * The programmes the site presents.
 *
 * SOURCE OF TRUTH for what is sellable: the bookable list on
 * https://virgil-sports.odoo.com/programmes (read 28 July 2026 — see
 * `data/booking.ts` for the verbatim transcription and deep links). The portal
 * items are what a parent can actually register for.
 *
 * Two programmes are described in the client content pack but are not sellable
 * on the portal — Summer Leagues (1.4) and the mass-participation Lahore Virgil
 * Football Club programme (1.2). They carry no `bookingKey`, which renders a
 * "get in touch" CTA instead of "Book A Spot" rather than dropping them from
 * the site or pointing a parent at a product that does not exist.
 *
 * COPY: written in the site's own voice. The portal's descriptions are not
 * reproduced — they refer throughout to "Legends Academy" and "a Legends
 * venue", which is a different club.
 *
 * Edited in Sanity under "Programmes". Do not set a booking key for a
 * programme the portal does not sell.
 */

import type { PortableTextBlock } from "@portabletext/types";

import pathwayRaw from "@/content/pathway.json";
import programmesRaw from "@/content/programmes.json";
import type { Image } from "@/data/people";
import type { BookingKey } from "@/data/booking";
import { clubPhotos } from "@/data/clubPhotos";

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
  /** When the programme runs across the year. */
  season?: string;
  /** Card thumbnail and programme page header. */
  image?: Image;
  /** The full programme page. Absent where the description stands alone. */
  body?: PortableTextBlock[];
};

/**
 * An age label as a parent reads it: "2" → "2 years", "3–4" → "3–4 years",
 * "16+" → "16+ years". Labels that already carry their own unit ("U8–U14",
 * "All ages") pass through untouched.
 */
export const formatAges = (label: string) =>
  /^\d+(?:[–-]\d+|\+)?$/.test(label) ? `${label} years` : label;

/** Age bands offered as filters — one per pathway stage up to 12. */
export const ageFilters = [
  { id: "2", label: "2 years", min: 2, max: 2 },
  { id: "3-4", label: "3–4 years", min: 3, max: 4 },
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
 * coaching pages. Branches record which stages they run against these names.
 *
 * Edited in Sanity under "Pathway stages". Stages marked as outside the
 * pathway — Seniors — are offered at branches but are not part of this story,
 * so they do not appear here.
 */
export const academyAgeGroups = pathwayRaw as AgeGroup[];

export const programmes = programmesRaw as Programme[];

/**
 * The pathway stage a programme sits on: the one stage its whole age range
 * fits inside. Programmes that span several stages (Weekend Mornings, 2–12) or
 * sit outside the pathway (Seniors, Trials) have none, and are presented as
 * "Also at the club" rather than being forced onto a stage.
 */
export const stageFor = (programme: Programme) =>
  academyAgeGroups.find(
    (group) => programme.ageRange.min >= group.min && programme.ageRange.max <= group.max,
  );

/** One programme per pathway stage, in stage order. */
export const pathwayProgrammes = academyAgeGroups
  .map((group) => ({ group, programme: programmes.find((p) => stageFor(p) === group) }))
  .filter((entry): entry is { group: AgeGroup; programme: Programme } => Boolean(entry.programme));

/** Everything that isn't a pathway stage: alternatives, squads, trials. */
export const otherProgrammes = programmes.filter((programme) => !stageFor(programme));

/**
 * A programme's card image: its own once uploaded, otherwise a club photo tied
 * to the programme itself rather than to its position in a (possibly filtered)
 * list, so the same programme shows the same picture everywhere.
 */
export const programmeImage = (programme: Programme) =>
  programme.image ?? clubPhotos[Math.max(0, programmes.indexOf(programme)) % clubPhotos.length];

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

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);

/**
 * Old programme addresses and where they moved to, so shared or bookmarked
 * links keep working. Pre-Academy became Pre Club (content pack, 1 Aug 2026).
 */
export const movedProgrammeSlugs: Record<string, string> = {
  "pre-academy": "pre-club",
};

/**
 * The programmes a branch runs.
 *
 * Reuses `matchesBranch`, so a programme with no stated branches appears at
 * every branch with the same "confirm locally" caveat it carries on the
 * programmes index — rather than being silently dropped from a branch page.
 */
export const programmesAtBranch = (branchSlug: string) =>
  programmes.filter((programme) => matchesBranch(programme, branchSlug));

/**
 * The pathway, with each stage marked for whether this programme covers it.
 *
 * Used to show a programme in context: the full pathway renders on every
 * programme page, with the stages outside that programme's age span dimmed
 * rather than hidden — a parent can see where their child sits *and* what comes
 * before and after it.
 *
 * Membership is derived from age overlap rather than a hand-kept mapping, so
 * adding a programme or changing an age range can't drift out of sync.
 */
export const pathwayFor = (programme: Programme) =>
  academyAgeGroups.map((group) => ({
    ...group,
    dimmed: !(programme.ageRange.min <= group.max && programme.ageRange.max >= group.min),
  }));
