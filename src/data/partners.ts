/**
 * International partners.
 *
 * Source: "Virgil FC International Partners Onepager 2.docx" (client content
 * brief). The brief also flagged a third, unnamed partner mentioned verbally
 * but never confirmed — left out until the club supplies details, rather than
 * guessing. Logos pulled directly from each partner's own site (Aug 2026);
 * swap for club-supplied assets if they provide their own.
 */

export type Partner = {
  name: string;
  location: string;
  summary: string;
  points: string[];
  logo: {
    src: string;
    alt: string;
    /** The logo's own colour needs the opposite chip tone to stay visible. */
    chip: "dark" | "light";
  };
  url?: string;
};

export const internationalPartners: Partner[] = [
  {
    name: "PASS Abu Dhabi",
    location: "Abu Dhabi, UAE",
    summary:
      "The leading football academy in the UAE, with a coaching staff that includes former Premier League players alongside elite-level coaches.",
    points: [
      "Leading football academy in the UAE, affiliate relationship",
      "Coaching staff includes former Premier League players and elite-level coaches",
      "Regular coaching clinics delivered in Pakistan",
      "Reciprocal trips for Virgil players and coaches to Abu Dhabi",
    ],
    logo: {
      src: "/images/partners/pass-abu-dhabi-logo.png",
      alt: "PASS Abu Dhabi",
      chip: "dark",
    },
  },
  {
    name: "Feel Spanish Football",
    location: "Alicante region, Spain",
    summary:
      'An elite Spanish football partner offering two distinct experiences: elite training camps in the Alicante region, and recreational "day in the life" experiences.',
    points: [
      'Two offers: elite training camps and recreational "day in the life" experiences',
      "Based in the Alicante region, Spain",
      "Access to the coaches and facilities of Elche CF and Intercity CF",
      "Scholarship pathway for players aged 18+",
    ],
    logo: {
      src: "/images/partners/feel-spanish-football-logo.png",
      alt: "Feel Spanish Football",
      chip: "light",
    },
    url: "https://feelspanishfootball.com",
  },
];
