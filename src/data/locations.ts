/**
 * The LVFC branches.
 *
 * `programmes` is per-branch and deliberately not uniform — Gulberg has no
 * Weekend Morning Programme, and Pine Avenue does not yet run Youth
 * Development. In Sanity each entry is a reference to a pathway stage or a
 * programme, so a branch can no longer advertise something that does not
 * exist; the "· 9–12 years" suffix is the stage's own age line, added when the
 * content is pulled.
 *
 * Edited in Sanity under "Branches". `sessions` is the branch's weekly
 * timetable — see `data/schedule.ts`, which reads it.
 */

import raw from "@/content/branches.json";
import type { Image, Person } from "@/data/people";
import { branchPhotos, type GalleryPhoto } from "@/data/clubPhotos";

/** One training band on one day. Days with no session are simply not listed. */
export type Session = {
  day: string;
  time: string;
  note?: string;
};

export type Branch = {
  slug: string;
  name: string;
  /** Short form used in filter pills and schedule rows. */
  shortName: string;
  address: string;
  about: string;
  programmes: string[];
  sessions: Session[];
  /** The coaching team based here. Absent until the club supplies bios. */
  coaches?: Person[];
  image?: Image;
  gallery?: Image[];
  /** Set only where the branch carries a status line. */
  status?: { label: string; detail: string };
};

export const branches = raw as Branch[];

export const getBranch = (slug: string) => branches.find((branch) => branch.slug === slug);

/** A branch's photos: its Studio gallery once uploaded, else the club's local picks. */
export const branchGallery = (branch: Branch): GalleryPhoto[] =>
  branch.gallery && branch.gallery.length > 0 ? branch.gallery : (branchPhotos[branch.slug] ?? []);

/** The one photo that stands for a branch — hero, card, menu. */
export const branchPhoto = (branch: Branch): Image | undefined =>
  branch.image ?? branchGallery(branch)[0];

/**
 * Photos from several branches, taken in turn — one from each, then the next
 * from each — so a programme's slider doesn't show one ground for ten frames.
 */
export const photosAcross = (list: Branch[], limit = 16): GalleryPhoto[] => {
  const sets = list.map(branchGallery);
  const out: GalleryPhoto[] = [];
  for (let i = 0; out.length < limit && sets.some((set) => i < set.length); i++) {
    for (const set of sets) if (set[i] && out.length < limit) out.push(set[i]);
  }
  return out;
};
