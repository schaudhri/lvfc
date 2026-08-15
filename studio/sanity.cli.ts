import { defineCliConfig } from "sanity/cli";

/**
 * TypeGen reads the GROQ queries in `../src/sanity/queries.ts` — the queries the
 * build-time pull script runs — and writes their result types next to them, so
 * `scripts/pull-content.ts` is type-checked against the real schema rather than
 * against hand-written interfaces that can drift.
 */
export default defineCliConfig({
  api: {
    projectId: "6pbvdivo",
    dataset: "production",
  },
  /** Where the hosted Studio lives, so the club never has to run it locally. */
  studioHost: "lvfc",
  /** Pins redeploys to the same hosted application instead of prompting. */
  deployment: {
    appId: "kn7g63sodnn9xwy4omiub2d2",
  },
  typegen: {
    enabled: true,
    path: "../src/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "../src/sanity/sanity.types.ts",
  },
});
