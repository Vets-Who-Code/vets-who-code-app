import SectionTitle from "@components/section-title";
import { FOR_YOU, HOW_IT_RUNS, NOT_FOR_YOU, PROGRAM_FACTS, PROOF } from "@data/accelerator";
import { MANIFEST } from "@lib/curriculum-graph";
import Button from "@ui/button";
import Link from "next/link";
import styles from "./accelerator.module.css";

const COUNTS = MANIFEST.counts;

const AcceleratorContainer = () => (
    <>
        <section
            className={`dark-section ${styles.hero}`}
            aria-labelledby="accelerator-hero-heading"
        >
            <div className="tw-container">
                <span className={styles.eyebrowDark}>
                    <span className={styles.eyebrowBar} />
                    The Program
                </span>
                <h1 id="accelerator-hero-heading" className={styles.heroTitle}>
                    A software engineering accelerator for people who already know how to train.
                </h1>
                <p className={styles.heroLede}>
                    Seventeen weeks, remote-first, free. The learning platform carries the things
                    that don&rsquo;t change, so the hours with people go where they actually count —
                    pairing, reviewing and building real software with you.
                </p>
                <div className={styles.heroActions}>
                    <Button path="/apply" size="md" color="primary" hover="default">
                        Apply
                    </Button>
                    <Link href="/curriculum" className={styles.heroSecondary}>
                        See how we map the skills →
                    </Link>
                </div>

                <dl className={styles.factRow}>
                    {PROGRAM_FACTS.map(([term, value]) => (
                        <div key={term} className={styles.fact}>
                            <dt className={styles.factTerm}>{term}</dt>
                            <dd className={styles.factValue}>{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>

        <section className={styles.fitSection}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    subtitle="Fit"
                    title="Who this is for"
                    description="We screen for fit, not pedigree. It is worth being honest with yourself before you spend twelve minutes on an application."
                />
                <div className={styles.fitGrid}>
                    <div className={styles.fitCard}>
                        <p className={styles.fitLabel}>This is you</p>
                        <ul className={styles.fitList}>
                            {FOR_YOU.map((item) => (
                                <li key={item} className={styles.fitItem}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`${styles.fitCard} ${styles.fitCardNegative}`}>
                        <p className={styles.fitLabel}>This is not</p>
                        <ul className={styles.fitList}>
                            {NOT_FOR_YOU.map((item) => (
                                <li key={item} className={styles.fitItem}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section className={styles.howSection}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    subtitle="How it runs"
                    title="Trained, not taught"
                    description="A course hands you a video library. An accelerator puts the durable material on a platform and spends the human hours on the work that needs a human."
                />
                <div className={styles.howGrid}>
                    {HOW_IT_RUNS.map((item) => (
                        <div key={item.index} className={styles.howCard}>
                            <span className={styles.howIndex}>{item.index}</span>
                            <h3 className={styles.cardHeading}>{item.title}</h3>
                            <p className={styles.cardBody}>{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* The curriculum lives at /curriculum. This block exists to hand people off to it,
            not to restate it — that is what kept the two pages contradicting each other. */}
        <section className={`dark-section ${styles.methodSection}`}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    color="C"
                    subtitle="The method"
                    title="We don't write a syllabus. We compute a path."
                    description="What we teach is not a matter of taste. It is a map of how skills rest on one another, built from labor-market demand and published in full so you can check it."
                />
                <div className={styles.methodGrid}>
                    <div className={styles.methodStat}>
                        <p className={styles.methodValue}>{COUNTS.topics}</p>
                        <p className={styles.methodLabel}>Micro-topics mapped</p>
                    </div>
                    <div className={styles.methodStat}>
                        <p className={styles.methodValue}>{COUNTS.edges}</p>
                        <p className={styles.methodLabel}>Links, each with a written reason</p>
                    </div>
                    <div className={styles.methodStat}>
                        <p className={styles.methodValue}>{COUNTS.domains}</p>
                        <p className={styles.methodLabel}>
                            Domains across {COUNTS.subjects} subjects
                        </p>
                    </div>
                </div>
                <p className={styles.methodBody}>
                    Every concept carries the market evidence for why it is in the program and the
                    criterion it is judged against. Every link between two concepts carries a
                    sentence explaining what one gives the other. None of it gates you — it is there
                    so you can see how we decide, how we train, and what any skill is actually made
                    of.
                </p>
                <Link href="/curriculum" className={styles.methodLink}>
                    Explore the skill map →
                </Link>
            </div>
        </section>

        <section className={styles.proofSection}>
            <div className="tw-container">
                <span className={styles.eyebrowLight}>
                    <span className={styles.eyebrowBar} />
                    What it costs you
                </span>
                <div className={styles.proofGrid}>
                    {PROOF.map((cell) => (
                        <div key={cell.label} className={styles.proofCell}>
                            <p className={styles.proofStat}>{cell.stat}</p>
                            <p className={styles.proofLabel}>{cell.label}</p>
                            <p className={styles.proofGloss}>{cell.gloss}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className={styles.ctaSection}>
            <div className={`tw-container ${styles.ctaInner}`}>
                <div>
                    <p className={styles.ctaTitle}>Retool. Retrain. Relaunch.</p>
                    <p className={styles.monoMeta}>
                        Rolling applications · about 12 minutes · U.S. veterans, service members
                        &amp; spouses
                    </p>
                </div>
                <Button path="/apply" size="md" color="primary" hover="default">
                    Apply
                </Button>
            </div>
        </section>
    </>
);

export default AcceleratorContainer;
