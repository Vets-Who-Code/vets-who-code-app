import { useState, useEffect, useCallback } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Spinner from "@ui/spinner";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseArea from "@containers/course-full/layout-04";
import { ICourse } from "@utils/types";
import { getallCourses } from "../../lib/course";

type TProps = {
    data: {
        courses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Search: PageProps = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const router = useRouter();
    const { s } = router.query;

    const filterCourses = useCallback(() => {
        if (s) {
            const search = (s as string).toLowerCase();
            const filteredCourses = data.courses?.filter((course) => {
                const { title, category } = course;
                return (
                    title.toLowerCase().includes(search) || category === search
                );
            });
            setCourses(filteredCourses);
        }
    }, [data.courses, s]);

    useEffect(() => {
        filterCourses();
        setLoading(false);
    }, [filterCourses]);

    if (loading) {
        return (
            <div className="tw-w-full tw-h-screen tw-flex tw-justify-center tw-items-center">
                <Spinner />
            </div>
        );
    }
    const title = s ? `Search results for: ${s as string}` : "Search";

    return (
        <>
            <SEO title={title} />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage={title}
            />
            <CourseArea data={{ courses }} />
        </>
    );
};

Search.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const courses = getallCourses([
        "slug",
        "title",
        "category",
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

export default Search;
