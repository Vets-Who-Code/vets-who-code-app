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
                "blog-card tw:group tw:relative tw:grid tw:overflow-hidden tw:rounded-sm tw:bg-white tw:shadow-xl tw:shadow-black/5 tw:transition-all",
                className
            )}
            ref={ref}
        >
            {image?.src ? (
                <figure className="tw:relative tw:col-span-full tw:row-span-full tw:overflow-hidden tw:after:absolute tw:after:inset-0 tw:after:bg-dark-gradient tw:after:content-['']">
                    <img
                        className="tw:h-[680px] tw:w-full tw:object-cover tw:transition-transform tw:duration-1500 tw:group-hover:scale-110"
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
                <div className="tw:row-span-full tw:bg-dark/40" />
            )}

            <div className="tw:z-10 tw:col-span-full tw:row-span-full tw:flex tw:flex-col tw:justify-end tw:px-7.5 tw:py-6.1 tw:lg:px-[38px] tw:lg:pb-[54px] tw:lg:pt-5">
                <Anchor
                    path={category.path}
                    className="tw:mb-1 tw:block tw:font-medium tw:uppercase tw:-tracking-tightest tw:text-white tw:hover:text-white"
                >
                    {category.title}
                </Anchor>
                <h3 className="tw:mb-0 tw:text-xl tw:leading-normal tw:text-white tw:lg:text-[34px] tw:lg:leading-[1.42]">
                    <Anchor className="tw:hover:text-white" path={path}>
                        {title}
                    </Anchor>
                </h3>
                <ul>
                    <li className="tw:mb-0 tw:mt-3.8 tw:text-md tw:text-white">
                        <i className="far fa-calendar tw:mr-2.5" />
                        {postedAt}
                    </li>
                </ul>
            </div>
        </div>
    )
);

export default BlogCard;
