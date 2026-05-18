import type { Module } from "@data/curriculum";
import styles from "./curriculum.module.css";

type ModuleRowProps = {
    mod: Module;
    expanded: boolean;
    onToggle: () => void;
    showStack: boolean;
};

const ModuleRow = ({ mod, expanded, onToggle, showStack }: ModuleRowProps) => {
    const num = `M${String(mod.n).padStart(2, "0")}`;
    const bodyId = `mod-body-${num}`;

    return (
        <div className={`${styles.modRow} ${expanded ? styles.modRowOpen : ""}`}>
            <button
                type="button"
                className={styles.modHead}
                onClick={onToggle}
                aria-expanded={expanded}
                aria-controls={bodyId}
            >
                <span className={styles.modNum}>{num}</span>
                <span>
                    <span className={styles.modTitle}>{mod.title}</span>
                    <span className={styles.modOneliner}>{mod.oneLiner}</span>
                </span>
                {showStack ? (
                    <span className={styles.modStack} aria-hidden="true">
                        {mod.stack.slice(0, 3).map((s) => (
                            <span key={s} className={styles.stackChip}>
                                {s}
                            </span>
                        ))}
                    </span>
                ) : (
                    <span aria-hidden="true" />
                )}
                <span className={styles.modToggle} aria-hidden="true">
                    {expanded ? "–" : "+"}
                </span>
            </button>

            <div
                id={bodyId}
                className={`${styles.modBody} ${expanded ? styles.modBodyOpen : ""}`}
                role="region"
                aria-labelledby={bodyId}
            >
                <div className={styles.modBodyInner}>
                    <div className={styles.modBodyGrid}>
                        <div>
                            <span className={styles.modSectionLabel}>WHAT YOU&rsquo;LL COVER</span>
                            <ul className={styles.modTopics}>
                                {mod.topics.map((t) => (
                                    <li key={t}>
                                        <span className={styles.topicMarker} aria-hidden="true">
                                            →
                                        </span>
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <span className={styles.modSectionLabel}>STACK</span>
                            <div className={styles.modStackVertical}>
                                {mod.stack.map((s) => (
                                    <span key={s} className={styles.stackChip}>
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.modMetaWrap}>
                                <span className={styles.modSectionLabel}>MODULE</span>
                                <div className={styles.modMeta}>{num} of 25</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleRow;
