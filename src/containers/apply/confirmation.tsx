import type { ApplyFormData } from "@data/apply-form";
import Link from "next/link";
import styles from "./apply.module.css";

type ConfirmationProps = {
    data: ApplyFormData;
    onReset: () => void;
};

const Confirmation = ({ data, onReset }: ConfirmationProps) => (
    <section className={`dark-section tw-bg-navy ${styles.confirmShell}`}>
        <div className="tw-container">
            <div className={styles.briefBar} style={{ marginBottom: 56 }}>
                <span>OPERATIONS BRIEF · 26-A / TRANSMISSION RECEIVED</span>
                <span>STATUS: IN QUEUE</span>
                <span>
                    <span className={styles.live} aria-hidden="true" />
                    HUMAN REVIEW · ~48 HRS
                </span>
            </div>

            <span className={styles.eyebrow}>Step 06 / 06 · Complete</span>
            <h1 className={styles.heroTitle} style={{ maxWidth: "14ch" }}>
                We&rsquo;ve got you,
                <br />
                <span className={styles.accent}>{data.firstName ?? "troop"}.</span>
            </h1>

            <div className={styles.confirmGrid}>
                <div className={styles.confirmCard}>
                    <span className={styles.confirmStamp}>✓ APPLICATION RECEIVED</span>
                    <h2 className={styles.confirmH2}>What happens next.</h2>
                    <p className={styles.confirmLead}>
                        A real human at VWC will read this — usually within 48 hours. While you
                        wait, here are three things that will make your interview go better.
                    </p>

                    <ol className={styles.nextSteps}>
                        <li className={styles.nextStep}>
                            <span className={styles.nextStepNum}>01</span>
                            <div>
                                <h4 className={styles.nextStepTitle}>Knock out the prework</h4>
                                <p className={styles.nextStepBody}>
                                    One weekend&rsquo;s worth of HTML/CSS/JS. We email you the repo.
                                    Doing it before your interview is the strongest signal
                                    you&rsquo;ll send.
                                </p>
                            </div>
                            <Link
                                className={styles.ctaLink}
                                href="https://github.com/Vets-Who-Code/vwc-prework"
                            >
                                Open prework →
                            </Link>
                        </li>
                        <li className={styles.nextStep}>
                            <span className={styles.nextStepNum}>02</span>
                            <div>
                                <h4 className={styles.nextStepTitle}>Read three field reports</h4>
                                <p className={styles.nextStepBody}>
                                    Stories from cohort grads — what they shipped, what they got
                                    wrong, where they landed. Skim two before your call.
                                </p>
                            </div>
                            <Link className={styles.ctaLink} href="/blogs">
                                Read the blog →
                            </Link>
                        </li>
                        <li className={styles.nextStep}>
                            <span className={styles.nextStepNum}>03</span>
                            <div>
                                <h4 className={styles.nextStepTitle}>Try a free reps challenge</h4>
                                <p className={styles.nextStepBody}>
                                    15 minutes a day for a week. Tiny, daily, JS-only puzzles.
                                    Builds the muscle that shows up on day one.
                                </p>
                            </div>
                            <Link className={styles.ctaLink} href="/learn">
                                Start reps →
                            </Link>
                        </li>
                    </ol>
                </div>

                <div>
                    <div className={styles.signedNote}>
                        <div className={styles.signedNoteFrom}>FROM</div>
                        <div className={styles.signedNoteFromLine}>JEROME HARDAWAY · CO · VWC</div>
                        <p className={styles.signedNoteBody}>
                            Saw your application come in. We&rsquo;ll be in touch this week. Bring a
                            notebook to the call — we go fast.
                        </p>
                        <div className={styles.signedNoteSig}>— Jerome</div>
                        <div className={styles.signedNoteFoot}>
                            Reply directly · jerome@vetswhocode.io
                        </div>
                    </div>

                    <div className={styles.confirmActions}>
                        <div className={styles.confirmActionsHead}>While you wait</div>
                        <Link href="/contact" className={styles.btnOutline}>
                            <span>JOIN OUR DISCORD · MEET THE COHORT</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <Link href="/" className={styles.btnOutline}>
                            <span>REFER ANOTHER VETERAN</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                        <button
                            type="button"
                            onClick={onReset}
                            className={styles.btnOutline}
                            style={{ cursor: "pointer" }}
                        >
                            <span>SUBMIT ANOTHER APPLICATION</span>
                            <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Confirmation;
