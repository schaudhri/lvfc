type ResourceItem = {
  name: string;
  /** Omit when no verified URL exists yet — renders as plain text rather than a broken or guessed link. */
  url?: string;
};

type ResourceCategory = {
  title: string;
  items: ResourceItem[];
};

type Props = {
  heading: string;
  description?: string;
  categories: ResourceCategory[];
};

export type ResourceLibraryProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Categorised directory of external resource links. Items without a verified
 * `url` render as plain text — never a fabricated or "#" link.
 */
export const ResourceLibrary = (props: ResourceLibraryProps) => {
  const { heading, description, categories } = {
    ...ResourceLibraryDefaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h3 font-medium md:mb-6">{heading}</h2>
          {description && <p className="text-medium">{description}</p>}
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div key={index}>
              <h3 className="mb-4 text-h6 font-medium">{category.title}</h3>
              <ul className="flex flex-col gap-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-small">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-6 items-center underline underline-offset-2"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="text-scheme-text/60">{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ResourceLibraryDefaults: Props = {
  heading: "Resource library",
  categories: [
    {
      title: "Category",
      items: [{ name: "Resource name", url: "#" }],
    },
  ],
};
