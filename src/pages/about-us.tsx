import type { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import HeroArea from "@containers/hero/layout-07";
import TimelineArea from "@containers/timeline";
import CtaArea from "@containers/cta/layout-01";
import Link from "next/link";
import { normalizedData } from "@utils/methods";
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

            {/* Theory of Change Link - Enhanced */}
            <div className="tw-container tw-my-16">
                <div className="tw-mx-auto tw-max-w-4xl tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-gradient-to-br tw-from-white tw-to-gray-50 tw-p-8 tw-shadow-xl tw-shadow-primary/5 md:tw-p-12">
                    <div className="tw-text-center">
                        <h2 className="tw-mb-4 tw-text-3xl tw-font-bold tw-text-secondary md:tw-text-4xl">
                            Our Methodology
                        </h2>
                        <p className="tw-mb-8 tw-text-lg tw-text-body md:tw-text-xl">
                            Want to understand how we transform veterans into web developers?
                            <br />
                            Explore our comprehensive Theory of Change.
                        </p>
                        <Link
                            href="/theory-of-change"
                            className="tw-group tw-inline-flex tw-items-center tw-gap-3 tw-rounded-lg tw-bg-primary tw-px-8 tw-py-4 tw-font-bold tw-text-white tw-shadow-lg tw-shadow-primary/25 tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-bg-secondary hover:tw-shadow-xl hover:tw-shadow-primary/35 active:tw-scale-95"
                        >
                            View Our Theory of Change
                            <svg
                                className="tw-h-5 tw-w-5 tw-transition-transform tw-duration-300 group-hover:tw-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

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
