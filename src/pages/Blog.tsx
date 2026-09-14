import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Header54 } from "@/components/sections/Header54";
import { Header62 } from "@/components/sections/Header62";
import { Badge } from "@/components/ui/badge";
import { launchPosts } from "@/data/blog";
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
            <h2 className="mb-5 text-h3 font-medium md:mb-6">Coming with the new season</h2>
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
                      <span className="text-small text-scheme-text/60">Coming soon</span>
                    )}
                  </div>
                  <h3 className="mb-2 text-h6 font-medium">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mb-3 text-scheme-text/70">{post.brief}</p>
                  {post.byline && (
                    <p className="text-small font-semibold text-scheme-text/60">{post.byline}</p>
                  )}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-auto flex min-h-6 items-center gap-2 pt-5 text-small font-semibold text-brand-terracotta"
                  >
                    {post.body?.length ? "Read article" : "Learn more"}
                    <ChevronRight className="size-4 text-brand-terracotta" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Header62
        heading="Don't miss a fixture"
        description="Match reports, trial announcements and club news land here through the season. Get in touch and we'll keep you posted."
        button={cta.bookASpot}
      />
    </>
  );
};
