/** Title handling for the generated Open Graph card (see src/pages/api/og.tsx). */

// Satori lays out one line at a time, so an unbounded title silently overflows
// the card rather than wrapping into oblivion. 90 chars is ~3 lines at 68px.
export const MAX_TITLE = 90;

export const OG_FALLBACK_TITLE = "Learn Software Engineering";

/**
 * Page titles arrive with the site name already appended by the SEO template
 * ("Our Programs | Vets Who Code"). The card carries the wordmark, so repeating
 * it just steals headline room.
 */
export const stripSiteName = (value: string) =>
    value.replace(/\s*[|\-–]\s*Vets Who Code\s*$/i, "").trim();

/** Cut on a word boundary — mid-word truncation ("YEAR ROU") reads as a bug. */
export const truncate = (value: string) => {
    if (value.length <= MAX_TITLE) return value;
    const clipped = value.slice(0, MAX_TITLE);
    const lastSpace = clipped.lastIndexOf(" ");
    // Only honour the boundary if it isn't so early that we'd drop half the title.
    const cut = lastSpace > MAX_TITLE * 0.6 ? clipped.slice(0, lastSpace) : clipped;
    return `${cut.trimEnd()}…`;
};

/** Full pipeline: raw query param → the string drawn on the card. */
export const cardTitle = (raw?: string | null) => {
    // Clamp before the regex, not after: stripSiteName backtracks over runs of
    // whitespace, so an unbounded query param would pay for it.
    const cleaned = raw ? stripSiteName(raw.slice(0, MAX_TITLE * 3).trim()) : "";
    // A title that is only the site name would print the wordmark twice.
    if (!cleaned || cleaned.toLowerCase() === "vets who code") return OG_FALLBACK_TITLE;
    return truncate(cleaned);
};
