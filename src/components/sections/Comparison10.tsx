import React from "react";
import clsx from "clsx";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Check, ChevronRight, Close } from "relume-icons";

type Feature = {
  text: string;
  items: React.ReactNode[];
};

type ImageProps = {
  src: string;
  alt?: string;
};

type Product = {
  image: ImageProps;
};

type ComparisonProducts = {
  title?: string;
  products: Product[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  comparisonProducts: ComparisonProducts[];
  features: Feature[];
  buttons: ButtonProps[];
};

export type Comparison10Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Comparison10 = (props: Comparison10Props) => {
  const { heading, description, buttons, comparisonProducts, features } = {
    ...Comparison10Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="mx-auto max-w-xl">
          <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
            {comparisonProducts.map((comparison, index) => (
              <React.Fragment key={index}>
                <div className="hidden h-full flex-col items-start justify-end py-4 pr-4 sm:py-6 sm:pr-6 md:flex lg:py-6 lg:pr-6">
                  <h2 className="text-h6 font-bold">{comparison.title}</h2>
                </div>
                {comparison.products.map((plan, index) => (
                  <ProductPlan key={index} index={index} {...plan} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <FeaturesSection features={features} />
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 md:mt-18 lg:mt-20">
            {buttons.map((button, index) => (
              <Button key={index} {...button}>
                {button.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductPlan = ({ ...product }: Product & { index: number }) => {
  return (
    <div className="flex h-full flex-col justify-between px-2 py-4 sm:px-4 sm:py-6 lg:p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="inline-block">
          <img src={product.image.src} alt={product.image.alt} className="max-h-12" />
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = ({ features }: { features: Feature[] }) => {
  return (
    <div>
      {features.map((feature, index) => (
        <div key={index}>
          <div
            key={index}
            className={clsx("grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]", {
              "bg-scheme-foreground": index % 2 === 0,
            })}
          >
            <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
              {feature.text}
            </p>
            {feature.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const Comparison10Defaults: Props = {
  tagline: "Tagline",
  heading: "Short heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  comparisonProducts: [
    {
      title: "Product comparison",
      products: [
        {
          image: {
            src: "https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg",
            alt: "Relume icon 1",
          },
        },
        {
          image: {
            src: "https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg",
            alt: "Relume icon 2",
          },
        },
      ],
    },
  ],
  features: [
    {
      text: "Feature text goes here",
      items: ["Unlimited", "10"],
    },
    {
      text: "Feature text goes here",
      items: [
        <Check className="size-6 text-scheme-text" />,
        <Check className="size-6 text-scheme-text" />,
      ],
    },
    {
      text: "Feature text goes here",
      items: [
        <Check className="size-6 text-scheme-text" />,
        <Check className="size-6 text-scheme-text" />,
      ],
    },
    {
      text: "Feature text goes here",
      items: [<Check className="size-6 text-scheme-text" />, <Close className="size-6" />],
    },
    {
      text: "Feature text goes here",
      items: [<Check className="size-6 text-scheme-text" />, <Close className="size-6" />],
    },
  ],
  buttons: [
    { title: "Button", variant: "secondary" },
    {
      title: "Button",
      variant: "link",
      size: "link",
      iconRight: <ChevronRight className="text-scheme-text" />,
    },
  ],
};
