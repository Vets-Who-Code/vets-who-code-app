import { forwardRef } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

interface TProps
    extends Pick<
        ICourse,
        | "thumbnail"
        | "title"
        | "path"
        | "currency"
        | "price"
        | "published_at"
        | "excerpt"
    > {
    className?: string;
}

const CourseCard = forwardRef<HTMLDivElement, TProps>(
    (
        {
            className,
            thumbnail,
            title,
            path,
            price,
            currency,
            published_at,
            excerpt,
        },
        ref
    ) => {
        const priceConv = price === 0 ? "free" : `${currency}${price}`;
        return (
            <div
                className={clsx(
                    "tw-overflow-hidden tw-transition-all tw-bg-gray-100 tw-rounded tw-h-full group hover:tw-bg-white hover:tw-shadow-4xl hover:tw-shadow-black/[0.12]",
                    className
                )}
                ref={ref}
            >
                <figure className="tw-relative tw-overflow-hidden">
                    {thumbnail?.src && (
                        <img
                            src={thumbnail.src}
                            alt={thumbnail?.alt || title}
                            width={thumbnail?.width || 370}
                            height={thumbnail?.height || 229}
                            loading={thumbnail?.loading || "lazy"}
                            className="tw-w-full tw-transition-transform tw-duration-1000 tw-ease-out group-hover:tw-scale-110"
                        />
                    )}

                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </figure>
                <div className="tw-relative tw-px-7.5 tw-pt-7.5 tw-pb-10">
                    <span className="tw-capitalize tw-font-extrabold tw-bg-primary tw-text-white tw-leading-none tw-rounded-full tw-flex tw-justify-center tw-items-center tw-absolute tw-right-5 -tw-translate-y-1/2 tw-top-0 tw-w-[60px] tw-h-[60px] tw-text-lg md:tw-w-[70px] md:tw-h-[70px] md:tw-text-2xl">
                        {priceConv}
                    </span>
                    <span className="tw-font-medium tw-block tw-uppercase tw-mb-1 tw-tracking-[2px] tw-text-secondary-light">
                        {dayjs(published_at).format("MMM DD, YYYY")}
                    </span>
                    <h3 className="tw-leading-normal tw-text-secondary tw-m-0">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                    {excerpt && <p className="tw-mt-2.5">{excerpt}</p>}
                </div>
            </div>
        );
    }
);

export default CourseCard;
