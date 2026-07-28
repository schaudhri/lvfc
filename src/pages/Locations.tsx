import { Header54 } from "@/components/sections/Header54";
import { BranchWeek } from "@/components/sections/BranchWeek";
import { Header62 } from "@/components/sections/Header62";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { branches } from "@/data/locations";
import { scheduleNotes } from "@/data/schedule";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const IMG = "/placeholder-image.svg";
const MAP = "https://d22po4pjz3o32e.cloudfront.net/placeholder-map-image.jpeg";

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
        image={{ src: IMG, alt: "LVFC training grounds in Lahore" }}
      />

      {/* Jump bar — four branches is enough that a parent shouldn't have to scroll to find theirs. */}
      <div className="border-y border-scheme-border/20 px-[5%] py-5">
        <div className="container flex flex-wrap items-center gap-2">
          {branches.map((branch) => (
            <a
              key={branch.slug}
              href={`#${branch.slug}`}
              className="rounded-full border border-scheme-border/40 px-4 py-2 text-small font-semibold transition-colors hover:bg-neutral-lightest"
            >
              {branch.name}
            </a>
          ))}
        </div>
      </div>

      {branches.map((branch, index) => (
        <section
          key={branch.slug}
          id={branch.slug}
          className={`scroll-mt-24 px-[5%] py-16 md:py-24 lg:py-28 ${
            index > 0 ? "border-t border-scheme-border/20" : ""
          }`}
        >
          <div className="container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-h3 font-bold">{branch.name}</h2>
                  {branch.status && <Badge>{branch.status.label}</Badge>}
                </div>
                <p className="mb-5 text-medium font-semibold">{branch.address}</p>
                <p className="mb-8 max-w-xl text-medium">{branch.about}</p>

                <h3 className="mb-4 text-h6 font-bold">Programmes at this branch</h3>
                <ul className="mb-8 flex flex-wrap gap-2">
                  {branch.programmes.map((programme) => (
                    <li
                      key={programme}
                      className="rounded-badge bg-neutral-lightest px-3 py-1.5 text-small"
                    >
                      {programme}
                    </li>
                  ))}
                </ul>

                {branch.status && (
                  <p className="mb-8 max-w-xl text-small text-scheme-text/70">
                    {branch.status.detail}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <Button {...cta.bookASpot} size="sm">
                    {cta.bookASpot.title}
                  </Button>
                  <Button {...cta.schedule} variant="secondary" size="sm">
                    {cta.schedule.title}
                  </Button>
                </div>
              </div>

              <div>
                {/* TODO: swap for a real map embed or photograph of the ground once supplied. */}
                <img
                  src={MAP}
                  alt={`Map showing the ${branch.name} branch`}
                  className="mb-6 aspect-[4/3] w-full rounded-image object-cover"
                />
                <h3 className="mb-3 text-h6 font-bold">Training week</h3>
                <BranchWeek slug={branch.slug} />
              </div>
            </div>
          </div>
        </section>
      ))}

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
