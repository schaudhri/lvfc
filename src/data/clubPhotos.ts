/**
 * Real LVFC training photos, supplied directly (not yet in Sanity).
 *
 * Named by branch — `phase5-*` was shot at DHA Phase V, `phase8-*` at DHA
 * Phase VIII — so each set doubles as that branch's own imagery until the
 * club uploads branch-specific galleries in the Studio.
 */

export type Image = { src: string; alt: string };

export const phase5Photos: Image[] = [
  { src: "/images/club/phase5-1.jpg", alt: "LVFC player training at the DHA Phase V branch" },
  { src: "/images/club/phase5-2.jpg", alt: "LVFC player at the DHA Phase V branch, viewed from behind" },
  { src: "/images/club/phase5-3.jpg", alt: "LVFC players training at the DHA Phase V branch" },
  { src: "/images/club/phase5-4.jpg", alt: "LVFC players training at the DHA Phase V branch" },
  { src: "/images/club/phase5-5.jpg", alt: "LVFC players lining up at the DHA Phase V branch" },
  { src: "/images/club/phase5-6.jpg", alt: "LVFC player training at the DHA Phase V branch" },
  { src: "/images/club/phase5-7.jpg", alt: "LVFC player training at the DHA Phase V branch" },
  { src: "/images/club/phase5-8.jpg", alt: "LVFC player running during a drill at the DHA Phase V branch" },
  { src: "/images/club/phase5-9.jpg", alt: "LVFC player training at the DHA Phase V branch" },
  { src: "/images/club/phase5-10.jpg", alt: "LVFC player training at the DHA Phase V branch" },
  { src: "/images/club/phase5-11.jpg", alt: "LVFC player training at the DHA Phase V branch" },
  { src: "/images/club/phase5-12.jpg", alt: "LVFC player training at the DHA Phase V branch" },
];

export const phase8Photos: Image[] = [
  { src: "/images/club/phase8-1.jpg", alt: "LVFC player with a ball at the DHA Phase VIII branch" },
  { src: "/images/club/phase8-2.jpg", alt: "LVFC player training at the DHA Phase VIII branch" },
];

/** All action photos, phase 5 first, for slots that just need general club imagery. */
export const clubPhotos: Image[] = [...phase5Photos, ...phase8Photos];

/** The wide cover shot used for the "New to LVFC" and Coaching page heroes. */
export const aboutHeroCover: Image = {
  src: "/images/about-hero-cover.jpg",
  alt: "LVFC players and coaches on the pitch",
};

/**
 * Individual coach portraits, same shoot, no names attached to the files.
 * Order here is filename order only — a stand-in pairing with `leadership`
 * until the club confirms who's who, not a verified match.
 */
export const coachPhotos: Image[] = Array.from({ length: 17 }, (_, i) => ({
  src: `/images/coaches/coach-${i + 1}.jpg`,
  alt: "LVFC coach portrait",
}));
