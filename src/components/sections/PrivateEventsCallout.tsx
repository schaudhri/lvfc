import { Button } from "@/components/ui/button";
import { privateEventsPage } from "@/data/privateEvents";
import { cn } from "@/lib/utils";

/**
 * A slim maroon banner pitching private events: a Tiller title, one line of
 * copy and a single "Get in touch" to the enquiry form (client request,
 * 15 Sept 2026 — it used to carry two booking buttons).
 *
 * No vertical padding of its own: on the landing page it sits between the
 * "Coach with LVFC" block (bottom padding) and the gallery (top padding).
 */
export const PrivateEventsCallout = ({ className }: { className?: string }) => (
  <section className={cn("px-[5%]", className)}>
    <div className="container">
      <div className="flex flex-col items-start gap-5 rounded-card bg-brand-maroon px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="max-w-[42rem]">
          {/* White set explicitly: headings default to maroon, which vanished
              on this maroon card. */}
          <h2 className="mb-2 font-heading text-h4 font-medium text-white">
            Book us for private events
          </h2>
          <p className="text-white/80">
            Get in touch to host a birthday with our coaches, or a private football session —
            for yourself, your family or your company.
          </p>
        </div>
        <Button
          title="Get in touch"
          url={`${privateEventsPage.url}#enquire`}
          variant="champagne"
          className="shrink-0"
        >
          Get in touch
        </Button>
      </div>
    </div>
  </section>
);
