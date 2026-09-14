import { club } from "@/data/club";
import type { ButtonProps } from "@/components/ui/button";
import { getBookingUrl, type BookingKey } from "@/data/booking";

/**
 * Canonical calls to action.
 *
 * Before this existed the site used 36 distinct labels for roughly 8 actions —
 * "Find your programme" and "Find a Programme" appeared on the same page — and
 * none of them had a destination. Every CTA now comes from here, so a label or
 * a target is changed in exactly one place.
 *
 * Spread and override at the call site for styling:
 *   <Button {...cta.bookASpot} variant="alternate" />
 *
 * "Book A Spot" is kept verbatim: it is the client's own label, and the content
 * pack instructs parents to "register via the Book A Spot button".
 */
export const cta = {
  /**
   * Primary conversion action. Lands on the portal's home page (client
   * direction, 14 Sept 2026) — its catalogue URL has been a 404. Programme
   * pages still go through `programmeCta`, so deep links can return in one
   * place (`getBookingUrl` in `data/booking.ts`).
   */
  bookASpot: { title: "Book A Spot", url: club.bookingPortal.url },

  contact: { title: "Contact us", url: "/contact" },
  programmes: { title: "See all programmes", url: "/programmes" },
  schedule: { title: "See the full schedule", url: "/schedule" },
  branches: { title: "See all branches", url: "/locations" },
  resources: { title: "Explore Resources", url: "/resources" },
  faqs: { title: "See all FAQs", url: "/faqs" },
  blog: { title: "See what's coming", url: "/blog" },
  about: { title: "New to LVFC", url: "/about" },
  coaching: { title: "How we coach", url: "/coaching" },

  safeguarding: { title: "Read our safeguarding policy", url: "/safeguarding" },
  /** Deep-links to the reporting block that sits above the policy text. */
  reportConcern: { title: "Report a concern", url: "/safeguarding#raising-a-concern" },
} satisfies Record<string, ButtonProps>;

/**
 * The primary CTA for a given programme — always "Book A Spot".
 *
 * With a `bookingKey` it deep-links straight to that product on the portal.
 * Without one (Summer Leagues, the mass-participation club programme) it falls
 * back to the full catalogue, which is still a real, working destination — so
 * every programme offers the same action rather than some quietly dropping to
 * a weaker "contact us".
 */
export const programmeCta = (bookingKey?: BookingKey): ButtonProps => ({
  ...cta.bookASpot,
  url: getBookingUrl(bookingKey),
});
