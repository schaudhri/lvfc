"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "relume-icons";
import { Link } from "react-router-dom";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt?: string;
};

export type ProgrammeCardItem = {
  url: string;
  image: ImageProps;
  title: string;
  /** Age line shown directly under the title, e.g. "2–18". */
  ages: string;
  description: string;
  /** Optional status chip over the image, e.g. "Flagship". */
  tag?: string;
  primaryButton: ButtonProps;
  learnMoreLabel?: string;
};

type Props = {
  heading?: string;
  description?: string;
  programmes: ProgrammeCardItem[];
  /**
   * `grid` wraps onto multiple rows — right for the programmes index.
   * `slider` keeps one scroll-snapping row, so four cards stay full width
   * instead of orphaning the fourth onto a row of its own.
   */
  layout?: "grid" | "slider";
  /** Drop the section chrome when the page already supplies its own heading. */
  bare?: boolean;
  className?: string;
};

export type ProgrammeCardsProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Scroll-snap track with prev/next controls and dot indicators.
 *
 * Built on native scrolling rather than a carousel library: touch, trackpad and
 * keyboard all work for free, and the controls just drive `scrollTo`. The active
 * dot is derived from scroll position so it stays correct however the user moved.
 */
const SliderTrack = ({ count, children }: { count: number; children: React.ReactNode }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(count);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return;

    // The track has horizontal padding and snap-start, so it rests at the first
    // card's offset rather than at 0. Measure everything against that origin.
    const origin = first.offsetLeft - track.offsetLeft;
    const step = first.getBoundingClientRect().width + 24;

    // Three cards visible means only two scroll positions exist for four cards —
    // rendering a dot per card would leave two of them unreachable.
    const perView = Math.max(1, Math.floor((track.clientWidth + 24) / step));
    const reachable = Math.max(1, count - perView + 1);
    setPages(reachable);

    const index = Math.round((track.scrollLeft - origin) / step);
    setActive(Math.min(Math.max(index, 0), reachable - 1));
    setAtStart(track.scrollLeft <= origin + 4);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  }, [count]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const nudge = (direction: -1 | 1) =>
    scrollToIndex(Math.min(Math.max(active + direction, 0), pages - 1));

  return (
    <>
      <div
        ref={trackRef}
        onScroll={sync}
        role="region"
        aria-label="Programmes"
        tabIndex={0}
        className="-mx-[5%] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[5%] pb-4 lg:gap-8"
      >
        {children}
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose a programme">
          {Array.from({ length: pages }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Go to programme ${index + 1} of ${pages}`}
              onClick={() => scrollToIndex(index)}
              // The dot itself stays 10px, but `before:` throws an invisible
              // 26px hit area around it — WCAG 2.5.8 wants 24px minimum, and a
              // 10px target on a phone is a miss waiting to happen.
              className={cn(
                "relative h-2.5 rounded-full transition-all duration-200",
                "before:absolute before:-inset-2 before:content-['']",
                index === active
                  ? "w-8 bg-neutral-darkest"
                  : "w-2.5 bg-neutral-darkest/25 hover:bg-neutral-darkest/50",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Previous programme"
            className="flex size-11 items-center justify-center rounded-full border border-scheme-border transition-opacity disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-5 text-scheme-text" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="Next programme"
            className="flex size-11 items-center justify-center rounded-full border border-scheme-border transition-opacity disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-5 text-scheme-text" />
          </button>
        </div>
      </div>
    </>
  );
};

/**
 * Programme cards — image, title, age band, blurb, then a booking button and a
 * "Learn more" link pinned to the bottom so the card feet line up across a row.
 *
 * Three across on desktop rather than four: four made each card too narrow to
 * hold a readable blurb, which is why the client asked for wider cards.
 */
export const ProgrammeCards = (props: ProgrammeCardsProps) => {
  const {
    heading,
    description,
    programmes,
    layout = "grid",
    bare = false,
    className,
  } = { ...ProgrammeCardsDefaults, ...props };

  const isSlider = layout === "slider";

  const items = (
    <>
      {programmes.map((programme, index) => (
        <article
          key={index}
          className={cn(
            "group flex flex-col overflow-hidden rounded-card bg-neutral-lightest transition-shadow duration-200 hover:shadow-xlarge",
            isSlider &&
              "w-[85vw] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)]",
          )}
        >
          {/* Decorative: the title link below is the accessible route to the page. */}
          <Link to={programme.url} tabIndex={-1} aria-hidden="true" className="relative block">
            <img
              src={programme.image.src}
              alt={programme.image.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            {programme.tag && <Badge className="absolute top-4 left-4">{programme.tag}</Badge>}
          </Link>

          <div className="flex flex-1 flex-col p-6 md:p-7">
            <h3 className="text-h5 font-bold">
              <Link to={programme.url} className="hover:underline">
                {programme.title}
              </Link>
            </h3>
            <p className="mt-1 text-large font-bold text-scheme-text/70">
              Ages: {programme.ages}
            </p>

            <p className="mt-4 mb-8 flex-1 text-scheme-text/85">{programme.description}</p>

            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button {...programme.primaryButton} size="sm">
                {programme.primaryButton.title}
              </Button>
              <Link
                to={programme.url}
                className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
              >
                {programme.learnMoreLabel ?? "Learn more"}
                <ChevronRight className="size-5 text-scheme-text transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </>
  );

  const grid = isSlider ? (
    <SliderTrack count={programmes.length}>{items}</SliderTrack>
  ) : (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">{items}</div>
  );

  if (bare) return <div className={className}>{grid}</div>;

  return (
    <section className={cn("px-[5%] py-16 md:py-24 lg:py-28", className)}>
      <div className="container">
        {(heading || description) && (
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            {heading && <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>}
            {description && <p className="text-medium">{description}</p>}
          </div>
        )}
        {grid}
      </div>
    </section>
  );
};

export const ProgrammeCardsDefaults: Props = {
  heading: "Programmes",
  description: "Every route into the club — pick the one that fits.",
  programmes: [
    {
      url: "/programmes",
      image: {
        src: "/placeholder-image-landscape.svg",
        alt: "Programme",
      },
      title: "Academy Recreational Programme",
      ages: "2–18",
      description: "Our flagship programme — three sessions a week, from age 2 through to U18.",
      primaryButton: { title: "Book A Spot" },
    },
  ],
};
