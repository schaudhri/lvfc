import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { ceoLetter } from "@/data/ceoLetter";

/**
 * The CEO's letter, in full.
 *
 * It used to be a teaser with a "Read the full letter" button; the client
 * asked for the whole letter on the page instead. The portrait and byline
 * stay in view beside the text on desktop (sticky), and sit above it on
 * mobile. The letter column is held to a reading measure rather than the
 * full container width.
 */
export const CeoLetter = () => {
  const { author, paragraphs } = ceoLetter;
  return (
    <section id="letter" className="scroll-mt-10 px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-10 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:gap-x-12 lg:gap-x-20">
        <aside className="md:sticky md:top-28 md:self-start">
          <img
            src={author.image.src}
            alt={author.image.alt}
            className="aspect-[4/5] w-full max-w-[16rem] rounded-image object-cover md:max-w-[none]"
          />
          <p className="mt-5 text-h6 font-medium text-brand-terracotta">{author.name}</p>
          <p className="text-small text-scheme-text/70">{author.role}</p>
        </aside>

        <article className="max-w-[42rem]">
          <h2 className="mb-8 text-h3 font-medium md:mb-10">A letter from our CEO</h2>
          <div className="flex flex-col gap-5 text-medium">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <footer className="mt-10 border-t border-scheme-border/20 pt-6">
            <p className="font-bold text-brand-terracotta">{author.name}</p>
            <p className="text-small text-scheme-text/70">{author.role}</p>
          </footer>

          <Link
            to="/about#team"
            className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-terracotta underline-offset-4 hover:underline lg:min-h-0"
          >
            Meet the team
            <ChevronRight className="size-5 text-brand-terracotta transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </article>
      </div>
    </section>
  );
};
