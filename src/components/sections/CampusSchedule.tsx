"use client";

import { useState } from "react";
import { branches } from "@/data/locations";
import { scheduleNotes } from "@/data/schedule";
import { BranchWeek } from "@/components/sections/BranchWeek";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  description?: string;
  /** Renders the branch's address and a link through to Locations. */
  showBranchDetail?: boolean;
  buttons?: ButtonProps[];
  className?: string;
};

export type CampusScheduleProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Training times, filtered by branch. Branch pills are the primary control —
 * families train at one branch, so the default view is a single branch's week
 * rather than a four-branch grid they have to scan.
 */
export const CampusSchedule = (props: CampusScheduleProps) => {
  const {
    heading = "Training times",
    description,
    showBranchDetail = false,
    buttons,
    className,
  } = props;

  const [activeSlug, setActiveSlug] = useState(branches[0].slug);
  const active = branches.find((branch) => branch.slug === activeSlug) ?? branches[0];

  return (
    <section className={cn("px-[5%] py-16 md:py-24 lg:py-28", className)}>
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h3 font-medium md:mb-6">{heading}</h2>
          {description && <p className="text-medium">{description}</p>}
        </div>

        <div
          className="mb-8 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter training times by branch"
        >
          {branches.map((branch) => {
            const isActive = branch.slug === activeSlug;
            return (
              <button
                key={branch.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSlug(branch.slug)}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 text-small font-semibold transition-colors lg:min-h-0",
                  isActive
                    ? "border-brand-maroon bg-brand-maroon text-white"
                    : "border-brand-maroon text-scheme-text hover:bg-neutral-lightest",
                )}
              >
                {branch.name}
              </button>
            );
          })}
        </div>

        <div className="rounded-card border border-scheme-border/30 p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-h5 font-medium">{active.name}</h3>
            {showBranchDetail && (
              <p className="text-small text-scheme-text/70">{active.address}</p>
            )}
          </div>
          <BranchWeek slug={active.slug} />
          {active.status && (
            <p className="mt-5 text-small font-semibold">
              {active.status.label} — <span className="font-normal">{active.status.detail}</span>
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-2 text-small text-scheme-text/70">
          <p>{scheduleNotes.variation}</p>
          <p>{scheduleNotes.weekend}</p>
        </div>

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
