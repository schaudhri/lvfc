/**
 * The GROQ queries the build-time content pull runs.
 *
 * Each one is shaped to land as closely as possible on the type its data module
 * already exports, so `src/data/*.ts` keep their published shapes and the rest
 * of the app never learns that Sanity exists. What the queries cannot express —
 * turning an image object into a URL, or a file asset into a status and a size —
 * is done in `scripts/pull-content.ts`.
 *
 * Query names must be unique across the project: TypeGen keys generated types
 * off the variable name and silently overwrites duplicates.
 */

import { defineQuery } from "groq";

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    name,
    shortName,
    parent,
    heroImages,
    email,
    absenceLine,
    whatsappNumber,
    instagram{handle, url},
    bookingPortal{label, url, programmes},
    safeguarding{
      "designatedSafeguardingLead": designatedSafeguardingLead->{name, role},
      "clubWelfareOfficer": clubWelfareOfficer->{name, role},
      welfareEmail,
      welfarePhone
    },
    leaguesContact{
      "name": person->name,
      "role": person->role,
      email
    }
  }
`);

/**
 * `programmes` returns the referenced documents rather than strings. A pathway
 * stage carries an `ages` line and a programme does not, which is what lets the
 * pull script rebuild the branch's list exactly as the club writes it:
 * "Foundation · 9–12 years" for a stage, "Weekend Morning Programme" for a
 * programme.
 */
export const BRANCHES_QUERY = defineQuery(`
  *[_type == "branch"] | order(order asc){
    "slug": slug.current,
    name,
    shortName,
    address,
    about,
    status{label, detail},
    image,
    gallery[],
    "programmes": programmes[]->{_type, name, ages},
    "coaches": coaches[]->{name, role, alsoRole, description, photo},
    "sessions": sessions[]{day, time, note}
  }
`);

export const PROGRAMMES_QUERY = defineQuery(`
  *[_type == "programme"] | order(order asc){
    "slug": slug.current,
    ref,
    name,
    tag,
    agesLabel,
    summary,
    description,
    detailsHeading,
    details,
    ageRange{min, max},
    season,
    flagship,
    bookingKey,
    image,
    body,
    "ageGroups": ageGroups[]->{name, ages, min, max, focus},
    "branchSlugs": branches[]->slug.current
  }
`);

/** The pathway timeline — the stages the club tells its development story with. */
export const PATHWAY_QUERY = defineQuery(`
  *[_type == "ageGroup" && inPathway == true] | order(order asc){
    name,
    ages,
    min,
    max,
    focus
  }
`);

export const LEADERSHIP_QUERY = defineQuery(`
  *[_type == "person" && kind == "leadership"] | order(order asc){
    name,
    role,
    alsoRole,
    description,
    photo
  }
`);

/**
 * Ordered by hand rather than by date: the launch articles carry no publication
 * date, and ordering by creation time would leave them in whatever sequence the
 * import happened to write.
 */
export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(order asc){
    "slug": slug.current,
    title,
    "category": category->title,
    brief,
    "byline": array::join(authors[]->name, " & "),
    publishedAt,
    heroImage,
    body
  }
`);

export const FAQ_CATEGORIES_QUERY = defineQuery(`
  *[_type == "faqCategory"] | order(order asc){
    "id": slug.current,
    title,
    "questions": *[_type == "faq" && category._ref == ^._id] | order(order asc){
      question,
      answer,
      featuredOnLanding,
      landingOrder
    }
  }
`);

/**
 * `file` is expanded to the asset itself so the pull script can read the real
 * byte size — the size shown on a download card is never typed by hand.
 */
export const RESOURCE_GROUPS_QUERY = defineQuery(`
  *[_type == "resourceGroup"] | order(order asc){
    "id": slug.current,
    title,
    description,
    "items": *[_type == "resource" && group._ref == ^._id] | order(order asc){
      name,
      kind,
      note,
      url,
      "file": file.asset->{url, size}
    }
  }
`);

export const RESOURCE_LINKS_QUERY = defineQuery(`
  *[_type == "resourceLinkGroup"] | order(order asc){
    title,
    "items": items[]{name, url}
  }
`);
