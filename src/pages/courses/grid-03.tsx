import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseArea from "@containers/course-full/layout-03";
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

const Coursegrid03: PageProps = ({ data }) => {
    return (
        <>
            <SEO title="Course Grid 03" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Course Grid 03"
            />
            <CourseArea data={{ courses: data.courses }} />
        </>
    );
};

Coursegrid03.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const courses = getallCourses([
        "slug",
        "title",
        "thumbnail",
        "price",
        "currency",
        "total_lectures",
        "total_students",
    ]);
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

export default Coursegrid03;
