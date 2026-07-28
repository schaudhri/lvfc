"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "relume-icons";

type Props = {
  filters: string[];
  searchPlaceholder: string;
};

export type ProgrammeFilterBarProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Custom section — a nearest, lightweight Relume-styled swap for the wireframe's
 * programme "filter bar". Built from Relume primitives + tokens (kept intentionally
 * simple; the full Relume Filters component can be swapped in on request).
 */
export const ProgrammeFilterBar = (props: ProgrammeFilterBarProps) => {
  const { filters, searchPlaceholder } = { ...ProgrammeFilterBarDefaults, ...props };
  const [active, setActive] = useState<string>(filters[0]);

  return (
    <section className="px-[5%] py-6 md:py-8">
      <div className="container flex flex-col gap-4 rounded-card bg-neutral-lightest p-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="w-full max-w-sm">
          <Input
            type="search"
            placeholder={searchPlaceholder}
            icon={<Search className="size-5 text-scheme-text" />}
            iconPosition="left"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={filter === active ? "default" : "secondary"}
              size="sm"
              onClick={() => setActive(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProgrammeFilterBarDefaults: Props = {
  filters: ["All", "Filter one", "Filter two", "Filter three"],
  searchPlaceholder: "Search",
};
