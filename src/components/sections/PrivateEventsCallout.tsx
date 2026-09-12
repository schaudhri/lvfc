import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Button } from "@/components/ui/button";
import { enquiryUrl, privateEvents, privateEventsPage } from "@/data/privateEvents";
import { cardMedia } from "@/lib/surface";
import { cn } from "@/lib/utils";

/**
 * One wide card pitching private sessions and birthday parties.
 *
 * Each button lands on the enquiry form with its option preselected, so the
 * parent's first click has already answered the form's first question.
 *
 * No vertical padding of its own: on the landing page it sits between the
 * "Coach with LVFC" block (which closes with bottom padding) and the gallery
 * (which opens with top padding).
 */
export const PrivateEventsCallout = ({ className }: { className?: string }) => (
  <section className={cn("px-[5%]", className)}>
    <div className="container">
      <article className={cn("grid grid-cols-1 md:grid-cols-2", cardMedia)}>
        <img
          src={privateEventsPage.image.src}
          alt={privateEventsPage.image.alt}
          loading="lazy"
          className="aspect-[4/3] size-full object-cover md:aspect-auto"
        />
        <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
          <p className="mb-3 text-small font-semibold uppercase tracking-wider text-white/70">
            Private events
          </p>
          <h2 className="mb-4 text-h3 font-bold">{privateEventsPage.heading}</h2>
          <p className="mb-8 text-medium text-white/85">{privateEventsPage.summary}</p>
          <div className="flex flex-wrap items-center gap-4">
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
          <Link
            to={privateEventsPage.url}
            className="mt-6 inline-flex w-fit items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            Find out more
            <ChevronRight className="size-5 text-white" />
          </Link>
        </div>
      </article>
    </div>
  </section>
);
