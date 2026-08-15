import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { Header62 } from "@/components/sections/Header62";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { branches } from "@/data/locations";
import { daySummary, scheduleNotes } from "@/data/schedule";
import { cta } from "@/data/cta";
import { cardMedia } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos, phase5Photos, phase8Photos } from "@/data/clubPhotos";

const MAP = "/lvfc-map-lahore.png";

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
              // Real training shots for Phase V and Phase VIII; the shared
              // placeholder map for branches with neither an uploaded photo
              // nor one of those two sets.
              const fallback =
                branch.slug === "dha-phase-v"
                  ? phase5Photos[0]
                  : branch.slug === "dha-phase-viii"
                    ? phase8Photos[0]
                    : undefined;
              return (
                <li key={branch.slug} className={cn("group flex flex-col", cardMedia)}>
                  <Link to={`/locations/${branch.slug}`} tabIndex={-1} aria-hidden="true">
                    <img
                      src={branch.image?.src ?? fallback?.src ?? MAP}
                      alt={branch.image?.alt || fallback?.alt || `Map showing the ${branch.name} branch`}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h2 className="text-h4 font-bold">{branch.name}</h2>
                      {branch.status && <Badge>{branch.status.label}</Badge>}
                    </div>

                    <p className="mb-2 text-small font-semibold">{branch.address}</p>
                    {week && (
                      <p className="mb-4 text-small tabular-nums text-white/70">{week}</p>
                    )}

                    <ul className="mb-6 flex flex-wrap gap-2">
                      {branch.programmes.map((entry) => (
                        <li
                          key={entry}
                          className="rounded-badge bg-white/10 px-3 py-1.5 text-small"
                        >
                          {entry}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Button {...cta.bookASpot} size="sm" variant="alternate">
                        {cta.bookASpot.title}
                      </Button>
                      <Link
                        to={`/locations/${branch.slug}`}
                        className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
                      >
                        Learn more
                        <ChevronRight className="size-5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
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
        heading="Come and see for yourself"
        description="Get in touch or come and watch a session — the best way to understand LVFC is to stand on the touchline."
        buttons={[{ ...cta.bookASpot }, { ...cta.contact, variant: "secondary" }]}
      />
    </>
  );
};
