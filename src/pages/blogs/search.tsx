import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import BlogArea from "@containers/blog-full/layout-05";
import Layout01 from "@layout/layout-01";
import Spinner from "@ui/spinner";
import { IBlog } from "@utils/types";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getAllBlogs } from "../../lib/blog";

type TProps = {
    data: {
        blogs: IBlog[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const BlogSearch: PageProps = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const router = useRouter();
    const { s } = router.query;

    const filterCourses = useCallback(() => {
        if (s) {
            const search = (s as string).toLowerCase();
            const filteredCourses = data.blogs?.filter((blog) => {
                const { title, category, content } = blog;
                return (
                    title.toLowerCase().includes(search) ||
                    category.title === search ||
                    content.toLowerCase().includes(search)
                );
            });
            setBlogs(filteredCourses);
        }
    }, [data.blogs, s]);

    useEffect(() => {
        filterCourses();
        setLoading(false);
    }, [filterCourses]);

    if (loading) {
        return (
            <div className="tw-flex tw-h-screen tw-w-full tw-items-center tw-justify-center">
                <Spinner />
            </div>
        );
    }
    const title = s ? `Search results for: ${s as string}` : "Search";
    return (
        <>
            <SEO title={title} />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage={title} />
            <BlogArea
                data={{
                    blogs,
                }}
            />
        </>
    );
};

BlogSearch.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const { blogs } = getAllBlogs(["title", "image", "category", "postedAt", "content"]);

    return {
        props: {
            data: {
                blogs,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default BlogSearch;
