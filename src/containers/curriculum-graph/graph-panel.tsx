import {
    buildGraph,
    EDGES,
    MANIFEST,
    SUBJECT_BANDS,
    SUBJECTS,
    TOPICS,
} from "@lib/curriculum-graph";
import { useCallback, useMemo, useState } from "react";
import styles from "./curriculum-graph.module.css";
import GraphCanvas from "./graph-canvas";
import Inspector from "./inspector";

const GraphPanel = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [hiddenSubjects, setHiddenSubjects] = useState<ReadonlySet<string>>(new Set<string>());

    const graph = useMemo(() => buildGraph(TOPICS, EDGES, hiddenSubjects), [hiddenSubjects]);

    const toggleSubject = useCallback(
        (subjectId: string) => {
            const next = new Set(hiddenSubjects);
            if (next.has(subjectId)) next.delete(subjectId);
            else next.add(subjectId);
            setHiddenSubjects(next);
            // A selection whose subject just went dark has nothing left to point at.
            const node = TOPICS.find((t) => t.id === selected);
            if (node && next.has(node.subject)) setSelected(null);
        },
        [hiddenSubjects, selected]
    );

    return (
        <div className={styles.panel}>
            <div className={styles.toolbar}>
                <p className={styles.monoMeta}>
                    Prerequisite graph &nbsp;·&nbsp; tap a dot to trace what it rests on
                </p>
                <div className={styles.legend}>
                    {SUBJECT_BANDS.map((band) => (
                        <span key={band.label} className={styles.legendItem}>
                            <span
                                className={styles.legendDot}
                                style={{
                                    background: band.color,
                                    border: band.color === "#FFFFFF" ? "1px solid #091f40" : "none",
                                }}
                            />
                            {band.label}
                        </span>
                    ))}
                    <span className={styles.legendItem}>
                        <span className={`${styles.legendDot} ${styles.dotHollow}`} />
                        Unlocks next
                    </span>
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
                <span className={styles.monoMeta}>Subjects · click to toggle</span>
                {SUBJECTS.map((s) => {
                    const on = !hiddenSubjects.has(s.id);
                    return (
                        <button
                            key={s.id}
                            type="button"
                            aria-pressed={on}
                            className={`${styles.phaseToggle} ${on ? styles.phaseToggleOn : ""}`}
                            onClick={() => toggleSubject(s.id)}
                        >
                            {s.title}
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
                    subjects={SUBJECTS}
                    selected={selected}
                    onSelect={setSelected}
                />
            </div>

            <div className={styles.panelFooter}>
                Rendering all {MANIFEST.counts.topics} micro-topics and {MANIFEST.counts.edges}{" "}
                prerequisite edges of Hashflag Graph {MANIFEST.version} —{" "}
                {MANIFEST.counts.hardEdges} required, {MANIFEST.counts.softEdges} helpful, across{" "}
                {MANIFEST.counts.subjects} subjects and {MANIFEST.counts.domains} domains.
            </div>
        </div>
    );
};

export default GraphPanel;
