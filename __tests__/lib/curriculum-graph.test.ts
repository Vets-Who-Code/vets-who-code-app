import {
    ancestors,
    bandColor,
    buildGraph,
    computeDepths,
    EDGES,
    MANIFEST,
    SUBJECT_BANDS,
    SUBJECTS,
    TOPICS,
    type Topic,
} from "@/lib/curriculum-graph";

const topic = (id: string, subject: string, overrides: Partial<Topic> = {}): Topic => ({
    id,
    label: `Topic ${id}`,
    description: "description",
    subject,
    domain: "domain",
    type: "conceptual",
    exitDepth: "unassisted",
    evidence: "evidence",
    marketAnchor: ["anchor"],
    source: "M01 §1.1",
    depth: 0,
    ...overrides,
});

describe("curriculum graph dataset", () => {
    it("matches the counts its own manifest declares", () => {
        expect(TOPICS).toHaveLength(MANIFEST.counts.topics);
        expect(EDGES).toHaveLength(MANIFEST.counts.edges);
        expect(SUBJECTS).toHaveLength(MANIFEST.counts.subjects);
        expect(EDGES.filter((e) => e.strength === "hard")).toHaveLength(MANIFEST.counts.hardEdges);
        expect(EDGES.filter((e) => e.strength === "soft")).toHaveLength(MANIFEST.counts.softEdges);
        expect(SUBJECTS.reduce((n, s) => n + s.domains.length, 0)).toBe(MANIFEST.counts.domains);
        expect(SUBJECTS.reduce((n, s) => n + s.topicCount, 0)).toBe(TOPICS.length);
    });

    it("resolves every edge endpoint to a topic", () => {
        const ids = new Set(TOPICS.map((t) => t.id));
        const dangling = EDGES.filter((e) => !ids.has(e.topicId) || !ids.has(e.prerequisiteId)).map(
            (e) => `${e.prerequisiteId} -> ${e.topicId}`
        );
        expect(dangling).toEqual([]);
    });

    it("carries a written reason on every edge", () => {
        const silent = EDGES.filter((e) => !e.reason?.trim()).map(
            (e) => `${e.prerequisiteId} -> ${e.topicId}`
        );
        expect(silent).toEqual([]);
    });

    it("is acyclic — nothing is its own prerequisite", () => {
        expect(MANIFEST.acyclic).toBe(true);
        const graph = buildGraph(TOPICS, EDGES);
        expect(graph).not.toBeNull();
        const offenders = TOPICS.filter((t) => {
            const upstream = ancestors(graph, t.id);
            return graph?.succs[t.id].some((e) => upstream.has(e.topicId));
        }).map((t) => t.id);
        expect(offenders).toEqual([]);
    });

    it("assigns every topic to a declared subject and domain", () => {
        const declared = new Map(SUBJECTS.map((s) => [s.id, new Set(s.domains.map((d) => d.id))]));
        const orphans = TOPICS.filter(
            (t) => !declared.has(t.subject) || !declared.get(t.subject)?.has(t.domain)
        ).map((t) => `${t.id} (${t.subject}/${t.domain})`);
        expect(orphans).toEqual([]);
    });

    it("gives every subject a colour band", () => {
        const banded = new Set(SUBJECT_BANDS.flatMap((b) => b.subjects));
        expect(SUBJECTS.filter((s) => !banded.has(s.id))).toEqual([]);
        expect(bandColor("systems")).toBe("#FFFFFF");
        expect(bandColor("ai")).toBe("#c5203e");
    });
});

