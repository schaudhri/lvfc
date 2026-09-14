"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, type MotionStyle } from "motion/react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight } from "relume-icons";

type FeaturesProps = {
  heading: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  buttons: ButtonProps[];
  features: FeaturesProps[];
  /**
   * `vertical` is the original scroll-drawn timeline. `horizontal` lays the
   * steps out in a row with nothing to scroll through (home page, client
   * request, 14 Sept 2026); it stacks to a column on phones.
   */
  orientation?: "vertical" | "horizontal";
};

export type Layout121Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout121 = (props: Layout121Props) => {
  const { heading, buttons, features, orientation = "vertical" } = {
    ...Layout121Defaults,
    ...props,
  };

  if (orientation === "horizontal") {
    return (
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-12">
            <h2 className="text-h3 font-medium">{heading}</h2>
            <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-4">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {features.map((feature, index) => (
              <li key={index} className="relative flex flex-col">
                {/* Joins each step to the next across the row on desktop. */}
                {index < features.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-6 left-16 -right-6 hidden h-px bg-scheme-border/25 lg:block"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="relative z-10 mb-6 flex size-12 items-center justify-center rounded-full bg-brand-maroon text-large font-semibold text-white"
                >
                  {index + 1}
                </span>
                <h3 className="mb-3 text-h6 font-medium">{feature.heading}</h3>
                <p className="text-scheme-text/70">{feature.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="mb-5 text-h3 font-medium md:mb-6">{heading}</h2>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div className="relative">
            <AnimationSection />
            {features.map((feature, index) => (
              <div key={index} className="grid grid-cols-[max-content_1fr] gap-x-6 lg:gap-x-10">
                <div className="relative flex flex-col items-center justify-start py-10">
                  <div className="relative z-10 -mt-4 bg-scheme-background px-2 py-4 md:px-4">
                    {/* A step number, not the club badge: these are real
                        steps in order, so the marker says which one. */}
                    <span
                      aria-hidden="true"
                      className="flex size-12 items-center justify-center rounded-full bg-brand-maroon text-large font-semibold text-white"
                    >
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="py-10">
                  <h3 className="mb-3 text-h6 font-medium md:mb-4">{feature.heading}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AnimationSection = () => {
  const scrollSection = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollSection,
    offset: ["start 55%", "start start"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="absolute top-[10%] right-auto left-8 h-3/4 w-0.5 bg-neutral-darkest/15 md:left-[2.4375rem]">
      <motion.div
        ref={scrollSection}
        className="bg-neutral-darkest"
        style={{ height } as MotionStyle}
      />
    </div>
  );
};

export const Layout121Defaults: Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  buttons: [
    { title: "Button", variant: "secondary" },
    {
      title: "Button",
      variant: "link",
      size: "link",
      iconRight: <ChevronRight className="text-scheme-text" />,
    },
  ],
  features: [
    {
      heading: "Subheading one",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      heading: "Subheading two",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      heading: "Subheading three",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      heading: "Subheading four",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
  ],
};
