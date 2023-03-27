import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import ContactInfo from "@containers/contact-info/layout-02";
import ContactForm from "@containers/contact-form/layout-02";

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

const ContactMe: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");

    return (
        <>
            <SEO title="Contact Us" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Contact Us"
                showTitle={false}
            />
            <ContactInfo data={content?.["contact-info"]} />
            <ContactForm data={content?.["contact-form"]} />
        </>
    );
};

ContactMe.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "contact-us");
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

export default ContactMe;
