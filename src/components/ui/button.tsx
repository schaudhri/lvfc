import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // A visible focus ring is required — never replace this with `outline-none`
  // alone. Keyboard and switch users have no other way to see where they are.
  "inline-flex items-center justify-center gap-3 rounded-full whitespace-nowrap transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-darkest focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-brand-champagne bg-brand-champagne text-brand-midnight",
        alternate: "border border-white bg-white text-neutral-darkest",
        secondary: "border border-scheme-border text-scheme-text",
        "secondary-alt": "border border-white text-white",
        link: "gap-2 text-scheme-text",
        "link-alt": "gap-2 text-white",
        ghost: "hover:bg-neutral-darkest hover:text-white",
        none: "",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-5 py-2",
        link: "p-0",
        icon: "size-10",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    /**
     * Where this button goes. Section components spread a props object onto
     * `<Button>`, so putting the destination here is what makes every CTA in
     * the site navigable — without it a `<Button>` renders as an inert
     * `<button>` with no handler.
     *
     * Internal paths render a router `<Link>` (no full page reload); external
     * URLs, `mailto:` and `tel:` render a plain anchor.
     */
    url?: string;
  };

const isInternalRoute = (url: string) => url.startsWith("/");

function Button({
  className,
  variant,
  size,
  asChild = false,
  iconLeft,
  iconRight,
  children,
  url,
  // `title` carries the button's label in this codebase's data objects. It is
  // also a real HTML attribute, so spreading it onto the element produces a
  // native tooltip duplicating the visible text. Pull it out and drop it.
  title: _label,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (asChild) {
    // Slot merges its props onto its child, so its children must be passed
    // inline — wrapping them in a Fragment makes Slot try to clone the Fragment.
    return (
      <Slot data-slot="button" className={classes} {...props}>
        {iconLeft && iconLeft}
        <Slottable>{children}</Slottable>
        {iconRight && iconRight}
      </Slot>
    );
  }

  if (url) {
    // Button-only attributes (type, disabled, form…) and button-typed refs and
    // handlers aren't valid on an anchor, so forward only what both accept.
    const { type: _type, disabled: _disabled, form: _form, ref: _ref, ...rest } = props;
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    const linkContent = (
      <>
        {iconLeft && iconLeft}
        {children}
        {iconRight && iconRight}
      </>
    );

    if (isInternalRoute(url)) {
      return (
        <Link data-slot="button" to={url} className={classes} {...anchorProps}>
          {linkContent}
        </Link>
      );
    }

    const external = url.startsWith("http");
    return (
      <a
        data-slot="button"
        href={url}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <button data-slot="button" className={classes} {...props}>
      {iconLeft && iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight && iconRight}
    </button>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
