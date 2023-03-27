import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-03";
import { BlogMetaType, IBlog } from "@utils/types";
import { getAllBlogs, getTags } from "../../../lib/blog";

type TProps = {
    data: {
        blogs: IBlog[];
        recentPosts: IBlog[];
        tags: BlogMetaType[];
        currentPage: number;
        numberOfPages: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 3;

const BlogClassic: PageProps = ({
    data: { blogs, recentPosts, tags, currentPage, numberOfPages },
}) => {
    return (
        <>
            <SEO title="Blog Classic" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Blog Classic"
            />
            <BlogArea
                data={{
                    blogs,
                    recentPosts,
                    tags,
                    pagiData: {
                        currentPage,
                        numberOfPages,
                        rootPage: "blogs/blog-classic",
                    },
                }}
            />
        </>
    );
};

BlogClassic.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const { blogs, count } = getAllBlogs(
        [
            "title",
            "image",
            "category",
            "postedAt",
            "views",
            "author",
            "excerpt",
        ],
        0,
        POSTS_PER_PAGE
    );
    const { blogs: recentPosts } = getAllBlogs(["title"], 0, 5);
    const tags = getTags();
    return {
        props: {
            data: {
                blogs,
                recentPosts,
                tags,
                currentPage: 1,
                numberOfPages: Math.ceil(count / POSTS_PER_PAGE),
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default BlogClassic;
