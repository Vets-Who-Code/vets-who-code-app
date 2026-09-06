import edgesJson from "@data/curriculum-graph/edges.json";
import manifestJson from "@data/curriculum-graph/manifest.json";
import subjectsJson from "@data/curriculum-graph/subjects.json";
import topicsJson from "@data/curriculum-graph/topics.json";

export type TopicType = "conceptual" | "procedural" | "representational" | "language" | "meta";
export type ExitDepth = "guided" | "scaffolded" | "unassisted";
/** `hard` is load-bearing; `soft` only supports. Only hard links contribute to depth. */
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
    /** Citation into `MANIFEST.derivedFrom`: module and section, e.g. "M19 §19.3". */
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
    /** The written curriculum each topic's `source` cites by module and section. */
    derivedFrom: string;
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
    /** Links out of a topic — the things that rest on it. */
    succs: Record<string, GraphEdge[]>;
    positions: Record<string, Point>;
    /** Bounding-sphere radius of the cloud. Rotation-invariant, so the camera can frame it. */
    radius: number;
};

/**
 * Layered DAG layout relaxed in 3D.
 *
 * Depth (y) is structural: longest-path layer assignment over hard edges only, never
 * smoothed. A soft link is not load-bearing, so it must not push a concept deeper — layering
 * over every edge inflates depth and contradicts the dataset's own `depth` field. Only
 * the XZ plane is relaxed, so a concept always sits below everything it depends on.
 *
 * Runs synchronously on mount and on every subject toggle, so it has to stay inside a
 * click. Measured at ~39ms median on the dataset as shipped — MANIFEST.counts is the live
 * size, 375 topics / 529 edges at the time of writing. The bound is enforced by the perf
 * test rather than by this comment. If the graph grows several times larger, move it to a
 * worker or precompute the layout at build time.
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

    // Longest-path relaxation over load-bearing links only. Bounded by node count; valid because
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

    // Vertical distance between layers. Must stay above the 70-unit reach of the repulsion
    // force below, which is what makes the per-layer bucketing exact.
    const LAYER_GAP = 78;

    // Each subject owns an angular sector, held for every layer. Seeding purely by index
    // scatters subjects around the circle differently at every depth, which is what made
    // the cloud read as an undifferentiated pile of dots rather than as eight bodies of
    // skill. Sector order follows SUBJECTS so the wedges match the filter row; anything
    // not in that list (synthetic topics in tests) falls in after, in first-seen order.
    const subjectOrder: string[] = [];
    for (const s of SUBJECTS) {
        if (topics.some((t) => t.subject === s.id)) subjectOrder.push(s.id);
    }
    for (const t of topics) {
        if (!subjectOrder.includes(t.subject)) subjectOrder.push(t.subject);
    }
    const sectorAngle: Record<string, number> = {};
    subjectOrder.forEach((id, i) => {
        sectorAngle[id] = (i / subjectOrder.length) * Math.PI * 2;
    });
    // Fraction of its own sector a subject is allowed to spread across. Below 1 so
    // neighbouring subjects keep a visible gap between them.
    const SECTOR_FILL = 0.72;
    const sectorWidth = ((Math.PI * 2) / subjectOrder.length) * SECTOR_FILL;
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
        const radius = row.length === 1 ? 0 : 74 + row.length * 20;
        // Within a layer, place each node inside its subject's sector rather than at an
        // arbitrary point on the circle.
        const perSubject: Record<string, Topic[]> = {};
        for (const t of row) (perSubject[t.subject] = perSubject[t.subject] || []).push(t);
        for (const [subject, members] of Object.entries(perSubject)) {
            const base = sectorAngle[subject] ?? 0;
            members.forEach((t, i) => {
                const spread = members.length === 1 ? 0 : (i / (members.length - 1) - 0.5);
                const a = base + spread * sectorWidth;
                positions[t.id] = {
                    x: Math.cos(a) * radius,
                    y: (l - maxLayer / 2) * LAYER_GAP,
                    z: Math.sin(a) * radius,
                };
            });
        }
    }

    const layerRows = Object.values(rows);
    const MIN_SEPARATION = 124;
    // Target xz radius as a fraction of the y span. The layout is naturally much taller
    // than it is wide (the y span grows with every layer, the xz spread only with the
    // widest layer), which wastes the width of a landscape canvas. Keep y the longest
    // axis — depth still has to read top-to-bottom — but not by a factor of 1.5.
    const XZ_SPREAD = 0.55;
    // Nodes are kept at least this far out so their angle — and so their subject — stays
    // legible instead of collapsing into an undifferentiated core.
    const SECTOR_MIN_RADIUS = 90;
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
        // Hold each node inside its subject's wedge. A soft pull loses to attraction — a
        // node dragged toward the centre has no meaningful angle left — so this is a hard
        // clamp on angle plus a floor on radius. Attraction still places nodes freely
        // within the wedge, which is where the dependency structure stays visible.
        const half = sectorWidth / 2;
        for (const t of topics) {
            const p = positions[t.id];
            const home = sectorAngle[t.subject];
            if (home === undefined) continue;
            const r = Math.max(Math.hypot(p.x, p.z), SECTOR_MIN_RADIUS);
            let delta = Math.atan2(p.z, p.x) - home;
            while (delta > Math.PI) delta -= Math.PI * 2;
            while (delta < -Math.PI) delta += Math.PI * 2;
            if (delta > half) delta = half;
            else if (delta < -half) delta = -half;
            const a = home + delta;
            p.x = Math.cos(a) * r;
            p.z = Math.sin(a) * r;
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

    // Centre vertically only. The subject sectors are angles about the origin, so shifting
    // x or z would rotate every node out of its wedge — and the camera already centres the
    // cloud in screen space, so a world-space xz shift would buy nothing anyway.
    let cy = 0;
    {
        let y0 = Number.POSITIVE_INFINITY;
        let y1 = Number.NEGATIVE_INFINITY;
        for (const p of points) {
            if (p.y < y0) y0 = p.y;
            if (p.y > y1) y1 = p.y;
        }
        cy = (y0 + y1) / 2;
    }
    for (const p of points) p.y -= cy;

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
