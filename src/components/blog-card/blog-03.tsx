import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";
import clsx from "clsx";
import { forwardRef } from "react";

type TProps = Pick<IBlog, "image" | "path" | "title" | "category" | "postedAt"> & {
    className?: string;
};

const BlogCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, image, path, title, category, postedAt }, ref) => {
        return (
            <div
                className={clsx(
                    "blog-card card-upgraded tw-group tw-bg-white tw-p-5",
                    className
                )}
                ref={ref}
            >
                <div className="tw-relative tw-h-[250px] tw-overflow-hidden">
                    {image?.src && (
                        <figure className="tw-h-full tw-transition-transform tw-duration-1500 tw-group-hover:tw-scale-110">
                            <img
                                className="tw-h-full tw-w-full tw-object-cover"
                                src={image.src}
                                alt={image?.alt || "Blog"}
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
                    <div
                        className="tw-mb-2"
                        style={{
                            fontFamily: "var(--font-mono, HashFlag, sans-serif)",
                            fontSize: "9px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#6C757D",
                        }}
                    >
                        <Anchor path={category.path} className="tw-text-inherit">
                            {category.title}
                        </Anchor>
                    </div>

                    <h3
                        className="tw-mb-0 tw-leading-normal"
                        style={{
                            fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                            fontWeight: 700,
                            fontSize: "17px",
                            textTransform: "none",
                            letterSpacing: "0",
                            color: "#091f40",
                        }}
                    >
                        <Anchor path={path} className="tw-text-navy hover:tw-text-primary">{title}</Anchor>
                    </h3>

                    <ul>
                        <li
                            className="tw-mb-0 tw-mt-3.8"
                            style={{
                                fontFamily: "var(--font-mono, HashFlag, sans-serif)",
                                fontSize: "10px",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "#6C757D",
                            }}
                        >
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
