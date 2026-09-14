import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Button } from "@/components/ui/button";
import { enquiryUrl, privateEvents, privateEventsPage } from "@/data/privateEvents";
import { cn } from "@/lib/utils";

/**
 * A slim banner pitching private sessions and birthday parties.
 *
 * Used to be a full wide card with a photo half the section — for something
 * that isn't the main reason a parent is on this page, that was too much
 * space. This is a single maroon strip: one line of copy and the two booking
 * buttons, each landing on the enquiry form with its option preselected.
 *
 * No vertical padding of its own: on the landing page it sits between the
 * "Coach with LVFC" block (bottom padding) and the gallery (top padding).
 */
export const PrivateEventsCallout = ({ className }: { className?: string }) => (
  <section className={cn("px-[5%]", className)}>
    <div className="container">
      <div className="flex flex-col items-start gap-4 rounded-card bg-brand-maroon px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <p className="mb-1 text-small font-semibold uppercase tracking-wider text-white/70">
            Private events
          </p>
          <Link to={privateEventsPage.url} className="inline-flex items-center gap-1.5 font-bold">
            <span className="text-h6">{privateEventsPage.heading}</span>
            <ChevronRight className="size-5 shrink-0 text-white" />
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {privateEvents.map((event) => (
            <Button
              key={event.type}
              title={event.cta}
              url={enquiryUrl(event.type)}
              variant="alternate"
              size="sm"
            >
              {event.cta}
            </Button>
          ))}
        </div>
      </div>
    </div>
  </section>
);
