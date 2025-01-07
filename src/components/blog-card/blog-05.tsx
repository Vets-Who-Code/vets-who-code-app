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
    "image" | "path" | "title" | "postedAt" | "category" | "author" | "excerpt"
> & {
    className?: string;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, image, path, title, postedAt, category, author, excerpt }, ref) => {
        return (
            <div
                className={clsx(
                    "blog tw-relative tw-h-full tw-border-b tw-border-b-gray-450",
                    className
                )}
                ref={ref}
            >
                <div className="tw-group tw-relative tw-max-h-[300px] tw-overflow-hidden tw-rounded md:tw-max-h-[400px]">
                    {image?.src && (
                        <figure className="tw-h-full tw-transition-transform tw-duration-1500 group-hover:tw-scale-110">
                            <img
                                className="tw-h-full tw-w-full tw-object-cover"
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

                <div className="tw-pb-[50px] tw-pt-8">
                    <Anchor
                        path={category.path}
                        className="tw-mb-[17px] tw-block tw-font-medium tw-uppercase tw-leading-[1.4] -tw-tracking-tightest tw-text-body"
                    >
                        {category.title}
                    </Anchor>
                    <h3 className="tw-mb-0 tw-text-[26px] tw-leading-[1.42] xl:tw-text-[34px]">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>

                    <div className="tw-mt-5 tw-flex tw-flex-wrap tw-items-center tw-text-md tw-text-gray-300">
                        <AuthorMeta author={author} className="tw-pr-5 md:tw-pr-8" />
                        <BlogMetaItem
                            className="tw-pr-5 md:tw-pr-8"
                            text={postedAt}
                            icon="far fa-calendar"
                        />
                    </div>
                    <p className="tw-mt-4" dangerouslySetInnerHTML={{ __html: excerpt }} />
                    <div className="tw-mt-7.5 tw-flex tw-items-center tw-justify-between">
                        <Button path={path}>
                            Read More
                            <span className="tw-sr-only">About this article</span>
                        </Button>
                        <SocialShare label="Share this post" />
                    </div>
                </div>
            </div>
        );
    }
);

export default BlogCard;
