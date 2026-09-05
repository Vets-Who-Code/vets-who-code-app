import { buildGraph, EDGES, PHASE_MODULES, TOPICS } from "@lib/curriculum-graph";
import { useCallback, useMemo, useState } from "react";
import styles from "./curriculum-graph.module.css";
import GraphCanvas from "./graph-canvas";
import Inspector from "./inspector";

const LEGEND_DOTS = [
    { label: "Phase 01–02", className: styles.dotWhite },
    { label: "Phase 03–04", className: styles.dotGold },
    { label: "Phase 05–06", className: styles.dotRed },
    { label: "Unlocks next", className: styles.dotHollow },
];

const GraphPanel = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [hiddenPhases, setHiddenPhases] = useState<ReadonlySet<number>>(new Set<number>());

    const graph = useMemo(() => buildGraph(TOPICS, EDGES, hiddenPhases), [hiddenPhases]);

    const togglePhase = useCallback(
        (phaseIndex: number) => {
            const next = new Set(hiddenPhases);
            if (next.has(phaseIndex)) next.delete(phaseIndex);
            else next.add(phaseIndex);
            setHiddenPhases(next);
            // A selection whose phase just went dark has nothing left to point at.
            const node = TOPICS.find((t) => t.id === selected);
            if (node && next.has(node.phaseIndex)) setSelected(null);
        },
        [hiddenPhases, selected]
    );

    return (
        <div className={styles.panel}>
            <div className={styles.toolbar}>
                <p className={styles.monoMeta}>
                    Prerequisite graph &nbsp;·&nbsp; tap a dot to trace what it rests on
                </p>
                <div className={styles.legend}>
                    {LEGEND_DOTS.map((item) => (
                        <span key={item.label} className={styles.legendItem}>
                            <span className={`${styles.legendDot} ${item.className}`} />
                            {item.label}
                        </span>
                    ))}
                    <span className={styles.legendItem}>
                        <svg width="30" height="8" aria-hidden="true">
                            <title>Solid line</title>
                            <line x1="0" y1="4" x2="30" y2="4" stroke="#091f40" strokeWidth="1.5" />
                        </svg>
                        Required
                    </span>
                    <span className={styles.legendItem}>
                        <svg width="30" height="8" aria-hidden="true">
                            <title>Dashed line</title>
                            <line
                                x1="0"
                                y1="4"
                                x2="30"
                                y2="4"
                                stroke="#091f40"
                                strokeWidth="1.5"
                                strokeDasharray="5 4"
                            />
                        </svg>
                        Helpful
                    </span>
                </div>
            </div>

            <div className={styles.filterRow}>
                <span className={styles.monoMeta}>Phases · click to toggle</span>
                {PHASE_MODULES.map((p) => {
                    const on = !hiddenPhases.has(p.phaseIndex);
                    return (
                        <button
                            key={p.phaseIndex}
                            type="button"
                            aria-pressed={on}
                            className={`${styles.phaseToggle} ${on ? styles.phaseToggleOn : ""}`}
                            onClick={() => togglePhase(p.phaseIndex)}
                        >
                            {`0${p.phaseIndex} ${p.phase}`}
                        </button>
                    );
                })}
            </div>

            <div className={styles.panelBody}>
                <div className={styles.canvasCell}>
                    <GraphCanvas graph={graph} selected={selected} onSelect={setSelected} />
                    <div className={styles.canvasHint}>
                        <span>
                            Drag to spin &nbsp;·&nbsp; scroll to zoom &nbsp;·&nbsp; tap a dot, then
                            follow its prerequisites
                        </span>
                        <span>
                            {graph?.topics.length ?? 0} nodes &nbsp;·&nbsp;{" "}
                            {graph?.edges.length ?? 0} edges shown
                        </span>
                    </div>
                </div>
                <Inspector
                    graph={graph}
                    phases={PHASE_MODULES}
                    selected={selected}
                    onSelect={setSelected}
                />
            </div>

            <div className={styles.panelFooter}>
                Rendering {TOPICS.length} of 304 micro-topics — a representative subgraph spanning
                all six phases. Full v2.3 dataset: topics.json / edges.json / modules.json.
            </div>
        </div>
    );
};

export default GraphPanel;
