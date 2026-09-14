/**
 * The card surface.
 *
 * Cards are a filled panel, not an outlined box. Before this the site mixed
 * three treatments — hairline-bordered boxes, plain white, and content simply
 * stacked under an image with nothing holding it — so card grids read as loose
 * text floating on the page rather than as objects.
 *
 * Cards are white on the sandstone page (Figma card structure, node 19:818,
 * Sept 2026): a flush photograph, then the age line ABOVE the title in
 * terracotta, a short description, and a terracotta "Book A Spot" on the left
 * with "Learn more" pushed right. This replaced the flame (#D35A42) body with
 * white text, which failed AA contrast.
 *
 * Text inside a card is dark — the `scheme-text` tokens apply as they do on the
 * page. Buttons inside one use the default (terracotta) variant.
 */

/**
 * Text-only card, with its own padding.
 *
 * Deliberately still light: these are panels of body copy sitting inside light
 * sections, not the image-led cards the dark treatment is for.
 */
export const cardPadded = "rounded-card bg-white p-6 md:p-8";

/**
 * Card whose first child is a flush image. `overflow-hidden` clips the image to
 * the corner radius, so the image must NOT carry its own rounding; the body
 * below supplies the padding instead.
 */
export const cardMedia = "overflow-hidden rounded-card bg-white text-brand-midnight";

/** Body padding inside a `cardMedia`. */
export const cardBody = "p-6";
