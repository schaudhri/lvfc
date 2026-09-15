import { Button } from "@/components/ui/button";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { cta } from "@/data/cta";
import { whatsappLink } from "@/data/site";

/**
 * Fixed booking bar on phones, after the "add to basket" bar on shop product
 * pages: the two ways to act stay under the thumb on every page, however far
 * down the parent has scrolled (client request, 14 Sept 2026).
 *
 * WhatsApp sits beside Book A Spot because it is how most Lahore families
 * reach the club — the client's preferred route on mobile. Hidden from `lg`
 * up, where the nav's Book A Spot and the floating WhatsApp button cover it.
 * `SiteLayout` pads the page by the bar's height so it never hides the footer.
 */
export const MobileBookingBar = () => {
  const chat = whatsappLink();
  return (
    <div
      role="region"
      aria-label="Book or message LVFC"
      // Maroon, the same as the nav bar, so the two fixed bars frame the page
      // as one (client request, 15 Sept 2026). Focus rings are white to show
      // on the dark ground.
      className="fixed inset-x-0 bottom-0 z-[1000] border-t border-white/10 bg-brand-maroon px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_rgba(19,1,1,0.18)] lg:hidden"
    >
      <div className="mx-auto flex max-w-lg gap-3">
        {chat && (
          <a
            href={chat}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-maroon focus-visible:outline-none"
          >
            <WhatsAppGlyph className="size-5 shrink-0" />
            WhatsApp
          </a>
        )}
        <Button
          {...cta.bookASpot}
          variant="champagne"
          className="h-12 flex-1 text-white focus-visible:ring-white focus-visible:ring-offset-brand-maroon"
        >
          {cta.bookASpot.title}
        </Button>
      </div>
    </div>
  );
};
