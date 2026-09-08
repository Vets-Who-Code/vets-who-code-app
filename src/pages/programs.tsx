import SEO from "@components/seo/page-seo";
import { MonoMeta, SectionEyebrow, SharpHeadline } from "@components/ui/design-system";
import { HERO_META } from "@data/software-factory";
import Layout from "@layout/layout-01";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

type TProps = {
    data: {
        factoryStatus: string;
    };
};

type PageWithLayout = NextPage<TProps> & {
    Layout: typeof Layout;
};

// 2% fractal noise, the same grain the navy sections use elsewhere. Inline data URI
// so it costs no request.
const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const grainLayer = { backgroundImage: GRAIN, opacity: 0.02 } as const;

const HERO_FACTS: Array<[string, string, boolean?]> = [
    ["Founded", "2014"],
    ["Cost to Troops", "$0 · Always"],
    ["Format", "Remote-first"],
    ["Status", "Accepting Applications", true],
];

const COMPARISON = [
    {
        program: "Accelerator",
        who: "Veterans and spouses changing careers into software engineering",
        length: "17 weeks",
        cost: "$0",
        outcome: "Software engineer with a verified body of work",
    },
    {
        program: "Mentorship",
        who: "Anyone already building who needs a second set of eyes",
        length: "6 months",
        cost: "$0",
        outcome: "A working plan and someone who holds you to it",
    },
    {
        program: "Software Factory",
        who: "Organizations that need software built, and troops who want paid reps",
        length: "Per engagement",
        cost: "$10–50k",
        outcome: "Deployed software, documentation, 30-day warranty",
    },
];

type ProgramCard = {
    number: string;
    kicker: string;
    title: string;
    description: string;
    specs: Array<[string, string]>;
    cta: string;
    path: string;
    image: string;
    alt: string;
};

const buildPrograms = (factoryStatus: string): ProgramCard[] => [
    {
        number: "Program 01",
        kicker: "Cohort Training",
        title: "Software Engineering Accelerator",
        description:
            "Seventeen weeks of remote-first engineering training, free to veterans and military spouses. The platform teaches what does not change so human time goes to pairing, code review, and shipping real work.",
        specs: [
            ["Length", "17 weeks"],
            ["Commitment", "20–30 hrs / week"],
            ["Cost", "$0"],
            ["Outcome", "Software engineer"],
        ],
        cta: "View the Accelerator",
        path: "/programs/accelerator",
        image: "https://res.cloudinary.com/vetswhocode/image/upload/v1746583122/8_azjgpx.png",
        alt: "Cohort engineers at work",
    },
    {
        number: "Program 02",
        kicker: "One to One",
        title: "Mentorship",
        description:
            "One engineer in your corner for six months. A standing appointment with someone who has already done the thing you are trying to do — not a networking app, not a coffee chat.",
        specs: [
            ["Term", "6 months, renewable"],
            ["Cadence", "Every other week"],
            ["Cost", "$0"],
            ["Outcome", "A plan, and accountability"],
        ],
        cta: "View Mentorship",
        path: "/programs/mentorship",
        image: "https://res.cloudinary.com/vetswhocode/image/upload/v1746583127/10_khmgby.png",
        alt: "A mentor pairing session",
    },
    {
        number: "Program 03",
        kicker: "Paid Client Engineering",
        title: "Software Factory",
        description:
            "Not training. A working engineering shop that takes paid client work, led by VWC engineers with cohort engineers contributing. You get production software; the veterans who build it get paid and get the reps.",
        specs: [
            ["Engagement", "Fixed bid"],
            ["Range", "$10–50k"],
            // Read from HERO_META so it cannot go stale independently of the factory page.
            ["Status", factoryStatus],
            ["Outcome", "Deployed software"],
        ],
        cta: "View the Factory",
        path: "/programs/software-factory",
        image: "https://res.cloudinary.com/vetswhocode/image/upload/v1746583121/6_qi229q.png",
        alt: "Software Factory engineers shipping client work",
    },
];

