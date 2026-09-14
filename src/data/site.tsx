import { type Navbar23Props } from "@/components/sections/Navbar23";
import { type Footer2Props } from "@/components/sections/Footer2";
import { FacebookLogo, InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo } from "relume-icons";
import { formatAges, programmeImage, programmes } from "@/data/programmes";
import { branches } from "@/data/locations";
import { club } from "@/data/club";
import { cta } from "@/data/cta";
import { internationalPartners } from "@/data/partners";
import { aboutHeroCover, clubPhotos, coachPhotos } from "@/data/clubPhotos";

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
 * stays reachable from the footer "Explore" column.
 *
 * Contact is deliberately NOT here either — "Book A Spot" is the single
 * primary action in the bar, and a competing Contact link next to it split
 * that intent. Contact stays reachable from the footer "Club" column, the
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
      // The team and partners are sections of other pages rather than pages of
      // their own, so their cards deep-link to the section (client request,
      // Sept 2026).
      megaMenu: {
        title: "New to LVFC",
        description:
          "Who we are, who leads the club, and the partners who take our players beyond Lahore.",
        button: { title: "Start here", url: "/about", variant: "secondary", size: "sm" },
        items: [
          {
            url: "/about",
            image: aboutHeroCover,
            name: "Who we are",
            meta: "The club and how to join",
            detail: "Read our story",
          },
          {
            url: "/coaching#team",
            image: { src: coachPhotos[0].src, alt: "LVFC coaching staff" },
            name: "Meet the team",
            meta: "The people who lead the club",
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
          image: { src: branch.image?.src ?? LAND, alt: branch.image?.alt || branch.name },
          name: branch.name,
          meta: branch.address,
          detail: "See sessions and directions",
          badge: branch.status?.label,
        })),
      },
    },
    { title: "Schedule", url: "/schedule" },
    { title: "Resources", url: "/resources" },
    { title: "Private Sessions", url: "/private-events" },
  ],
  // The nav keeps its gold Book A Spot — the one primary button that isn't
  // terracotta (Sept 2026). Over a hero photo Navbar23 swaps it for sandstone.
  buttons: [{ ...cta.bookASpot, size: "sm", variant: "champagne" }],
};

export const footerProps: Footer2Props = {
  logo: LOGO,
  newsletterHeading: "Stay in the loop",
  newsletterDescription: "Fixtures, trial announcements and club news, straight to your inbox.",
  inputPlaceholder: "Enter your email",
  // No mailing-list provider is wired up yet, so a subscribe request is mailed
  // to the club's general address rather than dropped. See Footer2's TODO.
  subscribeEmail: club.email,
  columnLinks: [
    {
      title: "Club",
      links: [
        { title: "New to LVFC", url: "/about" },
        { title: "How we coach", url: "/coaching" },
        { title: "Private sessions & birthdays", url: "/private-events" },
        { title: "Safeguarding", url: "/safeguarding" },
        { title: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Programmes",
      // Eleven entries. Split across two cells so the list doesn't set the
      // footer's height on its own — see Footer2's `wide`.
      wide: true,
      links: [
        { title: "All programmes", url: "/programmes" },
        ...programmes.map((programme) => ({
          title: programme.name,
          url: `/programmes/${programme.slug}`,
        })),
      ],
    },
    {
      title: "Explore",
      links: [
        { title: "Locations", url: "/locations" },
        { title: "Schedule", url: "/schedule" },
        { title: "Resources", url: "/resources" },
        { title: "Blog", url: "/blog" },
        { title: "FAQs", url: "/faqs" },
      ],
    },
  ],
  // Only Instagram is confirmed. Entries with "#" are filtered out by Footer2
  // rather than rendered as links to nowhere — add real URLs to bring them back.
  socialMediaLinks: [
    { url: club.instagram.url, icon: <InstagramLogo className="size-6 text-white" /> },
    { url: "#", icon: <FacebookLogo className="size-6 text-white" /> },
    { url: "#", icon: <XLogo className="size-6 p-0.5 text-white" /> },
    { url: "#", icon: <LinkedinLogo className="size-6 text-white" /> },
    { url: "#", icon: <YoutubeLogo className="size-6 text-white" /> },
  ],
  footerText: "© 2026 Lahore Virgil Football Club. All rights reserved.",
  // TODO: a privacy statement is required before the club collects any
  // registration data through the site. Filtered out until it exists.
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
  ],
};
