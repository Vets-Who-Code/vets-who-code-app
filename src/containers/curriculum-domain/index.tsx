import SectionTitle from "@components/section-title";
import { SectionEyebrow } from "@components/ui/design-system";
import { DOMAIN_TITLES } from "@data/curriculum-domains";
import type { DomainEdgeGroup, DomainPage, TopicRef } from "@lib/curriculum-domain";
import type { EdgeStrength } from "@lib/curriculum-graph";
import Button from "@ui/button";
import Link from "next/link";
import styles from "./curriculum-domain.module.css";

// Takes the shaped page only. Importing the graph here would ship the whole dataset to the
// client on every one of these pages; getStaticProps has already done the work.
type Props = { page: DomainPage };

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const KindChip = ({ strength }: { strength: EdgeStrength }) => (
    <span
        className={`${styles.kindChip} ${
            strength === "hard" ? styles.kindRequired : styles.kindHelpful
        }`}
    >
        {strength === "hard" ? "load-bearing" : "supporting"}
    </span>
);

/** Same-page anchor for a topic in this domain; a deep link into its page otherwise. */
const TopicLink = ({
    topic,
    here,
    withDomain,
}: {
    topic: TopicRef;
    here: string;
    withDomain?: boolean;
}) => {
    if (topic.domain === here) {
        return (
            <a href={`#${topic.id}`} className={styles.topicLink}>
                {topic.label}
            </a>
        );
    }
    return (
        <>
            <Link href={`/curriculum/${topic.domain}#${topic.id}`} className={styles.topicLink}>
                {topic.label}
            </Link>
            {withDomain ? (
                <span className={styles.recordAside}> · {DOMAIN_TITLES[topic.domain]}</span>
            ) : null}
        </>
    );
};

