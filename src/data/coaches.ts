/**
 * The coaching staff shown on the Coaching page.
 *
 * Photos are the club's portrait shoot. The first five portraits stand in for
 * the leadership on About and the home page (see `coachPhotos`), so they're
 * left out here — the same face shouldn't appear as a named leader on one page
 * and an unnamed coach on another.
 *
 * NAMES, POSITIONS AND ONE-LINERS ARE STILL TO COME FROM THE CLUB. Neither the
 * content packs nor Sanity hold them (checked 14 Sept 2026). The club fills in
 * `docs/coach-details-template.csv`; copy each row into `details` below, keyed
 * by photo filename.
 *
 * Until then every card shows `placeholder` (client request, 14 Sept 2026) —
 * deliberately generic, so it reads as a slot waiting for copy rather than a
 * real person. Delete the fallback before launch if any coach is still missing.
 */

import { coachPhotos, type Image } from "@/data/clubPhotos";

type CoachDetails = {
  name: string;
  /** Position, e.g. "Head Coach, Gulberg". */
  role: string;
  /** One sentence about the coach. */
  oneLiner: string;
};

const details: Record<string, CoachDetails> = {
  // "coach-6.jpg": { name: "", role: "", oneLiner: "" },
};

/** Stand-in copy for a coach the club hasn't described yet. */
const placeholder: CoachDetails = {
  name: "Coach name",
  role: "Position · Branch",
  oneLiner: "A one-line introduction to this coach, from the club, will go here.",
};

export type Coach = { image: Image } & Partial<CoachDetails>;

export const coaches: Coach[] = coachPhotos.slice(5).map((photo) => {
  const file = photo.src.split("/").pop() ?? "";
  const known = details[file];
  return {
    image: { src: photo.src, alt: known ? `${known.name}, ${known.role}` : "LVFC coach" },
    ...(known ?? placeholder),
  };
});
