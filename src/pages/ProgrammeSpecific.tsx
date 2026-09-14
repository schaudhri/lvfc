import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { PhaseTimeline } from "@/components/sections/PhaseTimeline";
import { ScheduleGrid } from "@/components/sections/ScheduleGrid";
import { Header62 } from "@/components/sections/Header62";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { getProgramme, pathwayFor } from "@/data/programmes";
import { branches } from "@/data/locations";
import { cta, programmeCta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos } from "@/data/clubPhotos";

/**
 * Detail page for a single programme, resolved from the URL slug.
 *
 * Previously this was hard-coded to the academy while /programmes carried every
 * programme's detail inline as full-width rows. The rows are now cards, so each
 * programme needs a real destination behind its "Learn more".
 */
export const ProgrammeSpecific = () => {
  const { slug } = useParams<{ slug: string }>();
  const programme = slug ? getProgramme(slug) : undefined;

  useDocumentMeta(
    programme?.name ?? "Programmes",
    programme?.summary ??
      "Every route into the club, from a first touch through to selected competitive squads.",
  );

  // Unknown slug — send the visitor to the programme index rather than a blank page.
  if (!programme) return <Navigate to="/programmes" replace />;

  const runsAt = programme.branchSlugs
    ? branches.filter((branch) => programme.branchSlugs!.includes(branch.slug))
    : [];

  // Deep-links to this programme on the booking portal where the mapping is
  // 1:1, otherwise falls back to the full catalogue. See `data/booking.ts`.
  const bookASpot = programmeCta(programme.bookingKey);

  return (
    <>
      <Header54
        heading={programme.name}
        description={programme.description}
        buttons={[
          { ...bookASpot, variant: "alternate" },
          { ...cta.schedule, variant: "secondary-alt" },
        ]}
        image={programme.image ?? clubPhotos[programme.slug.length % clubPhotos.length]}
      />

      {/* The full programme page, where the club has written one. Without it the
          description in the header stands on its own, as it always has. */}
      {programme.body && programme.body.length > 0 && (
        <section className="px-[5%] pt-16 md:pt-24 lg:pt-28">
          <div className="container max-w-[48rem]">
            <RichText value={programme.body} />
          </div>
        </section>
      )}

      {/* Not every programme has a details list — Seniors deliberately has
          none rather than carrying invented inclusions. */}
      {programme.details && programme.details.length > 0 && (
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <h2 className="mb-12 max-w-lg text-h3 font-medium md:mb-18 lg:mb-20">
              {programme.detailsHeading}
            </h2>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
              {programme.details.map((detail) => (
                <li
                  key={detail}
                  className="border-t border-scheme-border pt-4 text-large font-semibold"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* The whole pathway, with the stages this programme covers held at full
          strength and the rest faded — so a parent sees where their child sits
          and what comes either side of it, rather than a stage in isolation. */}
      <PhaseTimeline
        heading="Where this sits on the pathway"
        description={`${programme.name} covers the highlighted stages. The rest of the pathway is shown faded — it's where your child goes next.`}
        button={{ ...cta.coaching, variant: "secondary" }}
        phases={pathwayFor(programme).map((group) => ({
          age: group.ages,
          title: group.name,
          description: group.focus,
          dimmed: group.dimmed,
        }))}
      />

      <ScheduleGrid
        heading="Training schedule"
        description="The full week across all four branches. Filter by branch to find the evenings that fit around yours."
      />

      <section className="border-t border-scheme-border/20 px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-4 text-h3 font-medium">Where it runs</h2>
            <p className="text-medium">
              {runsAt.length > 0
                ? "Age groups shown per branch — not every branch runs the full pathway."
                : "Branch availability for this programme is confirmed on selection. Get in touch and we'll tell you where your child's squad trains."}
            </p>
          </div>

          {runsAt.length > 0 && (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {runsAt.map((branch) => (
                <li
                  key={branch.slug}
                  className="flex flex-col rounded-card bg-neutral-lightest p-6"
                >
                  <h3 className="mb-2 text-h6 font-medium">{branch.name}</h3>
                  <p className="mb-4 text-small text-scheme-text/70">{branch.address}</p>
                  <ul className="mb-5 flex flex-col gap-1.5 text-small">
                    {branch.programmes.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                  <Link
                    to={`/locations/${branch.slug}`}
                    className="mt-auto flex min-h-6 items-center gap-2 text-small font-semibold"
                  >
                    See this branch
                    <ChevronRight className="size-4 text-scheme-text" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button {...cta.branches} variant="secondary">
              {cta.branches.title}
            </Button>
            <Button {...cta.programmes} variant="secondary">
              {cta.programmes.title}
            </Button>
          </div>
        </div>
      </section>

      <Header62
        heading={`Book a place in ${programme.name}`}
        description="Register through our booking portal and we'll confirm your child's first session within 24–48 hours."
        buttons={[{ ...bookASpot }]}
      />
    </>
  );
};
