/**
 * Renders the long-form body copy written in the CMS.
 *
 * Blog articles and programme pages both use it, so an editor gets the same
 * typography wherever they write. The styles match what the article template
 * used when its body was a hand-rolled list of paragraphs and headings.
 */

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-medium">{children}</p>,
    h2: ({ children }) => <h2 className="mt-4 text-h4 font-medium">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-2 text-h5 font-medium">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-border-primary pl-6 text-medium italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="flex list-disc flex-col gap-2 pl-6 text-medium">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="flex list-decimal flex-col gap-2 pl-6 text-medium">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = String(value?.href ?? "");
      /** Only send a reader off-site in a new tab; internal links stay in place. */
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="underline"
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.src) return null;
      return (
        <figure className="flex flex-col gap-2">
          <img
            src={value.src}
            alt={value.alt ?? ""}
            className="w-full rounded-image object-cover"
          />
          {value.caption ? (
            <figcaption className="text-small text-text-alternative">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export const RichText = ({ value }: { value: PortableTextBlock[] }) => (
  <div className="flex flex-col gap-6">
    <PortableText value={value} components={components} />
  </div>
);
