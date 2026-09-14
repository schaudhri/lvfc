import { useState } from "react";
import { ArrowRight } from "relume-icons";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

type ImageProps = {
  src: string;
  alt?: string;
};

type Location = {
  name: string;
  address: string;
  url?: string;
  map: ImageProps;
};

type Props = {
  tagline?: string;
  /** Omit when a section directly above already introduces the branches. */
  heading?: string;
  description?: string;
  locations: Location[];
  buttons?: ButtonProps[];
};

export type LocationsListProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Centered header above a two-column body: a selectable list of branches on the
 * left, map preview on the right. Selecting a branch swaps the map.
 */
export const LocationsList = (props: LocationsListProps) => {
  const { tagline: _tagline, heading, description, locations, buttons, className, ...rest } = {
    ...LocationsListDefaults,
    ...props,
  };
  const [active, setActive] = useState(0);
  const activeLocation = locations[active] ?? locations[0];

  return (
    <section
      {...rest}
      className={cn("scroll-mt-24 px-[5%] py-16 md:py-24 lg:py-28", className)}
    >
      <div className="container">
        {heading && (
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-5 text-h2 font-medium md:mb-6">{heading}</h2>
            {description && <p className="text-medium">{description}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-4">
            {locations.map((location, index) => {
              const isActive = index === active;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={isActive}
                  // Selected: the redcurrant card surface with a champagne
                  // title and white text (client direction, Sept 2026).
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-card px-6 py-5 text-left transition-colors",
                    isActive
                      ? "bg-brand-maroon text-white"
                      : "bg-neutral-lightest hover:bg-neutral-lighter",
                  )}
                >
                  <span>
                    <span
                      className={cn(
                        "mb-1 block text-large font-bold",
                        isActive && "text-brand-champagne",
                      )}
                    >
                      {location.name}
                    </span>
                    <span className={cn("block", isActive ? "text-white" : "text-scheme-text/70")}>
                      {location.address}
                    </span>
                  </span>
                  <ArrowRight
                    className={cn("size-6 shrink-0", isActive ? "text-white" : "text-scheme-text")}
                  />
                </button>
              );
            })}
          </div>
          <a
            href={activeLocation.url ?? "#"}
            className="block w-full overflow-hidden rounded-image"
          >
            <img
              src={activeLocation.map.src}
              alt={activeLocation.map.alt ?? `Map of ${activeLocation.name}`}
              className="aspect-[4/3] size-full object-cover"
            />
          </a>
        </div>

        {buttons && buttons.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {buttons.map((button, index) => (
              <Button key={index} {...button}>
                {button.title}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const MAP = "https://d22po4pjz3o32e.cloudfront.net/placeholder-map-image.jpeg";

export const LocationsListDefaults: Props = {
  tagline: "Locations",
  locations: [
    { name: "Gulberg", address: "City School, Gurumangat Road", map: { src: MAP } },
    { name: "DHA Phase 5", address: "K-Block Swimming Pool Ground", map: { src: MAP } },
    { name: "DHA Phase 8", address: "Lemniscate Club", map: { src: MAP } },
    { name: "Pine Avenue", address: "The Box, near Alhamd Garden", map: { src: MAP } },
  ],
};
