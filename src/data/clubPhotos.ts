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

/** A photo that knows its shape, so a slider can keep portraits portrait. */
export type GalleryPhoto = Image & { portrait?: boolean };

const shots = (slug: string, order: number[], alt: string, portrait = false): GalleryPhoto[] =>
  order.map((n) => ({ src: `/images/branches/${slug}/${n}.jpg`, alt, portrait }));

/**
 * Each branch's own photographs — the club's "-selected" picks per ground
 * (Sept 2026), resized from `assets/images/*-selected`. The first photo leads
 * the branch's hero and its card. Phase V's earlier set follows its new picks.
 */
export const branchPhotos: Record<string, GalleryPhoto[]> = {
  gulberg: shots("gulberg", [1], "LVFC player with the ball at the Gulberg branch", true),
  "dha-phase-v": [
    ...shots("dha-phase-v", [3, 1, 2], "LVFC player training at the DHA Phase V branch", true),
    ...phase5Photos.map((photo) => ({ ...photo, portrait: true })),
  ],
  // 3 is the one portrait in the new set; the two earlier shots follow it all.
  "dha-phase-viii": [
    ...shots("dha-phase-viii", [1, 2], "LVFC players training at the DHA Phase VIII branch"),
    ...shots("dha-phase-viii", [3], "LVFC players running a drill at the DHA Phase VIII branch", true),
    ...shots(
      "dha-phase-viii",
      [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      "LVFC players training at the DHA Phase VIII branch",
    ),
    ...phase8Photos.map((photo) => ({ ...photo, portrait: true })),
  ],
  // DSC_0072 (5) leads: players mid-drill, where the first frame is mostly fence.
  "pine-avenue": shots(
    "pine-avenue",
    [5, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11],
    "LVFC players training at the Pine Avenue branch",
  ),
};

/** The club's female coaches: the group in kit, then two on the pitch. */
export const femaleCoachPhotos: GalleryPhoto[] = [
  { src: "/images/coaches/female-1.jpg", alt: "LVFC's female coaches in club kit" },
  { src: "/images/coaches/female-2.jpg", alt: "LVFC female coach leading a session", portrait: true },
  { src: "/images/coaches/female-3.jpg", alt: "LVFC female coach on the pitch", portrait: true },
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
