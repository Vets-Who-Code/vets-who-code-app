import { DOMAIN_TITLES } from "@data/curriculum-domains";
import {
    buildDomainPage,
    DOMAIN_IDS,
    domainJsonLd,
    educationalLevel,
} from "@lib/curriculum-domain";
import { EDGES, MANIFEST, SUBJECTS, TOPICS } from "@lib/curriculum-graph";

const page = (id: string) => {
    const built = buildDomainPage(id);
    if (!built) throw new Error(`no domain page for ${id}`);
    return built;
};

const topicIds = new Set(TOPICS.map((t) => t.id));

describe("curriculum domain pages", () => {
    it("publishes one id per domain the manifest declares", () => {
        expect(DOMAIN_IDS).toHaveLength(MANIFEST.counts.domains);
        expect(new Set(DOMAIN_IDS).size).toBe(DOMAIN_IDS.length);
        for (const id of DOMAIN_IDS) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    });

    it("titles every domain and nothing else", () => {
        expect(Object.keys(DOMAIN_TITLES).sort()).toEqual([...DOMAIN_IDS].sort());
        for (const id of DOMAIN_IDS) expect(DOMAIN_TITLES[id].trim()).not.toBe("");
    });

    it("returns null for an id that is not a domain", () => {
        expect(buildDomainPage("nope")).toBeNull();
        expect(buildDomainPage("lessons")).toBeNull();
    });

    it("keeps every domain's topic count and walks its topics in depth order", () => {
        for (const subject of SUBJECTS) {
            for (const domain of subject.domains) {
                const built = page(domain.id);
                expect(`${domain.id}=${built.topics.length}`).toBe(
                    `${domain.id}=${domain.topicCount}`
                );
                expect(built.subject.id).toBe(subject.id);
                const depths = built.topics.map((t) => t.depth);
                expect(depths).toEqual([...depths].sort((a, b) => a - b));
                expect(built.depthRange).toEqual([depths[0], depths[depths.length - 1]]);
            }
        }
    });

    it("accounts for every edge exactly once across the domains", () => {
        const pages = DOMAIN_IDS.map(page);
        const intra = pages.reduce((n, p) => n + p.counts.intraEdges, 0);
        const crossIn = pages.reduce((n, p) => n + p.counts.crossIn, 0);
        const crossOut = pages.reduce((n, p) => n + p.counts.crossOut, 0);
        expect(intra + crossIn).toBe(EDGES.length);
        expect(crossIn).toBe(crossOut);
        for (const p of pages) {
            expect(p.prerequisites.reduce((n, g) => n + g.edges.length, 0)).toBe(p.counts.crossIn);
            expect(p.unlocks.reduce((n, g) => n + g.edges.length, 0)).toBe(p.counts.crossOut);
        }
    });

    it("treats filesystem as an entry point that holds up eight domains", () => {
        const fs = page("filesystem");
        expect(fs.prerequisites).toEqual([]);
        expect(fs.unlocks.map((g) => g.domain.id).sort()).toEqual([
            "editor",
            "nextjs",
            "processes",
            "remote",
            "shell-config",
            "shell-streams",
            "text-processing",
            "version-control",
        ]);
    });

    it("lists vectors among what retrieval rests on", () => {
        const upstream = page("retrieval").prerequisites.map((g) => g.domain);
        expect(upstream).toContainEqual({ id: "vectors", title: DOMAIN_TITLES.vectors });
    });

    it("resolves every link to a real topic with a written reason", () => {
        const edges = DOMAIN_IDS.map(page).flatMap((built) => [
            ...built.topics.flatMap((t) => t.restsOn),
            ...built.prerequisites.flatMap((g) => g.edges),
            ...built.unlocks.flatMap((g) => g.edges),
        ]);
        const broken = edges.filter(
            (e) => !topicIds.has(e.from.id) || !topicIds.has(e.to.id) || !e.reason.trim()
        );
        expect(broken).toEqual([]);
    });

    it("keeps each link on the right side of the domain boundary", () => {
        const pages = DOMAIN_IDS.map(page);
        const strayRestsOn = pages.flatMap((p) =>
            p.topics.flatMap((t) => t.restsOn.filter((e) => e.to.id !== t.id))
        );
        const strayInbound = pages.flatMap((p) =>
            p.prerequisites.flatMap((g) =>
                g.edges.filter((e) => e.from.domain !== g.domain.id || e.to.domain !== p.id)
            )
        );
        const strayOutbound = pages.flatMap((p) =>
            p.unlocks.flatMap((g) =>
                g.edges.filter((e) => e.to.domain !== g.domain.id || e.from.domain !== p.id)
            )
        );
        expect([...strayRestsOn, ...strayInbound, ...strayOutbound]).toEqual([]);
    });

    it("puts load-bearing groups and links first", () => {
        const hard = (edges: { strength: string }[]) =>
            edges.filter((e) => e.strength === "hard").length;
        for (const id of DOMAIN_IDS) {
            const built = page(id);
            for (const groups of [built.prerequisites, built.unlocks]) {
                const counts = groups.map((g) => hard(g.edges));
                expect(counts).toEqual([...counts].sort((a, b) => b - a));
                for (const g of groups) {
                    const firstSoft = g.edges.findIndex((e) => e.strength === "soft");
                    if (firstSoft >= 0) {
                        expect(g.edges.slice(firstSoft).every((e) => e.strength === "soft")).toBe(
                            true
                        );
                    }
                }
            }
        }
    });

    it("bands educationalLevel by the shallowest topic", () => {
        expect(educationalLevel(0)).toBe("Beginner");
        expect(educationalLevel(3)).toBe("Beginner");
        expect(educationalLevel(4)).toBe("Intermediate");
        expect(educationalLevel(8)).toBe("Intermediate");
        expect(educationalLevel(9)).toBe("Advanced");
        expect(domainJsonLd(page("filesystem")).educationalLevel).toBe("Beginner");
        expect(domainJsonLd(page("react")).educationalLevel).toBe("Intermediate");
        expect(domainJsonLd(page("harness")).educationalLevel).toBe("Advanced");
    });

    it("emits a LearningResource that is part of the Course at /curriculum", () => {
        const built = page("retrieval");
        const json = domainJsonLd(built);
        expect(json["@type"]).toBe("LearningResource");
        expect(json.name).toBe(DOMAIN_TITLES.retrieval);
        expect(json.url).toBe("https://vetswhocode.io/curriculum/retrieval");
        expect(json.teaches).toEqual(built.topics.map((t) => t.label));
        const required = built.prerequisites.flatMap((g) => g.edges.map((e) => e.from.label));
        expect(new Set(json.competencyRequired)).toEqual(new Set(required));
        expect(json.isPartOf).toMatchObject({
            "@type": "Course",
            name: `${MANIFEST.name} ${MANIFEST.version}`,
            url: "https://vetswhocode.io/curriculum",
        });
        expect(json.isAccessibleForFree).toBe(true);
    });

    it("omits competencyRequired when nothing outside the domain sits under it", () => {
        expect(domainJsonLd(page("filesystem"))).not.toHaveProperty("competencyRequired");
    });

    it("derives a description from the domain's own counts", () => {
        const built = page("js-core");
        expect(built.description).toContain(`${built.topics.length} micro-topics`);
        expect(built.description).toContain(built.subject.title);
        expect(built.description).toContain(built.topics[0].label);
    });
});
