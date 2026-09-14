import { Button, type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  /** Optional: the About hero is the title alone (client request, 14 Sept 2026). */
  description?: string;
  buttons?: ButtonProps[];
  image: ImageProps;
};

export type Header30Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header30 = (props: Header30Props) => {
  const { heading, description, buttons = [], image } = {
    ...Header30Defaults,
    ...props,
  };
  const hasMore = Boolean(description) || buttons.length > 0;
  return (
    <section className="relative px-[5%]">
      <div className="relative z-10 container">
        {/* 76% of the screen rather than all of it (client request, 14 Sept
            2026), so the top of the next section shows and says "scroll". */}
        <div className="flex max-h-[60rem] min-h-[76svh] items-center justify-center py-16 text-center md:py-24 lg:py-28">
          <div className="w-full max-w-lg">
            <h1
              className={`text-h1 font-medium text-white ${hasMore ? "mb-5 md:mb-6" : ""}`}
            >
              {heading}
            </h1>
            {description && <p className="text-medium text-white">{description}</p>}
            {buttons.length > 0 && (
              <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
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
      <div className="absolute inset-0 z-0">
        <img src={image.src} className="size-full object-cover" alt={image.alt} />
        <div className="absolute inset-0 bg-neutral-darkest/50" />
      </div>
    </section>
  );
};

export const Header30Defaults: Props = {
  heading: "Medium length hero heading goes here",
  image: {
    src: "/placeholder-image.svg",
    alt: "Relume placeholder background image",
  },
};
