import { ancestors, type Graph, type PhaseModule } from "@lib/curriculum-graph";
import styles from "./curriculum-graph.module.css";

type InspectorProps = {
    graph: Graph | null;
    phases: PhaseModule[];
    selected: string | null;
    onSelect: (id: string | null) => void;
};

const Inspector = ({ graph, phases, selected, onSelect }: InspectorProps) => {
    const node = selected && graph ? graph.byId[selected] : null;

    if (!node || !graph || !selected) {
        const groups = phases
            .map((p) => ({
                label: `0${p.phaseIndex} · ${p.phase}`,
                items: (graph?.topics ?? []).filter((t) => t.phaseIndex === p.phaseIndex),
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
                    <div key={group.label} className={styles.indexGroup}>
                        <p className={styles.indexGroupLabel}>{group.label}</p>
                        <div className={styles.chipRow}>
                            {group.items.map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    className={styles.conceptChip}
                                    onClick={() => onSelect(t.id)}
                                >
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const prereqs = (graph.preds[selected] || [])
        .slice()
        .sort((a, b) => {
            if (a.kind === b.kind) return 0;
            return a.kind === "required" ? -1 : 1;
        })
        .map((e) => ({ edge: e, topic: graph.byId[e.from] }));
    const unlocks = (graph.succs[selected] || []).map((e) => graph.byId[e.to]);
    const upstream = ancestors(graph, selected).size - 1;

    const fields: [string, string][] = [
        ["Unit", node.unit],
        ["Phase", `0${node.phaseIndex} — ${node.phase}`],
        ["Type", node.type],
        ["Exit depth", node.exitDepth],
        ["Role band", `${node.roleBand} · ${node.marketAnchor}`],
        ["Evidence", node.evidence],
    ];

    return (
        <div className={styles.inspector}>
            <div className={styles.inspectorHead}>
                <p className={styles.monoLabel}>Node {node.id}</p>
                <button type="button" className={styles.clearButton} onClick={() => onSelect(null)}>
                    Clear
                </button>
            </div>
            <h3 className={styles.inspectorHeading}>{node.name}</h3>

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
                        <div key={`${edge.from}-${edge.to}`} className={styles.prereqRow}>
                            <span
                                className={`${styles.kindChip} ${
                                    edge.kind === "required"
                                        ? styles.kindRequired
                                        : styles.kindHelpful
                                }`}
                            >
                                {edge.kind}
                            </span>
                            <div>
                                <button
                                    type="button"
                                    className={styles.prereqName}
                                    onClick={() => onSelect(edge.from)}
                                >
                                    {topic.name}
                                </button>
                                <p className={styles.prereqReason}>{edge.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <hr className={styles.rule} />
            <p className={styles.monoLabel}>Unlocks next</p>
            {unlocks.length === 0 ? (
                <p className={styles.inspectorNote}>
                    Nothing in this subgraph waits on it — it is a terminal node here.
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
                            {t.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inspector;
