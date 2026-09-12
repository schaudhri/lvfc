/**
 * Schools LVFC trains at, alongside the four branches.
 *
 * Added from the client's September 2026 feedback ("add in our schools as well
 * — Learning Alliance — and fit their logo somewhere, for training schedule").
 *
 * TODO — the logo has not been supplied. Drop it into
 * `public/images/schools/` and set `logo` below; until then the schedule shows
 * the school's name as text in the logo slot. Per-campus session times were
 * not supplied either, so the copy sends parents to us for them rather than
 * guessing.
 */

export type School = {
  name: string;
  description: string;
  logo?: { src: string; alt: string };
};

export const schools: School[] = [
  {
    name: "Learning Alliance",
    description:
      "Alongside our four branches, LVFC runs training at Learning Alliance schools. Ask us for the session times at your child's campus.",
  },
];
