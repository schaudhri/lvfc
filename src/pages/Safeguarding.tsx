import { Header54 } from "@/components/sections/Header54";
import { Button } from "@/components/ui/button";
import { safeguardingContacts } from "@/data/club";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import {
  safeguardingMeta,
  safeguardingPolicy,
  relatedDocuments,
  type PolicyBlock,
} from "@/data/safeguarding";
import { clubPhotos } from "@/data/clubPhotos";

const Block = ({ block }: { block: PolicyBlock }) => {
  switch (block.type) {
    case "para":
      return <p className="max-w-[42rem]">{block.text}</p>;
    case "subhead":
      return <h3 className="mt-4 text-h6 font-medium">{block.text}</h3>;
    case "list":
      return (
        <ul className="flex max-w-[42rem] list-disc flex-col gap-2 pl-5">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="w-full overflow-x-auto rounded-card border border-scheme-border/30 bg-white">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="bg-brand-terracotta">
                {block.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-5 py-3 text-small font-bold text-white"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={index} className="border-t border-scheme-border/20 align-top">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-5 py-3 text-small ${cellIndex === 0 ? "font-semibold" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
};

export const Safeguarding = () => {
  useDocumentMeta(
    "Safeguarding",
    "Our full Safeguarding Children and Young People Policy, reviewed annually, with the route for raising a concern.",
  );
  return (
    <>
      <Header54
        heading="Safeguarding at LVFC"
        description="The safety and wellbeing of every child at LVFC is our highest priority. This is our full Safeguarding Children and Young People Policy, reviewed annually and published in full."
        image={{ src: clubPhotos[11].src, alt: "LVFC coaches supervising a training session" }}
      />

      {/* Reporting route sits above the policy — someone with a live concern
          should not have to read a governance document to find the phone number. */}
      <section
        id="raising-a-concern"
        className="scroll-mt-24 border-y border-scheme-border/20 bg-neutral-lightest px-[5%] py-10"
      >
        <div className="container">
          <h2 className="mb-3 text-h5 font-medium">Raising a concern</h2>
          <p className="mb-5 max-w-[42rem]">
            If a child is in immediate danger or needs urgent medical attention, call emergency
            services first, then tell the Club Welfare Officer. For any other safeguarding concern,
            contact the Club Welfare Officer without delay — it is not your responsibility to decide
            whether abuse has occurred, only to report it.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={`mailto:${safeguardingContacts.welfareEmail}`}
              className="inline-flex min-h-6 items-center font-semibold underline underline-offset-2"
            >
              {safeguardingContacts.welfareEmail}
            </a>
            <a
              href={`tel:${safeguardingContacts.welfarePhone.replace(/\s/g, "")}`}
              className="inline-flex min-h-6 items-center font-semibold underline underline-offset-2"
            >
              {safeguardingContacts.welfarePhone}
            </a>
          </div>
        </div>
      </section>

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: "Implemented", value: safeguardingMeta.implemented },
              { term: "Next review", value: safeguardingMeta.nextReview },
              {
                term: "Designated Safeguarding Lead",
                value: safeguardingMeta.designatedSafeguardingLead,
              },
              { term: "Club Welfare Officer", value: safeguardingMeta.clubWelfareOfficer },
            ].map((item) => (
              <div key={item.term} className="border-t border-scheme-border pt-4">
                <dt className="mb-1 text-tiny font-semibold uppercase tracking-wider text-scheme-text/60">
                  {item.term}
                </dt>
                <dd className="font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Policy contents" className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-4 text-tiny font-semibold uppercase tracking-wider text-scheme-text/60">
              Contents
            </h2>
            <ol className="flex flex-col gap-2">
              {safeguardingPolicy.map((section) => (
                <li key={section.number}>
                  <a
                    href={`#section-${section.number}`}
                    className="inline-flex min-h-6 items-center text-small text-scheme-text/70 transition-colors hover:text-scheme-text"
                  >
                    {section.number}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12">
            {safeguardingPolicy.map((section) => (
              <section
                key={section.number}
                id={`section-${section.number}`}
                className="scroll-mt-24"
              >
                <h2 className="mb-5 border-b border-scheme-border/20 pb-3 text-h4 font-medium">
                  <span className="mr-3 text-scheme-text/60">{section.number}</span>
                  {section.title}
                </h2>
                <div className="flex flex-col gap-4">
                  {section.blocks.map((block, index) => (
                    <Block key={index} block={block} />
                  ))}
                </div>
              </section>
            ))}

            <section className="scroll-mt-24">
              <h2 className="mb-5 border-b border-scheme-border/20 pb-3 text-h4 font-medium">
                Related documents
              </h2>
              <ul className="flex max-w-[42rem] list-disc flex-col gap-2 pl-5">
                {relatedDocuments.map((document) => (
                  <li key={document}>{document}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button {...cta.resources} variant="secondary">{cta.resources.title}</Button>
                <Button {...cta.contact} variant="secondary">{cta.contact.title}</Button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};
