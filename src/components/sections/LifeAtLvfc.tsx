"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Close } from "relume-icons";
import { cn } from "@/lib/utils";

type Image = { src: string; alt: string };

type Props = {
  heading: string;
  description?: string;
  images: Image[];
};

/**
 * "Life at LVFC" — a horizontal slider of club photos, each one opening full
 * size in a lightbox on click. Replaced the fixed photo grid: a grid tops out
 * at five images before it runs out of room, where a slider can carry as many
 * as the club has and still fit the same section.
 */
export const LifeAtLvfc = ({ heading, description, images }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollByAmount = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div className="max-w-lg">
            <h2 className="mb-5 text-h3 font-medium md:mb-6">{heading}</h2>
            {description && <p className="text-medium">{description}</p>}
          </div>
          {/* Same prev/next control shape as the programme slider, so the
              two sliders on this page read as one pattern. */}
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              aria-label="Previous photos"
              onClick={() => scrollByAmount(-1)}
              className="flex size-11 items-center justify-center rounded-full border border-scheme-border transition-colors hover:bg-neutral-lightest"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next photos"
              onClick={() => scrollByAmount(1)}
              className="flex size-11 items-center justify-center rounded-full border border-scheme-border transition-colors hover:bg-neutral-lightest"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open photo ${index + 1} of ${images.length}`}
              className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-image sm:w-[48%] lg:w-[31%]"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="aspect-[4/3] size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};

const Lightbox = ({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: Image[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock, same pattern as the mobile nav menu — the overlay covers
  // the viewport, so the page behind it must not scroll.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, images.length, onIndexChange, onClose]);

  const image = images[index];
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      // Above the fixed nav (z-[999]) and WhatsApp button (z-[1000]).
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-neutral-darkest/95 p-4 md:p-10"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:top-6 md:right-6"
      >
        <Close className="size-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
            aria-label="Previous photo"
            className={cn(
              "absolute left-2 flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:left-6",
            )}
          >
            <ChevronLeft className="size-7" />
          </button>
          <button
            type="button"
            onClick={() => onIndexChange((index + 1) % images.length)}
            aria-label="Next photo"
            className="absolute right-2 flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:right-6"
          >
            <ChevronRight className="size-7" />
          </button>
        </>
      )}

      <figure className="flex max-h-full max-w-full flex-col items-center gap-4">
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[80vh] max-w-full rounded-image object-contain"
        />
        <figcaption className="text-small text-white/70">
          {index + 1} / {images.length}
        </figcaption>
      </figure>
    </div>
  );
};
