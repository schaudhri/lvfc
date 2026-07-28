/**
 * Full FAQ, merged from content pack Section 4 and the standalone FAQ document.
 *
 * Where the two sources answer the same question differently, the more specific
 * answer is used and the conflict is flagged in a comment above it.
 */

export type Faq = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  questions: Faq[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "enrolment",
    title: "Enrolment & registration",
    questions: [
      {
        question: "How do I register my child?",
        answer:
          "Registration is done through our online booking portal at virgil-sports.odoo.com. Select your preferred branch and programme, choose your age group and complete the registration form. Our team will confirm your spot within 24–48 hours.",
      },
      {
        question: "What age groups do you accept?",
        answer:
          "We welcome players from as young as 2 years all the way up to U18. Our club sessions are open to all ages and abilities, including adults. Please contact us if you have a specific query about age eligibility.",
      },
      {
        question: "Are there trials for the academy?",
        answer:
          "Yes. LVFC holds formal trial sessions for our competitive squads (U8–U15) twice a year — at the start of the August season and during January. Watch our social media and website for trial announcements. Club programme players can join at any time without a trial.",
      },
      {
        question: "How is your booking fee structured?",
        answer:
          "We offer two recreational programmes, each running three days per week on a minimum monthly basis. The monthly fee for both is 8,000 PKR, pro-rated by when you enrol: joining between the 1st and 5th is the full 8,000 PKR; between the 6th and 15th it is charged per session attended at 700 PKR a session; and after the 15th a half-month fee of 4,000 PKR applies. Fees are subject to change and the figures above are examples.",
      },
      {
        question: "What happens if we join halfway through the month?",
        answer:
          "Our bookings run pro-rata, so joining after the 15th means you pay half the full monthly fee.",
      },
      {
        question: "Is there a registration fee?",
        answer:
          "Yes, a one-time registration fee applies at enrolment. Monthly training fees vary by programme and age group. Please contact your nearest branch or visit our booking portal for the latest fee structure.",
      },
      {
        question: "How long does the registration fee apply?",
        answer:
          "If you are absent for over 6 months you must register again, and will receive another pair of kit within that fee.",
      },
      {
        // The FAQ doc gives specific discount rates; the content pack only says
        // "speak to your branch administrator". The specific answer is used here.
        question: "Do you offer sibling discounts?",
        answer:
          "Yes — 10% for two siblings, and 12.5% for triplets or more. This applies to merchandise as well, if bought together.",
      },
    ],
  },
  {
    id: "sessions",
    title: "Sessions & attendance",
    questions: [
      {
        question: "What should my child wear and bring?",
        answer:
          "Children must wear their LVFC football uniform with trainers or football boots depending on the surface, plus shin pads if playing in boots. Watches, earrings, bracelets and necklaces should not be worn. Please make sure your child brings plenty of water, and during the summer months wears sunscreen and a hat. Any child not wearing LVFC kit may be excused from the session.",
      },
      {
        question: "What time does my child need to arrive?",
        answer:
          "Please arrive no later than 5 minutes before the start time. If your child is late they may be asked to sit at the side of the session until the coach or group has finished their current practice. Please make sure an LVFC coach is present at the branch before leaving your child.",
      },
      {
        question: "Can parents, maids or drivers attend the session?",
        answer:
          "All parents, family and friends are welcome to watch. Please do not enter the field of play at any time during the session — this applies to younger siblings, maids and drivers too — and keep a safe distance from the playing area. If you have questions for the coach, please wait until the session has ended. For ages 2, 3 and 4 we encourage you to join and interact with the session.",
      },
      {
        question: "What if my child misses a session through illness?",
        answer:
          "If your child is ill and cannot attend, please notify us on 0329 1444333 at least 24 hours before the session. You can make the session up at any one of our other branches or days, or at a catch-up session — note that catch-up sessions may be at another branch. Regrettably we cannot arrange make-up sessions if you tell us after the session has taken place. For a medical emergency on the day we ask for some form of evidence, such as a doctor's note or a picture of the injury.",
      },
      {
        question: "Does LVFC run sessions during public holidays?",
        answer:
          "We only observe the public holidays explicitly listed: Eid al-Fitr, Eid al-Adha, Quaid-e-Azam Day, Ashura and Pakistan Day. For all others, assume football is on. The monthly fee is not affected by these holidays.",
      },
      {
        // From the club's own published FAQ on lahorevirgilfc.com/frequently-asked-questions.
        // Not in the July content pack, but it answers the single most relevant
        // seasonal question for a Lahore club running outdoor evening sessions.
        // TODO: confirm the 300 threshold still stands post-rebrand.
        question: "Will sessions run when air quality is poor?",
        answer:
          "Sessions continue unless we say otherwise, up to an Air Quality Index of 300. If we do cancel a session because of air quality, we provide a make-up session.",
      },
      {
        // Also from the club's published FAQ — a collection rule matters for
        // safeguarding and is the kind of practical detail parents plan around.
        question: "When should I collect my child?",
        answer:
          "Please collect your child from the playing area no later than 15 minutes after the session has ended.",
      },
      {
        question: "What happens if a session is cancelled?",
        answer:
          "If a session is cancelled due to weather or unforeseen circumstances, parents will be notified via WhatsApp and the branch's social media channel as early as possible. Cancelled sessions are either rescheduled or credited.",
      },
    ],
  },
  {
    id: "fees-refunds",
    title: "Fees & refunds",
    questions: [
      {
        question: "Do you give a refund if my child misses a session?",
        answer:
          "Refunds are not given if a session is cancelled outside of LVFC's control — for example political instability, government closures, inclement weather such as smog or rain, or school cancellations. We do try to offer make-ups where we can. Refunds are also not given to people who simply do not attend, or who choose to go on holiday during school term time. Refunds work on a pro-rata basis depending on the sessions left; they apply only to the session fee, not the registration fee or any ancillary fees. If a refund request is valid due to injury or ill health, we will first try to offer a make-up session. In exceptional circumstances, refunded monies are paid by cheque within a maximum of 5 working days.",
      },
      {
        question: "Do you give a refund if I want to leave LVFC?",
        answer:
          "You have the right to cancel your booking at any time, and a full refund is given if you cancel before the first session. Further refunds are offered at any time before any subsequent session. All refunds are pro-rated and processed through the original payment method, after deducting any unpaid invoices that are due and payable.",
      },
    ],
  },
  {
    id: "coaching",
    title: "Coaching & development",
    questions: [
      {
        question: "Who coaches at LVFC?",
        answer:
          "All LVFC head coaches have extensive training and qualifications, with additional support coaches trained to national standards. Our Director of Football, Steve Hamilton, oversees the curriculum and coaching standards across all branches. We also bring in guest coaches and international development programmes throughout the year.",
      },
      {
        question: "What curriculum do you follow?",
        answer:
          "We follow a UEFA-aligned youth development curriculum, adapted for our age groups. The curriculum emphasises technical skills, tactical understanding, physical development and mental resilience — the four pillars of the modern game.",
      },
      {
        question: "Will my child receive individual feedback?",
        answer:
          "Yes. Every academy player receives a monthly progress report from their head coach. Parents are encouraged to attend monthly review sessions to discuss their child's development goals.",
      },
    ],
  },
  {
    id: "competitions",
    title: "Competitions & leagues",
    questions: [
      {
        question: "What leagues does LVFC run?",
        answer:
          "Virgil Sports runs two internal youth leagues — the Elite Lahore Junior Premier League (ELJPL) for competitive academy players, and the Lahore Junior Premier League (LJPL) for developmental players. We also run the Virgil Sports National League (VSNL), which brings clubs from across Pakistan together for national-level competition.",
      },
      {
        question: "Can non-LVFC players enter the leagues?",
        answer:
          "The LJPL is an internal league. The ELJPL is by invitation or qualification. For league registration enquiries, contact Zain Shoukat, President of Leagues, at zain@virgilsports.com.",
      },
    ],
  },
  {
    id: "safeguarding",
    title: "Safeguarding & safety",
    questions: [
      {
        question: "What safeguarding policies are in place?",
        answer:
          "The safety and wellbeing of every child at LVFC is our highest priority. We have a comprehensive Safeguarding Policy, reviewed annually, which adopts the principles of the Pakistan Football Federation, the English FA Safeguarding Protocol, the US Youth Soccer Association Blueprint and the FIFA Guardians Child Safeguarding Toolkit. Our Designated Safeguarding Lead is Steve Hamilton, Director of Football, supported by Abdul Rehman as Club Welfare Officer. You can read the full policy on our safeguarding page.",
      },
      {
        question: "Are coaches background-checked?",
        answer:
          "Yes. All LVFC coaches and staff who work with children undergo background verification before beginning work, including police verification or an equivalent national-level criminal record check. At least two references are taken up and verified before appointment, and we maintain records of all certifications with annual reviews.",
      },
      {
        question: "How do I raise a bullying or harassment concern?",
        answer:
          "First and foremost this should be raised with the responsible coach on the pitch, before or after the session. If it comes to light after the session, contact the club's safeguarding channel on hamza@virgilsports.com or +92 309 1444428 and we'll route it to the right person. See our safeguarding page for the full reporting procedure.",
      },
      {
        question: "How do I raise a health and safety concern?",
        answer:
          "Use the club's safeguarding channel on hamza@virgilsports.com or +92 309 1444428. Our safeguarding page sets out the full procedure, including what to do if a child is in immediate danger.",
      },
    ],
  },
  {
    id: "general",
    title: "General",
    questions: [
      {
        question: "How can I contact LVFC?",
        answer:
          "You can reach us by email at info@virgilsports.com, on Instagram at @lahorevirgilfootballacademy, through our booking portal at virgil-sports.odoo.com, or by visiting any of our four branch locations during training hours.",
      },
    ],
  },
];

/** The questions parents ask most — the shortlist shown on the landing page. */
const LANDING_QUESTIONS = [
  "How do I register my child?",
  "What age groups do you accept?",
  "How is your booking fee structured?",
  "What should my child wear and bring?",
  "Are there trials for the academy?",
  "What safeguarding policies are in place?",
];

export const landingFaqs: Faq[] = LANDING_QUESTIONS.map(
  (question) =>
    faqCategories.flatMap((category) => category.questions).find((faq) => faq.question === question)!,
);
