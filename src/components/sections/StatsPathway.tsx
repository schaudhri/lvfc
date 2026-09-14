import { Button, type ButtonProps } from "@/components/ui/button";

type Stat = {
  value: string;
  label: string;
};

type Props = {
  heading: string;
  stats: Stat[];
  /** Optional. Omit where a pathway timeline already appears on the page. */
  nodes?: string[];
  buttons: ButtonProps[];
};

export type StatsPathwayProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Dark band: centered heading, a white panel of stats split by angled dividers,
 * a dotted node rail beneath, then centered actions.
 */
export const StatsPathway = (props: StatsPathwayProps) => {
  const { heading, stats, nodes, buttons } = {
    ...StatsPathwayDefaults,
    ...props,
  };
  return (
    <section className="bg-neutral-darkest px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <h2 className="mb-12 text-center text-h2 font-medium text-white md:mb-18 lg:mb-20">{heading}</h2>

        {/* Stats panel — angled dividers between cells */}
        <div className="mx-auto max-w-[56rem] overflow-hidden bg-brand-sandstone">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center px-4 py-8 text-center md:px-6 md:py-10"
              >
                {index > 0 && (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px origin-center -skew-x-12 bg-neutral-darkest/15"
                  />
                )}
                <p className="mb-2 text-h4 font-medium text-neutral-darkest md:text-h3">
                  {stat.value}
                </p>
                <p className="text-small text-neutral-darkest/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/*
          Node rail. Five labels don't fit across a 375px screen, so the rail
          scrolls inside its own container rather than pushing the page sideways.
          Omitted on pages that already show the pathway timeline.
        */}
        {nodes && nodes.length > 0 && (
        <div className="-mx-[5%] mt-10 overflow-x-auto px-[5%] md:mt-12 md:mx-0 md:px-0">
          <div className="mx-auto flex min-w-[30rem] max-w-[56rem] items-start justify-between px-2 md:min-w-0">
            {nodes.map((node, index) => (
              <div key={index} className="relative flex min-w-0 flex-1 flex-col items-center">
                {index < nodes.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-[7px] left-1/2 h-px w-full bg-white/30"
                  />
                )}
                <span className="relative z-10 flex size-3.5 items-center justify-center rounded-full bg-brand-sandstone">
                  <span className="size-1.5 rounded-full bg-neutral-darkest" />
                </span>
                <span className="mt-3 px-1 text-center text-tiny tracking-wide text-white/80 uppercase">
                  {node}
                </span>
              </div>
            ))}
          </div>
        </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12">
          {buttons.map((button, index) => (
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const StatsPathwayDefaults: Props = {
  heading: "A club families stay with",
  stats: [
    // Doc-sourced only. Do not reintroduce experience/match-count figures —
    // no client document supports them.
    { value: "4", label: "Branches across Lahore" },
    { value: "2–18", label: "Age range, first touch to U18" },
    { value: "5", label: "Age groups in the pathway" },
    { value: "3", label: "Academy sessions a week" },
  ],
  buttons: [
    { title: "Player Pathway", variant: "alternate" },
    { title: "Become a Sponsor", variant: "secondary-alt" },
  ],
};
