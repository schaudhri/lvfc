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
  socialLinks: SocialLink[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  teamMembers: TeamMember[];
  footerContent: Footer;
};

export type Team16Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Team16 = (props: Team16Props) => {
  const { heading, description, teamMembers, footerContent } = {
    ...Team16Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start md:grid-flow-row md:gap-x-12 lg:gap-x-20">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
        <div className="mt-14 w-full max-w-md md:mt-20 lg:mt-24">
          <h3 className="mb-3 text-h4 font-bold md:mb-4">{footerContent.heading}</h3>
          <p className="text-medium">{footerContent.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <Button {...footerContent.button}>{footerContent.button.title}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ member }: { member: TeamMember }) => {
  return (
    <div className="grid grid-cols-1 items-start gap-5 sm:gap-y-6 md:grid-cols-2 md:gap-x-8">
      <div className="w-full overflow-hidden">
        <img
          src={member.image.src}
          alt={member.image.alt}
          className="aspect-square size-full rounded-image object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="mb-3 md:mb-4">
          <h3 className="text-large font-semibold">{member.name}</h3>
          <p className="text-medium">{member.jobTitle}</p>
        </div>
        <p>{member.description}</p>
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
  footerContent: {
    heading: "We're hiring!",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    button: { title: "Open positions", variant: "secondary" },
  },
};
