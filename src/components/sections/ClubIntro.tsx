import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Stat = { value: string; label: string };

type Props = {
  eyebrow?: string;
  heading: string;
  body: string[];
  stats?: Stat[];
  buttons?: ButtonProps[];
  className?: string;
};

export type ClubIntroProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * The "who we are" block that sits directly under the landing hero.
 *
 * The hero is atmospheric rather than explanatory, so this is the first place a
 * visitor learns what the club actually is, who it serves and where it runs.
 * Copy is drawn from content pack Section 1.
 */
export const ClubIntro = (props: ClubIntroProps) => {
  const { eyebrow, heading, body, stats, buttons, className } = {
    ...ClubIntroDefaults,
    ...props,
  };

  return (
    <section className={cn("px-[5%] py-16 md:py-24 lg:py-28", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            {eyebrow && (
              <p className="mb-4 text-tiny font-semibold uppercase tracking-wider text-scheme-text/60">
                {eyebrow}
              </p>
            )}
            <h2 className="text-h2 font-medium">{heading}</h2>
          </div>

          <div className="flex flex-col gap-5">
            {body.map((paragraph, index) => (
              <p key={index} className="text-medium text-scheme-text/85">
                {paragraph}
              </p>
            ))}

            {stats && stats.length > 0 && (
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-t border-scheme-border pt-3">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-h4 font-medium">{stat.value}</span>
                      <span className="mt-1 block text-small text-scheme-text/70">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {buttons && buttons.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {buttons.map((button, index) => (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ClubIntroDefaults: Props = {
  eyebrow: "Who we are",
  heading: "A club with a place for every player",
  body: [
    "At Lahore Virgil Football Club, every player — regardless of age or ability — has a pathway. Our programmes are designed and directed by UEFA-licensed coaches, blending international methodology with local understanding to produce technically complete, tactically intelligent footballers.",
    "Run by Virgil Sports, we train at four branches across Lahore, from a first touch aged two through to selected competitive squads. Whether your child is here to make friends and burn energy or to chase a place in a competitive team, there is a group for them.",
  ],
  stats: [
    { value: "4", label: "Branches across Lahore" },
    { value: "2–18", label: "Ages we coach" },
    { value: "5", label: "Age groups in the pathway" },
    { value: "3", label: "Academy sessions a week" },
  ],
};
