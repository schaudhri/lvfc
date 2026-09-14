"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button, type ButtonProps } from "@/components/ui/button";
import { KeyboardArrowDown } from "relume-icons";
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
  detail: string;
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
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const { pathname } = useLocation();
  /** The nav item for the section you're in, so you can see where you are. */
  const isCurrent = (url: string) =>
    url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(`${url}/`);

  // The open mobile menu needs a solid background of its own regardless of
  // scroll position — its links render inside this same header.
  const isTransparent = transparentAtTop && !isScrolled && !isMobileMenuOpen;

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
            <Button key={index} {...button} variant={isTransparent ? "alternate" : button.variant}>
              {button.title}
            </Button>
          ))}
        </div>
      </nav>
    </header>
  );
};

const SubMenu = ({
  title,
  isMobile,
  megaMenu,
  isCurrent,
}: {
  title: string;
  isMobile: boolean;
  megaMenu: MegaMenuProps;
  isCurrent: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="text-md flex w-full items-center justify-between gap-x-2 py-3 text-center lg:w-auto lg:flex-none lg:justify-start lg:gap-x-1 lg:px-2 lg:py-6 lg:text-sm lg:whitespace-nowrap xl:gap-x-2 xl:px-4 xl:text-base"
        aria-expanded={isDropdownOpen}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
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
        className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-scheme-background text-scheme-text lg:absolute lg:w-[100vw] lg:border-b lg:border-scheme-border lg:px-[5%] lg:[--height-close:auto]"
      >
        <div className="flex w-full flex-col items-start justify-start gap-6 pt-6 sm:gap-12 lg:flex-row lg:items-center lg:py-8">
          <div className="lg:max-w-[14rem] lg:shrink-0">
            <h4 className="mb-3 text-lg font-medium md:mb-4 md:text-xl md:leading-[1.3]">
              {megaMenu.title}
            </h4>
            <p className="text-sm">{megaMenu.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button {...megaMenu.button}>{megaMenu.button.title}</Button>
            </div>
          </div>
          <div className="relative flex w-full flex-wrap items-start justify-center lg:items-stretch">
            {/* Columns follow the item count so a 3-item menu doesn't leave a
                dead fourth column. Menus are a preview, not the full list —
                the "see all" button beside them is the route to that. */}
            <div
              className={cn(
                "grid w-full auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2",
                megaMenu.items.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
              )}
            >
              {megaMenu.items.map((item, index) => (
                <div key={index} className="flex flex-col items-stretch">
                  <Link to={item.url} className="group relative">
                    <div className="mb-3 md:mb-4">
                      <div className="h-full w-full overflow-hidden rounded-2xl md:h-auto">
                        <img
                          src={item.image.src}
                          alt={item.image.alt}
                          // A fixed height at lg+ (rather than a fluid aspect
                          // ratio) is what makes the two mega menus match —
                          // the 3-item Programmes grid and 4-item Locations
                          // grid have different column widths, so the same
                          // aspect ratio otherwise produces different image
                          // (and so panel) heights. 228px matches Programmes,
                          // the taller of the two.
                          className="aspect-[4/3] size-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.03] lg:h-[228px]"
                        />
                      </div>
                    </div>
                    <div className="mb-1">
                      <p className="md:text-md font-semibold">{item.name}</p>
                      <p className="text-sm">{item.meta}</p>
                    </div>
                    <p className="text-sm font-semibold">{item.detail}</p>
                    {item.badge && <Badge className="absolute top-4 left-4">{item.badge}</Badge>}
                  </Link>
                </div>
              ))}
            </div>
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
