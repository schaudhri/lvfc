import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { Header62 } from "@/components/sections/Header62";
import { BranchWeek } from "@/components/sections/BranchWeek";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBranch } from "@/data/locations";
import { programmesAtBranch } from "@/data/programmes";
import { daySummary, scheduleNotes } from "@/data/schedule";
import { cta, programmeCta } from "@/data/cta";
import { cardMedia } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { phase5Photos, phase8Photos } from "@/data/clubPhotos";

const MAP = "/lvfc-map-lahore.png";

/**
 * Everything about one branch, resolved from the URL slug.
 *
 * The locations index used to carry every branch inline behind anchor links,
 * which meant a parent interested in one ground scrolled past three others and
 * could not link anyone to "our branch". Each branch now has a real page: the
 * ground itself, its week, and what runs there across the season.
 */
export const BranchSpecific = () => {
  const { slug } = useParams<{ slug: string }>();
  const branch = slug ? getBranch(slug) : undefined;

  useDocumentMeta(
    branch ? `${branch.name} branch` : "Locations",
    branch?.about ??
      "Four branches across Lahore, each serving a different part of the city.",
  );

  // Unknown slug — back to the index rather than an empty page.
  if (!branch) return <Navigate to="/locations" replace />;

  const programmes = programmesAtBranch(branch.slug);
  const week = daySummary(branch.slug);

  // Real training shots for the two branches we have them for; the shared
  // placeholder map everywhere else until the club uploads a branch gallery.
  const photos =
    branch.slug === "dha-phase-v"
      ? phase5Photos
      : branch.slug === "dha-phase-viii"
        ? phase8Photos
        : [];
  const mainPhoto = branch.image ?? photos[0] ?? { src: MAP, alt: `Map showing the ${branch.name} branch` };
  const gallery = branch.gallery && branch.gallery.length > 0 ? branch.gallery : photos.slice(1);

  /**
   * The seasons running here, in the order the programmes are listed. Season is
   * a property of a programme rather than of a ground, so it is read off the
   * programmes this branch actually runs instead of being restated per branch.
   */
  const seasons = [...new Set(programmes.map((programme) => programme.season).filter(Boolean))];

  return (
    <>
      <Header54
        heading={branch.name}
        description={branch.about}
        buttons={[
          { ...cta.bookASpot, variant: "alternate" },
          { ...cta.contact, variant: "secondary-alt" },
        ]}
        image={mainPhoto}
      />

      {/* Back to the index, and the facts a parent checks first. */}
      <section className="border-b border-scheme-border/20 px-[5%] py-8">
        <div className="container">
          <Link
            to="/locations"
            className="mb-6 inline-flex min-h-6 items-center gap-2 text-small font-semibold"
          >
            ← All branches
          </Link>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-medium font-semibold">{branch.address}</p>
            {branch.status && <Badge>{branch.status.label}</Badge>}
            {week && (
              <p className="text-small tabular-nums text-scheme-text/70">{week}</p>
            )}
          </div>
          {branch.status && (
            <p className="mt-3 max-w-xl text-small text-scheme-text/70">
              {branch.status.detail}
            </p>
          )}
        </div>
      </section>

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <h2 className="mb-4 text-h3 font-bold">Training week</h2>
              <p className="mb-8 max-w-xl text-medium">
                The sessions this branch runs. Your child's exact slot within the band is
                confirmed at the branch.
              </p>
              <BranchWeek slug={branch.slug} />

              <h3 className="mb-4 mt-10 text-h6 font-bold">What runs here</h3>
              <ul className="flex flex-wrap gap-2">
                {branch.programmes.map((entry) => (
                  <li
                    key={entry}
                    className="rounded-badge bg-neutral-lightest px-3 py-1.5 text-small"
                  >
                    {entry}
                  </li>
                ))}
              </ul>

              {seasons.length > 0 && (
                <>
                  <h3 className="mb-4 mt-10 text-h6 font-bold">Season</h3>
                  <ul className="flex flex-wrap gap-2">
                    {seasons.map((season) => (
                      <li
                        key={season}
                        className="rounded-badge bg-neutral-lightest px-3 py-1.5 text-small"
                      >
                        {season}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div>
              <img
                src={mainPhoto.src}
                alt={mainPhoto.alt || `Map showing the ${branch.name} branch`}
                className="aspect-[4/3] w-full rounded-image object-cover"
              />
              <div className="mt-4 flex flex-wrap gap-4">
                <Button {...cta.schedule} variant="secondary" size="sm">
                  {cta.schedule.title}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Only where the club has uploaded more than the one main photograph. */}
      {gallery.length > 0 && (
        <section className="border-t border-scheme-border/20 px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <h2 className="mb-12 text-h3 font-bold md:mb-18">The ground</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((photo) => (
                <li key={photo.src}>
                  <img
                    src={photo.src}
                    alt={photo.alt ?? ""}
                    className="aspect-[4/3] w-full rounded-image object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-scheme-border/20 px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-4 text-h3 font-bold">Programmes at {branch.name}</h2>
            <p className="text-medium">
              Every route into the club that runs at this ground — pick the one that fits your
              child's age.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => (
              <li
                key={programme.slug}
                className={cn("group flex flex-col p-6", cardMedia)}
              >
                <h3 className="mb-1 text-h6 font-bold">{programme.name}</h3>
                <p className="mb-3 text-small text-white/70">
                  Ages {programme.agesLabel}
                  {programme.season && <> · {programme.season}</>}
                </p>
                <p className="mb-5 text-small text-white/85">{programme.summary}</p>
                {/*
                  A programme with no stated branches passes the branch filter
                  everywhere, so say so here rather than implying this ground
                  has been confirmed for it.
                */}
                {!programme.branchSlugs && (
                  <p className="mb-5 text-small text-white/60">
                    Confirm availability at this branch.
                  </p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button {...programmeCta(programme.bookingKey)} size="sm" variant="alternate">
                    {programmeCta(programme.bookingKey).title}
                  </Button>
                  <Link
                    to={`/programmes/${programme.slug}`}
                    className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
                  >
                    Learn more
                    <ChevronRight className="size-5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Only where the club has supplied coach bios for this branch. */}
      {branch.coaches && branch.coaches.length > 0 && (
        <section className="border-t border-scheme-border/20 px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <h2 className="mb-12 text-h3 font-bold md:mb-18">Coaches at this branch</h2>
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {branch.coaches.map((coach) => (
                <li key={coach.name}>
                  {coach.photo && (
                    <img
                      src={coach.photo.src}
                      alt={coach.photo.alt || coach.name}
                      className="mb-4 aspect-square w-full rounded-image object-cover"
                    />
                  )}
                  <h3 className="text-h6 font-bold">{coach.name}</h3>
                  <p className="mb-2 text-small text-scheme-text/70">{coach.role}</p>
                  <p className="text-small">{coach.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-scheme-border/20 px-[5%] py-10">
        <div className="container flex flex-col gap-2 text-small text-scheme-text/70">
          <p>{scheduleNotes.variation}</p>
          <p>{scheduleNotes.weekend}</p>
        </div>
      </section>

      <Header62
        heading="Come and see for yourself"
        description="Get in touch or come and watch a session — the best way to understand LVFC is to stand on the touchline."
        buttons={[{ ...cta.bookASpot }, { ...cta.contact, variant: "secondary" }]}
      />
    </>
  );
};
