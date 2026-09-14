import { Navigate, useParams } from "react-router-dom";
import { Header54 } from "@/components/sections/Header54";
import { Header62 } from "@/components/sections/Header62";
import { BranchWeek } from "@/components/sections/BranchWeek";
import { ProgrammeCard } from "@/components/sections/ProgrammeList";
import { Badge } from "@/components/ui/badge";
import { PhotoSlider } from "@/components/sections/PhotoSlider";
import { branchGallery, branchPhoto, getBranch } from "@/data/locations";
import { otherProgrammes, pathwayProgrammes, programmesAtBranch } from "@/data/programmes";
import { daySummary, scheduleNotes } from "@/data/schedule";
import { cta } from "@/data/cta";
import { whatsappLink } from "@/data/site";
import { useDocumentMeta } from "@/hooks/use-document-meta";

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
  const onPathway = pathwayProgrammes.filter(({ programme }) => programmes.includes(programme));
  const alsoHere = otherProgrammes.filter((programme) => programmes.includes(programme));
  const week = daySummary(branch.slug);

  // The branch's own photos; the shared map only if a branch has none at all.
  const gallery = branchGallery(branch);
  const mainPhoto = branchPhoto(branch) ?? { src: MAP, alt: `Map showing the ${branch.name} branch` };

  return (
    <>
      <Header54
        heading={branch.name}
        description={branch.about}
        // No hero CTA on branch pages (client request, 15 Sept 2026) — each
        // programme card below carries its own Book A Spot.
        image={mainPhoto}
      />

      {/* The facts a parent checks first. No "← All branches" link: no other
          page has a back pattern (client request, 15 Sept 2026). */}
      <section className="px-[5%] py-8 md:py-10">
        <div className="container">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-medium font-semibold">{branch.address}</p>
            {branch.status && <Badge>{branch.status.label}</Badge>}
            {week && (
              <p className="text-small tabular-nums text-scheme-text/70">{week}</p>
            )}
          </div>
          {branch.status && (
            <p className="mt-3 max-w-lg text-small text-scheme-text/70">
              {branch.status.detail}
            </p>
          )}
        </div>
      </section>

      {/*
        Cards, as on the programmes index (client request, 14 Sept 2026): each
        programme with its photo, ages, season and the booking button —
        pathway stages first, then everything else that runs here. Above the
        training week (client request, 15 Sept 2026): what runs here is the
        first question, when is the second.
      */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-5 text-h3 font-medium md:mb-6">Programmes at {branch.name}</h2>
            <p className="text-medium">
              Everything that runs at this ground. Start with the stage that matches your child's
              age.
            </p>
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {onPathway.length > 0 && (
              <div>
                <h3 className="mb-6 text-h5 font-medium">On the pathway</h3>
                <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {onPathway.map(({ programme }) => (
                    <ProgrammeCard key={programme.slug} programme={programme} />
                  ))}
                </ol>
              </div>
            )}
            {alsoHere.length > 0 && (
              <div>
                <h3 className="mb-6 text-h5 font-medium">Also here</h3>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {alsoHere.map((programme) => (
                    <ProgrammeCard
                      key={programme.slug}
                      programme={programme}
                      // A programme with no stated branches passes the branch
                      // filter everywhere, so say so rather than implying this
                      // ground has been confirmed for it.
                      note={
                        programme.branchSlugs ? undefined : "Confirm availability at this branch."
                      }
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Just the week and the ground — the programmes above already say what
          runs here and in which season, and the schedule is in the main nav. */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <h2 className="mb-5 text-h3 font-medium md:mb-6">Training week</h2>
              <p className="mb-8 max-w-lg text-medium">
                The sessions this branch runs. Your child's exact slot within the band is
                confirmed at the branch.
              </p>
              <BranchWeek slug={branch.slug} />
            </div>
            <img
              src={mainPhoto.src}
              alt={mainPhoto.alt || `Map showing the ${branch.name} branch`}
              className="aspect-[4/3] w-full rounded-image object-cover"
            />
          </div>
        </div>
      </section>

      {/* A slider through the ground's photos — only once there's more than
          the one main photograph to scroll through. */}
      {gallery.length > 1 && (
        <PhotoSlider
          heading="The ground"
          description={`Sessions at ${branch.name}. Swipe through to see what training looks like here.`}
          photos={gallery}
        />
      )}

      {/* Only where the club has supplied coach bios for this branch. */}
      {branch.coaches && branch.coaches.length > 0 && (
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <h2 className="mb-12 text-h3 font-medium md:mb-18 lg:mb-20">Coaches at this branch</h2>
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
                  <h3 className="text-h6 font-medium">{coach.name}</h3>
                  <p className="mb-2 text-small text-scheme-text/70">{coach.role}</p>
                  <p className="text-small">{coach.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="px-[5%] py-8 md:py-10">
        <div className="container flex flex-col gap-2 text-small text-scheme-text/70">
          <p>{scheduleNotes.variation}</p>
          <p>{scheduleNotes.weekend}</p>
        </div>
      </section>

      <Header62
        heading={`Come and watch a session at ${branch.name}`}
        description={
          week
            ? `Sessions run ${week}. Message us on WhatsApp and we'll arrange for you to watch one before you book.`
            : "Message us on WhatsApp and we'll arrange for you to watch a session before you book."
        }
        // WhatsApp, prefilled with the branch: watching first is the low-risk
        // step most parents want, and WhatsApp is the club's preferred route.
        button={{
          title: "Arrange a visit",
          url:
            whatsappLink(`Hi LVFC — I'd like to come and watch a session at ${branch.name}.`) ??
            cta.contact.url,
        }}
      />
    </>
  );
};
