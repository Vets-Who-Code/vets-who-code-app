import { ancestors, bandColor, type Graph, type Point, type Topic } from "@lib/curriculum-graph";
import { useEffect, useRef } from "react";
import styles from "./curriculum-graph.module.css";

/** `k` is depth relative to the cloud centre, so dot radii stay put as the framing changes. */
type Projected = { x: number; y: number; k: number; d: number };

type GraphCanvasProps = {
    graph: Graph | null;
    selected: string | null;
    onSelect: (id: string | null) => void;
};

// Camera distance at zoom 1.
const BASE_DIST = 710;
// Initial camera tilt; the framing is solved at this pitch.
const BASE_PITCH = 0.28;
// Fraction of the canvas the cloud's projected extent should occupy.
const FRAME_FILL = 0.92;
/**
 * On a wide hero the copy occupies the left, so the graph is framed into the right-hand
 * portion of the canvas rather than the whole of it. Below the breakpoint the canvas is its
 * own stacked block and gets the full width.
 */
const GRAPH_BOX_WIDTH = 0.62;
const GRAPH_BOX_CENTRE = 0.69;
const WIDE_LAYOUT_MIN = 900;

// Yaw samples used to solve the framing. The cloud spins, so the framing has to hold for
// every yaw or it would visibly breathe as it rotates.
const FIT_SAMPLES = 16;

/**
 * Dot radii are specified for a couple of dozen nodes. At full dataset size the same radii
 * collide into a blob, so scale them down with density — floored, so a dot stays a target
 * you can actually hit.
 */
const dotScale = (nodeCount: number) =>
    Math.max(0.52, Math.min(1, Math.sqrt(120 / Math.max(1, nodeCount))));

const NAVY = "#091f40";
const RED = "#c5203e";

/**
 * Canvas 2D prerequisite map with a hand-rolled 3D projection.
 *
 * Camera state (yaw/pitch/zoom/hover/drag) lives on refs, not React state — it changes
 * every frame and is read by the animation loop. Putting it in state would thrash.
 */
