import type { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import HeroArea from "@containers/hero/layout-07";
import TimelineArea from "@containers/timeline";
import CtaArea from "@containers/cta/layout-01";
import { normalizedData } from "@utils/methods";
import { getPageData } from "../lib/page";

// Base content interface
interface PageContent extends Record<string, unknown> {
    section: string;
    title?: string;
    content?: string;
    metadata?: Record<string, unknown>;
    customFields?: Record<string, unknown>;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
    };
};

// Create a new type that includes both the component and Layout property
type PageWithLayout = {
    (props: TProps): JSX.Element;
    Layout: typeof Layout;
};

const AboutUs: PageWithLayout = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="About Us" />
            <h1 className="tw-sr-only">About Us</h1>
            <HeroArea data={content?.["hero-area"]} />
            <TimelineArea data={content?.["timeline-area"]} />
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
