import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import { VWCGrid } from "@components/vwc-grid";
import { ICourse } from "@utils/types";
import { courseSorting } from "@utils/methods";
import { useSort } from "@hooks";
import { VWCGridCard } from "@components/vwc-card";
import Anchor from "@ui/anchor";
import { getallCourses } from "../../lib/course";

type TProps = {
    data: {
        courses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const Coursegrid01: PageProps = ({ data }) => {
    const { sortedItems } = useSort<ICourse>(data.courses, courseSorting);

    return (
        <>
            <SEO title="Courses" />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Courses" />
            <VWCGrid title="Course Section">
                {sortedItems?.map((course) => (
                    <Anchor path={course.path}>
                        <VWCGridCard title={course.title} thumbnail={course.thumbnail} />
                    </Anchor>
                ))}
            </VWCGrid>
        </>
    );
};

Coursegrid01.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const courses = getallCourses(["slug", "title", "thumbnail"]);
    return {
        props: {
            data: {
                courses,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Coursegrid01;
