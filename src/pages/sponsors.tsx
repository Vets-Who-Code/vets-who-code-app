import SEO from "@components/seo/page-seo";
import { MonoMeta, SectionEyebrow, SharpHeadline, StatStrip } from "@components/ui/design-system";
import Layout from "@layout/layout-01";
import type { NextPage } from "next";

type PageWithLayout = NextPage & {
    Layout: typeof Layout;
};

const benefits = [
    {
        label: "01",
        title: "Internships",
        description:
            "Test-drive the talent. Increase productivity. Diversify perspective with veteran candidates ready for production code on day one.",
    },
    {
        label: "02",
        title: "Guaranteed interviews",
        description:
            "Veterans are at risk of unemployment and underemployment. Guarantee an interview for troops who complete the Hashflag Stack and you raise their odds of landing the role.",
    },
    {
        label: "03",
        title: "Direct sponsorship",
        description:
            "Fund the program. Every dollar trains more veterans. EIN 86-2122804 — VWC is a 501(c)(3).",
    },
];

const SponsorPage: PageWithLayout = () => {
    return (
        <>
            <SEO title="Become a Sponsor" />

            {/* Operations brief bar */}
            <div className="tw-w-full tw-border-b tw-border-cream/10 tw-bg-navy tw-py-2.5">
                <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-gap-x-6 tw-gap-y-2">
                    <MonoMeta tone="bright" size="xs">
                        <span className="tw-flex tw-items-center tw-gap-2">
                            <span className="tw-relative tw-flex tw-h-[7px] tw-w-[7px]">
                                <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-red tw-opacity-75" />
                                <span className="tw-relative tw-inline-flex tw-h-[7px] tw-w-[7px] tw-rounded-full tw-bg-red tw-shadow-[0_0_10px_#c5203e]" />
                            </span>
                            Live · Sponsor Brief v2.0
                        </span>
                    </MonoMeta>
                    <MonoMeta tone="muted" size="xs">
                        Classification · <span className="tw-text-cream">Public</span>
                    </MonoMeta>
                    <MonoMeta tone="muted" size="xs">
                        EIN · <span className="tw-text-cream">86-2122804</span>
                    </MonoMeta>
                    <MonoMeta tone="muted" size="xs" className="tw-ml-auto">
                        <span className="tw-text-cream">2026 Cohort Active</span>
                    </MonoMeta>
                </div>
            </div>

            {/* Hero */}
            <section className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <SectionEyebrow
                        label="Sponsorship"
                        subLabel="DOC 04 / BECOME A SPONSOR"
                        tone="dark"
                    />
                    <SharpHeadline as="h1" size="h1" tone="white" className="tw-mt-6">
                        We want you.
                        <br />
                        <span className="tw-text-red">#VetsWhoCode</span>
                    </SharpHeadline>
                    <p className="tw-mt-10 tw-max-w-[640px] tw-font-body tw-text-[#F8F9FA] tw-leading-[1.5] [font-size:clamp(18px,1.6vw,22px)]">
                        After completing the Hashflag Stack, our troops are able, willing, and
                        highly qualified to enter the civilian workforce. Sponsor VWC and make a
                        real investment in their careers.
                    </p>

                    <div className="tw-mt-14">
                        <StatStrip
                            tone="dark"
                            cells={[
                                {
                                    label: "Placement",
                                    value: "97%",
                                    sub: "of graduating troops",
                                },
                                {
                                    label: "Alumni earnings",
                                    value: "$20M+",
                                    sub: "collective annual",
                                },
                                {
                                    label: "Tax status",
                                    value: "501(c)(3)",
                                    sub: "EIN 86-2122804",
                                },
                                { label: "WOTC", value: "Eligible", sub: "no per-hire cap" },
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="tw-bg-cream tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow label="Engagement Options" subLabel="03 TRACKS" />
                        <SharpHeadline as="h2" size="h2" tone="navy">
                            Three ways
                            <br />
                            <span className="tw-text-red">to sponsor.</span>
                        </SharpHeadline>
                    </div>
                    <div className="tw-mt-14 tw-grid tw-gap-8 md:tw-grid-cols-3">
                        {benefits.map((benefit) => (
                            <article
                                key={benefit.label}
                                className="tw-border-t-2 tw-border-red tw-bg-white tw-p-8"
                            >
                                <MonoMeta tone="muted" size="md">
                                    Option {benefit.label}
                                </MonoMeta>
                                <h3 className="tw-mt-4 tw-font-heading tw-text-[22px] tw-font-bold tw-uppercase tw-text-navy [letter-spacing:-0.01em] [line-height:1.2]">
                                    {benefit.title}
                                </h3>
                                <p className="tw-mt-4 tw-font-body tw-text-charcoal tw-leading-[1.6]">
                                    {benefit.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* The case */}
            <section className="dark-section tw-bg-navy tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-mx-auto tw-max-w-3xl tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow label="Why Veterans Ship" subLabel="THE CASE" tone="dark" />
                        <SharpHeadline as="h2" size="h2" tone="white">
                            Veterans are not
                            <br />
                            <span className="tw-text-red">charity hires.</span>
                        </SharpHeadline>
                        <div className="tw-mt-8 tw-space-y-6 tw-font-body tw-text-[#F8F9FA] tw-leading-[1.65] [font-size:clamp(16px,1.2vw,18px)]">
                            <p>
                                Only 1 in 4 of the U.S. population meets the military&apos;s
                                physical, behavioral, and educational standards. The people who do
                                make it through are exceptionally well-trained, disciplined, team-
                                oriented, goal-driven, and built for leadership.
                            </p>
                            <p>
                                That stack of attributes maps directly to the tech industry.
                                Veterans are already prepared to work harder and move faster on day
                                one. Because most engineering teams hire on attitude before skills,
                                military members can step into critical roles and become valuable
                                contributors immediately.
                            </p>
                            <p>
                                The Work Opportunity Tax Credit (WOTC) is a federal income tax
                                credit available to employers who hire and retain veterans and other
                                targeted groups facing significant barriers to employment. There is
                                no per-hire cap.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="cta-banner tw-bg-navy-deep tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-mx-auto tw-max-w-3xl tw-text-center tw-flex tw-flex-col tw-gap-6">
                        <SectionEyebrow
                            label="Contact"
                            subLabel="SPONSORSHIP DESK"
                            tone="dark"
                            align="center"
                        />
                        <SharpHeadline as="h2" size="h2" tone="white" align="center">
                            Talk to
                            <br />
                            <span className="tw-text-red">Ayumi Bennett</span>.
                        </SharpHeadline>
                        <MonoMeta tone="bright" size="md">
                            Technical Program Manager
                        </MonoMeta>
                        <a
                            href="mailto:ayumi@vetswhocode.io"
                            className="tw-inline-flex tw-self-center tw-items-center tw-gap-3 tw-border-2 tw-border-red tw-bg-red tw-px-7 tw-py-4 tw-font-heading tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.08em] tw-text-white tw-transition-colors hover:tw-border-red-crimson hover:tw-bg-red-crimson active:tw-scale-[0.97]"
                        >
                            ayumi@vetswhocode.io
                            <span aria-hidden="true">→</span>
                        </a>
                        <MonoMeta tone="muted" size="xs" className="tw-mt-4">
                            Vets Who Code Inc. · 501(c)(3) · EIN 86-2122804
                        </MonoMeta>
                    </div>
                </div>
            </section>
        </>
    );
};

SponsorPage.Layout = Layout;

export default SponsorPage;
