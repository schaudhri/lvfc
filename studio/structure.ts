import { CogIcon } from "@sanity/icons/Cog";
import type { StructureResolver } from "sanity/structure";

/**
 * The Studio's left-hand menu.
 *
 * Grouped the way the club thinks about the site rather than alphabetically by
 * document type, and with the settings document pinned at the top as a single
 * editable record instead of a list you can add to.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("LVFC")
    .items([
      S.listItem()
        .title("Club settings")
        .icon(CogIcon)
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.divider(),

      S.documentTypeListItem("branch").title("Branches"),
      S.documentTypeListItem("programme").title("Programmes"),
      S.documentTypeListItem("ageGroup").title("Pathway stages"),
      S.documentTypeListItem("person").title("People"),

      S.divider(),

      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("category").title("Blog categories"),

      S.divider(),

      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("faqCategory").title("FAQ categories"),

      S.divider(),

      S.documentTypeListItem("resource").title("Resources"),
      S.documentTypeListItem("resourceGroup").title("Resource groups"),
      S.documentTypeListItem("resourceLinkGroup").title("External links"),
    ]);
