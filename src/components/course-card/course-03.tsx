import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

type TProps = Pick<
    ICourse,
    | "thumbnail"
    | "title"
    | "path"
    | "currency"
    | "price"
    | "total_lectures"
    | "total_students"
> & {
    className?: string;
};

const CourseCard = forwardRef<HTMLDivElement, TProps>(
    (
        {
            className,
            thumbnail,
            title,
            path,
            currency,
            price,
            total_lectures,
            total_students,
        },
        ref
    ) => {
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
                    <span className="tw-text-primary tw-text-xl sm:tw-text-2xl tw-font-extrabold tw-leading-none tw-inline-flex tw-mb-1 sm:tw-mb-2">
                        {currency}
                        {price}
                        <span className="tw-self-end tw-text-[16px] sm:tw-text-lg">
                            .00
                        </span>
                    </span>
                    <h3 className="tw-text-xl tw-leading-normal tw-mb-0">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                    <ul className="tw-text-sm sm:tw-text-md tw-flex tw-flex-wrap tw-mt-2.5 ">
                        {total_lectures && (
                            <li className="tw-mr-7">
                                <i className="far fa-file-alt tw-mr-2.5" />
                                {total_lectures} Lessons
                            </li>
                        )}
                        {total_students && (
                            <li>
                                <i className="far fa-file-alt tw-mr-2.5" />
                                {total_students} Students
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
);

export default CourseCard;
