import { ancestors, type Graph, type Point } from "@lib/curriculum-graph";
import { useEffect, useRef } from "react";
import styles from "./curriculum-graph.module.css";

type Projected = { x: number; y: number; s: number; d: number };

type GraphCanvasProps = {
    graph: Graph | null;
    selected: string | null;
    onSelect: (id: string | null) => void;
};

const NAVY = "#091f40";
const GOLD = "#FDB330";
const RED = "#c5203e";

const phaseColor = (phaseIndex: number) => {
    if (phaseIndex <= 2) return "#ffffff";
    if (phaseIndex <= 4) return GOLD;
    return RED;
};

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
    graphRef.current = graph;
    selRef.current = selected;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const reduced =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const project = (p: Point, cx: number, cy: number): Projected => {
            const { yaw, pitch, zoom } = cam.current;
            const cyw = Math.cos(yaw);
            const syw = Math.sin(yaw);
            const x1 = p.x * cyw - p.z * syw;
            const z1 = p.x * syw + p.z * cyw;
            const cp = Math.cos(pitch);
            const sp = Math.sin(pitch);
            const y1 = p.y * cp - z1 * sp;
            const z2 = p.y * sp + z1 * cp;
            const depth = Math.max(140, z2 + 710 / zoom);
            const s = 820 / depth;
            return { x: cx + x1 * s, y: cy + y1 * s, s, d: depth };
        };

        const draw = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (!w || !h) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
                canvas.width = Math.round(w * dpr);
                canvas.height = Math.round(h * dpr);
            }
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);

            const g = graphRef.current;
            if (!g) return;

            const cx = w / 2;
            const cy = h / 2;
            const pts: Record<string, Projected> = {};
            for (const t of g.topics) pts[t.id] = project(g.positions[t.id], cx, cy);
            points.current = pts;

            const sel = selRef.current;
            const anc = ancestors(g, sel);
            const unlocks = new Set<string>();
            if (sel) for (const e of g.succs[sel] || []) unlocks.add(e.to);

            const sortedEdges = g.edges
                .slice()
                .sort((a, b) => pts[b.from].d + pts[b.to].d - (pts[a.from].d + pts[a.to].d));
            for (const e of sortedEdges) {
                const a = pts[e.from];
                const b = pts[e.to];
                const upstream = !!sel && anc.has(e.from) && anc.has(e.to);
                const touching = !!sel && (e.from === sel || e.to === sel);
                const required = e.kind === "required";
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
                for (const e of g.preds[sel] || []) direct.add(e.from);
                for (const e of g.succs[sel] || []) direct.add(e.to);
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
                const r = radius * Math.min(1.5, p.s);
                const hue = phaseColor(t.phaseIndex);

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
                    // Hollow: state rides on shape so it never collides with the phase hue.
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
                if (isSel || direct.has(t.id) || t.id === hover.current) {
                    ctx.font = `${isSel ? "700 13px" : "500 11.5px"} GothamPro, system-ui, sans-serif`;
                    const tw = ctx.measureText(t.name).width;
                    const flip = p.x + r + 12 + tw > w - 10;
                    const lx = flip ? Math.max(8, p.x - r - 8 - tw) : p.x + r + 8;
                    const ly = Math.max(16, Math.min(h - 8, p.y + 4));
                    ctx.globalAlpha = dim ? 0.2 : 1;
                    ctx.fillStyle = "rgba(9,31,64,0.72)";
                    ctx.fillRect(lx - 4, ly - 12, tw + 8, 17);
                    ctx.fillStyle =
                        isSel || isAnc || isUnlock ? "#ffffff" : "rgba(255,255,255,0.86)";
                    ctx.fillText(t.name, lx, ly);
                }
                ctx.restore();
            }
        };

        let raf = 0;
        const frame = () => {
            raf = requestAnimationFrame(frame);
            if (!drag.current.active && !selRef.current && !reduced) cam.current.yaw += 0.0022;
            draw();
        };
        raf = requestAnimationFrame(frame);

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
        };
        const onMove = (e: PointerEvent) => {
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
            if (tracked && drag.current.moved < 6) {
                const hit = pick(pos);
                if (hit) onSelect(hit === selRef.current ? null : hit);
                else if (selRef.current) onSelect(null);
            }
        };
        const onLeave = () => {
            hover.current = null;
        };
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const next = cam.current.zoom * (1 - e.deltaY * 0.0012);
            cam.current.zoom = Math.max(0.5, Math.min(3, next));
        };

        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("pointercancel", onUp);
        canvas.addEventListener("pointerleave", onLeave);
        canvas.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            cancelAnimationFrame(raf);
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
            aria-label="Three-dimensional prerequisite map of the Hashflag curriculum. Every concept sits below the concepts it depends on. The concept index below this map lists the same nodes as buttons."
        />
    );
};

export default GraphCanvas;
