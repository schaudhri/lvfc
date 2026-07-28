import { ChevronRight } from "relume-icons";
import { Button } from "@/components/ui/button";
import { Header54 } from "@/components/sections/Header54";
import { ProgrammeCards } from "@/components/sections/ProgrammeCards";
import { ClubIntro } from "@/components/sections/ClubIntro";
import { PhaseTimeline } from "@/components/sections/PhaseTimeline";
import { StatsPathway } from "@/components/sections/StatsPathway";
import { ScheduleGrid } from "@/components/sections/ScheduleGrid";
import { LocationsList } from "@/components/sections/LocationsList";
import { CoachSlider } from "@/components/sections/CoachSlider";
import { Layout442 } from "@/components/sections/Layout442";
import { Gallery9 } from "@/components/sections/Gallery9";
import { Faqs } from "@/components/sections/Faqs";
import { Blog42 } from "@/components/sections/Blog42";
import { programmes, academyAgeGroups } from "@/data/programmes";
import { branches } from "@/data/locations";
import { landingFaqs } from "@/data/faqs";
import { launchPosts } from "@/data/blog";
import { leadership } from "@/data/people";
import { cta, programmeCta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const IMG = "/placeholder-image.svg";
const LAND = "/placeholder-image-landscape.svg";
const MAP = "https://d22po4pjz3o32e.cloudfront.net/placeholder-map-image.jpeg";

export const Landing = () => {
  useDocumentMeta(
    "Lahore Virgil Football Club",
    "Football for children aged 2 to 18 across four branches in Lahore. UEFA-aligned coaching, a clear player pathway, and safeguarding published in full.",
  );
  return (
    <>
      <Header54
        size="full"
        heading="Where people bring their fire, the city blooms"
        description="Lahore's football club — built on community, ambition, and pride of place."
        buttons={[
          { ...cta.programmes, variant: "alternate" },
          { ...cta.about, variant: "secondary-alt" },
        ]}
        image={{ src: IMG, alt: "LVFC players training in Lahore" }}
      />

      <ClubIntro buttons={[{ ...cta.about, variant: "secondary" }]} />

      <ProgrammeCards
        heading="Programmes"
        description="Every route into the club — pick the one that fits."
        layout="slider"
        programmes={programmes.map((programme) => ({
          url: `/programmes/${programme.slug}`,
          image: { src: LAND, alt: programme.name },
          title: programme.name,
          ages: programme.agesLabel,
          description: programme.summary,
          tag: programme.flagship ? "Flagship" : undefined,
          primaryButton: programmeCta(programme.bookingKey),
        }))}
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
        image={{ src: IMG, alt: "LVFC coaches supervising a training session" }}
      />

      <PhaseTimeline
        heading="The player pathway"
        button={{ ...cta.programmes }}
        phases={academyAgeGroups.map((group) => ({
          age: group.ages,
          title: group.name,
          description: group.focus,
        }))}
      />

      <StatsPathway
        heading="A club families stay with"
        stats={[
          { value: "4", label: "Branches across Lahore" },
          { value: "2–18", label: "Age range, first touch to U18" },
          { value: "5", label: "Age groups in the pathway" },
          { value: "3", label: "Academy sessions a week" },
        ]}
        buttons={[{ title: "View our programmes", url: "/programmes", variant: "alternate" }]}
      />

      <ScheduleGrid
        heading="Training schedule"
        description="The full week across all four Lahore branches. Filter by branch or day to find the sessions that fit around yours."
        buttons={[
          { ...cta.schedule, variant: "secondary" },
          { ...cta.bookASpot },
        ]}
      />

      <LocationsList
        id="locations"
        heading="Where we train"
        description="Four branches across Lahore, each serving a different part of the city. Pick one to see the pitch and how to find it."
        locations={branches.map((branch) => ({
          name: branch.name,
          address: branch.address,
          url: `/locations#${branch.slug}`,
          map: { src: MAP, alt: `Map of the ${branch.name} branch` },
        }))}
      />

      {/*
        Leadership rather than branch coaches — individual coach bios and
        headshots are still outstanding from the club. Swap in the coaching
        staff here once received, and move leadership to the About page.
      */}
      <CoachSlider
        heading="Meet our coaches"
        description="The team setting the standard across all four branches."
        coaches={leadership.map((person) => ({
          image: { src: IMG, alt: person.name },
          name: person.name,
          position: person.role,
          certification: person.alsoRole ?? "",
          oneLiner: person.description,
        }))}
      />

      <section className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">
          <div className="mx-auto max-w-lg text-center">
            <h3 className="mb-4 text-h4 font-bold">Coach with LVFC</h3>
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

      <Gallery9
        heading="Life at LVFC"
        description="Weekends, fixtures, showcases and the everyday grind that builds players."
        images={[
          { url: "#", src: IMG, alt: "Life at LVFC 1" },
          { url: "#", src: IMG, alt: "Life at LVFC 2" },
          { url: "#", src: IMG, alt: "Life at LVFC 3" },
          { url: "#", src: IMG, alt: "Life at LVFC 4" },
          { url: "#", src: IMG, alt: "Life at LVFC 5" },
        ]}
      />

      <Faqs
        heading="FAQs"
        description="The questions parents ask most before their child's first session."
        questions={landingFaqs}
        footer={{
          heading: "More questions?",
          description:
            "Fees, kit, refunds, safeguarding — the full list is on our FAQ page, or just get in touch.",
          button: { ...cta.faqs, variant: "secondary" },
        }}
      />

      <Blog42
        heading="Coming with the new season"
        description="The first articles going live alongside 2026–27 — club news, match reports and coaching insight."
        button={{ ...cta.blog, variant: "secondary" }}
        blogPosts={launchPosts.slice(0, 3).map((post) => ({
          url: "/blog",
          image: { src: LAND, alt: post.title },
          category: post.category,
          readTime: "Coming soon",
          title: post.title,
          description: post.brief,
          button: {
            ...cta.blog,
            variant: "link",
            size: "link",
            iconRight: <ChevronRight className="text-scheme-text" />,
          },
        }))}
      />
    </>
  );
};
