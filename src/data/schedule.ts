/**
 * The weekly timetable, derived from each branch's own sessions.
 *
 * A branch lists only the days it actually trains, so a day it does not appear
 * on is a genuine gap rather than an invented time — those cells render as "–".
 *
 * The visible columns are the days *some* branch trains on, in week order. That
 * means adding a Sunday session to one branch adds the Sunday column to the
 * grid on its own; the timetable used to be a fixed Monday–Saturday shape that
 * could not express a Sunday at all.
 *
 * SCOPE NOTE — the client asked for filters on "Branch | Age Group | Day". A
 * branch's timetable gives one band per day and does not break sessions out by
 * age group, so only Branch and Day are filterable. Per age-group session times
 * are needed from the club to add the third filter.
 */

import { branches } from "@/data/locations";

/** Week order. The grid shows whichever of these some branch trains on. */
const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type ScheduleDay = (typeof WEEK)[number];

const trains = (day: ScheduleDay) =>
  branches.some((branch) => branch.sessions.some((session) => session.day === day));

export const scheduleDays: ScheduleDay[] = WEEK.filter(trains);

/** Branch slug → one entry per day in `scheduleDays` order. `null` is no session. */
export const weeklySchedule: Record<string, (string | null)[]> = Object.fromEntries(
  branches.map((branch) => [
    branch.slug,
    scheduleDays.map(
      (day) => branch.sessions.find((session) => session.day === day)?.time ?? null,
    ),
  ]),
);

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

/**
 * A branch's week as one line — "Mon–Sat · 6:00–8:00 PM".
 *
 * Consecutive days collapse to a range; a broken run is listed out. Returns
 * `null` where the branch has no sessions at all, so callers can say "times on
 * request" rather than printing an empty band.
 */
export const daySummary = (slug: string) => {
  const cells = weeklySchedule[slug] ?? [];
  const active = scheduleDays.filter((_, index) => cells[index]);
  if (active.length === 0) return null;

  const short = (day: string) => day.slice(0, 3);
  const firstIndex = scheduleDays.indexOf(active[0]!);
  const contiguous = active.every((day, index) => scheduleDays[firstIndex + index] === day);
  const days =
    active.length > 2 && contiguous
      ? `${short(active[0]!)}–${short(active[active.length - 1]!)}`
      : active.map(short).join(", ");

  const times = [...new Set(active.map((day) => cells[scheduleDays.indexOf(day)]))];
  return `${days} · ${times.join(" / ")}`;
};

/**
 * Both notes are quoted from content pack Section 3.
 *
 * Still held in code: they qualify the timetable as a whole rather than
 * describing any one branch, and they have not changed since the pack was
 * written. Move them into Sanity if the club starts wanting to edit them.
 */
export const scheduleNotes = {
  variation:
    "This is the standard 2026–27 season timetable. Session times may vary slightly by branch — contact us or check the booking portal to confirm exact timings for your preferred location.",
  weekend:
    "Weekend Morning Programme: Saturday and Sunday, 7:00–9:00 AM, at DHA Phase V and DHA Phase VIII.",
};
