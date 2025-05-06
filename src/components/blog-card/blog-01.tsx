import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = Pick<IBlog, "title" | "path" | "category" | "postedAt" | "image"> & {
    className?: string;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ title, path, category, postedAt, image, className }, ref) => (
        <div
            className={clsx(
                "blog-card tw-group tw-relative tw-overflow-hidden tw-rounded tw-bg-white tw-shadow-xl tw-shadow-black/5 tw-transition-all",
                className
            )}
            ref={ref}
        >
            {image?.src && (
                <figure className="tw-relative tw-overflow-hidden">
                    <img
                        className="tw-h-60 tw-w-full tw-object-cover tw-transition-transform tw-duration-1500 group-hover:tw-scale-110 sm:tw-h-80 xl:tw-h-[200px]"
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

            <div className="tw-px-[30px] tw-py-[25px]">
                <Anchor
                    path={category.path}
                    className="tw-mb-1 tw-block tw-font-medium tw-uppercase -tw-tracking-tightest tw-text-secondary-light"
                >
                    {category.title}
                </Anchor>
                <h3 className="tw-mb-0 tw-text-xl tw-leading-normal">
                    <Anchor path={path}>{title}</Anchor>
                </h3>
                <ul>
                    <li className="tw-mt-3.8 tw-text-md">
                        <i className="far fa-calendar tw-mr-2.5" />
                        {postedAt}
                    </li>
                </ul>
            </div>
        </div>
    )
);

export default BlogCard;
