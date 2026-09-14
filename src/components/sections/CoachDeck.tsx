"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "relume-icons";

type ImageProps = {
  src: string;
  alt?: string;
};

type Coach = {
  name: string;
  credential: string;
  image: ImageProps;
};

type Props = {
  tagline?: string;
  heading: string;
  description?: string;
  coaches: Coach[];
};

export type CoachDeckProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/** Offsets for the cards fanned out behind the active one. */
const STACK = [
  { x: -132, rotate: -9, scale: 0.9, opacity: 0.25 },
  { x: -68, rotate: -5, scale: 0.95, opacity: 0.45 },
  { x: 68, rotate: 5, scale: 0.95, opacity: 0.45 },
  { x: 132, rotate: 9, scale: 0.9, opacity: 0.25 },
];

/**
 * Coaches presented as a fanned deck of portrait cards; the active card sits
 * centred and in front, with name and credential chip overlaid on the image.
 */
export const CoachDeck = (props: CoachDeckProps) => {
  const { heading, description, coaches } = {
    ...CoachDeckDefaults,
    ...props,
  };
  const [active, setActive] = useState(0);
  const count = coaches.length;

  const move = (delta: number) => setActive((prev) => (prev + delta + count) % count);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-medium md:mb-6">{heading}</h2>
          {description && <p className="text-medium">{description}</p>}
        </div>

        <div className="relative mx-auto flex h-[30rem] max-w-[48rem] items-center justify-center">
          {coaches.map((coach, index) => {
            // position relative to the active card, wrapped into -2..2
            let offset = index - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isActive = offset === 0;
            const stack = STACK[offset + (offset < 0 ? 2 : 1)];
            const style = isActive
              ? { transform: "translateX(0) rotate(0deg) scale(1)", opacity: 1, zIndex: 30 }
              : stack
                ? {
                    transform: `translateX(${stack.x}px) rotate(${stack.rotate}deg) scale(${stack.scale})`,
                    opacity: stack.opacity,
                    zIndex: 10 - Math.abs(offset),
                  }
                : { opacity: 0, zIndex: 0 };

            return (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${coach.name}`}
                aria-current={isActive}
                style={style}
                className="absolute h-[26rem] w-[19rem] overflow-hidden rounded-card bg-neutral-lighter shadow-xlarge transition-all duration-500 ease-in-out"
              >
                <img
                  src={coach.image.src}
                  alt={coach.image.alt ?? coach.name}
                  className="size-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-darkest/90 to-transparent p-6 text-left">
                  <span className="mb-2 block text-h5 font-medium text-white">{coach.name}</span>
                  <span className="inline-block rounded-full border border-white/70 px-3 py-1 text-small text-white">
                    {coach.credential}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous coach"
            className="flex size-12 items-center justify-center rounded-full border border-scheme-border transition-colors hover:bg-neutral-lightest"
          >
            <ArrowLeft className="size-5 text-scheme-text" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next coach"
            className="flex size-12 items-center justify-center rounded-full border border-scheme-border transition-colors hover:bg-neutral-lightest"
          >
            <ArrowRight className="size-5 text-scheme-text" />
          </button>
        </div>
      </div>
    </section>
  );
};

const PORTRAIT = "/placeholder-image.svg";

export const CoachDeckDefaults: Props = {
  tagline: "Coaches",
  heading: "Meet Our Coaches",
  coaches: [
    { name: "Coach Name", credential: "UEFA A Licence", image: { src: PORTRAIT } },
    { name: "Coach Name", credential: "UEFA B Licence", image: { src: PORTRAIT } },
    { name: "Coach Name", credential: "FA Level 2", image: { src: PORTRAIT } },
  ],
};
