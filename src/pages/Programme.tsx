"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
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
import { academyFees, formatPkr, includedInFee } from "@/data/fees";
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
  // No visible eyebrow (client request, Sept 2026) — `label` still names the
  // group for screen readers.
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
);

/**
 * The programmes index, grouped by weight.
 *
 * The five pathway programmes come first, as wide rows in stage order — that
 * is where almost every family starts. Everything else (weekend mornings,
 * squads, seniors, trials, the summer league) sits underneath as lighter
 * compact cards. It used to be eleven identical cards in
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
            Mini-Kickers at three to four, then Pre Club, Foundation and Youth Development as they
            grow. Each one runs three evenings a week and follows the same curriculum, pitched at
            that age.
          </p>
          {/* The club programme's promise, folded in here rather than kept as a
              programme of its own (client decision, 14 Sept 2026). */}
          <p className="mb-4 text-medium">
            Every group is open to boys and girls of any ability — no trial needed to join. Players
            who want more can step up to our competitive squads, and end-of-term showcases and
            certificates mark the progress along the way.
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
        {/* Pills on the left, "Clear filter" pushed to the right. */}
        <div className="container flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-12">
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
            <button
              type="button"
              onClick={() => {
                setAge(ALL);
                setBranch(ALL);
              }}
              className="inline-flex min-h-11 shrink-0 items-center text-small font-semibold underline underline-offset-2"
            >
              Clear filter
            </button>
          )}
          {/* The count is no longer shown, but a screen reader still hears
              how many programmes a filter leaves. Always rendered so the
              live region exists before its text changes. */}
          <p className="sr-only" aria-live="polite">
            {isFiltered ? `Showing ${visibleCount} of ${programmes.length} programmes` : ""}
          </p>
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
                <h2 className="mb-8 text-h3 font-medium md:mb-12">Learning Pathway</h2>
                <ol className="flex flex-col gap-6 md:gap-8">
                  {stages.map(({ programme }) => (
                    <PathwayProgrammeRow key={programme.slug} programme={programme} />
                  ))}
                </ol>

                {/* The whole fee structure in one place, from `data/fees.ts` —
                    the same figures the cards above and the FAQ quote. */}
                <div id="fees" className="mt-8 scroll-mt-24 rounded-card bg-white p-6 md:mt-10 md:p-8">
                  <h3 className="text-h5 font-medium">Fees</h3>
                  <p className="mt-2 text-scheme-text/80">
                    The same for every age group on the pathway, {academyFees.sessionsPerWeek}{" "}
                    sessions a week.
                  </p>
                  <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3">
                    <div>
                      <dt className="text-small text-scheme-text/70">Each month</dt>
                      <dd className="text-h6 font-semibold">{formatPkr(academyFees.monthly)}</dd>
                    </div>
                    <div>
                      <dt className="text-small text-scheme-text/70">Joining the 6th–15th</dt>
                      <dd className="text-h6 font-semibold">
                        {formatPkr(academyFees.perSession)} a session
                      </dd>
                    </div>
                    <div>
                      <dt className="text-small text-scheme-text/70">Joining after the 15th</dt>
                      <dd className="text-h6 font-semibold">
                        {formatPkr(academyFees.halfMonth)} that month
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 border-t border-scheme-border/15 pt-6">
                    <h4 className="text-regular font-semibold">Included in the monthly fee</h4>
                    <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                      {includedInFee.map((item) => (
                        <li key={item} className="flex gap-2 text-scheme-text/85">
                          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-terracotta" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-6 text-small text-scheme-text/80">
                    Siblings: {academyFees.siblingDiscounts.two} off for two,{" "}
                    {academyFees.siblingDiscounts.threeOrMore} off for three or more. A one-time
                    registration fee, which includes kit, applies when your child first joins.{" "}
                    <Link to="/faqs#enrolment" className="font-semibold underline underline-offset-2">
                      Fees and enrolment questions
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {others.length > 0 && (
              <div>
                <h2 className="mb-8 text-h3 font-medium md:mb-12">Also at the club</h2>
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
        button={cta.contact}
      />
    </>
  );
};
