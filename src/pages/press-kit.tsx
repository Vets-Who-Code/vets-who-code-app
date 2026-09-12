import SEO from "@components/seo/page-seo";
import { MonoMeta, SectionEyebrow, SharpHeadline, StatStrip } from "@components/ui/design-system";
import teamMembers from "@data/team-members.json";
import Layout from "@layout/layout-01";
import Button from "@ui/button";
import clsx from "clsx";
import type { NextPage } from "next";

type PageWithLayout = NextPage & {
    Layout: typeof Layout;
};

const logos = [
    {
        name: "Full-color logo",
        useOn: "Use on white or cream backgrounds",
        alt: "Vets Who Code logo: the hashtag flag emblem beside the VetsWhoCode wordmark in navy, with Who in red",
        preview:
            "https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto/v1627489505/VWC_Logo_Horizontal_gsxn3h.png",
        download:
            "https://res.cloudinary.com/vetswhocode/image/upload/fl_attachment:vets-who-code-logo/v1627489505/VWC_Logo_Horizontal_gsxn3h.png",
        cta: "Download full-color PNG",
        swatch: "tw-bg-cream",
    },
    {
        name: "White logo",
        useOn: "Use on navy or other dark backgrounds",
        alt: "Vets Who Code logo in white: the hashtag flag emblem beside the VetsWhoCode wordmark",
        preview:
            "https://res.cloudinary.com/vetswhocode/image/upload/e_colorize:100,co_rgb:FFFFFF,f_auto,q_auto/v1627489505/VWC_Logo_Horizontal_gsxn3h.png",
        download:
            "https://res.cloudinary.com/vetswhocode/image/upload/e_colorize:100,co_rgb:FFFFFF,fl_attachment:vets-who-code-logo-white/v1627489505/VWC_Logo_Horizontal_gsxn3h.png",
        cta: "Download white PNG",
        swatch: "tw-bg-navy",
    },
];

const logoRules = [
    "Do not alter, recolor, stretch, or add effects to the logo. Use the approved files as-is.",
    "Keep clear space around the logo. Do not crowd it with other marks or type.",
    "The flag emblem may stand alone on merchandise and promotional material, but the logotype must still appear in a non-dominant position.",
];

const colors = [
    { name: "Navy", hex: "#091f40", swatch: "tw-bg-navy" },
    { name: "Red", hex: "#c5203e", swatch: "tw-bg-red" },
    { name: "Cream", hex: "#EEEDE9", swatch: "tw-bg-cream" },
    { name: "Ink", hex: "#1A1823", swatch: "tw-bg-ink" },
    { name: "Gold", hex: "#FDB330", swatch: "tw-bg-gold" },
];

const HEADSHOT_PREVIEW =
    "https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto:good,dpr_auto,c_fill,g_face,w_350,h_430/v1683429329/jerome-headshot-bw-3900.jpg";
const HEADSHOT_DOWNLOAD =
    "https://res.cloudinary.com/vetswhocode/image/upload/fl_attachment:jerome-hardaway-headshot/v1683429329/jerome-headshot-bw-3900.jpg";

const founder = teamMembers.find((member) => member.slug === "jerome-hardaway");

const downloadLinkClass =
    "tw-inline-flex tw-items-center tw-gap-3 tw-border-2 tw-border-red tw-bg-red tw-px-6 tw-py-3 tw-font-heading tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.08em] tw-text-white tw-transition-colors hover:tw-border-red-crimson hover:tw-bg-red-crimson active:tw-scale-[0.97]";

