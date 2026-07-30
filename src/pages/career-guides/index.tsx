import SEO from "@components/seo/page-seo";
import CareerGuidesContainer from "@containers/career-guides";
import type { Branch, GuideEntry } from "@containers/career-guides/types";
import Layout01 from "@layout/layout-01";
import { computeBranchCounts, FAMILIES, loadCareerGuides } from "@lib/career-guides";
import type { GetStaticProps, NextPage } from "next";

type TProps = {
    guides: GuideEntry[];
    branchCounts: Record<Branch, number>;
    familiesCount: number;
    certsCount: number;
};

type PageWithLayout = NextPage<TProps> & {
    Layout?: typeof Layout01;
};

const CareerGuidesPage: PageWithLayout = ({ guides, branchCounts, familiesCount, certsCount }) => (
    <>
        <SEO
            title="Career Guides — Military Job Code Translator"
            description="From job code to civilian career. Search 4,201 military career guides across all five branches with civilian salary bands, certifications, and demand signals sourced from Lightcast labor data."
        />
        <CareerGuidesContainer
            guides={guides}
            branchCounts={branchCounts}
            familiesCount={familiesCount}
            certsCount={certsCount}
        />
    </>
);

CareerGuidesPage.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const guides = loadCareerGuides();
    const branchCounts = computeBranchCounts(guides);
    const certsCount = guides.reduce((sum, g) => sum + g.certs.length, 0);

    return {
        props: {
            layout: {
                headerShadow: false,
                headerFluid: false,
                footerMode: "dark",
                bodyClass: "tw-bg-secondary",
            },
            guides,
            branchCounts,
            familiesCount: FAMILIES.length,
            certsCount,
        },
    };
};

export default CareerGuidesPage;
