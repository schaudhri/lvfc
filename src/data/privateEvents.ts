/**
 * Private sessions and birthday parties.
 *
 * Added from the client's September 2026 feedback: a bookable offer with its
 * own page, reached from the top bar and a card on the landing page, with
 * enquiries sent to the club by email.
 *
 * TODO — DETAILS NOT YET SUPPLIED. The club has not given prices, durations,
 * group sizes or venues, so the copy describes the offer without promising
 * any of them. Confirm those and add them here before launch.
 */

import { phase5Photos, phase8Photos, type Image } from "@/data/clubPhotos";

export type PrivateEvent = {
  /** Also the `?type=` value that preselects this option on the enquiry form. */
  type: "birthday" | "private-session";
  title: string;
  cta: string;
  summary: string;
  points: string[];
  image: Image;
};

export const privateEventsPage = {
  url: "/private-events",
  heading: "Private sessions",
  summary:
    "Celebrate a birthday on the pitch, or book one-to-one time with an LVFC coach. Tell us what you have in mind and we'll come back with dates and prices.",
  image: phase8Photos[1],
};

export const privateEvents: PrivateEvent[] = [
  {
    type: "birthday",
    title: "Birthday parties",
    cta: "Book a birthday party",
    summary:
      "A football party for your child and their friends, with games and mini-matches led by LVFC coaches.",
    points: [
      "Games and mini-matches run by our coaches",
      "Pitched at the age of the birthday child and their guests",
      "Tell us your date, numbers and nearest branch",
    ],
    image: phase5Photos[10],
  },
  {
    type: "private-session",
    title: "Private sessions",
    cta: "Book a private session",
    summary:
      "One-to-one or small-group coaching with an LVFC coach, planned around what your child wants to work on.",
    points: [
      "One-to-one or small groups",
      "Planned around your child's goals",
      "Tell us your child's age, level and availability",
    ],
    image: phase5Photos[7],
  },
];

/** Lands on the enquiry form with this option already chosen. */
export const enquiryUrl = (type: PrivateEvent["type"]) =>
  `${privateEventsPage.url}?type=${type}#enquire`;
