import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { Header62 } from "@/components/sections/Header62";
import { Badge } from "@/components/ui/badge";
import { launchPosts, contentFramework } from "@/data/blog";
import { cardMedia, cardBody } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos } from "@/data/clubPhotos";

export const Blog = () => {
  useDocumentMeta(
    "Blog",
    "Club news, match reports and coaching insight from across the four LVFC branches.",
  );
  return (
    <>
      <Header54
        heading="Club news & coaching insight"
        description="Match reports, coaching articles, club announcements and season updates from across the four branches."
        image={{ src: clubPhotos[5].src, alt: "LVFC match day" }}
      />

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-4 text-h3 font-bold">Coming with the new season</h2>
            <p className="text-medium">
              The first articles going live alongside the 2026–27 season. Each is written and
              published by the club — we'll link them here as they land.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {launchPosts.map((post, index) => (
              <li key={post.slug} className={cn("flex flex-col", cardMedia)}>
                <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
                  <img
                    src={post.image?.src ?? clubPhotos[index % clubPhotos.length].src}
                    alt=""
                    className="aspect-[3/2] w-full object-cover"
                  />
                </Link>
                <div className={cn("flex flex-1 flex-col", cardBody)}>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <Badge>{post.category}</Badge>
                    {/* Only the unwritten ones still say "coming soon". */}
                    {!post.body?.length && (
                      <span className="text-small text-white/60">Coming soon</span>
                    )}
                  </div>
                  <h3 className="mb-2 text-h6 font-bold">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mb-3 text-white/80">{post.brief}</p>
                  {post.byline && (
                    <p className="text-small font-semibold text-white/60">{post.byline}</p>
                  )}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-auto flex min-h-6 items-center gap-2 pt-5 text-small font-semibold"
                  >
                    {post.body?.length ? "Read article" : "See what's coming"}
                    <ChevronRight className="size-4 text-white" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-scheme-border/20 px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-4 text-h3 font-bold">What we publish</h2>
            <p className="text-medium">
              The ongoing rhythm of the blog once the season is underway.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-y-16">
            {contentFramework.map((stream) => (
              <div key={stream.cadence}>
                <h3 className="mb-4 text-h6 font-bold">{stream.cadence}</h3>
                <ul className="flex flex-col gap-3">
                  {stream.items.map((item) => (
                    <li
                      key={item}
                      className="border-t border-scheme-border/20 pt-3 text-scheme-text/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Header62
        heading="Don't miss a fixture"
        description="Match reports, trial announcements and club news land here through the season. Get in touch and we'll keep you posted."
        buttons={[{ ...cta.bookASpot }, { ...cta.contact, variant: "secondary" }]}
      />
    </>
  );
};
