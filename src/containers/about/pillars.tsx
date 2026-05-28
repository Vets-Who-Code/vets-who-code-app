import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import styles from "./about.module.css";

type Treatment = "syllabus" | "timezones" | "terminal";

interface Pillar {
    n: string;
    kind: string;
    title: string;
    body: string;
    footnote: string;
    treatment: Treatment;
}

const PILLARS: Pillar[] = [
    {
        n: "01",
        kind: "Pedagogy",
        title: "Focus on Impactful Learning",
        body: "128 Lightcast-validated skills. Every module maps to what employers are hiring for — nothing we teach is decorative. If our students can't make money with it, we don't bother teaching it.",
        footnote: "128 skills · Lightcast-validated",
        treatment: "syllabus",
    },
    {
        n: "02",
        kind: "Format",
        title: "Learning Without Limits",
        body: "Remote-first since 2014. Train from your kitchen table, a barracks, or a PCS move — the program travels with you. Virtual lectures, live mentorship, your timezone.",
        footnote: "100% remote · since day one",
        treatment: "timezones",
    },
    {
        n: "03",
        kind: "Outcome",
        title: "Practical Coding Proficiency",
        body: "Be a software engineer. You'll debug, design systems, and ship code under pressure — not memorize syntax for a certificate. Pair programming, code reviews, real production work.",
        footnote: "Ship code · not certificates",
        treatment: "terminal",
    },
];

const SYLLABUS = [
    { code: "M01", name: "Foundations · JavaScript", n: 14 },
    { code: "M02", name: "React · TypeScript", n: 22 },
    { code: "M03", name: "APIs · Data · Auth", n: 18 },
    { code: "M04", name: "Testing · CI/CD", n: 16 },
    { code: "M05", name: "Systems Design", n: 20 },
    { code: "M06", name: "AI Integration", n: 14 },
    { code: "M07", name: "Production Engineering", n: 12 },
    { code: "M08", name: "Capstone · Crucible Project", n: 12 },
];

const TIMEZONES = [
    { city: "Fort Bragg, NC", z: "EST  —  0900" },
    { city: "Camp Pendleton", z: "PST  —  0600" },
    { city: "JBLM, WA", z: "PST  —  0600" },
    { city: "Ramstein AB, DE", z: "CET  —  1500" },
    { city: "Okinawa, JP", z: "JST  —  2200" },
    { city: "Honolulu, HI", z: "HST  —  0400" },
];

const TERMINAL_LINES: { kind: "prompt" | "out" | "ship"; text: string }[] = [
    { kind: "prompt", text: "$ vwc deploy --troop=t-217" },
    { kind: "out", text: "✓ PR opened    · 3 reviewers" },
    { kind: "out", text: "✓ CI passing   · 482 tests · 14.2s" },
    { kind: "out", text: "✓ Code review  · LGTM · sr.eng" },
    { kind: "prompt", text: "$ git push origin main" },
    { kind: "ship", text: "● SHIPPED to production" },
];

const visualHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(185,214,242,0.65)",
    paddingBottom: 8,
    borderBottom: "1px solid rgba(185,214,242,0.10)",
};

const visualFooter = {
    paddingTop: 8,
    borderTop: "1px solid rgba(185,214,242,0.10)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "rgba(185,214,242,0.55)",
};

const SyllabusVisual = () => (
    <div
        className="tw-mb-7 tw-flex tw-flex-col tw-overflow-hidden tw-bg-navy tw-text-white"
        style={{ aspectRatio: "5 / 3", padding: "18px 22px" }}
    >
        <div style={visualHeader}>
            <span>Syllabus · 128 skills</span>
            <span
                className="tw-text-gold"
                style={{
                    border: "1px solid rgba(253,179,48,0.35)",
                    padding: "2px 6px",
                    fontSize: 8,
                    letterSpacing: "0.16em",
                }}
            >
                Lightcast ✓
            </span>
        </div>
        <ul className="tw-m-0 tw-flex tw-flex-1 tw-list-none tw-flex-col tw-justify-center tw-p-0">
            {SYLLABUS.map((m) => (
                <li
                    key={m.code}
                    className="tw-grid tw-items-baseline tw-gap-2.5"
                    style={{
                        gridTemplateColumns: "32px 1fr auto",
                        padding: "1.5px 0",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "rgba(248,249,250,0.85)",
                        letterSpacing: "0.03em",
                    }}
                >
                    <span style={{ color: "rgba(185,214,242,0.5)", fontSize: 9 }}>{m.code}</span>
                    <span className="tw-text-white">{m.name}</span>
                    <span className="tw-text-gold" style={{ fontSize: 10, fontWeight: 600 }}>
                        {m.n}
                    </span>
                </li>
            ))}
        </ul>
        <div style={visualFooter}>
            <span>Total · validated</span>
            <span className="tw-text-red" style={{ fontSize: 11, letterSpacing: "0.10em" }}>
                128 / 128
            </span>
        </div>
    </div>
);

