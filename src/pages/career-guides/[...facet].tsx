import SEO from "@components/seo/page-seo";
import CareerGuidesContainer from "@containers/career-guides";
import Layout01 from "@layout/layout-01";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ComponentProps } from "react";
import {
    ALL_FACETS,
    computeFamilyStats,
    FAMILIES,
    facetHref,
    facetRows,
    facetSeo,
    paginate,
    parseFacetSegments,
} from "@/lib/career-guide-facets";
import { computeBranchCounts, loadCareerGuides } from "@/lib/career-guides";

type TProps = ComponentProps<typeof CareerGuidesContainer>;

type PageWithLayout = NextPage<TProps> & {
    Layout?: typeof Layout01;
};

// Every listing page except the index: /career-guides/page/N, /career-guides/branch/{slug}
// and /career-guides/family/{slug}, each with its own /page/N. Each ships PAGE_SIZE guides,
// so every guide is reachable through plain links and no page carries the whole index.
const CareerGuidesFacetPage: PageWithLayout = (props) => (
    <>
        <SEO {...facetSeo(props.facet, props.page, props.count, props.totalPages)} />
        <CareerGuidesContainer {...props} />
    </>
);

CareerGuidesFacetPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const guides = loadCareerGuides();
    const paths = ALL_FACETS.flatMap((facet) => {
        const { totalPages } = paginate(facetRows(guides, facet), 1);
        return Array.from({ length: totalPages }, (_, i) => facetHref(facet, i + 1))
            .filter((href) => href !== "/career-guides") // the index route
            .map((href) => ({ params: { facet: href.split("/").slice(2) } }));
    });
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
    const segments = params?.facet;
    const parsed = parseFacetSegments(Array.isArray(segments) ? segments : []);
    if (!parsed) return { notFound: true };

    const guides = loadCareerGuides();
    const matching = facetRows(guides, parsed.facet);
    const { rows, totalPages } = paginate(matching, parsed.page);
    if (rows.length === 0) return { notFound: true };

    return {
        props: {
            layout: {
                headerShadow: false,
                headerFluid: false,
                footerMode: "dark",
                bodyClass: "tw-bg-secondary",
            },
            rows,
            facet: parsed.facet,
            page: parsed.page,
            totalPages,
            count: matching.length,
            total: guides.length,
            branchCounts: computeBranchCounts(guides),
            familyStats: computeFamilyStats(guides),
            familiesCount: FAMILIES.length,
            certsCount: guides.reduce((sum, g) => sum + g.certs.length, 0),
        },
    };
};

export default CareerGuidesFacetPage;
