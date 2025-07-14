import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

type TProps = Pick<ICourse, "thumbnail" | "title" | "path"> & {
    className?: string;
};

const CourseCard02 = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, path }, ref) => {
        return (
            <div
                className={clsx(
                    "course tw:group tw:relative tw:h-full tw:rounded-sm tw:bg-gray-100",
                    "tw:before:absolute tw:before:inset-0 tw:before:z-1 tw:before:rounded-b tw:before:opacity-0 tw:before:shadow-4xl tw:before:shadow-black/12 tw:before:transition-opacity tw:before:duration-300 tw:before:content-['']",
                    "tw:hover:bg-white tw:hover:before:opacity-100",
                    className
                )}
                ref={ref}
            >
                <figure className="tw:relative tw:overflow-hidden">
                    {thumbnail?.src && (
                        <img
                            className="tw:w-full tw:rounded-t tw:transition-transform tw:duration-1000 tw:ease-out tw:group-hover:scale-110"
                            src={thumbnail.src}
                            alt={thumbnail?.alt || "Course"}
                            width={thumbnail?.width || 370}
                            height={thumbnail?.height || 229}
                            loading={thumbnail?.loading || "lazy"}
                        />
                    )}

                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </figure>
                <div className="info tw:p-[30px]">
                    <h3 className="tw:mb-0 tw:text-xl tw:leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </div>
        );
    }
);

export default CourseCard02;
