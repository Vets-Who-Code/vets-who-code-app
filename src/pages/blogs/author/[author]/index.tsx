import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogArea from "@containers/blog-full/layout-02";
import { toCapitalize } from "@utils/methods";
import { BlogMetaType, IBlog } from "@utils/types";
import { getAllBlogs, getPostsByAuthor, getTags } from "lib/blog";
import { getAllAuthors, getAuthorBySlug } from "../../../../lib/author";

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
            <SEO title={toCapitalize(pageTitle)} />
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

export const getStaticPaths: GetStaticPaths = () => {
    const authors = getAllAuthors(["slug"]);
    return {
        paths: authors.map(({ slug }) => {
            return {
                params: {
                    author: slug,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        author: string;
    };
};

export const getStaticProps = ({ params }: Params) => {
    const author = getAuthorBySlug(params.author, ["id", "name", "slug"]);
    const { posts, count } = getPostsByAuthor(
        author.id,
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
                pageTitle: author.name,
                slug: author.slug,
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

export default BlogAuthorPage;
