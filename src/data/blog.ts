/**
 * Blog articles.
 *
 * `body` is absent until the club writes the article. A post with a brief and
 * no body renders as an announced, not-yet-written piece rather than a live
 * link to an empty page — a card that goes nowhere reads as a broken promise to
 * a parent who clicks it.
 *
 * Edited in Sanity under "Blog posts".
 */

import type { PortableTextBlock } from "@portabletext/types";

import raw from "@/content/posts.json";
import type { Image } from "@/data/people";

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  /** The summary shown on cards, and on the article page before it is written. */
  brief: string;
  byline?: string;
  publishedAt?: string;
  image?: Image;
  /** The written article. Absent until the club writes it. */
  body?: PortableTextBlock[];
};

export const launchPosts = raw as BlogPost[];

/**
 * The ongoing content framework the client asked the web team to plan against,
 * from content pack Section 6.
 *
 * Held in code rather than in Sanity: this is an editorial plan for the club's
 * own team, not published content a reader is looking for.
 */
export type ContentStream = {
  cadence: string;
  items: string[];
};

export const contentFramework: ContentStream[] = [
  {
    cadence: "Monthly",
    items: [
      "Match reports from LJPL and ELJPL fixtures",
      "Player of the Month spotlight",
      "Branch spotlight, rotating across Gulberg, Phase V, Phase VIII and Pine Avenue",
    ],
  },
  {
    cadence: "Seasonal",
    items: [
      "Trial announcements and season preview",
      "End of season awards and review",
      "Summer camp and holiday programme announcements",
    ],
  },
  {
    cadence: "Ongoing",
    items: [
      "Coaching tips for parents",
      "Player development guides by age group",
      "Partnership and sponsor announcements",
      "Community events and outreach",
    ],
  },
];

export const getPost = (slug: string) => launchPosts.find((post) => post.slug === slug);
