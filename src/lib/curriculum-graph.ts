import edgesJson from "@data/curriculum-graph/edges.json";
import manifestJson from "@data/curriculum-graph/manifest.json";
import subjectsJson from "@data/curriculum-graph/subjects.json";
import topicsJson from "@data/curriculum-graph/topics.json";

export type TopicType = "conceptual" | "procedural" | "representational" | "language" | "meta";
export type ExitDepth = "guided" | "scaffolded" | "unassisted";
/** `hard` blocks; `soft` only smooths. Only hard edges contribute to depth. */
export type EdgeStrength = "hard" | "soft";

export type Topic = {
    id: string;
    label: string;
    description: string;
    subject: string;
    domain: string;
    type: TopicType;
    exitDepth: ExitDepth;
    evidence: string;
    marketAnchor: string[];
    /** Curriculum citation, e.g. "M19 §19.3". */
    source: string;
    /** Longest path over hard edges. Authoritative; recomputed per visible subgraph. */
    depth: number;
};

export type GraphEdge = {
    topicId: string;
    prerequisiteId: string;
    strength: EdgeStrength;
    reason: string;
};

export type Subject = {
    id: string;
    title: string;
    topicCount: number;
    domains: { id: string; topicCount: number }[];
};

export type Manifest = {
    name: string;
    version: string;
    counts: {
        topics: number;
        edges: number;
        hardEdges: number;
        softEdges: number;
        subjects: number;
        domains: number;
        maxDepth: number;
        roots: number;
        terminals: number;
    };
    acyclic: boolean;
    structureAdaptedFrom: { name: string; url: string; license: string };
};

export const TOPICS = topicsJson as Topic[];
export const EDGES = edgesJson as GraphEdge[];
export const SUBJECTS = subjectsJson as Subject[];
export const MANIFEST = manifestJson as Manifest;

/**
 * Colour bands. Eight subjects is too many hues to stay legible on navy, and the design
 * rule is that fill encodes grouping while state rides on shape and opacity. The dataset
 * pairs naturally into four bands (its own source files do the same pairing), which runs
 * light-to-hot across the curriculum the way the original three-band ramp did.
 */
export const SUBJECT_BANDS: { subjects: string[]; label: string; color: string }[] = [
    { subjects: ["systems", "practice"], label: "Systems & practice", color: "#FFFFFF" },
    { subjects: ["interface", "language"], label: "Interface & language", color: "#B9D6F2" },
    { subjects: ["data", "services"], label: "Data & services", color: "#FDB330" },
    { subjects: ["ai", "reliability"], label: "AI & reliability", color: "#c5203e" },
];

const BAND_BY_SUBJECT: Record<string, string> = {};
for (const band of SUBJECT_BANDS) {
    for (const id of band.subjects) BAND_BY_SUBJECT[id] = band.color;
}

export const bandColor = (subject: string) => BAND_BY_SUBJECT[subject] ?? "#FFFFFF";

export type Point = { x: number; y: number; z: number };

export type Graph = {
    topics: Topic[];
    edges: GraphEdge[];
    byId: Record<string, Topic>;
    /** Edges into a topic — the things it rests on. */
    preds: Record<string, GraphEdge[]>;
    /** Edges out of a topic — the things it unlocks. */
    succs: Record<string, GraphEdge[]>;
    positions: Record<string, Point>;
    /** Bounding-sphere radius of the cloud. Rotation-invariant, so the camera can frame it. */
    radius: number;
};

/**
 * Layered DAG layout relaxed in 3D.
 *
 * Depth (y) is structural: longest-path layer assignment over hard edges only, never
 * smoothed. A soft edge does not block, so it must not push a concept deeper — layering
 * over every edge inflates depth and contradicts the dataset's own `depth` field. Only
 * the XZ plane is relaxed, so a concept always sits below everything it depends on.
 *
 * Runs synchronously on mount and on every subject toggle. Measured on the full 375-node /
 * 528-edge dataset: see the perf test. If it grows several times larger, move it to a
 * worker or precompute at build time.
 */
