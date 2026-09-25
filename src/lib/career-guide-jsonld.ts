import { buildGuideMeta } from "@containers/career-guide-detail/derive";
import type { CareerGuideDetail } from "@containers/career-guide-detail/types";
import socMap from "@data/mos-to-soc-map.json";
import siteConfig from "@data/site-config";
import { facetHref } from "@/lib/career-guide-facets";

type JsonLdNode = Record<string, unknown>;

// mos-to-soc-map.json is keyed by training-pipeline key, and a guide's slug is that key
// lowercased. Every key the map gains (#1150) is picked up without a code change.
const socBySlug = new Map<string, Array<{ soc: string; role: string }>>(
    Object.entries(socMap).map(([key, entries]) => [key.toLowerCase(), entries])
);

const median = (values: number[]): number => {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
};

/** The detail page's schema.org graph: WebPage, BreadcrumbList, Occupation, program. */
export const buildCareerGuideJsonLd = (
    detail: CareerGuideDetail,
    slug: string
): { "@context": string; "@graph": JsonLdNode[] } => {
    const { code, branch, training } = detail;
    const url = `${siteConfig.url}/career-guides/${slug}`;
    const { title, description } = buildGuideMeta(detail);

    // Salaries of the guide's own matched civilian pathways. With none, the listing and the
    // salary band fall back to a placeholder range, which is never published as salary data.
    const salaries = detail.pathways.map((p) => p.avgSalary).filter((s) => typeof s === "number");
    const socCodes = Array.from(new Set((socBySlug.get(slug) ?? []).map((e) => e.soc)));

    const crumbs: Array<[string, string]> = [
        ["Home", siteConfig.url],
        ["Career Guides", `${siteConfig.url}/career-guides`],
        [branch, `${siteConfig.url}${facetHref({ kind: "branch", value: branch }, 1)}`],
        [code, url],
    ];

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": url,
                url,
                name: title,
                description,
                breadcrumb: { "@id": `${url}#breadcrumb` },
                mainEntity: { "@id": `${url}#occupation` },
                creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: crumbs.map(([name, item], i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    name,
                    item,
                })),
            },
            {
                "@type": "Occupation",
                "@id": `${url}#occupation`,
                name: training.title,
                description: `${branch} ${code} (${training.title}): ${training.hours.toLocaleString("en-US")} hours of formal military training.${
                    salaries.length > 0
                        ? ` Estimated salary is the median of its ${salaries.length} matched civilian career pathways.`
                        : ""
                }`,
                occupationLocation: { "@type": "Country", name: "United States" },
                skills: training.topics,
                ...(salaries.length > 0 && {
                    estimatedSalary: {
                        "@type": "MonetaryAmountDistribution",
                        currency: "USD",
                        duration: "P1Y",
                        median: median(salaries),
                    },
                }),
                ...(socCodes.length > 0 && { occupationalCategory: socCodes }),
            },
            {
                "@type": "EducationalOccupationalProgram",
                "@id": `${url}#program`,
                name: training.program,
                provider: { "@type": "Organization", name: `United States ${branch}` },
                ...(training.weeks !== undefined && { timeToComplete: `P${training.weeks}W` }),
            },
        ],
    };
};
