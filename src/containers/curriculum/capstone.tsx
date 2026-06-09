import { CAPSTONE } from "@data/curriculum";
import styles from "./curriculum.module.css";

const CurriculumCapstone = () => {
    return (
        <section
            id="capstone"
            className={`dark-section tw-bg-navy ${styles.capstoneSection}`}
            aria-labelledby="curriculum-capstone-heading"
        >
            <div className="tw-container">
                <div className={styles.capstoneGrid}>
                    <div>
                        <span className={styles.eyebrow}>{CAPSTONE.subtitle.toUpperCase()}</span>
                        <h2
                            id="curriculum-capstone-heading"
                            className={styles.h2}
                            style={{ marginTop: 18 }}
                        >
                            {CAPSTONE.title}
                        </h2>
                        <p className={styles.lead} style={{ marginTop: 24 }}>
                            {CAPSTONE.blurb}
                        </p>

                        <div className={styles.capstoneRequired}>
                            <span className={styles.capstoneSectionLabel}>REQUIRED SCOPE</span>
                            <ul className={styles.capstoneList}>
                                {CAPSTONE.required.map((r) => (
                                    <li key={r}>{r}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className={styles.capstoneStack}>
                            {Object.entries(CAPSTONE.stack).map(([key, items]) => (
                                <div key={key} className={styles.capStackRow}>
                                    <span className={styles.capStackKey}>{key}</span>
                                    <div className={styles.capStackVal}>
                                        {items.map((item) => (
                                            <span key={item} className={styles.stackChip}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.capstoneTag}>
                            <span>SHIP DATE</span>
                            <span>END OF WEEK 17</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CurriculumCapstone;
