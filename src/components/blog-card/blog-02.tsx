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
                "blog-card tw-grid tw-relative tw-overflow-hidden tw-transition-all tw-rounded tw-bg-white tw-shadow-xl tw-shadow-black/5 tw-group",
                className
            )}
            ref={ref}
        >
            {image?.src ? (
                <figure className="tw-relative tw-overflow-hidden tw-row-span-full tw-col-span-full after:tw-absolute after:tw-content-[''] after:tw-inset-0 after:tw-bg-darkGradient">
                    <img
                        className="tw-w-full tw-transition-transform tw-duration-1500 tw-h-[680px] tw-object-cover group-hover:tw-scale-110"
                        src={image.src}
                        alt={image?.alt || title}
                        width={image?.width || 500}
                        height={image?.height || 680}
                        loading={image?.loading || "lazy"}
                    />
                    <Anchor path={path} className="link-overlay">
                        {title}
                    </Anchor>
                </figure>
            ) : (
                <div className="tw-bg-dark/40 tw-row-span-full" />
            )}

            <div className="tw-py-6.1 tw-px-7.5 lg:tw-pt-5 lg:tw-pb-[54px] lg:tw-px-[38px] tw-row-span-full tw-col-span-full tw-z-10 tw-flex tw-flex-col tw-justify-end">
                <Anchor
                    path={category.path}
                    className="tw-font-medium tw-block tw-mb-1 -tw-tracking-tightest tw-uppercase tw-text-white hover:tw-text-white"
                >
                    {category.title}
                </Anchor>
                <h3 className="tw-text-xl tw-leading-normal lg:tw-text-[34px] lg:tw-leading-[1.42] tw-text-white tw-mb-0">
                    <Anchor className="hover:tw-text-white" path={path}>
                        {title}
                    </Anchor>
                </h3>
                <ul className="tw-flex tw-gap-7">
                    <li className="tw-text-md tw-mt-3.8 tw-text-white tw-mb-0">
                        <i className="far fa-calendar tw-mr-2.5" />
                        {postedAt}
                    </li>
                    <li className="tw-text-md tw-mt-3.8 tw-text-white">
                        <i className="far fa-eye tw-mr-2.5" />
                        {views} views
                    </li>
                </ul>
            </div>
        </div>
    )
);

export default BlogCard;
