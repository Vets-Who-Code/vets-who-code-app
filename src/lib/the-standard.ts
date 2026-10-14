import { DOMAIN_TITLES } from "@data/curriculum-domains";
import { FEATURED_BANDS } from "@data/the-standard";
import { type ExitDepth, MANIFEST, SUBJECTS, type Topic } from "./curriculum-graph";
import { TOPICS } from "./curriculum-graph-data";

export type StandardTopic = Pick<Topic, "id" | "label" | "evidence" | "exitDepth">;

export type StandardDomain = { id: string; title: string; topics: StandardTopic[] };

export type StandardSubject = {
    id: string;
    title: string;
    topicCount: number;
    domains: StandardDomain[];
};

export type FeaturedCriterion = StandardTopic & {
    depth: number;
    domain: { id: string; title: string };
};

export type FeaturedBand = {
    title: string;
    depthRange: [number, number];
    criteria: FeaturedCriterion[];
};

export type StandardPage = {
    /** Meta description, computed so it can't contradict the page's own counts. */
    description: string;
    counts: { topics: number; edges: number; subjects: number; domains: number };
    exitSplit: Record<ExitDepth, number>;
    featured: FeaturedBand[];
    subjects: StandardSubject[];
    structureAdaptedFrom: { name: string; url: string; license: string };
};

/**
 * Shapes /the-standard from the graph. Called from getStaticProps only, so the full topic list
 * never reaches the client bundle; page data carries just label, evidence and exit depth.
 */
export function buildStandardPage(): StandardPage {
    const byId: Record<string, Topic> = {};
    for (const t of TOPICS) byId[t.id] = t;

    const slim = (t: Topic): StandardTopic => ({
        id: t.id,
        label: t.label,
        evidence: t.evidence,
        exitDepth: t.exitDepth,
    });

    const exitSplit: Record<ExitDepth, number> = { guided: 0, scaffolded: 0, unassisted: 0 };
    for (const t of TOPICS) exitSplit[t.exitDepth] += 1;

    const featured = FEATURED_BANDS.map((band) => {
        const criteria = band.topicIds.map((id) => {
            const t = byId[id];
            if (!t) throw new Error(`the-standard: unknown featured topic "${id}"`);
            return {
                ...slim(t),
                depth: t.depth,
                domain: { id: t.domain, title: DOMAIN_TITLES[t.domain] },
            };
        });
        const depths = criteria.map((c) => c.depth);
        return {
            title: band.title,
            depthRange: [Math.min(...depths), Math.max(...depths)] as [number, number],
            criteria,
        };
    });

    // Subject and domain order follow subjects.json; topics within a domain run in
    // prerequisite order, as on the domain pages.
    const subjects = SUBJECTS.map((s) => ({
        id: s.id,
        title: s.title,
        topicCount: s.topicCount,
        domains: s.domains.map((d) => ({
            id: d.id,
            title: DOMAIN_TITLES[d.id],
            topics: TOPICS.filter((t) => t.domain === d.id)
                .sort((a, b) => a.depth - b.depth)
                .map(slim),
        })),
    }));

    const { counts } = MANIFEST;
    return {
        description:
            `${counts.topics} topics, each with the evidence that proves you have it. The ` +
            "standard Vets Who Code trains every troop to, in code and in code review.",
        counts: {
            topics: counts.topics,
            edges: counts.edges,
            subjects: counts.subjects,
            domains: counts.domains,
        },
        exitSplit,
        featured,
        subjects,
        structureAdaptedFrom: MANIFEST.structureAdaptedFrom,
    };
}
