import { DOMAIN_TITLES } from "@data/curriculum-domains";
import siteConfig from "@data/site-config";
import {
    EDGES,
    type EdgeStrength,
    MANIFEST,
    SUBJECT_BANDS,
    SUBJECTS,
    TOPICS,
    type Topic,
} from "./curriculum-graph";

/** One page per domain. Source list for getStaticPaths, in subject order. */
export const DOMAIN_IDS: string[] = SUBJECTS.flatMap((s) => s.domains.map((d) => d.id));

export type TopicRef = { id: string; label: string; domain: string };

/** A prerequisite link with both ends resolved: `to` rests on `from`. */
export type DomainEdge = {
    from: TopicRef;
    to: TopicRef;
    strength: EdgeStrength;
    reason: string;
};

export type DomainTopic = Topic & {
    /** Everything this topic rests on, load-bearing links first. */
    restsOn: DomainEdge[];
};

/** Cross-domain links, grouped by the domain on the other end. */
export type DomainEdgeGroup = {
    domain: { id: string; title: string };
    edges: DomainEdge[];
};

export type DomainPage = {
    id: string;
    title: string;
    description: string;
    subject: { id: string; title: string };
    band: string;
    /** Whole-graph figures the page quotes, carried here so the client never imports the graph. */
    graph: { topics: number; maxDepth: number };
    topics: DomainTopic[];
    /** Links in from other domains — what to know before starting here. */
    prerequisites: DomainEdgeGroup[];
    /** Links out to other domains — what this domain holds up. */
    unlocks: DomainEdgeGroup[];
    depthRange: [number, number];
    counts: { intraEdges: number; crossIn: number; crossOut: number };
};

const byId: Record<string, Topic> = {};
for (const t of TOPICS) byId[t.id] = t;

const ref = (t: Topic): TopicRef => ({ id: t.id, label: t.label, domain: t.domain });

const resolved: DomainEdge[] = EDGES.map((e) => ({
    from: ref(byId[e.prerequisiteId]),
    to: ref(byId[e.topicId]),
    strength: e.strength,
    reason: e.reason,
}));

/** Load-bearing links before supporting ones; otherwise file order (sort is stable). */
const hardFirst = (a: DomainEdge, b: DomainEdge) => {
    if (a.strength === b.strength) return 0;
    return a.strength === "hard" ? -1 : 1;
};

/** Groups with the most load-bearing links first, then by id so the order is deterministic. */
function groupByDomain(edges: DomainEdge[], side: "from" | "to"): DomainEdgeGroup[] {
    const groups: Record<string, DomainEdge[]> = {};
    for (const e of edges) {
        const key = e[side].domain;
        groups[key] = groups[key] || [];
        groups[key].push(e);
    }
    const hardCount = (list: DomainEdge[]) => list.filter((e) => e.strength === "hard").length;
    return Object.keys(groups)
        .sort((a, b) => hardCount(groups[b]) - hardCount(groups[a]) || a.localeCompare(b))
        .map((id) => ({
            domain: { id, title: DOMAIN_TITLES[id] },
            edges: groups[id].slice().sort(hardFirst),
        }));
}

export function buildDomainPage(id: string): DomainPage | null {
    const subject = SUBJECTS.find((s) => s.domains.some((d) => d.id === id));
    if (!subject) return null;

    // File order within a domain is not depth-sorted, and depth is the route through it.
    const topics = TOPICS.filter((t) => t.domain === id)
        .slice()
        .sort((a, b) => a.depth - b.depth)
        .map((t) => ({
            ...t,
            restsOn: resolved.filter((e) => e.to.id === t.id).sort(hardFirst),
        }));

    const inbound = resolved.filter((e) => e.to.domain === id && e.from.domain !== id);
    const outbound = resolved.filter((e) => e.from.domain === id && e.to.domain !== id);
    const intra = resolved.filter((e) => e.to.domain === id && e.from.domain === id);
    const depths = topics.map((t) => t.depth);
    const title = DOMAIN_TITLES[id];

    return {
        id,
        title,
        // Derived, not typed, like the /curriculum description: the preview must not
        // contradict the page's own counts.
        description:
            `${topics.length} micro-topics in ${subject.title} — each with the evidence that ` +
            "proves you have it, what it rests on and what it unlocks. Free, from Vets Who Code.",
        subject: { id: subject.id, title: subject.title },
        band: SUBJECT_BANDS.find((b) => b.subjects.includes(subject.id))?.label ?? "",
        graph: { topics: MANIFEST.counts.topics, maxDepth: MANIFEST.counts.maxDepth },
        topics,
        prerequisites: groupByDomain(inbound, "from"),
        unlocks: groupByDomain(outbound, "to"),
        depthRange: [Math.min(...depths), Math.max(...depths)],
        counts: { intraEdges: intra.length, crossIn: inbound.length, crossOut: outbound.length },
    };
}

/**
 * Heuristic, not data. schema.org's `educationalLevel` is free text; we derive it from the
 * shallowest topic in the domain — how much has to sit under you before you can start —
 * banded 0–3 Beginner, 4–8 Intermediate, 9+ Advanced. On the dataset as shipped that gives
 * 36 / 14 / 3, skewed to Beginner because many domains open at depth 0 and run deep.
 */
export function educationalLevel(minDepth: number): string {
    if (minDepth <= 3) return "Beginner";
    if (minDepth <= 8) return "Intermediate";
    return "Advanced";
}

export function domainJsonLd(page: DomainPage) {
    const provider = { "@type": "Organization", name: siteConfig.name, url: siteConfig.url };
    const required = Array.from(
        new Set(page.prerequisites.flatMap((g) => g.edges.map((e) => e.from.label)))
    );
    return {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: page.title,
        description: page.description,
        url: `${siteConfig.url}/curriculum/${page.id}`,
        learningResourceType: "Curriculum unit",
        educationalLevel: educationalLevel(page.depthRange[0]),
        teaches: page.topics.map((t) => t.label),
        ...(required.length > 0 ? { competencyRequired: required } : {}),
        isPartOf: {
            "@type": "Course",
            name: `${MANIFEST.name} ${MANIFEST.version}`,
            url: `${siteConfig.url}/curriculum`,
            provider,
        },
        provider,
        isAccessibleForFree: true,
        inLanguage: "en",
    };
}
