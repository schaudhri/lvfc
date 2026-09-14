import { Button, type ButtonProps } from "@/components/ui/button";
import type { Image } from "@/data/clubPhotos";

type Coach = {
  image: Image;
  /** Optional until the club supplies names; a card without one shows the photo alone. */
  name?: string;
  /** Position, e.g. "Head Coach, Gulberg". */
  role?: string;
  /** One sentence about the coach, in the club's words. */
  oneLiner?: string;
};

type Props = {
  id?: string;
  heading: string;
  description?: string;
  coaches: Coach[];
  footer?: { heading: string; description: string; button: ButtonProps };
};

/**
 * The coaching staff, three across (Coaching page, client request 14 Sept
 * 2026). The club's leadership lives on About; this is the people on the
 * pitch. Names and roles render when the data has them.
 */
export const CoachGrid = ({ id, heading, description, coaches, footer }: Props) => (
  <section id={id} className="scroll-mt-10 px-[5%] py-16 md:py-24 lg:py-28">
    <div className="container">
      <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
        <h2 className="mb-5 text-h2 font-medium md:mb-6">{heading}</h2>
        {description && <p className="text-medium">{description}</p>}
      </div>
      <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {coaches.map((coach, index) => (
          <li key={coach.image.src + index} className="flex flex-col gap-3">
            <img
              src={coach.image.src}
              alt={coach.image.alt}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-image object-cover"
            />
            {/* Name, position, then the one-liner — rendered as soon as the
                club's details are in `data/coaches.ts`. */}
            {coach.name && (
              <div>
                <h3 className="text-large font-medium">{coach.name}</h3>
                {coach.role && <p className="text-small text-scheme-text/70">{coach.role}</p>}
                {coach.oneLiner && (
                  <p className="mt-2 text-small text-scheme-text/85">{coach.oneLiner}</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {footer && (
        <div className="mt-14 w-full max-w-md md:mt-20 lg:mt-24">
          <h3 className="mb-3 text-h4 font-medium md:mb-4">{footer.heading}</h3>
          <p className="text-medium">{footer.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
            <Button {...footer.button}>{footer.button.title}</Button>
          </div>
        </div>
      )}
    </div>
  </section>
);
