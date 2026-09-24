import SEO from "@components/seo/page-seo";
import CareerGuideDetailContainer from "@containers/career-guide-detail";
import { buildGuideMeta } from "@containers/career-guide-detail/derive";
import type { CareerGuideDetail } from "@containers/career-guide-detail/types";
import prerender from "@data/career-guides-prerender.json";
import Layout01 from "@layout/layout-01";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getCareerGuideDetail } from "@/lib/career-guides";

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

// The prerendered set is the Search Console-fed list in career-guides-prerender.json
// (see its refresh steps); every other guide still renders through fallback: "blocking".
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = prerender.guides.map((g) => ({ params: { mos: g.slug } }));
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
