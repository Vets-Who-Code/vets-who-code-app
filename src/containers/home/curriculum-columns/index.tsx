import { PHASES } from "@data/curriculum";
import Link from "next/link";
import styles from "./curriculum-columns.module.css";

const CurriculumColumns = () => {
    return (
        <section
            className={`dark-section tw-bg-navy ${styles.section}`}
            aria-labelledby="home-curriculum-heading"
        >
            <div className={styles.gridPattern} aria-hidden="true" />
            <div className="tw-container" style={{ position: "relative" }}>
                <div className={styles.head}>
                    <div>
                        <span className={styles.eyebrow}>WHAT YOU&rsquo;LL LEARN</span>
                        <h2 id="home-curriculum-heading" className={styles.title}>
                            17 weeks. Four phases. One stack.
                        </h2>
                    </div>
                    <p className={styles.lead}>
                        The Hashflag Stack is sequenced like a real engineering org would onboard
                        you — tools first, then framework, then domain, then operations.
                    </p>
                </div>

                <div className={styles.grid}>
                    {PHASES.map((phase) => (
                        <Link
                            key={phase.id}
                            href={`/programs/core-curriculum#${phase.id}`}
                            className={styles.card}
                        >
                            <span className={styles.cardNum}>PHASE / {phase.num}</span>
                            <h3 className={styles.cardName}>{phase.name}</h3>
                            <p className={styles.cardTagline}>{phase.tagline}</p>
                            <div className={styles.cardMeta}>
                                <span className={styles.cardDuration}>{phase.durationLabel}</span>
                                <p className={styles.cardOutcome}>{phase.outcome}</p>
                                <span className={styles.cardCta}>
                                    View phase{" "}
                                    <span className={styles.arrow} aria-hidden="true">
                                        →
                                    </span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className={styles.foot}>
                    <Link href="/programs/core-curriculum" className={styles.viewAll}>
                        See the full curriculum <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CurriculumColumns;
