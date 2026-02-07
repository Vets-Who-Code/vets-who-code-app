import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import ContactForm from "@containers/contact-form/layout-02";
import ContactInfo from "@containers/contact-info/layout-02";
import Layout from "@layout/layout-01";
import { normalizedData } from "@utils/methods";
import type { GetStaticProps, NextPage } from "next";
import { getPageData } from "../lib/page";

interface PageContent {
    section: string;
    [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

interface Props {
    data: {
        page: {
            content: PageContent[];
        };
    };
}

const ContactUs: NextPage<Props> & { Layout: typeof Layout } = ({ data }) => {
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

ContactUs.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const page = await getPageData("inner", "contact-us");
    return {
        props: {
            data: {
                page,
            },
        },
    };
};

export default ContactUs;
