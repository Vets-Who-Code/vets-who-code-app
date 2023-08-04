import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-02";
import { BlogMetaType, IBlog } from "@utils/types";
import { unslugify, toCapitalize } from "@utils/methods";
import { getAllBlogs, getPostsByTag, getTags } from "../../../../lib/blog";

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

const BlogTagPage: PageProps = ({
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

BlogTagPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const tags = getTags();
    return {
        paths: tags.map(({ slug }) => {
            return {
                params: {
                    tag: slug,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        tag: string;
    };
};

export const getStaticProps = ({ params }: Params) => {
    const { posts, count } = getPostsByTag(
        params.tag,
        ["title", "image", "tags", "postedAt", "views"],
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
                pageTitle: unslugify(params.tag),
                slug: params.tag,
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

export default BlogTagPage;
