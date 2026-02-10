import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import BlogArea from "@containers/blog-full/layout-01";
import Layout01 from "@layout/layout-01";
import { IBlog } from "@utils/types";
import type { GetServerSideProps, NextPage } from "next";
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

const BlogGrid: PageProps = ({ data: { blogs, currentPage, numberOfPages } }) => {
    const pageTitle = currentPage === 1 ? "Blog" : `Blog - Page ${currentPage}`;

    return (
        <>
            <SEO title={pageTitle} />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Vets Who Code Blog" />
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const page = query.page;
    const currentPage = !page || Number.isNaN(+page) ? 1 : +page;
    const skip = (currentPage - 1) * POSTS_PER_PAGE;

    const { blogs, count } = getAllBlogs(
        ["title", "slug", "image", "category", "postedAt"],
        skip,
        POSTS_PER_PAGE
    );

    return {
        props: {
            data: {
                blogs,
                currentPage,
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
