import { ancestors, type Graph, type Subject } from "@lib/curriculum-graph";
import styles from "./curriculum-graph.module.css";

type InspectorProps = {
    graph: Graph | null;
    subjects: Subject[];
    selected: string | null;
    onSelect: (id: string | null) => void;
};

const Inspector = ({ graph, subjects, selected, onSelect }: InspectorProps) => {
    const node = selected && graph ? graph.byId[selected] : null;

    if (!node || !graph || !selected) {
        const groups = subjects
            .map((s) => ({
                id: s.id,
                title: s.title,
                items: (graph?.topics ?? []).filter((t) => t.subject === s.id),
            }))
            .filter((g) => g.items.length > 0);

        return (
            <div className={styles.inspector}>
                <p className={styles.monoLabel}>Node inspector</p>
                <h3 className={styles.inspectorHeading}>Pick a concept</h3>
                <p className={styles.inspectorBody}>
                    Selecting a dot lights every idea a learner must already hold before it and
                    prints the written reason on each link. Depth runs top to bottom: a concept sits
                    below everything it depends on.
                </p>
                <p className={`${styles.monoLabel} ${styles.monoLabelSpaced}`}>Concept index</p>
                {groups.map((group) => (
                    <details key={group.id} className={styles.indexGroup}>
                        <summary className={styles.indexGroupLabel}>
                            {group.title}
                            <span className={styles.indexGroupCount}>{group.items.length}</span>
                        </summary>
                        <div className={styles.chipRow}>
                            {group.items.map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    className={styles.conceptChip}
                                    onClick={() => onSelect(t.id)}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </details>
                ))}
            </div>
        );
    }

    const subjectTitle = subjects.find((s) => s.id === node.subject)?.title ?? node.subject;
    const prereqs = (graph.preds[selected] || [])
        .slice()
        .sort((a, b) => {
            if (a.strength === b.strength) return 0;
            return a.strength === "hard" ? -1 : 1;
        })
        .map((e) => ({ edge: e, topic: graph.byId[e.prerequisiteId] }));
    const unlocks = (graph.succs[selected] || []).map((e) => graph.byId[e.topicId]);
    const upstream = ancestors(graph, selected).size - 1;

    const fields: [string, string][] = [
        ["Subject", subjectTitle],
        ["Domain", node.domain],
        ["Type", node.type],
        ["Exit depth", node.exitDepth],
        ["Market anchor", node.marketAnchor.join(" · ")],
        ["Evidence", node.evidence],
        ["Source", node.source],
    ];

    return (
        <div className={styles.inspector}>
            <div className={styles.inspectorHead}>
                <p className={styles.monoLabel}>Node {node.id}</p>
                <button type="button" className={styles.clearButton} onClick={() => onSelect(null)}>
                    Clear
                </button>
            </div>
            <h3 className={styles.inspectorHeading}>{node.label}</h3>
            <p className={styles.inspectorDescription}>{node.description}</p>

            <dl className={styles.defList}>
                {fields.map(([term, value]) => (
                    <div key={term} className={styles.defRow}>
                        <dt className={styles.defTerm}>{term}</dt>
                        <dd className={styles.defValue}>{value}</dd>
                    </div>
                ))}
            </dl>

            <hr className={styles.rule} />
            <p className={styles.monoLabel}>
                Builds directly on &nbsp;·&nbsp; {upstream} upstream in total
            </p>

            {prereqs.length === 0 ? (
                <p className={styles.inspectorNote}>
                    Nothing blocks this one. It is an entry point: day one, week one.
                </p>
            ) : (
                <div className={styles.prereqList}>
                    {prereqs.map(({ edge, topic }) => (
                        <div
                            key={`${edge.prerequisiteId}-${edge.topicId}`}
                            className={styles.prereqRow}
                        >
                            <span
                                className={`${styles.kindChip} ${
                                    edge.strength === "hard"
                                        ? styles.kindRequired
                                        : styles.kindHelpful
                                }`}
                            >
                                {edge.strength === "hard" ? "required" : "helpful"}
                            </span>
                            <div>
                                <button
                                    type="button"
                                    className={styles.prereqName}
                                    onClick={() => onSelect(edge.prerequisiteId)}
                                >
                                    {topic.label}
                                </button>
                                <p className={styles.prereqReason}>{edge.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <hr className={styles.rule} />
            <p className={styles.monoLabel}>Unlocks next &nbsp;·&nbsp; {unlocks.length}</p>
            {unlocks.length === 0 ? (
                <p className={styles.inspectorNote}>
                    Nothing waits on it — this concept is a terminal node in the graph.
                </p>
            ) : (
                <div className={styles.chipRow}>
                    {unlocks.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            className={styles.unlockChip}
                            onClick={() => onSelect(t.id)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inspector;
