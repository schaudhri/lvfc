import { Button, type ButtonProps } from "@/components/ui/button";

type Props = {
  tagline: string;
  heading: string;
  description: string;
  /** One call to action only — the page's primary one. */
  button: ButtonProps;
};

export type Header62Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Closing CTA at the foot of a page. Styled from the Figma "lvfc-website"
 * file (node 19:1388): a terracotta panel with a champagne title and a single
 * champagne button, so every page ends on one clear next step.
 */
export const Header62 = (props: Header62Props) => {
  const { heading, description, button } = {
    ...Header62Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rounded-card bg-brand-terracotta px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-[48rem] text-center">
            <h2 className="mb-5 text-h3 font-medium text-brand-champagne md:mb-6">{heading}</h2>
            <p className="text-medium text-white">{description}</p>
            <div className="mt-6 flex justify-center md:mt-8">
              <Button {...button} variant="champagne">
                {button.title}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header62Defaults: Props = {
  tagline: "Tagline",
  heading: "Short heading here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  button: { title: "Button" },
};
