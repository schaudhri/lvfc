import { ageGroup } from "./documents/ageGroup";
import { branch } from "./documents/branch";
import { category } from "./documents/category";
import { faq } from "./documents/faq";
import { faqCategory } from "./documents/faqCategory";
import { person } from "./documents/person";
import { post } from "./documents/post";
import { programme } from "./documents/programme";
import { resource } from "./documents/resource";
import { resourceGroup } from "./documents/resourceGroup";
import { resourceLinkGroup } from "./documents/resourceLinkGroup";
import { siteSettings } from "./documents/siteSettings";

import { blockContent } from "./objects/blockContent";
import { linkItem } from "./objects/linkItem";
import { sessionBand } from "./objects/sessionBand";
import { statusNote } from "./objects/statusNote";

export const schemaTypes = [
  // Documents
  siteSettings,
  branch,
  programme,
  ageGroup,
  person,
  post,
  category,
  faq,
  faqCategory,
  resource,
  resourceGroup,
  resourceLinkGroup,
  // Objects
  blockContent,
  linkItem,
  sessionBand,
  statusNote,
];
