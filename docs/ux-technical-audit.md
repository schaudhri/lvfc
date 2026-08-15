# LVFC — UX & technical audit

Run 14 August 2026, against `WCAG 2.2 AA` (the bar chosen for this project) and
the design context in [`.impeccable.md`](../.impeccable.md).

Every finding below was verified against the running site or the built bundle,
not inferred from source alone. Three claims that source-reading suggested were
**disproved by measurement** and are recorded at the end so nobody re-raises them.

## Audit health score

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 2/4 | Instagram link has no accessible name; hero auto-rotates with no pause (both Level A) |
| 2 | Performance | 1/4 | 206 KB of unsubset TTF fonts, 30 of 33 images not lazy-loaded, no code splitting |
| 3 | Responsive | 3/4 | No overflow and a well-built mobile nav; 10 px slider dots fail target size |
| 4 | Theming | 3/4 | Strong token system, but a global CSS heading rule fights it |
| 5 | Anti-patterns | 3/4 | Genuinely not AI-slop; let down by placeholder imagery everywhere |
| **Total** | | **12/20** | **Acceptable — significant work needed** |

## Anti-patterns verdict: PASS

**Would someone believe "an AI made this"? No.** This is the strongest dimension
and it deserves saying plainly:

- **Real, licensed typography.** Tiller + Futura PT, self-hosted. Not Inter, not
  a system stack. This alone puts it ahead of most generated work.
- **A committed, unusual palette.** Maroon `#530E16` with champagne `#B19855`.
  No cyan-on-dark, no purple-to-blue gradient, no neon.
- **Zero** gradient text, glassmorphism, `backdrop-blur`, or modals.
- **Honest empty states as a system.** `awaiting` resource cards, "still being
  written" articles, "confirm at your branch" — the codebase refuses to invent
  content. That is a genuine design position, not a default.

Four tells remain, in order of how much they matter:

1. **Every image is a placeholder** (44 references). For a football academy this
   is the single biggest credibility gap — see P1-07.
2. **Hero-metric template** — `StatsPathway` renders `4 / 2–18 / 5 / 3` as
   big-number-small-label, the exact pattern the guidelines call out.
   `pages/Landing.tsx:93-97`.
3. **Card-grid monotony** — the same dark media card now carries programmes,
   blog and locations. Deliberate (you asked for it) and it does read as a
   system, but three pages of identical rhythm is the risk to watch.
4. **Bounce easing** — `cubic-bezier(0.35, 1.5, 0.6, 1)` at `src/index.css:157`.
   The `1.5` overshoots; the guidelines call bounce dated.

## Executive summary

- **Score: 12/20 (Acceptable).**
- **Issues: 4 P0/P1-critical, 9 P1, 11 P2, 5 P3.**
- The site is **well-architected and honest**, and **weakest where a Lahore
  parent on a phone actually feels it**: payload and a handful of Level A
  accessibility gaps.

**Top 5:**

1. Fonts ship as unsubset TTF/OTF — ~206 KB on first paint, 43 % of it Cyrillic
   glyphs this site never renders.
2. Hero slideshow auto-rotates every 6 s with no pause control — WCAG 2.2.2,
   Level A. Introduced by the slider work.
3. Instagram link in the footer has no accessible name — WCAG 2.4.4 / 4.1.2,
   Level A.
4. 30 of 33 images lack `loading="lazy"`; none carry `width`/`height`, so every
   image is a layout-shift source once real photos land.
5. No skip-to-content link, so every keyboard user tabs the full mega-menu on
   every page.

---

## P1 — fix before release

### [P1-01] Fonts ship unsubset and uncompressed
**Location** `src/index.css:10-67`, `assets/fonts/**`
**Category** Performance
**Measured** Homepage fetches 4 faces: `FuturaCyrillicBook` 62.6 KB,
`FuturaCyrillicDemi` 64.7 KB, `FuturaCyrillicBold` 66.2 KB, `TillerTest-Bold`
12.1 KB — **205.6 KB**. `FuturaCyrillicBold.ttf` maps 407 glyphs, of which
**175 are Cyrillic (43 %)** and 0 are used.
**Impact** On a 3G connection this is several seconds of FOUT before body copy
settles. It is the largest single win available.
**Recommendation** Subset to Latin + the punctuation actually used (`·`, `–`,
`—`) and convert to WOFF2. Expect ~205 KB → ~35-45 KB. Keep `font-display: swap`.
**Command** `/optimize`

