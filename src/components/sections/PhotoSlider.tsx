import { useRef, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Lightbox } from "@/components/Lightbox";
import type { GalleryPhoto } from "@/data/clubPhotos";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  description?: string;
  photos: GalleryPhoto[];
  className?: string;
};

/**
 * A swipeable strip of training photos (branch and programme pages). Every
 * slide shares one height and keeps its own shape — portraits stay portrait —
 * so a mixed set reads as one row rather than a grid of awkward crops. Arrows
 * sit beside the heading on larger screens; on phones it's a swipe. Any slide
 * opens the full set in a lightbox, starting at that photo.
 */
export const PhotoSlider = ({ heading, description, photos, className }: Props) => {
  const [open, setOpen] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const slideButtons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section className={cn("overflow-hidden px-[5%] py-16 md:py-24 lg:py-28", className)}>
      <div className="container">
        <Carousel
          opts={{ align: "start", containScroll: "trimSnaps" }}
          setApi={setApi}
          aria-label={heading}
        >
          <div className="mb-12 flex items-end justify-between gap-6 md:mb-18 lg:mb-20">
            <div className="max-w-lg">
              <h2 className="text-h3 font-medium">{heading}</h2>
              {description && <p className="mt-4 text-medium">{description}</p>}
            </div>
            <div className="hidden shrink-0 gap-3 sm:flex">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={photo.src} className="basis-auto">
                {/* Embla swallows the click that ends a drag, so swiping the
                    strip never opens the viewer by accident. */}
                <button
                  ref={(element) => {
                    slideButtons.current[index] = element;
                  }}
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-label={`View photo ${index + 1} of ${photos.length}`}
                  className="group block cursor-zoom-in overflow-hidden rounded-image"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    draggable={false}
                    className={cn(
                      // h-48 on phones so the next slide peeks in — the cue to swipe.
                      "h-48 max-w-none object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-64 md:h-80 lg:h-[26rem]",
                      photo.portrait ? "aspect-[2/3]" : "aspect-[3/2]",
                    )}
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Outside the carousel, so its arrow-key handling doesn't also fire
            while the viewer is open (portal events bubble up the React tree). */}
        {/* On close, the strip catches up to the last photo viewed and focus
            lands on it, so a keyboard user carries on from there. */}
        <Lightbox
          photos={photos}
          index={open}
          onIndexChange={setOpen}
          label={heading}
          returnFocus={(last) => {
            api?.scrollTo(last);
            slideButtons.current[last]?.focus({ preventScroll: true });
          }}
        />
      </div>
    </section>
  );
};
