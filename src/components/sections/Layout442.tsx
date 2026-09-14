import { Button, type ButtonProps } from "@/components/ui/button";
import { ChevronRight } from "relume-icons";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Layout442Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout442 = (props: Layout442Props) => {
  const { heading, description, buttons, image } = {
    ...Layout442Defaults,
    ...props,
  };

  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="relative z-10 container">
        <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 lg:gap-x-20">
          <div>
            <h2 className="text-h3 font-medium text-white">{heading}</h2>
          </div>
          <div className="md:mt-48">
            <p className="text-medium text-white">{description}</p>
            {/* Primary on the left, the text link pushed to the far edge
                (Figma "lvfc-website" home, node 19:299). */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 md:mt-10">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img src={image.src} className="size-full object-cover" alt={image.alt} />
        {/* Maroon wash rather than a neutral one (Figma node 19:308). */}
        <div className="absolute inset-0 bg-brand-maroon/70" />
      </div>
    </section>
  );
};

export const Layout442Defaults: Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [
    { title: "Button", variant: "secondary-alt" },
    {
      title: "Button",
      variant: "link-alt",
      size: "link",
      iconRight: <ChevronRight className="text-white" />,
    },
  ],
  image: {
    src: "/placeholder-image.svg",
    alt: "Relume placeholder background image",
  },
};
