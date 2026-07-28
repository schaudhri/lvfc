import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Phase = {
  age: string;
  title: string;
  description: string;
  /**
   * Renders the stage faded rather than removing it. On a programme page the
   * whole pathway still shows, so a parent can see what comes before and after
   * the stage their child is at — dropping the others would lose that context.
   */
  dimmed?: boolean;
};

type Props = {
  tagline?: string;
  heading: string;
  description?: string;
  button?: ButtonProps;
  phases: Phase[];
};

export type PhaseTimelineProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Horizontal pathway rail: numbered hexagon nodes joined by a connector line,
 * with an age chip and stage copy beneath each node.
 */
export const PhaseTimeline = (props: PhaseTimelineProps) => {
  const { heading, description, button, phases } = {
    ...PhaseTimelineDefaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <h2 className="text-h2 font-bold">{heading}</h2>
          {description && <p className="mt-5 max-w-lg text-medium">{description}</p>}
          {button && (
            <Button {...button} size="sm" className="mt-6">
              {button.title}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4">
          {phases.map((phase, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col transition-opacity duration-200",
                phase.dimmed && "opacity-35",
              )}
            >
              {/* connector line — drawn to the right of every node except the last */}
              {index < phases.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[2.375rem] left-1/2 hidden h-px w-full bg-scheme-border/30 lg:block"
                />
              )}
              <div className="relative z-10 mb-5 flex justify-center lg:justify-start">
                <Hexagon>{String(index + 1).padStart(2, "0")}</Hexagon>
              </div>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* The step number lives in the hexagon above — repeating it
                    beside the age chip just read as a second, competing number. */}
                <span className="mb-3 rounded-full border border-scheme-border/40 px-2 py-0.5 text-tiny">
                  {phase.age}
                </span>
                <h3 className="mb-2 text-h6 font-bold">{phase.title}</h3>
                <p className="text-small text-scheme-text/70">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hexagon = ({ children }: { children: React.ReactNode }) => (
  <span
    // Terracotta rather than midnight: the pathway is an identity moment, and
    // §4.1 puts the core colour on exactly this kind of element.
    className="flex size-[4.75rem] items-center justify-center bg-brand-terracotta text-large font-bold text-white"
    style={{
      clipPath: "polygon(25% 2%, 75% 2%, 100% 50%, 75% 98%, 25% 98%, 0% 50%)",
    }}
  >
    {children}
  </span>
);

export const PhaseTimelineDefaults: Props = {
  heading: "The player pathway",
  phases: [
    { age: "2 years", title: "Fundamentals", description: "Play-based introduction" },
    { age: "3–4 years", title: "Little Robbins", description: "Coordination, confidence" },
    { age: "5–8 years", title: "Pre Academy", description: "Ball mastery, 1v1" },
    { age: "9–12 years", title: "Foundation", description: "Technique, small-sided games" },
    { age: "13+ years", title: "Youth Development", description: "Tactical concepts, team shape" },
  ],
};
