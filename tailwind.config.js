/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    // Override the preset's container.screens — it sets sm/md to "100%", which
    // emits an invalid `@media (min-width: 100%)` that the CSS minifier rejects.
    // Below lg the container is full-width by default, so dropping them is safe.
    container: {
      center: true,
      screens: {
        lg: "992px",
        xl: "1280px",
      },
    },
    extend: {
      gradientColorStops: ({ theme }) => theme("colors"),
      fontFamily: {
        sans: ["Futura PT", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Tiller", "Futura PT", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid from phone to desktop. At a fixed 3.5rem the landing headline
        // wrapped to four lines on a 375px phone and pushed its buttons below
        // the fold; the desktop sizes are unchanged.
        h1: ["clamp(2.5rem, 1.6rem + 3.2vw, 3.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["clamp(2rem, 1.3rem + 2.6vw, 3rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.75rem, 1.2rem + 2vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h4: ["clamp(1.5rem, 1.1rem + 1.3vw, 2rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h5: ["1.5rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        h6: ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        large: ["1.25rem", { lineHeight: "1.5" }],
        medium: ["1.125rem", { lineHeight: "1.5" }],
        regular: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.5" }],
      },
      colors: {
        /**
         * LVFC primary palette, verified against "LVFC Brand Guidelines
         * Final.pdf" §4.1. §3.5 forbids "altering colours outside the
         * approved palette" from that document — `gold` and `maroon` below
         * are later, separately-sourced additions (stakeholder hex + the
         * "virgil-homepage-branding" Figma file) layered on top, not part of
         * the original five.
         *
         * A sixth entry, `gold: #C0A054`, used to sit here from the PDF read.
         * It appeared nowhere in the guidelines and nothing referenced it, so
         * it was removed — unrelated to the Figma-sourced `gold` below.
         */
        brand: {
          /** §4.1 "a deep near-black used for contrast, typography, and anchoring layouts". */
          midnight: "#140101",
          /** §4.1 "the core identity colour" — heritage, growth, depth. */
          terracotta: "#540E17",
          /** §4.1 "Flower", the bloom in the club's fable. */
          flower: "#AD4050",
          /** §4.1 "energy... and the forward momentum of the club". Only 3.95:1
           *  behind white text — pair it with midnight (5.13:1), not white. */
          flame: "#D35A42",
          /** §4.1 "a warm neutral drawn from the texture of local stone". */
          sandstone: "#FFF1D7",
          /**
           * Site accent colour, given directly by the stakeholder (Aug 2026
           * colour update) for headers and filter pills. One hex step off
           * `terracotta` (#540E17 vs #530E16) — kept as its own token rather
           * than assumed to be the same colour.
           */
          maroon: "#530E16",
          /**
           * The brighter gold from the "virgil-homepage-branding" Figma file
           * (node 1:1052). Was the solid CTA colour until the stakeholder
           * replaced it with `champagne` site-wide (Aug 2026). Kept as a token
           * because it is still the colour of record in that Figma file, but
           * nothing renders it — do not reintroduce it for CTAs.
           */
          gold: "#fdd311",
          /**
           * Solid CTA colour site-wide — every default `<Button>`, including
           * the nav (stakeholder direction, Aug 2026). Muted gold, and the only
           * colour a primary button should be. `maroon` stays the header/pill
           * colour.
           */
          champagne: "#B19855",
        },
        scheme: {
          background: "#FFF1D7",
          foreground: "#ffffff",
          text: "#000000",
          border: "#000000",
          "btn-text": "#ffffff",
        },
        // Figma's dark section band (#130101) is effectively the brand.midnight
        // black-maroon (#140101) — reused here at the token level so every
        // existing bg-neutral-darkest section (footer, stats band, pathway
        // hexagons, image overlays) re-themes to match without touching each
        // component individually.
        neutral: {
          darkest: "#130101",
        },
      },
      borderRadius: {
        button: "0.5rem",
        card: "0.75rem",
        image: "0.75rem",
        form: "0.5rem",
        badge: "0.375rem",
        checkbox: "0.25rem",
        carousel: "9999px",
        dropdown: "0.5rem",
      },
    },
  },
};
