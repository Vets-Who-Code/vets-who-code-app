import SEO from "@components/seo/page-seo";
import CareerGuideDetailContainer from "@containers/career-guide-detail";
import { buildGuideMeta } from "@containers/career-guide-detail/derive";
import type { CareerGuideDetail } from "@containers/career-guide-detail/types";
import Layout01 from "@layout/layout-01";
import { getCareerGuideDetail } from "@lib/career-guides";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

const SEO_MOS_CODES = [
    "11B",
    "25B",
    "35F",
    "68W",
    "31B",
    "42A",
    "92Y",
    "88M",
    "91B",
    "3P0X1",
    "HM",
    "CTN",
    "0311",
    "2651",
] as const;

interface MosPageProps {
    detail: CareerGuideDetail;
}

type PageWithLayout = NextPage<MosPageProps> & {
    Layout?: typeof Layout01;
};

const MosPage: PageWithLayout = ({ detail }) => {
    const { title: pageTitle, description: pageDescription } = buildGuideMeta(detail);

    return (
        <>
            <SEO title={pageTitle} description={pageDescription} />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            name: pageTitle,
                            description: pageDescription,
                            url: `https://vetswhocode.io/career-guides/${detail.code.toLowerCase()}`,
                            isPartOf: {
                                "@type": "WebSite",
                                name: "Military Career Guides",
                                url: "https://vetswhocode.io/career-guides",
                            },
                            creator: {
                                "@type": "Organization",
                                name: "Vets Who Code",
                                url: "https://vetswhocode.io",
                            },
                        }),
                    }}
                />
            </Head>
            <CareerGuideDetailContainer detail={detail} />
        </>
    );
};

MosPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = SEO_MOS_CODES.map((mos) => ({
        params: { mos: mos.toLowerCase() },
    }));
    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const detail = getCareerGuideDetail(String(params?.mos));
    if (!detail) return { notFound: true };

    return {
        props: {
            layout: {
                headerShadow: false,
                headerFluid: false,
                footerMode: "dark",
                bodyClass: "tw-bg-secondary",
            },
            detail,
        },
    };
};

export default MosPage;
