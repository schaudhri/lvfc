"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FacebookLogo, InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo } from "relume-icons";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type ColumnLinks = {
  title: string;
  links: Links[];
  /** Spans two grid cells and lays its links out in two sub-columns. */
  wide?: boolean;
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type FooterLink = {
  title: string;
  url: string;
};

type Props = {
  logo: ImageProps;
  newsletterHeading: string;
  newsletterDescription: string;
  inputPlaceholder: string;
  /** Where a subscribe request is mailed until a list provider is wired up. */
  subscribeEmail: string;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
  footerText?: string;
  footerLinks: FooterLink[];
};

export type Footer2Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Footer2 = (props: Footer2Props) => {
  const {
    logo,
    newsletterHeading,
    newsletterDescription,
    inputPlaceholder,
    subscribeEmail,
    columnLinks,
    socialMediaLinks,
    footerText,
    footerLinks,
  } = {
    ...Footer2Defaults,
    ...props,
  };

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!email) return;
    const subject = encodeURIComponent("Newsletter signup");
    const body = encodeURIComponent(`Please add this address to the LVFC mailing list: ${email}`);
    window.location.href = `mailto:${subscribeEmail}?subject=${subject}&body=${body}`;
  };

  // Dead links are worse than absent ones — a screen reader announces "#" as a
  // link to nowhere. Only render social icons that have a real destination.
  const liveSocialLinks = socialMediaLinks.filter(
    (link) => link.url && link.url !== "#",
  );
  const liveFooterLinks = footerLinks.filter((link) => link.url && link.url !== "#");

  const linkSlots = 1 + columnLinks.reduce((total, column) => total + (column.wide ? 2 : 1), 0);

  return (
    // Dark scheme per the "Footer / 2" wireframe (Figma node 78:1779):
    // neutral-darkest ground, white type, white-outlined controls. `text-white`
    // here is what the column headings, links and credits row inherit, so the
    // only per-element overrides below are the ones the cascade can't reach —
    // the logo (a raster-ish SVG with baked-in #180B0C) and the divider.
    <footer className="bg-neutral-darkest px-[5%] py-12 text-white md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-x-[8vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20">
          <div
            className={cn(
              "grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 md:gap-x-8",
              // One cell for the logo plus one per column, two for a wide one.
              linkSlots >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
            )}
          >
            <Link
              to={logo.url && logo.url !== "#" ? logo.url : "/"}
              className="sm:col-start-1 sm:col-end-4 sm:row-start-1 sm:row-end-2 lg:col-start-auto lg:col-end-auto lg:row-start-auto lg:row-end-auto"
            >
              {/*
                The wordmark's paths are a hard-coded #180B0C, which is all but
                invisible on the dark ground. `brightness-0 invert` flattens it
                to pure white — matching the wireframe — without needing a
                second asset that would then have to be kept in sync.
              */}
              <img src={logo.src} alt={logo.alt} className="brightness-0 invert" />
            </Link>
            {columnLinks.map((column, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-start justify-start",
                  // A `wide` column takes two grid cells and splits its links
                  // across both, under one heading. Without it the programme
                  // list runs eleven items deep and sets the footer's height
                  // on its own.
                  column.wide && "sm:col-span-2 lg:col-span-2",
                )}
              >
                <h2 className="mb-3 font-semibold md:mb-4">{column.title}</h2>
                {/*
                  Multi-column rather than a grid: it flows down the first
                  column and into the second, which is the order a footer list
                  reads in, and it doesn't couple the two columns' row heights
                  — a grid left gaps wherever one side wrapped to two lines.
                */}
                <ul className={cn(column.wide && "sm:columns-2 sm:gap-x-8")}>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="text-small break-inside-avoid">
                      <Link
                        to={link.url}
                        className="flex min-h-11 items-center gap-3 py-2"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/*
            The original Relume form was removed because its only submit
            handler was a console.log — it silently swallowed every address.
            It is back as the wireframe draws it, but submitting now composes
            a real mail to the club rather than pretending a list exists.

            TODO: when a list provider (Mailchimp, Brevo, whatever the club
            picks) is chosen, swap `handleSubscribe` for a POST to its endpoint
            and drop the mail-client hop. The markup below won't need to change.
          */}
          <div className="flex flex-col">
            <h2 className="mb-3 font-semibold md:mb-4">{newsletterHeading}</h2>
            <p className="mb-4 text-small md:mb-5">{newsletterDescription}</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                name="email"
                required
                variant="secondary"
                placeholder={inputPlaceholder}
                aria-label="Your email address"
                className="bg-transparent text-white"
              />
              <Button type="submit" variant="secondary-alt" className="shrink-0">
                Subscribe
              </Button>
            </form>
            <p className="mt-3 text-tiny text-white/70">
              Opens your email app so you can send the request. We'll only use your address to
              send club news.
            </p>
          </div>
        </div>
        <div className="h-px w-full bg-white/20" />
        <div className="flex flex-col-reverse items-start pt-6 pb-4 text-small md:justify-start md:pt-8 md:pb-0 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-start gap-4 md:flex-row md:gap-6 lg:items-center">
            <p className="mt-4 md:mt-0">{footerText}</p>
            <div className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-2 md:grid-flow-col md:justify-center md:gap-x-6 md:gap-y-0 lg:text-left">
              {liveFooterLinks.map((link, index) => (
                <p key={index} className="underline">
                  <Link to={link.url} className="flex min-h-11 items-center">
                    {link.title}
                  </Link>
                </p>
              ))}
            </div>
          </div>
          <div className="mb-8 flex items-center justify-center gap-3 lg:mb-0">
            {liveSocialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer2Defaults: Props = {
  logo: {
    url: "#",
    src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
    alt: "Logo image",
  },
  newsletterHeading: "Subscribe",
  newsletterDescription: "Join our newsletter to stay up to date on features and releases.",
  inputPlaceholder: "Enter your email",
  subscribeEmail: "",
  columnLinks: [
    {
      title: "Column One",
      links: [
        { title: "Link One", url: "#" },
        { title: "Link Two", url: "#" },
        { title: "Link Three", url: "#" },
        { title: "Link Four", url: "#" },
        { title: "Link Five", url: "#" },
      ],
    },
    {
      title: "Column Two",
      links: [
        { title: "Link Six", url: "#" },
        { title: "Link Seven", url: "#" },
        { title: "Link Eight", url: "#" },
        { title: "Link Nine", url: "#" },
        { title: "Link Ten", url: "#" },
      ],
    },
    {
      title: "Column Three",
      links: [
        { title: "Link Eleven", url: "#" },
        { title: "Link Twelve", url: "#" },
        { title: "Link Thirteen", url: "#" },
        { title: "Link Fourteen", url: "#" },
        { title: "Link Fifteen", url: "#" },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "#", icon: <FacebookLogo className="size-6 text-scheme-text" /> },
    { url: "#", icon: <InstagramLogo className="size-6 text-scheme-text" /> },
    { url: "#", icon: <XLogo className="size-6 p-0.5 text-scheme-text" /> },
    { url: "#", icon: <LinkedinLogo className="size-6 text-scheme-text" /> },
    { url: "#", icon: <YoutubeLogo className="size-6 text-scheme-text" /> },
  ],
  footerText: "© 2026 LVFC. All rights reserved.",
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
    { title: "Cookies Settings", url: "#" },
  ],
};
