"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("depth", "M0,0 C0.6,0 0,1 1,1");

type ImageProps = {
  src: string;
  alt?: string;
};

type Coach = {
  image: ImageProps;
  name: string;
  position: string;
  certification: string;
  oneLiner: string;
};

type Props = {
  heading: string;
  description?: string;
  coaches: Coach[];
};

export type CoachSliderProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Coaches presented with the Osmo "Depth Tiles Infinite Loop": cards orbit in 3D,
 * auto-advancing and pausing while hovered. Layout/animation logic is the source
 * resource's, driven by the [data-depth-tiles-*] attributes.
 */
export const CoachSlider = (props: CoachSliderProps) => {
  const { heading, description, coaches } = {
    ...CoachSliderDefaults,
    ...props,
  };
  const containerRef = useRef<HTMLDivElement>(null);
  /** Set by the effect: lets the pause button stop and restart the loop. */
  const setLoopPausedRef = useRef<((paused: boolean) => void) | null>(null);
  const [paused, setPaused] = useState(false);
  /** Only offer a pause button when the loop actually runs. */
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // GSAP animates inline styles from JS, so the global reduced-motion CSS rule
    // can't reach it. Skip the scroll-driven timeline entirely and leave the
    // cards in their static layout.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const list = container.querySelector<HTMLElement>("[data-depth-tiles-list]");
    const tiles = container.querySelectorAll<HTMLElement>("[data-depth-tiles-item]");
    const tileCount = tiles.length;
    if (!list || tileCount < 2) return;
    setIsAnimated(true);

    const xMultiplier = 0.65;
    const backScale = 0.5;
    const backOpacity = 1;
    const backDarkness = 1;
    const sideRotateY = 5;
    const perspective = 75;

    const moveDuration = 1.5;
    const startDelay = 0.5;
    const pauseDuration = 0.125;

    const state = { progress: 0 };

    let isActive = false;
    /** The visitor pressed Pause: stay stopped even when scrolled back into view. */
    let userPaused = false;
    let isHovering = false;
    let hasStarted = false;
    let stepTimeline: gsap.core.Timeline | undefined;
    let delayedCall: gsap.core.Tween | undefined;
    let startDelayedCall: gsap.core.Tween | undefined;
    let activeTileIndex = -1;

    gsap.set(list, { perspective: `${perspective}em` });
    gsap.set(tiles, {
      transformStyle: "preserve-3d",
      transformPerspective: perspective * 16,
    });

    function getRelativeIndex(index: number) {
      let relative = index - state.progress;
      relative =
        ((((relative + tileCount / 2) % tileCount) + tileCount) % tileCount) - tileCount / 2;
      return gsap.utils.clamp(-2, 2, relative);
    }

    function getActiveIndex() {
      return ((Math.round(state.progress) % tileCount) + tileCount) % tileCount;
    }

    function updateTileStatus() {
      const currentActiveIndex = getActiveIndex();
      if (currentActiveIndex === activeTileIndex) return;

      activeTileIndex = currentActiveIndex;

      tiles.forEach((tile, index) => {
        tile.setAttribute(
          "data-depth-tiles-item-status",
          index === activeTileIndex ? "active" : "not-active",
        );
      });
    }

    function renderDepth() {
      const tileWidth = tiles[0].offsetWidth;
      const radiusX = tileWidth * xMultiplier;

      updateTileStatus();

      tiles.forEach((tile, index) => {
        const relative = getRelativeIndex(index);
        const angle = (relative / 2) * Math.PI;

        const orbitX = Math.sin(angle) * radiusX;
        const orbitDepth = (Math.cos(angle) + 1) / 2;

        const x = relative <= -2 || relative >= 2 ? 0 : orbitX;
        const scale = gsap.utils.interpolate(backScale, 1, orbitDepth);
        const opacity = gsap.utils.interpolate(backOpacity, 1, orbitDepth);
        const brightness = gsap.utils.interpolate(backDarkness, 1, orbitDepth);
        const rotateY = Math.sin(angle) * -sideRotateY;
        const zIndex = Math.round(gsap.utils.interpolate(1, 1000, orbitDepth));

        gsap.set(tile, {
          x,
          scale,
          opacity,
          rotateY,
          filter: `brightness(${brightness})`,
          zIndex,
        });
      });
    }

    function goToNextTile() {
      if (!isActive || isHovering) return;

      stepTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (isActive && !isHovering) {
            delayedCall = gsap.delayedCall(pauseDuration, goToNextTile);
          }
        },
      });

      stepTimeline.to(state, {
        progress: state.progress + 1,
        duration: moveDuration,
        ease: "depth",
        onUpdate: renderDepth,
      });

      stepTimeline.play();
    }

    function pauseDepth() {
      isActive = false;
      if (stepTimeline) stepTimeline.pause();
      if (delayedCall) delayedCall.pause();
      if (startDelayedCall) startDelayedCall.pause();
    }

    function playDepth() {
      if (userPaused) return;
      isActive = true;
      if (isHovering) return;

      if (!hasStarted) {
        hasStarted = true;
        startDelayedCall = gsap.delayedCall(startDelay, goToNextTile);
        return;
      }

      if (stepTimeline && stepTimeline.progress() < 1) {
        stepTimeline.play();
      } else {
        goToNextTile();
      }
    }

    function handleHoverStart() {
      isHovering = true;
      if (delayedCall) delayedCall.pause();
      if (startDelayedCall) startDelayedCall.pause();
    }

    function handleHoverEnd() {
      isHovering = false;
      if (!isActive) return;

      if (!hasStarted) {
        playDepth();
        return;
      }

      if (stepTimeline && stepTimeline.progress() < 1) {
        stepTimeline.play();
      } else {
        goToNextTile();
      }
    }

    const onPointerOver = (event: PointerEvent) => {
      if (!(event.target as HTMLElement).closest("[data-depth-tiles-item]")) return;
      handleHoverStart();
    };
    const onPointerLeave = () => handleHoverEnd();

    list.addEventListener("pointerover", onPointerOver);
    list.addEventListener("pointerleave", onPointerLeave);

    renderDepth();

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (self.isActive ? playDepth() : pauseDepth()),
    });

    setLoopPausedRef.current = (shouldPause: boolean) => {
      userPaused = shouldPause;
      if (shouldPause) pauseDepth();
      else if (trigger.isActive) playDepth();
    };

    // Teardown so the loop doesn't keep running after client-side navigation.
    return () => {
      setLoopPausedRef.current = null;
      list.removeEventListener("pointerover", onPointerOver);
      list.removeEventListener("pointerleave", onPointerLeave);
      trigger.kill();
      stepTimeline?.kill();
      delayedCall?.kill();
      startDelayedCall?.kill();
      gsap.killTweensOf(tiles);
    };
  }, [coaches]);

  return (
    <section className="px-[5%] pt-16 md:pt-24 lg:pt-28">
      <div className="container">
        <div className="max-w-lg">
          <h2 className="mb-5 text-h3 font-medium md:mb-6">{heading}</h2>
          {description && <p className="text-medium">{description}</p>}
        </div>
      </div>

      <div ref={containerRef} data-depth-tiles-init="" className="depth-tiles">
        <div data-depth-tiles-collection="" className="depth-tiles__collection">
          <div data-depth-tiles-list="" className="depth-tiles__list">
            {coaches.map((coach, index) => (
              <div key={index} data-depth-tiles-item="" className="depth-tiles__item">
                <div className="coach-card">
                  <img
                    src={coach.image.src}
                    loading="lazy"
                    alt={coach.image.alt ?? coach.name}
                    className="cover-image"
                  />
                  <div className="coach-card__info">
                    <p className="coach-card__name">{coach.name}</p>
                    <p className="coach-card__position">{coach.position}</p>
                    {coach.certification && (
                      <span className="coach-card__cert">{coach.certification}</span>
                    )}
                    <p className="coach-card__line">{coach.oneLiner}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The loop moves on its own, so anyone can stop it (WCAG 2.2.2). */}
      {isAnimated && (
        <div className="container -mt-6 flex justify-center pb-2">
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => {
              const next = !paused;
              setPaused(next);
              setLoopPausedRef.current?.(next);
            }}
            className="rounded-full border border-scheme-border px-5 py-2 text-small font-semibold transition-colors hover:bg-neutral-lightest"
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      )}
    </section>
  );
};

const PORTRAIT = "/placeholder-image.svg";

export const CoachSliderDefaults: Props = {
  heading: "Meet the people behind the club",
  coaches: [
    {
      image: { src: PORTRAIT },
      name: "Steve Hamilton",
      position: "Director of Football",
      certification: "Designated Safeguarding Lead",
      oneLiner: "Oversees the curriculum and coaching standards across all four branches.",
    },
    {
      image: { src: PORTRAIT },
      name: "Abdul Rehman",
      position: "Club Welfare Officer",
      certification: "Director, DHA Phase V",
      oneLiner: "The first point of contact for any safeguarding concern.",
    },
  ],
};
