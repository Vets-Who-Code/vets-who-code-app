import SEO from "@components/seo/page-seo";
import { SectionEyebrow, SharpHeadline } from "@components/ui/design-system";
import CtaArea from "@containers/cta/layout-01";
import HeroArea from "@containers/hero/layout-07";
import TimelineArea from "@containers/timeline";
import Layout from "@layout/layout-01";
import AlumniStrip from "@ui/alumni-strip";
import PullQuote from "@ui/pull-quote";
import { normalizedData } from "@utils/methods";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { getPageData } from "../lib/page";

// Base content interface
interface PageContent extends Record<string, unknown> {
    section: string;
    title?: string;
    content?: string;
    metadata?: Record<string, unknown>;
    customFields?: Record<string, unknown>;
    section_title?: {
        title?: string;
        subtitle?: string;
    };
    items?: Array<{
        id: number | string;
        headings?: Array<{ id: number | string; content: string }>;
        texts?: Array<{ id: number | string; content: string }>;
        images?: Array<{ src: string }>;
    }>;
    buttons?: Array<{
        id: number | string;
        content: string;
        path: string;
    }>;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
    };
};

type PageWithLayout = {
    (props: TProps): JSX.Element;
    Layout: typeof Layout;
};

const AboutUs: PageWithLayout = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="About Us | Vets Who Code" />
            <h1 className="tw-sr-only">About Us</h1>
            <HeroArea data={content?.["hero-area"]} />
            <TimelineArea data={content?.["timeline-area"]} />

            {/* Mission pull-quote + alumni proof */}
            <div className="dark-section tw-bg-navy tw-mt-20 md:tw-mt-[120px] tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <PullQuote
                        emphasis="We don't train veterans to fill seats."
                        continuation="We train them to be impactful on their engineering teams at companies that shape the world."
                    />
                    <div className="tw-mt-14 md:tw-mt-20">
                        <AlumniStrip align="center" />
                    </div>
                </div>
            </div>

            {/* Theory of Change — Sharp link block */}
            <section className="tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <div className="tw-mx-auto tw-flex tw-max-w-4xl tw-flex-col tw-gap-6 tw-border-t tw-border-silver tw-pt-16 md:tw-flex-row md:tw-items-end md:tw-justify-between">
                        <div className="tw-flex tw-flex-col tw-gap-4">
                            <SectionEyebrow
                                label="Methodology"
                                subLabel="DOC 03 / THEORY OF CHANGE"
                            />
                            <SharpHeadline as="h2" size="h2" tone="navy">
                                How we turn troops into
                                <br />
                                <span className="tw-text-red">software engineers</span>.
                            </SharpHeadline>
                        </div>
                        <Link
                            href="/theory-of-change"
                            className="tw-inline-flex tw-items-center tw-gap-3 tw-border-2 tw-border-red tw-bg-red tw-px-7 tw-py-4 tw-font-heading tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.08em] tw-text-white tw-transition-colors hover:tw-border-red-crimson hover:tw-bg-red-crimson active:tw-scale-[0.97]"
                        >
                            View Theory of Change
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <CtaArea data={content?.["cta-area"]} space="bottom" />
        </>
    );
};

AboutUs.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "about-us");

    return {
        props: {
            data: {
                page,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AboutUs;
