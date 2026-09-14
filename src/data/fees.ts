import { stageFor, type Programme } from "@/data/programmes";

/**
 * Academy fees, from the club's own FAQ ("How is your booking fee
 * structured?", Sept 2026).
 *
 * They apply to the five pathway age groups — the academy that trains three
 * evenings a week. Weekend mornings, competitive squads, trials and summer
 * leagues have no published fee yet, so they show none rather than a guess.
 * Change a figure here and every card, row and programme page follows.
 */
export const academyFees = {
  monthly: 8000,
  /** Charged per session attended when joining between the 6th and 15th. */
  perSession: 700,
  /** Charged for the month when joining after the 15th. */
  halfMonth: 4000,
  sessionsPerWeek: 3,
  siblingDiscounts: { two: "10%", threeOrMore: "12.5%" },
};

/**
 * What the monthly fee covers, from the content pack of 1 Aug 2026 ("What's
 * included"). Shown inside the Fees block rather than on each programme page
 * (client decision, 14 Sept 2026) — it explains the price.
 */
export const includedInFee = [
  "3 sessions a week",
  "A UEFA-qualified Director of Coaching",
  "Monthly player progress reports",
  "Kit and training materials (seasonal)",
  "Access to LVFC competitive squad trials",
  "Access to league fixtures",
];

export const formatPkr =(amount: number) => `PKR ${amount.toLocaleString("en-US")}`;

/** "PKR 8,000 / month" for a pathway programme; undefined where no fee is published. */
export const programmeFee = (programme: Programme) =>
  stageFor(programme) ? `${formatPkr(academyFees.monthly)} / month` : undefined;
