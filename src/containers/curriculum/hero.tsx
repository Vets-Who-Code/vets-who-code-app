import { HERO_META } from "@data/curriculum";
import Link from "next/link";
import styles from "./curriculum.module.css";

type HeroProps = {
    onJump: (id: string) => void;
};

const CurriculumHero = ({ onJump }: HeroProps) => {
    return (
        <section
            className={`dark-section tw-bg-navy ${styles.hero}`}
            aria-labelledby="curriculum-hero-heading"
        >
            <div className={styles.gridPattern} aria-hidden="true" />
            <div className="tw-container" style={{ position: "relative" }}>
                <div className={styles.briefBar}>
                    <span className={styles.live}>LIVE · COHORT 2027 INTAKE</span>
                    <span>VERSION 2.0 · DEC 2025</span>
                    <span>17 WEEKS · 25 MODULES · 128 SKILLS</span>
                    <span>VALIDATED · LIGHTCAST LABOR DATA</span>
                </div>

                <div className={styles.heroGrid}>
                    <div>
                        <span className={styles.eyebrow}>CURRICULUM · HASHFLAG STACK V2.0</span>
                        <h1 id="curriculum-hero-heading" className={styles.heroTitle}>
                            From Terminal
                            <br />
                            <span className={styles.heroTitleAccent}>to</span> Production AI.
                        </h1>
                        <p className={styles.lead}>
                            The Hashflag Stack is the technical accelerator built for veterans with
                            real lives. You won&rsquo;t quit your job or put your family on hold.
                            You&rsquo;ll level up while living your life — 20–30 hours a week, on
                            your schedule, building real software the entire time.
                        </p>
                        <div className={styles.heroActions}>
                            <Link
                                href="/apply"
                                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}
                            >
                                Apply for Cohort 2027 <span className={styles.arrow}>→</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => onJump("foundations")}
                                className={`${styles.btn} ${styles.btnOutlineLight} ${styles.btnLg}`}
                            >
                                Start at Module 01
                            </button>
                        </div>
                    </div>

                    <div className={styles.heroMeta}>
                        {HERO_META.map(([k, v]) => (
                            <div key={k} className={styles.heroMetaRow}>
                                <span className={styles.heroMetaKey}>{k}</span>
                                <span className={styles.heroMetaVal}>{v}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CurriculumHero;
