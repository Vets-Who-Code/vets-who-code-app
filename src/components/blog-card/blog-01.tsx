import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";
import clsx from "clsx";
import { forwardRef } from "react";

type TProps = Pick<IBlog, "title" | "path" | "category" | "postedAt" | "image"> & {
    className?: string;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ title, path, category, postedAt, image, className }, ref) => (
        <div
            className={clsx(
                "blog-card card-upgraded tw-group tw-relative tw-overflow-hidden tw-bg-white",
                className
            )}
            ref={ref}
        >
            {image?.src && (
                <figure className="tw-relative tw-overflow-hidden">
                    <img
                        className="tw-h-60 tw-w-full tw-object-cover tw-transition-transform tw-duration-1500 tw-group-hover:tw-scale-110 sm:tw-h-80 xl:tw-h-[200px]"
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
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#495057",
                    }}
                    className="tw-mb-2 tw-block"
                >
                    {category.title}
                </Anchor>
                <h3
                    className="tw-mb-0 tw-leading-normal"
                    style={{
                        fontFamily: "var(--font-headline)",
                        fontWeight: 700,
                        fontSize: "17px",
                        textTransform: "none",
                        letterSpacing: "0",
                    }}
                >
                    <Anchor path={path} className="tw-text-navy hover:tw-text-primary">{title}</Anchor>
                </h3>
                <ul>
                    <li
                        className="tw-mt-3.8"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#495057",
                        }}
                    >
                        <i className="far fa-calendar tw-mr-2.5" />
                        {postedAt}
                    </li>
                </ul>
            </div>
        </div>
    )
);

export default BlogCard;
