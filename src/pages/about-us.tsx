import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import FunfactArea from "@containers/funfact/layout-04";
import FaqArea from "@containers/faq/layout-04";
import TestimonialArea from "@containers/testimonial/layout-05";
import BrandArea from "@containers/brand/layout-02";
import ServiceArea from "@containers/service/layout-08";
import CtaArea from "@containers/cta/layout-02";

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

const AboutUs02: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="About Us 03" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="About Us"
                showTitle={false}
                className="tw-bg-gray-200"
            />
            <FunfactArea
                data={content?.["funfact-area"]}
                space="bottom"
                bg="tw-bg-gray-200"
                titleSize="large"
            />
            <FaqArea
                data={content?.["faq-area"]}
                bg="tw-bg-white-catskill"
                titleSize="large"
            />
            <TestimonialArea
                data={content?.["testimonial-area"]}
                titleSize="large"
                space="top"
            />
            <BrandArea data={content?.["brand-area"]} />
            <ServiceArea
                data={content?.["service-area"]}
                titleSize="large"
                bg="tw-bg-white-catskill"
            />
            <CtaArea data={content?.["cta-area"]} />
        </>
    );
};

AboutUs02.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "about-us-03");
    return {
        props: {
            data: {
                page,
            },
            layout: {
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default AboutUs02;
