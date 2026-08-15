import { Header54 } from "@/components/sections/Header54";
import { Header62 } from "@/components/sections/Header62";
import { ScheduleGrid } from "@/components/sections/ScheduleGrid";
import { SeasonSchedule } from "@/components/sections/SeasonSchedule";
import { cta } from "@/data/cta";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { clubPhotos } from "@/data/clubPhotos";

export const Schedule = () => {
  useDocumentMeta(
    "Training schedule",
    "The 2026–27 season timetable across all four LVFC branches. Filter by branch or day to find the sessions that fit around your week.",
  );

  return (
    <>
      <Header54
        heading="Training schedule"
        description="Every programme across the 2026–27 season — when it runs, where, and on which evenings, all on one page."
        image={{ src: clubPhotos[9].src, alt: "LVFC training session in progress" }}
      />

      {/* The week first — the at-a-glance answer — then the season broken out
          programme by programme underneath for the longer view.

          No heading or description here: the page hero directly above already
          says "Training schedule" and what the page covers, so repeating it
          above the table was the same information twice. */}
      <ScheduleGrid buttons={[{ ...cta.bookASpot }]} />

      <SeasonSchedule className="border-t border-scheme-border/20" />

      <Header62
        heading="Not sure which session suits your child?"
        description="Tell us their age and your nearest branch, and we'll point you to the right group."
        buttons={[{ ...cta.contact }, { ...cta.programmes, variant: "secondary" }]}
      />
    </>
  );
};
