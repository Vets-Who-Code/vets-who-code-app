import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-02";
import { BlogMetaType, IBlog } from "@utils/types";
import { flatDeep, toCapitalize } from "@utils/methods";
import {
    getAllBlogs,
    getPostsByAuthor,
    getTags,
} from "../../../../../lib/blog";
import { getAllAuthors, getAuthorBySlug } from "../../../../../lib/author";

type TProps = {
    data: {
        blogs: IBlog[];
        recentPosts: IBlog[];
        tags: BlogMetaType[];
        pageTitle: string;
        slug: string;
        currentPage: number;
        numberOfPages: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 8;

const BlogAuthorPage: PageProps = ({
    data: {
        blogs,
        recentPosts,
        tags,
        pageTitle,
        slug,
        currentPage,
        numberOfPages,
    },
}) => {
    return (
        <>
            <SEO title={`${toCapitalize(pageTitle)} - Page - ${currentPage}`} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/blogs/blog-grid-sidebar", label: "blog" },
                ]}
                currentPage={pageTitle}
                title={`Author: ${pageTitle}`}
            />
            <BlogArea
                data={{
                    blogs,
                    recentPosts,
                    tags,
                    pagiData: {
                        currentPage,
                        numberOfPages,
                        rootPage: `blogs/author/${slug}`,
                    },
                }}
            />
        </>
    );
};

BlogAuthorPage.Layout = Layout01;

type Param = {
    author: string;
    page: string;
};

export const getStaticPaths: GetStaticPaths = () => {
    const authors = getAllAuthors(["id", "slug"]);
    const params = authors.map(({ id, slug }) => {
        const { count } = getPostsByAuthor(id, ["slug"]);
        const pages = Math.ceil(count / POSTS_PER_PAGE);

        const pagesToGenerate = [...Array(pages).keys()]
            .map((a) => {
                if (a !== 0) return a + 1;
                return null;
            })
            .filter(Boolean);
        return pagesToGenerate.map((page) => {
            return { author: slug, page: String(page) };
        });
    });

    const pages = flatDeep<Param>(params);

    return {
        paths: pages.map(({ author, page }) => {
            return {
                params: {
                    author,
                    page,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: Param;
};

export const getStaticProps = ({ params }: Params) => {
    const author = getAuthorBySlug(params.author, ["id", "name", "slug"]);
    const page = params?.page;
    const currentPage = !page || Number.isNaN(+page) ? 1 : +page;
    const skip = (currentPage - 1) * POSTS_PER_PAGE;
    const { posts, count } = getPostsByAuthor(
        author.id,
        ["title", "image", "category", "postedAt", "views"],
        skip,
        POSTS_PER_PAGE
    );
    const { blogs: recentPosts } = getAllBlogs(["title"], 0, 5);
    const tags = getTags();
    return {
        props: {
            data: {
                blogs: posts,
                recentPosts,
                tags,
                pageTitle: author.name,
                slug: author.slug,
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

export default BlogAuthorPage;
