/**
 * LVFC Safeguarding Children and Young People Policy.
 *
 * Transcribed from `docs/Safeguarding (1).docx`. This is a governance document
 * — the wording is the club's and should not be paraphrased or "improved" for
 * tone. Edits must come from the client.
 *
 * Section 12 is absent from the source document (it jumps from 11 to 13); the
 * numbering below matches the source rather than silently renumbering.
 */

export const safeguardingMeta = {
  title: "Safeguarding Children and Young People Policy",
  implemented: "March 2026",
  nextReview: "March 2027",
  reviewCadence: "Annual review required",
  policyOwner: "Club CEO and Directors",
  designatedSafeguardingLead: "Steve Hamilton, Director of Football",
  clubWelfareOfficer: "Abdul Rehman, Director of Phase V",
};

export type PolicyBlock =
  | { type: "para"; text: string }
  | { type: "list"; items: string[] }
  | { type: "subhead"; text: string }
  | { type: "table"; columns: string[]; rows: string[][] };

export type PolicySection = {
  number: string;
  title: string;
  blocks: PolicyBlock[];
};

export const safeguardingPolicy: PolicySection[] = [
  {
    number: "1",
    title: "Our commitment and policy statement",
    blocks: [
      {
        type: "para",
        text: "LVFC is fully committed to safeguarding and promoting the welfare of every child, young person, and adult at risk who is entrusted to our care. We believe that everyone involved in football has a duty to create a safe, positive, and inclusive environment that protects all participants from harm, abuse, and exploitation.",
      },
      {
        type: "para",
        text: "We endorse and adopt the principles of the Pakistan Football Federation (PFF), English FA Safeguarding Protocol, United States Youth Soccer Association Blueprint and the FIFA Guardians Child Safeguarding Toolkit, ensuring our practices align with the highest international standards.",
      },
      { type: "subhead", text: "Our core principles" },
      {
        type: "list",
        items: [
          "The child's welfare is paramount. The best interests of every child shall be the primary consideration in all decisions affecting them.",
          "All children have a right to protection from all forms of abuse, harassment, and exploitation, regardless of age, gender, disability, race, sexual orientation, faith, or belief.",
          "Safeguarding is everyone's responsibility. Every person involved with our club, from the Board to volunteers, has a duty to report concerns and contribute to a culture of vigilance and care.",
          "A zero-tolerance approach is applied to all forms of abuse, discrimination, bullying, and inappropriate behaviour.",
          "We will work in partnership with parents, guardians, relevant authorities, and the PFF to ensure effective safeguarding practices.",
        ],
      },
    ],
  },
  {
    number: "2",
    title: "Scope and application",
    blocks: [
      {
        type: "para",
        text: "This policy applies to all individuals and activities under the jurisdiction of LVFC, including but not limited to:",
      },
      {
        type: "list",
        items: [
          "All Board members, staff, and volunteers.",
          "All coaches, team managers, referees, and medical personnel.",
          "All registered players under the age of 18.",
          "All parents, guardians, and spectators attending club activities.",
          "All contractors and third-party service providers working on behalf of the club.",
        ],
      },
      {
        type: "para",
        text: "This policy applies to all club-related activities, including training sessions, matches, tournaments, travel, social events, and online interactions.",
      },
    ],
  },
  {
    number: "3",
    title: "Definitions of abuse and harm",
    blocks: [
      {
        type: "para",
        text: "All staff and volunteers must be vigilant to signs of the following categories of abuse, as defined by international safeguarding standards:",
      },
      {
        type: "table",
        columns: ["Category", "Description"],
        rows: [
          [
            "Physical abuse",
            "Physical harm or injury inflicted on a child, including hitting, slapping, punching, kicking, scalding, burning, or inappropriate restraint.",
          ],
          [
            "Sexual abuse",
            "Forcing or tricking a child into sexual activities. This can occur in person or online and can happen to any child regardless of gender or age.",
          ],
          [
            "Emotional / psychological abuse",
            "Continual emotional mistreatment, including deliberately scaring, humiliating, isolating, or ignoring a child.",
          ],
          [
            "Neglect",
            "Persistent failure to meet a child's basic physical or emotional needs, such as providing adequate food, shelter, clothing, medical care, or supervision.",
          ],
          [
            "Bullying and cyberbullying",
            "Behaviour that hurts someone else, including name-calling, spreading rumours, physical intimidation, or online harassment through social media, gaming, or messaging platforms.",
          ],
          [
            "Grooming",
            "Building a relationship and trust with a child to manipulate, exploit, and abuse them. Grooming can occur over a short or prolonged period and may involve befriending the child's family.",
          ],
          [
            "Child sexual exploitation (CSE)",
            "Exchanging gifts, money, status, or affection for sexual activities. Children may be tricked into believing they are in a consensual relationship.",
          ],
          [
            "Criminal exploitation",
            "Manipulating or coercing a child into committing crimes, including “county lines” drug trafficking.",
          ],
          [
            "Online abuse",
            "Any type of abuse that occurs on the internet, including inappropriate content, grooming, cyberbullying, or sharing of indecent images.",
          ],
        ],
      },
    ],
  },
  {
    number: "4",
    title: "Key roles and responsibilities",
    blocks: [
      { type: "subhead", text: "4.1 The club" },
      {
        type: "para",
        text: "The Director of Football has ultimate responsibility for ensuring that effective safeguarding policies and procedures are in place and properly resourced, and shall:",
      },
      {
        type: "list",
        items: [
          "Approve this policy and any subsequent amendments.",
          "Ensure adequate resources (budget, staff time, and training) are allocated to safeguarding.",
          "Review safeguarding data, incident reports, and lessons learned on a regular basis.",
          "Ensure safeguarding is a standing agenda item at meetings.",
          "Drive a culture of vigilance and action throughout the club.",
        ],
      },
      {
        type: "subhead",
        text: "4.2 Designated Safeguarding Lead (DSL) / Club Welfare Officer (CWO)",
      },
      {
        type: "para",
        text: "The DSL/CWO is the primary point of contact for all safeguarding concerns and holds the operational responsibility for implementing this policy. Responsibilities include:",
      },
      {
        type: "list",
        items: [
          "Receiving and recording all safeguarding concerns, allegations, and disclosures.",
          "Ensuring concerns are reported to the PFF Safeguarding Officer and, where appropriate, relevant authorities (police, child protection services) without delay.",
          "Leading on safeguarding investigations in coordination with the PFF and external agencies.",
          "Overseeing safer recruitment practices and ensuring all staff and volunteers have valid police/background checks and safeguarding training.",
          "Providing safeguarding awareness training and support to all club personnel, players, and parents.",
          "Making safeguarding information easily accessible on the club's website and at all club venues.",
        ],
      },
      { type: "subhead", text: "4.3 All staff, volunteers, and officials" },
      {
        type: "para",
        text: "All individuals involved with the club have a duty of care to safeguard children and young people. This includes:",
      },
      {
        type: "list",
        items: [
          "Being alert to signs of abuse or maltreatment and reporting concerns to the CWO without delay.",
          "Adhering to the club's Code of Conduct at all times.",
          "Completing mandatory safeguarding training.",
          "Complying with safer recruitment procedures, including police/background checks.",
          "Creating a positive, respectful, and inclusive environment free from discrimination and harassment.",
        ],
      },
    ],
  },
  {
    number: "5",
    title: "Safer recruitment practices",
    blocks: [
      {
        type: "para",
        text: "LVFC is committed to ensuring that all individuals working with children and young people are suitable and properly vetted. All recruitment practices shall follow a safer recruitment process:",
      },
      {
        type: "list",
        items: [
          "Role description: a clear role description is provided for each position, outlining duties and responsibilities.",
          "Application and interview: all candidates complete a standard application form and attend a formal interview.",
          "References: at least two references are taken up and verified prior to appointment.",
          "Background checks: all staff and volunteers in positions of trust must undergo a thorough background check, including police verification or an equivalent national-level criminal record check, as required by PFF regulations.",
          "Identity verification: government-issued photo identification is verified at interview.",
          "Barred list check: where applicable, checks are made against relevant barred lists for individuals who are prohibited from working with children.",
        ],
      },
    ],
  },
  {
    number: "6",
    title: "Mandatory training and education",
    blocks: [
      {
        type: "para",
        text: "To ensure everyone understands their safeguarding responsibilities, the club requires the following training:",
      },
      {
        type: "table",
        columns: ["Role", "Minimum training requirement", "Frequency"],
        rows: [
          [
            "All staff, volunteers, and officials",
            "Safeguarding awareness training (e.g. FIFA Guardians online course or equivalent)",
            "Annually",
          ],
          [
            "Designated Safeguarding Lead / CWO",
            "Specialist safeguarding training (PFF-approved or FIFA Guardians Diploma-level training)",
            "Annually plus ongoing CPD",
          ],
          [
            "Coaches and team managers",
            "Basic safeguarding awareness and safer coaching practices",
            "Annually",
          ],
          [
            "Club board members",
            "Safeguarding awareness training and responsibilities of governance",
            "Annually",
          ],
          ["All personnel", "Code of Conduct briefing", "Upon appointment and annually"],
        ],
      },
      {
        type: "para",
        text: "The club will maintain accurate training attendance records for all personnel.",
      },
    ],
  },
  {
    number: "7",
    title: "Reporting procedures: responding to concerns",
    blocks: [
      { type: "subhead", text: "7.1 Immediate action (emergency)" },
      {
        type: "para",
        text: "If a child is in immediate danger or requires urgent medical attention, call emergency services (police/ambulance) immediately, then report the situation to the Club Welfare Officer without delay.",
      },
      { type: "subhead", text: "7.2 Reporting a concern" },
      {
        type: "para",
        text: "If you have a safeguarding concern, suspicion, or receive a disclosure from a child, you must act. It is not your responsibility to investigate or decide if abuse has occurred, but it is your responsibility to report it.",
      },
      {
        type: "list",
        items: [
          "Report immediately to the Club Welfare Officer (CWO).",
          "If the CWO is unavailable, or if the concern is about the CWO, report directly to the Branch Manager of the training site in question.",
          "Complete a written record of the concern (using the club's Incident Report Form) within 24 hours. Record facts only — what was seen, heard, or told — without making assumptions or interpretations.",
        ],
      },
      { type: "subhead", text: "7.3 Receiving a disclosure from a child" },
      { type: "para", text: "Do:" },
      {
        type: "list",
        items: [
          "Stay calm and listen carefully to what the child is saying.",
          "Reassure the child: “I believe you.” “I'm sorry this happened.” “It's not your fault.”",
          "Explain what you will do: tell the child that you cannot keep this a secret, but that the information will only be shared with people whose job it is to keep them safe.",
          "Write down what was said, using the child's own words, as soon as possible after the conversation.",
        ],
      },
      { type: "para", text: "Do not:" },
      {
        type: "list",
        items: [
          "Do not ask detailed, probing, or leading questions.",
          "Do not promise confidentiality or make promises you cannot keep.",
          "Do not show shock, disbelief, or strong emotional reactions.",
          "Do not jump to conclusions, speculate, or accuse anybody.",
          "Do not investigate the matter yourself.",
        ],
      },
      {
        type: "para",
        text: "Remember: your role is to listen, reassure, and report — not to investigate.",
      },
    ],
  },
  {
    number: "8",
    title: "Changing rooms and facilities: safe use guidance",
    blocks: [
      {
        type: "para",
        text: "To minimise risk in changing and showering areas, the club follows these guidelines, consistent with FIFA safeguarding standards:",
      },
      {
        type: "list",
        items: [
          "Where possible, separate changing, showering, and toilet facilities are provided for adults and children.",
          "Adults must not change or shower at the same time as children in the same facilities.",
          "Under no circumstances should adults be undressed in front of children in changing rooms.",
          "For mixed-gender activities, separate facilities must be available for boys and girls.",
          "If a child feels uncomfortable changing or showering in public, they should not be pressured to do so.",
          "The use of mobile phones and/or photographic equipment is prohibited in changing rooms at all times.",
          "Parents are discouraged from entering changing rooms unless it is truly necessary and they have informed the coach in advance.",
          "At least one member of coaching staff of the same sex as the children present should be in the changing room when children are undressed.",
        ],
      },
    ],
  },
  {
    number: "9",
    title: "Codes of conduct",
    blocks: [
      { type: "subhead", text: "9.1 Coach and staff code of conduct" },
      { type: "para", text: "All coaches, officials, and volunteers must:" },
      {
        type: "list",
        items: [
          "Act as positive role models at all times.",
          "Respect the rights, dignity, and worth of every person.",
          "Never use abusive, discriminatory, or obscene language.",
          "Maintain appropriate boundaries with players and avoid one-to-one closed-door situations with minors.",
          "Report any concerns about the welfare of a child immediately.",
          "Never engage in any form of physical, sexual, or emotional abuse.",
          "Follow the club's safer recruitment and training requirements.",
          "Not consume alcohol or use drugs while responsible for children's activities.",
        ],
      },
      { type: "subhead", text: "9.2 Parent and guardian code of conduct" },
      { type: "para", text: "All parents and guardians are expected to:" },
      {
        type: "list",
        items: [
          "Encourage their child to play for fun and enjoyment, not just results.",
          "Respect coaches, officials, and other players at all times.",
          "Behave responsibly on the sidelines and never use abusive or aggressive language.",
          "Encourage their child to play by the rules and accept decisions made by match officials.",
          "Not engage in inappropriate use of social media that may harm others or bring the club into disrepute.",
          "Inform the coach of any health concerns or medical conditions affecting their child.",
        ],
      },
      { type: "subhead", text: "9.3 Young player code of conduct" },
      { type: "para", text: "All young players are expected to:" },
      {
        type: "list",
        items: [
          "Respect coaches, teammates, and officials at all times.",
          "Play fairly and be gracious in defeat.",
          "Arrive on time for training and matches.",
          "Tell the coach about any injury or medical condition before activities.",
          "Report any bullying or concerns to their coach, parent, or CWO.",
          "Not bully, start fights, or use hurtful words or actions towards others.",
          "Not use social media to post mean comments or photos that could upset or harm others.",
        ],
      },
    ],
  },
  {
    number: "10",
    title: "Whistleblowing policy",
    blocks: [
      {
        type: "para",
        text: "LVFC encourages an open culture where everyone feels able to raise concerns without fear of reprisal. If you have a serious concern about poor practice, abuse, or misconduct — including concerns about other staff or volunteers — you may:",
      },
      {
        type: "list",
        items: [
          "Report the concern to the Club Welfare Officer (CWO).",
          "If the concern is about the CWO or you feel unable to approach them, report directly to the PFF Safeguarding Officer.",
          "In extreme cases, contact the relevant statutory authorities (police or child protection services) directly.",
        ],
      },
      {
        type: "para",
        text: "The club will treat all whistleblowing concerns seriously, protect confidentiality to the extent possible, and ensure no one is penalised for raising a genuine concern in good faith.",
      },
    ],
  },
  {
    number: "11",
    title: "Monitoring, review, and evaluation",
    blocks: [
      {
        type: "para",
        text: "This policy is a living document and will be reviewed annually by the Club Director of Football to ensure it remains effective and reflects evolving best practices, legal requirements, and PFF/FIFA guidance.",
      },
      { type: "para", text: "The club shall:" },
      {
        type: "list",
        items: [
          "Maintain accurate records of all safeguarding concerns, training, and recruitment checks.",
          "Provide an annual safeguarding report to the PFF Head of Safeguarding.",
          "Conduct regular risk assessments for all club activities and venues.",
          "Seek feedback from players, parents, and staff to continuously improve safeguarding practices.",
        ],
      },
    ],
  },
  {
    number: "13",
    title: "Acknowledgement and sign-off",
    blocks: [
      {
        type: "para",
        text: "This policy has been approved by the Club Director of Football and is effective from the implementation date above. All members of the club — Board members, staff, volunteers, coaches, players, and parents — are expected to read, understand, and comply with this policy.",
      },
    ],
  },
];

/** Listed at the end of the policy as companion documents. */
export const relatedDocuments = [
  "Coach/Staff Code of Conduct",
  "Parent/Guardian Code of Conduct",
  "Young Player Code of Conduct",
  "Safer Recruitment Policy",
  "Anti-Bullying Policy",
  "Whistleblowing Policy",
  "Incident Report Form",
  "Social Media Policy",
  "Equality, Inclusion and Diversity Policy",
];
