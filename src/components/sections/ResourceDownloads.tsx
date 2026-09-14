import { Link } from "react-router-dom";
import { ArrowRight } from "relume-icons";
import { resourceGroups, type ResourceItem } from "@/data/resources";

const isExternal = (url: string) => url.startsWith("http");

/** A document we actually have a file for. */
const isAvailable = (item: ResourceItem) => item.status !== "awaiting" && Boolean(item.url);

const ItemCard = ({ item }: { item: ResourceItem }) => {
  const meta = [item.kind, item.size].filter(Boolean).join(" · ");
  const external = isExternal(item.url!);

  return (
    <li>
      <a
        href={item.url}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-start justify-between gap-4 rounded-card bg-neutral-lightest px-5 py-4 transition-colors hover:bg-neutral-lightest"
      >
        <span>
          <span className="block font-semibold">{item.name}</span>
          <span className="mt-0.5 block text-small text-scheme-text/60">
            {item.note ? `${meta} · ${item.note}` : meta}
          </span>
        </span>
        <ArrowRight className="mt-0.5 size-5 shrink-0 text-scheme-text transition-transform group-hover:translate-x-0.5" />
      </a>
    </li>
  );
};

/**
 * A group's not-yet-available documents, as one line.
 *
 * Each used to be its own "Coming soon" row — twelve of fourteen, two screens
 * of things you couldn't have, which made the page look abandoned. The names
 * are still listed and a parent can still ask for any of them.
 */
const AwaitingSummary = ({ items }: { items: ResourceItem[] }) => (
  <li className="rounded-card border border-dashed border-scheme-border/50 px-5 py-4">
    <p className="font-semibold">
      {items.length} more {items.length === 1 ? "document is" : "documents are"} being finalised
    </p>
    <p className="mt-1 text-small text-scheme-text/70">
      {items.map((item) => item.name).join(" · ")}
    </p>
    <Link
      to="/contact"
      className="mt-2 inline-flex min-h-11 items-center text-small lg:min-h-6 font-semibold underline underline-offset-2"
    >
      Ask us for a copy
    </Link>
  </li>
);

type Props = {
  heading: string;
  description?: string;
  /** Render without the section's own padding and container, for use inside a page column. */
  embedded?: boolean;
};

export type ResourceDownloadsProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Club documents and forms, grouped by audience per content pack Section 5.
 * Most files are still owed by the Virgil Sports admin team: what exists is
 * listed in full, and the rest is summarised per group rather than hidden.
 */
export const ResourceDownloads = (props: ResourceDownloadsProps) => {
  const {
    heading = "Documents & forms",
    description = "Club policies, guides and registration forms. Downloads are free and open — no account needed.",
    embedded,
  } = props;

  return (
    <section
      className={
        embedded
          ? "pt-16 md:pt-20"
          : "px-[5%] py-16 md:py-24 lg:py-28"
      }
    >
      <div className={embedded ? "" : "container"}>
        <div className={embedded ? "mb-10 max-w-lg md:mb-12" : "mb-12 max-w-lg md:mb-18 lg:mb-20"}>
          <h2 className="mb-5 text-h3 font-medium">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {resourceGroups.map((group) => {
            const ready = group.items.filter(isAvailable);
            const awaiting = group.items.filter((item) => !isAvailable(item));
            return (
              <div
                key={group.id}
                id={group.id}
                className="grid scroll-mt-24 grid-cols-1 gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12"
              >
                <div>
                  <h3 className="mb-3 text-h5 font-medium">{group.title}</h3>
                  <p className="text-small text-scheme-text/70">{group.description}</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {ready.map((item) => (
                    <ItemCard key={item.name} item={item} />
                  ))}
                  {awaiting.length > 0 && <AwaitingSummary items={awaiting} />}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
