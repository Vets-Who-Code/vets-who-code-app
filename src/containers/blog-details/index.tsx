import dayjs from "dayjs";
import Anchor from "@ui/anchor";
import AuthorMeta from "@components/blog-meta/author";
import BlogMetaItem from "@components/blog-meta/meta-item";
import SocialShare from "@components/social-share/layout-03";
import TagMeta from "@components/blog-meta/tags";
import MarkdownRenderer from "@components/markdown-renderer";
import { IBlog } from "@utils/types";

const BlogDetails = ({ image, title, category, author, postedAt, content, tags }: IBlog) => {
    return (
        <article className="blog-details tw:mb-10 tw:border-b tw:border-b-gray-500 tw:pb-7.5">
            <div className="entry-header tw:mb-5">
                {image?.src && (
                    <figure className="tw:mb-7">
                        <img
                            className="tw:w-full tw:rounded-sm tw:object-cover"
                            src={image.src}
                            alt={image?.alt || title}
                            width="770"
                        />
                    </figure>
                )}

                <div className="tw:mb-4 tw:font-medium tw:uppercase tw:-tracking-tightest">
                    <Anchor path={category.path}>{category.title}</Anchor>
                </div>

                <h2 className="tw:mb-5">{title}</h2>
                <div className="tw:mt-5 tw:flex tw:flex-wrap tw:items-center tw:text-md tw:text-gray-300">
                    <AuthorMeta author={author} className="tw:pr-5 tw:md:pr-8" />
                    <BlogMetaItem
                        className="tw:pr-5 tw:md:pr-8"
                        text={dayjs(postedAt).format("MMM DD, YYYY")}
                        icon="far fa-calendar"
                    />
                </div>
            </div>
            <MarkdownRenderer className="entry-content tw:mb-[54px]" content={content} />
            <div className="entry-footer tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:sm:justify-between">
                <TagMeta tags={tags} />
                <SocialShare label="Share this post" className="tw:mt-5 tw:sm:mt-0" />
            </div>
        </article>
    );
};

export default BlogDetails;
