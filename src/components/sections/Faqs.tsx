"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { KeyboardArrowDown } from "relume-icons";
import { Button, type ButtonProps } from "@/components/ui/button";

type QuestionProps = {
  question: string;
  answer: string;
};

/** A titled group of questions — used for the full FAQ, which is too long to read flat. */
type CategoryProps = {
  id: string;
  title: string;
  questions: QuestionProps[];
};

type FooterProps = {
  heading: string;
  description: string;
  button: ButtonProps;
};

type Props = {
  heading: string;
  description: string;
  questions: QuestionProps[];
  /** When set, takes precedence over `questions` and renders grouped by category. */
  categories?: CategoryProps[];
  /** A button directly under the description, with no card around it (home page). */
  button?: ButtonProps;
  /** A "still have questions" card under the description. Omit it to show none. */
  footer?: FooterProps;
};

export type FaqsProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Faqs = (props: FaqsProps) => {
  const { heading, description, questions, categories, button, footer } = {
    ...FaqsDefaults,
    ...props,
  };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[1fr_1.5fr] lg:gap-x-20">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="mb-5 text-h2 font-medium md:mb-6">{heading}</h2>
          <p className="mb-6 text-medium md:mb-8">{description}</p>
          {categories && (
            <nav aria-label="FAQ categories" className="mb-6 flex flex-wrap gap-2 md:mb-8">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="rounded-full border border-scheme-border/40 px-3 py-1.5 text-small font-semibold transition-colors hover:bg-neutral-lightest"
                >
                  {category.title}
                </a>
              ))}
            </nav>
          )}
          {button && <Button {...button}>{button.title}</Button>}
          {footer && (
            <div className="rounded-card bg-neutral-lightest p-6">
              <h3 className="mb-2 text-h6 font-medium">{footer.heading}</h3>
              <p className="mb-5">{footer.description}</p>
              <Button {...footer.button}>{footer.button.title}</Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-10">
          {categories
            ? categories.map((category) => (
                <div key={category.id} id={category.id} className="scroll-mt-24">
                  <h3 className="mb-2 font-sans text-h5 font-medium">{category.title}</h3>
                  <div className="flex flex-col">
                    {category.questions.map((item, index) => (
                      <QuestionItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              ))
            : questions.map((item, index) => <QuestionItem key={index} item={item} />)}
        </div>
      </div>
    </section>
  );
};

const QuestionItem = ({ item }: { item: QuestionProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Links the trigger to the panel it reveals, so assistive tech can associate
  // the two. Without this a screen reader announces an expandable control but
  // cannot say what it controls.
  const panelId = useId();
  return (
    <div className="border-b border-scheme-border">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left md:py-6"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {/* Questions set in Tiller, like the other titles (Figma
            "lvfc-website" home, node 19:5007). */}
        <span className="font-heading text-large font-medium">{item.question}</span>
        <motion.span
          className="shrink-0"
          variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        >
          <KeyboardArrowDown className="size-8 text-scheme-text" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FaqsDefaults: Props = {
  heading: "FAQs",
  description: "Everything parents ask before their child's first session at LVFC.",
  questions: [
    {
      question: "What ages do you coach?",
      answer:
        "Every stage from age 2 through 18, banded by age and ability — from first touches to the youth-development squads.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Fees vary by programme and age group, and a one-time registration fee applies at enrolment. Contact your nearest branch or visit our booking portal for the latest fee structure.",
    },
    {
      question: "Where are your branches?",
      answer:
        "We train across four Lahore locations: Gulberg, DHA Phase V, DHA Phase VIII and Pine Avenue. Pick the one nearest you when you register.",
    },
    {
      question: "Are your coaches qualified?",
      answer:
        "All LVFC head coaches have extensive training and qualifications, with support coaches trained to national standards. Everyone working with children completes safeguarding training annually and undergoes background verification before they start.",
    },
    {
      question: "How does my child get started?",
      answer:
        "Choose a programme, pick your branch and register — we'll confirm your first session. You're welcome to come and watch a session first.",
    },
  ],
};
