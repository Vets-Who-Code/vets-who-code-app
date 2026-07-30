import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./about.module.css";

interface Chapter {
    n: string;
    arc: string;
    title: string;
    img: string;
    body: string[];
    callout: { value: string; label: string };
}

const CHAPTERS: Chapter[] = [
    {
        n: "01",
        arc: "The Ordinary World",
        title: "Where We Started",
        img: "https://res.cloudinary.com/vetswhocode/image/upload/v1746583122/8_azjgpx.png",
        body: [
            "For years, veterans like us stepped out of uniform and into a civilian job market that spoke a language we didn't yet understand. Recruiters skimmed past our leadership stories. Résumés disappeared into applicant-tracking systems. The gap between our disciplined experience and the tech roles we wanted felt wider than the ocean we once crossed.",
            "Nobody was solving it — not the transition programs, not the nonprofits collecting thank-you-for-your-service donations, not the bootcamps charging $20K for a certificate. So in 2014, we decided to build the solution ourselves.",
        ],
        callout: {
            value: "$20K",
            label: "What a typical bootcamp charged. We do it free.",
        },
    },
    {
        n: "02",
        arc: "The Call to Adventure",
        title: "Building Our Bridge",
        img: "https://res.cloudinary.com/vetswhocode/image/upload/v1746583127/10_khmgby.png",
        body: [
            "Instead of settling for 'thanks for your service,' a handful of us gathered on late-night video calls and asked: what if we built our own bridge? That question became Vets Who Code — a mission to transform military grit into world-class software engineering skill.",
            "Could a free, fully remote program really move veterans into top tech jobs? We were told it was impossible without massive tuition or fancy campuses. We pushed forward anyway. Missions rarely start with perfect resources.",
        ],
        callout: {
            value: "2014",
            label: "Year zero. A handful of vets. A laptop each. A Slack channel.",
        },
    },
    {
        n: "03",
        arc: "Tests and Allies",
        title: "The Journey",
        img: "https://res.cloudinary.com/vetswhocode/image/upload/v1746583121/6_qi229q.png",
        body: [
            "Our mentors emerged from the veteran community itself: senior engineers, tech leads, and hiring managers who had already made the leap. They guided us in translating NATO phonetics into JavaScript functions, after-action reviews into code reviews, and squad tactics into agile collaboration.",
            "Daily pair-programming sessions, weekend hack-a-thons, live code audits. Time-zone differences, career doubts, and imposter syndrome tried to slow us down — but the ally network grew, and mentors showed up on Slack at zero-dark-thirty to keep us moving.",
        ],
        callout: {
            value: "0-DARK-30",
            label: "When our mentors show up. The Slack never sleeps.",
        },
    },
    {
        n: "04",
        arc: "The Reward and Return",
        title: "Full Circle Impact",
        img: "https://res.cloudinary.com/vetswhocode/image/upload/v1746590042/4_a79tb5.png",
        body: [
            "Every veteran faces a crucible project — a full-stack application built under real-world constraints. Graduates emerge with production portfolios, lifelong allies, and offer letters that turn service stripes into six-figure salaries.",
            "Collectively, alumni have earned $20M+ and now ship code at Microsoft, GitHub, Salesforce, JP Morgan Chase, Chewy, Apple, Google, and CBS Interactive. But the journey doesn't end at first employment. Alumni return as mentors and donors, passing on their knowledge and funding the next cohort. The pipeline feeds itself. That's by design.",
        ],
        callout: {
            value: "$20M+",
            label: "Collective alumni earnings. Mentors. Donors. Next cohort fuel.",
        },
    },
    {
        n: "05",
        arc: "Return with the Elixir",
        title: "Our Vision Forward",
        img: "https://res.cloudinary.com/vetswhocode/image/upload/v1746590043/9_ahefah.png",
        body: [
            "Veterans are stakeholders, not charity cases. That principle drives everything we build.",
            "A decade in, Vets Who Code has evolved into a remote-first, AI-enabled nonprofit that blends human mentorship with machine intelligence to personalize learning and keep our curriculum evergreen. By 2030 we will have trained 500+ veterans as software engineers, generated $50M+ in collective alumni earnings, and maintained a 97% placement rate — built on small cohorts, not mass enrollment. We scale depth, not volume.",
            "If you're a veteran staring at the civilian tech world and wondering where you fit — this is it. Apply. Show up. Write the next chapter of your mission in code.",
        ],
        callout: {
            value: "500+",
            label: "Veterans engineered by 2030. Scale by depth, not volume.",
        },
    },
];

