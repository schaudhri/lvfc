"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
  /** Accessible name — the icon alone gives a screen reader nothing to say. */
  label?: string;
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
  /** One flat row of links — only pages the main nav doesn't already carry. */
  links: Links[];
  socialMediaLinks: SocialMediaLinks[];
  footerText?: string;
  footerLinks: FooterLink[];
};

export type Footer2Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Simplified footer (client direction, Sept 2026): the logo with a single row
 * of links beneath it and the newsletter signup beside them, then the social
 * icons, then the copyright centred at the foot. The old Club / Programmes /
 * Explore columns repeated the nav almost link for link, so they were dropped.
 */
export const Footer2 = (props: Footer2Props) => {
  const {
    logo,
    newsletterHeading,
    newsletterDescription,
    inputPlaceholder,
    subscribeEmail,
    links,
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

  return (
    // Maroon ground (Figma template, Sept 2026 — was neutral-darkest), white
    // type, and a white email box beside a white-outlined button. `text-white`
    // here is what the links and credits row inherit, so the only per-element
    // override below is the one the cascade can't reach — the logo (a
    // raster-ish SVG with baked-in #180B0C).
    <footer className="bg-brand-maroon px-[5%] py-12 text-white md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-x-[8vw] gap-y-10 lg:grid-cols-[1fr_0.5fr]">
          <div className="flex flex-col items-start gap-6 md:gap-8">
            <Link to={logo.url && logo.url !== "#" ? logo.url : "/"}>
              {/*
                The wordmark's paths are a hard-coded #180B0C, which is all but
                invisible on the dark ground. `brightness-0 invert` flattens it
                to pure white — matching the wireframe — without needing a
                second asset that would then have to be kept in sync.
              */}
              <img src={logo.src} alt={logo.alt} className="brightness-0 invert" />
            </Link>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 md:gap-x-8">
                {links.map((link) => (
                  <li key={link.url} className="text-small">
                    <Link to={link.url} className="flex min-h-11 items-center">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
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
            <h2 className="mb-3 font-medium text-white md:mb-4">{newsletterHeading}</h2>
            <p className="mb-4 text-small md:mb-5">{newsletterDescription}</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                name="email"
                required
                variant="secondary"
                placeholder={inputPlaceholder}
                aria-label="Your email address"
                className="bg-white/90 text-brand-maroon placeholder:text-brand-maroon/70"
              />
              <Button type="submit" variant="secondary-alt" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Pull the row out by the tap target's padding so the glyphs, not
            their 44px hit areas, line up with the text edges. */}
        <div className="-ml-2.5 mt-2 flex items-center gap-3 md:mt-4">
          {liveSocialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex size-11 items-center justify-center"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-x-6 gap-y-2 pt-10 text-center text-small md:flex-row md:justify-center md:pt-12">
          <p>{footerText}</p>
          {liveFooterLinks.map((link, index) => (
            <p key={index} className="underline">
              <Link to={link.url} className="flex min-h-11 items-center">
                {link.title}
              </Link>
            </p>
          ))}
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
  links: [
    { title: "Link One", url: "#" },
    { title: "Link Two", url: "#" },
    { title: "Link Three", url: "#" },
  ],
  socialMediaLinks: [
    { url: "#", label: "Facebook", icon: <FacebookLogo className="size-6 text-scheme-text" /> },
    { url: "#", label: "Instagram", icon: <InstagramLogo className="size-6 text-scheme-text" /> },
    { url: "#", label: "X", icon: <XLogo className="size-6 p-0.5 text-scheme-text" /> },
    { url: "#", label: "LinkedIn", icon: <LinkedinLogo className="size-6 text-scheme-text" /> },
    { url: "#", label: "YouTube", icon: <YoutubeLogo className="size-6 text-scheme-text" /> },
  ],
  footerText: "© 2026 LVFC. All rights reserved.",
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
    { title: "Cookies Settings", url: "#" },
  ],
};
