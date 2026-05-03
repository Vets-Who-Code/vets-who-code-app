import { BUDGET_CHIPS, SERVICE_CHIPS } from "@data/software-factory";
import axios from "axios";
import { useState } from "react";
import styles from "./cta.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

type SubmitState = "ready" | "sending" | "transmitted" | "error";

const CtaSection = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");
    const [brief, setBrief] = useState("");
    const [services, setServices] = useState<Set<string>>(new Set(["Web App"]));
    const [budget, setBudget] = useState("$50–150k");
    const [state, setState] = useState<SubmitState>("ready");
    const [errorMsg, setErrorMsg] = useState("");

    const toggleService = (chip: string) => {
        const next = new Set(services);
        if (next.has(chip)) next.delete(chip);
        else next.add(chip);
        setServices(next);
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setState("sending");
        setErrorMsg("");

        try {
            const message = [
                `Organization: ${org || "(not provided)"}`,
                `Services: ${
                    services.size > 0 ? Array.from(services).join(", ") : "(none selected)"
                }`,
                `Budget: ${budget}`,
                "",
                brief,
            ].join("\n");

            const res = await axios.post("/api/contact", {
                name,
                email,
                subject: "Software Factory — Discovery Request",
                message,
            });

            if (res.status === 200) {
                setState("transmitted");
            } else {
                setState("error");
                setErrorMsg("Server returned an error. Try again.");
            }
        } catch (err) {
            setState("error");
            setErrorMsg(err instanceof Error ? err.message : "Network error. Try again.");
        }
    };

    const reset = () => {
        setName("");
        setEmail("");
        setOrg("");
        setBrief("");
        setServices(new Set(["Web App"]));
        setBudget("$50–150k");
        setState("ready");
        setErrorMsg("");
    };

    const submitted = state === "transmitted";

    return (
        <section
            id="discovery"
            className={`dark-section tw-relative tw-bg-navy tw-py-[60px] md:tw-py-[100px] ${styles.section}`}
        >
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-2 lg:tw-gap-16">
                    <div>
                        <div
                            className="tw-flex tw-items-center tw-gap-3"
                            style={{
                                ...monoLabel,
                                fontSize: "12px",
                                color: "#FFFFFF",
                            }}
                        >
                            <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red" />
                            <span>SECTION 09 / CONTACT</span>
                        </div>
                        <h2
                            className="tw-mb-0 tw-mt-4 tw-uppercase tw-text-white"
                            style={{
                                fontFamily: "var(--font-headline)",
                                fontWeight: 800,
                                fontSize: "clamp(32px, 4vw, 56px)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.1,
                            }}
                        >
                            30 minutes.
                            <br />
                            No deck. No pitch.
                        </h2>
                        <p
                            className="tw-mt-6 tw-mb-0"
                            style={{
                                fontSize: "18px",
                                lineHeight: 1.6,
                                color: "rgba(185, 214, 242, 0.7)",
                                maxWidth: "520px",
                            }}
                        >
                            Tell us what you&rsquo;re trying to build. We&rsquo;ll listen, ask hard
                            questions, and tell you whether we&rsquo;re the right team — straight
                            up. If we&rsquo;re not, we&rsquo;ll tell you who is.
                        </p>
                        <ul className={styles.bullets}>
                            <li>· Currently booking Q3 2026</li>
                            <li>· 2 squads available</li>
                            <li>· Average response time: 1 business day</li>
                            <li>
                                · Or email:{" "}
                                <a href="mailto:factory@vetswhocode.io">factory@vetswhocode.io</a>
                            </li>
                        </ul>
                    </div>

                    <form className={styles.formCard} onSubmit={submit}>
                        <div className={styles.formHead}>
                            <span>FORM-09 / DISCOVERY REQUEST</span>
                            <span className={submitted ? styles.statusDone : styles.statusReady}>
                                {submitted ? "TRANSMITTED" : "READY"}
                            </span>
                        </div>

                        {submitted ? (
                            <div className={styles.success}>
                                <div className={styles.check}>✓</div>
                                <h3 className={styles.successTitle}>Transmission received.</h3>
                                <p className={styles.successBody}>
                                    We&rsquo;ll be in touch within one business day. In the
                                    meantime, expect a calendar link for a 30-minute discovery call.
                                </p>
                                <button type="button" onClick={reset} className={styles.btnGhost}>
                                    Send another →
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={styles.formRow}>
                                    <div className={styles.field}>
                                        <label htmlFor="sf-name">Your name</label>
                                        <input
                                            id="sf-name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Maria Rodriguez"
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="sf-email">Work email</label>
                                        <input
                                            id="sf-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="maria@yourorg.com"
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="sf-org">Organization</label>
                                    <input
                                        id="sf-org"
                                        type="text"
                                        value={org}
                                        onChange={(e) => setOrg(e.target.value)}
                                        placeholder="The Acme Veterans Foundation"
                                    />
                                </div>

                                <div className={styles.field}>
                                    <span className={styles.labelText}>
                                        What do you need built?
                                    </span>
                                    <div className={styles.chips}>
                                        {SERVICE_CHIPS.map((c) => {
                                            const selected = services.has(c);
                                            return (
                                                <button
                                                    type="button"
                                                    key={c}
                                                    aria-pressed={selected}
                                                    className={`${styles.chip} ${
                                                        selected ? styles.chipOn : ""
                                                    }`}
                                                    onClick={() => toggleService(c)}
                                                >
                                                    {c}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <span className={styles.labelText}>Budget range</span>
                                    <div className={styles.chips}>
                                        {BUDGET_CHIPS.map((c) => {
                                            const selected = budget === c;
                                            return (
                                                <button
                                                    type="button"
                                                    key={c}
                                                    aria-pressed={selected}
                                                    className={`${styles.chip} ${
                                                        selected ? styles.chipOn : ""
                                                    }`}
                                                    onClick={() => setBudget(c)}
                                                >
                                                    {c}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="sf-brief">A few sentences on the work</label>
                                    <textarea
                                        id="sf-brief"
                                        value={brief}
                                        onChange={(e) => setBrief(e.target.value)}
                                        placeholder="What problem are you solving, who for, and what's the rough timeline?"
                                        required={true}
                                    />
                                </div>

                                {state === "error" && errorMsg && (
                                    <p className={styles.errorMsg}>{errorMsg}</p>
                                )}

                                <div className={styles.formFoot}>
                                    <span>NDA AVAILABLE ON REQUEST · NO MARKETING LISTS</span>
                                    <button
                                        type="submit"
                                        disabled={state === "sending"}
                                        className={styles.btnPrimary}
                                    >
                                        {state === "sending" ? "Transmitting…" : "Transmit →"}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
