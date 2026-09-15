import { ChevronRight } from "relume-icons";
import { Header30 } from "@/components/sections/Header30";
import { Layout1 } from "@/components/sections/Layout1";
import { Layout242 } from "@/components/sections/Layout242";
import { Team16 } from "@/components/sections/Team16";
import { Header62 } from "@/components/sections/Header62";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { aboutHeroCover, clubPhotos, coachPhotos } from "@/data/clubPhotos";
import { CeoLetter } from "@/components/sections/CeoLetter";
import { internationalPartners } from "@/data/partners";
import { leadership } from "@/data/people";
import { cardPadded } from "@/lib/surface";
import { cn } from "@/lib/utils";

export const About = () => {
  useDocumentMeta(
    "New to LVFC",
    "Who we are and how to start. Lahore Virgil Football Club is run by Virgil Sports, with a UEFA-aligned curriculum and a pathway from age 2 to 18.",
  );
  return (
    <>
      {/* Title only, and shorter than the full screen (client request,
          14 Sept 2026) — the letter below is the introduction. */}
      <Header30 heading="A club built on the spirit of Lahore" image={aboutHeroCover} />

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
              iconRight: <ChevronRight className="size-5 text-brand-terracotta" />,
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
              iconRight: <ChevronRight className="size-5 text-brand-terracotta" />,
            },
          },
          {
            heading: "Open to everyone",
            description:
              "Every programme is open to boys and girls of any ability, across all four branches — no trial needed to join. Players who want more can step up to our competitive squads, and end-of-term showcases and certificates mark the progress along the way.",
            button: {
              title: "See all programmes",
              url: "/programmes",
              variant: "link",
              size: "link",
              iconRight: <ChevronRight className="size-5 text-brand-terracotta" />,
            },
          },
        ]}
      />

      {/*
        The team, where "How to start your journey" used to sit — those steps
        moved to the home page (Figma "lvfc-website", node 19:576). Two people
        wide, then three across.
      */}
      <Team16
        id="team"
        featured={2}
        heading="The team"
        description="All LVFC head coaches have extensive training and qualifications, with support coaches trained to national standards. Our Director of Football sets the curriculum and coaching standards across every branch."
        teamMembers={leadership.map((person, index) => ({
          // A real headshot where the club has supplied one; otherwise a stand-in.
          image: {
            src: person.photo?.src ?? coachPhotos[index % coachPhotos.length].src,
            alt: person.name,
          },
          name: person.name,
          jobTitle: person.alsoRole ? `${person.role} · ${person.alsoRole}` : person.role,
          description: person.description,
          email: person.email,
          socialLinks: [],
        }))}
      />

      <section id="partners" className="scroll-mt-10 px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-5 text-h3 font-medium md:mb-6">International partners</h2>
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
                    partner.logo.chip === "dark" ? "bg-brand-maroon" : "bg-brand-sandstone",
                  )}
                >
                  <img src={partner.logo.src} alt={partner.logo.alt} className="h-9 w-auto" />
                </div>
                <h3 className="text-h5 font-medium">{partner.name}</h3>
                <p className="mb-3 text-small font-semibold text-scheme-text/70">
                  {partner.location}
                </p>
                <p className="mb-5 text-scheme-text/70">{partner.summary}</p>
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
                    className="mt-auto self-start inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-terracotta underline-offset-4 hover:underline lg:min-h-0"
                  >
                    Visit website
                    <ChevronRight className="size-5 text-brand-terracotta transition-transform duration-200 group-hover:translate-x-0.5" />
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
            iconRight: <ChevronRight className="size-5 text-brand-terracotta" />,
          },
        ]}
        image={{ src: clubPhotos[3].src, alt: "Young players training at an LVFC branch" }}
      />

      <Header62
        heading="Come and see for yourself"
        description="Get in touch and come along to a session — the best way to understand LVFC is to stand on the touchline."
        button={cta.bookASpot}
      />
    </>
  );
};
