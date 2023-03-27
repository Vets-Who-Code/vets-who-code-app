import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import BlogDetailsArea from "@containers/blog-details";
import BlogAuthor from "@containers/blog-details/blog-author";
import BlogNavLinks from "@containers/blog-details/nav-links";
import DisqusComment from "@components/disqus-comment";
import BlogSidebar from "@containers/blog-details/blog-sidebar";
import { BlogMetaType, IBlog, IInstructor } from "@utils/types";
import { toCapitalize } from "@utils/methods";
import {
    getPostBySlug,
    getAllBlogs,
    getPrevNextPost,
    getTags,
} from "../../lib/blog";

type TProps = {
    data: {
        blog: IBlog;
        author: IInstructor;
        prevAndNextPost: {
            prevPost: IBlog;
            nextPost: IBlog;
        };
        recentPosts: IBlog[];
        tags: BlogMetaType[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const BlogDetails: PageProps = ({
    data: { blog, prevAndNextPost, recentPosts, tags },
}) => {
    return (
        <>
            <SEO
                title={toCapitalize(blog.title)}
                description="This is a mighty good description of this blog."
                jsonLdType="article"
                article={{
                    publishedTime: blog.postedAt,
                    modifiedTime: blog.postedAt,
                    authors: [blog.author.name],
                    tags: tags.map((tag) => tag.title),
                }}
                image={`https://maxcoach-react.pages.dev${blog.image.src}`}
            />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    {
                        path: "/blogs/blog-grid-sidebar",
                        label: "blogs",
                    },
                ]}
                currentPage={blog.title}
                title="Blog"
            />
            <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] tw-grid tw-grid-cols-3 tw-gap-7.5 lg:tw-gap-15">
                <div className="tw-col-span-full lg:tw-col-[1/3]">
                    <BlogDetailsArea {...blog} />
                    <BlogAuthor {...blog.author} />
                    <BlogNavLinks {...prevAndNextPost} />
                    <DisqusComment id={blog.slug} title={blog.title} />
                </div>
                <div className="tw-col-span-full lg:tw-col-[3/-1]">
                    <BlogSidebar recentPosts={recentPosts} tags={tags} />
                </div>
            </div>
        </>
    );
};

BlogDetails.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const { blogs } = getAllBlogs(["slug"]);
    return {
        paths: blogs.map(({ slug }) => {
            return {
                params: {
                    slug,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        slug: string;
    };
};

export const getStaticProps = ({ params }: Params) => {
    const blog = getPostBySlug(params.slug, "all");
    const prevAndNextPost = getPrevNextPost(params.slug, ["title", "image"]);
    const { blogs: recentPosts } = getAllBlogs(["title"], 0, 5);
    const tags = getTags();

    return {
        props: {
            data: {
                blog,
                prevAndNextPost,
                recentPosts,
                tags,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default BlogDetails;
