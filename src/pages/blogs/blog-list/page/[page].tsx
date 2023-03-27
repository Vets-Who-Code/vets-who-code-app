import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-04";
import { IBlog } from "@utils/types";
import { getAllBlogs } from "../../../../lib/blog";

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

const POSTS_PER_PAGE = 4;

const BlogGrid: PageProps = ({
    data: { blogs, currentPage, numberOfPages },
}) => {
    return (
        <>
            <SEO title={`Blog List - Page - ${currentPage}`} />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Blog List"
            />
            <BlogArea
                data={{
                    blogs,
                    pagiData: {
                        currentPage,
                        numberOfPages,
                        rootPage: "blogs/blog-list",
                    },
                }}
            />
        </>
    );
};

BlogGrid.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const { count } = getAllBlogs([]);
    const pages = Math.ceil(count / POSTS_PER_PAGE);

    const pagesToGenerate = [...Array(pages).keys()]
        .map((a) => {
            if (a !== 0) return a + 1;
            return null;
        })
        .filter(Boolean);

    const paths = pagesToGenerate.map((page) => {
        return { params: { page: String(page) } }; // cast page to string
    });

    return {
        paths,
        fallback: false,
    };
};

interface Params extends ParsedUrlQuery {
    page: string;
}

export const getStaticProps: GetStaticProps<TProps, Params> = ({ params }) => {
    const page = params?.page;
    const currentPage = !page || Number.isNaN(+page) ? 1 : +page;
    const skip = (currentPage - 1) * POSTS_PER_PAGE;
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
