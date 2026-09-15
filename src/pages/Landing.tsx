import { ChevronRight } from "relume-icons";
import { Button } from "@/components/ui/button";
import { Header54 } from "@/components/sections/Header54";
import { ProgrammeCards } from "@/components/sections/ProgrammeCards";
import { Layout121 } from "@/components/sections/Layout121";
import { ClubIntro } from "@/components/sections/ClubIntro";
import { ScheduleGrid } from "@/components/sections/ScheduleGrid";
import { CoachSlider } from "@/components/sections/CoachSlider";
import { Layout442 } from "@/components/sections/Layout442";
import { LifeAtLvfc } from "@/components/sections/LifeAtLvfc";
import { PrivateEventsCallout } from "@/components/sections/PrivateEventsCallout";
import { Faqs } from "@/components/sections/Faqs";
import { otherProgrammes, pathwayProgrammes, programmeImage } from "@/data/programmes";
import { landingFaqs } from "@/data/faqs";
import { leadership } from "@/data/people";
import { heroImages } from "@/data/club";
import { cta, programmeCta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos, coachPhotos, phase8Photos } from "@/data/clubPhotos";

export const Landing = () => {
  useDocumentMeta(
    "Lahore Virgil Football Club",
    "Football for children aged 2 to 18 across four branches in Lahore. UEFA-aligned coaching, a clear player pathway, and safeguarding published in full.",
  );
  return (
    <>
      <Header54
        size="full"
        heading="Join Lahore's leading youth football club"
        description="Lahore's football club — built on community, ambition, and pride of place."
        // One action in the hero (client request, 14 Sept 2026) — "New to
        // LVFC" leads the intro section directly below instead.
        buttons={[{ ...cta.programmes, variant: "champagne" }]}
        image={{ src: clubPhotos[13].src, alt: "LVFC players training in Lahore" }}
        // Rotates through the club's own photos once uploaded in the Studio;
        // with none uploaded yet, `Header54` falls back to `image` above.
        images={heroImages}
        video={{ src: "/videos/hero.mp4", poster: "/videos/hero-poster.jpg" }}
      />

      {/* No eyebrow, no stats (client request, Sept 2026). */}
      <ClubIntro eyebrow={undefined} stats={[]} buttons={[{ ...cta.about }]} />

      {/*
        Every programme as a card, in one grid (client request, 15 Sept 2026):
        the five pathway stages first, in age order, then the alternatives —
        which used to be a row of pills above a slider of the five.
      */}
      <ProgrammeCards
        heading="Programmes"
        description={undefined}
        layout="grid"
        programmes={[
          ...pathwayProgrammes.map(({ programme }) => programme),
          ...otherProgrammes,
        ].map((programme) => ({
          url: `/programmes/${programme.slug}`,
          image: programmeImage(programme),
          title: programme.name,
          ages: programme.agesLabel,
          description: programme.summary,
          tag: programme.flagship ? "Flagship" : undefined,
          primaryButton: programmeCta(programme.bookingKey),
        }))}
      />

      {/* Moved from About and laid out in a row rather than a scroll-drawn
          timeline (client request, 14 Sept 2026): right after the programmes
          a parent has just browsed, it says what to do next. */}
      <Layout121
        orientation="horizontal"
        heading="How to start your journey"
        // No buttons here (client request, 15 Sept 2026) — Book A Spot is in
        // the nav and the fixed bar, and each step says what to do.
        buttons={[]}
        features={[
          {
            heading: "Choose a programme",
            description:
              "Start with your child's age — FUNdamentals at two through to Youth Development at fifteen — or pick weekend mornings or a competitive squad.",
          },
          {
            heading: "Pick your branch",
            description:
              "Choose the Lahore branch and session times that work for your family — Gulberg, DHA Phase V, DHA Phase VIII or Pine Avenue.",
          },
          {
            heading: "Register",
            description:
              "Complete registration through our booking portal. We'll confirm your spot within 24–48 hours.",
          },
          {
            heading: "First session",
            description: "Come and train. Meet the coaches, meet the group, get started.",
          },
        ]}
      />

      <Layout442
        heading="Every child's safety comes first"
        description="We have a comprehensive Safeguarding Policy in place, reviewed annually, adopting the principles of the Pakistan Football Federation, the English FA Safeguarding Protocol, the US Youth Soccer Blueprint and the FIFA Guardians Toolkit. Every coach completes safeguarding training annually, and all staff working with children undergo background verification before they start."
        buttons={[
          { ...cta.safeguarding, variant: "alternate" },
          {
            ...cta.coaching,
            variant: "link-alt",
            size: "link",
            iconRight: <ChevronRight className="text-white" />,
          },
        ]}
        image={{ src: phase8Photos[0].src, alt: "LVFC coaches supervising a training session" }}
      />

      {/* The pathway now lives on the programme pages (client direction,
          14 Sept 2026) — here it only repeated the five cards above. */}

      {/* "A club families stay with" (the four-number stats band) is off the
          home page for now (client request, 15 Sept 2026). `StatsPathway`
          still exists to bring it back. */}

      {/*
        Locations (the map/address cards) is off the home page for now — see
        the Locations page for that. This is schedule only.
      */}
      <ScheduleGrid
        heading="Training schedule"
        description="The full week across all four Lahore branches. Filter by branch to find the evenings that fit around yours."
        // On a light ground: maroon primary, outline secondary.
        buttons={[{ ...cta.branches, variant: "secondary" }, { ...cta.bookASpot }]}
      />

      {/*
        Leadership rather than branch coaches — branch-level bios are still
        outstanding from the club. Swap in per-branch coaching staff here once
        received, and move leadership to the About page.
      */}
      <CoachSlider
        heading="Meet our coaches"
        description="The team setting the standard across all four branches."
        coaches={leadership.map((person, index) => ({
          // A real headshot where the club has supplied one; otherwise a stand-in.
          image: { src: person.photo?.src ?? coachPhotos[index % coachPhotos.length].src, alt: person.name },
          name: person.name,
          position: person.role,
          certification: person.alsoRole ?? "",
          oneLiner: person.summary ?? person.description,
        }))}
      />

      <section className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">
          <div className="mx-auto max-w-lg text-center">
            <h3 className="mb-4 text-h4 font-medium">Coach with LVFC</h3>
            <p className="mb-6 text-medium md:mb-8">
              University students and enthusiasts welcome — every coach completes safeguarding
              training and background verification before working with children.
            </p>
            <Button {...cta.coaching} variant="secondary">
              {cta.coaching.title}
            </Button>
          </div>
        </div>
      </section>

      <PrivateEventsCallout />

      <LifeAtLvfc
        heading="Life at LVFC"
        description="Weekends, fixtures, showcases and the everyday grind that builds players."
        images={clubPhotos.slice(0, 8).map((photo) => ({ src: photo.src, alt: photo.alt }))}
      />

      {/* Intro and button straight under the title, no card (Figma home,
          node 19:4996). */}
      <Faqs
        heading="FAQs"
        description="Fees, kit, refunds, safeguarding — the full list is on our FAQ page, or just get in touch."
        questions={landingFaqs}
        button={{ ...cta.faqs, variant: "secondary" }}
      />
    </>
  );
};
