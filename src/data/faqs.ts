/**
 * The full FAQ, merged from content pack Section 4 and the standalone FAQ
 * document. Where the two sources answered the same question differently, the
 * more specific answer was kept.
 *
 * Edited in Sanity under "FAQs".
 */

import raw from "@/content/faqs.json";

export type Faq = {
  question: string;
  answer: string;
  /** Whether the question also appears in the home page's shortlist. */
  featuredOnLanding?: boolean;
  /** Position in that shortlist, which runs its own order. */
  landingOrder?: number;
};

export type FaqCategory = {
  id: string;
  title: string;
  questions: Faq[];
};

export const faqCategories = raw as FaqCategory[];

/**
 * The questions parents ask most — the shortlist shown on the landing page.
 *
 * Selected by a flag on each question rather than by matching question text,
 * which is how this used to work: rewording a question silently dropped it from
 * the home page, with nothing to catch it.
 */
export const landingFaqs: Faq[] = faqCategories
  .flatMap((category) => category.questions)
  .filter((faq) => faq.featuredOnLanding)
  .sort((a, b) => (a.landingOrder ?? Infinity) - (b.landingOrder ?? Infinity));
