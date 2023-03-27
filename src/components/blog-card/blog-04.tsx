import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { BlogMetaType, IBlog } from "@utils/types";

type TProps = Pick<IBlog, "image" | "path" | "title" | "postedAt" | "views"> & {
    className?: string;
    category?: BlogMetaType;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, image, path, title, postedAt, views, category }, ref) => {
        return (
            <div
                className={clsx(
                    "blog tw-h-full tw-relative tw-bg-white tw-group tw-rounded tw-shadow-xl tw-shadow-black/5",
                    className
                )}
                ref={ref}
            >
                <div className="tw-relative tw-overflow-hidden tw-rounded-t tw-h-[240px] sm:tw-h-64 md:tw-h-[225px] lg:tw-h-[185px] xl:tw-h-[250px]">
                    {image?.src && (
                        <div className="tw-transition-transform tw-duration-1500 tw-h-full group-hover:tw-scale-110">
                            <img
                                className="tw-w-full tw-h-full tw-object-cover"
                                src={image.src}
                                alt={image?.alt || title}
                                width={image.width || 370}
                                height={image.height || 250}
                                loading={image.loading || "lazy"}
                            />
                        </div>
                    )}
                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </div>

                <div className="info tw-py-[26px] tw-px-5">
                    {category && (
                        <Anchor
                            path={category.path}
                            className="tw-block tw-text-body tw-font-medium tw-uppercase -tw-tracking-tightest tw-leading-[1.4] tw-mb-[17px]"
                        >
                            {category.title}
                        </Anchor>
                    )}
                    <h3 className="tw-mb-0 tw-text-xl tw-leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>

                    <ul className="tw-flex tw-gap-7 tw-text-gray-300 tw-text-md">
                        <li className="tw-mt-3.8 tw-mb-0">
                            <i className="far fa-calendar tw-mr-2.5" />
                            {postedAt}
                        </li>
                        <li className="tw-mt-3.8">
                            <i className="far fa-eye tw-mr-2.5" />
                            {views} views
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
);

export default BlogCard;
