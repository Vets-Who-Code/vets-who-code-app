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

const CourseCard02 = forwardRef<HTMLDivElement, TProps>(
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
        const isFree = price === 0;

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
                    {isFree && (
                        <span
                            className={clsx(
                                "tw-absolute tw-top-0 tw-right-0 tw-text-white tw-bg-brunt tw-text-lg tw-leading-none tw-font-bold tw-uppercase tw-tracking-[2.4px] tw-py-[11px] tw-px-2.5 tw-rounded-tr",
                                "before:tw-absolute before:content-[''] before:-tw-translate-x-1/2 before:tw-border-x-[12px] before:tw-border-x-transparent before:tw-top-0 before:tw-left-0 before:tw-border-t-[19px] before:tw-border-t-brunt",
                                "after:tw-absolute after:content-[''] after:-tw-translate-x-1/2 after:tw-border-x-[12px] after:tw-border-x-transparent after:tw-bottom-0 after:tw-left-0 after:tw-border-b-[19px] after:tw-border-b-brunt"
                            )}
                        >
                            Free{" "}
                        </span>
                    )}
                    <span className="tw-text-2xl tw-font-extrabold tw-leading-none tw-inline-flex tw-mb-2 tw-text-primary">
                        {currency}
                        {price}
                        <span className="tw-text-lg tw-self-end">.00</span>
                    </span>
                    <h3 className="tw-text-xl tw-leading-normal tw-mb-0">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                    <ul className="meta tw-text-md tw-flex tw-flex-wrap tw-mt-[30px] ">
                        {total_lectures && (
                            <li className="tw-mr-7">
                                <i className="far fa-file-alt tw-mr-2.5" />
                                {total_lectures} Lessons
                            </li>
                        )}
                        {total_students && (
                            <li>
                                <i className="far fa-user-alt tw-mr-2.5" />
                                {total_students} Students
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
);

export default CourseCard02;
