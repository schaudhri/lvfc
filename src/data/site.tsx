import { type Navbar23Props } from "@/components/sections/Navbar23";
import { type Footer2Props } from "@/components/sections/Footer2";
import { FacebookLogo, InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo } from "relume-icons";
import { formatAges, programmeImage, programmes } from "@/data/programmes";
import { branches, branchPhoto } from "@/data/locations";
import { club } from "@/data/club";
import { cta } from "@/data/cta";
import { internationalPartners } from "@/data/partners";
import { aboutHeroCover, clubPhotos } from "@/data/clubPhotos";

const LOGO = { url: "/", src: "/logo.svg", alt: "Lahore Virgil Football Club" };

/**
 * WhatsApp enquiry channel.
 *
 * The number is a club fact and lives in Sanity under "Club settings" —
 * clearing it there hides the floating button across the whole site. The label
 * and opening message are copy that belongs with the button, so they stay here.
 */
export const whatsapp = {
  number: club.whatsappNumber,
  label: "Chat with us",
  message: "Hi LVFC — I'd like to ask about programmes for my child.",
};

/** A wa.me link with a prefilled message, or undefined when no number is set. */
export const whatsappLink = (message: string = whatsapp.message) =>
  whatsapp.number
    ? `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`
    : undefined;

const LAND = "/placeholder-image-landscape.svg";

/**
 * Primary navigation.
 *
 * Follows the IA agreed in the 5 July planning meeting, with the client's
 * revisions: Schedule added, Virtual Sports Nationally dropped, and Programmes
 * and Locations kept as separate destinations rather than merged.
 *
 * Coaching sits directly after Programmes, matching the agreed IA — a parent
 * choosing a programme is the same parent who wants to know who coaches it.
 *
 * Resources took Blog's slot in the bar (client request, Sept 2026). The blog
 * stays reachable from the footer's link row.
 *
 * Contact is deliberately NOT here either — "Book A Spot" is the single
 * primary action in the bar, and a competing Contact link next to it split
 * that intent. Contact stays reachable from the footer's link row, the
 * `cta.contact` buttons that close most pages, and the floating WhatsApp
 * button. If enquiry volume drops after launch, this is the first thing to
 * put back.
 */
export const navbarProps: Navbar23Props = {
  logo: LOGO,
  links: [
    {
      title: "New to LVFC",
      url: "/about",
      // Mirrors the About page's own sections — the CEO's letter, the team and
      // the international partners — and deep-links to each (client request,
      // 14 Sept 2026). "How to start" moved to the home page, so it isn't here.
      megaMenu: {
        title: "New to LVFC",
        description:
          "Our story in the CEO's own words, the team who run the club, and the partners who take our players beyond Lahore.",
        // Primary (terracotta), labelled like the menu item it belongs to
        // (client request, 14 Sept 2026).
        button: { ...cta.about, size: "sm" },
        items: [
          {
            url: "/about#letter",
            image: { src: "/images/hamza-letter.webp", alt: "Hamza Syed, Chief Executive Officer" },
            name: "A letter from our CEO",
            meta: "Why Hamza Syed started LVFC",
            detail: "Read the letter",
          },
          {
            url: "/about#team",
            image: aboutHeroCover,
            name: "Meet the team",
            meta: "The people who run the club",
            detail: "See who's who",
          },
          {
            url: "/about#partners",
            image: clubPhotos[5],
            name: "International partners",
            meta: internationalPartners.map((partner) => partner.name).join(" and "),
            detail: "See our partners",
          },
        ],
      },
    },
    {
      title: "Programmes",
      url: "/programmes",
      megaMenu: {
        title: "Find the right programme",
        description:
          "Every route into the club — from a first touch through to 16+ and selected competitive squads.",
        button: { ...cta.programmes, variant: "secondary", size: "sm" },
        // A preview, not the catalogue. The three youngest entry points cover
        // ages 3–12 — most of who walks in — and "See all programmes" beside
        // them carries the remaining seven. Ten cards in a dropdown is a list
        // to wade through, not a menu.
        items: programmes.slice(0, 3).map((programme) => ({
          url: `/programmes/${programme.slug}`,
          image: { src: programmeImage(programme).src, alt: programme.name },
          name: programme.name,
          meta: `${formatAges(programme.agesLabel)} · ${programme.tag}`,
          detail: programme.summary,
          badge: programme.flagship ? "Flagship" : undefined,
        })),
      },
    },
    { title: "Coaching", url: "/coaching" },
    {
      title: "Locations",
      url: "/locations",
      megaMenu: {
        title: "Where we train",
        description:
          "Four branches across Lahore. Pick the one nearest you to see its week and how to find it.",
        button: { ...cta.branches, variant: "secondary", size: "sm" },
        // All four fit, so there is nothing held back here — the button is a
        // route to the fuller page rather than a "there's more" affordance.
        items: branches.map((branch) => ({
          url: `/locations/${branch.slug}`,
          image: { src: branchPhoto(branch)?.src ?? LAND, alt: branchPhoto(branch)?.alt || branch.name },
          name: branch.name,
          meta: branch.address,
          detail: "See sessions and directions",
          badge: branch.status?.label,
        })),
      },
    },
    { title: "Schedule", url: "/schedule" },
    { title: "Resources", url: "/resources" },
    { title: "Private sessions", url: "/private-events" },
  ],
  // The nav keeps its gold Book A Spot — the one primary button that isn't
  // terracotta (Sept 2026). Over a hero photo Navbar23 swaps it for sandstone.
  buttons: [{ ...cta.bookASpot, size: "sm", variant: "champagne" }],
};

export const footerProps: Footer2Props = {
  logo: LOGO,
  newsletterHeading: "Stay in the loop",
  newsletterDescription: "Fixtures, trial announcements and club news.",
  inputPlaceholder: "Enter your email",
  // No mailing-list provider is wired up yet, so a subscribe request is mailed
  // to the club's general address rather than dropped. See Footer2's TODO.
  subscribeEmail: club.email,
  // Pages the main nav doesn't carry (client direction, Sept 2026), plus a
  // direct route to booking a private session, which the client asked for
  // here even though Private Sessions is also in the bar.
  links: [
    { title: "Book a private session", url: "/private-events" },
    { title: "Safeguarding", url: "/safeguarding" },
    { title: "Contact", url: "/contact" },
    { title: "Blog", url: "/blog" },
    { title: "FAQs", url: "/faqs" },
  ],
  // Only Instagram is confirmed. Entries with "#" are filtered out by Footer2
  // rather than rendered as links to nowhere — add real URLs to bring them back.
  socialMediaLinks: [
    {
      url: club.instagram.url,
      label: "LVFC on Instagram",
      icon: <InstagramLogo className="size-6 text-white" />,
    },
    { url: "#", label: "LVFC on Facebook", icon: <FacebookLogo className="size-6 text-white" /> },
    { url: "#", label: "LVFC on X", icon: <XLogo className="size-6 p-0.5 text-white" /> },
    { url: "#", label: "LVFC on LinkedIn", icon: <LinkedinLogo className="size-6 text-white" /> },
    { url: "#", label: "LVFC on YouTube", icon: <YoutubeLogo className="size-6 text-white" /> },
  ],
  footerText: "© 2026 Lahore Virgil Football Club. All rights reserved.",
  // TODO: a privacy statement is required before the club collects any
  // registration data through the site. Filtered out until it exists.
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
  ],
};
