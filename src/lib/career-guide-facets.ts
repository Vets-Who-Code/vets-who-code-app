import { BRANCH_ORDER } from "@containers/career-guides/branch-meta";
import type { Branch, Family, GuideEntry } from "@containers/career-guides/types";

// Facet URLs for the /career-guides listing. No fs/path imports: the filters and the
// category showcase import this module into the browser bundle.

export const PAGE_SIZE = 60;

export const FAMILIES: Family[] = [
    "Cyber",
    "IT / Comms",
    "Aviation",
    "Intelligence",
    "Logistics",
    "Medical",
    "Engineering",
    "Operations",
    "Maintenance",
    "Administration",
    "Other",
];

// Explicit maps rather than slugify(): the unions are closed and the reverse lookup must be exact.
export const BRANCH_SLUGS: Record<Branch, string> = {
    Army: "army",
    Navy: "navy",
    "Air Force": "air-force",
    "Marine Corps": "marine-corps",
    "Coast Guard": "coast-guard",
};

export const FAMILY_SLUGS: Record<Family, string> = {
    Cyber: "cyber",
    "IT / Comms": "it-comms",
    Aviation: "aviation",
    Intelligence: "intelligence",
    Logistics: "logistics",
    Medical: "medical",
    Engineering: "engineering",
    Operations: "operations",
    Maintenance: "maintenance",
    Administration: "administration",
    Other: "other",
};

// What each branch calls its job codes.
const BRANCH_TERMS: Record<Branch, string> = {
    Army: "MOS",
    Navy: "Rating",
    "Air Force": "AFSC",
    "Marine Corps": "MOS",
    "Coast Guard": "Rating",
};

export type Facet =
    | { kind: "all" }
    | { kind: "branch"; value: Branch }
    | { kind: "family"; value: Family };

export const ALL_FACETS: Facet[] = [
    { kind: "all" },
    ...BRANCH_ORDER.map((value): Facet => ({ kind: "branch", value })),
    ...FAMILIES.map((value): Facet => ({ kind: "family", value })),
];

const facetRoot = (facet: Facet): string => {
    if (facet.kind === "branch") return `/career-guides/branch/${BRANCH_SLUGS[facet.value]}`;
    if (facet.kind === "family") return `/career-guides/family/${FAMILY_SLUGS[facet.value]}`;
    return "/career-guides";
};

/** Page 1 is the facet root; there is never a /page/1 URL. */
export const facetHref = (facet: Facet, page: number): string =>
    page === 1 ? facetRoot(facet) : `${facetRoot(facet)}/page/${page}`;

/**
 * Catch-all segments after /career-guides/ → facet and page. Only a URL that facetHref would
 * build parses, so /page/1, /page/02, unknown slugs and the bare index all return null.
 */
export const parseFacetSegments = (segments: string[]): { facet: Facet; page: number } | null => {
    const path = `/career-guides/${segments.join("/")}`;
    const match = path.match(/^(.*)\/page\/([1-9]\d*)$/);
    const root = match ? match[1] : path;
    const page = match ? Number(match[2]) : 1;
    const facet = ALL_FACETS.find((f) => facetHref(f, 1) === root);
    return facet && facetHref(facet, page) === path ? { facet, page } : null;
};

export const facetRows = (guides: GuideEntry[], facet: Facet): GuideEntry[] => {
    if (facet.kind === "branch") return guides.filter((g) => g.branch === facet.value);
    if (facet.kind === "family") return guides.filter((g) => g.family === facet.value);
    return guides;
};

export const paginate = <T>(rows: T[], page: number) => ({
    rows: rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    totalPages: Math.ceil(rows.length / PAGE_SIZE),
});

/** Short name for breadcrumbs: "Army", "Cyber", "All guides". */
export const facetLabel = (facet: Facet): string =>
    facet.kind === "all" ? "All guides" : facet.value;

/** The "From ___ to civilian career" subject: "Army MOS", "Cyber job code". */
export const facetSubject = (facet: Facet): string => {
    if (facet.kind === "branch") return `${facet.value} ${BRANCH_TERMS[facet.value]}`;
    if (facet.kind === "family") {
        return facet.value === "Other" ? "any other job code" : `${facet.value} job code`;
    }
    return "job code";
};

/** Title and meta description for a listing page, unique per facet and page. */
export const facetSeo = (
    facet: Facet,
    page: number,
    count: number,
    totalPages: number
): { title: string; description: string } => {
    const guides = count.toLocaleString();
    const detail =
        "Each job code maps to a civilian career with salary bands, certifications, and demand signals from Lightcast labor data.";
    let title = "Military Job Codes to Civilian Tech Careers";
    let lead = `Browse all ${guides} military career guides across all five branches.`;
    if (facet.kind === "branch") {
        title = `${facetSubject(facet)} to Civilian Tech Careers`;
        lead = `Browse ${guides} ${facetSubject(facet)} career guides.`;
    } else if (facet.kind === "family") {
        title =
            facet.value === "Other"
                ? "Other Military Jobs to Civilian Tech Careers"
                : `Military ${facet.value} Jobs to Civilian Tech Careers`;
        lead = `Browse ${guides} ${facet.value === "Other" ? "more" : facet.value} military career guides across all five branches.`;
    }
    const pageNote = page > 1 ? `Page ${page} of ${totalPages}` : "";
    return {
        title: pageNote ? `${title} — ${pageNote}` : title,
        description: pageNote ? `${lead} ${detail} ${pageNote}.` : `${lead} ${detail}`,
    };
};

export interface FamilyStat {
    count: number;
    /** Median of the guides' low / high civilian salary, in $K */
    medianLow: number;
    medianHigh: number;
}

export const computeFamilyStats = (guides: GuideEntry[]): Record<Family, FamilyStat> => {
    const middle = (values: number[]) =>
        values.sort((a, b) => a - b)[Math.floor(values.length / 2)] ?? 0;
    const stats = {} as Record<Family, FamilyStat>;
    for (const family of FAMILIES) {
        const rows = guides.filter((g) => g.family === family);
        stats[family] = {
            count: rows.length,
            medianLow: middle(rows.map((r) => r.salaryLow)),
            medianHigh: middle(rows.map((r) => r.salaryHigh)),
        };
    }
    return stats;
};
