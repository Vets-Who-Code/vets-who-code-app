import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

type TProps = Pick<ICourse, "thumbnail" | "title" | "path"> & {
    className?: string;
};

const CourseCard02 = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, path, currency, price }, ref) => {
        return (
            <div
                className={clsx(
                    "course tw-h-full tw-rounded tw-bg-white tw-relative",
                    "before:tw-absolute before:tw-content-[''] before:-tw-z-1 before:tw-inset-0 before:tw-shadow-4md before:tw-shadow-black/[0.12] before:tw-rounded-b before:tw-transition-opacity before:tw-opacity-0",
                    "hover:before:tw-opacity-100",
                    className
                )}
                ref={ref}
            >
                <figure className="tw-relative">
                    {thumbnail?.src && (
                        <img
                            className="tw-w-full tw-rounded-t"
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
                    <h3 className="tw-text-xl tw-leading-normal tw-mb-0">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </div>
        );
    }
);

export default CourseCard02;
