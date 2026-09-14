"use client";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { branches } from "@/data/locations";
import { club } from "@/data/club";
import { cn } from "@/lib/utils";

type EnquiryType = { value: string; label: string };

type Props = {
  heading: string;
  description: string;
  /**
   * Adds a required "What would you like to book?" choice. It is preselected
   * from `?type=` in the URL, so a "Book a birthday party" button elsewhere
   * lands on the form with that answer already filled in.
   */
  enquiryTypes?: EnquiryType[];
  /** Adds an optional date field with this label. */
  dateLabel?: string;
  /** Mail subject line; the sender's name is appended. */
  subject: string;
  submitLabel: string;
};

export type ContactFormProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const field = "w-full rounded-form border border-scheme-border bg-white px-3 py-2 text-regular transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-darkest focus-visible:ring-offset-2";
const labelStyle = "mb-2 block text-small font-semibold";

/**
 * The enquiry form.
 *
 * NO BACKEND EXISTS. Rather than POST into the void — or, worse, render a form
 * that silently drops what a parent types — submitting composes a mail to the
 * club with the answers laid out in the body. The parent's own mail client
 * sends it, so nothing leaves their machine until they press send, and no
 * personal data touches a server we haven't built.
 *
 * That also side-steps the privacy problem: the site collects nothing, so it
 * needs no privacy statement to be lawful today. See the TODO in `data/site.tsx`
 * — a real endpoint DOES need one, along with a published policy, before it
 * can take a child's details.
 *
 * TODO: when an endpoint exists, replace `handleSubmit` with a fetch and add
 * the consent checkbox + privacy link. The markup below won't need to change.
 */
export const ContactForm = (props: ContactFormProps) => {
  const {
    heading = "Send us a message",
    description = "Tell us a little about your child and we'll point you to the right group. We usually reply within 24–48 hours.",
    enquiryTypes,
    dateLabel,
    subject = "Website enquiry",
    submitLabel = "Send message",
    id,
    className,
  } = props;

  const [sent, setSent] = useState(false);
  const [searchParams] = useSearchParams();
  const requestedType =
    enquiryTypes?.find((type) => type.value === searchParams.get("type"))?.value ?? "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const enquiry = enquiryTypes?.find((type) => type.value === get("enquiry"))?.label;

    const lines = [
      enquiry && `Enquiry: ${enquiry}`,
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone: ${get("phone")}`,
      get("childAge") && `Child's age: ${get("childAge")}`,
      get("date") && `${dateLabel}: ${get("date")}`,
      get("branch") && `Preferred branch: ${get("branch")}`,
      "",
      get("message"),
    ].filter(Boolean);

    const mailSubject = encodeURIComponent(`${subject} — ${get("name")}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${club.email}?subject=${mailSubject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id={id} className={cn("scroll-mt-10 px-[5%] py-16 md:py-24 lg:py-28", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-x-20">
          <div>
            <h2 className="mb-4 text-h2 font-medium md:mb-5">{heading}</h2>
            <p className="text-medium">{description}</p>
            <p className="mt-5 text-small text-scheme-text/70">
              Sending opens your email app with the details filled in, so nothing is stored on this
              site. Prefer to talk? Use WhatsApp or the numbers above.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {(enquiryTypes || dateLabel) && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {enquiryTypes && (
                  <div>
                    <label htmlFor="cf-enquiry" className={labelStyle}>
                      What would you like to book? <span aria-hidden="true">*</span>
                    </label>
                    {/* Keyed on the URL's choice so a second "Book a…" click
                        on the same page re-selects rather than keeping the
                        first answer. */}
                    <select
                      key={requestedType}
                      id="cf-enquiry"
                      name="enquiry"
                      required
                      defaultValue={requestedType}
                      className={cn(field, "min-h-11")}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {enquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {dateLabel && (
                  <div>
                    <label htmlFor="cf-date" className={labelStyle}>
                      {dateLabel} <span className="font-normal text-scheme-text/60">(optional)</span>
                    </label>
                    <Input id="cf-date" name="date" type="date" />
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name" className={labelStyle}>
                  Your name <span aria-hidden="true">*</span>
                </label>
                <Input id="cf-name" name="name" required autoComplete="name" />
              </div>
              <div>
                <label htmlFor="cf-email" className={labelStyle}>
                  Email <span aria-hidden="true">*</span>
                </label>
                <Input id="cf-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div>
                <label htmlFor="cf-phone" className={labelStyle}>
                  Phone <span className="font-normal text-scheme-text/60">(optional)</span>
                </label>
                <Input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div>
                <label htmlFor="cf-age" className={labelStyle}>
                  Child's age <span className="font-normal text-scheme-text/60">(optional)</span>
                </label>
                <Input id="cf-age" name="childAge" inputMode="numeric" />
              </div>
            </div>

            <div>
              <label htmlFor="cf-branch" className={labelStyle}>
                Nearest branch <span className="font-normal text-scheme-text/60">(optional)</span>
              </label>
              <select id="cf-branch" name="branch" defaultValue="" className={cn(field, "min-h-11")}>
                <option value="">No preference</option>
                {branches.map((branch) => (
                  <option key={branch.slug} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cf-message" className={labelStyle}>
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea id="cf-message" name="message" required rows={5} className={field} />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit">{submitLabel}</Button>
              {/* Confirms the hand-off actually happened — a mailto gives no
                  feedback of its own, so without this the button looks dead. */}
              <p aria-live="polite" className="text-small text-scheme-text/70">
                {sent ? "Your email app should have opened — press send there to reach us." : ""}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
