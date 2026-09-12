import SEO from "@components/seo/page-seo";
import { SectionEyebrow, SharpHeadline } from "@components/ui/design-system";
import Layout from "@layout/layout-01";
import Button from "@ui/button";
import type { GetStaticProps, NextPage } from "next";

type PageWithLayout = NextPage & {
    Layout: typeof Layout;
};

// 2% fractal noise. Never higher — it reads as dirt above that.
const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const grain = { backgroundImage: GRAIN, opacity: 0.02, pointerEvents: "none" } as const;
const gridLines = {
    backgroundImage: "url('/images/bg/background-pattern-grid-line.png')",
    opacity: 0.14,
    pointerEvents: "none",
} as const;

const DUTY: Array<[string, string]> = [
    ["Commitment", "4–5 hrs / month"],
    ["Term", "One cohort · 17 weeks"],
    ["Cohort size", "10–15 troops"],
    ["Location", "Remote"],
];

const RELEASE = [
    {
        label: "Phase 01",
        heading: "I do",
        body: "The curriculum teaches. Twenty-five units across frontend, data, backend, and AI engineering.",
        you: false,
    },
    {
        label: "Phase 02 · You",
        heading: "We do",
        body: "The Mentor Corps. Judgment, tradeoffs, and the question a model cannot answer: would this survive code review at a real company.",
        you: true,
    },
    {
        label: "Phase 03",
        heading: "You do",
        body: "Evidence gates. The troop proves it alone, against a published rubric, graded by someone who is not you.",
        you: false,
    },
];

const TRACKS = [
    {
        label: "Track 1",
        heading: "Technical",
        paragraphs: [
            "Pre-gate artifact review, architectural tradeoffs, debugging workflow, git CLI, and the question that matters most: would this survive code review at a real company.",
            "Coverage follows the curriculum — React and TypeScript on the frontend, the data layer including pgvector, FastAPI on the backend, and AI engineering: RAG, agents, production AI APIs.",
        ],
    },
    {
        label: "Track 2",
        heading: "Translation",
        paragraphs: [
            "Turning mission experience into engineering impact statements, mock technical and behavioral screens, portfolio review, and offer negotiation.",
            "It runs light through the accelerator and becomes the main event at graduation.",
        ],
    },
];

const COMMITMENT = [
    ["01", "One 45-minute sync every week", "On a schedule you and your mentee set."],
    [
        "02",
        "One pre-gate artifact read per unit",
        "Returned within 48 hours, against the published rubric.",
    ],
    ["03", "Async access in the cohort Discord", "Within hours you state up front. Not always-on."],
    [
        "04",
        "Six months of Track 2 after graduation",
        "Mock screens, resume, interview loops, offer negotiation.",
    ],
];

const ARC = [
    {
        range: "Weeks 01–02",
        phase: "Onboarding",
        body: "Confirm the match, review their weakest units from intake, and agree on when they escalate rather than grind. They bring learning objectives, a working GitHub, and a first gate submission.",
        peak: false,
    },
    {
        range: "Weeks 03–06",
        phase: "Frontend",
        body: "The highest-touch phase. This is where attrition happens, so this is where you lean in hardest — unblocking and confidence, not lectures.",
        peak: true,
    },
    {
        range: "Weeks 07–10",
        phase: "Data layer",
        body: "Correctness review. Bad schema and query decisions fail quietly, and gates alone will not catch them. They explain their modeling choices out loud.",
        peak: false,
    },
    {
        range: "Weeks 11–14",
        phase: "Backend",
        body: "Tradeoff conversations, API contracts, CI/CD, and what production actually looks like. They walk you through the system design of their own work.",
        peak: false,
    },
    {
        range: "Weeks 15–17",
        phase: "AI engineering",
        body: "RAG and agent design judgment, and the difference between production-real and demo-real. Portfolio goes final and the job search opens.",
        peak: false,
    },
    {
        range: "+ Six months",
        phase: "Post-graduation",
        body: "Track 2 takes over while they apply, interview, and negotiate.",
        peak: false,
    },
];

