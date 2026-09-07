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
        <>
            {/* Copy on the left, graph bleeding off the right edge behind it. The canvas is
                transparent so the hero gradient and grain show through — no card, no border. */}
            <section className={`dark-section ${styles.hero}`} aria-labelledby="curriculum-title">
                <div className={styles.heroCanvas}>
                    <GraphCanvas graph={graph} selected={selected} onSelect={setSelected} />
                </div>

                <div className={`tw-container ${styles.heroInner}`}>
                    <div className={styles.heroCopy}>
                        <span className={styles.eyebrowDark}>
                            <span className={styles.eyebrowBar} />
                            The Hashflag Method
                        </span>
                        <h1 id="curriculum-title" className={styles.heroTitle}>
                            We didn&rsquo;t write a syllabus. We drew a map.
                        </h1>
                        <p className={styles.heroLede}>
                            A syllabus tells you what comes next. It can&rsquo;t tell you{" "}
                            <em>why</em>. Ours is a map of {MANIFEST.counts.topics} ideas and the{" "}
                            {MANIFEST.counts.edges} places they hold each other up — so before a
                            veteran writes a line of code, they can see the whole route, where they
                            already stand on it, and what every step is load-bearing for.
                        </p>
                    </div>

                    <div className={styles.heroHint}>
                        <span>
                            Drag to spin. Scroll to zoom. Tap any dot to see what it rests on, and
                            why.
                        </span>
                        <span>
                            {graph?.topics.length ?? 0} nodes &nbsp;·&nbsp;{" "}
                            {graph?.edges.length ?? 0} links shown
                        </span>
                    </div>
                </div>
            </section>

            <div className={styles.controlsBar}>
                <div className="tw-container">
                    <div className={styles.legend}>
                        {SUBJECT_BANDS.map((band) => (
                            <span key={band.label} className={styles.legendItem}>
                                <span
                                    className={styles.legendDot}
                                    style={{
                                        background: band.color,
                                        border:
                                            band.color === "#FFFFFF" ? "1px solid #091f40" : "none",
                                    }}
                                />
                                {band.label}
                            </span>
                        ))}
                        <span className={styles.legendItem}>
                            <span className={`${styles.legendDot} ${styles.dotHollow}`} />
                            Rests on it
                        </span>
                        <span className={styles.legendItem}>
                            <svg width="30" height="8" aria-hidden="true">
                                <title>Solid line</title>
                                <line
                                    x1="0"
                                    y1="4"
                                    x2="30"
                                    y2="4"
                                    stroke="#091f40"
                                    strokeWidth="1.5"
                                />
                            </svg>
                            Load-bearing
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
                            Supporting
                        </span>
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
                                    className={`${styles.phaseToggle} ${
                                        on ? styles.phaseToggleOn : ""
                                    }`}
                                    onClick={() => toggleSubject(s.id)}
                                >
                                    {s.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <section className={styles.inspectorSection}>
                <div className="tw-container">
                    <Inspector
                        graph={graph}
                        subjects={SUBJECTS}
                        selected={selected}
                        onSelect={setSelected}
                    />
                    <p className={styles.panelFooter}>
                        Rendering all {MANIFEST.counts.topics} micro-topics and{" "}
                        {MANIFEST.counts.edges} prerequisite links of {MANIFEST.name}{" "}
                        {MANIFEST.version} — {MANIFEST.counts.hardEdges} load-bearing,{" "}
                        {MANIFEST.counts.softEdges} supporting, across {MANIFEST.counts.subjects}{" "}
                        subjects and {MANIFEST.counts.domains} domains.
                    </p>
                </div>
            </section>
        </>
    );
};

export default GraphPanel;
