import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import HeroArea from "@containers/hero/layout-07";
import TimelineArea from "@containers/timeline";
import CtaArea from "@containers/cta/layout-01";
import { normalizedData } from "@utils/methods";
import { getPageData } from "../lib/page";

interface PageContent {
    section: string;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const AboutUs: PageProps = ({ data }) => {
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
