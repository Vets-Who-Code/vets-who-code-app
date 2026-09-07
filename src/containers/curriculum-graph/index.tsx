import SectionTitle from "@components/section-title";
import { MANIFEST, SUBJECTS, TOPICS } from "@lib/curriculum-graph";
import Button from "@ui/button";
import styles from "./curriculum-graph.module.css";
import GraphPanel from "./graph-panel";

// Counts come from the dataset manifest, not from copy — the page's claim is that the
// data is the argument, so nothing here is allowed to drift from the data.
const COUNTS = MANIFEST.counts;
const MANIFEST_CELLS = [
    {
        value: String(COUNTS.topics),
        label: "Micro-topics",
        gloss: "One teachable idea each. Not a chapter — an idea.",
    },
    {
        value: String(COUNTS.edges),
        label: "Prerequisite links",
        gloss: `${COUNTS.hardEdges} that carry weight, ${COUNTS.softEdges} that smooth the way.`,
    },
    {
        value: String(COUNTS.domains),
        label: "Domains",
        gloss: `Grouped into ${COUNTS.subjects} subjects.`,
    },
    {
        value: String(COUNTS.maxDepth),
        label: "Deepest path",
        gloss: `${COUNTS.roots} places to start. ${COUNTS.terminals} places to finish.`,
    },
    {
        value: MANIFEST.acyclic ? "0" : "!",
        label: "Cycles",
        gloss: "Nothing is its own prerequisite. We check.",
    },
];

const LAYERS = [
    {
        index: "01",
        question: "Where are we going?",
        title: "The job market picks the destination, not us",
        body: "We look at what employers are actually paying people to do — Lightcast demand data, O*NET, BLS wages — and let that decide what belongs on the map. When the market moves, we rebuild behind it. Nobody here teaches a thing because we happen to know it.",
    },
    {
        index: "02",
        question: "In what order?",
        title: "What a skill rests on picks the route",
        body: "We broke every concept down to a single teachable idea and wired it to what it stands on. The order isn't a judgment call and it isn't a table of contents — it falls out of the map. If we can't say what an idea rests on, it isn't ready to teach.",
    },
    {
        index: "03",
        question: "To what depth?",
        title: "Crawl, walk, run picks the depth",
        body: "Every idea gets met three times, with less help each time: we show it, then you do it with a spotter, then you do it alone. Educators call this Gradual Release of Responsibility. Every veteran we've ever trained already knows it by the other name.",
    },
    {
        index: "04",
        question: "How do we know it took?",
        title: "An artifact closes it out, or nothing does",
        body: "Nothing gets checked off because a video ended. Each idea names the thing you have to produce and the standard it gets judged against. You built it and it meets the criterion, or you're not done. Trained to standard, or not trained.",
    },
];

// A real record, read straight out of the dataset — the section's claim is that every
// node is specified to this level, so it must not be a hand-written mock.
const SAMPLE = TOPICS.find((t) => t.id === "ret-faithful") ?? TOPICS[0];
const SAMPLE_SUBJECT = SUBJECTS.find((s) => s.id === SAMPLE.subject)?.title ?? SAMPLE.subject;
const NODE_RECORD: [string, React.ReactNode][] = [
    ["Concept", SAMPLE.label],
    ["Description", SAMPLE.description],
    ["Subject", SAMPLE_SUBJECT],
    ["Domain", SAMPLE.domain],
    [
        "Type",
        <>
            {SAMPLE.type}{" "}
            <span className={styles.recordAside}>
                (of: conceptual / procedural / representational / language / meta)
            </span>
        </>,
    ],
    [
        "Exit depth",
        <>
            {SAMPLE.exitDepth}{" "}
            <span className={styles.recordAside}>(of: guided / scaffolded / unassisted)</span>
        </>,
    ],
    ["Market anchor", SAMPLE.marketAnchor.join(" · ")],
    ["Evidence criterion", SAMPLE.evidence],
    ["Prerequisite depth", `${SAMPLE.depth} — longest chain of load-bearing links beneath it`],
];

