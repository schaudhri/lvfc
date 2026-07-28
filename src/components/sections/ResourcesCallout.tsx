import { Button, type ButtonProps } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  heading: string;
  description: string;
  audiences: string[];
  url: string;
  button: ButtonProps;
};

export type ResourcesCalloutProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Site-wide callout linking to the Resource Center. Sits directly above the
 * footer on every page since Resources was dropped from the primary nav.
 */
export const ResourcesCallout = (props: ResourcesCalloutProps) => {
  const { heading, description, audiences, url, button } = {
    ...ResourcesCalloutDefaults,
    ...props,
  };
  return (
    <section className="border-t border-scheme-border px-[5%] py-12 md:py-16">
      <div className="container flex flex-col items-center gap-6 text-center">
        <h2 className="text-h4 font-bold md:text-h3">{heading}</h2>
        <p className="max-w-lg text-medium">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {audiences.map((audience) => (
            <Badge key={audience}>{audience}</Badge>
          ))}
        </div>
        <Button {...button} url={button.url ?? url}>
          {button.title}
        </Button>
      </div>
    </section>
  );
};

export const ResourcesCalloutDefaults: Props = {
  heading: "Club documents, forms and a coaching library",
  description:
    "Policies and registration forms for families, plus a growing library of federation and coach-education links curated from leaders across the game.",
  audiences: ["Parents", "Players", "Coaches", "Clubs & partners"],
  url: "/resources",
  button: { title: "Explore Resources", variant: "secondary" },
};
