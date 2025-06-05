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

            {/* Theory of Change Link */}
            <div className="tw-container tw-my-10 tw-text-center">
                <p className="tw-mb-4 tw-text-lg">Want to understand our methodology in depth?</p>
                <Link
                    href="/theory-of-change"
                    className="tw-inline-block tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-secondary"
                >
                    View Our Theory of Change
                </Link>
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
