import SectionTitle from "@components/section-title";
import { BODY_OF_WORK, PROGRAM_FACTS, PROOF } from "@data/accelerator";
import { EVIDENCE_NOT_ATTENDANCE, EXIT_DEPTHS, HERO, OPEN_DOOR } from "@data/the-standard";
import type { StandardPage } from "@lib/the-standard";
import Button from "@ui/button";
import Link from "next/link";
import styles from "./the-standard.module.css";

// Takes the shaped page only. Importing the graph here would ship the whole dataset to the
// client; getStaticProps has already done the work.
type Props = { page: StandardPage };

const EXIT_LABEL: Record<string, string> = Object.fromEntries(
    EXIT_DEPTHS.map((d) => [d.id, d.label])
);

const PR_RECORD = BODY_OF_WORK.find((w) => w.kind === "Pull requests");
const NONPROFIT = PROOF.find((p) => p.label === "Nonprofit");

const TheStandardContainer = ({ page }: Props) => {
    const { counts } = page;
    const source = page.structureAdaptedFrom;

    return (
        <>
            <section className={`dark-section ${styles.hero}`} aria-labelledby="standard-title">
                <div className="tw-container">
                    <span className={styles.eyebrowDark}>
                        <span className={styles.eyebrowBar} />
                        Hashflag Graph · {counts.topics} evidence criteria
                    </span>
                    <h1 id="standard-title" className={styles.heroTitle}>
                        {HERO.title}
                    </h1>
                    <p className={styles.heroLede}>{HERO.lede}</p>
                    {HERO.body.map((p) => (
                        <p key={p} className={styles.heroBody}>
                            {p}
                        </p>
                    ))}
                    <div className={styles.heroActions}>
                        <Button path="/apply" size="md" color="primary" hover="default">
                            Apply
                        </Button>
                        <Link href="/curriculum" className={styles.heroSecondary}>
                            Read the curriculum →
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.sectionWhite}>
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        subtitle="The bar"
                        title="The bar is written down"
                        description={`The Hashflag curriculum is a map of ${counts.topics} topics across ${counts.domains} domains and ${counts.subjects} subjects, joined by ${counts.edges} prerequisite links. Every topic names the evidence that proves you have it, and sets an exit depth: how much help is still there when the topic is signed off.`}
                    />
                    <dl className={styles.depthGrid}>
                        {EXIT_DEPTHS.map((d) => (
                            <div key={d.id} className={styles.depthCell} data-testid={d.id}>
                                <dt className={styles.depthLabel}>{d.label}</dt>
                                <dd className={styles.depthGloss}>{d.gloss}</dd>
                                <dd className={styles.depthCount}>
                                    {page.exitSplit[d.id]} of {counts.topics} topics
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <p className={styles.note}>
                        Every domain has its own public page at /curriculum/&lt;domain&gt;, with
                        each topic&rsquo;s evidence printed next to it. Troops, mentors and hiring
                        managers can all read the same bar. The graph&rsquo;s structure is adapted
                        from the{" "}
                        <a
                            href={source.url}
                            className={styles.inlineLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {source.name}
                        </a>{" "}
                        ({source.license}).
                    </p>
                </div>
            </section>

            <section className={styles.sectionCream}>
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        subtitle="Selected criteria"
                        title="What the bar looks like"
                        description="Eight criteria, quoted word for word from the curriculum, in prerequisite order. A topic's depth is the longest chain of load-bearing prerequisites beneath it. Code review is not a footnote: it is its own domain."
                    />
                    {page.featured.map((band) => (
                        <div key={band.title} className={styles.band}>
                            <h3 className={styles.bandTitle}>
                                <span className={styles.bandDepth}>
                                    Depth {band.depthRange[0]}–{band.depthRange[1]}
                                </span>
                                {band.title}
                            </h3>
                            <div className={styles.criteriaGrid}>
                                {band.criteria.map((c) => (
                                    <article key={c.id} className={styles.criterion}>
                                        <h4 className={styles.criterionTitle}>{c.label}</h4>
                                        <p className={styles.criterionEvidence}>
                                            &ldquo;{c.evidence}&rdquo;
                                        </p>
                                        <p className={styles.monoMeta}>
                                            Depth {c.depth} · {EXIT_LABEL[c.exitDepth]} ·{" "}
                                            <Link
                                                href={`/curriculum/${c.domain.id}`}
                                                className={styles.inlineLink}
                                            >
                                                {c.domain.title}
                                            </Link>
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.sectionWhite} aria-labelledby="full-bar">
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        subtitle={`${counts.subjects} subjects · ${counts.domains} domains`}
                        title="The full bar, subject by subject"
                        description="Every topic, with the evidence that proves it and how much help is left when it is signed off. Every domain page lists the same topics with what they rest on."
                    />
                    {page.subjects.map((subject) => (
                        <div key={subject.id} className={styles.subject}>
                            <h3 className={styles.subjectTitle}>
                                {subject.title}
                                <span className={styles.subjectCount}>
                                    {subject.topicCount} topics
                                </span>
                            </h3>
                            <div className={styles.domainGrid}>
                                {subject.domains.map((domain) => (
                                    <div key={domain.id} className={styles.domain}>
                                        <h4 className={styles.domainTitle}>
                                            <Link href={`/curriculum/${domain.id}`}>
                                                {domain.title}
                                            </Link>
                                        </h4>
                                        <details className={styles.domainDetails}>
                                            <summary className={styles.domainSummary}>
                                                {domain.topics.length} evidence criteria
                                            </summary>
                                            <ul className={styles.topicList}>
                                                {domain.topics.map((t) => (
                                                    <li key={t.id} className={styles.topic}>
                                                        <span className={styles.topicLabel}>
                                                            {t.label}
                                                        </span>
                                                        <span className={styles.topicEvidence}>
                                                            {t.evidence}
                                                        </span>
                                                        <span className={styles.monoMeta}>
                                                            {EXIT_LABEL[t.exitDepth]}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`dark-section ${styles.evidenceSection}`}>
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        color="C"
                        subtitle="How it is checked"
                        title="Evidence, not attendance"
                    />
                    <div className={styles.evidenceGrid}>
                        {EVIDENCE_NOT_ATTENDANCE.map((item) => (
                            <div key={item.title} className={styles.evidenceCard}>
                                <h3 className={styles.evidenceTitle}>{item.title}</h3>
                                <p className={styles.evidenceBody}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.sectionWhite}>
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        subtitle="Proof of work"
                        title="Build a record"
                        description="There is no capstone. You build a record instead: blogs, shipped features and pull requests."
                    />
                    {PR_RECORD ? (
                        <blockquote className={styles.recordQuote}>{PR_RECORD.body}</blockquote>
                    ) : null}
                    <p className={styles.recordBody}>
                        The{" "}
                        <Link href="/portfolio-checklist" className={styles.inlineLink}>
                            portfolio checklist
                        </Link>{" "}
                        asks for the same thing from the other side: code reviews you gave on merged
                        PRs. See the work in{" "}
                        <Link href="/projects" className={styles.inlineLink}>
                            the projects catalog
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <section className={styles.sectionCream}>
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        subtitle="Mentorship"
                        title={OPEN_DOOR.title}
                        description={OPEN_DOOR.body}
                    />
                    <figure className={styles.doorFigure}>
                        <blockquote className={styles.doorQuote}>
                            &ldquo;{OPEN_DOOR.quote}&rdquo;
                        </blockquote>
                        <figcaption className={styles.monoMeta}>{OPEN_DOOR.attribution}</figcaption>
                    </figure>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className="tw-container">
                    <p className={styles.ctaTitle}>Earn the title</p>
                    <p className={styles.ctaBody}>
                        The Software Engineering Accelerator.{" "}
                        {NONPROFIT
                            ? `Vets Who Code is a ${NONPROFIT.stat} ${NONPROFIT.label.toLowerCase()}. ${NONPROFIT.gloss}`
                            : null}
                    </p>
                    <dl className={styles.factRow}>
                        {PROGRAM_FACTS.map(([term, value]) => (
                            <div key={term} className={styles.fact}>
                                <dt className={styles.monoMeta}>{term}</dt>
                                <dd className={styles.factValue}>{value}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className={styles.ctaActions}>
                        <Button path="/apply" size="md" color="primary" hover="default">
                            Apply
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TheStandardContainer;
