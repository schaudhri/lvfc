"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Button } from "@/components/ui/button";
import { formatAges, type Programme } from "@/data/programmes";
import { programmeCta } from "@/data/cta";
import { cn } from "@/lib/utils";

/**
 * The alternatives to the pathway, as pills that act like tabs.
 *
 * These used to be plain links, each one navigating straight to its own
 * programme page — a parent skimming the home page had to leave it just to
 * see what "Trials" meant. A pill now only selects; the summary and booking
 * button for whichever one is selected appear directly underneath, and
 * "Learn more" is the one deliberate way off the page.
 *
 * The row sits between the Programmes title and the slider (Figma
 * "lvfc-website" home, node 19:267), so it starts with nothing open — a
 * summary panel there by default would push the cards down the page. Clicking
 * the open pill again closes it.
 */
export const AlsoAtClub = ({ programmes }: { programmes: Programme[] }) => {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? undefined : programmes[active];
  if (programmes.length === 0) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Also at the club">
        {programmes.map((programme, index) => {
          const isActive = index === active;
          return (
            <button
              key={programme.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(isActive ? null : index)}
              className={cn(
                // 16px as drawn on desktop; a step down on phones, where six
                // pills otherwise stack four rows deep above the cards.
                "min-h-11 rounded-full border px-4 py-2 text-small font-semibold lg:min-h-0 transition-colors md:text-regular",
                isActive
                  ? "border-brand-maroon bg-brand-maroon text-white"
                  : "border-brand-maroon text-scheme-text hover:bg-neutral-lightest",
              )}
            >
              {programme.name}
            </button>
          );
        })}
      </div>

      {selected && (
      <div
        key={selected.slug}
        role="tabpanel"
        className="mt-4 flex flex-col gap-4 rounded-card bg-neutral-lightest p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-h6 font-medium">{selected.name}</h3>
            <span className="w-fit rounded-full bg-brand-maroon/10 px-3 py-1 text-small font-semibold text-brand-maroon">
              {formatAges(selected.agesLabel)}
            </span>
          </div>
          <p className="mt-2 max-w-lg text-scheme-text/70">{selected.summary}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
          <Button {...programmeCta(selected.bookingKey)} size="sm">
            {programmeCta(selected.bookingKey).title}
          </Button>
          <Link
            to={`/programmes/${selected.slug}`}
            className="inline-flex min-h-6 items-center gap-1.5 text-small font-semibold underline-offset-4 hover:underline"
          >
            Learn more
            <ChevronRight className="size-4 text-scheme-text" />
          </Link>
        </div>
      </div>
      )}
    </div>
  );
};
