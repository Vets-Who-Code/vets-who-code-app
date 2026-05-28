import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";
import Link from "next/link";
import styles from "./about.module.css";

interface Pathway {
    kind: string;
    title: string;
    body: string;
    cta: string;
    href: string;
}

const PATHWAYS: Pathway[] = [
    {
        kind: "For Veterans · Military Spouses",
        title: "Apply to the next cohort",
        body: "If you're a veteran or military spouse staring at the civilian tech world and wondering where you fit — this is it. Cohorts begin three times a year. Selective. Free. Forever.",
        cta: "Start your application",
        href: "/apply",
    },
    {
        kind: "For Senior Engineers",
        title: "Mentor a troop",
        body: "We need senior engineers who've made the leap themselves. Show up on Slack, run a code review, sit on a final project panel. Two hours a month moves someone's career.",
        cta: "Become a mentor",
        href: "/mentor",
    },
    {
        kind: "For Allies · Donors · Companies",
        title: "Fund the mission",
        body: "Every troop graduates free. That's only possible because donors, alumni, and corporate partners fund the seats. Tax-deductible. EIN 86-2122804. Transparency seal current.",
        cta: "Donate or sponsor",
        href: "/donate",
    },
];

const JoinCta = () => {
    return (
        <section
            className="tw-bg-cream tw-pb-[140px] tw-pt-[120px]"
            aria-labelledby="about-join-headline"
        >
            <div className="tw-mx-auto tw-max-w-[1320px] tw-px-6 md:tw-px-12">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-mb-14 tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[1fr_1.4fr] lg:tw-items-end lg:tw-gap-20"
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
                            Join the Mission · Three Pathways
                        </span>
                        <h2
                            id="about-join-headline"
                            className="tw-m-0 tw-mt-6 tw-font-heading tw-uppercase tw-text-navy"
                            style={{
                                fontWeight: 900,
                                fontSize: "clamp(40px, 5vw, 64px)",
                                letterSpacing: "-0.025em",
                                lineHeight: 1.02,
                            }}
                        >
                            Write the next <span className="tw-text-red">chapter</span>
                            <br />
                            of your mission.
                        </h2>
                    </div>
                    <p
                        className="tw-m-0 tw-font-body tw-text-[#495057]"
                        style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}
                    >
                        We can only place 97% of troops because of the people who show up around
                        them. Pick your pathway — apply, mentor, or fund a seat. Every role moves a
                        veteran forward.
                    </p>
                </motion.div>

                <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-3">
                    {PATHWAYS.map((p, i) => (
                        <Link key={p.title} href={p.href} className={styles.pathwayCard}>
                            <span
                                className={styles.pathwayKind}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 11,
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                }}
                            >
                                {String(i + 1).padStart(2, "0")} · {p.kind}
                            </span>
                            <h3
                                className={`${styles.pathwayTitle} tw-m-0 tw-font-heading tw-uppercase`}
                                style={{
                                    fontWeight: 800,
                                    fontSize: 32,
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.05,
                                }}
                            >
                                {p.title}
                            </h3>
                            <p
                                className={`${styles.pathwayBody} tw-m-0 tw-font-body`}
                                style={{
                                    fontSize: 15.5,
                                    lineHeight: 1.7,
                                    flex: 1,
                                }}
                            >
                                {p.body}
                            </p>
                            <span
                                className={`${styles.pathwayCta} tw-flex tw-items-center tw-gap-2.5 tw-pt-5`}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 11,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                }}
                            >
                                {p.cta}
                                <span aria-hidden="true" className={styles.pathwayArrow}>
                                    →
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JoinCta;
