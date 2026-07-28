/**
 * The card surface.
 *
 * Cards are a filled light-grey panel, not an outlined white one. Before this
 * the site mixed three treatments — hairline-bordered boxes, plain white, and
 * content simply stacked under an image with nothing holding it — so card
 * grids read as loose text floating on the page rather than as objects.
 *
 * `neutral-lightest` (#eee) is the same grey already used for table headers and
 * the safeguarding callout, so cards sit in the existing palette rather than
 * introducing a fourth tone.
 */

/** Card with its own padding — text-only cards. */
export const cardPadded = "rounded-card bg-neutral-lightest p-6 md:p-8";

/**
 * Card whose first child is a flush image. `overflow-hidden` clips the image to
 * the corner radius, so the image must NOT carry its own rounding; the body
 * below supplies the padding instead.
 */
export const cardMedia = "overflow-hidden rounded-card bg-neutral-lightest";

/** Body padding inside a `cardMedia`. */
export const cardBody = "p-6";
