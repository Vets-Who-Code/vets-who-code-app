import { forwardRef } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

interface TProps
    extends Pick<ICourse, "thumbnail" | "title" | "path" | "published_at" | "excerpt"> {
    className?: string;
}

const CourseCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, path, published_at, excerpt }, ref) => {
        return (
            <div
                className={clsx(
                    "group tw-h-full tw-overflow-hidden tw-rounded tw-bg-gray-100 tw-transition-all hover:tw-bg-white hover:tw-shadow-4xl hover:tw-shadow-black/[0.12]",
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
                <div className="tw-relative tw-px-7.5 tw-pb-10 tw-pt-7.5">
                    <span className="tw-absolute tw-right-5 tw-top-0 tw-flex tw-h-[60px] tw-w-[60px] -tw-translate-y-1/2 tw-items-center tw-justify-center tw-rounded-full tw-bg-primary tw-text-lg tw-font-extrabold tw-capitalize tw-leading-none tw-text-white md:tw-h-[70px] md:tw-w-[70px] md:tw-text-2xl" />
                    <span className="tw-mb-1 tw-block tw-font-medium tw-uppercase tw-tracking-[2px] tw-text-secondary-light">
                        {dayjs(published_at).format("MMM DD, YYYY")}
                    </span>
                    <h3 className="tw-m-0 tw-leading-normal tw-text-secondary">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                    {excerpt && <p className="tw-mt-2.5">{excerpt}</p>}
                </div>
            </div>
        );
    }
);

export default CourseCard;
