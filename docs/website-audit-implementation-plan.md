# LVFC Website — Content Audit & Implementation Plan

Compares the four client documents in `/docs` against the current build (`src/`) and lays out what to change, in what order, to be ready for the **live-by-second/third-week-of-August** target set in the July 5 planning meeting.

Source documents reviewed:
- `LVFC_Website_Content_Pack_July2026 (1).docx` — the master copy deck (Programmes, Locations, Schedule, FAQ, Resources, Blog)
- `FAQs_ (1).docx` — operational FAQ (fees, kit, attendance, refunds)
- `Resource Center..docx` — external link directory for the Resource Center
- `Safeguarding (1).docx` — full safeguarding policy

---

## 1. Resource links found in the docs

The client's copy deck references two *different* things, both labeled "Resources" — worth not conflating them:

### A. Resource Center external links (`Resource Center..docx`)
Verified URLs the doc actually contains, in order:

| Org | URL |
|---|---|
| FIFA | https://www.fifatrainingcentre.com/en/ |
| Irish FA | https://www.irishfa.com/ |
| English FA | https://www.thefa.com/ |
| Scottish FA | https://www.scottishfa.co.uk/en/coaches/coach-education |
| French FA | https://www.fff.fr/ |
| Pakistan FA | https://pff.com.pk/ |
| UEFA | https://www.uefa.com/ |

**Data error in the source doc:** "Spanish FA" is listed but its hyperlink also points to `fff.fr` (the French FA URL, duplicated by copy-paste) — there is no real Spanish FA link. Flag this back to Sarmad rather than publishing a wrong link.

Everything else in that document — Professional Leadership/Management, Life Coach/Parent Education, Tactical Football Organisations, Committee Memberships, Female Advocacy, Inclusivity, Safeguarding bodies, Video/Stat Analysis, Sustainability (~30 org names) — is listed **as plain text with no hyperlink at all**. The doc's own sign-off confirms this: *"this is my first batch... enough to get it off the ground."* Those need real URLs from Sarmad before they can be published as links.

**Good news:** [`src/pages/Resources.tsx`](../src/pages/Resources.tsx) and [`ResourceLibrary.tsx`](../src/components/sections/ResourceLibrary.tsx) already have this exact list wired in, category-for-category, and already got the Spanish FA problem right — the component renders items without a `url` as plain grey text instead of guessing a link (see `ResourceLibrary.tsx:3-4, 21-22`). No fix needed here, just fill in URLs as they arrive.

### B. Resources hub deliverables (`Content Pack`, Section 5)
This is a *separate* list — downloadable club documents and forms, not external links:

- For Parents & Players: Safeguarding Policy, Player Code of Conduct, Parent/Spectator Code of Conduct, Medical & Consent Form, Fee Structure & Payment Guide 2026–27, Academy Programme Overview, Player Development Framework — all `[PDF Download]`
- For Clubs & Partners: ELVJL Club Registration Pack, ELVJL Season Guidelines, Sponsorship & Partnership Opportunities — all `[PDF Download]`
- Forms: Player Registration, Trial Registration, Club Invitation/Application (ELVJL), Sponsorship Enquiry — `[Online Form]`

**No links or files exist for any of these yet** — the content pack itself says *"PDF files to be uploaded to CMS by Virgil Sports admin team."* One exception: we now have the actual **Safeguarding Policy text** (`Safeguarding (1).docx`), so that one can be turned into a real downloadable PDF/page immediately rather than waiting on the client. The rest are blocked on Virgil Sports producing the files.

---

## 2. Gap analysis — content pack vs. current build

