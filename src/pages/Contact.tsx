import { Header54 } from "@/components/sections/Header54";
import { BranchWeek } from "@/components/sections/BranchWeek";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { club, safeguardingContacts, leaguesContact } from "@/data/club";
import { branches } from "@/data/locations";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos } from "@/data/clubPhotos";

type Channel = {
  title: string;
  description: string;
  value: string;
  href?: string;
  external?: boolean;
};

const channels: Channel[] = [
  {
    title: "General enquiries",
    description: "Programmes, fees, availability — anything about joining the club.",
    value: club.email,
    href: `mailto:${club.email}`,
  },
  {
    title: "Register or book a spot",
    description: "Registration runs through our online booking portal.",
    value: club.bookingPortal.label,
    href: club.bookingPortal.programmes,
    external: true,
  },
  {
    title: "Report an absence",
    description:
      "Let us know at least 24 hours before the session and we'll do our best to arrange a make-up.",
    value: club.absenceLine,
    href: `tel:${club.absenceLine}`,
  },
  {
    title: "Follow the club",
    description: "Fixtures, trial announcements and everyday life across the four branches.",
    value: club.instagram.handle,
    href: club.instagram.url,
    external: true,
  },
];

const ChannelCard = ({ channel }: { channel: Channel }) => (
  <div className="flex flex-col rounded-card bg-neutral-lightest p-6">
    <h3 className="mb-2 text-h6 font-bold">{channel.title}</h3>
    <p className="mb-5 text-scheme-text/80">{channel.description}</p>
    {channel.href ? (
      <a
        href={channel.href}
        {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-auto inline-flex min-h-6 items-center font-semibold underline underline-offset-2"
      >
        {channel.value}
      </a>
    ) : (
      <span className="mt-auto font-semibold">{channel.value}</span>
    )}
  </div>
);

export const Contact = () => {
  useDocumentMeta(
    "Contact",
    "Get in touch about programmes, fees or which branch suits your family — plus our safeguarding and league contacts.",
  );
  return (
    <>
      <Header54
        heading="Get in touch"
        description="Questions about programmes, fees or which branch suits your family? Reach us however works best — or come and stand on the touchline at a session."
        image={{ src: clubPhotos[8].src, alt: "LVFC coaches and families at a session" }}
      />

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <h2 className="mb-8 text-h3 font-bold">How to reach us</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel) => (
              <ChannelCard key={channel.title} channel={channel} />
            ))}
          </div>
        </div>
      </section>

      <ContactForm className="border-t border-scheme-border/20" />

      <section className="border-t border-scheme-border/20 px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-4 text-h3 font-bold">Visit a branch</h2>
            <p className="text-medium">
              You're welcome to visit any of our four branches during training hours. Sessions run in
              the evening on weekdays, with weekend morning sessions at select branches.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {branches.map((branch) => (
              <div key={branch.slug} className="rounded-card bg-neutral-lightest p-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-h6 font-bold">{branch.name}</h3>
                  {branch.status && <Badge>{branch.status.label}</Badge>}
                </div>
                <p className="mb-5 text-scheme-text/80">{branch.address}</p>
                <BranchWeek slug={branch.slug} className="sm:grid-cols-3 lg:grid-cols-3" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button {...cta.branches} variant="secondary">{cta.branches.title}</Button>
          </div>
        </div>
      </section>

      <section className="border-t border-scheme-border/20 px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="mb-4 text-h4 font-bold">Safeguarding & welfare</h2>
              <p className="mb-5 text-scheme-text/80">
                If you need to raise a concern about a child's welfare, use our safeguarding
                contact below and we will route it to the right person without delay. Our
                Designated Safeguarding Lead is{" "}
                {safeguardingContacts.designatedSafeguardingLead.name},{" "}
                {safeguardingContacts.designatedSafeguardingLead.role}, supported by{" "}
                {safeguardingContacts.clubWelfareOfficer.name} as{" "}
                {safeguardingContacts.clubWelfareOfficer.role}.
              </p>
              {/*
                The contact details below are the club's safeguarding channel and are
                deliberately not attributed to either named officer: the source
                documents give these details under a third person's name. Replace with
                the Club Welfare Officer's own email and phone once confirmed.
              */}
              <p className="mb-2 text-tiny font-semibold uppercase tracking-wider text-scheme-text/60">
                Safeguarding contact
              </p>
              <ul className="mb-6 flex flex-col gap-2">
                <li>
                  <a
                    href={`mailto:${safeguardingContacts.welfareEmail}`}
                    className="inline-flex min-h-6 items-center font-semibold underline underline-offset-2"
                  >
                    {safeguardingContacts.welfareEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${safeguardingContacts.welfarePhone.replace(/\s/g, "")}`}
                    className="inline-flex min-h-6 items-center font-semibold underline underline-offset-2"
                  >
                    {safeguardingContacts.welfarePhone}
                  </a>
                </li>
              </ul>
              <Button {...cta.safeguarding} variant="secondary" size="sm">
                {cta.safeguarding.title}
              </Button>
            </div>

            <div>
              <h2 className="mb-4 text-h4 font-bold">Leagues & clubs</h2>
              <p className="mb-5 text-scheme-text/80">
                For ELJPL, LJPL or Virgil Sports National League registration enquiries, contact{" "}
                {leaguesContact.name}, {leaguesContact.role}.
              </p>
              <a
                href={`mailto:${leaguesContact.email}`}
                className="inline-flex min-h-6 items-center font-semibold underline underline-offset-2"
              >
                {leaguesContact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
