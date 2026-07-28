import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ImageProps = {
  src: string;
  alt?: string;
};

type Track = {
  image: ImageProps;
  tag: string;
  title: string;
  description: string;
  buttons: ButtonProps[];
};

type Props = {
  tracks: Track[];
};

export type TwoTrackSplitProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Custom section — a nearest, lightweight Relume-styled swap for the wireframe's
 * "two-track split" (Phoenix vs Eagles). Built from Relume primitives + tokens.
 */
export const TwoTrackSplit = (props: TwoTrackSplitProps) => {
  const { tracks } = { ...TwoTrackSplitDefaults, ...props };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {tracks.map((track, index) => (
            <Card key={index} className="flex flex-col">
              <div className="relative aspect-[16/9] w-full">
                <img
                  src={track.image.src}
                  alt={track.image.alt}
                  className="absolute size-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col items-start p-6 md:p-8">
                <p className="mb-3 inline-block rounded-badge bg-neutral-lightest px-2 py-[0.175rem] text-small font-semibold">
                  {track.tag}
                </p>
                <h3 className="mb-2 text-h5 font-bold">{track.title}</h3>
                <p className="mb-5 md:mb-6">{track.description}</p>
                <div className="mt-auto flex flex-wrap gap-4">
                  {track.buttons.map((button, i) => (
                    <Button key={i} {...button}>
                      {button.title}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TwoTrackSplitDefaults: Props = {
  tracks: [
    {
      image: {
        src: "/placeholder-image-landscape.svg",
        alt: "Track image 1",
      },
      tag: "Recreational",
      title: "Phoenix",
      description: "Short description of the track goes here.",
      buttons: [{ title: "Learn more", variant: "secondary", size: "sm" }],
    },
    {
      image: {
        src: "/placeholder-image-landscape.svg",
        alt: "Track image 2",
      },
      tag: "Competitive",
      title: "Eagles",
      description: "Short description of the track goes here.",
      buttons: [{ title: "Learn more", variant: "secondary", size: "sm" }],
    },
  ],
};
