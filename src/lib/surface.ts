/**
 * The card surface.
 *
 * Cards are a filled panel, not an outlined box. Before this the site mixed
 * three treatments — hairline-bordered boxes, plain white, and content simply
 * stacked under an image with nothing holding it — so card grids read as loose
 * text floating on the page rather than as objects.
 *
 * Media cards are dark (stakeholder direction, Aug 2026): a flush photograph on
 * top of a dark redcurrant body, with a white pill CTA and a "Learn more" link
 * at the foot. Uses `brand.maroon` (#530E16) — the same dark accent already on
 * headers and filter pills — rather than inventing a colour outside the
 * approved palette.
 *
 * Text inside a `cardMedia` inherits white — use `text-white/70` and friends for
 * secondary copy rather than the `scheme-text` tokens, which assume a light
 * background. Buttons inside one must use `variant="alternate"` (white pill), as
 * the default champagne CTA is tuned for light sections.
 */

/**
 * Text-only card, with its own padding.
 *
 * Deliberately still light: these are panels of body copy sitting inside light
 * sections, not the image-led cards the dark treatment is for.
 */
export const cardPadded = "rounded-card bg-neutral-lightest p-6 md:p-8";

/**
 * Card whose first child is a flush image. `overflow-hidden` clips the image to
 * the corner radius, so the image must NOT carry its own rounding; the body
 * below supplies the padding instead.
 */
export const cardMedia =
  // `index.css` colours every heading maroon globally, which is unreadable on
  // the dark body — headings are forced back to white here rather than at each
  // call site, so the token owns the whole treatment.
  "overflow-hidden rounded-card bg-brand-maroon text-white [&_:is(h1,h2,h3,h4,h5,h6)]:text-white";

/** Body padding inside a `cardMedia`. */
export const cardBody = "p-6";
