import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { ScheduleGrid } from "@/components/sections/ScheduleGrid";
import { Header62 } from "@/components/sections/Header62";
import { RichText } from "@/components/RichText";
import {
  academyAgeGroups,
  getProgramme,
  movedProgrammeSlugs,
  stageFor,
} from "@/data/programmes";
import { PathwayBadge } from "@/components/sections/PhaseTimeline";
import { cn } from "@/lib/utils";
import { branches, photosAcross } from "@/data/locations";
import { PhotoSlider } from "@/components/sections/PhotoSlider";
import { programmeCta } from "@/data/cta";
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

  // A programme that was renamed — follow it to its new address.
  const movedTo = slug ? movedProgrammeSlugs[slug] : undefined;
  if (movedTo) return <Navigate to={`/programmes/${movedTo}`} replace />;

  // Unknown slug — send the visitor to the programme index rather than a blank page.
  if (!programme) return <Navigate to="/programmes" replace />;

  const runsAt = programme.branchSlugs
    ? branches.filter((branch) => programme.branchSlugs!.includes(branch.slug))
    : [];

  // Deep-links to this programme on the booking portal where the mapping is
  // 1:1, otherwise falls back to the full catalogue. See `data/booking.ts`.
  const bookASpot = programmeCta(programme.bookingKey);
  // The one pathway stage this programme is, if it is one (the five age
  // groups); alternatives like Weekend Mornings span several and have none.
  const stage = stageFor(programme);
  const photos = photosAcross(runsAt.length > 0 ? runsAt : branches);
  const stageNumber = stage ? academyAgeGroups.indexOf(stage) + 1 : 0;

  return (
    <>
      <Header54
        heading={programme.name}
        description={programme.description}
        buttons={[{ ...bookASpot, variant: "champagne" }]}
        image={programme.image ?? clubPhotos[programme.slug.length % clubPhotos.length]}
      />

      {/* What the programme is, in the club's words, beside a card showing the
          one step of the pathway it is (client request, 14 Sept 2026). Heroes
          no longer carry a subtitle, so without this the page never said what
          the programme was. Programmes that aren't a single stage keep the
          paragraph alone. */}
      {programme.description && (
        <section className="px-[5%] pt-16 md:pt-24 lg:pt-28">
          <div
            className={cn(
              "container",
              stage
                ? "grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16"
                : "[&>*]:max-w-[48rem]",
            )}
          >
            <p className="text-large">{programme.description}</p>
            {stage && (
              <aside
                aria-label="Pathway"
                className="flex flex-col items-center rounded-card bg-white p-6 text-center md:p-8"
              >
                <h2 className="text-h5 font-medium">Pathway</h2>
                <p className="mt-1 text-small text-scheme-text/70">
                  What stage of the football journey your child is on
                </p>
                <div className="mt-6 flex flex-col items-center gap-2.5">
                  <PathwayBadge>{stageNumber}</PathwayBadge>
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <h3 className="text-h6 font-medium">{stage.name}</h3>
                    <p className="font-heading text-small font-medium capitalize leading-[18px] text-brand-terracotta">
                      <span className="sr-only">Ages </span>
                      {stage.ages}
                    </p>
                  </div>
                  <p className="max-w-[18rem] text-small text-scheme-text/70">{stage.focus}</p>
                </div>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* The full programme page, where the club has written one. */}
      {programme.body && programme.body.length > 0 && (
        <section className="px-[5%] pt-16 md:pt-24 lg:pt-28">
          <div className="container [&>*]:max-w-[48rem]">
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

      {/* No full pathway here any more (client request, 14 Sept 2026): the
          Pathway card beside the intro shows this programme's step. */}

      {/* Photos from the grounds this programme runs at (every branch where
          it isn't tied to any), so a parent can see what a session is like. */}
      {photos.length > 1 && (
        <PhotoSlider
          heading="See it in action"
          description={
            runsAt.length > 0
              ? `Training at ${runsAt.map((branch) => branch.name).join(", ").replace(/, ([^,]*)$/, " and $1")}.`
              : "Training across our four branches."
          }
          photos={photos}
        />
      )}

      <ScheduleGrid
        heading="Training schedule"
        description="The full week across all four branches. Filter by branch to find the evenings that fit around yours."
      />

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="text-h3 font-medium">Where it runs</h2>
            {runsAt.length === 0 && (
              <p className="mt-4 text-medium">
                Branch availability for this programme is confirmed on selection. Get in touch
                and we'll tell you where your child's squad trains.
              </p>
            )}
          </div>

          {/* Just the ground and its address (client request, Sept 2026) — the
              per-branch programme list lives on each branch's own page. */}
          {runsAt.length > 0 && (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {runsAt.map((branch) => (
                <li
                  key={branch.slug}
                  className="flex flex-col rounded-card bg-neutral-lightest p-6"
                >
                  <h3 className="mb-2 text-h6 font-medium">{branch.name}</h3>
                  <p className="mb-5 text-small text-scheme-text/70">{branch.address}</p>
                  <Link
                    to={`/locations/${branch.slug}`}
                    className="mt-auto flex min-h-6 items-center gap-2 text-small font-semibold"
                  >
                    Learn more
                    <ChevronRight className="size-4 text-scheme-text" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Header62
        heading={`Book a place in ${programme.name}`}
        description="Register through our booking portal and we'll confirm your child's first session within 24–48 hours."
        button={bookASpot}
      />
    </>
  );
};
