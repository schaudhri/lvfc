import { Outlet, useLocation } from "react-router-dom";
import { Navbar23 } from "@/components/sections/Navbar23";
import { Footer2 } from "@/components/sections/Footer2";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { navbarProps, footerProps } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Routes whose first section is a dark hero photo the nav can sit over.
 * Everything else — the blog article template, the 404 page — renders
 * straight onto the light page background, where a transparent white-text
 * nav would be unreadable, so those keep the solid bar from the first frame.
 */
const HERO_ROUTES = [
  /^\/$/,
  /^\/about$/,
  /^\/programmes$/,
  /^\/programmes\/[^/]+$/,
  /^\/locations$/,
  /^\/locations\/[^/]+$/,
  /^\/schedule$/,
  /^\/resources$/,
  /^\/blog$/,
  /^\/contact$/,
  /^\/safeguarding$/,
  /^\/faqs$/,
  /^\/coaching$/,
  /^\/private-events$/,
];

export const SiteLayout = () => {
  const { pathname } = useLocation();
  const hasHero = HERO_ROUTES.some((route) => route.test(pathname));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar23 {...navbarProps} transparentAtTop={hasHero} />
      {/*
        The nav is fixed so it can overlay a hero's photo. Hero pages want
        that overlap — the hero's own top padding clears it. Pages with no
        hero (blog article, 404) never had that padding, so restore the
        nav's own height here instead, matching its `min-h-16 lg:min-h-18`.
      */}
      <main className={cn("flex-1", !hasHero && "pt-16 lg:pt-18")}>
        <Outlet />
      </main>
      {/* No Resources callout above the footer any more: Resources is in the
          main nav and the footer's "Explore" column (Sept 2026). */}
      <Footer2 {...footerProps} />
      <WhatsAppButton />
    </div>
  );
};
