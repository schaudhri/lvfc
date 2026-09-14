import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowBack, ArrowForward, Close } from "relume-icons";
import type { Image } from "@/data/clubPhotos";

type Props = {
  photos: Image[];
  /** The photo on show, or `null` when closed. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  label?: string;
  /**
   * Where focus goes on close, given the last photo shown. Without it, focus
   * returns to whatever had it on open — which a mouse click doesn't always
   * set (Safari never focuses a clicked button).
   */
  returnFocus?: (lastIndex: number) => void;
};

/**
 * Full-screen photo viewer. Arrows, swipe and the arrow keys step through
 * (wrapping at the ends); Escape, the close button or a click on the backdrop
 * closes it and hands focus back to the photo that opened it.
 */
export const Lightbox = ({
  photos,
  index,
  onIndexChange,
  label = "Photo viewer",
  returnFocus,
}: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  // Read in the close cleanup, so kept current in refs rather than captured.
  const lastIndex = useRef<number | null>(index);
  if (index !== null) lastIndex.current = index;
  const returnFocusRef = useRef(returnFocus);
  returnFocusRef.current = returnFocus;
  const isOpen = index !== null;
  const count = photos.length;

  const step = (by: number) => {
    if (index !== null) onIndexChange((index + by + count) % count);
  };

  // Freeze the page behind, focus the viewer, and restore both on close.
  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      if (returnFocusRef.current && lastIndex.current !== null) {
        returnFocusRef.current(lastIndex.current);
      } else {
        trigger?.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onIndexChange(null);
      else if (event.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
      else if (event.key === "ArrowRight") onIndexChange((index + 1) % count);
      else if (event.key === "Tab") {
        // Keep focus inside the viewer while it's open.
        const buttons = [...(dialogRef.current?.querySelectorAll("button") ?? [])];
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, count, onIndexChange]);

  if (index === null) return null;
  const photo = photos[index];
  const closeOnBackdrop = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) onIndexChange(null);
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[1100] flex flex-col bg-neutral-darkest/95 text-white"
      onClick={closeOnBackdrop}
      onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-[5%] py-3">
        <p className="text-small tabular-nums text-white/70" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onIndexChange(null)}
          aria-label="Close"
          className="-mr-3 flex size-12 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <Close className="size-6 text-white" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-[5%] pb-10"
        onClick={closeOnBackdrop}
      >
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="max-h-full max-w-full rounded-image object-contain"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-darkest/60 transition-colors hover:bg-white/20 md:left-6"
            >
              <ArrowBack className="size-6 text-white" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-darkest/60 transition-colors hover:bg-white/20 md:right-6"
            >
              <ArrowForward className="size-6 text-white" />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};
