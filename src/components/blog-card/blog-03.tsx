import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = Pick<IBlog, "image" | "path" | "title" | "category" | "postedAt"> & {
    className?: string;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, image, path, title, category, postedAt }, ref) => {
        return (
            <div className={clsx("blog-card tw:group", className)} ref={ref}>
                <div className="tw:relative tw:h-[250px] tw:overflow-hidden tw:rounded-sm">
                    {image?.src && (
                        <figure className="tw:h-full tw:transition-transform tw:duration-1500 tw:group-hover:scale-110">
                            <img
                                className="tw:h-full tw:w-full tw:object-cover"
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

                <div className="info tw:pt-[26px]">
                    <div className="tw:mb-1.5 tw:text-base tw:font-medium tw:uppercase tw:leading-[1.4] tw:-tracking-tightest">
                        <Anchor path={category.path} className="tw:text-inherit">
                            {category.title}
                        </Anchor>
                    </div>

                    <h3 className="tw:mb-0 tw:leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>

                    <ul className="tw:text-md tw:text-gray-300">
                        <li className="tw:mb-0 tw:mt-3.8">
                            <i className="far fa-calendar tw:mr-2.5" />
                            {postedAt}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
);

export default BlogCard;
