/**
 * Resources hub — the downloadable documents and forms from content pack
 * Section 5. (The external link directory is separate; it lives in the
 * `resourceLinks` export at the bottom of this file.)
 *
 * Many of these files did not exist when the site was built: the content pack
 * states that "PDF files [are] to be uploaded to CMS by Virgil Sports admin
 * team". That upload is now the whole of the work — `status` is derived from
 * whether a resource has a file or a link, so an item is:
 *   • `available` — it has one, and it is linked
 *   • `awaiting`  — it does not, and it renders as a disabled card
 * An `awaiting` item is never a dead link, and nobody has to remember to flip a
 * switch after uploading.
 *
 * ACRONYM INCONSISTENCY — the source pack calls the elite league "ELJPL" in
 * Section 4 and "ELVJL" in Section 5. "ELJPL" (Elite Lahore Junior Premier
 * League) is expanded in full in Section 4, so it is used here. Confirm.
 *
 * Edited in Sanity under "Resources".
 */

import groupsRaw from "@/content/resource-groups.json";
import linksRaw from "@/content/resource-links.json";

export type ResourceStatus = "available" | "awaiting";

export type ResourceItem = {
  name: string;
  /** What the reader gets — shown on the card. */
  kind: "PDF" | "Online form" | "Web page";
  status: ResourceStatus;
  /** Present only when `status` is "available". */
  url?: string;
  /** File weight, read from the uploaded file rather than typed by hand. */
  size?: string;
  note?: string;
};

export type ResourceGroup = {
  id: string;
  title: string;
  description: string;
  items: ResourceItem[];
};

export const resourceGroups = groupsRaw as ResourceGroup[];

export type ResourceLinkGroup = {
  title: string;
  items: { name: string; url?: string }[];
};

/**
 * External resource directory, transcribed from `docs/Resource Center..docx`.
 *
 * Items without a `url` are listed in the source document as plain text with no
 * hyperlink — they render as un-linked names rather than guessed URLs. The
 * document's author signs off "this is my first batch", so more are expected.
 *
 * OMITTED — the source lists "Spanish FA" but hyperlinks it to fff.fr, the
 * French FA's URL (a copy-paste error). It is listed without a link rather than
 * pointing at the wrong federation.
 */
export const resourceLinks = linksRaw as ResourceLinkGroup[];
