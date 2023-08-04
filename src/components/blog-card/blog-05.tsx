import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import AuthorMeta from "@components/blog-meta/author";
import BlogMetaItem from "@components/blog-meta/meta-item";
import { IBlog } from "@utils/types";
import Button from "@components/ui/button";
import SocialShare from "@components/social-share/layout-03";

type TProps = Pick<
    IBlog,
    | "image"
    | "path"
    | "title"
    | "postedAt"
    | "views"
    | "category"
    | "author"
    | "excerpt"
> & {
    className?: string;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    (
        {
            className,
            image,
            path,
            title,
            postedAt,
            views,
            category,
            author,
            excerpt,
        },
        ref
    ) => {
        return (
            <div
                className={clsx(
                    "blog tw-h-full tw-relative tw-border-b tw-border-b-gray-450",
                    className
                )}
                ref={ref}
            >
                <div className="tw-relative tw-group tw-overflow-hidden tw-rounded tw-max-h-[300px] md:tw-max-h-[400px]">
                    {image?.src && (
                        <figure className="tw-transition-transform tw-duration-1500 tw-h-full group-hover:tw-scale-110">
                            <img
                                className="tw-w-full tw-h-full tw-object-cover"
                                src={image.src}
                                alt={image?.alt || title}
                                width={image.width || 770}
                                height={image.height || 400}
                                loading={image.loading || "lazy"}
                            />
                        </figure>
                    )}
                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </div>

                <div className="tw-pt-8 tw-pb-[50px]">
                    <Anchor
                        path={category.path}
                        className="tw-block tw-text-body tw-font-medium tw-uppercase -tw-tracking-tightest tw-leading-[1.4] tw-mb-[17px]"
                    >
                        {category.title}
                    </Anchor>
                    <h3 className="tw-mb-0 tw-text-[26px] xl:tw-text-[34px] tw-leading-[1.42]">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>

                    <div className="tw-text-md tw-mt-5 tw-text-gray-300 tw-flex tw-items-center tw-flex-wrap">
                        <AuthorMeta
                            author={author}
                            className="tw-pr-5 md:tw-pr-8"
                        />
                        <BlogMetaItem
                            className="tw-pr-5 md:tw-pr-8"
                            text={postedAt}
                            icon="far fa-calendar"
                        />
                        <BlogMetaItem
                            className="tw-pr-5 md:tw-pr-8"
                            text={`${views} views`}
                            icon="far fa-eye"
                        />
                    </div>
                    <p
                        className="tw-mt-4"
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                    <div className="tw-flex tw-items-center tw-justify-between tw-mt-7.5">
                        <Button path={path}>
                            Read More
                            <span className="tw-sr-only">
                                About this article
                            </span>
                        </Button>
                        <SocialShare label="Share this post" />
                    </div>
                </div>
            </div>
        );
    }
);

export default BlogCard;
