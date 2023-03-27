import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-01";
import { IBlog } from "@utils/types";
import { getAllBlogs } from "../../../lib/blog";

type TProps = {
    data: {
        blogs: IBlog[];
        currentPage: number;
        numberOfPages: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 9;

const BlogGrid: PageProps = ({
    data: { blogs, currentPage, numberOfPages },
}) => {
    return (
        <>
            <SEO title="Blog Grid" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Blog Grid"
            />
            <BlogArea
                data={{
                    blogs,
                    pagiData: { currentPage, numberOfPages },
                }}
            />
        </>
    );
};

BlogGrid.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const { blogs, count } = getAllBlogs(
        ["title", "image", "category", "postedAt", "views"],
        0,
        POSTS_PER_PAGE
    );

    return {
        props: {
            data: {
                blogs,
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

export default BlogGrid;
