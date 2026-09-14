import { Link } from "react-router-dom";
import { ChevronRight } from "relume-icons";
import { Button } from "@/components/ui/button";
import { cta } from "@/data/cta";

const body =
  "Our safeguarding policy is published in full, and every coach completes annual safeguarding training and background verification.";

/**
 * The safeguarding pointer for pages other than home.
 *
 * The full "Every child's safety comes first" photo block lives on the home
 * page. It used to be repeated, near word for word, on About and Coaching too,
 * which read as template rather than conviction. Those pages carry this
 * instead: the same facts, and the same two routes, without the repetition.
 *
 * `rule` is one ruled line (Coaching). `card` is a white panel with its own
 * heading and a button (About, under International partners — client request,
 * 14 Sept 2026), where it needs to read as a section, not a footnote.
 */
export const SafeguardingNote = ({ variant = "rule" }: { variant?: "rule" | "card" }) => {
  const reportLink = (
    <Link
      to={cta.reportConcern.url}
      className="inline-flex min-h-6 items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
    >
      {cta.reportConcern.title}
      <ChevronRight className="size-5 text-scheme-text" />
    </Link>
  );

  if (variant === "card") {
    return (
      <section className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">
          <div className="flex flex-col gap-6 rounded-card bg-white p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <div className="max-w-[40rem]">
              <h2 className="mb-3 text-h4 font-medium">Every child's safety comes first</h2>
              <p className="text-medium text-scheme-text/85">{body}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
              <Button {...cta.safeguarding} variant="secondary">
                {cta.safeguarding.title}
              </Button>
              {reportLink}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[5%]">
      <div className="container">
        <div className="flex flex-col gap-5 border-y border-scheme-border/30 py-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <p className="max-w-[40rem] text-medium">
            <strong className="font-semibold">Every child's safety comes first.</strong> {body}
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to={cta.safeguarding.url}
              className="inline-flex min-h-6 items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
            >
              Read the policy
              <ChevronRight className="size-5 text-scheme-text" />
            </Link>
            {reportLink}
          </div>
        </div>
      </div>
    </section>
  );
};
