import { useEffect, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt?: string;
};

type VideoProps = {
  src: string;
  poster?: string;
};

type Props = {
  tagline?: string;
  heading: string;
  description: string;
  buttons?: ButtonProps[];
  image: ImageProps;
  /**
   * Two or more images rotate the background automatically. Falls back to
   * `image` where this is omitted or has fewer than two entries, so every
   * other page keeps its single static banner.
   */
  images?: ImageProps[];
  /** When set, plays as a muted looping background instead of `image`/`images`. */
  video?: VideoProps;
  /** "full" = the landing hero: ~90vh with content centred both ways. */
  size?: "default" | "full";
};

export type Header54Props = Omit<React.ComponentPropsWithoutRef<"section">, "size"> &
  Partial<Props>;

/** How long each background image shows before crossfading to the next. */
const SLIDE_DURATION_MS = 6000;

export const Header54 = (props: Header54Props) => {
  const { heading, description, buttons, image, images, video, size } = {
    ...Header54Defaults,
    ...props,
  };
  // "full" is the landing hero: near-full-viewport with everything centred.
  // Interior pages keep the shorter, left-aligned banner.
  const isFull = size === "full";
  // Only the landing hero carries a subtitle — interior banners are the page
  // title alone (client direction, Sept 2026).
  const showDescription = isFull && Boolean(description);
  const hasButtons = Boolean(buttons && buttons.length > 0);

  const slides = images && images.length > 1 ? images : [image];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    // Readers who've asked not to see motion get the first image, held still.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  // The slide list can shrink between renders (fewer images passed in); keep
  // the active index in range rather than reading past the end of the array.
  const current = active % slides.length;

  return (
    <section
      className={cn(
        "relative px-[5%]",
        isFull
          ? "flex min-h-[70svh] items-center justify-center py-20 md:min-h-[90vh]"
          : // Interior heroes hold at 420px on desktop, content centred
            // (Figma template, Sept 2026) — was content-height, ~340px.
            "flex items-center py-16 md:py-24 lg:min-h-[420px] lg:py-28",
      )}
    >
      <div className="relative z-10 container">
        <div className={cn("mx-auto w-full text-center", isFull ? "max-w-[48rem]" : "max-w-lg")}>
          {/* Plain string, not cn(): tailwind-merge reads the custom `text-h1`
              size as a colour and drops it in favour of `text-white`. */}
          <h1
            className={`text-h1 font-medium text-white ${showDescription || hasButtons ? "mb-5 md:mb-6" : ""}`}
          >
            {heading}
          </h1>
          {showDescription && (
            <p className="mx-auto max-w-lg text-medium text-white">{description}</p>
          )}
          {hasButtons && (
            <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-8">
              {buttons?.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        {video ? (
          <video
            className="absolute inset-0 size-full object-cover"
            src={video.src}
            poster={video.poster}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          slides.map((slide, index) => (
            <img
              key={slide.src + index}
              src={slide.src}
              alt={index === current ? (slide.alt ?? "") : ""}
              aria-hidden={index === current ? undefined : true}
              className={cn(
                "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-in-out",
                index === current ? "opacity-100" : "opacity-0",
              )}
            />
          ))
        )}
        <div className={cn("absolute inset-0", video ? "bg-black/40" : "bg-neutral-darkest/50")} />
        {/* A darker band behind the transparent nav, so its white logo, links
            and menu button stay legible over a pale sky or haze. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-darkest/70 to-transparent" />
      </div>
      {!video && slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src + index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show background image ${index + 1} of ${slides.length}`}
              aria-current={index === current}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                index === current ? "bg-brand-sandstone" : "bg-white/40 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export const Header54Defaults: Props = {
  heading: "Short heading here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  image: {
    src: "/placeholder-image.svg",
    alt: "Relume placeholder background image",
  },
};
