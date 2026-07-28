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
        h1: ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h4: ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
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
         * LVFC primary palette — "LVFC Brand Guidelines Final.pdf", §4.1.
         * These five are the whole approved palette; §3.5 forbids "altering
         * colours outside the approved palette", so do not add to this list.
         *
         * A sixth colour, `gold: #C0A054`, used to sit here. It appears
         * nowhere in the guidelines and nothing referenced it, so it has been
         * removed rather than left as a licence to drift off-palette.
         */
        brand: {
          /** §4.1 "a deep near-black used for contrast, typography, and anchoring layouts". */
          midnight: "#140101",
          /** §4.1 "the core identity colour" — heritage, growth, depth. */
          terracotta: "#540E17",
          /** §4.1 "Flower", the bloom in the club's fable. */
          flower: "#AD4050",
          /** §4.1 "energy... and the forward momentum of the club". */
          flame: "#D35A42",
          /** §4.1 "a warm neutral drawn from the texture of local stone". */
          sandstone: "#FFF1D7",
        },
        /**
         * The scheme tokens most components style against. Pointing them at
         * the palette is what carries the brand through the existing markup —
         * `text-scheme-text`, `bg-neutral-darkest` and friends did not need to
         * change at ~400 call sites.
         */
        scheme: {
          background: "#ffffff",
          foreground: "#ffffff",
          // Midnight, not pure black — §4.1 names it the typography colour.
          text: "#140101",
          border: "#140101",
          "btn-text": "#ffffff",
        },
        neutral: {
          // Relume ships #111111 here; midnight is the brand's own near-black
          // and is what "anchors layouts" (footer, primary buttons, hexagons).
          darkest: "#140101",
          // Relume ships #eeeeee; sandstone is the palette's designated warm
          // neutral, and is what the card surface now sits on.
          lightest: "#FFF1D7",
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
