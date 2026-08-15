/** Shared shaping helpers for the content scripts. */

/**
 * Drops keys whose value is null or undefined, and arrays that came back empty,
 * so an absent value stays absent rather than becoming an explicit `null` that
 * the data modules' optional types would reject.
 */
export const prune = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map(prune).filter((item) => item !== undefined) as T;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => [key, prune(val)] as const)
      .filter(([, val]) => {
        if (val === null || val === undefined) return false;
        if (Array.isArray(val) && val.length === 0) return false;
        return true;
      });
    return Object.fromEntries(entries) as T;
  }
  return value;
};

/** File sizes as a reader would write them, from a real byte count. */
export const formatBytes = (bytes: number | null | undefined) => {
  if (typeof bytes !== "number" || bytes <= 0) return undefined;
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

/**
 * Re-keys portable text by position.
 *
 * Sanity's `_key` values are random, which would make every build write a
 * different file for unchanged content and bury real edits in noise. Position
 * is stable and is all a statically rendered article needs.
 *
 * `markDefs` keys are deliberately left alone — a span's `marks` array points at
 * them by name, and renaming one would sever the link between text and its link.
 */
export const rekey = (blocks: unknown[]): unknown[] =>
  blocks.map((block, index) => {
    const node = { ...(block as Record<string, unknown>), _key: `b${index}` };
    if (Array.isArray(node.children)) {
      node.children = node.children.map((child, childIndex) => ({
        ...(child as Record<string, unknown>),
        _key: `b${index}s${childIndex}`,
      }));
    }
    return node;
  });

/**
 * Sorts object keys so the written files are canonical.
 *
 * GROQ returns keys alphabetically regardless of the order the projection asks
 * for them in, so without this the committed JSON's key order is decided by the
 * query engine. Sorting everything makes the output depend only on the content,
 * which is what makes a diff of these files worth reading.
 *
 * Arrays keep their order — that is content, not formatting.
 */
const canonical = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([key, val]) => [key, canonical(val)]),
    );
  }
  return value;
};

export const serialise = (data: unknown) =>
  `${JSON.stringify(canonical(prune(data)), null, 2)}\n`;
