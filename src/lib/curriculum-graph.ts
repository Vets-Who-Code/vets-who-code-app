import edgesJson from "@data/curriculum-graph/edges.json";
import modulesJson from "@data/curriculum-graph/modules.json";
import topicsJson from "@data/curriculum-graph/topics.json";

export type TopicType = "conceptual" | "procedural" | "representational" | "language" | "meta";
export type ExitDepth = "demonstrated" | "practiced with a spotter" | "performed alone";
export type EdgeKind = "required" | "helpful";

export type Topic = {
    id: string;
    name: string;
    unit: string;
    phase: string;
    phaseIndex: number;
    type: TopicType;
    exitDepth: ExitDepth;
    roleBand: string;
    marketAnchor: string;
    evidence: string;
};

export type GraphEdge = {
    from: string;
    to: string;
    kind: EdgeKind;
    reason: string;
};

export type PhaseModule = {
    phaseIndex: number;
    phase: string;
    units: string[];
};

export const TOPICS = topicsJson as Topic[];
export const EDGES = edgesJson as GraphEdge[];
export const PHASE_MODULES = modulesJson as PhaseModule[];

export type Point = { x: number; y: number; z: number };

export type Graph = {
    topics: Topic[];
    edges: GraphEdge[];
    byId: Record<string, Topic>;
    preds: Record<string, GraphEdge[]>;
    succs: Record<string, GraphEdge[]>;
    positions: Record<string, Point>;
};

/**
 * Layered DAG layout relaxed in 3D.
 *
 * Depth (y) is structural: longest-path layer assignment, never smoothed. Only the
 * XZ plane is relaxed, so a concept always sits below everything it depends on.
 *
 * ponytail: relaxation is O(n^2) per iteration over 240 iterations. Fine for the
 * 22-node demo subgraph; the full 304-node dataset needs a spatial grid or a
 * build-time precompute before it goes in.
 */
export function buildGraph(
    allTopics: Topic[],
    allEdges: GraphEdge[],
    hiddenPhases: ReadonlySet<number> = new Set()
): Graph | null {
    const topics = allTopics.filter((t) => !hiddenPhases.has(t.phaseIndex));
    if (topics.length === 0) return null;

    const byId: Record<string, Topic> = {};
    for (const t of topics) byId[t.id] = t;
    const edges = allEdges.filter((e) => byId[e.from] && byId[e.to]);

    const preds: Record<string, GraphEdge[]> = {};
    const succs: Record<string, GraphEdge[]> = {};
    const layer: Record<string, number> = {};
    for (const t of topics) {
        preds[t.id] = [];
        succs[t.id] = [];
        layer[t.id] = 0;
    }
    for (const e of edges) {
        preds[e.to].push(e);
        succs[e.from].push(e);
    }

    // Longest-path relaxation. Bounded by node count; valid because the graph is a DAG.
    for (let i = 0; i < topics.length; i += 1) {
        let moved = false;
        for (const e of edges) {
            if (layer[e.from] + 1 > layer[e.to]) {
                layer[e.to] = layer[e.from] + 1;
                moved = true;
            }
        }
        if (!moved) break;
    }

    let maxLayer = 0;
    for (const t of topics) maxLayer = Math.max(maxLayer, layer[t.id]);

    // Seed each layer on a circle in the XZ plane; the per-layer phase offset stops
    // layers from stacking into visible rings.
    const rows: Record<number, Topic[]> = {};
    for (const t of topics) {
        const l = layer[t.id];
        rows[l] = rows[l] || [];
        rows[l].push(t);
    }
    const positions: Record<string, Point> = {};
    for (const key of Object.keys(rows)) {
        const l = Number(key);
        const row = rows[l];
        const n = row.length;
        const radius = n === 1 ? 0 : 74 + n * 20;
        row.forEach((t, i) => {
            const a = (i / n) * Math.PI * 2 + l * 1.1;
            positions[t.id] = {
                x: Math.cos(a) * radius,
                y: (l - maxLayer / 2) * 78,
                z: Math.sin(a) * radius,
            };
        });
    }

    const MIN_SEPARATION = 124;
    for (let it = 0; it < 240; it += 1) {
        // Attraction: 5% of the way toward the mean XZ of neighbours.
        for (const t of topics) {
            const neighbours = preds[t.id]
                .map((e) => positions[e.from])
                .concat(succs[t.id].map((e) => positions[e.to]));
            if (neighbours.length === 0) continue;
            let mx = 0;
            let mz = 0;
            for (const p of neighbours) {
                mx += p.x;
                mz += p.z;
            }
            positions[t.id].x += (mx / neighbours.length - positions[t.id].x) * 0.05;
            positions[t.id].z += (mz / neighbours.length - positions[t.id].z) * 0.05;
        }
        // Repulsion between nodes sharing roughly the same depth.
        for (let a = 0; a < topics.length; a += 1) {
            for (let b = a + 1; b < topics.length; b += 1) {
                const pa = positions[topics[a].id];
                const pb = positions[topics[b].id];
                if (Math.abs(pa.y - pb.y) > 70) continue;
                let dx = pa.x - pb.x;
                let dz = pa.z - pb.z;
                let d = Math.sqrt(dx * dx + dz * dz);
                if (d < 0.01) {
                    dx = Math.random() - 0.5;
                    dz = Math.random() - 0.5;
                    d = 0.5;
                }
                if (d < MIN_SEPARATION) {
                    const f = ((MIN_SEPARATION - d) / d) * 0.25;
                    pa.x += dx * f;
                    pa.z += dz * f;
                    pb.x -= dx * f;
                    pb.z -= dz * f;
                }
            }
        }
    }

    return { topics, edges, byId, preds, succs, positions };
}

/** Transitive prerequisite closure of `id`, including `id` itself. */
export function ancestors(graph: Graph | null, id: string | null): Set<string> {
    const seen = new Set<string>();
    if (!id || !graph || !graph.preds[id]) return seen;
    seen.add(id);
    const stack = [id];
    while (stack.length) {
        const cur = stack.pop() as string;
        for (const e of graph.preds[cur] || []) {
            if (!seen.has(e.from)) {
                seen.add(e.from);
                stack.push(e.from);
            }
        }
    }
    return seen;
}
