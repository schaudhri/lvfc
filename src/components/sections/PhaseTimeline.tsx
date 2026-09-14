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
 * Horizontal pathway rail: the club's badge shape, numbered, over each stage's
 * title, age chip and copy (Figma "lvfc-website" home, node 19:309).
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
          <h2 className="text-h3 font-medium">{heading}</h2>
          {description && <p className="mt-5 max-w-lg text-medium">{description}</p>}
          {button && (
            <Button {...button} size="sm" className="mt-6">
              {button.title}
            </Button>
          )}
        </div>

        <PathwayStages phases={phases} />
      </div>
    </section>
  );
};

/**
 * The five stages on their own — badge, title, age, copy — so the same rail
 * can sit inside a card (the programmes index) as well as its own section.
 */
export const PathwayStages = ({ phases }: { phases: Phase[] }) => (
  <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4">
    {phases.map((phase, index) => (
      <div
        key={index}
        className={cn(
          "relative flex flex-col transition-opacity duration-200",
          phase.dimmed && "opacity-35",
        )}
      >
        <div className="mb-5 flex justify-center lg:justify-start">
          <PathwayBadge>{index + 1}</PathwayBadge>
        </div>
        {/* Title with the age as a plain terracotta line beneath it, then
            the copy (Figma "lvfc-website", node 19:316). The step number
            lives in the badge above. */}
        <div className="flex flex-col items-center gap-2.5 text-center lg:items-start lg:text-left">
          <div className="flex flex-col gap-1">
            <h3 className="text-h6 font-medium">{phase.title}</h3>
            <p className="font-heading text-small font-medium capitalize leading-[18px] text-brand-terracotta">
              <span className="sr-only">Ages </span>
              {phase.age}
            </p>
          </div>
          <p className="text-small text-scheme-text/70">{phase.description}</p>
        </div>
      </div>
    ))}
  </div>
);

/**
 * The badge outline is the exported Figma vector (champagne fill baked in).
 * The number sits over it at the badge's visual centre, which is above its
 * geometric centre because of the pointed foot.
 */
export const PathwayBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="relative flex h-[77px] w-[61px] shrink-0 justify-center">
    <img src="/images/pathway-badge.svg" alt="" className="absolute inset-0 size-full" />
    <span className="relative mt-[23px] font-heading text-large font-medium leading-[30px] text-white">
      {children}
    </span>
  </span>
);

export const PhaseTimelineDefaults: Props = {
  heading: "The player pathway",
  phases: [
    { age: "2 years", title: "FUNdamentals", description: "Play-based introduction" },
    { age: "3–4 years", title: "Mini-Kickers", description: "Coordination, confidence" },
    { age: "5–8 years", title: "Pre Club", description: "Ball mastery, 1v1" },
    { age: "9–12 years", title: "Foundation", description: "Technique, small-sided games" },
    { age: "13+ years", title: "Youth Development", description: "Tactical concepts, team shape" },
  ],
};
