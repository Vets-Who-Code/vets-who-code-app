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
                    "course-card tw:relative tw:flex tw:h-full tw:flex-wrap tw:rounded-sm tw:bg-white tw:p-5 tw:sm:flex-nowrap tw:sm:items-center",
                    "tw:before:absolute tw:before:inset-0 tw:before:rounded-b tw:before:opacity-0 tw:before:shadow-4md tw:before:shadow-black/5 tw:before:transition-opacity tw:before:content-['']",
                    "tw:hover:before:opacity-100",
                    className
                )}
                ref={ref}
            >
                <div className="tw:relative tw:z-1 tw:flex tw:h-[170px] tw:w-[170px] tw:min-w-[170px] tw:overflow-hidden tw:rounded-full">
                    {thumbnail?.src && (
                        <img
                            className="tw:h-full tw:w-full tw:object-cover"
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
                <div className="info tw:z-1 tw:mt-5 tw:sm:mt-0 tw:sm:pl-7.5">
                    <h3 className="tw:mb-0 tw:text-xl tw:leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </div>
        );
    }
);

export default CourseCard;
