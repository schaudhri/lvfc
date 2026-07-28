/**
 * Named club leadership, transcribed from the client documents.
 *
 * Roles are quoted from the source; no coaching licences are attributed to any
 * individual because the documents never do. The content pack says only that
 * "all LVFC head coaches have an extensive training and qualifications" — that
 * is a club-level statement, not a per-person credential.
 *
 * TODO: individual branch coach bios and headshots were described as "drafted
 * or ready" in the 5 July planning meeting but have not been supplied. Add them
 * here as a separate `coaches` export once received.
 */

export type Person = {
  name: string;
  role: string;
  /** Secondary role held by the same person, where the documents name one. */
  alsoRole?: string;
  description: string;
};

export const leadership: Person[] = [
  {
    name: "Hamza Syed",
    role: "Chief Executive Officer",
    description:
      "Leads Virgil Sports and the club's long-term direction — professionalising youth football in Pakistan through a UEFA-aligned curriculum and a structured player pathway.",
  },
  {
    name: "Steve Hamilton",
    role: "Director of Football",
    alsoRole: "Designated Safeguarding Lead",
    description:
      "Oversees the curriculum and coaching standards across all four branches, directs the Competitive Training Programme, and serves as the club's Designated Safeguarding Lead.",
  },
  {
    name: "Abdul Rehman",
    role: "Club Welfare Officer",
    alsoRole: "Director, DHA Phase V",
    description:
      "The first point of contact for any safeguarding concern, allegation or disclosure, and responsible for safer recruitment checks and safeguarding training across the club.",
  },
  {
    name: "Sarmad Hussain",
    role: "Director of Operations",
    description:
      "Runs day-to-day club operations across the four branches, from registration and scheduling through to branch administration.",
  },
  {
    name: "Zain Shoukat",
    role: "President of Leagues",
    description:
      "Directs the club's competition structure — the ELJPL and LJPL youth leagues and the Virgil Sports National League — and handles club league registration enquiries.",
  },
];
