/**
 * Named club leadership.
 *
 * Roles are quoted from the source; no coaching licences are attributed to any
 * individual because the documents never do. The content pack says only that
 * "all LVFC head coaches have an extensive training and qualifications" — that
 * is a club-level statement, not a per-person credential.
 *
 * Edited in Sanity under "People". Branch coaches are the same document type
 * marked as coaches rather than leadership, and are listed on their branch
 * rather than here.
 */

import raw from "@/content/leadership.json";

/** A resolved Sanity image: a CDN URL and its alternative text. */
export type Image = { src: string; alt: string };

export type Person = {
  name: string;
  role: string;
  /** Secondary role held by the same person, where the documents name one. */
  alsoRole?: string;
  description: string;
  /** Absent until the club supplies a headshot. */
  photo?: Image;
};

export const leadership = raw as Person[];
