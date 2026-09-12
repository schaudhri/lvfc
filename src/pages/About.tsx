import { ChevronRight } from "relume-icons";
import { Header30 } from "@/components/sections/Header30";
import { Layout1 } from "@/components/sections/Layout1";
import { Layout242 } from "@/components/sections/Layout242";
import { Layout121 } from "@/components/sections/Layout121";
import { Layout442 } from "@/components/sections/Layout442";
import { Header62 } from "@/components/sections/Header62";
import { programmes } from "@/data/programmes";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { aboutHeroCover, clubPhotos } from "@/data/clubPhotos";
import { CeoLetter } from "@/components/sections/CeoLetter";
import { internationalPartners } from "@/data/partners";
import { cardPadded } from "@/lib/surface";
import { cn } from "@/lib/utils";

export const About = () => {
  useDocumentMeta(
    "New to LVFC",
    "Who we are and how to start. Lahore Virgil Football Club is run by Virgil Sports, with a UEFA-aligned curriculum and a pathway from age 2 to 18.",
  );
  return (
    <>
      <Header30
        heading="A club built on the spirit of Lahore"
        description="Lahore Virgil Football Club is run by Virgil Sports — professionalising youth football in Pakistan with a UEFA-aligned curriculum and a real pathway."
        buttons={[
          { ...cta.bookASpot, variant: "alternate" },
          { ...cta.programmes, variant: "secondary-alt" },
        ]}
        image={aboutHeroCover}
      />

      <CeoLetter />

      <Layout242
        heading="Our vision, mission and what we stand for"
        sections={[
          {
            heading: "International standards",
            description:
              "A UEFA-aligned youth development curriculum, adapted for our age groups and directed by Steve Hamilton, our Director of Football. The curriculum emphasises technical skills, tactical understanding, physical development and mental resilience.",
            button: {
              title: "Coaching methodology",
              url: "/coaching",
              variant: "link",
              size: "link",
              iconRight: <ChevronRight className="text-scheme-text" />,
            },
          },
          {
            heading: "A real pathway",
            description:
              "From a first touch aged two through to selected competitive squads: five age groups, monthly progress reports, and formal trials twice a year for players ready to step up to the competitive track.",
            button: {
              title: "Player pathway",
              url: "/programmes",
              variant: "link",
              size: "link",
              iconRight: <ChevronRight className="text-scheme-text" />,
            },
          },
          {
            heading: "Open to everyone",
            description:
              "Our club programme is mass-participation by design — open to boys and girls of all ages and abilities across all four branches, with a route into the academy for high performers.",
            button: {
              title: "See programmes",
              url: "/programmes",
              variant: "link",
              size: "link",
              iconRight: <ChevronRight className="text-scheme-text" />,
            },
          },
        ]}
      />

      <Layout121
        heading="How to start your journey?"
        buttons={[
          { ...cta.bookASpot, variant: "secondary" },
          {
            title: "Talk to us",
            url: "/contact",
            variant: "link",
            size: "link",
            iconRight: <ChevronRight className="text-scheme-text" />,
          },
        ]}
        features={[
          {
            heading: "Choose a programme",
            description: `${programmes
              .map((programme) => programme.name)
              .join(", ")} — pick the track that fits your child's age and ambition.`,
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
        description="Our Safeguarding Policy is reviewed annually and published in full, adopting the principles of the Pakistan Football Federation, the English FA, US Youth Soccer and the FIFA Guardians Toolkit. All staff working with children complete safeguarding training annually and undergo background verification before they start."
        buttons={[
          { ...cta.safeguarding, variant: "secondary-alt" },
          {
            ...cta.reportConcern,
            variant: "link-alt",
            size: "link",
            iconRight: <ChevronRight className="text-white" />,
          },
        ]}
        image={{ src: clubPhotos[2].src, alt: "Safeguarding at LVFC" }}
      />

      <section id="partners" className="scroll-mt-10 px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-4 text-h3 font-bold">International partners</h2>
            <p className="text-medium">
              Clinics, exchange trips and training pathways that take our players and coaches
              beyond Lahore.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {internationalPartners.map((partner) => (
              <li key={partner.name} className={cn("flex flex-col", cardPadded)}>
                <div
                  className={cn(
                    "mb-5 inline-flex w-fit items-center rounded-badge px-4 py-3",
                    partner.logo.chip === "dark" ? "bg-brand-maroon" : "bg-white",
                  )}
                >
                  <img src={partner.logo.src} alt={partner.logo.alt} className="h-9 w-auto" />
                </div>
                <h3 className="text-h5 font-bold">{partner.name}</h3>
                <p className="mb-3 text-small font-semibold text-scheme-text/70">
                  {partner.location}
                </p>
                <p className="mb-5 text-scheme-text/85">{partner.summary}</p>
                <ul className="mb-6 flex flex-col gap-2 text-small">
                  {partner.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden="true">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {partner.url && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-6 items-center gap-1.5 text-small font-semibold underline-offset-4 hover:underline"
                  >
                    Visit website
                    <ChevronRight className="size-4" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        TODO — SCHEME DETAILS NOT YET SUPPLIED. None of the four client documents
        mention scholarships, bursaries or means-tested places, so this section
        deliberately states intent without inventing specifics. Before launch we
        need from the club: how many places, who is eligible, what the award
        covers (fees? kit? travel?), and how a family applies.

        Until then the copy promises nothing concrete and the CTA points at
        /contact — a channel that actually answers. Do NOT add an "Apply" button
        until there is something real behind it: a dead apply link is a false
        offer of financial help aimed at the families least able to absorb the
        disappointment.
      */}
      <Layout1
        heading="Scholarships"
        description="Cost should never be the reason a child stops playing. We are building a scholarship route for families who need support to keep their child in the game, and we would rather hear from you early than have you rule us out on price. Places, eligibility and how to apply are being finalised — get in touch and we will tell you exactly where things stand."
        buttons={[
          { ...cta.contact, variant: "secondary" },
          {
            title: "See all programmes",
            url: "/programmes",
            variant: "link",
            size: "link",
            iconRight: <ChevronRight className="text-scheme-text" />,
          },
        ]}
        image={{ src: clubPhotos[3].src, alt: "Young players training at an LVFC branch" }}
      />

      <Header62
        heading="Come and see for yourself"
        description="Get in touch and come along to a session — the best way to understand LVFC is to stand on the touchline."
        buttons={[{ ...cta.bookASpot }, { ...cta.contact, variant: "secondary" }]}
      />
    </>
  );
};
