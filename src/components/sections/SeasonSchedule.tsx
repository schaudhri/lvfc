import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { branches } from "@/data/locations";
import { daySummary } from "@/data/schedule";
import { programmes } from "@/data/programmes";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  description: string;
};

export type SeasonScheduleProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * The whole season on one page, by programme rather than by branch.
 *
 * The branch grid answers "when is my nearest pitch open"; this answers "when
 * does my child's programme actually run, and for how long" — which is the
 * question a parent asks when choosing between programmes.
 *
 * DATA LIMIT, stated plainly on the page: the supplied timetable gives one
 * time band per branch per day and does not break sessions out by programme or
 * age group. So every programme at a branch necessarily shows that branch's
 * band. When per-programme times arrive, only `data/schedule.ts` needs to
 * change — this reads from it rather than restating anything.
 */
export const SeasonSchedule = (props: SeasonScheduleProps) => {
  const {
    heading = "The season, programme by programme",
    description = "Every programme across the 2026–27 season — when it runs, where, and on which evenings.",
    className,
  } = props;

  return (
    <section className={cn("px-[5%] py-16 md:py-24 lg:py-28", className)}>
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h3 font-medium md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>

        {/* Each branch's week, once. The times are per branch, not per
            programme, so repeating them under all eleven programmes was the
            same four lines eleven times. */}
        <dl className="mb-10 grid grid-cols-1 gap-4 border-y border-scheme-border/30 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((branch) => (
            <div key={branch.slug}>
              <dt className="text-small font-semibold">{branch.name}</dt>
              <dd className="text-small tabular-nums text-scheme-text/70">
                {daySummary(branch.slug) ?? "Times on request"}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-col gap-4">
          {programmes.map((programme) => {
            const runsAt = programme.branchSlugs
              ? branches.filter((b) => programme.branchSlugs!.includes(b.slug))
              : [];
            return (
              <li
                key={programme.slug}
                className="rounded-card bg-neutral-lightest p-6 md:p-8"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_max-content] lg:items-start">
                  <div>
                    <h3 className="mb-1 text-h5 font-medium">{programme.name}</h3>
                    <p className="text-small text-scheme-text/70">
                      Ages {programme.agesLabel}
                      {programme.season && <> · {programme.season}</>}
                    </p>
                  </div>

                  <div>
                    {runsAt.length > 0 ? (
                      <ul className="flex flex-wrap gap-2" aria-label="Runs at">
                        {runsAt.map((branch) => (
                          <li
                            key={branch.slug}
                            className="rounded-badge bg-brand-sandstone px-3 py-1.5 text-small font-semibold"
                          >
                            {branch.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-small text-scheme-text/70">
                        Branch and times confirmed on selection — get in touch and we'll tell you
                        where this runs.
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/programmes/${programme.slug}`}
                    className={cn(
                      "flex min-h-6 items-center gap-2 text-small font-semibold",
                      "lg:justify-end",
                    )}
                  >
                    Learn more
                    <ChevronRight className="size-4 text-scheme-text" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-[48rem] text-small text-scheme-text/70">
          Times shown are the branch's session band. The club has not yet issued separate times per
          programme or age group, so your child's exact slot within that band is confirmed at the
          branch.
        </p>
      </div>
    </section>
  );
};