const EdgeGroups = ({ groups, here }: { groups: DomainEdgeGroup[]; here: string }) => (
    <div className={styles.groupGrid}>
        {groups.map((group) => (
            <div key={group.domain.id} className={styles.group}>
                <h3 className={styles.groupTitle}>
                    <Link href={`/curriculum/${group.domain.id}`}>{group.domain.title}</Link>
                </h3>
                <p className={styles.monoMeta}>{plural(group.edges.length, "link")}</p>
                <div className={styles.prereqList}>
                    {group.edges.map((edge) => (
                        <div key={`${edge.from.id}-${edge.to.id}`} className={styles.prereqRow}>
                            <KindChip strength={edge.strength} />
                            <div>
                                <p className={styles.prereqName}>
                                    <TopicLink topic={edge.to} here={here} /> rests on{" "}
                                    <TopicLink topic={edge.from} here={here} />
                                </p>
                                <p className={styles.prereqReason}>{edge.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const CurriculumDomainContainer = ({ page }: Props) => {
    const [minDepth, maxDepth] = page.depthRange;
    const rests =
        page.prerequisites.length === 0
            ? "Nothing outside this domain sits under it — you can start here."
            : `Before you start, it rests on ${plural(page.prerequisites.length, "other domain")}.`;
    const holds =
        page.unlocks.length === 0
            ? "Nothing in the map rests on it yet — it is a leaf."
            : `Downstream, it holds up ${plural(page.unlocks.length, "domain")}.`;

    return (
        <>
            <section className={`dark-section ${styles.hero}`} aria-labelledby="domain-title">
                <div className="tw-container">
                    <Link href="/curriculum" className={styles.backLink}>
                        ← Back to the skill map
                    </Link>
                    <SectionEyebrow tone="dark" label={page.subject.title} subLabel={page.band} />
                    <h1 id="domain-title" className={styles.heroTitle}>
                        {page.title}
                    </h1>
                    <p className={styles.heroLede}>
                        {plural(page.topics.length, "micro-topic")} in {page.subject.title}, each
                        with the evidence that proves you have it and the written reason behind
                        every link. {rests} {holds}
                    </p>
                    <p className={styles.heroMeta}>
                        {plural(page.topics.length, "topic")} &nbsp;·&nbsp; depth {minDepth}–
                        {maxDepth} of {page.graph.maxDepth} &nbsp;·&nbsp;{" "}
                        {plural(page.counts.intraEdges, "internal link")} &nbsp;·&nbsp;{" "}
                        {page.counts.crossIn} in &nbsp;·&nbsp; {page.counts.crossOut} out
                    </p>
                </div>
            </section>

            <section className={styles.sectionWhite}>
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        subtitle={`Prerequisites · ${page.counts.crossIn} links in`}
                        title="Before you start"
                        description="Load-bearing links first. Each one says what in this domain rests on what outside it, and why."
                    />
                    {page.prerequisites.length === 0 ? (
                        <p className={styles.note}>
                            Nothing outside this domain sits under it. It is an entry point — you
                            can start here.
                        </p>
                    ) : (
                        <EdgeGroups groups={page.prerequisites} here={page.id} />
                    )}
                </div>
            </section>

            <section className={styles.sectionCream}>
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        subtitle={`${plural(page.topics.length, "topic")} · depth ${minDepth}–${maxDepth}`}
                        title="What you will be able to do"
                        description="In prerequisite order. Each idea names the artifact that closes it, the market demand that put it on the map, and what it stands on."
                    />
                    <div className={styles.topicList}>
                        {page.topics.map((topic) => (
                            <article key={topic.id} id={topic.id} className={styles.topic}>
                                <div className={styles.topicHead}>
                                    <p className={styles.monoMeta}>
                                        Depth {topic.depth} &nbsp;·&nbsp; {topic.type} &nbsp;·&nbsp;{" "}
                                        {topic.exitDepth} &nbsp;·&nbsp; {topic.source}
                                    </p>
                                    <h3 className={styles.topicTitle}>{topic.label}</h3>
                                    <p className={styles.topicBody}>{topic.description}</p>
                                </div>
                                <dl className={styles.recordTable}>
                                    <div className={styles.recordRow}>
                                        <dt className={styles.recordTerm}>Evidence</dt>
                                        <dd className={styles.recordValue}>{topic.evidence}</dd>
                                    </div>
                                    <div className={styles.recordRow}>
                                        <dt className={styles.recordTerm}>Market anchor</dt>
                                        <dd className={styles.recordValue}>
                                            {topic.marketAnchor.join(" · ")}
                                        </dd>
                                    </div>
                                    <div className={styles.recordRow}>
                                        <dt className={styles.recordTerm}>Rests on</dt>
                                        <dd className={styles.recordValue}>
                                            {topic.restsOn.length === 0 ? (
                                                "Nothing sits under this one — it is an entry point."
                                            ) : (
                                                <div className={styles.prereqList}>
                                                    {topic.restsOn.map((edge) => (
                                                        <div
                                                            key={edge.from.id}
                                                            className={styles.prereqRow}
                                                        >
                                                            <KindChip strength={edge.strength} />
                                                            <div>
                                                                <p className={styles.prereqName}>
                                                                    <TopicLink
                                                                        topic={edge.from}
                                                                        here={page.id}
                                                                        withDomain={true}
                                                                    />
                                                                </p>
                                                                <p className={styles.prereqReason}>
                                                                    {edge.reason}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </dd>
                                    </div>
                                </dl>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.sectionWhite}>
                <div className="tw-container">
                    <SectionTitle
                        align="left"
                        subtitle={`Unlocks · ${page.counts.crossOut} links out`}
                        title="What rests on this domain"
                        description="Everything downstream that names an idea here as a prerequisite, grouped by where it lives."
                    />
                    {page.unlocks.length === 0 ? (
                        <p className={styles.note}>
                            Nothing in the map rests on this domain yet — it is a leaf.
                        </p>
                    ) : (
                        <EdgeGroups groups={page.unlocks} here={page.id} />
                    )}
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={`tw-container ${styles.ctaInner}`}>
                    <div>
                        <p className={styles.monoMeta}>Retool. Retrain. Relaunch.</p>
                        <p className={styles.ctaTitle}>
                            {page.graph.topics} ideas. 17 weeks. No tuition, ever.
                        </p>
                        <p className={styles.ctaBody}>
                            Vets Who Code is a veteran-run 501(c)(3). The accelerator is free,
                            remote, and we don&rsquo;t take a share of your first paycheck.
                        </p>
                        <p className={styles.monoMeta}>Free · Remote · 17 weeks · EIN 86-2122804</p>
                    </div>
                    <div className={styles.ctaActions}>
                        <Button path="/apply" size="md" color="primary" hover="default">
                            Apply now
                        </Button>
                        <Button
                            path="/curriculum"
                            size="md"
                            color="primary"
                            variant="outlined"
                            hover="default"
                        >
                            See the whole map
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CurriculumDomainContainer;