const STATS = [
    ["97%", "Job Placement", "Graduates working in software engineering roles."],
    ["$20M+", "Alumni Earnings", "Collective earnings unlocked for graduates and their families."],
    [
        "300+",
        "Troops Trained",
        "Veterans, service members, and military spouses through the program.",
    ],
    ["$0", "Tuition, 501(c)(3)", "EIN 86-2122804. No income share, no loan, no catch."],
];

const TESTIMONIALS = [
    {
        quote: "Vets Who Code modernized our web infrastructure when we needed it most. They implemented safe CI/CD pipelines, migrated our hosting, and mentored our team on sustainable engineering practices. They didn't just fix critical technical debt—they gave our leadership concrete systems and set our internal developers up for long-term self-sufficiency.",
        name: "Jessica Williams",
        title: "Director of Digital Marketing, Youth Villages",
    },
    {
        quote: "Without a doubt, I would hire from Vets Who Code again. The experience has been overwhelmingly positive, and I believe in veterans' immense value to our team and our healthcare mission.",
        name: "Darnell Settles III",
        title: "Director of Web and Digital Strategy, Methodist Le Bonheur Healthcare",
    },
];

// Wordmarks, not logos: the partner marks on the homepage are square glyphs covering
// only 3 of these 7, and they're technology partners — a different list entirely.
const EMPLOYERS = [
    "Microsoft",
    "Accenture",
    "Amazon",
    "Google",
    "GitHub",
    "Booz Allen",
    "Deloitte",
];

const ROUTES = [
    {
        kicker: "01 / Veterans & Spouses",
        title: "You want the training.",
        body: "Applications for the accelerator open by cohort. Mentorship is open year-round.",
        link: "Apply now",
        path: "/apply",
    },
    {
        kicker: "02 / Companies",
        title: "You need engineers, or software.",
        body: "Hire from the graduate pool, or contract the Software Factory to build and hand back.",
        link: "Talk to us",
        path: "/jobs",
    },
    {
        kicker: "03 / Mentors & Instructors",
        title: "You have reps to give.",
        body: "Working engineers pair with troops, review code, and lead sessions. Two hours a month is enough to matter.",
        link: "Volunteer",
        path: "/mentor",
    },
    {
        kicker: "04 / Donors & Funders",
        title: "You fund the $0.",
        body: "Tuition is free because donors and partners cover it. 501(c)(3), EIN 86-2122804. What we teach is public and auditable.",
        link: "Ways to give",
        path: "/donate",
    },
];

const CARD_HOVER =
    "tw-border tw-border-t-2 tw-border-gray-100 tw-border-t-transparent tw-transition-[transform,box-shadow,border-color] tw-duration-300 tw-ease-[cubic-bezier(0.3,0.2,0.3,0.3)] hover:tw--translate-y-0.5 hover:tw-border-t-red hover:tw-shadow-[0_10px_30px_rgba(0,0,0,0.18)]";

