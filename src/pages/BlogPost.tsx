import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Header62 } from "@/components/sections/Header62";
import { RichText } from "@/components/RichText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost, launchPosts } from "@/data/blog";
import { cardMedia, cardBody } from "@/lib/surface";
import { cta } from "@/data/cta";
import { cn } from "@/lib/utils";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos } from "@/data/clubPhotos";

/**
 * A single article.
 *
 * The template is complete — hero, meta row, standfirst, prose body, byline and
 * related reading — but the club has not written the articles yet. The content
 * pack gives a commissioning brief for each of the launch posts, not the copy,
 * so a post without a `body` renders its brief plus an explicit "still being
 * written" state rather than inventing club news. Write the body in the Studio
 * and the same page becomes the published article.
 */
export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useDocumentMeta(post?.title ?? "Blog", post?.brief ?? "Club news and coaching insight from LVFC.");

  // Unknown slug — back to the index rather than an empty article.
  if (!post) return <Navigate to="/blog" replace />;

  const related = launchPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const isPublished = Boolean(post.body?.length);

  return (
    <>
      <article>
        <header className="px-[5%] pt-16 md:pt-24 lg:pt-28">
          <div className="container max-w-[48rem]">
            {/* No "← Back to all articles": no other page has a back pattern
                (client request, 15 Sept 2026) — Blog is in the nav. */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge>{post.category}</Badge>
              {!isPublished && (
                <span className="text-small text-scheme-text/60">Coming soon</span>
              )}
            </div>
            <h1 className="mb-5 text-h1 font-medium md:mb-6">{post.title}</h1>
            <p className="text-medium text-scheme-text/70">{post.brief}</p>
            {post.byline && (
              <p className="mt-6 text-small font-semibold">By {post.byline}</p>
            )}
          </div>
        </header>

        <div className="px-[5%] py-12 md:py-16">
          <div className="container max-w-[48rem]">
            <img
              src={post.image?.src ?? clubPhotos[post.slug.length % clubPhotos.length].src}
              alt={post.image?.alt ?? ""}
              /** A real photo, but not necessarily this post's — decorative until one is. */
              aria-hidden={post.image ? undefined : "true"}
              className="aspect-[3/2] w-full rounded-image object-cover"
            />
          </div>
        </div>

        <div className="px-[5%] pb-16 md:pb-24 lg:pb-28">
          <div className="container max-w-[48rem]">
            {isPublished ? (
              <RichText value={post.body!} />
            ) : (
              <div className={cn("flex flex-col items-start p-6 md:p-8", "rounded-card bg-neutral-lightest")}>
                <h2 className="mb-3 text-h5 font-medium">This one's still being written</h2>
                <p className="mb-6 text-medium">
                  It's part of the line-up going live alongside the 2026–27 season. We'll publish it
                  here as soon as it's ready — in the meantime, the summary above is what it will
                  cover.
                </p>
                <Button {...cta.contact} variant="secondary">
                  {cta.contact.title}
                </Button>
              </div>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-[5%] py-16 md:py-24 lg:py-28">
          <div className="container">
            <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
              <h2 className="mb-5 text-h3 font-medium md:mb-6">More from the club</h2>
              <p className="text-medium">The rest of the launch line-up.</p>
            </div>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
              {related.map((item, index) => (
                <li key={item.slug} className={cn("flex flex-col", cardMedia)}>
                  <Link to={`/blog/${item.slug}`} aria-label={item.title}>
                    <img
                      src={item.image?.src ?? clubPhotos[index % clubPhotos.length].src}
                      alt=""
                      aria-hidden="true"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </Link>
                  <div className={cn("flex flex-1 flex-col", cardBody)}>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <Badge>{item.category}</Badge>
                    </div>
                    <h3 className="mb-2 text-h6 font-medium">
                      <Link to={`/blog/${item.slug}`} className="hover:underline">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mb-3 text-small text-scheme-text/70">{item.brief}</p>
                    <Link
                      to={`/blog/${item.slug}`}
                      className="mt-auto flex min-h-6 items-center gap-2 pt-2 text-small font-semibold text-brand-terracotta"
                    >
                      {item.body?.length ? "Read article" : "Learn more"}
                      <ChevronRight className="size-4 text-brand-terracotta" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Header62
        heading="Don't miss a fixture"
        description="Club news, match reports and trial announcements — straight from the four branches."
        button={cta.bookASpot}
      />
    </>
  );
};
