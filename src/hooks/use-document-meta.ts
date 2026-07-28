import { useEffect } from "react";

const SITE_NAME = "Lahore Virgil Football Club";

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

/**
 * Sets the document title and description for the current route.
 *
 * Every route previously reported the same `<title>`, which breaks bookmarks,
 * browser history, multi-tab use and screen-reader page orientation. This fixes
 * all of those.
 *
 * IMPORTANT — this does NOT fix link previews. Crawlers for WhatsApp, Facebook
 * and Instagram read the HTML the server returns; they do not run JavaScript, so
 * per-route Open Graph tags written here are invisible to them. Every shared
 * link will show the site-level card from index.html until the app is
 * pre-rendered or server-rendered. That is a build-pipeline change, not a
 * content one — see the audit for the recommendation.
 */
export const useDocumentMeta = (title: string, description?: string) => {
  useEffect(() => {
    const full = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    document.title = full;
    upsertMeta("property", "og:title", full);

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
    }
  }, [title, description]);
};
