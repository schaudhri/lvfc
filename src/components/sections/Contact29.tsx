"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Map = {
  url: string;
  image: ImageProps;
};

type Address = {
  line1: string;
  line2: string;
};

type Location = {
  map: Map;
  title: string;
  address: Address;
  button: ButtonProps;
};

type Tab = {
  value: string;
  content: Location;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  tabs: Tab[];
};

export type Contact29Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Contact29 = (props: Contact29Props) => {
  const { heading, description, tabs } = {
    ...Contact29Defaults,
    ...props,
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 flex max-w-lg flex-col justify-start md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <Tabs
          defaultValue={tabs[0].value}
          className="relative grid auto-cols-fr grid-cols-1 gap-12 md:grid-cols-[.5fr_1fr] md:gap-y-16 lg:gap-x-20 lg:gap-y-16"
        >
          <TabsList className="relative grid h-full auto-cols-fr grid-cols-1 gap-x-4">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.value}
                className="items-start justify-start border-0 border-l py-5 pr-0 pl-8 data-[state=active]:bg-transparent"
              >
                <div className="text-left">
                  <h3 className="mb-3 text-h5 font-bold md:mb-4">{tab.content.title}</h3>
                  <p className="inline-block whitespace-normal">
                    <span className="block">{tab.content.address.line1}</span>
                    <span className="block">{tab.content.address.line2}</span>
                  </p>
                  <div className="mt-5 font-semibold md:mt-6">
                    <p>{tab.content.button.title}</p>
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <div>
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:animate-tabs"
              >
                <div>
                  <img
                    src={tab.content.map.image.src}
                    alt={tab.content.map.image.alt}
                    className="h-[320px] w-full rounded-image object-cover md:h-[565px] lg:h-[516px]"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export const Contact29Defaults: Props = {
  tagline: "Tagline",
  heading: "Locations",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tabs: [
    {
      value: "tab-1",
      content: {
        map: {
          url: "#",
          image: {
            src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-map-image.jpeg",
            alt: "Relume placeholder map image",
          },
        },
        title: "Sydney",
        address: { line1: "123 Sample St,", line2: "Sydney NSW 2000 AU" },
        button: { title: "View Map" },
      },
    },
    {
      value: "tab-2",
      content: {
        map: {
          url: "#",
          image: {
            src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-map-image.jpeg",
            alt: "Relume placeholder map image",
          },
        },
        title: "New York",
        address: { line1: "123 Sample St,", line2: "New York NY 10000 USA" },
        button: { title: "View Map" },
      },
    },
    {
      value: "tab-3",
      content: {
        map: {
          url: "#",
          image: {
            src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-map-image.jpeg",
            alt: "Relume placeholder map image",
          },
        },
        title: "London",
        address: { line1: "123 Sample St,", line2: "London W1C 1DE, United Kingdom" },
        button: { title: "View Map" },
      },
    },
  ],
};
