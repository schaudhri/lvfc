/**
 * Standard 2026–27 season timetable, transcribed from content pack Section 3.
 *
 * A `null` cell means the source table left that day blank for that branch —
 * rendered as "No session" rather than invented hours. Pine Avenue is the only
 * branch with blanks (Mon–Wed only) and the only one with a longer 3-hour band.
 *
 * SCOPE NOTE — the client asked for filters on "Branch | Age Group | Day". The
 * supplied timetable gives one time band per branch per day and does not break
 * sessions out by age group, so only Branch and Day are filterable here. Per
 * age-group session times are needed from the club to add the third filter.
 */

import { branches } from "@/data/locations";

export const scheduleDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type ScheduleDay = (typeof scheduleDays)[number];

/** Branch slug → one entry per day in `scheduleDays` order. */
export const weeklySchedule: Record<string, (string | null)[]> = {
  gulberg: ["6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM"],
  "dha-phase-v": ["6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM"],
  "dha-phase-viii": ["6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM", "6:00–8:00 PM"],
  "pine-avenue": ["6:00–9:00 PM", "6:00–9:00 PM", "6:00–9:00 PM", null, null, null],
};

export type ScheduleRow = {
  slug: string;
  branch: string;
  shortName: string;
  cells: (string | null)[];
};

export const scheduleRows: ScheduleRow[] = branches.map((branch) => ({
  slug: branch.slug,
  branch: branch.name,
  shortName: branch.shortName,
  cells: weeklySchedule[branch.slug] ?? scheduleDays.map(() => null),
}));

export const getScheduleRow = (slug: string) => scheduleRows.find((row) => row.slug === slug);

/** Both notes are quoted from content pack Section 3. */
export const scheduleNotes = {
  variation:
    "This is the standard 2026–27 season timetable. Session times may vary slightly by branch — contact us or check the booking portal to confirm exact timings for your preferred location.",
  weekend:
    "Weekend morning sessions (Saturday and Sunday) are available at select branches. Contact your branch for weekend availability.",
};