### [P1-02] Hero slideshow cannot be paused
**Location** `src/components/sections/Header54.tsx:44-53`
**Category** Accessibility
**WCAG** 2.2.2 Pause, Stop, Hide — **Level A**
**Impact** Content that auto-updates, starts automatically, runs longer than 5 s
and sits alongside other content must be pausable. The dots jump between slides
but never stop the timer. Affects users with attention and vestibular needs.
`prefers-reduced-motion` is honoured, which covers some but not all of them.
**Recommendation** Add a pause/play control, and stop the timer on hover and on
keyboard focus within the hero.
**Command** `/harden`

### [P1-03] Instagram link has no accessible name
**Location** `src/components/sections/Footer2.tsx:197-206`, icons from `src/data/site.tsx:147-152`
**Category** Accessibility
**WCAG** 2.4.4 Link Purpose, 4.1.2 Name Role Value — **Level A**
**Measured** The rendered `<a>` has no text, no `aria-label`, no `<title>`, and
its SVG has no `aria-label` — computed name is empty. A screen reader announces
"link" with no destination.
**Recommendation** `aria-label="LVFC on Instagram"` on the anchor, and
`aria-hidden="true"` on the icon. *(The footer logo link was also flagged in
scanning but is fine — its `<img alt>` supplies the name.)*
**Command** `/harden`

### [P1-04] Images are neither lazy-loaded nor dimensioned
**Location** 26 files; `src/components/sections/Header54.tsx:92`, `pages/Locations.tsx:47`, `pages/BranchSpecific.tsx:128,151`, `Blog42.tsx:55`, `Team16.tsx:71`, `Gallery9.tsx:36` and others
**Category** Performance
**Measured** 33 `<img>` total, **3** with `loading="lazy"`, **0** with
`width`/`height`.
**Impact** Every image on a page downloads immediately, and each one shifts
layout as it arrives (CLS). Currently masked because all images are tiny
placeholder SVGs — **it will bite the moment real photography is uploaded**,
which is imminent given the CMS work.
**Recommendation** `loading="lazy"` + `decoding="async"` on everything below the
fold (never the hero), and explicit `width`/`height` or a wrapper with a fixed
`aspect-ratio`. The Sanity pull already knows asset dimensions and could emit them.
**Command** `/optimize`

### [P1-05] No skip-to-content link
**Location** `src/components/SiteLayout.tsx:24`
**Category** Accessibility
**WCAG** 2.4.1 Bypass Blocks — **Level A**
**Impact** Keyboard and screen-reader users traverse the entire primary nav,
including two mega-menus, on every page before reaching content.
**Recommendation** A visually-hidden-until-focused link to `#main`, and `id="main"`
on the existing `<main>`.
**Command** `/harden`

### [P1-06] Slider dots are 10 × 10 px
**Location** `src/components/sections/Header54.tsx:115` (`size-2.5`), `src/components/sections/ProgrammeCards.tsx:126` (`h-2.5`)
**Category** Accessibility / Responsive
**WCAG** 2.5.8 Target Size (Minimum), 24 × 24 — **AA**
**Measured** 10 dots at **10 × 10 px** on the programmes slider at 360 px.
**Impact** Below the AA minimum, and hard to hit on a phone. Note
`ProgrammeCards` already mitigates with `before:-inset-2` (≈26 px effective) —
**the hero dots I added have no such expansion and genuinely fail.**
**Recommendation** Give the hero dots the same `before:` hit-area expansion.
**Command** `/adapt`

