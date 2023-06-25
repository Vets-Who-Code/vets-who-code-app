import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Wrapper from "@ui/wrapper/wrapper-02";
import DonateFormArea from "@containers/donate-form/layout-01";
import ServiceArea from "@containers/service/layout-02";

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

const Donate: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="Donate" />
            <DonateFormArea data={content?.["donorbox-area"]} space="none" />
            <Wrapper className="tw-mb-[140px]">
                <ServiceArea data={content?.["service-area"]} space="top" />
            </Wrapper>
        </>
    );
};

Donate.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "donate");
    return {
        props: {
            data: {
                page,
            },
            layout: {
                footerMode: "light",
            },
        },
    };
};

export default Donate;