const QUESTIONS = [
    {
        title: "Where does this specific person start?",
        body: "A veteran who's run Linux for a decade shouldn't sit through week one of the command line. The map already knows what that decade covers and what it reaches, so we start them at the edge of it instead of the beginning of everything.",
    },
    {
        title: "What does this specific job actually require?",
        body: "Take a real posting, name the ideas it asks for, and the map returns the set that reaches them and the order they have to come in. Not “learn React” — the eleven things under React that make React make sense.",
    },
    {
        title: "Why is any of this being taught?",
        body: `Every idea carries the market anchor that put it there and the artifact that closes it. Every link carries its reason. When a donor asks what their giving made possible, the answer isn't hours logged — it's ${COUNTS.topics} standards met, each one named.`,
    },
];

const PROVENANCE = [
    {
        kicker: "Graph structure",
        title: "Marble open taxonomy",
        body: "1,590 topics, 3,221 edges, ODbL 1.0. A different subject entirely, but the architecture was right and we didn't need to reinvent it.",
    },
    {
        kicker: "Market layer",
        title: "Lightcast · O*NET · BLS",
        body: "Skill demand, occupational profiles, and wage data. This is what sets the target.",
    },
    {
        kicker: "Depth model",
        title: "Gradual Release of Responsibility",
        body: "Fifty years of instructional research behind the thing veterans already call crawl, walk, run.",
    },
];