### [P1-07] The site has no real photography
**Location** 44 `placeholder-image*.svg` references across `src/`
**Category** UX / Anti-pattern
**Impact** For a club selling *trust in how it treats children*, photographs of
actual coaching are the primary evidence. A parent comparing LVFC with a rival
sees grey placeholders. This outranks every styling decision on this page.
**Recommendation** Not a code fix — the CMS now supports branch photos, coach
headshots, programme thumbnails, hero slides and blog heroes. This is a content
request to the club, and it is the highest-value action available.
**Command** — (content, not code)

### [P1-08] Scrollable schedule table is keyboard-inaccessible
**Location** `src/components/sections/ScheduleGrid.tsx:109`
**Category** Accessibility
**WCAG** 2.1.1 Keyboard — **Level A**
**Measured** At 360 px the table is **743 px wide in a 322 px container** — it
genuinely does scroll. But the wrapper has no `tabIndex={0}`, no `role="region"`
and no `aria-label`, so a keyboard user cannot reach or scroll it, and there is
no visual hint that content continues.
**Recommendation** `tabIndex={0}` + `role="region"` + `aria-label="Training timetable"`
on the wrapper, plus an edge-fade or "scroll for more" affordance.
**Command** `/harden`

### [P1-09] Invisible figcaption on CMS images
**Location** `src/components/RichText.tsx:58`
**Category** Theming
**Measured** `text-text-alternative` computes to `rgb(255,255,255)`; the caption
renders on the `#EEEEEE` page background. Contrast **≈1.07:1**.
**Impact** Captions are invisible. Latent today (no article images yet), live the
moment an editor adds a captioned image — which the CMS now invites.
**Recommendation** Use `text-scheme-text/70`. My bug, introduced with `RichText`.
**Command** `/normalize`

---

## P2 — next pass

| ID | Issue | Location | Category | Fix |
|---|---|---|---|---|
| P2-01 | 693 KB single JS chunk; **GSAP + ScrollTrigger ship on every route** for one landing component | `dist/assets/index-*.js`, `CoachSlider.tsx` | Performance | Route-level `React.lazy`; lazy-load `CoachSlider` | `/optimize` |
| P2-02 | Accordion `aria-controls` points at an id that does not exist while collapsed; panel `role="region"` is unnamed | `Faqs.tsx:94-121` | A11y | Keep the panel mounted, or drop `aria-controls`; add `aria-labelledby` | `/harden` |
| P2-03 | Carousel dots use `role="tab"`/`aria-selected` with no `tabpanel`, no `aria-controls`, no arrow keys — invalid ARIA | `ProgrammeCards.tsx:113-133` | A11y | Plain buttons with `aria-label`, or complete the tab pattern | `/harden` |
| P2-04 | Filter changes are silent; the `aria-live` count only mounts *after* the first filter, so the first change is never announced | `pages/Programme.tsx:130`, `ScheduleGrid.tsx:78` | A11y | Keep an always-mounted live region | `/harden` |
| P2-05 | All `relume-icons` SVGs lack `aria-hidden` (15+ sites) | `Footer2.tsx:257`, `ProgrammeCards.tsx:224`, etc. | A11y | Wrap or patch to add `aria-hidden="true"` | `/harden` |
| P2-06 | Global `h1–h6 { color: #530e16 }` overrides tokens; `surface.ts` undoes it with a specificity hack | `src/index.css:88-96`, `src/lib/surface.ts:37` | Theming | Scope the rule, or move heading colour into the token layer | `/normalize` |
| P2-07 | Hero uses `min-h-[90vh]`; other heroes use `min-h-svh`; layout uses `min-h-screen` — three units | `Header54.tsx:64`, `Header30.tsx:25`, `SiteLayout.tsx:22` | Responsive | Standardise on `svh`/`dvh` | `/adapt` |
| P2-08 | 43 touch targets 24–44 px (pass AA, below comfort) — `min-h-6` links, `sm` buttons ≈40 px | `button.tsx:26`, 15 `min-h-6` sites | Responsive | Raise to 44 px on mobile | `/adapt` |
| P2-09 | Newsletter input has no visible label and no `autocomplete="email"`; no success/error feedback | `Footer2.tsx:161-178` | A11y | Visible label, `autocomplete`, `aria-live` status | `/clarify` |
| P2-10 | Contact form has no `aria-invalid`/`aria-describedby`; validation is native bubbles only | `ContactForm.tsx:81-131` | A11y | Inline errors wired to inputs | `/harden` |
| P2-11 | 203 KB PNG map used as the branch image fallback | `public/lvfc-map-lahore.png` | Performance | WebP/AVIF, or drop once real photos land | `/optimize` |

