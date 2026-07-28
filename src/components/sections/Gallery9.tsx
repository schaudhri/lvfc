import clsx from "clsx";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  images: ImageProps[];
};

export type Gallery9Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Gallery9 = (props: Gallery9Props) => {
  const { heading, description, images } = {
    ...Gallery9Defaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-2 grid-rows-2 gap-6 md:auto-cols-auto md:grid-cols-[2fr_1fr_1fr] md:gap-8">
          {images.map((image, index) => {
            const cls = clsx("inline-block size-full", {
              "col-start-1 col-end-2 row-start-1 row-end-3": index === 0,
            });
            const picture = (
              <div className="size-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            );
            // Gallery images have no destination yet. Render them as plain
            // images rather than links to "#", which assistive tech announces
            // as a link to nowhere.
            return image.url && image.url !== "#" ? (
              <a key={index} href={image.url} className={cls}>
                {picture}
              </a>
            ) : (
              <div key={index} className={cls}>
                {picture}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Gallery9Defaults: Props = {
  heading: "Image Gallery",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  images: [
    {
      url: "#",
      src: "/placeholder-image.svg",
      alt: "Relume placeholder image 1",
    },
    {
      url: "#",
      src: "/placeholder-image.svg",
      alt: "Relume placeholder image 2",
    },
    {
      url: "#",
      src: "/placeholder-image.svg",
      alt: "Relume placeholder image 3",
    },
    {
      url: "#",
      src: "/placeholder-image.svg",
      alt: "Relume placeholder image 4",
    },
    {
      url: "#",
      src: "/placeholder-image.svg",
      alt: "Relume placeholder image 5",
    },
  ],
};