| Area | Content pack says | Current build (`src/`) | Gap |
|---|---|---|---|
| **Programme names** | 4 programmes: Academy Recreational Programme, "Lahore Virgil Football Club" (mass-participation), Competitive Training Programme, Summer Leagues | 2 branded programmes: "Phoenix" (recreational) and "Eagles" (competitive) — see `data/site.tsx:36-51`, `pages/Programme.tsx` | "Phoenix"/"Eagles" appear nowhere in any client doc. Either they're an agreed sub-brand the docs haven't caught up to, or the build is using placeholder names. **This blocks everything downstream** (nav, URLs, programme pages) — confirm with client before building further. |
| **Age-group naming** | "Little Robbins" (content pack, 3-4 yrs) | "Little Robins" (`PhaseTimeline`, `ProgrammeSpecific.tsx:87`) | Likely a typo in the client doc, but confirm the correct spelling before it goes live in both places. |
| **Leadership names** | Steve Hamilton (Director of Football, DSL), Abdul Rehman (CWO), Hamza Syed (CEO), Sarmad Hussain (Director of Operations), Zain Shoukat (President of Leagues) | Hamza Syed is used correctly in `About.tsx`. Everywhere else — `Coaching.tsx`, `Team16`, `CoachSlider` on `Landing.tsx` — uses anonymous placeholders ("Coach Name", "Technical Director", "Head of Phoenix") | Meeting notes said coach bios were "drafted or ready" — none have made it into the build yet. |
| **"548 players to US college" / college pathway** | **Not mentioned anywhere in any of the four docs** | Repeated as a factual claim in `About.tsx`, `Landing.tsx`, `ProgrammeSpecific.tsx` ("548 young athletes to college football programs", "How our college pathway actually works") | This reads as placeholder/concept copy from an earlier direction, not client-sourced fact. Publishing an unverified specific number is a real accuracy/trust risk — confirm it's real or strip it before launch. |
| **FAQ** | ~30 real Q&As across two docs, the content pack's organised into 5 categories (Enrolment & Registration, Coaching & Development, Competitions & Leagues, Safeguarding & Safety, General); the FAQs doc adds fee structure (PKR), kit, timing, refunds, holidays, bullying/harassment contact | `Faqs.tsx` on `Landing.tsx` has 5 generic, non-client Q&As. The `Faqs` component is a flat list with no category grouping (`components/sections/Faqs.tsx:19-24`) | Real FAQ content isn't in the build at all, and the component can't structurally hold it — 30 flat questions in one accordion is unusable. Needs a category layer before the real content goes in. |
| **Schedule** | Client note: *"build a dynamic schedule table or filter widget... filter by Branch \| Age Group \| Day."* Real weekly grid includes Pine Avenue (different hours, 6–9 PM, only Mon–Wed listed) | `ScheduleTable.tsx` is a static table, only used once on `ProgrammeSpecific.tsx`, with placeholder rows — and one row is literally labelled **"DHA Phase 6," which isn't one of LVFC's four branches** (`ProgrammeSpecific.tsx:110`) | Needs real branch/day/time data, a Pine Avenue row, weekend AM sessions, and ideally the filter behaviour the client explicitly asked for. |
| **Locations** | Each branch lists which programmes it actually runs (e.g. Gulberg has no Weekend Morning Programme; Pine Avenue doesn't yet offer Youth Development) and Pine Avenue needs a "Now Enrolling" badge | `LocationsList.tsx` only stores `name`, `address`, `map` — no per-branch programme list, no badge/status field | Component needs two new fields before this content can go in. |
| **Resource Center (links)** | See Section 1 | Already implemented correctly | No action beyond adding URLs as supplied. |
| **Resources hub (downloads/forms)** | Downloadable PDF cards + forms, organised by audience, file size shown | `Resources.tsx` only renders the link library; "Players"/"Parents"/"Referees" sections are literal `ComingSoon` placeholders (`Resources.tsx:14-24, 155-157`) | Entire card/download UI doesn't exist yet. Safeguarding Policy can go in now (we have the text); the rest wait on client files. |
| **Blog** | 5 named launch articles (welcome post, Pine Avenue launch, VSNL preview, UEFA-coaching thought piece, Summer League preview) + monthly/seasonal/ongoing content framework | `Blog42` sections on `Landing.tsx`, `Programme.tsx`, `Coaching.tsx` all show fabricated posts ("Brazilian model built for Lahore," college-pathway stories) linking to `"#"` | No blog route/page exists at all (`App.tsx` has no `/blog`). Copy doesn't match any client-supplied article. |
| **Nav / IA** | July 5 decision: 6-item nav — *New to LVFC, Locations, Resource Center, Blog, Virtual Sports Nationally, Contact* — Programmes+Locations merged, Resource Center consolidating Coaching/Parents/Players | `data/site.tsx:23-76` — About Us, Programmes (mega menu), Coaching, Locations, Schedule, Blog + Book a Spot. `App.tsx` only routes `/`, `/about`, `/programmes`, `/programmes/phoenix`, `/coaching`, `/resources` | Current nav doesn't match the decided IA. "Schedule" and "Blog" nav links go to `"#"` (dead) since no routes exist. No Contact page/route, no Virtual Sports Nationally page. One thing already right: `ResourcesCallout.tsx:16` notes *"Resources was dropped from the primary nav"* — that part is aligned with the meeting decision, just not fully carried through to the rest of the nav. |
| **Safeguarding** | Full real policy now available, with named DSL/CWO, reporting procedure, codes of conduct | `Coaching.tsx` and `Landing.tsx` show a marketing summary via `Layout442`, with a "Download policy" button that has no `href`/file behind it (`Coaching.tsx:107-116`) | We now have the real policy text — this is one of the few sections that can be fully finished immediately, independent of anything else. |
| **WhatsApp number** | — | `data/site.tsx:16` has an explicit `// PLACEHOLDER — not a real LVFC number` comment on the number | Already flagged in code; just needs the real number before launch. |
| **Brand assets** | Meeting decision: all branding assets in SVG, not PNG | `assets/logos/lvfc-logo.svg` is already SVG; brand guideline PDF and real fonts (Futura PT, Tiller) are in `assets/` | On track — just needs to be maintained as real photography/marks are added (avoid PNG logo exports going forward). |
| **Footer/social links** | — | `footerProps.socialMediaLinks` all point to `"#"` (`data/site.tsx:122-127`); `About.tsx` "international partners" logos are literally Webflow/Relume template logos (`About.tsx:127-136`) | Cosmetic but visible — needs real social URLs and either real partner logos or removal of that section if there are no confirmed partners yet. |

---

## 3. Recommended changes, prioritized

**P0 — decisions needed from the client before more content work makes sense** (everything else cascades from these):
1. **Confirm programme naming.** Is "Phoenix"/"Eagles" an approved sub-brand, or should the site use the content pack's plain names (Academy Recreational, Lahore Virgil Football Club, Competitive Training, Summer Leagues)? This affects nav, URLs (`/programmes/phoenix`), and every programme page.
2. **Verify or cut the "548 players / college pathway" claim.** It's not in any source doc — either get the real number/story from the client or remove it before it becomes a factual claim on a live site.
3. **Confirm nav/IA against the July 5 decision** (6 items: New to LVFC, Locations, Resource Center, Blog, Virtual Sports Nationally, Contact) — current build's nav predates that decision.
4. **Get coach bios + headshots** (meeting notes say these were "drafted or ready" as of July 5) to replace the anonymous placeholders in `Team16`/`CoachSlider`.

**P1 — content wiring (data-in, no new components needed beyond one structural change)**
5. Add category grouping to `Faqs.tsx`, then load the real FAQ content (content pack Section 4 + `FAQs_ (1).docx`) in place of the generic 5 questions.
6. Fix `ScheduleTable` data: correct branch names (drop the non-existent "DHA Phase 6"), add Pine Avenue's shorter weekday hours and weekend AM sessions.
7. Build the real Safeguarding Policy into `/coaching` (or its own page) as an actual downloadable PDF, and wire up the "Download policy" button's `href`.
8. Fill in Resource Center URLs as Sarmad supplies them; fix or remove the Spanish FA entry.

**P2 — structural additions (need either new UI or client-supplied files)**
9. Build the Resources hub's downloadable-card sections for Parents/Players and Clubs/Partners (blocked on Virgil Sports producing the actual PDFs — content pack Section 5). Safeguarding can ship first since we have that text now.
10. Add a `/blog` route and page using the 5 suggested launch articles + the monthly/seasonal/ongoing framework as the content model, replacing the fabricated placeholder posts.
11. Add the missing routes implied by nav: Contact, Virtual Sports Nationally. Give `LocationsList` a `programmes` field per branch and a status badge (for Pine Avenue's "Now Enrolling").
12. Make the schedule filterable by Branch / Age Group / Day, per the client's explicit note in the content pack.

**P3 — polish, pre-launch**
13. Replace the placeholder WhatsApp number, footer social links, and the Webflow/Relume placeholder partner logos on `About.tsx` (or remove that section until real partners are confirmed).
14. Keep new brand assets in SVG per the meeting decision.

---

## 4. Suggested sequencing against the August launch date

Given the July 5 meeting set web lead priority-setting without stakeholder sign-off, this can move fast once P0 is answered:

1. **This week:** resolve the four P0 questions with Sarmad/Steve/Hamza — these are blocking, not busywork.
2. **Week 2:** P1 — FAQ categories + content, schedule data fix, Safeguarding page (all independent of the P0 answers except where programme names appear in FAQ/schedule copy).
3. **Weeks 3–4:** P2 — Resources cards (as files arrive), Blog route + launch articles, Contact/Virtual Sports Nationally pages, Locations per-branch data.
4. **Final week before launch:** P3 polish pass + QA across all pages against this doc.