const PressKitPage: PageWithLayout = () => {
    return (
        <>
            <SEO
                title="Press Kit"
                description="Logos, founder photo and bio, boilerplate, and brand colors for covering Vets Who Code."
            />

            {/* Hero */}
            <section className="dark-section tw-relative tw-overflow-hidden tw-bg-navy tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <SectionEyebrow
                        label="Press Kit"
                        subLabel="MEDIA & SPONSOR ASSETS"
                        tone="dark"
                    />
                    <SharpHeadline as="h1" size="h1" tone="white" className="tw-mt-6">
                        Tell the story.
                        <br />
                        <span className="tw-text-red">Use the right assets.</span>
                    </SharpHeadline>
                    <p className="tw-mt-10 tw-max-w-[640px] tw-font-body tw-text-gray-50 tw-leading-[1.5] [font-size:clamp(18px,1.6vw,22px)]">
                        Everything a newsroom or sponsor needs to cover Vets Who Code: approved
                        logos, the founder&apos;s photo and bio, boilerplate copy, brand colors, and
                        a press contact.
                    </p>
                </div>
            </section>

            {/* Boilerplate */}
            <section className="tw-bg-cream tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow label="Boilerplate" subLabel="COPY AND PASTE" />
                        <SharpHeadline as="h2" size="h2" tone="navy">
                            About <span className="tw-text-red">Vets Who Code</span>
                        </SharpHeadline>
                    </div>
                    <p className="tw-mt-10 tw-max-w-[760px] tw-font-body tw-text-[18px] tw-text-ink tw-leading-[1.7]">
                        Vets Who Code is a non-profit organization that provides free technical
                        training to veterans and their spouses. Founded in 2014 by veterans who
                        faced the realities of transitioning themselves, it is a streamlined, highly
                        selective software engineering accelerator that moves military veterans and
                        military spouses into open roles in the tech sector. The program is 100%
                        remote and free to every troop who is accepted, and it chooses quality over
                        quantity and tangible results over lofty ideals. Vets Who Code Inc. is a
                        501(c)(3) nonprofit, EIN 86-2122804.
                    </p>
                    <figure className="tw-mx-0 tw-mt-14 tw-max-w-[900px] tw-border-l-2 tw-border-red tw-pl-8">
                        <blockquote className="tw-m-0 tw-font-heading tw-font-bold tw-text-navy [font-size:clamp(24px,2.6vw,36px)] [line-height:1.2]">
                            We don&apos;t train veterans to fill seats. We train them to be
                            impactful on their engineering teams at companies that shape the world.
                        </blockquote>
                        <figcaption className="tw-mt-6">
                            <MonoMeta tone="muted" size="md">
                                Mission statement
                            </MonoMeta>
                        </figcaption>
                    </figure>
                    <div className="tw-mt-14">
                        <StatStrip
                            tone="light"
                            cells={[
                                { label: "Placement", value: "97%", sub: "of graduating troops" },
                                {
                                    label: "Alumni earnings",
                                    value: "$20M+",
                                    sub: "collective annual",
                                },
                                { label: "Tax status", value: "501(c)(3)", sub: "EIN 86-2122804" },
                                { label: "Founded", value: "2014", sub: "remote-first" },
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Logos */}
            <section className="tw-bg-white tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow label="Logos" subLabel="02 FILES" />
                        <SharpHeadline as="h2" size="h2" tone="navy">
                            Download
                            <br />
                            <span className="tw-text-red">the logo.</span>
                        </SharpHeadline>
                    </div>
                    <div className="tw-mt-14 tw-grid tw-gap-8 md:tw-grid-cols-2">
                        {logos.map((logo) => (
                            <article
                                key={logo.name}
                                className="tw-flex tw-flex-col tw-border tw-border-gray-100"
                            >
                                <div
                                    className={clsx(
                                        "tw-flex tw-h-56 tw-items-center tw-justify-center tw-p-10",
                                        logo.swatch
                                    )}
                                >
                                    <img
                                        src={logo.preview}
                                        alt={logo.alt}
                                        className="tw-max-h-full tw-w-auto tw-max-w-full"
                                    />
                                </div>
                                <div className="tw-flex tw-flex-1 tw-flex-col tw-gap-4 tw-p-8">
                                    <h3 className="tw-m-0 tw-font-heading tw-text-[22px] tw-font-bold tw-uppercase tw-text-navy [letter-spacing:-0.01em] [line-height:1.2]">
                                        {logo.name}
                                    </h3>
                                    <MonoMeta tone="muted" size="md">
                                        {logo.useOn}
                                    </MonoMeta>
                                    <a
                                        href={logo.download}
                                        className={clsx(
                                            "tw-mt-auto tw-self-start",
                                            downloadLinkClass
                                        )}
                                    >
                                        {logo.cta}
                                        <span aria-hidden="true">↓</span>
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="tw-mt-14 tw-max-w-[760px]">
                        <h3 className="tw-m-0 tw-font-heading tw-text-[22px] tw-font-bold tw-uppercase tw-text-navy [letter-spacing:-0.01em] [line-height:1.2]">
                            Logo rules
                        </h3>
                        <ul className="tw-mt-4 tw-list-disc tw-space-y-2 tw-pl-5 tw-font-body tw-text-ink tw-leading-[1.6]">
                            {logoRules.map((rule) => (
                                <li key={rule}>{rule}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Brand colors */}
            <section className="tw-bg-cream tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <SectionEyebrow label="Brand Colors" subLabel="05 SWATCHES" />
                        <SharpHeadline as="h2" size="h2" tone="navy">
                            Use the
                            <br />
                            <span className="tw-text-red">approved palette.</span>
                        </SharpHeadline>
                    </div>
                    <ul className="tw-mt-14 tw-grid tw-list-none tw-grid-cols-2 tw-gap-6 tw-p-0 md:tw-grid-cols-5">
                        {colors.map((color) => (
                            <li
                                key={color.hex}
                                className="tw-border tw-border-gray-100 tw-bg-white"
                            >
                                <span
                                    aria-hidden="true"
                                    className={clsx("tw-block tw-h-24", color.swatch)}
                                />
                                <div className="tw-flex tw-flex-col tw-gap-1 tw-p-4">
                                    <span className="tw-font-heading tw-text-[14px] tw-font-bold tw-uppercase tw-text-navy">
                                        {color.name}
                                    </span>
                                    <MonoMeta tone="muted" size="md">
                                        {color.hex}
                                    </MonoMeta>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="tw-mt-10 tw-max-w-[760px] tw-font-body tw-text-ink tw-leading-[1.6]">
                        <strong>Typography:</strong> Gotham. Bold for headlines, Book for body copy.
                    </p>
                </div>
            </section>

            {/* Founder */}
            <section className="tw-bg-white tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-grid tw-gap-12 md:tw-grid-cols-[350px_1fr] md:tw-gap-16">
                        <div className="tw-flex tw-flex-col tw-gap-4">
                            <SectionEyebrow label="Founder" subLabel="PHOTO AND BIO" />
                            <SharpHeadline as="h2" size="h2" tone="navy">
                                Jerome
                                <br />
                                <span className="tw-text-red">Hardaway.</span>
                            </SharpHeadline>
                            <MonoMeta tone="accent" size="md">
                                {founder?.designation}
                            </MonoMeta>
                            <p className="tw-mt-4 tw-font-heading tw-text-[20px] tw-font-bold tw-text-navy [line-height:1.35]">
                                Jerome Hardaway is an Air Force veteran, a self-taught software
                                engineer, and the founder and Executive Director of Vets Who Code.
                            </p>
                            {founder ? (
                                <p className="tw-font-body tw-text-ink tw-leading-[1.7]">
                                    {founder.bio}
                                </p>
                            ) : null}
                        </div>
                        <div className="tw-order-first">
                            <img
                                src={HEADSHOT_PREVIEW}
                                alt="Jerome Hardaway, founder of Vets Who Code, smiling in a black-and-white portrait wearing a leather jacket over a hoodie and a #VetsWhoCode flag tee"
                                width={350}
                                height={430}
                                className="tw-h-auto tw-w-full tw-bg-navy"
                            />
                            <a
                                href={HEADSHOT_DOWNLOAD}
                                className={clsx("tw-mt-6", downloadLinkClass)}
                            >
                                Download high-res JPEG
                                <span aria-hidden="true">↓</span>
                            </a>
                            <MonoMeta as="p" tone="muted" size="xs" className="tw-mt-3">
                                3900 px JPEG · about 1.9 MB
                            </MonoMeta>
                        </div>
                    </div>
                </div>
            </section>

            {/* Press contact */}
            <section className="dark-section tw-bg-navy tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-mx-auto tw-flex tw-max-w-3xl tw-flex-col tw-items-center tw-gap-6 tw-text-center">
                        <SectionEyebrow
                            label="Press Contact"
                            subLabel="INTERVIEWS AND QUOTES"
                            tone="dark"
                            align="center"
                        />
                        <SharpHeadline as="h2" size="h2" tone="white" align="center">
                            Need more?
                            <br />
                            <span className="tw-text-red">Ask.</span>
                        </SharpHeadline>
                        <p className="tw-font-body tw-text-gray-50 tw-leading-[1.65] [font-size:clamp(16px,1.2vw,18px)]">
                            For interviews, quotes, or assets not listed here, send a note through
                            the contact form and choose the Press option. Past interviews, podcasts,
                            and articles are collected on the media page.
                        </p>
                        <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-4">
                            <Button path="/contact-us">Contact</Button>
                            <Button path="/media" variant="outlined" color="light">
                                See coverage
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

PressKitPage.Layout = Layout;

export default PressKitPage;