---

## P3 — polish

- **P3-01** `--color-scheme-background` defined and never referenced. `src/index.css:71`
- **P3-02** Near-duplicate tokens: `terracotta #540E17` vs `maroon #530E16`, and `midnight #140101` vs `neutral-darkest #130101` — one hex step apart, both live. `tailwind.config.js`
- **P3-03** `brand-gold` now unused after the CTA change (kept intentionally, documented). `tailwind.config.js`
- **P3-04** `theme-color` meta is `#540E17` but the header renders `#530E16`. `index.html:13`
- **P3-05** Bounce easing `cubic-bezier(0.35, 1.5, 0.6, 1)`. `src/index.css:157`

---

## Verified NON-issues

Recorded so they are not re-raised:

1. **No horizontal page overflow on mobile.** `documentElement.scrollWidth` reads
   687 px at a 360 px viewport, but `maxScrollX` is **0** and `body.scrollWidth`
   is **375** — the excess is the scroll-snap track's off-screen children, which
   is correct behaviour.
2. **The schedule table does scroll.** 743 px content in a 322 px container. The
   defect is keyboard access (P1-08), not crushing.
3. **The footer logo link has an accessible name** via its `<img alt>`.
4. **`embla-carousel-react` is fully tree-shaken out** (0 occurrences in the
   bundle) — a dead dependency in `package.json`, but not shipped weight.
5. **No default-palette leakage.** Zero `gray-`/`slate-`/`zinc-` classes anywhere
   in `src/`; the `white/N` utilities are intentional on dark surfaces.

## Positive findings

- **Contrast is excellent.** Headings 12.55:1, body 18.1:1, CTA text on champagne
  7.24:1, card text on near-black 20.3:1. All comfortably beyond AA, several
  beyond AAA.
- **The design token system is real** and consistently used.
- **`prefers-reduced-motion` is honoured** in CSS globally and independently in
  the two JS-driven animations, with a comment explaining why GSAP needs its own
  check.
- **Landmarks are correct** — `header`, `nav aria-label="Primary"`, `main`,
  `footer`, plus named in-page navs.
- **The mobile menu is textbook**: 48 × 48 target, `aria-label`, `aria-expanded`,
  `aria-controls` matched to a real `id`, Escape to close, scroll lock.
- **The schedule table is properly marked up** — `scope="col"`/`scope="row"`, and
  empty cells pair an `aria-hidden` dash with `sr-only` "No session".
- **External links** carry `target="_blank"` with `rel="noopener noreferrer"`.
- **Every page has exactly one `h1`.**
- **The July audit's unverified claims are gone** — no "548 players to college"
  anywhere in `src/`.

## Recommended actions

1. **[P1] `/optimize`** — subset + WOFF2 the fonts (205 KB → ~40 KB), lazy-load
   and dimension the images, code-split routes and lift GSAP off the shared bundle.
2. **[P1] `/harden`** — hero pause control, Instagram link name, skip link,
   keyboard-accessible schedule scroller, live-region and accordion ARIA fixes.
3. **[P1] `/adapt`** — hero dot hit areas to 24 px+, touch targets to 44 px,
   standardise viewport units.
4. **[P2] `/normalize`** — the invisible figcaption, the global heading-colour
   rule fighting the token layer, and the duplicate tokens.
5. **[P2] `/clarify`** — newsletter and contact form labelling, error messaging
   and success feedback.
6. **[P3] `/polish`** — final pass once the above land.

Separately, and outside the command set: **get real photographs from the club.**
The CMS is ready for them and no amount of code changes the fact that a parent
is currently looking at grey placeholders.
