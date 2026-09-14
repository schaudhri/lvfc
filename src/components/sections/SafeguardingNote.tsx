import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { cta } from "@/data/cta";

/**
 * One ruled line pointing at the safeguarding policy.
 *
 * The full "Every child's safety comes first" photo block lives on the home
 * page. It used to be repeated, near word for word, on About and Coaching too,
 * which read as template rather than conviction. Those pages carry this line
 * instead: the same facts, and the same two routes, without the repetition.
 */
export const SafeguardingNote = () => (
  <section className="px-[5%]">
    <div className="container">
      <div className="flex flex-col gap-5 border-y border-scheme-border/30 py-8 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="max-w-[40rem] text-medium">
          <strong className="font-semibold">Every child's safety comes first.</strong> Our
          safeguarding policy is published in full, and every coach completes annual safeguarding
          training and background verification.
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to={cta.safeguarding.url}
            className="inline-flex min-h-6 items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            Read the policy
            <ChevronRight className="size-5 text-scheme-text" />
          </Link>
          <Link
            to={cta.reportConcern.url}
            className="inline-flex min-h-6 items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            {cta.reportConcern.title}
            <ChevronRight className="size-5 text-scheme-text" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
