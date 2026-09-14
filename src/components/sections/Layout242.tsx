import { ChevronRight } from "relume-icons";
import { cardPadded } from "@/lib/surface";
import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "@/components/ui/button";

type SectionProps = {
  heading: string;
  description: string;
  button: ButtonProps;
};

type Props = {
  heading: string;
  sections: SectionProps[];
};

export type Layout242Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout242 = (props: Layout242Props) => {
  const { heading, sections } = { ...Layout242Defaults, ...props };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-start">
          <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
            <h2 className="text-h3 font-medium">{heading}</h2>
          </div>
          {/*
            `items-start` is deliberately absent: as cards these stretch to a
            shared height, so a short column doesn't leave a ragged grey edge
            next to a long one. The button is pushed to the bottom with
            `mt-auto` for the same reason.
          */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-y-16">
            {sections.map((section, index) => (
              <div key={index} className={cn("flex flex-col", cardPadded)}>
                <h3 className="mb-5 text-h5 font-medium md:mb-6">{section.heading}</h3>
                <p className="mb-5 md:mb-6">{section.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                  <Button {...section.button}>{section.button.title}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout242Defaults: Props = {
  heading: "Long heading is what you see here in this feature section",
  sections: [
    {
      heading: "Long heading is what you see here in this feature section",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      button: {
        title: "Button",
        variant: "link",
        size: "link",
        iconRight: <ChevronRight className="text-scheme-text" />,
      },
    },
    {
      heading: "Long heading is what you see here in this feature section",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      button: {
        title: "Button",
        variant: "link",
        size: "link",
        iconRight: <ChevronRight className="text-scheme-text" />,
      },
    },
    {
      heading: "Long heading is what you see here in this feature section",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      button: {
        title: "Button",
        variant: "link",
        size: "link",
        iconRight: <ChevronRight className="text-scheme-text" />,
      },
    },
  ],
};
