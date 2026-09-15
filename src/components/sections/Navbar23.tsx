"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight, KeyboardArrowDown } from "relume-icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

/** A card inside the mega menu — a programme rather than a product. */
type MegaMenuItem = {
  url: string;
  image: ImageProps;
  name: string;
  meta: string;
  /** Supporting copy, e.g. a programme's summary. Plain text. */
  detail?: string;
  /** The card's action, drawn in the site-wide "Learn more >" link style. */
  cta?: string;
  badge?: string;
};

type MegaMenuProps = {
  title: string;
  description: string;
  button: ButtonProps;
  items: MegaMenuItem[];
};

type LinkProps = {
  title: string;
  url: string;
  megaMenu?: MegaMenuProps;
};

type Props = {
  logo: ImageProps;
  links: LinkProps[];
  buttons: ButtonProps[];
  /**
   * Whether this page has a dark hero directly under the nav to overlay.
   * True renders the bar transparent at the very top of the page (crossfading
   * to the normal solid bar once scrolled or on pages without one — the blog
   * article template and the 404 page render straight onto the light page
   * background, where white nav text would be unreadable).
   */
  transparentAtTop?: boolean;
};

export type Navbar23Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Navbar23 = (props: Navbar23Props) => {
  const { logo, links, buttons, transparentAtTop } = {
    ...Navbar23Defaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  /** Index of the open mega menu, held here so the page can be dimmed behind it. */
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const { pathname } = useLocation();
  /** The nav item for the section you're in, so you can see where you are. */
  const isCurrent = (url: string) =>
    url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(`${url}/`);
  const isMegaMenuOpen = !isMobile && openMenu !== null;

  // The open mobile menu needs a solid background of its own regardless of
  // scroll position — its links render inside this same header. So does an
  // open mega menu, which hangs off the bar over the dimmed page.
  const isTransparent =
    transparentAtTop && !isScrolled && !isMobileMenuOpen && !isMegaMenuOpen;

  // Following a link out of either menu lands on a new page — close them, or
  // the menu stays hanging over it (the pointer is still inside it on desktop,
  // so no mouseleave ever fires).
  useEffect(() => {
    setOpenMenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!transparentAtTop) return;
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentAtTop]);

  // The open menu covers the viewport, so the page behind it must not scroll —
  // otherwise content slides around underneath the overlay.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  // Escape should close it, as it would any overlay.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  return (
    <>
    {/* Dims the page behind an open mega menu (desktop only — on phones the
        menu is already a full-screen sheet). Sits just under the header. */}
    <motion.div
      aria-hidden
      initial={false}
      animate={{ opacity: isMegaMenuOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setOpenMenu(null)}
      className={cn(
        "fixed inset-0 z-[998] hidden bg-neutral-darkest/60 lg:block",
        !isMegaMenuOpen && "pointer-events-none",
      )}
    />
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[999] flex w-full items-center justify-between text-white transition-colors duration-300 lg:min-h-18 lg:px-[5%]",
        isTransparent ? "bg-transparent" : "bg-brand-maroon",
      )}
    >
      <nav aria-label="Primary" className="size-full lg:flex lg:items-center lg:justify-between lg:gap-6">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:shrink-0 lg:px-0">
            <Link to={logo.url ?? "/"} aria-label="Lahore Virgil Football Club — home">
              {/* Champagne gold matches the solid bar; over a transparent bar
                  it can sit on anything from photo highlights to shadow, so
                  it switches to a plain white cut of the same mark. */}
              <img
                src={isTransparent ? logo.src.replace(/\.svg$/, "-white.svg") : logo.src}
                alt={logo.alt}
              />
            </Link>
            {/* No Book A Spot in the bar on phones: it lives in the fixed
                booking bar at the foot of the screen (MobileBookingBar), which
                stays under the thumb however far the page scrolls. */}
            <div className="flex items-center gap-2 lg:hidden">
            <button
              className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="primary-navigation"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-brand-sandstone"
                animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={topLineVariants}
              />
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-brand-sandstone"
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={middleLineVariants}
              />
              <motion.span
                className="my-[3px] h-0.5 w-6 bg-brand-sandstone"
                animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
                variants={bottomLineVariants}
              />
            </button>
            </div>
          </div>
          <motion.div
            variants={{
              open: { height: "var(--height-open, 100dvh)" },
              close: { height: "var(--height-closed, 0)" },
            }}
            initial="close"
            exit="close"
            animate={isMobileMenuOpen ? "open" : "close"}
            transition={{ duration: 0.4 }}
            id="primary-navigation"
            className="overflow-auto px-[5%] lg:flex lg:flex-1 lg:items-center lg:justify-center lg:overflow-visible lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
          >
            {links.map((link, index) =>
              link.megaMenu ? (
                <SubMenu
                  key={index}
                  megaMenu={link.megaMenu}
                  title={link.title}
                  isMobile={isMobile}
                  isCurrent={isCurrent(link.url)}
                  isOpen={openMenu === index}
                  onOpenChange={(open) =>
                    setOpenMenu((current) => (open ? index : current === index ? null : current))
                  }
                  onNavigate={() => {
                    setOpenMenu(null);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ) : (
                <Link
                  key={index}
                  to={link.url}
                  aria-current={isCurrent(link.url) ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  // Tighter and smaller between lg and xl: seven links plus
                  // the CTA otherwise wrap onto two lines at ~1024px.
                  className="text-md block py-3 first:pt-7 lg:px-2 lg:py-6 lg:text-sm lg:whitespace-nowrap first:lg:pt-6 xl:px-4 xl:text-base aria-[current=page]:underline aria-[current=page]:decoration-brand-champagne aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                >
                  {link.title}
                </Link>
              ),
            )}
            <div className="mt-6 flex w-full flex-col gap-y-4 pb-24 lg:hidden lg:pb-0">
              {buttons.map((button, index) => (
                <Button key={index} className="w-full" {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
        </motion.div>
        <div className="hidden lg:flex lg:shrink-0 lg:gap-4">
          {buttons.map((button, index) => (
            // Gold whether the bar is solid or over a hero photo (Sept 2026).
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))}
        </div>
      </nav>
    </header>
    </>
  );
};

const SubMenu = ({
  title,
  isMobile,
  megaMenu,
  isCurrent,
  isOpen: isDropdownOpen,
  onOpenChange,
  onNavigate,
}: {
  title: string;
  isMobile: boolean;
  megaMenu: MegaMenuProps;
  isCurrent: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when a link inside the menu is followed, even to the current page. */
  onNavigate: () => void;
}) => {
  return (
    <div
      onMouseEnter={() => !isMobile && onOpenChange(true)}
      onMouseLeave={() => !isMobile && onOpenChange(false)}
    >
      <button
        className="text-md flex w-full items-center justify-between gap-x-2 py-3 text-center lg:w-auto lg:flex-none lg:justify-start lg:gap-x-1 lg:px-2 lg:py-6 lg:text-sm lg:whitespace-nowrap xl:gap-x-2 xl:px-4 xl:text-base"
        aria-expanded={isDropdownOpen}
        onClick={() => onOpenChange(!isDropdownOpen)}
      >
        <span
          className={cn(
            isCurrent && "underline decoration-brand-champagne decoration-2 underline-offset-8",
          )}
        >
          {title}
        </span>
        <motion.span
          variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <KeyboardArrowDown className="text-white" />
        </motion.span>
      </button>
      <motion.div
        variants={{
          open: { visibility: "visible", opacity: 1, height: "var(--height-open, auto)" },
          close: { visibility: "hidden", opacity: "0", height: "var(--height-close, 0)" },
        }}
        initial="close"
        exit="close"
        animate={isDropdownOpen ? "open" : "close"}
        transition={{ duration: 0.3 }}
        // Any link followed from the panel (a card or the "see all" button)
        // closes it — covers a link to the page you're already on, where the
        // route never changes.
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) onNavigate();
        }}
        // A rounded card on phones, sitting in the menu sheet; the desktop
        // panel stays a flush full-width band under the bar.
        className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden rounded-2xl bg-scheme-background text-scheme-text lg:absolute lg:w-[100vw] lg:rounded-none lg:px-[5%] lg:[--height-close:auto]"
      >
        {/* One pattern at every width (client request, 15 Sept 2026): the
            title and intro above, then a row of white photo cards ending on a
            terracotta "see all" card — the route to the full index, in place
            of a separate button. Phones swipe the row; desktop lays it out as
            a grid, one column per card. */}
        <div className="flex w-full flex-col items-start justify-start gap-5 px-5 py-6 lg:gap-8 lg:px-0 lg:py-8">
          <div className="lg:max-w-lg">
            <h4 className="mb-2 text-lg font-medium md:text-xl md:leading-[1.3]">
              {megaMenu.title}
            </h4>
            <p className="text-sm">{megaMenu.description}</p>
          </div>
          <div className="relative w-full">
            <ul
              aria-label={megaMenu.title}
              className={cn(
                "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                "lg:mx-0 lg:grid lg:snap-none lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0",
                // Items plus the "see all" card: 3 + 1 for Programmes and New
                // to LVFC, 4 + 1 for Locations.
                megaMenu.items.length >= 4 ? "lg:grid-cols-5" : "lg:grid-cols-4",
              )}
            >
              {megaMenu.items.map((item, index) => (
                <li
                  key={index}
                  className="flex w-[72%] shrink-0 snap-start flex-col items-stretch sm:w-[45%] lg:w-auto"
                >
                  <Link
                    to={item.url}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.image.src}
                        alt={item.image.alt}
                        // A fixed height on desktop (rather than a fluid aspect
                        // ratio) keeps the three menus the same height — the
                        // 4-column and 5-column grids have different column
                        // widths, so one aspect ratio would give different
                        // photo (and so panel) heights.
                        className="aspect-[4/3] size-full object-cover transition-transform duration-300 group-hover:scale-[1.03] lg:aspect-auto lg:h-[200px]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 lg:p-5">
                      <div className="mb-1">
                        <p className="md:text-md font-semibold">{item.name}</p>
                        <p className="text-sm">{item.meta}</p>
                      </div>
                      {item.detail && <p className="text-sm">{item.detail}</p>}
                      {/* The whole card is the link; this is its label, in
                          the same style as every "Learn more >" on the site. */}
                      {item.cta && (
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-semibold text-brand-terracotta underline-offset-4 group-hover:underline">
                          {item.cta}
                          <ChevronRight className="size-5 text-brand-terracotta transition-transform duration-200 group-hover:translate-x-0.5" />
                        </span>
                      )}
                    </div>
                    {item.badge && <Badge className="absolute top-3 left-3">{item.badge}</Badge>}
                  </Link>
                </li>
              ))}
              {megaMenu.button.url && (
                <li className="flex w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
                  <Link
                    to={megaMenu.button.url}
                    className="flex w-full flex-col justify-between gap-6 rounded-2xl bg-brand-terracotta p-5 text-white transition-colors hover:bg-brand-terracotta/90"
                  >
                    <span className="text-lg font-medium leading-snug">{megaMenu.button.title}</span>
                    <span aria-hidden="true" className="self-end text-2xl">→</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Navbar23Defaults: Props = {
  logo: {
    url: "/",
    src: "/logo.svg",
    alt: "Lahore Virgil Football Club",
  },
  links: [{ title: "About", url: "/about" }],
  buttons: [{ title: "Book A Spot", size: "sm" }],
};

const topLineVariants = {
  open: { translateY: 8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};

const middleLineVariants = {
  open: { width: 0, transition: { duration: 0.1 } },
  closed: { width: "1.5rem", transition: { delay: 0.3, duration: 0.2 } },
};

const bottomLineVariants = {
  open: { translateY: -8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};
