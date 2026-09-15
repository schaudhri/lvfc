import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { CoachGrid } from "@/components/sections/CoachGrid";
import { PhaseTimeline } from "@/components/sections/PhaseTimeline";
import { Pillars } from "@/components/sections/Pillars";
import { SafeguardingNote } from "@/components/sections/SafeguardingNote";
import { Layout242 } from "@/components/sections/Layout242";
import { academyAgeGroups } from "@/data/programmes";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { aboutHeroCover, femaleCoachPhotos } from "@/data/clubPhotos";
import { coaches } from "@/data/coaches";

export const Coaching = () => {
  useDocumentMeta(
    "How we coach",
    "A UEFA-aligned curriculum delivered consistently across all four branches, with annual safeguarding training and background verification for every coach.",
  );
  return (
    <>
      <Header54
        heading="How we coach"
        description="A UEFA-aligned curriculum delivered by qualified staff, consistent across all four branches."
        image={aboutHeroCover}
      />

      {/* The coaches, not the club's leadership — that now lives on About
          (client request, 14 Sept 2026). */}
      <CoachGrid
        id="team"
        heading="Our coaches"
        description="All LVFC head coaches have extensive training and qualifications, with support coaches trained to national standards. Our Director of Football sets the curriculum and coaching standards across every branch."
        coaches={coaches}
        footer={{
          heading: "Coach with LVFC",
          description:
            "University students and enthusiasts welcome — every coach completes safeguarding training and background verification before working with children.",
          button: { ...cta.contact, variant: "secondary" },
        }}
      />

      {/* The club's female coaches (client request, 14 Sept 2026): the group
          shot wide, two on the pitch beside it. On large screens the portraits
          take the group photo's height rather than their own. */}
      <section className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-5 text-h3 font-medium md:mb-6">Our female coaches</h2>
            <p className="text-medium">
              Women are part of our coaching team on the pitch, and every age group is open to
              girls as well as boys.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
            {femaleCoachPhotos.map((photo) =>
              photo.portrait ? (
                <div key={photo.src} className="relative aspect-[3/4] lg:aspect-auto">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="absolute inset-0 size-full rounded-image object-cover"
                  />
                </div>
              ) : (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="col-span-2 aspect-[3/2] w-full rounded-image object-cover"
                />
              ),
            )}
          </div>
        </div>
      </section>

      <PhaseTimeline
        heading="Phase-by-phase development"
        description="Five age-appropriate stages, from a first touch through to pre-elite preparation."
        phases={academyAgeGroups.map((group) => ({
          age: group.ages,
          title: group.name,
          description: group.focus,
        }))}
      />

      <Pillars
        heading="Pillars of the game"
        button={{ ...cta.coaching, variant: "secondary" }}
        description="The four pillars of the modern game, applied at every age."
        pillars={[
          { title: "Technical", description: "Ball mastery, first touch, striking." },
          { title: "Tactical", description: "Positional awareness and team shape." },
          { title: "Physical", description: "Movement, conditioning, resilience." },
          { title: "Mental", description: "Focus, decision-making, character." },
        ]}
      />

      <SafeguardingNote />

      <Layout242
        heading="Growing our coaches"
        sections={[
          {
            heading: "Coach Education Programme",
            description:
              "Training and certification pathways for coaches joining the LVFC system, from volunteering routes through to full accreditation.",
            button: {
              title: "Learn more",
              url: "/contact",
              variant: "link",
              size: "link",
              iconRight: <ChevronRight className="size-5 text-brand-terracotta" />,
            },
          },
          {
            heading: "Standards we hold",
            description:
              "A UEFA-aligned curriculum, annual safeguarding training for every member of staff, and background verification for everyone working with children.",
            button: {
              title: "Coaching resources",
              url: "/resources",
              variant: "link",
              size: "link",
              iconRight: <ChevronRight className="size-5 text-brand-terracotta" />,
            },
          },
        ]}
      />
    </>
  );
};
