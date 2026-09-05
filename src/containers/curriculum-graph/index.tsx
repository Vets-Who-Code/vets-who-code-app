import SectionTitle from "@components/section-title";
import { MANIFEST, SUBJECTS, TOPICS } from "@lib/curriculum-graph";
import Button from "@ui/button";
import styles from "./curriculum-graph.module.css";
import GraphPanel from "./graph-panel";

// Counts come from the dataset manifest, not from copy — the page's claim is that the
// data is the argument, so nothing here is allowed to drift from the data.
const COUNTS = MANIFEST.counts;
const MANIFEST_CELLS = [
    { value: String(COUNTS.topics), label: "Micro-topics", gloss: "One teachable idea each." },
    {
        value: String(COUNTS.edges),
        label: "Prerequisite edges",
        gloss: `${COUNTS.hardEdges} required, ${COUNTS.softEdges} helpful. Every one carries a written reason.`,
    },
    {
        value: String(COUNTS.domains),
        label: "Domains",
        gloss: `Grouped into ${COUNTS.subjects} subjects.`,
    },
    {
        value: String(COUNTS.maxDepth),
        label: "Deepest path",
        gloss: `${COUNTS.roots} entry points, ${COUNTS.terminals} terminal concepts.`,
    },
    {
        value: MANIFEST.acyclic ? "0" : "!",
        label: "Cycles",
        gloss: "Validated DAG. Nothing is its own prerequisite.",
    },
];

const LAYERS = [
    {
        index: "01",
        question: "Where are we going?",
        title: "The labor market picks the destination",
        body: "Lightcast skill demand plus O*NET and BLS data set the target concept set. Market moves, graph gets rebuilt behind it.",
    },
    {
        index: "02",
        question: "In what order?",
        title: "The dependency graph picks the route",
        body: "Every concept decomposed to one teachable idea, wired to what it rests on. Sequence falls out of the graph; nobody hand-orders a table of contents.",
    },
    {
        index: "03",
        question: "To what depth?",
        title: "Gradual Release of Responsibility picks the depth",
        body: "Each concept encountered three times at decreasing support — demonstrated, practiced with a spotter, performed alone. Veterans know this as crawl, walk, run.",
    },
    {
        index: "04",
        question: "How do we know?",
        title: "An artifact closes the node",
        body: "Nothing completes because a video ended. Each node names the thing produced and the criterion it's judged against. Trained to standard, or not trained.",
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
    ["Source", SAMPLE.source],
    ["Prerequisite depth", `${SAMPLE.depth} — longest blocking path to an entry point`],
];

const QUESTIONS = [
    {
        title: "Where does this person actually start?",
        body: "The frontier of unlocked concepts, given what they already hold. A veteran who has run Linux for a decade skips to the two ideas they're missing.",
    },
    {
        title: "What's the shortest path to this specific job?",
        body: "Name the target concept set from a real posting and the graph returns the minimum set of nodes that reaches it, in order.",
    },
    {
        title: "Why is this locked?",
        body: "Answered by the written reason on the blocking edge. Nobody is told no without being told what to do about it.",
    },
];

const PROVENANCE = [
    {
        kicker: "Graph structure",
        title: "Marble open taxonomy",
        body: "1,590 topics, 3,221 edges, ODbL 1.0. Different subject, same architecture.",
    },
    {
        kicker: "Market layer",
        title: "Lightcast · O*NET · BLS",
        body: "Skill demand, occupational profiles and wage data set the target concept set.",
    },
    {
        kicker: "Depth model",
        title: "Gradual Release of Responsibility",
        body: "Demonstrated, then practiced with support, then performed alone.",
    },
];

const CurriculumGraphContainer = () => (
    <>
        <div className={styles.metaStrip}>
            Curriculum &nbsp;·&nbsp; Hashflag Graph v2.3 &nbsp;·&nbsp; Validated DAG
        </div>

        {/* Hero — the graph panel pulls up into its oversized bottom padding. */}
        <section className={`dark-section ${styles.hero}`} aria-labelledby="curriculum-graph-title">
            <div className="tw-container">
                <span className={styles.eyebrowDark}>
                    <span className={styles.eyebrowBar} />
                    The Hashflag Method
                </span>
                <h1 id="curriculum-graph-title" className={styles.heroTitle}>
                    We don&rsquo;t write a syllabus. We compute a path.
                </h1>
                <p className={styles.heroLede}>
                    Most curricula are ordered by subject — chapter three follows chapter two
                    because someone put it there. Ours is ordered by dependency.
                </p>
            </div>
        </section>

        <section className={styles.panelSection}>
            <div className="tw-container">
                <GraphPanel />
            </div>
        </section>

        <section className={styles.manifestSection}>
            <div className="tw-container">
                <span className={styles.eyebrowLight}>
                    <span className={styles.eyebrowBar} />
                    {`Manifest \u00a0·\u00a0 ${MANIFEST.name} ${MANIFEST.version}`}
                </span>
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
                    title="Four layers, in order"
                    description="Each layer answers a different question, and most curricula only answer the last one."
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
                    title="Two edge types"
                    description="This is the reason adults move fast: an edge either blocks you or it doesn't, and the graph says which."
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
                            Required — solid, arrowed
                        </p>
                        <h3 className={styles.edgeCardTitle}>It blocks</h3>
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
                            Retrieval has nothing to search without stored vectors.
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
                            Helpful — dashed, open
                        </p>
                        <h3 className={styles.edgeCardTitle}>It only smooths</h3>
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
                            You can build it unmeasured, you just won&rsquo;t know if it works.
                        </p>
                    </div>
                </div>
                <p className={styles.pullQuote}>
                    All {COUNTS.edges} edges carry a written sentence like that. If we can&rsquo;t
                    write the reason, the edge doesn&rsquo;t go in.
                </p>
            </div>
        </section>

        <section className={styles.nodeSection}>
            <div className="tw-container">
                <SectionTitle
                    align="left"
                    subtitle="Node anatomy"
                    title="What one micro-topic carries"
                    description="Every node in the graph is specified to this level. These fields are what the graph is built from, not prose written after the fact."
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
                            The evidence criterion is the whole point of the record. A node does not
                            close when a lesson is watched or a box is checked; it closes when the
                            named artifact exists and meets the criterion. That is what an employer
                            is buying, and it is what a funder can audit.
                        </p>
                        <p className={styles.longForm}>
                            Type tells an instructor how to teach it. Exit depth tells them how much
                            support to remove. Role band tells a learner what the idea is worth in a
                            job description. Market anchor is the receipt for why it is in the graph
                            at all.
                        </p>
                        <p className={styles.footnote}>
                            Tap any dot in the map above to read the same record for it.
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
                    title="The graph is grouped, not sequenced"
                    description="Subjects say what a concept is about. They do not say when you meet it — the prerequisite edges decide that, and a single subject can run the whole length of the graph."
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
                    subtitle="Why a graph"
                    title="Three questions a syllabus can't answer"
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
                    title="Where the four layers come from"
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
                    None of the four layers is ours alone. Assembling them and aiming the result at
                    what employers pay veterans for is.
                </p>
            </div>
        </section>

        <section className={styles.ctaSection}>
            <div className={`tw-container ${styles.ctaInner}`}>
                <div>
                    <p className={styles.ctaTitle}>Retool. Retrain. Relaunch.</p>
                    <p className={styles.monoMeta}>Free · Remote · 17 weeks · EIN 86-2122804</p>
                </div>
                <Button path="/apply" size="lg" color="primary" hover="default">
                    Apply now
                </Button>
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
