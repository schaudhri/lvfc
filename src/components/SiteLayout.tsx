import { Outlet, useLocation } from "react-router-dom";
import { Navbar23 } from "@/components/sections/Navbar23";
import { Footer2 } from "@/components/sections/Footer2";
import { ResourcesCallout } from "@/components/sections/ResourcesCallout";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { navbarProps, footerProps } from "@/data/site";

/**
 * The Resources callout runs on the landing page only.
 *
 * It used to sit above the footer on every page, which made it read as part of
 * the chrome rather than as a pitch — the same block, in the same place, ten
 * times over. Everywhere else the footer's "Explore" column is the route to
 * the Resource Center, which is enough for a reference library.
 */
const SHOW_RESOURCES_CALLOUT_ON = ["/"];

export const SiteLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar23 {...navbarProps} />
      <main className="flex-1">
        <Outlet />
      </main>
      {SHOW_RESOURCES_CALLOUT_ON.includes(pathname) && <ResourcesCallout />}
      <Footer2 {...footerProps} />
      <WhatsAppButton />
    </div>
  );
};
