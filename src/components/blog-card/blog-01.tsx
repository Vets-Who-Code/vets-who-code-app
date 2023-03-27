import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = Pick<
    IBlog,
    "title" | "path" | "category" | "postedAt" | "image" | "views"
> & {
    className?: string;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ title, path, category, postedAt, image, views, className }, ref) => (
        <div
            className={clsx(
                "blog-card tw-relative tw-overflow-hidden tw-transition-all tw-rounded tw-bg-white tw-shadow-xl tw-shadow-black/5 tw-group",
                className
            )}
            ref={ref}
        >
            {image?.src && (
                <figure className="tw-relative tw-overflow-hidden">
                    <img
                        className="tw-w-full tw-transition-transform tw-duration-1500 group-hover:tw-scale-110 tw-h-60 sm:tw-h-80 xl:tw-h-[200px] tw-object-cover"
                        src={image.src}
                        alt={image?.alt || title}
                        width={image?.width || 270}
                        height={image?.height || 200}
                        loading={image?.loading || "lazy"}
                    />
                    <Anchor path={path} className="link-overlay">
                        {title}
                    </Anchor>
                </figure>
            )}

            <div className="tw-py-[25px] tw-px-[30px]">
                <Anchor
                    path={category.path}
                    className="tw-font-medium tw-block tw-mb-1 -tw-tracking-tightest tw-uppercase tw-text-secondary-light"
                >
                    {category.title}
                </Anchor>
                <h3 className="tw-text-xl tw-mb-0 tw-leading-normal">
                    <Anchor path={path}>{title}</Anchor>
                </h3>
                <ul className="tw-flex tw-gap-7">
                    <li className="tw-text-md tw-mt-3.8">
                        <i className="far fa-calendar tw-mr-2.5" />
                        {postedAt}
                    </li>
                    <li className="tw-text-md tw-mt-3.8">
                        <i className="far fa-eye tw-mr-2.5" />
                        {views} views
                    </li>
                </ul>
            </div>
        </div>
    )
);

export default BlogCard;
