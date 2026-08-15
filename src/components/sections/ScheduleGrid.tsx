"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { branches } from "@/data/locations";
import { scheduleDays, scheduleRows, scheduleNotes } from "@/data/schedule";
import { cn } from "@/lib/utils";

const ALL = "All";

const FilterPills = ({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-col gap-3">
    {/*
      No visible label: the pills read "All / Gulberg / DHA Phase V …", which
      says what they filter without an eyebrow repeating it. `label` still names
      the group for screen readers, which have no such visual context.
    */}
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-small font-semibold transition-colors",
              isActive
                ? "border-brand-maroon bg-brand-maroon text-white"
                : "border-brand-maroon text-scheme-text hover:bg-neutral-lightest",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  </div>
);

type Props = {
  /** Omit on the Schedule page, where the hero already carries the title. */
  heading: string;
  description: string;
  buttons: ButtonProps[];
  /** The season/weekend/age-group caveats that sit under the table. */
  showNotes: boolean;
};

export type ScheduleGridProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * The full season timetable: every branch against every day, filterable by
 * both.
 *
 * This replaced `CampusSchedule`, which showed one branch at a time behind a
 * row of pills. The whole grid turned out to be the more useful default — a
 * parent comparing "which branch and night actually works for us" was the
 * common case, and the one-branch-at-a-time view made them click through all
 * four to answer it. Filtering down to a single branch is still one tap away.
 *
 * SCOPE: the client asked for Branch | Age Group | Day. The supplied timetable
 * gives one band per branch per day with no age-group breakdown, so Age Group
 * is held back until those times exist — see `data/schedule.ts`.
 */
export const ScheduleGrid = (props: ScheduleGridProps) => {
  const { heading, description, buttons, showNotes = true, className } = props;

  const [branchFilter, setBranchFilter] = useState<string>(ALL);

  const visibleRows =
    branchFilter === ALL ? scheduleRows : scheduleRows.filter((row) => row.branch === branchFilter);

  return (
    <section className={cn("px-[5%] py-16 md:py-24 lg:py-28", className)}>
      <div className="container">
        {heading && (
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-4 text-h2 font-bold md:mb-5">{heading}</h2>
            {description && <p className="text-medium">{description}</p>}
          </div>
        )}

        {/*
          Branch is the only filter. A Day filter was tried alongside it and
          pulled: with one time band per branch per day, filtering to a single
          day collapses the table to a column of near-identical cells, which
          answers less than the full week does. Add it back only if the
          timetable ever gains per-day variation worth isolating.
        */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:gap-12">
          <FilterPills
            label="Branch"
            options={[ALL, ...branches.map((branch) => branch.name)]}
            active={branchFilter}
            onChange={setBranchFilter}
          />
        </div>

        <div className="w-full overflow-x-auto rounded-card border border-scheme-border/30">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-neutral-lightest">
                <th scope="col" className="px-6 py-4 text-small font-bold">
                  Branch
                </th>
                {scheduleDays.map((day) => (
                  <th key={day} scope="col" className="px-6 py-4 text-small font-bold">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.slug} className="border-t border-scheme-border/20">
                  <th scope="row" className="px-6 py-4 text-left font-semibold">
                    {row.branch}
                  </th>
                  {scheduleDays.map((day, index) => (
                    <td
                      key={day}
                      className={cn(
                        "px-6 py-4 text-small tabular-nums",
                        !row.cells[index] && "text-scheme-text/60",
                      )}
                    >
                      {row.cells[index] ?? (
                        <>
                          {/* A dash reads as an empty cell at a glance; the
                              screen-reader text says what the dash means. */}
                          <span aria-hidden="true">–</span>
                          <span className="sr-only">No session</span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showNotes && (
          <div className="mt-6 flex flex-col gap-2 text-small text-scheme-text/70">
            <p>{scheduleNotes.variation}</p>
            <p>{scheduleNotes.weekend}</p>
            <p>
              Session times by age group are confirmed at your branch — contact us and we'll place
              your child in the right group.
            </p>
          </div>
        )}

        {buttons && buttons.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {buttons.map((button, index) => (
              <Button key={index} {...button}>
                {button.title}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
