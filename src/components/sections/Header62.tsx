import { Button, type ButtonProps } from "@/components/ui/button";

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
};

export type Header62Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header62 = (props: Header62Props) => {
  const { heading, description, buttons } = {
    ...Header62Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        {/* The closing CTA sits on the card surface too, so it reads as a
            deliberate panel rather than text adrift at the foot of the page. */}
        <div className="rounded-card bg-neutral-lightest px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="mb-5 text-h1 font-bold md:mb-6">{heading}</h2>
            <p className="text-medium">{description}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
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
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
};
