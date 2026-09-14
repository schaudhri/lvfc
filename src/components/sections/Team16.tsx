import { Button, type ButtonProps } from "@/components/ui/button";
import { DribbbleLogo, LinkedinLogo, XLogo } from "relume-icons";

type ImageProps = {
  src: string;
  alt?: string;
};

type Footer = {
  heading: string;
  description: string;
  button: ButtonProps;
};

type SocialLink = {
  href: string;
  icon: React.ReactNode;
};

type TeamMember = {
  image: ImageProps;
  name: string;
  jobTitle: string;
  description: string;
  email?: string;
  socialLinks: SocialLink[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  teamMembers: TeamMember[];
  /** Optional closing block under the team. Omit it to show none. */
  footerContent?: Footer;
  /**
   * Lead with this many people in a wide two-up row, then the rest three
   * across. Five people two-up otherwise leaves the fifth alone on a row.
   */
  featured?: number;
};

export type Team16Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Team16 = (props: Team16Props) => {
  const { heading, description, teamMembers } = {
    ...Team16Defaults,
    ...props,
  };
  // Read from props only: the Relume default ("We're hiring!") must never
  // appear just because a page chose not to have a footer.
  const { footerContent, featured } = props;
  const lead = featured === undefined ? teamMembers : teamMembers.slice(0, featured);
  const rest = featured === undefined ? [] : teamMembers.slice(featured);
  return (
    <section id={props.id} className="scroll-mt-10 px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start md:grid-flow-row md:gap-x-12 lg:gap-x-20">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-medium md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        {/* `featured` omitted: everyone two-up. `featured={2}`: two wide, then
            three across (About). `featured={0}`: everyone three across
            (Coaching, client request 14 Sept 2026). */}
        {lead.length > 0 && (
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
            {lead.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        )}
        {rest.length > 0 && (
          <div
            className={`grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 ${lead.length > 0 ? "mt-12 md:mt-16" : ""}`}
          >
            {rest.map((member, index) => (
              <TeamMember key={index} member={member} stacked />
            ))}
          </div>
        )}
        {footerContent && (
          <div className="mt-14 w-full max-w-md md:mt-20 lg:mt-24">
            <h3 className="mb-3 text-h4 font-medium md:mb-4">{footerContent.heading}</h3>
            <p className="text-medium">{footerContent.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button {...footerContent.button}>{footerContent.button.title}</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const TeamMember = ({ member, stacked = false }: { member: TeamMember; stacked?: boolean }) => {
  return (
    <div
      className={
        stacked
          ? "grid grid-cols-1 items-start gap-5 sm:gap-y-6"
          : "grid grid-cols-1 items-start gap-5 sm:gap-y-6 md:grid-cols-2 md:gap-x-8"
      }
    >
      <div className="w-full overflow-hidden">
        <img
          src={member.image.src}
          alt={member.image.alt}
          className="aspect-square size-full rounded-image object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="mb-3 md:mb-4">
          <h3 className="text-large font-medium">{member.name}</h3>
          <p className="text-medium">{member.jobTitle}</p>
        </div>
        <p>{member.description}</p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-4 inline-flex min-h-6 w-fit items-center font-semibold underline underline-offset-2"
          >
            {member.email}
          </a>
        )}
        <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-start md:mt-6">
          {member.socialLinks.map((link, index) => (
            <a key={index} href={link.href}>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Team16Defaults: Props = {
  tagline: "Tagline",
  heading: "Our team",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  teamMembers: [
    {
      image: {
        src: "/placeholder-image.svg",
        alt: "Relume placeholder image 1",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { href: "#", icon: <LinkedinLogo className="size-6 text-scheme-text" /> },
        { href: "#", icon: <XLogo className="size-6 p-0.5 text-scheme-text" /> },
        { href: "#", icon: <DribbbleLogo className="size-6 text-scheme-text" /> },
      ],
    },
    {
      image: {
        src: "/placeholder-image.svg",
        alt: "Relume placeholder image 2",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { href: "#", icon: <LinkedinLogo className="size-6 text-scheme-text" /> },
        { href: "#", icon: <XLogo className="size-6 p-0.5 text-scheme-text" /> },
        { href: "#", icon: <DribbbleLogo className="size-6 text-scheme-text" /> },
      ],
    },
    {
      image: {
        src: "/placeholder-image.svg",
        alt: "Relume placeholder image 3",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { href: "#", icon: <LinkedinLogo className="size-6 text-scheme-text" /> },
        { href: "#", icon: <XLogo className="size-6 p-0.5 text-scheme-text" /> },
        { href: "#", icon: <DribbbleLogo className="size-6 text-scheme-text" /> },
      ],
    },
    {
      image: {
        src: "/placeholder-image.svg",
        alt: "Relume placeholder image 4",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { href: "#", icon: <LinkedinLogo className="size-6 text-scheme-text" /> },
        { href: "#", icon: <XLogo className="size-6 p-0.5 text-scheme-text" /> },
        { href: "#", icon: <DribbbleLogo className="size-6 text-scheme-text" /> },
      ],
    },
  ],
};
