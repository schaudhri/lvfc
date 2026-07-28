import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline?: string;
  heading: string;
  description: string;
  buttons?: ButtonProps[];
  image: ImageProps;
  /** "full" = the landing hero: ~90vh with content centred both ways. */
  size?: "default" | "full";
};

export type Header54Props = Omit<React.ComponentPropsWithoutRef<"section">, "size"> &
  Partial<Props>;

export const Header54 = (props: Header54Props) => {
  const { heading, description, buttons, image, size } = {
    ...Header54Defaults,
    ...props,
  };
  // "full" is the landing hero: near-full-viewport with everything centred.
  // Interior pages keep the shorter, left-aligned banner.
  const isFull = size === "full";

  return (
    <section
      className={cn(
        "relative px-[5%]",
        isFull
          ? "flex min-h-[90vh] items-center justify-center py-20"
          : "py-16 md:py-24 lg:py-28",
      )}
    >
      <div className="relative z-10 container">
        <div className={cn("w-full", isFull ? "mx-auto max-w-3xl text-center" : "max-w-lg")}>
          <h1 className="mb-5 text-h1 font-bold text-white md:mb-6">{heading}</h1>
          <p className={cn("text-medium text-white", isFull && "mx-auto max-w-xl")}>
            {description}
          </p>
          {buttons && buttons.length > 0 && (
            <div
              className={cn(
                "mt-6 flex flex-wrap gap-4 md:mt-8",
                isFull && "justify-center",
              )}
            >
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img src={image.src} className="size-full object-cover" alt={image.alt} />
        <div className="absolute inset-0 bg-neutral-darkest/50" />
      </div>
    </section>
  );
};

export const Header54Defaults: Props = {
  heading: "Short heading here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  image: {
    src: "/placeholder-image.svg",
    alt: "Relume placeholder background image",
  },
};