const Story = () => {
    const [active, setActive] = useState(0);
    const refs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const idx = Number(
                            (e.target as HTMLElement).getAttribute("data-chapter-idx")
                        );
                        setActive(idx);
                    }
                });
            },
            { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
        );
        for (const el of refs.current) {
            if (el) observer.observe(el);
        }
        return () => observer.disconnect();
    }, []);

    const goTo = useCallback((i: number) => {
        const el = refs.current[i];
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
    }, []);

    return (
        <section className="tw-bg-cream tw-py-[120px]" aria-labelledby="about-story-headline">
            <div className="tw-mx-auto tw-max-w-[1320px] tw-px-6 md:tw-px-12">
                <div className="tw-mb-24 tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-[1fr_1.4fr] lg:tw-items-end lg:tw-gap-20">
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
                            Doc 02 · Our Story
                        </span>
                        <h2
                            id="about-story-headline"
                            className="tw-m-0 tw-mt-6 tw-font-heading tw-uppercase tw-text-navy"
                            style={{
                                fontWeight: 900,
                                fontSize: "clamp(44px, 5.2vw, 72px)",
                                letterSpacing: "-0.025em",
                                lineHeight: 1.02,
                            }}
                        >
                            A decade of <span className="tw-text-red">mission</span>,
                            <br />
                            told in five chapters.
                        </h2>
                    </div>
                    <p
                        className="tw-m-0 tw-font-body tw-text-[#495057]"
                        style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 560 }}
                    >
                        We built Vets Who Code because nobody else was going to. What follows is the
                        unedited version of how a Slack channel turned into a software engineering
                        accelerator that placed nearly every troop who finished it.
                    </p>
                </div>

                <div className="tw-grid tw-grid-cols-1 tw-items-start tw-gap-12 lg:tw-grid-cols-[260px_1fr] lg:tw-gap-24">
                    <aside
                        aria-label="Chapter navigation"
                        className="lg:tw-sticky"
                        style={{ top: 120, alignSelf: "start" }}
                    >
                        <div
                            className="tw-mb-6 tw-flex tw-items-center tw-gap-2.5 tw-text-[#6C757D]"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 10,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{ width: 14, height: 1, background: "var(--red)" }}
                            />
                            Chapters
                        </div>
                        <ol
                            className="tw-m-0 tw-list-none tw-p-0"
                            style={{ borderLeft: "1px solid rgba(9,31,64,0.12)" }}
                        >
                            {CHAPTERS.map((c, i) => (
                                <li key={c.n}>
                                    <button
                                        type="button"
                                        onClick={() => goTo(i)}
                                        className={clsx(
                                            styles.spineItem,
                                            active === i && styles.spineItemActive
                                        )}
                                        aria-current={active === i ? "true" : undefined}
                                    >
                                        <span
                                            className="tw-mb-1 tw-block"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: 10,
                                                letterSpacing: "0.16em",
                                                textTransform: "uppercase",
                                                color: active === i ? "var(--red)" : "var(--slate)",
                                                fontWeight: 500,
                                                transition: "color 220ms",
                                            }}
                                        >
                                            Ch. {c.n} · {c.arc}
                                        </span>
                                        <span
                                            className="tw-block tw-font-heading"
                                            style={{
                                                fontWeight: active === i ? 700 : 500,
                                                fontSize: 14,
                                                letterSpacing: "-0.005em",
                                                color:
                                                    active === i
                                                        ? "var(--navy)"
                                                        : "var(--charcoal)",
                                                lineHeight: 1.3,
                                                transition: "all 220ms",
                                            }}
                                        >
                                            {c.title}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </aside>

                    <div className="tw-flex tw-flex-col" style={{ gap: 96 }}>
                        {CHAPTERS.map((c, i) => (
                            <article
                                key={c.n}
                                ref={(el) => {
                                    refs.current[i] = el;
                                }}
                                data-chapter-idx={i}
                                style={{ scrollMarginTop: 100 }}
                            >
                                <div
                                    className="tw-mb-8 tw-flex tw-flex-wrap tw-items-baseline tw-gap-6 tw-pb-6"
                                    style={{
                                        borderBottom: "1px solid rgba(9,31,64,0.12)",
                                    }}
                                >
                                    <span
                                        className="tw-font-heading tw-text-red"
                                        style={{
                                            fontWeight: 900,
                                            fontSize: 56,
                                            letterSpacing: "-0.04em",
                                            lineHeight: 1,
                                        }}
                                    >
                                        {c.n}
                                    </span>
                                    <span
                                        className="tw-text-[#6C757D]"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 11,
                                            letterSpacing: "0.18em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="tw-mr-3 tw-inline-block tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-gold tw-align-middle"
                                        />
                                        {c.arc}
                                    </span>
                                </div>
                                <h3
                                    className="tw-mb-9 tw-mt-0 tw-font-heading tw-uppercase tw-text-navy"
                                    style={{
                                        fontWeight: 800,
                                        fontSize: "clamp(32px, 3.6vw, 48px)",
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.05,
                                    }}
                                >
                                    {c.title}
                                </h3>

                                <div className="tw-grid tw-grid-cols-1 tw-items-start tw-gap-10 lg:tw-grid-cols-2 lg:tw-gap-14">
                                    <div className="lg:tw-sticky" style={{ top: 140 }}>
                                        <div
                                            className="tw-relative tw-overflow-hidden tw-bg-navy"
                                            style={{ aspectRatio: "4 / 5" }}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="tw-absolute tw-left-0 tw-top-0 tw-z-10 tw-h-[2px] tw-w-14 tw-bg-red"
                                            />
                                            <img
                                                src={c.img}
                                                alt=""
                                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover"
                                            />
                                        </div>
                                        <div
                                            className="tw-mt-4 tw-flex tw-items-center tw-gap-2.5 tw-text-[#6C757D]"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: 10,
                                                letterSpacing: "0.16em",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    width: 14,
                                                    height: 1,
                                                    background: "var(--red)",
                                                }}
                                            />
                                            Fig. {c.n} — {c.title}
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="tw-font-body tw-text-ink"
                                            style={{ fontSize: 17, lineHeight: 1.74 }}
                                        >
                                            {c.body.map((para) => (
                                                <p
                                                    key={para.slice(0, 32)}
                                                    style={{ margin: "0 0 22px" }}
                                                >
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                        <div
                                            className="tw-mt-9 tw-bg-white tw-text-navy"
                                            style={{
                                                padding: "24px 28px",
                                                borderLeft: "2px solid var(--red)",
                                                fontFamily: "var(--font-mono)",
                                                fontSize: 12,
                                                letterSpacing: "0.10em",
                                                textTransform: "uppercase",
                                                lineHeight: 1.6,
                                                fontWeight: 500,
                                            }}
                                        >
                                            <span
                                                className="tw-mb-1.5 tw-block tw-font-heading tw-text-red"
                                                style={{
                                                    fontSize: 28,
                                                    fontWeight: 900,
                                                    letterSpacing: "-0.02em",
                                                }}
                                            >
                                                {c.callout.value}
                                            </span>
                                            {c.callout.label}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Story;
