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
                    "course-card tw-flex tw-flex-wrap sm:tw-flex-nowrap sm:tw-items-center tw-h-full tw-p-5 tw-rounded tw-bg-white tw-relative",
                    "before:tw-absolute before:tw-content-[''] before:tw-inset-0 before:tw-shadow-4md before:tw-shadow-black/5 before:tw-rounded-b before:tw-transition-opacity before:tw-opacity-0",
                    "hover:before:tw-opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw-relative tw-z-1 tw-flex tw-overflow-hidden tw-rounded-full tw-w-[170px] tw-min-w-[170px] tw-h-[170px]">
                    {thumbnail?.src && (
                        <img
                            className="tw-w-full tw-h-full tw-object-cover"
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
                    <h3 className="tw-text-xl tw-leading-normal tw-mb-0">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </div>
        );
    }
);

export default CourseCard;
