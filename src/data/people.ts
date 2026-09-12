/**
 * Named club leadership.
 *
 * Names, roles, bios and emails are from the club's "Virgil Sports — Leadership
 * Bios" (Sept 2026), reproduced as written. Credentials such as Steve
 * Hamilton's UEFA B licence come from that document; don't add any it doesn't
 * state.
 *
 * NOTE: `src/content/leadership.json` was edited locally with these bios and
 * has not been pushed to Sanity, so `npm run content:pull` (which runs as part
 * of `npm run build`) will overwrite it with the older Sanity copy.
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
  /** Direct contact, shown as a mail link under the bio. */
  email?: string;
  /** Absent until the club supplies a headshot. */
  photo?: Image;
};

export const leadership = raw as Person[];
