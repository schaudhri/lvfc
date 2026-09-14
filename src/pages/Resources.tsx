import { Header54 } from "@/components/sections/Header54";
import { ResourceLibrary, libraryCategoryId } from "@/components/sections/ResourceLibrary";
import { ResourceDownloads } from "@/components/sections/ResourceDownloads";
import { Header62 } from "@/components/sections/Header62";
import { resourceGroups, resourceLinks } from "@/data/resources";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos } from "@/data/clubPhotos";

const navLinkClass =
  "inline-flex min-h-6 items-center text-small text-scheme-text/70 transition-colors hover:text-scheme-text";

/**
 * Contents rail, mirroring the Safeguarding page, so visitors can jump between
 * the library topics and the document groups.
 *
 * The coaching library leads: it is complete, while most club documents are
 * still being finalised. Opening on a list of "coming soon" rows made the
 * whole page look unfinished.
 */
const ContentsNav = () => (
  <nav aria-label="Resources contents" className="lg:sticky lg:top-24 lg:self-start">
    <h2 className="mb-4 text-tiny font-semibold uppercase tracking-wider text-scheme-text/60">
      Contents
    </h2>
    <ul className="flex flex-col gap-5">
      <li>
        <a href="#library" className={`${navLinkClass} font-semibold text-scheme-text`}>
          Coaching library
        </a>
        <ul className="mt-1 flex flex-col gap-1 border-l border-scheme-border/20 pl-3">
          {resourceLinks.map((category) => (
            <li key={category.title}>
              <a href={`#${libraryCategoryId(category.title)}`} className={navLinkClass}>
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <a href="#documents" className={`${navLinkClass} font-semibold text-scheme-text`}>
          Documents & forms
        </a>
        <ul className="mt-1 flex flex-col gap-1 border-l border-scheme-border/20 pl-3">
          {resourceGroups.map((group) => (
            <li key={group.id}>
              <a href={`#${group.id}`} className={navLinkClass}>
                {group.title}
              </a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  </nav>
);

export const Resources = () => {
  useDocumentMeta(
    "Resources",
    "Club policies, registration forms and a growing library of coaching material for coaches, players, parents and referees.",
  );
  return (
    <>
      <Header54
        heading="Resources"
        description="Club documents, registration forms and a growing library of coaching material for everyone around the club — coaches, players, parents and referees. We've searched the globe for the most current, credible information the game has to offer, and we're adding to it every week."
        image={{ src: clubPhotos[10].src, alt: "LVFC resource centre" }}
      />

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <ContentsNav />

          <div>
            <div id="library" className="scroll-mt-24">
              <ResourceLibrary
                embedded
                heading="Coaching library"
                description="Federations, coach education, safeguarding, analysis and advocacy — organised by topic. This is our first batch; many more are on the way, so bookmark the page and check back."
                categories={resourceLinks}
              />
            </div>

            <div id="documents" className="mt-16 scroll-mt-24 md:mt-20">
              <ResourceDownloads embedded />
            </div>
          </div>
        </div>
      </section>

      <Header62
        heading="Something missing?"
        description="If there's a document or a resource you'd like to see here, tell us and we'll add it."
        button={cta.contact}
      />
    </>
  );
};