// Verbatim from the lookingFor array in src/pages/mentor.tsx.
const LOOKING_FOR = [
    "Working software engineers with production experience — frontend, backend, full-stack, DevOps, AI/ML, or cloud infrastructure.",
    "Engineers who can commit to weekly check-ins and async code reviews for the duration of a 17-week cohort.",
    "People who give direct, honest feedback. Our troops come from the military — they don't need to be coddled, they need to be coached.",
    "VWC alumni who want to come back and pay it forward are especially welcome.",
];

const FAILURE_MODES = [
    "Writing the code for them",
    "Drifting into life coaching",
    "Contradicting the curriculum",
];

// Verbatim from src/pages/mentor.tsx, with the alumni line appended per the handoff.
const WHY = [
    {
        heading: "Not charity. Engineering leadership practice.",
        body: "Mentoring a VWC troop is the closest thing to managing a junior engineer without the HR paperwork. You'll practice giving code reviews that teach, running 1-on-1s that develop people, and translating your experience into guidance someone else can act on. Senior engineers and engineering managers consistently tell us that mentoring with VWC made them better at their day job.",
    },
    {
        heading: "Your time has measurable impact.",
        body: "This isn't a pen-pal program. Our troops ship code, pass technical interviews, and get hired. When your mentee lands a role at a company you respect, you'll know your Thursday evening code reviews had something to do with it. Our alumni are engineering at Microsoft, Accenture, Amazon, Google, GitHub, Booz Allen, and Deloitte. Many of them came back to mentor the next cohort.",
    },
];

const SECTION = "tw-py-20 md:tw-py-[112px]";
const MONO = "tw-font-mono tw-uppercase";

