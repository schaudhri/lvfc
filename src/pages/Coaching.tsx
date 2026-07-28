import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { Team16 } from "@/components/sections/Team16";
import { PhaseTimeline } from "@/components/sections/PhaseTimeline";
import { Pillars } from "@/components/sections/Pillars";
import { Layout442 } from "@/components/sections/Layout442";
import { Layout242 } from "@/components/sections/Layout242";
import { academyAgeGroups } from "@/data/programmes";
import { leadership } from "@/data/people";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const IMG = "/placeholder-image.svg";

// Empty until the club supplies real profile URLs. Rendering three "#" links
// per person put 15 links to nowhere on this page.
// TODO: populate per person once profiles are confirmed.
const social: { href: string; icon: React.ReactNode }[] = [];

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
        image={{ src: IMG, alt: "LVFC coaches on the training pitch" }}
      />

      {/*
        Club leadership. Individual branch coach bios and headshots were listed as
        drafted in the 5 July meeting but have not been supplied — add them as a
        second Team16 below this one once received.
      */}
      <Team16
        heading="Who leads the club"
        description="All LVFC head coaches have extensive training and qualifications, with support coaches trained to national standards. Our Director of Football sets the curriculum and coaching standards across every branch."
        teamMembers={leadership.map((person) => ({
          image: { src: IMG, alt: person.name },
          name: person.name,
          jobTitle: person.alsoRole ? `${person.role} · ${person.alsoRole}` : person.role,
          description: person.description,
          socialLinks: social,
        }))}
        footerContent={{
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

      <Layout442
        heading="Every child's safety comes first"
        description="Our Safeguarding Policy is reviewed annually and published in full. Safeguarding awareness training is mandatory annually for all staff, volunteers and officials, and everyone in a position of trust undergoes police or equivalent national background verification before appointment — led by our Designated Safeguarding Lead and Club Welfare Officer."
        buttons={[
          { ...cta.safeguarding, variant: "secondary-alt" },
          {
            ...cta.reportConcern,
            variant: "link-alt",
            size: "link",
            iconRight: <ChevronRight className="text-white" />,
          },
        ]}
        image={{ src: IMG, alt: "Safeguarding at LVFC" }}
      />

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
