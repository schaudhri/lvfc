import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAges, programmeImage, type Programme } from "@/data/programmes";
import { programmeCta } from "@/data/cta";
import { cardMedia, cardPadded } from "@/lib/surface";
import { cn } from "@/lib/utils";

/**
 * Programmes presented by weight, not as a grid of equals.
 *
 * - `PathwayProgrammeRow` — the five pathway programmes, as wide rows with the
 *   photo on the left, in stage order.
 * - `CompactProgrammeCard` — alternatives, squads and trials, without a photo.
 * - `ProgrammeCard` — a photo card for grids, on the branch pages.
 * - `ProgrammeListRow` — the plainest form, a text row with the booking button.
 *
 * Both cards follow the Figma card structure (node 19:818, Sept 2026): white,
 * the age line above the title, a terracotta "Book A Spot" and "Learn more"
 * pushed to the right.
 */

const programmeUrl = (programme: Programme) => `/programmes/${programme.slug}`;

/** "2 Years", "3–4 Years", "All Ages" — the first thing a parent looks for. */
const AgeLabel = ({ ages }: { ages: string }) => (
  <p className="text-small font-semibold capitalize text-brand-terracotta">
    <span className="sr-only">Ages </span>
    {formatAges(ages)}
  </p>
);

const LearnMore = ({ to }: { to: string }) => (
  <Link
    to={to}
    className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-terracotta lg:min-h-0 underline-offset-4 hover:underline"
  >
    Learn more
    <ChevronRight className="size-5 text-brand-terracotta transition-transform duration-200 group-hover:translate-x-0.5" />
  </Link>
);

export const PathwayProgrammeRow = ({ programme }: { programme: Programme }) => {
  const book = programmeCta(programme.bookingKey);
  const image = programmeImage(programme);
  const url = programmeUrl(programme);
  return (
    <li
      className={cn(
        "group grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
        cardMedia,
      )}
    >
      {/* Decorative: the title link is the accessible route to the page. */}
      <Link
        to={url}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block md:min-h-[16.25rem]"
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover md:absolute md:inset-0 md:aspect-auto md:h-full"
        />
        {programme.flagship && <Badge className="absolute top-4 left-4">Flagship</Badge>}
      </Link>

      <div className="flex flex-col justify-center gap-2 p-6 md:p-10">
        <AgeLabel ages={programme.agesLabel} />
        <h3 className="text-h5 font-medium text-brand-terracotta">
          <Link to={url} className="hover:underline">
            {programme.name}
          </Link>
        </h3>
        <p className="max-w-[42rem]">{programme.summary}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Button {...book} size="sm">
            {book.title}
          </Button>
          <LearnMore to={url} />
        </div>
      </div>
    </li>
  );
};

export const CompactProgrammeCard = ({ programme }: { programme: Programme }) => {
  const book = programmeCta(programme.bookingKey);
  const url = programmeUrl(programme);
  return (
    // No age line on these (client request, Sept 2026) — the alternatives
    // aren't chosen by age the way the pathway stages are.
    <li className={cn("group flex flex-col gap-1", cardPadded)}>
      <h3 className="text-h5 font-medium">
        <Link to={url} className="hover:underline">
          {programme.name}
        </Link>
      </h3>
      <p className="mt-3 mb-6 text-scheme-text/70">{programme.summary}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <Button {...book} size="sm">
          {book.title}
        </Button>
        <LearnMore to={url} />
      </div>
    </li>
  );
};

/**
 * Photo card for a grid of programmes — the branch pages' "Programmes at X"
 * (client request, 14 Sept 2026). Same parts as the pathway row, stacked.
 */
export const ProgrammeCard = ({
  programme,
  note,
}: {
  programme: Programme;
  /** A caveat under the summary, e.g. availability not yet confirmed here. */
  note?: string;
}) => {
  const book = programmeCta(programme.bookingKey);
  const image = programmeImage(programme);
  const url = programmeUrl(programme);
  return (
    <li className={cn("group flex flex-col", cardMedia)}>
      {/* Decorative: the title link is the accessible route to the page. */}
      <Link to={url} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {programme.flagship && <Badge className="absolute top-4 left-4">Flagship</Badge>}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <AgeLabel ages={programme.agesLabel} />
        <h3 className="text-h5 font-medium text-brand-terracotta">
          <Link to={url} className="hover:underline">
            {programme.name}
          </Link>
        </h3>
        {programme.season && (
          <p className="text-small text-scheme-text/70">{programme.season}</p>
        )}
        <p className="mt-1">{programme.summary}</p>
        {note && <p className="text-small text-scheme-text/60">{note}</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6">
          <Button {...book} size="sm">
            {book.title}
          </Button>
          <LearnMore to={url} />
        </div>
      </div>
    </li>
  );
};

export const ProgrammeListRow = ({
  programme,
  note,
}: {
  programme: Programme;
  /** A caveat under the name, e.g. availability not yet confirmed here. */
  note?: string;
}) => {
  const book = programmeCta(programme.bookingKey);
  const url = programmeUrl(programme);
  return (
    <li className="flex flex-col gap-4 border-t border-scheme-border/30 py-5 md:flex-row md:items-center md:justify-between md:gap-8">
      <div>
        <h4 className="text-h6 font-medium">
          <Link to={url} className="hover:underline">
            {programme.name}
          </Link>
        </h4>
        <p className="mt-1 text-small tabular-nums text-scheme-text/70">
          {formatAges(programme.agesLabel)}
          {programme.season && <> · {programme.season}</>}
        </p>
        {note && <p className="mt-1 text-small text-scheme-text/60">{note}</p>}
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
        <Button {...book} size="sm">
          {book.title}
        </Button>
        <Link to={url} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-terracotta underline-offset-4 hover:underline lg:min-h-0">
          Learn more
          <ChevronRight className="size-5 text-brand-terracotta transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </li>
  );
};
