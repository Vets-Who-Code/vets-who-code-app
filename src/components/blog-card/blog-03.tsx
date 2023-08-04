import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = Pick<
    IBlog,
    "image" | "path" | "title" | "category" | "postedAt" | "views"
> & {
    className?: string;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, image, path, title, category, postedAt, views }, ref) => {
        return (
            <div className={clsx("blog-card tw-group", className)} ref={ref}>
                <div className="tw-relative tw-overflow-hidden tw-rounded tw-h-[250px]">
                    {image?.src && (
                        <figure className="tw-transition-transform tw-duration-1500 tw-h-full group-hover:tw-scale-110">
                            <img
                                className="tw-w-full tw-h-full tw-object-cover"
                                src={image.src}
                                alt={image?.alt || "Event"}
                                width={image.width || 480}
                                height={image.height || 250}
                                loading={image.loading || "lazy"}
                            />
                        </figure>
                    )}
                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </div>

                <div className="info tw-pt-[26px]">
                    <div className="tw-text-base tw-font-medium tw-uppercase -tw-tracking-tightest tw-leading-[1.4] tw-mb-1.5">
                        <Anchor
                            path={category.path}
                            className="tw-text-inherit"
                        >
                            {category.title}
                        </Anchor>
                    </div>

                    <h3 className="tw-mb-0 tw-leading-normal">
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
