import { Header54 } from "@/components/sections/Header54";
import { Faqs as FaqsSection } from "@/components/sections/Faqs";
import { faqCategories } from "@/data/faqs";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const IMG = "/placeholder-image.svg";

export const Faqs = () => {
  useDocumentMeta(
    "FAQs",
    "Fees, kit, attendance, refunds and safeguarding — everything parents ask before their child's first session at LVFC.",
  );
  return (
    <>
      <Header54
        heading="Frequently asked questions"
        description="Fees, kit, attendance, refunds, safeguarding and everything else parents ask before their child's first session."
        image={{ src: IMG, alt: "LVFC players at training" }}
      />

      <FaqsSection
        heading="Everything you asked"
        description="Grouped by topic — jump to the section you need."
        categories={faqCategories}
        footer={{
          heading: "Still have questions?",
          description:
            "Get in touch and we'll help you find the right programme and branch for your child.",
          button: { ...cta.contact, variant: "secondary" },
        }}
      />
    </>
  );
};
