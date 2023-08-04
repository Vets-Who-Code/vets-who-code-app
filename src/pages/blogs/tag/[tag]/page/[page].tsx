import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-02";
import { BlogMetaType, IBlog } from "@utils/types";
import { flatDeep, unslugify, toCapitalize } from "@utils/methods";
import { getAllBlogs, getPostsByTag, getTags } from "../../../../../lib/blog";

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
            <SEO title={`${toCapitalize(pageTitle)} - Page - ${currentPage}`} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/blogs/blog-grid-sidebar", label: "blog" },
                ]}
                currentPage={pageTitle}
                title={`Tag: ${pageTitle}`}
            />
            <BlogArea
                data={{
                    blogs,
                    recentPosts,
                    tags,
                    pagiData: {
                        currentPage,
                        numberOfPages,
                        rootPage: `blogs/tag/${slug}`,
                    },
                }}
            />
        </>
    );
};

BlogCategoryPage.Layout = Layout01;

type Param = {
    tag: string;
    page: string;
};

export const getStaticPaths: GetStaticPaths = () => {
    const tags = getTags();
    const params = tags.map(({ slug }) => {
        const { count } = getPostsByTag(slug, ["slug"]);
        const pages = Math.ceil(count / POSTS_PER_PAGE);
        const pagesToGenerate = [...Array(pages).keys()]
            .map((a) => {
                if (a !== 0) return a + 1;
                return null;
            })
            .filter(Boolean);
        return pagesToGenerate.map((page) => {
            return { tag: slug, page: String(page) };
        });
    });

    const pages = flatDeep<Param>(params);

    return {
        paths: pages.map(({ tag, page }) => {
            return {
                params: {
                    tag,
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
    const page = params?.page;
    const currentPage = !page || Number.isNaN(+page) ? 1 : +page;
    const skip = (currentPage - 1) * POSTS_PER_PAGE;
    const { posts, count } = getPostsByTag(
        params.tag,
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
                pageTitle: unslugify(params.tag),
                slug: params.tag,
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

export default BlogCategoryPage;
