import { ancestors, buildGraph, EDGES, PHASE_MODULES, TOPICS } from "@/lib/curriculum-graph";

describe("curriculum graph dataset", () => {
    it("resolves every edge endpoint to a topic", () => {
        const ids = new Set(TOPICS.map((t) => t.id));
        const dangling = EDGES.filter((e) => !ids.has(e.from) || !ids.has(e.to));
        expect(dangling).toEqual([]);
    });

    it("carries a written reason on every edge", () => {
        const silent = EDGES.filter((e) => !e.reason?.trim());
        expect(silent).toEqual([]);
    });

    it("is acyclic — nothing is its own prerequisite", () => {
        const graph = buildGraph(TOPICS, EDGES);
        expect(graph).not.toBeNull();
        for (const topic of TOPICS) {
            const upstream = ancestors(graph, topic.id);
            const selfCycle = graph?.succs[topic.id].some((e) => upstream.has(e.to));
            expect(selfCycle).toBe(false);
        }
    });

    it("assigns every topic to a declared phase", () => {
        const phases = new Set(PHASE_MODULES.map((p) => p.phaseIndex));
        const orphans = TOPICS.filter((t) => !phases.has(t.phaseIndex));
        expect(orphans).toEqual([]);
    });
});

describe("buildGraph", () => {
    it("places a dependent strictly below its prerequisite", () => {
        const graph = buildGraph(TOPICS, EDGES);
        expect(graph).not.toBeNull();
        if (!graph) return;
        for (const e of graph.edges) {
            expect(graph.positions[e.to].y).toBeGreaterThan(graph.positions[e.from].y);
        }
    });

    it("drops hidden phases and the edges that touched them", () => {
        const graph = buildGraph(TOPICS, EDGES, new Set([5, 6]));
        expect(graph).not.toBeNull();
        expect(graph?.topics.every((t) => t.phaseIndex < 5)).toBe(true);
        const ids = new Set(graph?.topics.map((t) => t.id));
        expect(graph?.edges.every((e) => ids.has(e.from) && ids.has(e.to))).toBe(true);
    });

    it("returns null when every phase is hidden", () => {
        expect(buildGraph(TOPICS, EDGES, new Set([1, 2, 3, 4, 5, 6]))).toBeNull();
    });
});

describe("ancestors", () => {
    it("walks the full transitive prerequisite closure", () => {
        const topics = [1, 2, 3, 4].map((n) => ({
            id: `T0${n}`,
            name: `Topic ${n}`,
            unit: "Unit",
            phase: "Foundations",
            phaseIndex: 1,
            type: "conceptual" as const,
            exitDepth: "performed alone" as const,
            roleBand: "Pre-band",
            marketAnchor: "anchor",
            evidence: "evidence",
        }));
        const edges = [
            { from: "T01", to: "T02", kind: "required" as const, reason: "r" },
            { from: "T02", to: "T03", kind: "helpful" as const, reason: "r" },
            { from: "T04", to: "T03", kind: "required" as const, reason: "r" },
        ];
        const graph = buildGraph(topics, edges);
        expect(Array.from(ancestors(graph, "T03")).sort()).toEqual(["T01", "T02", "T03", "T04"]);
        expect(Array.from(ancestors(graph, "T01"))).toEqual(["T01"]);
        expect(ancestors(graph, null).size).toBe(0);
    });
});
