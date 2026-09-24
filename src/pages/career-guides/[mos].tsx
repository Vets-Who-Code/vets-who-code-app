import SEO from "@components/seo/page-seo";
import CareerGuideDetailContainer from "@containers/career-guide-detail";
import { buildGuideMeta } from "@containers/career-guide-detail/derive";
import type { CareerGuideDetail } from "@containers/career-guide-detail/types";
import prerender from "@data/career-guides-prerender.json";
import Layout01 from "@layout/layout-01";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { buildCareerGuideJsonLd } from "@/lib/career-guide-jsonld";
import { getCareerGuideDetail } from "@/lib/career-guides";

interface MosPageProps {
    detail: CareerGuideDetail;
    jsonLd: ReturnType<typeof buildCareerGuideJsonLd>;
}

type PageWithLayout = NextPage<MosPageProps> & {
    Layout?: typeof Layout01;
};

const MosPage: PageWithLayout = ({ detail, jsonLd }) => {
    const { title: pageTitle, description: pageDescription } = buildGuideMeta(detail);

    return (
        <>
            <SEO title={pageTitle} description={pageDescription} />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                    }}
                />
            </Head>
            <CareerGuideDetailContainer detail={detail} />
        </>
    );
};

MosPage.Layout = Layout01;

// The prerendered set is the list in career-guides-prerender.json (Search Console-fed once its
// refresh steps are run); every other guide still renders through fallback: "blocking".
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = prerender.guides.map((g) => ({ params: { mos: g.slug } }));
    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = String(params?.mos).toLowerCase();
    const detail = getCareerGuideDetail(slug);
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
            jsonLd: buildCareerGuideJsonLd(detail, slug),
        },
    };
};

export default MosPage;
