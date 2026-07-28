import { scheduleDays, getScheduleRow } from "@/data/schedule";
import { cn } from "@/lib/utils";

type Props = {
  /** Branch slug, as defined in `data/locations`. */
  slug: string;
  className?: string;
};

/**
 * One branch's training week, as a row of day cards. Days the source timetable
 * left blank render as "No session" rather than being hidden — a parent
 * checking Thursday needs to see that Thursday is empty.
 */
export const BranchWeek = ({ slug, className }: Props) => {
  const row = getScheduleRow(slug);
  if (!row) return null;

  return (
    <ul className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6", className)}>
      {scheduleDays.map((day, index) => {
        const time = row.cells[index];
        return (
          <li
            key={day}
            className={cn(
              "rounded-card border px-3 py-3",
              time
                ? "border-scheme-border/30 bg-neutral-lightest"
                : "border-dashed border-scheme-border/20",
            )}
          >
            <span className="block text-tiny font-semibold uppercase tracking-wider text-scheme-text/60">
              {day.slice(0, 3)}
            </span>
            <span
              className={cn(
                "mt-1 block text-small font-bold tabular-nums",
                !time && "font-normal text-scheme-text/60",
              )}
            >
              {time ?? "No session"}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
