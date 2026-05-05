import { type ApplyFormData, STEPS, STORAGE_KEY, STORAGE_TTL_MS } from "@data/apply-form";
import { trackApplyEvent } from "@lib/apply-analytics";
import { type ApplyErrors, validateStep } from "@lib/apply-validation";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./apply.module.css";
import Confirmation from "./confirmation";
import ApplyHero from "./hero";
import StepRail from "./step-rail";
import { Step1, Step2, Step3, Step4, Step5, Step6 } from "./steps";

type StoredDraft = { data: ApplyFormData; savedAt: number };

const loadDraft = (): ApplyFormData | null => {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as StoredDraft;
        if (!parsed?.data || typeof parsed.savedAt !== "number") return null;
        if (Date.now() - parsed.savedAt > STORAGE_TTL_MS) {
            window.localStorage.removeItem(STORAGE_KEY);
            return null;
        }
        return parsed.data;
    } catch {
        return null;
    }
};

const saveDraft = (data: ApplyFormData) => {
    if (typeof window === "undefined") return;
    try {
        const payload: StoredDraft = { data, savedAt: Date.now() };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
        // localStorage may be unavailable (private mode, full quota) — ignore
    }
};

const clearDraft = () => {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
};

const ApplyContainer = () => {
    const [hydrated, setHydrated] = useState(false);
    const [current, setCurrent] = useState(1);
    const [data, setData] = useState<ApplyFormData>({ country: "United States" });
    const [errors, setErrors] = useState<ApplyErrors>({});
    const [completed, setCompleted] = useState<number[]>([]);
    const [whyOpen, setWhyOpen] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<ApplyFormData | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        const draft = loadDraft();
        if (draft) setData(draft);
        setHydrated(true);
        trackApplyEvent({ action: "step_view", step: 1 });
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        const t = setTimeout(() => saveDraft(data), 400);
        return () => clearTimeout(t);
    }, [data, hydrated]);

    // Close why-pop on outside click
    useEffect(() => {
        if (!whyOpen) return;
        const close = () => setWhyOpen(null);
        const t = setTimeout(() => document.addEventListener("click", close, { once: true }), 0);
        return () => {
            clearTimeout(t);
            document.removeEventListener("click", close);
        };
    }, [whyOpen]);

    const set = <K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) => {
        setData((d) => ({ ...d, [key]: value }));
    };

    const handleSubmit = async (payload: ApplyFormData) => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            const res = await axios.post("/api/apply", payload);
            if (res.status === 200) {
                clearDraft();
                setSubmitted(payload);
                trackApplyEvent({ action: "form_submit", success: true });
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                setSubmitError("Server returned an error. Try again in a moment.");
                trackApplyEvent({ action: "form_submit", success: false });
            }
        } catch (err) {
            setSubmitError(
                err instanceof Error
                    ? err.message
                    : "Network error. Check your connection and try again."
            );
            trackApplyEvent({ action: "form_submit", success: false });
        } finally {
            setSubmitting(false);
        }
    };

    const next = () => {
        const e = validateStep(current, data);
        setErrors(e);
        if (Object.keys(e).length > 0) {
            for (const field of Object.keys(e)) {
                trackApplyEvent({ action: "validation_error", step: current, field });
            }
            return;
        }
        if (!completed.includes(current)) {
            setCompleted([...completed, current]);
            trackApplyEvent({ action: "step_complete", step: current });
        }
        if (current < STEPS.length) {
            const nextStep = current + 1;
            setCurrent(nextStep);
            trackApplyEvent({ action: "step_view", step: nextStep });
            const target = document.querySelector(`.${styles.shell}`);
            if (target instanceof HTMLElement) {
                window.scrollTo({ top: target.offsetTop - 64, behavior: "smooth" });
            }
        } else {
            void handleSubmit(data);
        }
    };

    const back = () => {
        if (current > 1) {
            const prev = current - 1;
            setCurrent(prev);
            trackApplyEvent({ action: "step_view", step: prev });
        }
    };

    const jumpTo = (id: number) => {
        if (id <= current || completed.includes(id)) {
            setCurrent(id);
            trackApplyEvent({ action: "step_view", step: id });
        }
    };

    const onWhy = (id: string) => setWhyOpen(whyOpen === id ? null : id);

    const reset = () => {
        clearDraft();
        setSubmitted(null);
        setData({ country: "United States" });
        setCurrent(1);
        setErrors({});
        setCompleted([]);
        setSubmitError(null);
        trackApplyEvent({ action: "form_reset" });
    };

    if (submitted) {
        return <Confirmation data={submitted} onReset={reset} />;
    }

    const step = STEPS.find((s) => s.id === current);
    if (!step) return null;
    const isLast = current === STEPS.length;

    return (
        <>
            <ApplyHero />
            <section className={`dark-section tw-bg-navy ${styles.shell}`}>
                <div className="tw-container">
                    <div className={styles.grid}>
                        <StepRail current={current} completed={completed} onJump={jumpTo} />

                        <div className={styles.formCard}>
                            <div className={styles.formHead}>
                                <div className={styles.stepTag}>
                                    <span>
                                        <span className={styles.stepTagId}>FRAG-{step.num}</span> ·
                                        STEP {step.num} OF 0{STEPS.length}
                                    </span>
                                    <span>REQUIRED FIELDS MARKED *</span>
                                </div>
                                <h2 className={styles.formHeadTitle}>{step.label}.</h2>
                                <p className={styles.briefing}>
                                    <em>Briefing —</em> {step.context}
                                </p>
                            </div>

                            <div className={styles.formBody}>
                                {current === 1 && (
                                    <Step1
                                        data={data}
                                        set={set}
                                        errors={errors}
                                        whyOpen={whyOpen}
                                        onWhy={onWhy}
                                    />
                                )}
                                {current === 2 && (
                                    <Step2
                                        data={data}
                                        set={set}
                                        errors={errors}
                                        whyOpen={whyOpen}
                                        onWhy={onWhy}
                                    />
                                )}
                                {current === 3 && (
                                    <Step3
                                        data={data}
                                        set={set}
                                        errors={errors}
                                        whyOpen={whyOpen}
                                        onWhy={onWhy}
                                    />
                                )}
                                {current === 4 && (
                                    <Step4
                                        data={data}
                                        set={set}
                                        errors={errors}
                                        whyOpen={whyOpen}
                                        onWhy={onWhy}
                                    />
                                )}
                                {current === 5 && (
                                    <Step5
                                        data={data}
                                        set={set}
                                        errors={errors}
                                        whyOpen={whyOpen}
                                        onWhy={onWhy}
                                    />
                                )}
                                {current === 6 && (
                                    <Step6
                                        data={data}
                                        set={set}
                                        errors={errors}
                                        whyOpen={whyOpen}
                                        onWhy={onWhy}
                                    />
                                )}
                            </div>

                            <div className={styles.formFoot}>
                                <span className={styles.saveStatus}>
                                    Step {step.num} of 0{STEPS.length}
                                </span>
                                <div className={styles.formFootActions}>
                                    {submitError && (
                                        <span
                                            role="alert"
                                            style={{
                                                color: "#c5203e",
                                                fontFamily: "var(--font-mono)",
                                                fontSize: 11,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em",
                                                alignSelf: "center",
                                            }}
                                        >
                                            {submitError}
                                        </span>
                                    )}
                                    {current > 1 && (
                                        <button
                                            type="button"
                                            className={styles.btnGhost}
                                            onClick={back}
                                            disabled={submitting}
                                        >
                                            <span aria-hidden="true">←</span> Back
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className={styles.btnPrimary}
                                        onClick={next}
                                        disabled={submitting}
                                    >
                                        {submitting
                                            ? "Transmitting…"
                                            : isLast
                                              ? "Send it — I'm in"
                                              : "Next"}{" "}
                                        <span aria-hidden="true">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.trustStrip}>
                        <div className={styles.trustGrid}>
                            <div className={styles.trustHeading}>
                                Where our alumni
                                <strong>engineer.</strong>
                            </div>
                            <div className={styles.chips} role="list" aria-label="Alumni employers">
                                {[
                                    "Microsoft",
                                    "Amazon",
                                    "Google",
                                    "GitHub",
                                    "Meta",
                                    "Booz Allen",
                                    "USAA",
                                    "+ 200 more",
                                ].map((label) => (
                                    <span
                                        key={label}
                                        role="listitem"
                                        className={styles.chip}
                                        style={{ cursor: "default" }}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.testimonialStrip}>
                            <p className={styles.quote}>
                                &ldquo;The program emphasized the full-cycle development process —
                                from conceptualizing and presenting mockups to outlining user
                                journeys and breaking projects into workable chunks of code. This
                                approach fostered a deeper level of learning and far from the
                                typical copy-paste exercises.&rdquo;
                            </p>
                            <div className={styles.attrib}>
                                — Josh Morton · Staff Software Engineer @ Jump · VWC alum
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ApplyContainer;
