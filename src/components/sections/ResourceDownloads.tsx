import { Link } from "react-router-dom";
import { ArrowRight } from "relume-icons";
import { Badge } from "@/components/ui/badge";
import { resourceGroups, type ResourceItem } from "@/data/resources";

const isExternal = (url: string) => url.startsWith("http");

const ItemCard = ({ item }: { item: ResourceItem }) => {
  const meta = [item.kind, item.size].filter(Boolean).join(" · ");

  // An item we don't have the file for renders as a plain card, never a link —
  // a dead download is worse than an honest "not yet".
  if (item.status === "awaiting" || !item.url) {
    return (
      <li className="flex items-start justify-between gap-4 rounded-card bg-neutral-lightest/25 px-5 py-4">
        <span>
          <span className="block font-semibold text-scheme-text/60">{item.name}</span>
          <span className="mt-0.5 block text-small text-scheme-text/60">{meta}</span>
          {/* Still an action, even with no file: the club can send it on request
              rather than the card being a dead end. */}
          <Link
            to="/contact"
            className="mt-2 inline-flex min-h-6 items-center gap-2 text-small font-semibold underline underline-offset-2"
          >
            Ask us for a copy
          </Link>
        </span>
        <Badge className="shrink-0 bg-transparent text-scheme-text/60">Coming soon</Badge>
      </li>
    );
  }

  const external = isExternal(item.url);

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

type Props = {
  heading: string;
  description?: string;
};

export type ResourceDownloadsProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Club documents and forms, grouped by audience per content pack Section 5.
 * Most files are still owed by the Virgil Sports admin team, so each item
 * carries its own availability state rather than the whole section being hidden.
 */
export const ResourceDownloads = (props: ResourceDownloadsProps) => {
  const {
    heading = "Documents & forms",
    description = "Club policies, guides and registration forms. Downloads are free and open — no account needed.",
  } = props;

  return (
    <section className="border-t border-scheme-border/20 px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h3 font-bold">{heading}</h2>
          <p className="text-medium">{description}</p>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {resourceGroups.map((group) => (
            <div
              key={group.id}
              id={group.id}
              className="grid scroll-mt-24 grid-cols-1 gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12"
            >
              <div>
                <h3 className="mb-3 text-h5 font-bold">{group.title}</h3>
                <p className="text-small text-scheme-text/70">{group.description}</p>
              </div>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <ItemCard key={item.name} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
