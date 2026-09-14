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
import { aboutHeroCover } from "@/data/clubPhotos";
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
              iconRight: <ChevronRight className="text-scheme-text" />,
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
              iconRight: <ChevronRight className="text-scheme-text" />,
            },
          },
        ]}
      />
    </>
  );
};
