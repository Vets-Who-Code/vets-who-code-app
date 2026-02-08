import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";
import clsx from "clsx";
import { forwardRef } from "react";

type TProps = Pick<ICourse, "thumbnail" | "title" | "path"> & {
    className?: string;
};

const CourseCard02 = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, path }, ref) => {
        return (
            <div
                className={clsx(
                    "course tw-group tw-relative tw-h-full tw-rounded tw-bg-gray-100",
                    "before:tw-absolute before:tw-inset-0 before:tw-z-1 before:tw-rounded-b before:tw-opacity-0 before:tw-shadow-4xl before:tw-shadow-black/[0.12] before:tw-transition-opacity before:tw-duration-300 before:tw-content-['']",
                    "hover:tw-bg-white hover:before:tw-opacity-100",
                    className
                )}
                ref={ref}
            >
                <figure className="tw-relative tw-overflow-hidden">
                    {thumbnail?.src && (
                        <img
                            className="tw-w-full tw-rounded-t tw-transition-transform tw-duration-1000 tw-ease-out tw-group-hover:tw-scale-110"
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
                <div className="info tw-p-[30px]">
                    <h3 className="tw-mb-0 tw-text-xl tw-leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </div>
        );
    }
);

export default CourseCard02;
