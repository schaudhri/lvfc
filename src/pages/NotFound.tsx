import { Header62 } from "@/components/sections/Header62";
import { Button } from "@/components/ui/button";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

/**
 * Catch-all for unknown paths.
 *
 * Without this, React Router matched nothing and rendered the layout with an
 * empty `<main>` — a mistyped or stale URL gave a blank white page with no nav
 * and no footer, and no way back.
 */
export const NotFound = () => {
  useDocumentMeta("Page not found", "That page doesn't exist. Find your way back to LVFC.");

  return (
    <>
      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-lg text-center">
          <p className="mb-4 text-tiny font-semibold uppercase tracking-wider text-scheme-text/60">
            404
          </p>
          <h1 className="mb-5 text-h1 font-medium md:mb-6">We can't find that page</h1>
          <p className="mb-6 text-medium md:mb-8">
            It may have moved, or the link may be out of date. Here's the way back.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* `title` is stripped by Button (it would render a native
                tooltip), so the label has to be passed as children. */}
            <Button {...cta.programmes}>{cta.programmes.title}</Button>
            <Button {...cta.contact} variant="secondary">
              {cta.contact.title}
            </Button>
          </div>
        </div>
      </section>

      <Header62
        heading="Looking for something specific?"
        description="Tell us what you were after and we'll point you at it."
        button={cta.contact}
      />
    </>
  );
};
