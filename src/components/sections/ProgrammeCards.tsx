"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "relume-icons";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cardMedia } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { formatAges } from "@/data/programmes";

gsap.registerPlugin(Draggable, InertiaPlugin);

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
 * GSAP Draggable track with prev/next controls and dot indicators.
 *
 * This is the Osmo Supply "Basic GSAP Slider (Watch CSS)" recipe. Its
 * `data-gsap-slider-*` attributes are the script's DOM contract and its
 * measurement, snapping and aria logic are kept as written — the port to React
 * only scopes the initialiser to this instance's root (instead of scanning the
 * document) and moves the resize listener into the effect's cleanup.
 *
 * Slides per view and the gutter are set from CSS on `.programme-slider` in
 * `index.css`, which is the recipe's "Watch CSS" approach: the breakpoints live
 * in the stylesheet and the script reads them back.
 *
 * Two additions the recipe does not ship: the dot indicators, and the control
 * layout. Both exist to preserve what was already on this page — dots left,
 * arrows right — rather than the recipe's centred prev/next pair.
 */
const SliderTrack = ({ children }: { children: React.ReactNode }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  /** Set by the slider so the dots can render and highlight. */
  const [snapCount, setSnapCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  /** Lets a dot drive the same tween the prev/next controls use. */
  const goToRef = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let draggable: Draggable | undefined;

    const init = () => {
      draggable?.kill();

      const collection = root.querySelector<HTMLElement>("[data-gsap-slider-collection]");
      const track = root.querySelector<HTMLElement>("[data-gsap-slider-list]");
      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-gsap-slider-item]"));
      const controls = Array.from(
        root.querySelectorAll<HTMLButtonElement>("[data-gsap-slider-control]"),
      );
      if (!collection || !track || items.length === 0) return;

      // Inject aria attributes
      collection.setAttribute("role", "group");
      collection.setAttribute("aria-roledescription", "Slides List");
      collection.setAttribute("aria-label", "Slides");
      items.forEach((slide, i) => {
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "Slide");
        slide.setAttribute("aria-label", `Slide ${i + 1} of ${items.length}`);
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("tabindex", "-1");
      });

      // Determine if slider runs
      const styles = getComputedStyle(root);
      const statusVar = styles.getPropertyValue("--slider-status").trim();
      let spvVar = parseFloat(styles.getPropertyValue("--slider-spv"));
      const rect = items[0]!.getBoundingClientRect();
      const marginRight = parseFloat(getComputedStyle(items[0]!).marginRight);
      const slideW = rect.width + marginRight;
      if (isNaN(spvVar)) spvVar = collection.clientWidth / slideW;
      const spv = Math.max(1, Math.min(spvVar, items.length));
      const sliderEnabled = statusVar === "on" && spv < items.length;
      root.setAttribute("data-gsap-slider-status", sliderEnabled ? "active" : "not-active");

      if (!sliderEnabled) {
        track.removeAttribute("style");
        track.removeAttribute("data-gsap-slider-list-status");
        items.forEach((slide) => {
          slide.removeAttribute("aria-hidden");
          slide.removeAttribute("tabindex");
          slide.removeAttribute("data-gsap-slider-item-status");
        });
        setSnapCount(0);
        return;
      }

      // Calculate bounds and snap points
      const vw = collection.clientWidth;
      const tw = track.scrollWidth;
      const maxScroll = Math.max(tw - vw, 0);
      const minX = -maxScroll;
      const maxX = 0;
      const maxIndex = maxScroll / slideW;
      const full = Math.floor(maxIndex);
      const snapPoints: number[] = [];
      for (let i = 0; i <= full; i++) snapPoints.push(-i * slideW);
      if (full < maxIndex) snapPoints.push(-maxIndex * slideW);
      setSnapCount(snapPoints.length);

      let activeIdx = 0;
      const setX = gsap.quickSetter(track, "x", "px") as (value: number) => void;
      let collectionRect = collection.getBoundingClientRect();

      function updateStatus(x: number) {
        if (x > maxX || x < minX) return;

        // Clamp and find closest snap
        const calcX = x > maxX ? maxX : x < minX ? minX : x;
        let closest = snapPoints[0]!;
        snapPoints.forEach((pt) => {
          if (Math.abs(pt - calcX) < Math.abs(closest - calcX)) closest = pt;
        });
        activeIdx = snapPoints.indexOf(closest);
        setActiveIndex(activeIdx);

        // Update Slide Attributes
        items.forEach((slide, i) => {
          const r = slide.getBoundingClientRect();
          const leftEdge = r.left - collectionRect.left;
          const slideCenter = leftEdge + r.width / 2;
          const inView = slideCenter > 0 && slideCenter < collectionRect.width;
          const status = i === activeIdx ? "active" : inView ? "inview" : "not-active";

          slide.setAttribute("data-gsap-slider-item-status", status);
          slide.setAttribute("aria-hidden", inView ? "false" : "true");
          slide.setAttribute("tabindex", inView ? "0" : "-1");
        });

        // Update Controls
        controls.forEach((btn) => {
          const dir = btn.getAttribute("data-gsap-slider-control");
          const can = dir === "prev" ? activeIdx > 0 : activeIdx < snapPoints.length - 1;
          btn.disabled = !can;
          btn.setAttribute("aria-disabled", can ? "false" : "true");
          btn.setAttribute("data-gsap-slider-control-status", can ? "active" : "not-active");
        });
      }

      const goTo = (target: number) => {
        const clamped = Math.max(0, Math.min(target, snapPoints.length - 1));
        gsap.to(track, {
          duration: 0.4,
          x: snapPoints[clamped],
          onUpdate: () => updateStatus(gsap.getProperty(track, "x") as number),
        });
      };
      goToRef.current = goTo;

      controls.forEach((btn) => {
        const dir = btn.getAttribute("data-gsap-slider-control");
        btn.onclick = () => {
          if (btn.disabled) return;
          goTo(activeIdx + (dir === "next" ? 1 : -1));
        };
      });

      // Initialize Draggable
      draggable = Draggable.create(track, {
        type: "x",
        inertia: true,
        bounds: { minX, maxX },
        throwResistance: 2000,
        dragResistance: 0.05,
        maxDuration: 0.6,
        minDuration: 0.2,
        edgeResistance: 0.75,
        // `duration` is missing from GSAP's SnapObject typing but is honoured at
        // runtime; kept as the recipe specifies it rather than dropped.
        snap: { x: snapPoints, duration: 0.4 } as Draggable.Vars["snap"],
        onPress() {
          track.setAttribute("data-gsap-slider-list-status", "grabbing");
          collectionRect = collection.getBoundingClientRect();
        },
        onDrag() {
          setX(this.x);
          updateStatus(this.x);
        },
        onThrowUpdate() {
          setX(this.x);
          updateStatus(this.x);
        },
        onThrowComplete() {
          setX(this.endX);
          updateStatus(this.endX);
          track.setAttribute("data-gsap-slider-list-status", "grab");
        },
        onRelease() {
          setX(this.x);
          updateStatus(this.x);
          track.setAttribute("data-gsap-slider-list-status", "grab");
        },
      })[0];

      // Initial state
      setX(0);
      updateStatus(0);
    };

    init();

    // Debouncer: only re-measure when the width actually changed, so a mobile
    // browser hiding its address bar does not tear the slider down.
    let last = window.innerWidth;
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.innerWidth !== last) {
          last = window.innerWidth;
          init();
        }
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      draggable?.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-gsap-slider-init
      role="region"
      aria-roledescription="carousel"
      aria-label="Programmes"
      className="programme-slider gsap-slider"
    >
      <div data-gsap-slider-collection className="gsap-slider__collection">
        <div data-gsap-slider-list className="gsap-slider__list">
          {children}
        </div>
      </div>

      <div data-gsap-slider-controls className="mt-6 flex items-center justify-between gap-6">
        {/* Not part of the recipe — kept so the page kepes the indicator it had. */}
        <div className="programme-dots flex items-center gap-2">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to programme ${index + 1} of ${snapCount}`}
              aria-current={index === activeIndex}
              onClick={() => goToRef.current(index)}
              className={cn(
                "relative h-2.5 rounded-full transition-all duration-200",
                // The dot stays 10px, but `before:` throws an invisible 26px hit
                // area around it — WCAG 2.5.8 wants 24px minimum.
                "before:absolute before:-inset-2 before:content-['']",
                index === activeIndex
                  ? "w-8 bg-neutral-darkest"
                  : "w-2.5 bg-neutral-darkest/25 hover:bg-neutral-darkest/50",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-gsap-slider-control="prev"
            aria-label="Previous programme"
            className="flex size-11 items-center justify-center rounded-full border border-scheme-border transition-opacity disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-5 text-scheme-text" />
          </button>
          <button
            type="button"
            data-gsap-slider-control="next"
            aria-label="Next programme"
            className="flex size-11 items-center justify-center rounded-full border border-scheme-border transition-opacity disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-5 text-scheme-text" />
          </button>
        </div>
      </div>
    </div>
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

  /**
   * In slider mode each card is wrapped in a `[data-gsap-slider-item]`, which
   * owns the width and gutter — both computed in CSS from `--slider-spv` and
   * `--slider-gap`, so the breakpoints live in the stylesheet rather than here.
   */
  const card = (programme: ProgrammeCardItem, index: number) => (
    <article
      key={index}
      className={cn(
        "group flex h-full flex-col transition-shadow duration-200 hover:shadow-xlarge",
        cardMedia,
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
            {/* The age is what a parent scans for first, so it reads as a pill
                with the unit spelled out — "3–4 years", not "Ages: 3–4". */}
            <p className="mt-3 w-fit rounded-full bg-white/15 px-3 py-1 text-small font-semibold text-white">
              <span className="sr-only">Ages </span>
              {formatAges(programme.ages)}
            </p>

            <p className="mt-4 mb-8 flex-1 text-white/85">{programme.description}</p>

            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
              {/* White pill on the dark body — the default champagne CTA is
                  tuned for light sections and goes muddy against near-black. */}
              <Button {...programme.primaryButton} size="sm" variant="alternate">
                {programme.primaryButton.title}
              </Button>
              <Link
                to={programme.url}
                className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
              >
                {programme.learnMoreLabel ?? "Learn more"}
                <ChevronRight className="size-5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </article>
  );

  const grid = isSlider ? (
    <SliderTrack>
      {programmes.map((programme, index) => (
        <div key={index} data-gsap-slider-item className="gsap-slider__item">
          {card(programme, index)}
        </div>
      ))}
    </SliderTrack>
  ) : (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {programmes.map(card)}
    </div>
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
