import SEO from "@components/seo/page-seo";
import CurriculumDomainContainer from "@containers/curriculum-domain";
import Layout from "@layout/layout-01";
import { buildDomainPage, DOMAIN_IDS, type DomainPage, domainJsonLd } from "@lib/curriculum-domain";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

type Props = {
    page: DomainPage;
    jsonLd: ReturnType<typeof domainJsonLd>;
};

type CurriculumDomainPageProps = NextPage<Props> & {
    Layout: typeof Layout;
};

// The graph lib is only referenced from getStaticPaths/getStaticProps, so Next strips it
// from the client bundle and these pages ship the shaped `page` prop, not the dataset.
const CurriculumDomainPage: CurriculumDomainPageProps = ({ page, jsonLd }) => (
    <>
        <SEO title={`${page.title} — Hashflag Curriculum`} description={page.description} />
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </Head>
        <CurriculumDomainContainer page={page} />
    </>
);

CurriculumDomainPage.Layout = Layout;

export const getStaticPaths: GetStaticPaths = () => ({
    paths: DOMAIN_IDS.map((domain) => ({ params: { domain } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps = ({ params }) => {
    const page = buildDomainPage(String(params?.domain));
    if (!page) return { notFound: true };
    return {
        props: {
            page,
            jsonLd: domainJsonLd(page),
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default CurriculumDomainPage;
