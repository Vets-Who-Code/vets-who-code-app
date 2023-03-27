import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-02";
import { unslugify, toCapitalize } from "@utils/methods";
import { BlogMetaType, IBlog } from "@utils/types";
import { getAllBlogs, getPostsByCategory, getTags } from "../../../../lib/blog";

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

const BlogCategoryPage: PageProps = ({
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
            <SEO title={toCapitalize(pageTitle)} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/blogs/blog-grid-sidebar", label: "blog" },
                ]}
                currentPage={pageTitle}
                title={`Category: ${pageTitle}`}
            />
            <BlogArea
                data={{
                    blogs,
                    recentPosts,
                    tags,
                    pagiData: {
                        currentPage,
                        numberOfPages,
                        rootPage: `blogs/category/${slug}`,
                    },
                }}
            />
        </>
    );
};

BlogCategoryPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const { blogs } = getAllBlogs(["category"]);
    return {
        paths: blogs.map(({ category }) => {
            return {
                params: {
                    category: category.slug,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        category: string;
    };
};

export const getStaticProps = ({ params }: Params) => {
    const { posts, count } = getPostsByCategory(
        params.category,
        ["title", "image", "category", "postedAt", "views"],
        0,
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
                pageTitle: unslugify(params.category),
                slug: params.category,
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

export default BlogCategoryPage;
