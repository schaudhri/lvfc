"use client";

import { useState } from "react";
import { Header54 } from "@/components/sections/Header54";
import { Header62 } from "@/components/sections/Header62";
import { CompactProgrammeCard, PathwayProgrammeRow } from "@/components/sections/ProgrammeList";
import {
  ageFilters,
  matchesAge,
  matchesBranch,
  otherProgrammes,
  pathwayProgrammes,
  programmes,
  type Programme as ProgrammeData,
} from "@/data/programmes";
import { branches } from "@/data/locations";
import { cta } from "@/data/cta";
import { cn } from "@/lib/utils";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos } from "@/data/clubPhotos";

const ALL = "all";

/**
 * Branch is the primary filter. Age-group filtering is hidden at the client's
 * request — the data and matching logic stay in place, so flip this to `true`
 * to bring the control back.
 */
const SHOW_AGE_FILTER = false;

type Option = { id: string; label: string };

const FilterPills = ({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: Option[];
  active: string;
  onChange: (id: string) => void;
}) => (
  <div className="flex flex-col gap-3">
    <span className="text-tiny font-semibold uppercase tracking-wider text-scheme-text/60">
      {label}
    </span>
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((option) => {
        const isActive = option.id === active;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-small font-semibold transition-colors",
              isActive
                ? "border-brand-maroon bg-brand-maroon text-white"
                : "border-brand-maroon text-scheme-text hover:bg-neutral-lightest",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  </div>
);

/**
 * The programmes index, grouped by weight.
 *
 * The five pathway programmes come first, as wide rows in stage order — that
 * is where almost every family starts. Everything else (weekend mornings,
 * squads, seniors, trials, the summer league, the community programme) sits
 * underneath as lighter compact cards. It used to be eleven identical cards in
 * one grid, which gave a parent no idea where to begin.
 */
export const Programme = () => {
  useDocumentMeta(
    "Programmes",
    "Every route into the club, from FUNdamentals at two through to Seniors at 16+. Filter by branch to see what runs near you.",
  );
  const [age, setAge] = useState(ALL);
  const [branch, setBranch] = useState(ALL);

  const matches = (programme: ProgrammeData) =>
    matchesAge(programme, age) && matchesBranch(programme, branch);
  const stages = pathwayProgrammes.filter(({ programme }) => matches(programme));
  const others = otherProgrammes.filter(matches);
  const visibleCount = stages.length + others.length;
  const isFiltered = age !== ALL || branch !== ALL;

  return (
    <>
      <Header54
        heading="Every player has a path"
        description="Designed and directed by UEFA-licensed coaches, blending international methodology with local understanding."
        image={{ src: clubPhotos[12].src, alt: "LVFC programmes" }}
      />

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-[48rem]">
          <h2 className="mb-5 text-h3 font-medium md:mb-6">Where does my child start?</h2>
          <p className="mb-4 text-medium">
            Most families start with the age group that matches their child — FUNdamentals at two,
            Mini-Kickers at three to four, then Pre-Academy, Foundation and Youth Development as they
            grow. Each one runs three evenings a week and follows the same curriculum, pitched at
            that age.
          </p>
          <p className="text-medium">
            Around that sit the alternatives: weekend mornings if evenings don't work, selected
            squads for competitive players, a summer league through the holidays, and a one-to-three
            day trial if you'd rather see it first. Filter below by branch to see what runs near
            you.
          </p>
        </div>
      </section>

      <div className="border-y border-scheme-border/20 px-[5%] py-8">
        <div className="container">
          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            {SHOW_AGE_FILTER && (
              <FilterPills
                label="Age group"
                options={[
                  { id: ALL, label: "All ages" },
                  ...ageFilters.map((filter) => ({ id: filter.id, label: filter.label })),
                ]}
                active={age}
                onChange={setAge}
              />
            )}
            <FilterPills
              label="Branch"
              options={[
                { id: ALL, label: "All branches" },
                ...branches.map((item) => ({ id: item.slug, label: item.name })),
              ]}
              active={branch}
              onChange={setBranch}
            />
          </div>

          {isFiltered && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="text-small text-scheme-text/70" aria-live="polite">
                Showing {visibleCount} of {programmes.length} programmes
              </p>
              <button
                type="button"
                onClick={() => {
                  setAge(ALL);
                  setBranch(ALL);
                }}
                className="text-small font-semibold underline underline-offset-2"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </div>

      {visibleCount === 0 ? (
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container max-w-lg">
            <h2 className="mb-3 text-h4 font-medium">Nothing runs at that branch yet</h2>
            <p className="text-medium">
              Try another branch — or get in touch and we'll find the right fit for your child.
            </p>
          </div>
        </section>
      ) : (
        <section className="px-[5%] py-12 md:py-16 lg:py-20">
          <div className="container flex flex-col gap-16 md:gap-24">
            {stages.length > 0 && (
              <div>
                <div className="mb-8 max-w-lg md:mb-12">
                  <h2 className="mb-3 text-h3 font-medium">The pathway</h2>
                  <p className="text-medium">
                    One programme for each age, from a first touch at two to pre-elite preparation
                    at thirteen and over. Start with the one that matches your child.
                  </p>
                </div>
                <ol className="flex flex-col gap-6 md:gap-8">
                  {stages.map(({ programme }) => (
                    <PathwayProgrammeRow key={programme.slug} programme={programme} />
                  ))}
                </ol>
              </div>
            )}

            {others.length > 0 && (
              <div>
                <div className="mb-8 max-w-lg md:mb-12">
                  <h2 className="mb-3 text-h3 font-medium">Also at the club</h2>
                  <p className="text-medium">
                    Weekend mornings, competitive squads, seniors, the summer league and trials —
                    alternatives to the evening pathway, and ways to try the club first.
                  </p>
                </div>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {others.map((programme) => (
                    <CompactProgrammeCard key={programme.slug} programme={programme} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <Header62
        heading="Not sure which programme fits?"
        description="Tell us your child's age and your nearest branch, and we'll point you to the right group."
        buttons={[{ ...cta.contact }, { ...cta.schedule, variant: "secondary" }]}
      />
    </>
  );
};
