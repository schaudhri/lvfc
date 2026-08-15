import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "LVFC",

  projectId: "6pbvdivo",
  dataset: "production",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    /** Club settings is a single record, so it must not be creatable from the + menu. */
    newDocumentOptions: (prev) =>
      prev.filter((template) => template.templateId !== "siteSettings"),
  },
});
