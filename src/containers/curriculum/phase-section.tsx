import type { Phase } from "@data/curriculum";
import styles from "./curriculum.module.css";
import ModuleRow from "./module-row";

type PhaseSectionProps = {
    phase: Phase;
    alt: boolean;
    openMods: Set<number>;
    onToggleMod: (n: number) => void;
};

const PhaseSection = ({ phase, alt, openMods, onToggleMod }: PhaseSectionProps) => {
    const headingId = `${phase.id}-heading`;
    const moduleSpan = `M${String(phase.moduleRange[0]).padStart(2, "0")}–M${String(
        phase.moduleRange[1]
    ).padStart(2, "0")}`;

    const metaRows: Array<[string, string]> = [
        ["Window", phase.weeks],
        ["Modules", moduleSpan],
        ["Length", phase.durationLabel],
    ];

    return (
        <section
            id={phase.id}
            className={`dark-section tw-bg-navy ${styles.phaseSection} ${alt ? styles.sectionAlt : ""}`}
            aria-labelledby={headingId}
        >
            <div className="tw-container">
                <div className={styles.phaseHead}>
                    <div>
                        <div className={styles.phaseNum}>PHASE / {phase.num}</div>
                        <h2 id={headingId} className={styles.phaseName}>
                            {phase.name}
                        </h2>
                        <p className={styles.phaseTagline}>{phase.tagline}</p>
                    </div>
                    <div className={styles.phaseHeadRight}>
                        {metaRows.map(([k, v]) => (
                            <div key={k} className={styles.phaseMetaRow}>
                                <span className={styles.heroMetaKey}>{k}</span>
                                <span className={styles.heroMetaVal}>{v}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className={styles.phaseIntro}>{phase.intro}</p>

                <div className={styles.modList}>
                    {phase.modules.map((mod) => (
                        <ModuleRow
                            key={mod.n}
                            mod={mod}
                            expanded={openMods.has(mod.n)}
                            onToggle={() => onToggleMod(mod.n)}
                            showStack={true}
                        />
                    ))}
                </div>

                <div className={styles.phaseOutcome}>
                    <span className={styles.phaseOutcomeLabel}>PHASE OUTCOME</span>
                    <p className={styles.phaseOutcomeText}>{phase.outcome}</p>
                </div>
            </div>
        </section>
    );
};

export default PhaseSection;
