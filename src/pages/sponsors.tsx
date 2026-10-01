import SEO from "@components/seo/page-seo";
import { MonoMeta, SectionEyebrow, SharpHeadline, StatStrip } from "@components/ui/design-system";
import siteConfig from "@data/site-config";
import {
    alumniOutcomes,
    engagementTracks,
    isTodo,
    sponsorBenefits,
    sponsorLinks,
    sponsorStats,
    sponsorTiers,
    techPartners,
    testimonials,
} from "@data/sponsors";
import Layout from "@layout/layout-01";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { type FormEvent, type ReactNode, useState } from "react";

type PageWithLayout = NextPage & {
    Layout: typeof Layout;
};

const IS_DEV = process.env.NODE_ENV !== "production";

/** Shows `children` once the value is real. Until then: flagged in dev, gone in production. */
const Todo = ({ value, children }: { value?: string; children?: ReactNode }) => {
    if (!isTodo(value)) return <>{children ?? value}</>;
    if (!IS_DEV) return null;
    return (
        <mark className="tw-inline-block tw-border tw-border-dashed tw-border-red tw-bg-gold-light tw-px-2 tw-py-0.5 tw-font-mono tw-text-xs tw-normal-case tw-text-ink">
            {value || "TODO(jerome)"}
        </mark>
    );
};

const PRIMARY_CTA =
    "tw-inline-flex tw-items-center tw-gap-3 tw-border-2 tw-border-red tw-bg-red tw-px-7 tw-py-4 tw-font-heading tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.08em] tw-text-white tw-transition-colors hover:tw-border-red-crimson hover:tw-bg-red-crimson active:tw-scale-[0.97]";
const GHOST_CTA =
    "tw-inline-flex tw-items-center tw-gap-3 tw-border-2 tw-border-cream tw-px-7 tw-py-4 tw-font-heading tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.08em] tw-text-cream tw-transition-colors hover:tw-bg-cream hover:tw-text-navy";
const FIELD =
    "tw-block tw-w-full tw-rounded-none tw-border tw-border-navy tw-bg-white tw-px-4 tw-py-3 tw-font-body tw-text-base tw-text-navy focus:tw-outline focus:tw-outline-[3px] focus:tw-outline-offset-2 focus:tw-outline-gold";
const LABEL = "tw-mb-2 tw-block tw-font-heading tw-text-[13px] tw-font-medium tw-text-navy";

const approvedPartners = techPartners.filter((partner) => partner.logoApproved);
const OTHER_TRACK = "Something else";

const faq = [
    {
        question: "What is the Work Opportunity Tax Credit?",
        answer: "The Work Opportunity Tax Credit (WOTC) is a federal income tax credit available to employers who hire and retain veterans and other targeted groups facing significant barriers to employment. There is no per-hire cap.",
    },
    {
        question: "Is Vets Who Code a registered nonprofit?",
        answer: "Yes. Vets Who Code Inc. is a 501(c)(3) nonprofit, EIN 86-2122804.",
    },
];

type SubmitState = "ready" | "sending" | "sent" | "error";

