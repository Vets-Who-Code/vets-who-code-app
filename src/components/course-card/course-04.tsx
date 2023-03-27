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
                    "course tw-h-full tw-rounded tw-bg-gray-100 tw-relative tw-group",
                    "before:tw-absolute before:tw-content-[''] before:tw-z-1 before:tw-inset-0 before:tw-shadow-4xl before:tw-shadow-black/[0.12] before:tw-rounded-b before:tw-transition-opacity before:tw-duration-300 before:tw-opacity-0",
                    "hover:before:tw-opacity-100 hover:tw-bg-white",
                    className
                )}
                ref={ref}
            >
                <figure className="tw-relative tw-overflow-hidden">
                    {thumbnail?.src && (
                        <img
                            className="tw-w-full tw-rounded-t tw-transition-transform tw-duration-1000 tw-ease-out group-hover:tw-scale-110"
                            src={thumbnail.src}
                            alt={thumbnail?.alt || "Course"}
                            width={thumbnail?.width || 370}
                            height={thumbnail?.height || 229}
                            loading={thumbnail?.loading || "lazy"}
                        />
                    )}
                    <span className="tw-bg-primary tw-text-white tw-absolute tw-right-0 tw-top-0 tw-rounded-tr tw-rounded-bl tw-inline-block tw-text-lg tw-font-bold tw-leading-none tw-text-center tw-min-w-[86px] tw-py-[11px] tw-px-4">
                        {isFree ? (
                            "Free"
                        ) : (
                            <>
                                {currency}
                                {price}
                                <span className="tw-text-lg tw-self-end tw-leading-none tw-text-base">
                                    .00
                                </span>
                            </>
                        )}
                    </span>
                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </figure>
                <div className="info tw-p-[30px]">
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