const CurriculumGraphContainer = () => (
    <>
        <div className={styles.metaStrip}>
            2026 Cohort Active &nbsp;·&nbsp; 17 weeks &nbsp;·&nbsp; Free &nbsp;·&nbsp; Remote
        </div>

        <GraphPanel />

        <section className={styles.insideSection}>
            <div className="tw-container">
                <SectionTitle align="left" title="What this looks like from the inside" />
                <div className={styles.insideGrid}>
                    <p className={styles.longForm}>
                        Someone shows up having run Linux boxes for ten years and never touched
                        JavaScript. Someone else has written Python scripts for a shop that
                        didn&rsquo;t call it engineering. Both of them can find themselves on this
                        map on day one — not at week one of a course, but at the actual edge of what
                        they already hold.
                    </p>
                    <p className={styles.longForm}>
                        Then they walk the whole thing. Every veteran in a cohort covers all{" "}
                        {COUNTS.topics} ideas in 17 weeks, because the graph tells us exactly how
                        much has to sit under each one, and nothing gets taught before its
                        foundation exists.
                    </p>
                </div>
            </div>
        </section>

        <section className={styles.manifestSection}>
            <div className="tw-container">
                <span className={styles.eyebrowLight}>
                    <span className={styles.eyebrowBar} />
                    {`Manifest \u00a0·\u00a0 ${MANIFEST.name} ${MANIFEST.version}`}
                </span>
                <p className={styles.manifestLede}>Here&rsquo;s the map by the numbers.</p>
                <div className={styles.manifestGrid}>
                    {MANIFEST_CELLS.map((cell) => (
                        <div key={cell.label} className={styles.manifestCell}>
                            <p
                                className={`${styles.manifestValue} ${
                                    cell.value === "0" ? styles.manifestValueAccent : ""
                                }`}
                            >
                                {cell.value}
                            </p>
                            <p className={styles.manifestLabel}>{cell.label}</p>
                            <p className={styles.manifestGloss}>{cell.gloss}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className={styles.layersSection}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    subtitle="Method"
                    title="Four decisions, in order"
                    description="Most curricula only ever answer the last one. Here's all four, and who makes each call."
                />
                <div className={styles.layerGrid}>
                    {LAYERS.map((layer) => (
                        <div key={layer.index} className={styles.layerCard}>
                            <div className={styles.layerHead}>
                                <span className={styles.layerIndex}>{layer.index}</span>
                                <span className={styles.monoMeta}>{layer.question}</span>
                            </div>
                            <h3 className={styles.cardHeading}>{layer.title}</h3>
                            <p className={styles.cardBody}>{layer.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className={`dark-section ${styles.edgeSection}`}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    color="C"
                    subtitle="Edge anatomy"
                    title="Two kinds of link, and both say why"
                    description="A line on this map isn't decoration. It's a claim about what holds what up, and every one of them carries the sentence explaining it."
                />
                <div className={styles.edgeGrid}>
                    <div className={styles.edgeCard}>
                        <p className={styles.edgeCardHead}>
                            <svg width="30" height="8" aria-hidden="true">
                                <title>Solid arrowed line</title>
                                <line
                                    x1="0"
                                    y1="4"
                                    x2="22"
                                    y2="4"
                                    stroke="#ffffff"
                                    strokeWidth="1.5"
                                />
                                <polygon points="22,0 30,4 22,8" fill="#ffffff" />
                            </svg>
                            Load-bearing — solid, arrowed
                        </p>
                        <h3 className={styles.edgeCardTitle}>It carries weight</h3>
                        <div className={styles.edgeDiagram}>
                            <span className={styles.edgeNode}>Embed and retrieve</span>
                            <svg width="46" height="10" aria-hidden="true">
                                <title>Required edge</title>
                                <line
                                    x1="0"
                                    y1="5"
                                    x2="36"
                                    y2="5"
                                    stroke="#c5203e"
                                    strokeWidth="2"
                                />
                                <polygon points="36,0 46,5 36,10" fill="#c5203e" />
                            </svg>
                            <span className={styles.edgeNode}>Assemble a RAG pipeline</span>
                        </div>
                        <p className={styles.edgeCardBody}>
                            Retrieval has nothing to search until the vectors exist. Teach it the
                            other way around and the second idea is standing on air.
                        </p>
                    </div>
                    <div className={styles.edgeCard}>
                        <p className={styles.edgeCardHead}>
                            <svg width="30" height="8" aria-hidden="true">
                                <title>Dashed line</title>
                                <line
                                    x1="0"
                                    y1="4"
                                    x2="30"
                                    y2="4"
                                    stroke="#B9D6F2"
                                    strokeWidth="1.5"
                                    strokeDasharray="5 4"
                                />
                            </svg>
                            Supporting — dashed, open
                        </p>
                        <h3 className={styles.edgeCardTitle}>It smooths the way</h3>
                        <div className={styles.edgeDiagram}>
                            <span className={styles.edgeNode}>Build an eval ladder</span>
                            <svg width="46" height="10" aria-hidden="true">
                                <title>Helpful edge</title>
                                <line
                                    x1="0"
                                    y1="5"
                                    x2="46"
                                    y2="5"
                                    stroke="#B9D6F2"
                                    strokeWidth="2"
                                    strokeDasharray="5 4"
                                />
                            </svg>
                            <span className={styles.edgeNode}>Assemble a RAG pipeline</span>
                        </div>
                        <p className={styles.edgeCardBody}>
                            You can build the pipeline without it. You just won&rsquo;t know whether
                            it works.
                        </p>
                    </div>
                </div>
                <p className={styles.pullQuote}>
                    Every one of the {COUNTS.edges} links has a sentence like that behind it. If we
                    couldn&rsquo;t write the reason, the link didn&rsquo;t go in.
                </p>
            </div>
        </section>

        <section className={styles.nodeSection}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    subtitle="Node anatomy"
                    title="What one idea carries"
                    description={`This is the level every one of the ${COUNTS.topics} is specified to — written before the lesson, not after.`}
                />
                <div className={styles.nodeGrid}>
                    <div className={styles.recordCard}>
                        <div className={styles.recordHeader}>
                            <p className={styles.recordKicker}>
                                Node T20 &nbsp;·&nbsp; sample record
                            </p>
                            <p className={styles.recordTitle}>{SAMPLE.label}</p>
                        </div>
                        <dl className={styles.recordTable}>
                            {NODE_RECORD.map(([term, value]) => (
                                <div key={term} className={styles.recordRow}>
                                    <dt className={styles.recordTerm}>{term}</dt>
                                    <dd className={styles.recordValue}>{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div>
                        <p className={styles.longForm}>
                            The line that matters is the evidence criterion. It&rsquo;s the
                            difference between a veteran who watched a lesson on measuring
                            faithfulness and one who built a check that caught a fabricated answer.
                            The first is a completion. The second is something a hiring manager can
                            look at.
                        </p>
                        <p className={styles.longForm}>
                            Type tells an instructor how to teach it. Exit depth tells them how much
                            help to take away. Market anchor is the reason it&rsquo;s on the map at
                            all — the receipt that says an employer is paying for this.
                        </p>
                        <p className={styles.footnote}>
                            Tap any dot above to read the same record.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className={styles.phasesSection}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    subtitle={`${COUNTS.subjects} subjects \u00b7 ${COUNTS.domains} domains`}
                    title="Grouped by subject, sequenced by dependency"
                    description="Subjects say what an idea is about. They don't say when you meet it — the links decide that, and a single subject can run the entire length of the map. Testing shows up early and never stops. So does version control."
                />
                <div className={styles.phaseTable}>
                    {SUBJECTS.map((subject, i) => (
                        <div key={subject.id} className={styles.phaseRow}>
                            <div>
                                <div className={styles.phaseHead}>
                                    <span className={styles.phaseIndex}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className={styles.phaseName}>{subject.title}</h3>
                                </div>
                                <p className={styles.monoMeta}>
                                    {subject.topicCount} topics &nbsp;·&nbsp;{" "}
                                    {subject.domains.length} domains
                                </p>
                            </div>
                            <div className={styles.unitChips}>
                                {subject.domains.map((domain) => (
                                    <span key={domain.id} className={styles.unitChip}>
                                        {domain.id}
                                        <span className={styles.unitChipCount}>
                                            {domain.topicCount}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className={styles.questionsSection}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    subtitle="Why a map"
                    title="Three things a course list can't tell you"
                />
                <div className={styles.questionGrid}>
                    {QUESTIONS.map((q, i) => (
                        <div key={q.title} className={styles.questionCard}>
                            <p className={styles.monoMeta}>{`Question 0${i + 1}`}</p>
                            <h3 className={styles.questionTitle}>{q.title}</h3>
                            <p className={styles.cardBody}>{q.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className={`dark-section ${styles.provenanceSection}`}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    color="C"
                    subtitle="Provenance"
                    title="What we built and what we borrowed"
                />
                <div className={styles.provenanceGrid}>
                    {PROVENANCE.map((cell) => (
                        <div key={cell.kicker} className={styles.provenanceCell}>
                            <p className={styles.provenanceKicker}>{cell.kicker}</p>
                            <h3 className={styles.provenanceTitle}>{cell.title}</h3>
                            <p className={styles.provenanceBody}>{cell.body}</p>
                        </div>
                    ))}
                </div>
                <p className={styles.pullQuote}>
                    None of these four is ours alone. Assembling them, and aiming the result
                    squarely at what employers pay veterans for, is.
                </p>
            </div>
        </section>

        <section className={styles.ctaSection}>
            <div className={`tw-container ${styles.ctaInner}`}>
                <div>
                    <p className={styles.monoMeta}>Retool. Retrain. Relaunch.</p>
                    <p className={styles.ctaTitle}>
                        {COUNTS.topics} ideas. 17 weeks. No tuition, ever.
                    </p>
                    <p className={styles.ctaBody}>
                        Vets Who Code is a veteran-run 501(c)(3). The accelerator is free, remote,
                        and we don&rsquo;t take a share of your first paycheck.
                    </p>
                    <p className={styles.monoMeta}>Free · Remote · 17 weeks · EIN 86-2122804</p>
                </div>
                <div className={styles.ctaActions}>
                    <Button path="/apply" size="md" color="primary" hover="default">
                        Apply now
                    </Button>
                    <Button
                        path="/contact-us"
                        size="md"
                        color="primary"
                        variant="outlined"
                        hover="default"
                    >
                        Talk to us first
                    </Button>
                </div>
            </div>
        </section>

        <div className={styles.provenanceStrip}>
            <span>
                {`${MANIFEST.name} ${MANIFEST.version} · ${COUNTS.topics} nodes · ${COUNTS.edges} edges · ${MANIFEST.acyclic ? 0 : "!"} cycles`}
            </span>
            <span>Graph structure adapted from Marble open taxonomy under ODbL 1.0</span>
        </div>
    </>
);

export default CurriculumGraphContainer;
