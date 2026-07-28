/**
 * The four LVFC branches, transcribed from content pack Section 2.
 *
 * `programmes` is per-branch and deliberately not uniform — the content pack
 * lists a different set for each ground (Gulberg has no Weekend Morning
 * Programme; Pine Avenue does not yet run Youth Development).
 */

export type Branch = {
  slug: string;
  name: string;
  /** Short form used in filter pills and schedule rows. */
  shortName: string;
  address: string;
  about: string;
  programmes: string[];
  /** Set only where the content pack gives the branch a status line. */
  status?: { label: string; detail: string };
};

export const branches: Branch[] = [
  {
    slug: "gulberg",
    name: "Gulberg",
    shortName: "Gulberg",
    address: "City School, Gurumangat Road, Gulberg, Lahore",
    about:
      "Our Gulberg branch sits at the heart of one of Lahore's most vibrant communities. Based at City School on Gurumangat Road, this is one of LVFC's longest-running locations and serves players from Gulberg, Garden Town, Faisal Town and surrounding areas. The ground provides an excellent environment for both academy and club sessions.",
    programmes: [
      "Fundamentals · 2 years",
      "Little Robbins · 3–4 years",
      "Pre Academy · 5–8 years",
      "Foundation · 9–12 years",
      "Youth Development · 13+ years",
    ],
  },
  {
    slug: "dha-phase-v",
    name: "DHA Phase V",
    shortName: "Phase V",
    address: "K-Block Swimming Pool Ground, DHA Phase V, Lahore",
    about:
      "Located within the K-Block Swimming Pool complex in DHA Phase V, this branch is a favourite among families in Defence and surrounding areas. A well-maintained facility with strong community engagement, Phase V has become a flagship branch for LVFC's competitive player development.",
    programmes: [
      "Fundamentals · 2 years",
      "Little Robbins · 3–4 years",
      "Pre Academy · 5–8 years",
      "Foundation · 9–12 years",
      "Youth Development · 13+ years",
      "Weekend Morning Programme",
    ],
  },
  {
    slug: "dha-phase-viii",
    name: "DHA Phase VIII",
    shortName: "Phase VIII",
    address: "Lemniscate Club, DHA Phase VIII, Lahore",
    about:
      "Our DHA Phase VIII branch is based at the prestigious Lemniscate Club, offering a premium training environment for players in one of Lahore's fastest-growing residential communities. The facilities here support high-performance training and are regularly used for inter-branch showcase events.",
    programmes: [
      "Fundamentals · 2 years",
      "Little Robbins · 3–4 years",
      "Pre Academy · 5–8 years",
      "Foundation · 9–12 years",
      "Youth Development · 13+ years",
      "Weekend Morning Programme",
    ],
  },
  {
    slug: "pine-avenue",
    name: "Pine Avenue",
    shortName: "Pine Avenue",
    address: "The Box, Pine Avenue, near Alhamd Garden, Lahore",
    about:
      "Our newest branch — live from July 2026 — is based at The Box Football Academy on Pine Avenue. Conveniently located near Alhamd Garden, this branch extends LVFC's reach into a growing catchment area and brings our coaching methodology to a whole new community of young players.",
    programmes: [
      "Fundamentals · 2 years",
      "Little Robbins · 3–4 years",
      "Pre Academy · 5–8 years",
      "Foundation · 9–12 years",
    ],
    status: {
      label: "Now enrolling",
      detail: "Limited spots available at our newest branch. Register via Book A Spot.",
    },
  },
];

export const getBranch = (slug: string) => branches.find((b) => b.slug === slug);