describe("depth", () => {
    // The dataset ships a precomputed `depth`. Reproducing it is what proves our layering
    // agrees with the data: longest path over hard edges only, because a soft edge does
    // not block and so must not push a concept deeper.
    it("reproduces the shipped depth field exactly", () => {
        const computed = computeDepths(TOPICS, EDGES);
        const mismatched = TOPICS.filter((t) => computed[t.id] !== t.depth).map(
            (t) => `${t.id}: computed ${computed[t.id]} vs shipped ${t.depth}`
        );
        expect(mismatched).toEqual([]);
        expect(Math.max(...Object.values(computed))).toBe(MANIFEST.counts.maxDepth);
    });

    it("would not reproduce it if soft edges counted toward depth", () => {
        const asIfAllHard = EDGES.map((e) => ({ ...e, strength: "hard" as const }));
        const inflated = computeDepths(TOPICS, asIfAllHard);
        expect(Math.max(...Object.values(inflated))).toBeGreaterThan(MANIFEST.counts.maxDepth);
    });

    it("counts roots and terminals the way the manifest does", () => {
        const hard = EDGES.filter((e) => e.strength === "hard");
        const hasPrereq = new Set(hard.map((e) => e.topicId));
        const unlocks = new Set(hard.map((e) => e.prerequisiteId));
        expect(TOPICS.filter((t) => !hasPrereq.has(t.id))).toHaveLength(MANIFEST.counts.roots);
        expect(TOPICS.filter((t) => !unlocks.has(t.id))).toHaveLength(MANIFEST.counts.terminals);
    });
});

describe("buildGraph", () => {
    it("places a dependent strictly below every blocking prerequisite", () => {
        const graph = buildGraph(TOPICS, EDGES);
        expect(graph).not.toBeNull();
        if (!graph) return;
        const inverted = graph.edges
            .filter((e) => e.strength === "hard")
            .filter((e) => graph.positions[e.topicId].y <= graph.positions[e.prerequisiteId].y);
        expect(inverted).toEqual([]);
    });

    it("drops hidden subjects and the edges that touched them", () => {
        const graph = buildGraph(TOPICS, EDGES, new Set(["ai", "reliability"]));
        expect(graph).not.toBeNull();
        expect(graph?.topics.some((t) => t.subject === "ai")).toBe(false);
        const ids = new Set(graph?.topics.map((t) => t.id));
        expect(graph?.edges.every((e) => ids.has(e.topicId) && ids.has(e.prerequisiteId))).toBe(
            true
        );
    });

    it("returns null when every subject is hidden", () => {
        expect(buildGraph(TOPICS, EDGES, new Set(SUBJECTS.map((s) => s.id)))).toBeNull();
    });

    it("reports a bounding radius the camera can frame", () => {
        const graph = buildGraph(TOPICS, EDGES);
        expect(graph?.radius).toBeGreaterThan(0);
        const furthest = Math.max(
            ...Object.values(graph?.positions ?? {}).map((p) => Math.hypot(p.x, p.y, p.z))
        );
        expect(graph?.radius).toBeCloseTo(furthest, 6);
    });

    it("lays out the full dataset fast enough for a click", () => {
        buildGraph(TOPICS, EDGES); // warm
        const started = performance.now();
        buildGraph(TOPICS, EDGES);
        // Re-runs synchronously on every subject toggle, so it has to stay well clear of
        // a visible freeze. Generous bound — CI machines are slower than laptops.
        expect(performance.now() - started).toBeLessThan(400);
    });
});

describe("ancestors", () => {
    it("walks the full transitive prerequisite closure", () => {
        const topics = [
            topic("a", "systems"),
            topic("b", "systems"),
            topic("c", "systems"),
            topic("d", "systems"),
        ];
        const edges = [
            { prerequisiteId: "a", topicId: "b", strength: "hard" as const, reason: "r" },
            { prerequisiteId: "b", topicId: "c", strength: "soft" as const, reason: "r" },
            { prerequisiteId: "d", topicId: "c", strength: "hard" as const, reason: "r" },
        ];
        const graph = buildGraph(topics, edges);
        expect(Array.from(ancestors(graph, "c")).sort()).toEqual(["a", "b", "c", "d"]);
        expect(Array.from(ancestors(graph, "a"))).toEqual(["a"]);
        expect(ancestors(graph, null).size).toBe(0);
    });

    it("follows soft edges upstream even though they do not set depth", () => {
        const topics = [topic("a", "systems"), topic("b", "systems")];
        const edges = [
            { prerequisiteId: "a", topicId: "b", strength: "soft" as const, reason: "r" },
        ];
        const graph = buildGraph(topics, edges);
        expect(Array.from(ancestors(graph, "b")).sort()).toEqual(["a", "b"]);
        // Soft edge, so no depth separation: both sit on the same layer.
        expect(graph?.positions.a.y).toBe(graph?.positions.b.y);
    });
});
