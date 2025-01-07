import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

type TProps = Pick<ICourse, "thumbnail" | "title" | "path"> & {
    className?: string;
};

const CourseCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, path }, ref) => {
        return (
            <div
                className={clsx(
                    "course-card tw-relative tw-flex tw-h-full tw-flex-wrap tw-rounded tw-bg-white tw-p-5 sm:tw-flex-nowrap sm:tw-items-center",
                    "before:tw-absolute before:tw-inset-0 before:tw-rounded-b before:tw-opacity-0 before:tw-shadow-4md before:tw-shadow-black/5 before:tw-transition-opacity before:tw-content-['']",
                    "hover:before:tw-opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw-relative tw-z-1 tw-flex tw-h-[170px] tw-w-[170px] tw-min-w-[170px] tw-overflow-hidden tw-rounded-full">
                    {thumbnail?.src && (
                        <img
                            className="tw-h-full tw-w-full tw-object-cover"
                            src={thumbnail.src}
                            alt={thumbnail?.alt || "Course"}
                            width={thumbnail?.width || 170}
                            height={thumbnail?.height || 170}
                            loading={thumbnail?.loading || "lazy"}
                        />
                    )}
                    <Anchor path={path} className="link-overlay">
                        {title}
                    </Anchor>
                </div>
                <div className="info tw-z-1 tw-mt-5 sm:tw-mt-0 sm:tw-pl-7.5">
                    <h3 className="tw-mb-0 tw-text-xl tw-leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </div>
        );
    }
);

export default CourseCard;
