import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseArea from "@containers/course-full/layout-01";
import { ICourse } from "@utils/types";
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
    return (
        <>
            <SEO title="Subjects" />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Subjects" />
            <CourseArea data={{ courses: data.courses }} />
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