const GraphCanvas = ({ graph, selected, onSelect }: GraphCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cam = useRef({ yaw: 0.62, pitch: 0.28, zoom: 1 });
    const hover = useRef<string | null>(null);
    const points = useRef<Record<string, Projected>>({});
    const pointers = useRef(new Map<number, { x: number; y: number }>());
    const drag = useRef({ active: false, moved: 0, pinch: 0 });
    // Read by the draw loop; kept in refs so the loop never needs re-subscribing.
    const graphRef = useRef(graph);
    const selRef = useRef(selected);
    // Set whenever something that changes the picture changes. While the cloud is spinning
    // every frame redraws anyway; when rotation is suspended — a selection is open, or the
    // viewer prefers reduced motion — redrawing 375 nodes and re-sorting 529 links at 60fps
    // produces identical pixels, so the loop idles until something actually invalidates.
    const needsDraw = useRef(true);
    graphRef.current = graph;
    selRef.current = selected;
    needsDraw.current = true;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const reduced =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        /**
         * Solve the framing in screen space rather than from a world-space bounding box.
         * Perspective magnifies the near side of the cloud, so a world-centred cloud still
         * lands off-centre and clips. This projects at unit focal length across a full turn
         * of yaw and derives the focal length and centre offset that keep every node inside
         * the canvas at any rotation.
         *
         * Solved once per (graph, canvas size) at the base pitch and zoom 1, so the wheel
         * still zooms — re-solving on zoom would cancel it out — and so the framing does not
         * rescale while the cloud spins.
         */
        const solveFit = (w: number, h: number, g: Graph) => {
            const wide = w >= WIDE_LAYOUT_MIN;
            const boxW = wide ? w * GRAPH_BOX_WIDTH : w;
            const centreX = wide ? w * GRAPH_BOX_CENTRE : w / 2;
            const cp = Math.cos(BASE_PITCH);
            const sp = Math.sin(BASE_PITCH);
            let f = Number.POSITIVE_INFINITY;
            let sumCx = 0;
            let sumCy = 0;
            for (let i = 0; i < FIT_SAMPLES; i += 1) {
                const yaw = (i / FIT_SAMPLES) * Math.PI * 2;
                const cyw = Math.cos(yaw);
                const syw = Math.sin(yaw);
                let minX = Number.POSITIVE_INFINITY;
                let maxX = Number.NEGATIVE_INFINITY;
                let minY = Number.POSITIVE_INFINITY;
                let maxY = Number.NEGATIVE_INFINITY;
                for (const t of g.topics) {
                    const p = g.positions[t.id];
                    const x1 = p.x * cyw - p.z * syw;
                    const z1 = p.x * syw + p.z * cyw;
                    const y1 = p.y * cp - z1 * sp;
                    const z2 = p.y * sp + z1 * cp;
                    const depth = Math.max(140, z2 + BASE_DIST);
                    const sx = x1 / depth;
                    const sy = y1 / depth;
                    if (sx < minX) minX = sx;
                    if (sx > maxX) maxX = sx;
                    if (sy < minY) minY = sy;
                    if (sy > maxY) maxY = sy;
                }
                // Per-yaw, not pooled across yaws: pooling frames the union of every
                // rotation, which squeezes the cloud to a fraction of the canvas.
                f = Math.min(
                    f,
                    (FRAME_FILL * boxW) / (maxX - minX || 1),
                    (FRAME_FILL * h) / (maxY - minY || 1)
                );
                sumCx += (minX + maxX) / 2;
                sumCy += (minY + maxY) / 2;
            }
            return {
                f,
                // Shift the whole cloud into the box, then centre it within the box.
                ox: centreX - w / 2 - (f * sumCx) / FIT_SAMPLES,
                oy: (-f * sumCy) / FIT_SAMPLES,
            };
        };

        let fit = { f: 820, ox: 0, oy: 0 };
        let fitKey = "";

        const project = (p: Point, cx: number, cy: number, f: number): Projected => {
            const { yaw, pitch, zoom } = cam.current;
            const cyw = Math.cos(yaw);
            const syw = Math.sin(yaw);
            const x1 = p.x * cyw - p.z * syw;
            const z1 = p.x * syw + p.z * cyw;
            const cp = Math.cos(pitch);
            const sp = Math.sin(pitch);
            const y1 = p.y * cp - z1 * sp;
            const z2 = p.y * sp + z1 * cp;
            const dist = BASE_DIST / zoom;
            const depth = Math.max(140, z2 + dist);
            const s = f / depth;
            return { x: cx + fit.ox + x1 * s, y: cy + fit.oy + y1 * s, k: dist / depth, d: depth };
        };

        /** Greedy word wrap against the current ctx font. */
        const wrap = (ctx: CanvasRenderingContext2D, text: string, max: number) => {
            const out: string[] = [];
            let line = "";
            for (const word of text.split(" ")) {
                const next = line ? `${line} ${word}` : word;
                if (ctx.measureText(next).width > max && line) {
                    out.push(line);
                    line = word;
                } else {
                    line = next;
                }
            }
            if (line) out.push(line);
            return out;
        };

        /**
         * Explainer panel for the hovered concept. Opens on what the learner will be able to
         * do, because a bare topic label reads as a task on a list rather than a capability.
         */
        const drawExplainer = (
            ctx: CanvasRenderingContext2D,
            t: Topic,
            p: Projected,
            w: number,
            h: number
        ) => {
            const PAD = 14;
            const BOX = 288;
            const inner = BOX - PAD * 2;

            ctx.save();
            ctx.font = "600 15px GothamPro, system-ui, sans-serif";
            // Labels are imperative ("Budget the context window"), so they complete the
            // sentence once the first letter is lowered.
            const claim = t.label.charAt(0).toLowerCase() + t.label.slice(1);
            const claimLines = wrap(ctx, claim, inner);
            ctx.font = "12.5px system-ui, sans-serif";
            const descLines = wrap(ctx, t.description, inner);

            const height =
                PAD + 12 + 10 + claimLines.length * 19 + 8 + descLines.length * 17 + 12 + 11 + PAD;

            let bx = p.x + 18;
            if (bx + BOX > w - 8) bx = p.x - 18 - BOX;
            bx = Math.max(8, Math.min(bx, w - BOX - 8));
            const by = Math.max(8, Math.min(p.y - height / 2, h - height - 8));

            ctx.fillStyle = "rgba(6,20,44,0.96)";
            ctx.fillRect(bx, by, BOX, height);
            ctx.strokeStyle = "rgba(185,214,242,0.28)";
            ctx.lineWidth = 1;
            ctx.strokeRect(bx + 0.5, by + 0.5, BOX - 1, height - 1);
            ctx.fillStyle = bandColor(t.subject);
            ctx.fillRect(bx, by, 3, height);

            let y = by + PAD + 10;
            ctx.fillStyle = "rgba(185,214,242,0.72)";
            ctx.font = "10px ui-monospace, SFMono-Regular, monospace";
            ctx.fillText("AS AN ENGINEER, YOU WILL BE ABLE TO", bx + PAD, y);

            y += 20;
            ctx.fillStyle = "#ffffff";
            ctx.font = "600 15px GothamPro, system-ui, sans-serif";
            for (const line of claimLines) {
                ctx.fillText(line, bx + PAD, y);
                y += 19;
            }

            y += 6;
            ctx.fillStyle = "rgba(248,249,250,0.78)";
            ctx.font = "12.5px system-ui, sans-serif";
            for (const line of descLines) {
                ctx.fillText(line, bx + PAD, y);
                y += 17;
            }

            y += 12;
            ctx.fillStyle = "rgba(185,214,242,0.55)";
            ctx.font = "9.5px ui-monospace, SFMono-Regular, monospace";
            ctx.fillText(
                `${t.subject.toUpperCase()} · ${t.domain.toUpperCase()} · ${t.exitDepth.toUpperCase()}`,
                bx + PAD,
                y
            );
            ctx.restore();
        };

        const draw = (): boolean => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (!w || !h) return false;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
                canvas.width = Math.round(w * dpr);
                canvas.height = Math.round(h * dpr);
            }
            const ctx = canvas.getContext("2d");
            if (!ctx) return false;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);

            const g = graphRef.current;
            if (!g) {
                // Nothing visible: drop the projected points too, or a click on the empty
                // canvas would still hit-test against the last graph and select a node the
                // filter has removed.
                points.current = {};
                return true;
            }

            const cx = w / 2;
            const cy = h / 2;
            const key = `${g.topics.length}:${g.edges.length}:${w}x${h}`;
            if (key !== fitKey) {
                fitKey = key;
                fit = solveFit(w, h, g);
            }
            const f = fit.f;
            const dots = dotScale(g.topics.length);
            const pts: Record<string, Projected> = {};
            for (const t of g.topics) pts[t.id] = project(g.positions[t.id], cx, cy, f);
            points.current = pts;

            const sel = selRef.current;
            const anc = ancestors(g, sel);
            const unlocks = new Set<string>();
            if (sel) for (const e of g.succs[sel] || []) unlocks.add(e.topicId);

            const sortedEdges = g.edges
                .slice()
                .sort(
                    (a, b) =>
                        pts[b.prerequisiteId].d +
                        pts[b.topicId].d -
                        (pts[a.prerequisiteId].d + pts[a.topicId].d)
                );
            for (const e of sortedEdges) {
                const a = pts[e.prerequisiteId];
                const b = pts[e.topicId];
                const upstream = !!sel && anc.has(e.prerequisiteId) && anc.has(e.topicId);
                const touching = !!sel && (e.prerequisiteId === sel || e.topicId === sel);
                const required = e.strength === "hard";
                ctx.save();
                ctx.setLineDash(required ? [] : [5, 4]);
                ctx.lineWidth = upstream || touching ? 1.8 : 1;
                if (upstream) {
                    ctx.strokeStyle = required ? RED : "rgba(255,255,255,0.8)";
                } else if (touching) {
                    ctx.strokeStyle = "rgba(253,179,48,0.75)";
                } else {
                    ctx.strokeStyle = sel ? "rgba(185,214,242,0.07)" : "rgba(185,214,242,0.17)";
                }
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
                // Arrowheads only on active required edges — direction matters when it blocks.
                if (required && (upstream || touching)) {
                    const ang = Math.atan2(b.y - a.y, b.x - a.x);
                    const hx = a.x + (b.x - a.x) * 0.62;
                    const hy = a.y + (b.y - a.y) * 0.62;
                    ctx.setLineDash([]);
                    ctx.fillStyle = ctx.strokeStyle;
                    ctx.beginPath();
                    ctx.moveTo(hx, hy);
                    ctx.lineTo(hx - Math.cos(ang - 0.45) * 9, hy - Math.sin(ang - 0.45) * 9);
                    ctx.lineTo(hx - Math.cos(ang + 0.45) * 9, hy - Math.sin(ang + 0.45) * 9);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();
            }

            const direct = new Set<string>();
            if (sel) {
                for (const e of g.preds[sel] || []) direct.add(e.prerequisiteId);
                for (const e of g.succs[sel] || []) direct.add(e.topicId);
            }

            const sortedTopics = g.topics.slice().sort((a, b) => pts[b.id].d - pts[a.id].d);
            for (const t of sortedTopics) {
                const p = pts[t.id];
                const isSel = t.id === sel;
                const isAnc = !!sel && anc.has(t.id) && !isSel;
                const isUnlock = unlocks.has(t.id);
                const dim = !!sel && !isSel && !isAnc && !isUnlock;
                let radius = 5.2;
                if (isSel) radius = 8.4;
                else if (isAnc || isUnlock) radius = 6.4;
                const r = radius * dots * Math.min(1.5, p.k);
                const hue = bandColor(t.subject);

                ctx.save();
                ctx.globalAlpha = dim ? 0.18 : 1;
                if (isSel) {
                    ctx.strokeStyle = "rgba(255,255,255,0.55)";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, r + 7, 0, Math.PI * 2);
                    ctx.stroke();
                }
                if (isUnlock) {
                    // Hollow: state rides on shape so it never collides with the band hue.
                    ctx.strokeStyle = hue;
                    ctx.lineWidth = 2.2;
                    ctx.fillStyle = NAVY;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                } else {
                    ctx.fillStyle = hue;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                    ctx.fill();
                }
                if (t.id === hover.current && !isSel) {
                    ctx.strokeStyle = "#ffffff";
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
                    ctx.stroke();
                }
                if (isSel || direct.has(t.id)) {
                    ctx.font = `${isSel ? "700 13px" : "500 11.5px"} GothamPro, system-ui, sans-serif`;
                    const tw = ctx.measureText(t.label).width;
                    const flip = p.x + r + 12 + tw > w - 10;
                    const lx = flip ? Math.max(8, p.x - r - 8 - tw) : p.x + r + 8;
                    const ly = Math.max(16, Math.min(h - 8, p.y + 4));
                    ctx.globalAlpha = dim ? 0.2 : 1;
                    ctx.fillStyle = "rgba(9,31,64,0.72)";
                    ctx.fillRect(lx - 4, ly - 12, tw + 8, 17);
                    ctx.fillStyle =
                        isSel || isAnc || isUnlock ? "#ffffff" : "rgba(255,255,255,0.86)";
                    ctx.fillText(t.label, lx, ly);
                }
                ctx.restore();
            }

            const hovered = hover.current ? g.byId[hover.current] : null;
            if (hovered && pts[hovered.id]) {
                drawExplainer(ctx, hovered, pts[hovered.id], w, h);
            }

            return true;
        };

        let raf = 0;
        const frame = () => {
            raf = requestAnimationFrame(frame);
            const spinning = !drag.current.active && !selRef.current && !reduced;
            if (spinning) {
                cam.current.yaw += 0.0022;
            } else if (!needsDraw.current) {
                return;
            }
            if (draw()) needsDraw.current = false;
        };
        raf = requestAnimationFrame(frame);

        const invalidate = () => {
            needsDraw.current = true;
        };

        // The draw loop is what notices a size change, so a paused canvas needs telling.
        const ro = typeof ResizeObserver === "function" ? new ResizeObserver(invalidate) : null;
        ro?.observe(canvas);

        const local = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const pick = (pos: { x: number; y: number }) => {
            let best: string | null = null;
            let bestDist = 18;
            for (const id of Object.keys(points.current)) {
                const p = points.current[id];
                const d = Math.hypot(p.x - pos.x, p.y - pos.y);
                if (d < bestDist) {
                    bestDist = d;
                    best = id;
                }
            }
            return best;
        };

        const onDown = (e: PointerEvent) => {
            try {
                canvas.setPointerCapture(e.pointerId);
            } catch {
                // Pointer capture is best-effort; dragging still works without it.
            }
            pointers.current.set(e.pointerId, local(e));
            drag.current = { active: true, moved: 0, pinch: 0 };
            canvas.style.cursor = "grabbing";
            invalidate();
        };
        const onMove = (e: PointerEvent) => {
            invalidate();
            const pos = local(e);
            const prev = pointers.current.get(e.pointerId);
            if (!prev) {
                const hit = pick(pos);
                hover.current = hit;
                canvas.style.cursor = hit ? "pointer" : "grab";
                return;
            }
            pointers.current.set(e.pointerId, pos);
            if (pointers.current.size >= 2) {
                const [a, b] = Array.from(pointers.current.values());
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (drag.current.pinch) {
                    const next = cam.current.zoom * (d / drag.current.pinch);
                    cam.current.zoom = Math.max(0.5, Math.min(3, next));
                }
                drag.current.pinch = d;
                return;
            }
            const dx = pos.x - prev.x;
            const dy = pos.y - prev.y;
            drag.current.moved += Math.abs(dx) + Math.abs(dy);
            cam.current.yaw += dx * 0.007;
            cam.current.pitch = Math.max(-1.15, Math.min(1.15, cam.current.pitch + dy * 0.005));
        };
        const onUp = (e: PointerEvent) => {
            const tracked = pointers.current.has(e.pointerId);
            const pos = local(e);
            pointers.current.delete(e.pointerId);
            if (pointers.current.size === 0) {
                drag.current.active = false;
                drag.current.pinch = 0;
            }
            canvas.style.cursor = "grab";
            invalidate();
            if (tracked && drag.current.moved < 6) {
                const hit = pick(pos);
                if (hit) onSelect(hit === selRef.current ? null : hit);
                else if (selRef.current) onSelect(null);
            }
        };
        const onLeave = () => {
            hover.current = null;
            invalidate();
        };
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const next = cam.current.zoom * (1 - e.deltaY * 0.0012);
            cam.current.zoom = Math.max(0.5, Math.min(3, next));
            invalidate();
        };

        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("pointercancel", onUp);
        canvas.addEventListener("pointerleave", onLeave);
        canvas.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            cancelAnimationFrame(raf);
            ro?.disconnect();
            canvas.removeEventListener("pointerdown", onDown);
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerup", onUp);
            canvas.removeEventListener("pointercancel", onUp);
            canvas.removeEventListener("pointerleave", onLeave);
            canvas.removeEventListener("wheel", onWheel);
        };
    }, [onSelect]);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
            role="img"
            aria-label="Three-dimensional map of the Hashflag curriculum. Every concept sits below whatever holds it up, and every link carries a written reason. The concept index beside this map lists the same concepts as buttons."
        />
    );
};

export default GraphCanvas;
