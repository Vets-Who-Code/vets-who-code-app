import { CTA_ASIDE_ROWS } from "@data/curriculum";
import Link from "next/link";
import styles from "./curriculum.module.css";

const CurriculumCta = () => {
    return (
        <section
            id="apply"
            className={`dark-section tw-bg-navy ${styles.cta}`}
            aria-labelledby="curriculum-cta-heading"
        >
            <div className="tw-container">
                <div className={styles.ctaGrid}>
                    <div>
                        <span className={styles.eyebrow}>COHORT 2027 · INTAKE OPEN</span>
                        <h2 id="curriculum-cta-heading" className={styles.ctaTitle}>
                            Code is the new combat boots. Lace up.
                        </h2>
                        <p className={styles.ctaLead}>
                            Application takes about 12 minutes — six steps. We screen for fit, not
                            pedigree. If you served and you&rsquo;re serious, we want to see your
                            application.
                        </p>
                        <div className={styles.heroActions}>
                            <Link
                                href="/apply"
                                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}
                            >
                                Apply for Cohort 2027 <span className={styles.arrow}>→</span>
                            </Link>
                            <Link
                                href="#program"
                                className={`${styles.btn} ${styles.btnOutlineLight} ${styles.btnLg}`}
                            >
                                Read the principles
                            </Link>
                        </div>
                    </div>

                    <aside className={styles.ctaAside}>
                        <div className={styles.ctaAsideHead}>
                            <span>NEXT COHORT</span>
                            <span>· COHORT 2027</span>
                        </div>
                        {CTA_ASIDE_ROWS.map(([k, v]) => (
                            <div key={k} className={styles.ctaAsideRow}>
                                <span className={styles.ctaAsideKey}>{k}</span>
                                <span className={styles.ctaAsideVal}>{v}</span>
                            </div>
                        ))}
                        <p className={styles.ctaAsideNote}>
                            VWC is a 501(c)(3). We&rsquo;re free for veterans because sponsors pay
                            for the seat — not because the program is cheap.
                        </p>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default CurriculumCta;
