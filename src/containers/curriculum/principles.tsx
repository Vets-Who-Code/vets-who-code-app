import { PRINCIPLES } from "@data/curriculum";
import styles from "./curriculum.module.css";

const CurriculumPrinciples = () => {
    return (
        <section
            id="program"
            className={`dark-section tw-bg-navy ${styles.section}`}
            aria-labelledby="curriculum-principles-heading"
        >
            <div className="tw-container">
                <div className={styles.rowEnd}>
                    <div style={{ flex: "1 1 480px" }}>
                        <span className={styles.eyebrow}>HOW THE PROGRAM WORKS</span>
                        <h2
                            id="curriculum-principles-heading"
                            className={styles.h2}
                            style={{ maxWidth: "14ch" }}
                        >
                            Four principles. Twenty-five modules. One mission.
                        </h2>
                    </div>
                    <p className={styles.lead} style={{ maxWidth: "40ch", margin: 0 }}>
                        The Hashflag Stack is sequenced like a real engineering org would onboard
                        you — tools first, then framework, then domain, then operations.
                    </p>
                </div>

                <div className={styles.diffGrid}>
                    {PRINCIPLES.map((p) => (
                        <div key={p.n} className={styles.diff}>
                            <div className={styles.diffNum}>/ {p.n}</div>
                            <h3 className={styles.diffH3}>{p.t}</h3>
                            <p className={styles.diffBody}>{p.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurriculumPrinciples;
