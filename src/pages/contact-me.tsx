import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import ContactForm from "@containers/contact-form/layout-01";
import ContactInfo from "@containers/contact-info/layout-01";
import Layout from "@layout/layout-01";
import { normalizedData } from "@utils/methods";
import type { NextPage } from "next";
import { GetStaticProps } from "next";

import { getPageData } from "../lib/page";

interface PageContent {
    section: string;
    [key: string]: unknown; // Add index signature to allow string indexing
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
            <SEO title="Contact Me" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Contact Me"
                showTitle={false}
            />
            <ContactInfo data={content?.["contact-info"]} />
            <ContactForm data={content?.["contact-form"]} />
        </>
    );
};

ContactMe.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "contact-me");
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