const SponsorPage: PageWithLayout = () => {
    const [track, setTrack] = useState("");
    const [submitState, setSubmitState] = useState<SubmitState>("ready");

    // Preselect the track, then land on the form with focus on that field.
    const pickTrack = (title: string) => {
        setTrack(title);
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        document.getElementById("sponsor-track")?.focus({ preventScroll: true });
    };

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const field = (key: string) => String(form.get(key) ?? "");
        setSubmitState("sending");
        try {
            await axios.post("/api/contact", {
                name: field("name"),
                email: field("email"),
                website: field("website"),
                subject: `Sponsorship · ${track || OTHER_TRACK}`,
                reason: "Donations and sponsorship",
                message: `Company: ${field("company")}\nTrack: ${track || OTHER_TRACK}\n\n${field("message")}`,
            });
            setSubmitState("sent");
        } catch {
            setSubmitState("error");
        }
    };

    return (
        <>
            <SEO
                title="Become a Sponsor"
                description="Sponsor Vets Who Code, the 501(c)(3) software engineering accelerator for veterans. Fund troops, host interns, guarantee interviews, or put your tools in their hands."
                jsonLdType="faq"
                faq={faq}
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "NGO",
                            name: siteConfig.name,
                            legalName: "Vets Who Code Inc.",
                            url: siteConfig.url,
                            taxID: "86-2122804",
                            nonprofitStatus: "Nonprofit501c3",
                            contactPoint: {
                                "@type": "ContactPoint",
                                contactType: "Sponsorship",
                                email: "ayumi@vetswhocode.io",
                            },
                        }),
                    }}
                />
            </Head>

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
                    <MonoMeta tone="gold" size="xs">
                        Classification · <span className="tw-text-cream">Public</span>
                    </MonoMeta>
                    <MonoMeta tone="gold" size="xs">
                        EIN · <span className="tw-text-cream">86-2122804</span>
                    </MonoMeta>
                    <MonoMeta tone="muted" size="xs" className="tw-ml-auto">
                        <span className="tw-text-cream">{siteConfig.cohortStatus}</span>
                    </MonoMeta>
                </div>
            </div>

            {/* Hero + proof bar */}
            <section className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <SectionEyebrow
                        label="Sponsorship"
                        subLabel="DOC 04 / BECOME A SPONSOR"
                        tone="dark"
                    />
                    <SharpHeadline
                        as="h1"
                        size="h1"
                        tone="white"
                        className="tw-mt-6 maxSm:tw-text-[32px]"
                    >
                        We want you.
                        <br />
                        <span className="tw-text-gold">#VetsWhoCode</span>
                    </SharpHeadline>
                    <p className="tw-mt-10 tw-max-w-[640px] tw-font-body tw-text-[#F8F9FA] tw-leading-[1.5] [font-size:clamp(18px,1.6vw,22px)]">
                        After completing the Hashflag Stack, our troops are able, willing, and
                        highly qualified to enter the civilian workforce. Sponsor VWC and make a
                        real investment in their careers.
                    </p>
                    <div className="tw-mt-10 tw-flex tw-flex-wrap tw-gap-4">
                        <Todo value={sponsorLinks.booking}>
                            <a href={sponsorLinks.booking} className={PRIMARY_CTA}>
                                Book a call <span aria-hidden="true">→</span>
                            </a>
                        </Todo>
                        <Todo value={sponsorLinks.brief}>
                            <a href={sponsorLinks.brief} download={true} className={GHOST_CTA}>
                                Download sponsor brief (PDF)
                            </a>
                        </Todo>
                    </div>

                    <div className="tw-mt-14">
                        <StatStrip
                            tone="dark"
                            cells={sponsorStats.map((stat, i) => ({
                                label: stat.label,
                                value: (
                                    <>
                                        {stat.value}
                                        <sup className="tw-ml-1 tw-text-[14px]">
                                            <a
                                                href={`#source-${i + 1}`}
                                                id={`source-ref-${i + 1}`}
                                                className="tw-text-gold hover:tw-underline"
                                                aria-label={`Source ${i + 1}`}
                                            >
                                                {i + 1}
                                            </a>
                                        </sup>
                                    </>
                                ),
                            }))}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonial + alumni outcomes */}
            <section className="tw-bg-cream tw-py-20 md:tw-py-[120px]">
                <div className="tw-container tw-grid tw-gap-14 lg:tw-grid-cols-[3fr_2fr] lg:tw-items-center">
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow label="Proof" subLabel="FROM THE HIRING MANAGER" />
                        <h2 className="tw-sr-only">What employers say</h2>
                        {testimonials.map((t) => (
                            <figure
                                key={t.name}
                                className="tw-m-0 tw-border-l-2 tw-border-red tw-pl-6"
                            >
                                <blockquote className="tw-m-0 tw-font-heading tw-font-bold tw-text-navy tw-leading-[1.2] [font-size:clamp(26px,3.4vw,44px)]">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <figcaption className="tw-mt-6 tw-font-body tw-text-gray-300">
                                    <span className="tw-block tw-font-bold tw-text-navy">
                                        {t.name}
                                    </span>
                                    {t.title}, {t.org}
                                    {t.sourceUrl && (
                                        <a
                                            href={t.sourceUrl}
                                            className="tw-mt-3 tw-block tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.1em] tw-text-red hover:tw-underline"
                                        >
                                            Read the full story →
                                        </a>
                                    )}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <ul className="tw-m-0 tw-grid tw-list-none tw-gap-6 tw-p-0 sm:tw-grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                        {alumniOutcomes.map((alum) => (
                            <li key={alum.name} className="tw-border-t-2 tw-border-red tw-bg-white">
                                <img
                                    src={alum.photo}
                                    alt={`${alum.name}, ${alum.role} at ${alum.org}`}
                                    className="tw-h-auto tw-w-full"
                                    width={2000}
                                    height={600}
                                    loading="lazy"
                                />
                                <div className="tw-p-6">
                                    <MonoMeta tone="muted" size="xs">
                                        Alumni outcome · {alum.branch}
                                    </MonoMeta>
                                    <h3 className="tw-mt-3 tw-font-heading tw-text-[20px] tw-font-bold tw-uppercase tw-text-navy">
                                        {alum.name}
                                    </h3>
                                    <p className="tw-mt-2 tw-mb-0 tw-font-body tw-text-gray-300">
                                        {alum.role}, {alum.org}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Engagement tracks */}
            <section className="tw-bg-white tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow
                            label="Engagement Options"
                            subLabel={`0${engagementTracks.length} TRACKS`}
                        />
                        <SharpHeadline as="h2" size="h2" tone="navy">
                            Four ways
                            <br />
                            <span className="tw-text-red">to sponsor.</span>
                        </SharpHeadline>
                    </div>
                    <div className="tw-mt-14 tw-grid tw-gap-8 md:tw-grid-cols-2 xl:tw-grid-cols-4">
                        {engagementTracks.map((t, i) => (
                            <article
                                key={t.id}
                                className="tw-flex tw-flex-col tw-border-t-2 tw-border-red tw-bg-cream tw-p-8"
                            >
                                <MonoMeta tone="accent" size="md">
                                    Option 0{i + 1}
                                </MonoMeta>
                                <h3 className="tw-mt-4 tw-font-heading tw-text-[22px] tw-font-bold tw-uppercase tw-text-navy [letter-spacing:-0.01em] [line-height:1.2]">
                                    {t.title}
                                </h3>
                                <p className="tw-mt-4 tw-flex-1 tw-font-body tw-text-gray-300 tw-leading-[1.6]">
                                    {t.description}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => pickTrack(t.title)}
                                    className="tw-mt-6 tw-self-start tw-font-heading tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.08em] tw-text-red hover:tw-underline"
                                >
                                    Sponsor this track
                                    <span className="tw-sr-only">: {t.title}</span>{" "}
                                    <span aria-hidden="true">→</span>
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tiers + what sponsors get */}
            <section className="dark-section tw-bg-navy tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow label="Sponsorship Tiers" subLabel="PRICE" tone="dark" />
                        <SharpHeadline as="h2" size="h2" tone="white">
                            Pick your
                            <br />
                            <span className="tw-text-gold">level.</span>
                        </SharpHeadline>
                    </div>
                    <div className="tw-mt-14 tw-grid tw-gap-8 md:tw-grid-cols-3">
                        {sponsorTiers.map((tier) => (
                            <article
                                key={tier.name}
                                className="tw-flex tw-flex-col tw-gap-4 tw-border tw-border-cream/20 tw-p-8"
                            >
                                <h3 className="tw-m-0 tw-font-heading tw-text-[22px] tw-font-bold tw-uppercase tw-text-gold">
                                    {tier.name}
                                </h3>
                                <p className="tw-m-0 tw-font-heading tw-text-[30px] tw-font-semibold tw-text-cream">
                                    <Todo value={tier.amount} />
                                </p>
                                <p className="tw-m-0 tw-font-body tw-text-[#DEE2E6]">
                                    <Todo value={tier.funds} />
                                </p>
                                <ul className="tw-m-0 tw-list-none tw-space-y-2 tw-border-t tw-border-cream/10 tw-p-0 tw-pt-4 tw-font-body tw-text-[#F8F9FA]">
                                    {tier.benefits.map((benefit) => (
                                        <li key={benefit}>
                                            <span aria-hidden="true" className="tw-text-gold">
                                                ▸{" "}
                                            </span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>

                    <h3 className="tw-mt-20 tw-font-heading tw-text-[22px] tw-font-bold tw-uppercase tw-text-white">
                        What sponsors get
                    </h3>
                    <dl className="tw-mt-8 tw-grid tw-gap-8 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
                        {sponsorBenefits.map((b) => (
                            <div key={b.title} className="tw-border-t tw-border-gold tw-pt-4">
                                <dt className="tw-font-heading tw-font-bold tw-uppercase tw-text-gold">
                                    {b.title}
                                </dt>
                                <dd className="tw-mt-2 tw-ml-0 tw-font-body tw-text-[#F8F9FA]">
                                    {b.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Built on */}
            {approvedPartners.length > 0 && (
                <section className="tw-bg-cream tw-py-20 md:tw-py-[120px]">
                    <div className="tw-container">
                        <div className="tw-flex tw-flex-col tw-gap-4">
                            <SectionEyebrow label="Tech Partners" subLabel="IN-KIND" />
                            <SharpHeadline as="h2" size="h2" tone="navy">
                                Built on.
                            </SharpHeadline>
                            <p className="tw-m-0 tw-font-body tw-text-gray-300">
                                Our troops ship on the same tools you do.
                            </p>
                        </div>
                        <ul className="tw-mt-12 tw-grid tw-list-none tw-grid-cols-2 tw-gap-6 tw-p-0 md:tw-grid-cols-4">
                            {approvedPartners.map((partner, i) => (
                                <li key={partner.name}>
                                    <a
                                        href={partner.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-describedby={
                                            isTodo(partner.contribution)
                                                ? undefined
                                                : `partner-${i}`
                                        }
                                        className="tw-group tw-flex tw-h-full tw-min-h-[150px] tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-border tw-border-gray-100 tw-bg-white tw-p-6 focus-visible:tw-outline focus-visible:tw-outline-[3px] focus-visible:tw-outline-gold"
                                    >
                                        <img
                                            src={partner.logo}
                                            alt={`${partner.name} logo`}
                                            className="tw-h-10 tw-w-auto tw-max-w-full"
                                        />
                                        <span className="tw-font-heading tw-text-[13px] tw-font-bold tw-uppercase tw-text-navy">
                                            {partner.name}
                                        </span>
                                        <span
                                            id={`partner-${i}`}
                                            className="tw-text-center tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.1em] tw-text-gray-300 tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100 group-focus:tw-opacity-100"
                                        >
                                            <Todo value={partner.contribution} />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* The case */}
            <section className="dark-section tw-bg-navy tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-mx-auto tw-max-w-3xl tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow label="Why Veterans Ship" subLabel="THE CASE" tone="dark" />
                        <SharpHeadline as="h2" size="h2" tone="white">
                            Veterans are not
                            <br />
                            <span className="tw-text-gold">charity hires.</span>
                        </SharpHeadline>
                        <p className="tw-mt-8 tw-font-body tw-text-[#F8F9FA] tw-leading-[1.65] [font-size:clamp(16px,1.2vw,18px)]">
                            Only 1 in 4 of the U.S. population meets the military&apos;s physical,
                            behavioral, and educational standards. The people who make it through
                            are disciplined, team-oriented, and built for leadership, and they step
                            into engineering roles ready to contribute on day one.
                        </p>
                        <div className="tw-mt-6 tw-border-t tw-border-cream/10">
                            {faq.map((item) => (
                                <details
                                    key={item.question}
                                    className="tw-group tw-border-b tw-border-cream/10 tw-py-5"
                                >
                                    <summary className="tw-cursor-pointer tw-font-heading tw-font-bold tw-uppercase tw-text-gold">
                                        {item.question}
                                    </summary>
                                    <p className="tw-mt-4 tw-mb-0 tw-font-body tw-text-[#F8F9FA] tw-leading-[1.65]">
                                        {item.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section
                id="contact"
                className="cta-banner tw-scroll-mt-[200px] tw-bg-navy-deep tw-py-20 md:tw-py-[120px]"
            >
                <div className="tw-container tw-grid tw-gap-14 lg:tw-grid-cols-2 lg:tw-items-start">
                    <div className="tw-flex tw-flex-col tw-gap-6">
                        <SectionEyebrow label="Contact" subLabel="SPONSORSHIP DESK" tone="dark" />
                        <SharpHeadline as="h2" size="h2" tone="white">
                            Talk to
                            <br />
                            <span className="tw-text-gold">Ayumi Bennett</span>.
                        </SharpHeadline>
                        <MonoMeta tone="bright" size="md">
                            Technical Program Manager
                        </MonoMeta>
                        <div className="tw-flex tw-flex-wrap tw-gap-4">
                            <Todo value={sponsorLinks.booking}>
                                <a href={sponsorLinks.booking} className={PRIMARY_CTA}>
                                    Book a call <span aria-hidden="true">→</span>
                                </a>
                            </Todo>
                            <a href="mailto:ayumi@vetswhocode.io" className={GHOST_CTA}>
                                ayumi@vetswhocode.io
                            </a>
                        </div>
                        <MonoMeta tone="bright" size="xs" className="tw-mt-4">
                            Vets Who Code Inc. · 501(c)(3) · EIN 86-2122804
                        </MonoMeta>
                    </div>

                    <form
                        onSubmit={submit}
                        className="tw-relative tw-flex tw-flex-col tw-gap-5 tw-bg-white tw-p-6 md:tw-p-10"
                    >
                        {/* Honeypot: off-screen, the API drops any submission that fills it. */}
                        <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="tw-absolute tw-left-[-9999px] tw-h-px tw-w-px tw-opacity-0"
                        />
                        <div className="tw-grid tw-gap-5 sm:tw-grid-cols-2">
                            <div>
                                <label htmlFor="sponsor-name" className={LABEL}>
                                    Name
                                </label>
                                <input
                                    id="sponsor-name"
                                    name="name"
                                    required={true}
                                    className={FIELD}
                                />
                            </div>
                            <div>
                                <label htmlFor="sponsor-company" className={LABEL}>
                                    Company
                                </label>
                                <input
                                    id="sponsor-company"
                                    name="company"
                                    required={true}
                                    className={FIELD}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="sponsor-email" className={LABEL}>
                                Email
                            </label>
                            <input
                                id="sponsor-email"
                                name="email"
                                type="email"
                                required={true}
                                className={FIELD}
                            />
                        </div>
                        <div>
                            <label htmlFor="sponsor-track" className={LABEL}>
                                Track
                            </label>
                            <select
                                id="sponsor-track"
                                value={track}
                                onChange={(e) => setTrack(e.target.value)}
                                className={FIELD}
                            >
                                <option value="">Select one</option>
                                {engagementTracks.map((t) => (
                                    <option key={t.id} value={t.title}>
                                        {t.title}
                                    </option>
                                ))}
                                <option value={OTHER_TRACK}>{OTHER_TRACK}</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sponsor-message" className={LABEL}>
                                Message
                            </label>
                            <textarea
                                id="sponsor-message"
                                name="message"
                                rows={5}
                                required={true}
                                minLength={10}
                                className={FIELD}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitState === "sending"}
                            className={`${PRIMARY_CTA} tw-self-start disabled:tw-opacity-60`}
                        >
                            {submitState === "sending" ? "Sending…" : "Send"}
                        </button>
                        {(submitState === "sent" || submitState === "error") && (
                            <p role="status" className="tw-m-0 tw-font-body tw-text-navy">
                                {submitState === "sent"
                                    ? "Message received. Ayumi will be in touch."
                                    : "That didn't go through. Email ayumi@vetswhocode.io instead."}
                            </p>
                        )}
                    </form>
                </div>
            </section>

            {/* Sources */}
            <section className="tw-bg-cream tw-py-12">
                <div className="tw-container">
                    <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-[0.12em] tw-text-gray-300">
                        Sources
                    </h2>
                    <ol className="tw-mt-4 tw-space-y-2 tw-pl-5 tw-font-body tw-text-sm tw-text-gray-300">
                        {sponsorStats.map((stat, i) => (
                            <li key={stat.label} id={`source-${i + 1}`}>
                                <strong className="tw-text-navy">{stat.value}</strong> —{" "}
                                {stat.source} {stat.sample && <Todo value={stat.sample} />}{" "}
                                <a href={`#source-ref-${i + 1}`} className="tw-text-red">
                                    <span aria-hidden="true">↩</span>
                                    <span className="tw-sr-only">Back to stat</span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </>
    );
};

SponsorPage.Layout = Layout;

export default SponsorPage;
