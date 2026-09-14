import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { Header62 } from "@/components/sections/Header62";
import { Badge } from "@/components/ui/badge";
import { ClubBadge } from "@/components/ClubBadge";
import { Button } from "@/components/ui/button";
import { branches } from "@/data/locations";
import { daySummary, scheduleNotes } from "@/data/schedule";
import { cta } from "@/data/cta";
import { cardMedia } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos, phase5Photos, phase8Photos } from "@/data/clubPhotos";

/**
 * The branch index.
 *
 * This page used to carry every branch's full detail inline, behind a jump bar
 * of anchor links — so a parent interested in one ground scrolled past three
 * others, and could not send anyone a link to their branch. It is now a
 * chooser: enough per branch to pick one, with the detail on its own page.
 */
export const Locations = () => {
  useDocumentMeta(
    "Locations",
    "Four branches across Lahore — Gulberg, DHA Phase V, DHA Phase VIII and Pine Avenue. Addresses, programmes offered and training times for each.",
  );

  return (
    <>
      <Header54
        heading="Our locations"
        description="LVFC trains at four branches across Lahore, each chosen to serve a different part of the city. All branches are staffed by qualified coaches and supported by a dedicated operations team."
        image={{ src: clubPhotos[7].src, alt: "LVFC training grounds in Lahore" }}
      />

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {branches.map((branch) => {
              const week = daySummary(branch.slug);
              // The branch's own photo once uploaded in the Studio, then the
              // real training shots we have for Phase V and Phase VIII.
              const fallback =
                branch.slug === "dha-phase-v"
                  ? phase5Photos[0]
                  : branch.slug === "dha-phase-viii"
                    ? phase8Photos[0]
                    : undefined;
              const photo = branch.image ?? fallback;
              return (
                <li key={branch.slug} className={cn("group flex flex-col", cardMedia)}>
                  <Link to={`/locations/${branch.slug}`} tabIndex={-1} aria-hidden="true">
                    {photo ? (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : (
                      // Same frame as a photo, so the four cards read as one
                      // set — and an honest "not yet" instead of the same
                      // city-wide map repeated under two different branches.
                      <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 bg-neutral-darkest text-white/60">
                        <ClubBadge className="size-10" />
                        <span className="text-small">Photos of the ground coming soon</span>
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h2 className="text-h4 font-medium">{branch.name}</h2>
                      {branch.status && <Badge>{branch.status.label}</Badge>}
                    </div>

                    <p className="mb-2 text-small font-semibold">{branch.address}</p>
                    {week && (
                      <p className="mb-4 text-small tabular-nums text-scheme-text/70">{week}</p>
                    )}

                    <ul className="mb-6 flex flex-wrap gap-2">
                      {branch.programmes.map((entry) => (
                        <li
                          key={entry}
                          className="rounded-badge bg-brand-sandstone px-3 py-1.5 text-small"
                        >
                          {entry}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                      <Button {...cta.bookASpot} size="sm">
                        {cta.bookASpot.title}
                      </Button>
                      <Link
                        to={`/locations/${branch.slug}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-terracotta underline-offset-4 hover:underline"
                      >
                        Learn more
                        <ChevronRight className="size-5 text-brand-terracotta transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-scheme-border/20 px-[5%] py-10">
        <div className="container flex flex-col gap-2 text-small text-scheme-text/70">
          <p>{scheduleNotes.variation}</p>
          <p>{scheduleNotes.weekend}</p>
        </div>
      </section>

      <Header62
        heading="Not sure which branch suits you?"
        description="Tell us roughly where you live and your child's age, and we'll suggest the nearest ground and the right group."
        buttons={[{ ...cta.contact }, { ...cta.schedule, variant: "secondary" }]}
      />
    </>
  );
};
