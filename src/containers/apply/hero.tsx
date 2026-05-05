import styles from "./apply.module.css";

const ApplyHero = () => {
    return (
        <section
            className={`dark-section tw-bg-navy ${styles.hero}`}
            aria-labelledby="apply-hero-heading"
        >
            <div className={styles.gridPattern} aria-hidden="true" />
            <div className="tw-container" style={{ position: "relative" }}>
                <div className={styles.briefBar}>
                    <span>OPERATIONS BRIEF · 26-A / COHORT INTAKE</span>
                    <span>CLASSIFICATION: PUBLIC</span>
                    <span>
                        <span className={styles.live} aria-hidden="true" />
                        NOW BOOKING · COHORT 26 (FALL)
                    </span>
                </div>

                <div className={styles.heroGrid}>
                    <div>
                        <span className={styles.eyebrow}>Step 0 · Read this first</span>
                        <h1 id="apply-hero-heading" className={styles.heroTitle}>
                            Apply for the
                            <br />
                            <span className={styles.accent}>next cohort.</span>
                        </h1>
                        <p className={styles.lead}>
                            We don&rsquo;t train veterans to fill seats. We train you to ship
                            production code, in real engagements, with a paycheck on the other side.
                            Six steps. Save and resume anytime.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 12,
                                marginTop: 28,
                            }}
                        >
                            <span className={styles.timePill}>6–8 minutes</span>
                            <span className={`${styles.timePill} ${styles.timePillSky}`}>
                                Save &amp; resume
                            </span>
                            <span className={`${styles.timePill} ${styles.timePillMuted}`}>
                                Mobile-friendly
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApplyHero;
