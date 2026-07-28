# Spacing & grid system

The rules the site is now normalised to. Follow these when adding a section so the
page rhythm holds — most of the drift this document exists to prevent came from
hand-written page sections quietly using a shorter scale than the Relume
components they sat next to.

Audited and applied 28 July 2026 across all 12 routes.

## Horizontal grid

Every full-width band is the same two nested pieces:

```jsx
<section className="px-[5%] py-16 md:py-24 lg:py-28">
  <div className="container">…</div>
</section>
```

- `px-[5%]` is the page gutter. It is on the **section**, never the container.
- `.container` is centred and capped at `992px` (lg) / `1280px` (xl) — see
  `tailwind.config.js`. Below lg it is full-width and the gutter does the work.
- Because the 5% gutter is outside the container, the container only reaches its
  full 1280px at viewports ≥ ~1422px. That is expected, not a bug.

This is already consistent everywhere: every section's content shares one left
edge and one width. The only deliberate exception is a centred CTA block, which
narrows with `container max-w-lg text-center` (Header62, Cta27).

## Vertical rhythm

| Use | Classes | Renders (sm/md/lg) |
| --- | --- | --- |
| **Standard section** | `py-16 md:py-24 lg:py-28` | 64 / 96 / 112 |
| Section intro block (heading + standfirst above the content) | `mb-12 md:mb-18 lg:mb-20` | 48 / 72 / 80 |
| Heading → its own body copy | `mb-5 md:mb-6` | 20 / 24 |
| Label → value inside a card | `mb-3 md:mb-4` | 12 / 16 |

**Do not** invent intermediate steps. `md:py-20`, `md:mb-14` and `md:mb-16` were
the three most common drifted values and have all been removed.

### Legitimate exceptions

These are intentional and should stay off the standard scale:

- **Heroes** — sized by viewport (`min-h-[90vh]`, `min-h-svh`), not by the section scale.
- **Stitched pairs** — where two sections read as one block, the first takes
  `pt-16 md:pt-24 lg:pt-28` and the second `pb-16 md:pb-24 lg:pb-28`, so the
  padding between them isn't doubled. See "Meet our coaches" → "Coach with LVFC"
  on the landing page.
- **Compact utility bands** — filter bars (`py-6 md:py-8`), jump-link bars
  (`py-5`), footnote strips and inline callouts (`py-10`). These are chrome, not
  content sections.
- **Footer** — `py-12 md:py-18 lg:py-20`, per the Figma wireframe.

## Content grids

Two families. Pick by whether the items have card chrome.

**Text columns** (no border/fill) — the default:

```
grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-y-16
```

Row gap is deliberately larger than the column gap: stacked text blocks need
more vertical separation than horizontal to stop rows merging visually.

**Card grids** (bordered or filled items) sit tighter, because the card edge
already does the separating:

```
grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8
```

Used by `ProgrammeCards`. Don't widen it to match the text-column family — the
gap and the border would double up.
