import Anchor from "@ui/anchor";
import { BlogMetaType, IBlog } from "@utils/types";
import clsx from "clsx";
import { forwardRef } from "react";

type TProps = Pick<IBlog, "image" | "path" | "title" | "postedAt"> & {
    className?: string;
    category?: BlogMetaType;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, image, path, title, postedAt, category }, ref) => {
        return (
            <div
                className={clsx(
                    "blog tw-group tw-relative tw-h-full tw-rounded tw-bg-white tw-shadow-xl tw-shadow-black/5",
                    className
                )}
                ref={ref}
            >
                <div className="tw-relative tw-h-[240px] tw-overflow-hidden tw-rounded-t sm:tw-h-64 md:tw-h-[225px] lg:tw-h-[185px] xl:tw-h-[250px]">
                    {image?.src && (
                        <div className="tw-h-full tw-transition-transform tw-duration-1500 tw-group-hover:tw-scale-110">
                            <img
                                className="tw-h-full tw-w-full tw-object-cover"
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

                <div className="info tw-px-5 tw-py-[26px]">
                    {category && (
                        <Anchor
                            path={category.path}
                            className="tw-mb-[17px] tw-block tw-font-medium tw-uppercase tw-leading-[1.4] -tw-tracking-tightest tw-text-body"
                        >
                            {category.title}
                        </Anchor>
                    )}
                    <h3 className="tw-mb-0 tw-text-xl tw-leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>

                    <ul className="tw-flex tw-text-md tw-text-gray-300">
                        <li className="tw-mb-0 tw-mt-3.8">
                            <i className="far fa-calendar tw-mr-2.5" />
                            {postedAt}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
);

export default BlogCard;
