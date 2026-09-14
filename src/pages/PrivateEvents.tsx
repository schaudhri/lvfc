import { Header54 } from "@/components/sections/Header54";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/button";
import { enquiryUrl, privateEvents, privateEventsPage } from "@/data/privateEvents";
import { cardBody, cardMedia } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export const PrivateEvents = () => {
  useDocumentMeta(
    "Private sessions & birthdays",
    "Book an LVFC birthday party or a private coaching session in Lahore. Send an enquiry and we'll come back with dates and prices.",
  );
  return (
    <>
      <Header54
        heading={privateEventsPage.heading}
        description={privateEventsPage.summary}
        buttons={[
          { title: "Send an enquiry", url: `${privateEventsPage.url}#enquire`, variant: "alternate" },
        ]}
        image={privateEventsPage.image}
      />

      <section className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="mb-4 text-h3 font-medium">Two ways to book the pitch</h2>
            <p className="text-medium">
              Both are led by LVFC coaches, who all complete safeguarding training and background
              verification before working with children.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {privateEvents.map((event) => (
              <li key={event.type} className={cn("flex flex-col", cardMedia)}>
                <img
                  src={event.image.src}
                  alt={event.image.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className={cn("flex flex-1 flex-col md:p-8", cardBody)}>
                  <h3 className="mb-3 text-h5 font-medium">{event.title}</h3>
                  <p className="mb-5">{event.summary}</p>
                  <ul className="mb-8 flex flex-col gap-2 text-small">
                    {event.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button title={event.cta} url={enquiryUrl(event.type)} size="sm">
                      {event.cta}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactForm
        id="enquire"
        className="border-t border-scheme-border/20"
        heading="Send an enquiry"
        description="Tell us what you'd like to book, roughly when, and for how many children. We'll reply with availability and prices, usually within 24–48 hours."
        enquiryTypes={privateEvents.map((event) => ({ value: event.type, label: event.title }))}
        dateLabel="Preferred date"
        subject="Private event enquiry"
        submitLabel="Send enquiry"
      />
    </>
  );
};