export function buildGraph(
    allTopics: Topic[],
    allEdges: GraphEdge[],
    hiddenSubjects: ReadonlySet<string> = new Set()
): Graph | null {
    const topics = allTopics.filter((t) => !hiddenSubjects.has(t.subject));
    if (topics.length === 0) return null;

    const byId: Record<string, Topic> = {};
    for (const t of topics) byId[t.id] = t;
    const edges = allEdges.filter((e) => byId[e.topicId] && byId[e.prerequisiteId]);

    const preds: Record<string, GraphEdge[]> = {};
    const succs: Record<string, GraphEdge[]> = {};
    const layer: Record<string, number> = {};
    for (const t of topics) {
        preds[t.id] = [];
        succs[t.id] = [];
        layer[t.id] = 0;
    }
    for (const e of edges) {
        preds[e.topicId].push(e);
        succs[e.prerequisiteId].push(e);
    }

    // Longest-path relaxation over blocking edges. Bounded by node count; valid because
    // the graph is a DAG.
    const hardEdges = edges.filter((e) => e.strength === "hard");
    for (let i = 0; i < topics.length; i += 1) {
        let moved = false;
        for (const e of hardEdges) {
            if (layer[e.prerequisiteId] + 1 > layer[e.topicId]) {
                layer[e.topicId] = layer[e.prerequisiteId] + 1;
                moved = true;
            }
        }
        if (!moved) break;
    }

    let maxLayer = 0;
    for (const t of topics) maxLayer = Math.max(maxLayer, layer[t.id]);

    // Seed each layer on a circle in the XZ plane; the per-layer phase offset stops
    // layers from stacking into visible rings.
    // Vertical distance between layers. Must stay above the 70-unit reach of the repulsion
    // force below, which is what makes the per-layer bucketing exact.
    const LAYER_GAP = 78;
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
                y: (l - maxLayer / 2) * LAYER_GAP,
                z: Math.sin(a) * radius,
            };
        });
    }

    const layerRows = Object.values(rows);
    const MIN_SEPARATION = 124;
    // Target xz radius as a fraction of the y span. The layout is naturally much taller
    // than it is wide (the y span grows with every layer, the xz spread only with the
    // widest layer), which wastes the width of a landscape canvas. Keep y the longest
    // axis — depth still has to read top-to-bottom — but not by a factor of 1.5.
    const XZ_SPREAD = 0.55;
    for (let it = 0; it < 240; it += 1) {
        // Attraction: 5% of the way toward the mean XZ of neighbours.
        for (const t of topics) {
            const neighbours = preds[t.id]
                .map((e) => positions[e.prerequisiteId])
                .concat(succs[t.id].map((e) => positions[e.topicId]));
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
        // Repulsion between nodes sharing a depth. Layers sit LAYER_GAP apart and the force
        // only reaches 70 units vertically, so same-layer pairs are the only ones that can
        // ever interact — bucketing by layer is exact here, not an approximation, and turns
        // the sweep from O(n²) into O(Σ layer²).
        for (const row of layerRows) {
            for (let a = 0; a < row.length; a += 1) {
                for (let b = a + 1; b < row.length; b += 1) {
                    const pa = positions[row[a].id];
                    const pb = positions[row[b].id];
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
    }

    // Relaxation leaves a tall, narrow ribbon: the y span grows with the layer count while
    // the xz spread only grows with the widest layer. Widen xz against the y span so the
    // cloud reads as a volume instead of a column, whatever the node count.
    const points = Object.values(positions);
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    let xzRadius = 0;
    for (const p of points) {
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
        xzRadius = Math.max(xzRadius, Math.hypot(p.x, p.z));
    }
    const ySpan = maxY - minY;
    if (xzRadius > 0 && ySpan > 0) {
        const spread = (XZ_SPREAD * ySpan) / xzRadius;
        for (const p of points) {
            p.x *= spread;
            p.z *= spread;
        }
    }

    // Centre on the bounding box, not the origin. Layer seeding plus relaxation leaves the
    // cloud drifting off-axis, which reads as the graph being badly placed in the panel.
    let cx = 0;
    let cy = 0;
    let cz = 0;
    {
        let x0 = Number.POSITIVE_INFINITY;
        let x1 = Number.NEGATIVE_INFINITY;
        let z0 = Number.POSITIVE_INFINITY;
        let z1 = Number.NEGATIVE_INFINITY;
        let y0 = Number.POSITIVE_INFINITY;
        let y1 = Number.NEGATIVE_INFINITY;
        for (const p of points) {
            if (p.x < x0) x0 = p.x;
            if (p.x > x1) x1 = p.x;
            if (p.y < y0) y0 = p.y;
            if (p.y > y1) y1 = p.y;
            if (p.z < z0) z0 = p.z;
            if (p.z > z1) z1 = p.z;
        }
        cx = (x0 + x1) / 2;
        cy = (y0 + y1) / 2;
        cz = (z0 + z1) / 2;
    }
    for (const p of points) {
        p.x -= cx;
        p.y -= cy;
        p.z -= cz;
    }

    let radius = 0;
    for (const p of points) radius = Math.max(radius, Math.hypot(p.x, p.y, p.z));

    return { topics, edges, byId, preds, succs, positions, radius };
}

/** Layer index of every topic: longest path over hard edges. Exposed for verification. */
export function computeDepths(topics: Topic[], edges: GraphEdge[]): Record<string, number> {
    const depth: Record<string, number> = {};
    for (const t of topics) depth[t.id] = 0;
    const hard = edges.filter((e) => e.strength === "hard");
    for (let i = 0; i < topics.length; i += 1) {
        let moved = false;
        for (const e of hard) {
            if (depth[e.prerequisiteId] + 1 > depth[e.topicId]) {
                depth[e.topicId] = depth[e.prerequisiteId] + 1;
                moved = true;
            }
        }
        if (!moved) break;
    }
    return depth;
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
            if (!seen.has(e.prerequisiteId)) {
                seen.add(e.prerequisiteId);
                stack.push(e.prerequisiteId);
            }
        }
    }
    return seen;
}
