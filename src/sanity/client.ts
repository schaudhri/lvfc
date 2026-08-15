/**
 * Sanity connection details.
 *
 * This module is only ever imported by the build-time scripts in `scripts/` —
 * nothing in the app imports it, so `@sanity/client` never reaches the browser
 * bundle. The site itself reads the JSON those scripts write.
 */

import { createClient } from "@sanity/client";

export const projectId = "6pbvdivo";
export const dataset = "production";
export const apiVersion = "2026-08-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  /** Always read through the API, never the cache — a build must not ship stale content. */
  useCdn: false,
  /** Drafts are work in progress. Only published documents belong on the site. */
  perspective: "published",
  /**
   * No token: the dataset is public and this client only ever reads. The one
   * write in the project — the initial seed — goes through the Sanity CLI,
   * which carries its own credentials.
   */
});