const ProgramsPage: PageWithLayout = ({ data }) => {
    const programs = buildPrograms(data.factoryStatus);

    return (
        <>
            <SEO
                title="Programs | Vets Who Code"
                description="Three ways in, one standard: the Software Engineering Accelerator, Mentorship, and the Software Factory. Free to veterans and military spouses."
            />

            {/* 1 — Hero */}
            <section className="tw-relative tw-isolate tw-bg-navy">
                <div className="tw-absolute tw-inset-0 -tw-z-10 tw-bg-[linear-gradient(135deg,#091f40_0%,#061A40_100%)]" />
                <div className="tw-absolute tw-inset-0 -tw-z-10" style={grainLayer} />
                <div className="tw-container tw-px-6 tw-pb-24 tw-pt-[120px]">
                    <SectionEyebrow label="Programs Index" subLabel="3 Active" tone="dark" />
                    <h1 className="tw-mt-7 tw-max-w-[900px] tw-font-heading tw-font-black tw-uppercase tw-leading-[1.02] tw-tracking-[-0.02em] tw-text-white [font-size:clamp(38px,6.4vw,76px)]">
                        Three ways in.
                        <br />
                        {/* Gold, not red: red on navy is 2.85:1 and fails the 3:1 large-text floor. */}
                        <span className="tw-text-gold">One standard.</span>
                    </h1>
                    <p className="tw-mt-8 tw-max-w-[640px] tw-font-body tw-leading-[1.6] tw-text-white/90 [font-size:clamp(17px,1.4vw,20px)]">
                        Every program is free to veterans and military spouses, remote-first, and
                        built around shipping real work. Pick the one that fits where you are.
                    </p>
                    <div className="tw-mt-10 tw-flex tw-flex-wrap tw-gap-3.5">
                        <Button path="/apply" color="primary" size="md">
                            Apply to a Program
                        </Button>
                        <Button path="/contact-us" color="light" size="md">
                            Hire or Sponsor
                        </Button>
                    </div>

                    <div className="tw-mt-16 tw-grid tw-grid-cols-[repeat(auto-fit,minmax(180px,1fr))] tw-gap-px tw-border tw-border-[rgba(185,214,242,0.08)] tw-bg-[rgba(185,214,242,0.08)]">
                        {HERO_FACTS.map(([key, value, accent]) => (
                            <div
                                key={key}
                                className="tw-bg-[rgba(6,26,64,0.55)] tw-px-[22px] tw-py-5"
                            >
                                <div className="tw-mb-2 tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-[0.1em] tw-text-[rgba(185,214,242,0.7)]">
                                    {key}
                                </div>
                                <div
                                    className={`tw-font-heading tw-text-[15px] tw-font-bold ${accent ? "tw-text-gold" : "tw-text-white"}`}
                                >
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2 — At a glance */}
            <section className="tw-border-b tw-border-gray-100 tw-bg-gray-50 tw-py-[72px]">
                <div className="tw-container tw-px-6">
                    <SectionEyebrow
                        label="At a Glance"
                        subLabel="Compare Before You Commit"
                        className="tw-mb-7"
                    />
                    <div className="tw-overflow-x-auto">
                        <table className="tw-w-full tw-min-w-[780px] tw-border tw-border-gray-100 tw-bg-white tw-text-left">
                            <thead>
                                <tr className="tw-bg-navy">
                                    {["Program", "Who It's For", "Length", "Cost", "Outcome"].map(
                                        (h) => (
                                            <th
                                                key={h}
                                                scope="col"
                                                className="tw-px-[18px] tw-py-3.5 tw-font-mono tw-text-[10px] tw-font-normal tw-uppercase tw-tracking-[0.1em] tw-text-navy-sky"
                                            >
                                                {h}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.map((row, i) => (
                                    <tr
                                        key={row.program}
                                        className={`tw-border-t tw-border-gray-100 ${i === 1 ? "tw-bg-gray-50" : ""}`}
                                    >
                                        <th
                                            scope="row"
                                            className="tw-px-[18px] tw-py-5 tw-font-heading tw-text-[14px] tw-font-bold tw-uppercase tw-tracking-[-0.01em] tw-text-navy"
                                        >
                                            {row.program}
                                        </th>
                                        <td className="tw-px-[18px] tw-py-5 tw-font-body tw-text-[15px] tw-text-gray-300">
                                            {row.who}
                                        </td>
                                        <td className="tw-px-[18px] tw-py-5 tw-font-mono tw-text-[12px] tw-text-ink">
                                            {row.length}
                                        </td>
                                        <td className="tw-px-[18px] tw-py-5 tw-font-mono tw-text-[12px] tw-text-ink">
                                            {row.cost}
                                        </td>
                                        <td className="tw-px-[18px] tw-py-5 tw-font-body tw-text-[15px] tw-text-gray-300">
                                            {row.outcome}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 3 — Programs */}
            <section className="tw-bg-cream tw-py-[110px]">
                <div className="tw-container tw-px-6">
                    <SectionEyebrow label="What We Run" subLabel="3 Active" />
                    <SharpHeadline as="h2" size="h2" className="tw-mt-4 tw-max-w-[820px]">
                        Three programs. Pick the one that fits where you are.
                    </SharpHeadline>

                    <div className="tw-mt-14 tw-grid tw-grid-cols-[repeat(auto-fit,minmax(300px,1fr))] tw-gap-[30px]">
                        {programs.map((program) => (
                            <article
                                key={program.path}
                                className={`tw-flex tw-flex-col tw-bg-white ${CARD_HOVER}`}
                            >
                                <div className="tw-relative tw-h-[200px] tw-w-full tw-shrink-0">
                                    <Image
                                        src={program.image}
                                        alt={program.alt}
                                        fill={true}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="tw-object-cover"
                                    />
                                </div>
                                <div className="tw-flex tw-flex-1 tw-flex-col tw-gap-[18px] tw-p-[30px]">
                                    <div className="tw-flex tw-items-center tw-gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="tw-inline-block tw-h-[2px] tw-w-4 tw-shrink-0 tw-bg-red"
                                        />
                                        <MonoMeta size="xs" className="tw-text-gray-400">
                                            {program.number}
                                        </MonoMeta>
                                        <MonoMeta size="xs" className="tw-text-gray-300">
                                            / {program.kicker}
                                        </MonoMeta>
                                    </div>
                                    <h3 className="tw-m-0 tw-font-heading tw-font-extrabold tw-uppercase tw-leading-[1.1] tw-text-navy [font-size:clamp(22px,2vw,28px)]">
                                        {program.title}
                                    </h3>
                                    <p className="tw-m-0 tw-flex-1 tw-font-body tw-text-[15px] tw-text-gray-300">
                                        {program.description}
                                    </p>
                                    <dl className="tw-m-0 tw-grid tw-gap-2 tw-border-t tw-border-gray-100 tw-pt-[18px]">
                                        {program.specs.map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="tw-flex tw-items-baseline tw-justify-between tw-gap-4"
                                            >
                                                <dt className="tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-[0.1em] tw-text-gray-400">
                                                    {key}
                                                </dt>
                                                <dd className="tw-m-0 tw-text-right tw-font-heading tw-text-[13px] tw-font-bold tw-text-navy">
                                                    {value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <Button
                                        path={program.path}
                                        color="primary"
                                        size="sm"
                                        className="tw-self-start"
                                    >
                                        {program.cta}
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4 — The record */}
            <section className="tw-relative tw-isolate tw-bg-navy tw-py-24">
                <div className="tw-absolute tw-inset-0 tw-z-0" style={grainLayer} />
                <div className="tw-container tw-relative tw-z-[1] tw-px-6">
                    <SectionEyebrow
                        label="The Record"
                        subLabel="Since 2014"
                        tone="dark"
                        className="tw-mb-11"
                    />
                    <div className="tw-grid tw-grid-cols-[repeat(auto-fit,minmax(210px,1fr))] tw-gap-x-[30px] tw-gap-y-10">
                        {STATS.map(([value, label, gloss]) => (
                            <div key={label}>
                                <div className="tw-font-heading tw-font-black tw-leading-none tw-tracking-[-0.02em] tw-text-white [font-size:clamp(40px,4.6vw,60px)]">
                                    {value}
                                </div>
                                <div className="tw-mb-2 tw-mt-3 tw-font-heading tw-text-[13px] tw-font-bold tw-uppercase tw-tracking-[0.08em] tw-text-gold">
                                    {label}
                                </div>
                                <p className="tw-m-0 tw-font-body tw-text-[15px] tw-text-[rgba(185,214,242,0.7)]">
                                    {gloss}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="tw-relative tw-mb-14 tw-mt-[72px] tw-h-px tw-bg-[rgba(185,214,242,0.08)]">
                        <span className="tw-absolute tw-left-0 tw-top-0 tw-h-px tw-w-12 tw-bg-red" />
                    </div>

                    <div className="tw-grid tw-grid-cols-[repeat(auto-fit,minmax(300px,1fr))] tw-gap-[30px]">
                        {TESTIMONIALS.map((t) => (
                            <blockquote
                                key={t.name}
                                className="tw-m-0 tw-border-l-2 tw-border-red tw-pl-[26px]"
                            >
                                <p className="tw-m-0 tw-font-body tw-leading-[1.55] tw-text-white [font-size:clamp(17px,1.4vw,21px)]">
                                    {t.quote}
                                </p>
                                <footer className="tw-mt-5 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-[rgba(185,214,242,0.7)]">
                                    {t.name}
                                    <br />
                                    <span className="tw-normal-case tw-tracking-[0.04em]">
                                        {t.title}
                                    </span>
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5 — Employers */}
            <section className="tw-border-b tw-border-[rgba(9,31,64,0.08)] tw-bg-cream tw-py-[72px]">
                <div className="tw-container tw-px-6">
                    <SectionEyebrow label="Where Graduates Work" className="tw-mb-8" />
                    <div className="tw-flex tw-flex-wrap tw-gap-px">
                        {EMPLOYERS.map((name) => (
                            <div
                                key={name}
                                className="tw-flex tw-min-h-[88px] tw-flex-1 tw-basis-[200px] tw-items-center tw-justify-center tw-border tw-border-[rgba(9,31,64,0.1)] tw-bg-cream tw-px-6 tw-py-5"
                            >
                                <span className="tw-whitespace-nowrap tw-font-mono tw-text-[13px] tw-font-bold tw-uppercase tw-tracking-[0.12em] tw-text-navy">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6 — Next step */}
            <section className="tw-bg-white tw-py-[100px]">
                <div className="tw-container tw-px-6">
                    <SectionEyebrow label="Next Step" />
                    <SharpHeadline as="h2" size="h2" className="tw-mb-12 tw-mt-4 tw-max-w-[760px]">
                        Find the door that is yours.
                    </SharpHeadline>
                    <div className="tw-grid tw-grid-cols-[repeat(auto-fit,minmax(250px,1fr))] tw-gap-[30px]">
                        {ROUTES.map((route) => (
                            <div
                                key={route.path}
                                className={`tw-flex tw-flex-col tw-gap-3.5 tw-p-[30px] ${CARD_HOVER}`}
                            >
                                <MonoMeta size="xs" tone="accent">
                                    {route.kicker}
                                </MonoMeta>
                                <h3 className="tw-m-0 tw-font-heading tw-text-[19px] tw-font-bold tw-text-navy">
                                    {route.title}
                                </h3>
                                <p className="tw-m-0 tw-flex-1 tw-font-body tw-text-[15px] tw-text-gray-300">
                                    {route.body}
                                </p>
                                <Anchor
                                    path={route.path}
                                    className="tw-font-heading tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.08em] tw-text-red hover:tw-underline"
                                >
                                    {route.link} →
                                </Anchor>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7 — CTA banner */}
            <section className="tw-bg-red tw-py-[72px]">
                <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-8 tw-px-6">
                    <div className="tw-max-w-[720px]">
                        {/* Full white, not 85%: at 11px on red, 85% white measures 3.54:1. */}
                        <div className="tw-mb-4 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.12em] tw-text-white">
                            Retool. Retrain. Relaunch.
                        </div>
                        <h2 className="tw-m-0 tw-font-heading tw-font-black tw-uppercase tw-text-white [font-size:clamp(26px,3.2vw,40px)]">
                            Pick Your Program. Lets Get To Work.
                        </h2>
                    </div>
                    <div className="tw-flex tw-flex-wrap tw-gap-3.5">
                        <Button path="/apply" color="light" size="md">
                            Start Your Journey
                        </Button>
                        <Button path="/contact-us" color="light" variant="outlined" size="md">
                            Contact
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

ProgramsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const status = HERO_META.find(([key]) => key === "STATUS")?.[1] ?? "";
    return {
        props: {
            data: {
                // "BOOKING Q4 2026 · Q1 2027" → "Booking Q4 2026 · Q1 2027". Title-case per word so
                // tokens like "Q3" keep their capital.
                factoryStatus: status.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default ProgramsPage;
