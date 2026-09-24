import SEO from "@components/seo/page-seo";
import CareerGuidesContainer from "@containers/career-guides";
import type { Branch, Family, GuideEntry } from "@containers/career-guides/types";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import { computeFamilyStats, FAMILIES, type FamilyStat, paginate } from "@/lib/career-guide-facets";
import { computeBranchCounts, loadCareerGuides } from "@/lib/career-guides";

type TProps = {
    rows: GuideEntry[];
    total: number;
    totalPages: number;
    branchCounts: Record<Branch, number>;
    familyStats: Record<Family, FamilyStat>;
    familiesCount: number;
    certsCount: number;
};

type PageWithLayout = NextPage<TProps> & {
    Layout?: typeof Layout01;
};

// The guide count in the meta description is the same total the page renders,
// so a search preview can never advertise a different number from the one on screen.
// The page ships only its first PAGE_SIZE guides; the rest are at /career-guides/page/N.
const CareerGuidesPage: PageWithLayout = ({
    rows,
    total,
    totalPages,
    branchCounts,
    familyStats,
    familiesCount,
    certsCount,
}) => (
    <>
        <SEO
            title="Career Guides — Military Job Code Translator"
            description={`From job code to civilian career. Browse ${total.toLocaleString()} military career guides across all five branches with civilian salary bands, certifications, and demand signals sourced from Lightcast labor data.`}
        />
        <CareerGuidesContainer
            rows={rows}
            facet={{ kind: "all" }}
            page={1}
            totalPages={totalPages}
            count={total}
            total={total}
            branchCounts={branchCounts}
            familyStats={familyStats}
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
    const { rows, totalPages } = paginate(guides, 1);

    return {
        props: {
            layout: {
                headerShadow: false,
                headerFluid: false,
                footerMode: "dark",
                bodyClass: "tw-bg-secondary",
            },
            rows,
            total: guides.length,
            totalPages,
            branchCounts,
            familyStats: computeFamilyStats(guides),
            familiesCount: FAMILIES.length,
            certsCount,
        },
    };
};

export default CareerGuidesPage;
