import { Header54 } from "@/components/sections/Header54";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";
import { ResourceDownloads } from "@/components/sections/ResourceDownloads";
import { Header62 } from "@/components/sections/Header62";
import { resourceLinks } from "@/data/resources";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos } from "@/data/clubPhotos";

const JUMP_LINKS = [
  { label: "For parents & players", href: "#parents" },
  { label: "For clubs & partners", href: "#clubs" },
  { label: "Forms", href: "#forms" },
  { label: "Coaching library", href: "#library" },
];

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

      <div className="border-y border-scheme-border/20 px-[5%] py-5">
        <div className="container flex flex-wrap items-center gap-2">
          {JUMP_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-brand-maroon px-4 py-2 text-small font-semibold transition-colors hover:bg-neutral-lightest"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <ResourceDownloads />

      <div id="library" className="scroll-mt-24 border-t border-scheme-border/20">
        <ResourceLibrary
          heading="Coaching library"
          description="Federations, coach education, safeguarding, analysis and advocacy — organised by topic. This is our first batch; many more are on the way, so bookmark the page and check back."
          categories={resourceLinks}
        />
      </div>

      <Header62
        heading="Something missing?"
        description="If there's a document or a resource you'd like to see here, tell us and we'll add it."
        buttons={[{ ...cta.contact }, { ...cta.safeguarding, variant: "secondary" }]}
      />
    </>
  );
};