const TimezonesVisual = () => (
    <div
        className="tw-mb-7 tw-flex tw-flex-col tw-overflow-hidden tw-bg-navy tw-text-white"
        style={{ aspectRatio: "5 / 3", padding: "18px 22px" }}
    >
        <div style={visualHeader}>
            <span>Cohort · Active locations</span>
            <span
                aria-hidden="true"
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#27c93f",
                    boxShadow: "0 0 8px rgba(39,201,63,0.5)",
                }}
            />
        </div>
        <ul className="tw-m-0 tw-flex tw-flex-1 tw-list-none tw-flex-col tw-justify-center tw-p-0">
            {TIMEZONES.map((t, i) => (
                <li
                    key={t.city}
                    className="tw-grid tw-items-baseline tw-gap-2.5"
                    style={{
                        gridTemplateColumns: "22px 1fr auto",
                        padding: "2.5px 0",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        color: "rgba(248,249,250,0.85)",
                        letterSpacing: "0.04em",
                    }}
                >
                    <span style={{ color: "rgba(185,214,242,0.45)", fontSize: 9 }}>
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="tw-text-white">{t.city}</span>
                    <span
                        className="tw-text-gold"
                        style={{ letterSpacing: "0.06em", fontSize: 10 }}
                    >
                        {t.z}
                    </span>
                </li>
            ))}
        </ul>
        <div style={{ ...visualFooter, gap: 10 }}>
            <span
                aria-hidden="true"
                style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "1px solid var(--red)",
                }}
            />
            <span className="tw-flex-1">Standup convenes · 1300Z daily</span>
        </div>
    </div>
);

const TerminalVisual = () => (
    <div
        className="tw-mb-7 tw-flex tw-flex-col tw-overflow-hidden"
        style={{
            aspectRatio: "5 / 3",
            background: "#0c0a14",
            border: "1px solid rgba(185,214,242,0.12)",
        }}
    >
        <div
            className="tw-flex tw-items-center tw-gap-1.5"
            style={{
                padding: "8px 12px",
                background: "#161422",
                borderBottom: "1px solid rgba(185,214,242,0.08)",
            }}
        >
            {(["#ff5f56", "#ffbd2e", "#27c93f"] as const).map((c) => (
                <span
                    key={c}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: c,
                    }}
                />
            ))}
            <span
                className="tw-flex-1 tw-text-center"
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    color: "rgba(248,249,250,0.45)",
                    marginRight: 30,
                }}
            >
                final-project.t-217 — zsh
            </span>
        </div>
        <div
            className="tw-flex tw-flex-1 tw-flex-col tw-gap-0.5"
            style={{
                padding: "12px 16px 14px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                lineHeight: 1.55,
            }}
        >
            {TERMINAL_LINES.map((l) => (
                <div
                    key={l.text}
                    style={{
                        color:
                            l.kind === "prompt"
                                ? "#fff"
                                : l.kind === "ship"
                                  ? "var(--red)"
                                  : "rgba(185,214,242,0.7)",
                        fontWeight: l.kind === "ship" ? 700 : 400,
                        letterSpacing: l.kind === "ship" ? "0.08em" : 0,
                        textTransform: l.kind === "ship" ? "uppercase" : "none",
                        fontSize: 10.5,
                        marginTop: l.kind === "ship" ? 4 : 0,
                    }}
                >
                    {l.text}
                </div>
            ))}
            <div className="tw-mt-0.5 tw-flex tw-items-center tw-gap-1.5" aria-hidden="true">
                <span style={{ color: "#fff", fontSize: 10.5 }}>$</span>
                <span
                    className={styles.blinkSlow}
                    style={{
                        display: "inline-block",
                        width: 7,
                        height: 12,
                        background: "var(--gold)",
                    }}
                />
            </div>
        </div>
    </div>
);

