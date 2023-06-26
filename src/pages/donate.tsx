import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import Wrapper from "@ui/wrapper/wrapper-02";
import DonateFormArea from "@containers/donate-form/layout-01";
import ServiceArea from "@containers/service/layout-03";

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
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Donate"
                showTitle={false}
            />
            <DonateFormArea data={content?.["donorbox-area"]} space="none" />
            <Wrapper className="tw-py-15">
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
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Donate;
