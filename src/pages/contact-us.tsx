import type { NextPage, GetStaticProps } from 'next';
import SEO from '@components/seo/page-seo';
import Layout from '@layout/layout-01';
import Breadcrumb from '@components/breadcrumb';
import ContactInfo from '@containers/contact-info/layout-02';
import ContactForm from '@containers/contact-form/layout-02';
import { normalizedData } from '@utils/methods';
import { getPageData } from '../lib/page';

interface PageContent {
    section: string;
}

interface Props {
    data: {
        page: {
            content: PageContent[];
        };
    };
}

const ContactUs: NextPage<Props> & { Layout: typeof Layout; } = ({ data }) => {
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