const PillarVisual = ({ treatment }: { treatment: Treatment }) => {
    if (treatment === "syllabus") return <SyllabusVisual />;
    if (treatment === "timezones") return <TimezonesVisual />;
    return <TerminalVisual />;
};

const Pillars = () => {
    return (
        <section className="tw-bg-cream tw-py-[120px]" aria-labelledby="about-pillars-headline">
            <div className="tw-mx-auto tw-max-w-[1320px] tw-px-6 md:tw-px-12">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-grid tw-grid-cols-1 tw-gap-12 tw-border-b tw-pb-[72px] lg:tw-grid-cols-[1fr_1.4fr] lg:tw-items-end lg:tw-gap-20"
                    style={{ borderColor: "rgba(9,31,64,0.12)" }}
                >
                    <div>
                        <span
                            className="tw-inline-flex tw-items-center tw-gap-3 tw-text-[#6C757D]"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                            }}
                        >
                            <span
                                aria-hidden="true"
                                className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-red"
                            />
                            The Program · Three Promises
                        </span>
                        <h2
                            id="about-pillars-headline"
                            className="tw-m-0 tw-mt-6 tw-font-heading tw-uppercase tw-text-navy"
                            style={{
                                fontWeight: 900,
                                fontSize: "clamp(40px, 4.8vw, 64px)",
                                lineHeight: 1.02,
                                letterSpacing: "-0.025em",
                            }}
                        >
                            What we teach. How we teach it. Why it works.
                        </h2>
                    </div>
                    <div>
                        <p
                            className="tw-m-0 tw-font-body tw-text-[#495057]"
                            style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 560 }}
                        >
                            We are not a bootcamp. We are a selective, outcome-focused training
                            program that maps every hour of instruction to verified labor market
                            demand. The shape of the program is the shape of these three
                            commitments.
                        </p>
                        <span
                            className="tw-mt-5 tw-inline-flex tw-items-center tw-gap-2.5 tw-text-[#6C757D]"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{ width: 14, height: 1, background: "var(--red)" }}
                            />
                            Operating since 2014
                        </span>
                    </div>
                </motion.div>

                <div className="tw-mt-20 tw-grid tw-grid-cols-1 tw-gap-10 lg:tw-grid-cols-3">
                    {PILLARS.map((p) => (
                        <motion.article
                            key={p.n}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={scrollUpVariants}
                            className={styles.pillarCard}
                        >
                            <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between">
                                <span
                                    className="tw-font-heading tw-text-navy"
                                    style={{
                                        fontWeight: 900,
                                        fontSize: 56,
                                        letterSpacing: "-0.04em",
                                        lineHeight: 1,
                                    }}
                                >
                                    {p.n}
                                </span>
                                <span
                                    className="tw-text-[#6C757D]"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 10,
                                        letterSpacing: "0.18em",
                                        textTransform: "uppercase",
                                        padding: "6px 10px",
                                        border: "1px solid var(--silver)",
                                    }}
                                >
                                    {p.kind}
                                </span>
                            </div>
                            <PillarVisual treatment={p.treatment} />
                            <h3
                                className="tw-mb-3.5 tw-mt-0 tw-font-heading tw-uppercase tw-text-navy"
                                style={{
                                    fontWeight: 800,
                                    fontSize: 22,
                                    letterSpacing: "-0.01em",
                                    lineHeight: 1.15,
                                }}
                            >
                                {p.title}
                            </h3>
                            <p
                                className="tw-m-0 tw-font-body tw-text-[#495057]"
                                style={{ fontSize: 15.5, lineHeight: 1.72 }}
                            >
                                {p.body}
                            </p>
                            <div
                                className="tw-mt-auto tw-flex tw-items-center tw-justify-between tw-pt-6 tw-text-[#6C757D]"
                                style={{
                                    borderTop: "1px solid var(--silver)",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 10,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                }}
                            >
                                <span>
                                    <span className="tw-text-red">●</span>
                                    &nbsp;&nbsp;{p.footnote}
                                </span>
                                <span>{p.n} / 03</span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pillars;
