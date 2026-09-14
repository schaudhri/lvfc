import { Button, type ButtonProps } from "@/components/ui/button";
type Pillar = {
  title: string;
  description: string;
};

type Props = {
  tagline?: string;
  heading: string;
  description: string;
  pillars: Pillar[];
  /**
   * One CTA for the section rather than one per card. The four pillars are a
   * single idea split four ways and share a destination — four identical
   * buttons inside four cards would be noise, not navigation.
   */
  button?: ButtonProps;
};

export type PillarsProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Pillars = (props: PillarsProps) => {
  const { heading, description, pillars, button } = {
    ...PillarsDefaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-medium md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="flex flex-col rounded-card bg-neutral-lightest p-6 md:p-8"
            >
              <p className="mb-4 text-h6 font-medium text-scheme-text/60">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-3 text-h5 font-medium md:mb-4">{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
        {button && (
          <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
            <Button {...button}>{button.title}</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export const PillarsDefaults: Props = {
  tagline: "Methodology",
  heading: "Pillars of the game",
  description: "The four pillars of the modern game, applied at every age.",
  pillars: [
    { title: "Technical", description: "Ball mastery, first touch, striking." },
    { title: "Tactical", description: "Positional awareness and team shape." },
    { title: "Physical", description: "Movement, conditioning, resilience." },
    { title: "Mental", description: "Focus, decision-making, character." },
  ],
};