const MentorshipPage: PageWithLayout = () => {
    return (
        <>
            <SEO
                title="Mentorship Program | Vets Who Code"
                description="Staff the middle of the accelerator. One cohort, seventeen weeks, four to five hours a month — pre-gate artifact review and the judgment a model cannot supply."
            />

            {/* 1 — Hero */}
            <section className="tw-relative tw-isolate tw-overflow-hidden tw-bg-navy tw-pb-[104px] tw-pt-[120px]">
                <div className="tw-absolute tw-inset-0 -tw-z-10" style={gridLines} />
                <div className="tw-absolute tw-inset-0 -tw-z-10" style={grain} />
                <div className="tw-container tw-flex tw-flex-wrap tw-items-end tw-gap-16">
                    <div className="tw-flex-[1_1_420px]">
                        <SectionEyebrow label="Programs" subLabel="Mentor Corps" tone="dark" />
                        <h1 className="tw-mt-7 tw-font-heading tw-font-black tw-uppercase tw-leading-[0.94] tw-tracking-[-0.02em] tw-text-white [font-size:clamp(48px,7.4vw,104px)]">
                            Staff the
                            <br />
                            <span className="tw-text-gold">middle.</span>
                        </h1>
                        <p className="tw-mt-8 tw-max-w-[60ch] tw-font-body tw-text-[18px] tw-leading-[1.7] tw-text-[rgba(185,214,242,0.86)]">
                            The accelerator teaches in a gradual release model. Units are{" "}
                            <strong className="tw-font-semibold tw-text-white">I do</strong>.
                            Evidence gates are{" "}
                            <strong className="tw-font-semibold tw-text-white">you do</strong>. The
                            Mentor Corps staffs the band in between —{" "}
                            <strong className="tw-font-semibold tw-text-white">we do</strong> —
                            which is where veterans stall and where no automated system reaches.
                        </p>
                        <div className="tw-mt-10 tw-flex tw-flex-wrap tw-gap-4">
                            <Button path="/mentor" color="primary" size="md">
                                Apply to mentor
                            </Button>
                            {/*
                                Hand-rolled rather than <Button path="#commitment">: Anchor treats a
                                non-"/" path as external and defaults to target="_blank", so the
                                fragment would open a new tab.
                            */}
                            <a
                                href="#commitment"
                                className="tw-inline-flex tw-min-h-[48px] tw-items-center tw-justify-center tw-border tw-border-[rgba(185,214,242,0.28)] tw-px-8 tw-font-heading tw-text-xs tw-font-bold tw-uppercase tw-tracking-wider tw-text-white tw-transition-all tw-duration-300 tw-ease-out hover:tw-border-white hover:tw-bg-white/[0.06] md:tw-min-h-[52px]"
                            >
                                See the commitment
                            </a>
                        </div>
                    </div>

                    <div className="tw-flex-[1_1_300px] tw-border tw-border-[rgba(185,214,242,0.14)]">
                        <div
                            className={`tw-border-b tw-border-[rgba(185,214,242,0.14)] tw-px-6 tw-py-[18px] tw-text-[10px] tw-tracking-[0.14em] tw-text-[rgba(185,214,242,0.7)] ${MONO}`}
                        >
                            Duty description
                        </div>
                        <dl className="tw-m-0 tw-px-6">
                            {DUTY.map(([label, value], i) => (
                                <div
                                    key={label}
                                    className={`tw-flex tw-items-baseline tw-justify-between tw-gap-4 tw-py-4 ${i > 0 ? "tw-border-t tw-border-[rgba(185,214,242,0.09)]" : ""}`}
                                >
                                    <dt
                                        className={`tw-text-[10px] tw-tracking-[0.1em] tw-text-[rgba(185,214,242,0.7)] ${MONO}`}
                                    >
                                        {label}
                                    </dt>
                                    <dd className="tw-m-0 tw-text-right tw-font-heading tw-text-[15px] tw-font-bold tw-uppercase tw-text-white">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* 2 — Where you fit */}
            <section className={`tw-bg-white ${SECTION}`}>
                <div className="tw-container">
                    <SectionEyebrow label="01 / Gradual Release" />
                    <SharpHeadline as="h2" size="h2" className="tw-mt-4">
                        Where you fit.
                    </SharpHeadline>
                    <p className="tw-mt-6 tw-max-w-[62ch] tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-gray-300">
                        Your mentee is a working engineer in the making. You are a working engineer
                        already — a Vets Who Code graduate employed in the field, or a veteran
                        engineer from outside the accelerator. Either way, someone who has already
                        done the thing they are trying to do.
                    </p>
                    <div className="tw-mt-14 tw-grid tw-grid-cols-[repeat(auto-fit,minmax(240px,1fr))] tw-gap-6">
                        {RELEASE.map((phase) => (
                            <article
                                key={phase.heading}
                                className={`tw-border tw-border-gray-100 tw-p-[30px] ${phase.you ? "tw-border-t-2 tw-border-t-red tw-shadow-[0_10px_30px_rgba(9,31,64,0.08)]" : ""}`}
                            >
                                <div
                                    className={`tw-text-[10px] tw-tracking-[0.1em] ${MONO} ${phase.you ? "tw-text-red" : "tw-text-gray-200"}`}
                                >
                                    {phase.label}
                                </div>
                                <h3 className="tw-mb-3 tw-mt-4 tw-font-heading tw-text-[26px] tw-font-black tw-uppercase tw-leading-[1.05] tw-tracking-[-0.02em] tw-text-navy">
                                    {phase.heading}
                                </h3>
                                <p className="tw-m-0 tw-font-body tw-text-[15px] tw-leading-[1.7] tw-text-gray-300">
                                    {phase.body}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3 — Two tracks */}
            <section className={`tw-bg-cream ${SECTION}`}>
                <div className="tw-container">
                    {/* Charcoal, not slate: slate on cream fails contrast. */}
                    <SectionEyebrow
                        label="02 / Scope of Work"
                        className="[&_span]:tw-text-gray-300"
                    />
                    <SharpHeadline as="h2" size="h2" className="tw-mt-4">
                        Two tracks.
                    </SharpHeadline>
                    <div className="tw-mt-14 tw-grid tw-grid-cols-[repeat(auto-fit,minmax(300px,1fr))] tw-gap-[30px]">
                        {TRACKS.map((track) => (
                            <article
                                key={track.label}
                                className="tw-border-t-2 tw-border-red tw-bg-white tw-px-9 tw-py-10"
                            >
                                <div
                                    className={`tw-text-[10px] tw-tracking-[0.1em] tw-text-gray-200 ${MONO}`}
                                >
                                    {track.label}
                                </div>
                                <h3 className="tw-mb-5 tw-mt-4 tw-font-heading tw-text-[30px] tw-font-extrabold tw-uppercase tw-leading-[1.05] tw-tracking-[-0.02em] tw-text-navy">
                                    {track.heading}
                                </h3>
                                {track.paragraphs.map((p) => (
                                    <p
                                        key={p}
                                        className="tw-mb-4 tw-font-body tw-text-[16px] tw-leading-[1.7] tw-text-gray-300 last:tw-mb-0"
                                    >
                                        {p}
                                    </p>
                                ))}
                            </article>
                        ))}
                    </div>
                    <p className="tw-mt-[30px] tw-max-w-[74ch] tw-border-l-2 tw-border-navy tw-pl-6 tw-font-body tw-text-[16px] tw-leading-[1.7] tw-text-gray-300">
                        Mentorship is scoped deliberately{" "}
                        <strong className="tw-font-semibold tw-text-navy">above syntax</strong>.
                        Troops already have the harness — OpenCode and CodeGemma 2B — and it answers
                        faster than a human can. Your time goes to judgment. It is also not a
                        networking app and not a coffee chat.
                    </p>
                </div>
            </section>

            {/* 4 — The commitment */}
            <section id="commitment" className={`tw-relative tw-isolate tw-bg-navy ${SECTION}`}>
                <div className="tw-absolute tw-inset-0 tw-z-0" style={grain} />
                <div className="tw-container tw-relative tw-z-[1] tw-grid tw-grid-cols-[repeat(auto-fit,minmax(300px,1fr))] tw-items-start tw-gap-16">
                    <div>
                        <SectionEyebrow label="03 / Commitment" tone="dark" />
                        <h2 className="tw-m-0 tw-mt-4 tw-font-heading tw-font-black tw-uppercase tw-leading-[1.02] tw-tracking-[-0.02em] tw-text-white [font-size:clamp(34px,4.4vw,60px)]">
                            What you
                            <br />
                            <span className="tw-text-gold">owe them.</span>
                        </h2>
                        <p className="tw-mt-6 tw-max-w-[46ch] tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-[rgba(185,214,242,0.86)]">
                            Four to five hours a month, for one cohort. Standing appointments, not
                            availability. At the end of seventeen weeks you decide whether to take
                            another.
                        </p>
                    </div>
                    <ol className="tw-m-0 tw-list-none tw-p-0">
                        {COMMITMENT.map(([n, heading, sub], i) => (
                            <li
                                key={n}
                                className={`tw-grid tw-grid-cols-[44px_1fr] tw-gap-5 tw-border-t tw-border-[rgba(185,214,242,0.12)] tw-py-[26px] ${i === COMMITMENT.length - 1 ? "tw-border-b" : ""}`}
                            >
                                <span
                                    className={`tw-text-[11px] tw-tracking-[0.1em] tw-text-gold ${MONO}`}
                                >
                                    {n}
                                </span>
                                <div>
                                    <h3 className="tw-m-0 tw-font-heading tw-text-[17px] tw-font-bold tw-uppercase tw-leading-[1.3] tw-tracking-[-0.01em] tw-text-white">
                                        {heading}
                                    </h3>
                                    <p className="tw-m-0 tw-mt-2 tw-font-body tw-text-[15px] tw-leading-[1.7] tw-text-[rgba(185,214,242,0.78)]">
                                        {sub}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 5 — The 17-week arc */}
            <section className={`tw-bg-white ${SECTION}`}>
                <div className="tw-container">
                    <SectionEyebrow label="04 / Timeline" />
                    <SharpHeadline as="h2" size="h2" className="tw-mt-4">
                        How it runs across
                        <br />
                        seventeen weeks.
                    </SharpHeadline>
                    <p className="tw-mt-6 tw-max-w-[62ch] tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-gray-300">
                        The load is not flat. Weeks three through six are where attrition happens,
                        and that is where you lean in hardest.
                    </p>

                    <div className="tw-mt-14 tw-border-l tw-border-gray-100">
                        {ARC.map((phase) => (
                            <div
                                key={phase.phase}
                                className="tw-relative tw-grid tw-grid-cols-[200px_1fr] tw-gap-8 tw-pb-11 tw-pl-8 max-md:tw-grid-cols-1 max-md:tw-gap-2"
                            >
                                <span
                                    aria-hidden="true"
                                    className={
                                        phase.peak
                                            ? "tw-absolute -tw-left-[6px] tw-top-1 tw-h-[11px] tw-w-[11px] tw-bg-red"
                                            : "tw-absolute -tw-left-[4px] tw-top-1.5 tw-h-[7px] tw-w-[7px] tw-bg-navy"
                                    }
                                />
                                <div>
                                    <div
                                        className={`tw-text-[11px] tw-tracking-[0.1em] ${MONO} ${phase.peak ? "tw-text-red" : "tw-text-gray-200"}`}
                                    >
                                        {phase.range}
                                    </div>
                                    {phase.peak && (
                                        <div
                                            className={`tw-mt-1 tw-text-[10px] tw-tracking-[0.14em] tw-text-red ${MONO}`}
                                        >
                                            Peak load
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="tw-m-0 tw-font-heading tw-text-[22px] tw-font-extrabold tw-uppercase tw-leading-[1.1] tw-tracking-[-0.01em] tw-text-navy">
                                        {phase.phase}
                                    </h3>
                                    <p className="tw-m-0 tw-mt-3 tw-max-w-[64ch] tw-font-body tw-text-[16px] tw-leading-[1.7] tw-text-gray-300">
                                        {phase.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="tw-ml-8 tw-mt-10 tw-max-w-[74ch] tw-font-body tw-text-[15px] tw-leading-[1.7] tw-text-gray-200">
                        Data structures and algorithms run as a continuous thread across all
                        seventeen weeks, on their own recurring touch, because interviews are shaped
                        differently than the work.
                    </p>
                </div>
            </section>

            {/* 6 — Who we're looking for */}
            <section className={`tw-bg-cream ${SECTION}`}>
                <div className="tw-container tw-grid tw-grid-cols-[repeat(auto-fit,minmax(300px,1fr))] tw-items-start tw-gap-16">
                    <div>
                        <SectionEyebrow
                            label="05 / Qualifications"
                            className="[&_span]:tw-text-gray-300"
                        />
                        <h2 className="tw-m-0 tw-mt-4 tw-font-heading tw-font-black tw-uppercase tw-leading-[1.02] tw-tracking-[-0.02em] tw-text-navy [font-size:clamp(34px,4.4vw,60px)]">
                            Who we&apos;re
                            <br />
                            <span className="tw-text-red">looking for.</span>
                        </h2>
                        <p className="tw-mt-6 tw-max-w-[46ch] tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-gray-300">
                            You don&apos;t need to be a veteran to mentor. You need to be good at
                            your job and willing to invest time in someone who&apos;s working to get
                            where you are.
                        </p>
                    </div>
                    <ul className="tw-m-0 tw-flex tw-list-none tw-flex-col tw-gap-[22px] tw-p-0">
                        {LOOKING_FOR.map((item) => (
                            <li
                                key={item}
                                className="tw-grid tw-grid-cols-[16px_1fr] tw-gap-[18px]"
                            >
                                <span
                                    aria-hidden="true"
                                    className="tw-mt-[13px] tw-h-[2px] tw-w-4 tw-bg-red"
                                />
                                <span className="tw-font-body tw-text-[17px] tw-leading-[1.62] tw-text-gray-300">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 7 — Guardrails */}
            <section className={`tw-bg-white ${SECTION}`}>
                <div className="tw-container">
                    <SectionEyebrow label="06 / Guardrails" />
                    <SharpHeadline as="h2" size="h2" className="tw-mt-4">
                        You never grade
                        <br />
                        their gate.
                    </SharpHeadline>
                    <p className="tw-mt-6 tw-max-w-[66ch] tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-gray-300">
                        This one is structural, not a courtesy. A veteran will not admit &ldquo;I
                        don&apos;t understand this unit&rdquo; to the person who decides whether
                        they pass. Grading and mentorship stay in separate hands so the weekly sync
                        is a place they can be honest about what is not landing.
                    </p>
                    <p className="tw-mt-5 tw-max-w-[66ch] tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-gray-300">
                        You review against the published rubric for each unit — not personal
                        preference. Before your cohort starts, you are briefed on the three failure
                        modes that make mentorship worse than nothing.
                    </p>
                    <div className="tw-mt-12 tw-grid tw-grid-cols-[repeat(auto-fit,minmax(240px,1fr))] tw-gap-6">
                        {FAILURE_MODES.map((mode, i) => (
                            <div
                                key={mode}
                                className="tw-border tw-border-gray-100 tw-bg-gray-50 tw-p-7"
                            >
                                <div
                                    className={`tw-text-[10px] tw-tracking-[0.1em] tw-text-red ${MONO}`}
                                >
                                    Failure mode {String(i + 1).padStart(2, "0")}
                                </div>
                                <p className="tw-m-0 tw-mt-3 tw-font-heading tw-text-[18px] tw-font-bold tw-uppercase tw-leading-[1.25] tw-tracking-[-0.01em] tw-text-navy">
                                    {mode}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8 — Why engineers mentor */}
            <section className={`tw-bg-cream ${SECTION}`}>
                <div className="tw-container">
                    <SectionEyebrow
                        label="07 / Leadership & Impact"
                        className="[&_span]:tw-text-gray-300"
                    />
                    <h2 className="tw-m-0 tw-mt-4 tw-font-heading tw-font-black tw-uppercase tw-leading-[1.02] tw-tracking-[-0.02em] tw-text-navy [font-size:clamp(34px,4.4vw,60px)]">
                        It&apos;s practice.
                        <br />
                        <span className="tw-text-red">It&apos;s impact.</span>
                    </h2>
                    <div className="tw-mt-14 tw-grid tw-grid-cols-[repeat(auto-fit,minmax(300px,1fr))] tw-gap-[30px]">
                        {WHY.map((card) => (
                            <article
                                key={card.heading}
                                className="tw-border-t-2 tw-border-red tw-bg-white tw-px-8 tw-py-9"
                            >
                                <h3 className="tw-m-0 tw-mb-4 tw-font-heading tw-text-[20px] tw-font-bold tw-uppercase tw-leading-[1.2] tw-tracking-[-0.01em] tw-text-navy">
                                    {card.heading}
                                </h3>
                                <p className="tw-m-0 tw-font-body tw-text-[16px] tw-leading-[1.7] tw-text-gray-300">
                                    {card.body}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9 — Closing CTA */}
            <section className="tw-relative tw-isolate tw-bg-navy tw-py-20 md:tw-py-[104px]">
                <div className="tw-absolute tw-inset-0 tw-z-0" style={grain} />
                <div className="tw-container tw-relative tw-z-[1] tw-grid tw-grid-cols-[repeat(auto-fit,minmax(300px,1fr))] tw-items-center tw-gap-12">
                    <div>
                        <span
                            aria-hidden="true"
                            className="tw-mb-7 tw-inline-block tw-h-px tw-w-12 tw-bg-red"
                        />
                        <h2 className="tw-m-0 tw-font-heading tw-font-black tw-uppercase tw-leading-[1.02] tw-tracking-[-0.02em] tw-text-white [font-size:clamp(32px,4vw,52px)]">
                            Take one cohort.
                        </h2>
                        <p className="tw-mt-6 tw-max-w-[52ch] tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-[rgba(185,214,242,0.86)]">
                            Seventeen weeks, four to five hours a month, one engineer who will
                            remember your name for the rest of their career.
                        </p>
                    </div>
                    <div className="md:tw-justify-self-end">
                        <Button path="/mentor" color="primary" size="md">
                            Apply to mentor
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

MentorshipPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default MentorshipPage;
