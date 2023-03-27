import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

type TProps = {
    recentCourses: Pick<
        ICourse,
        "title" | "path" | "thumbnail" | "price" | "currency"
    >[];
    className?: string;
};

const RecentCoursesWidget = ({ recentCourses, className }: TProps) => {
    return (
        <div className={clsx("recent-courses-widget", className)}>
            <h2 className="tw-mb-7.5 tw-text-h3">Recent Courses</h2>

            {recentCourses.map(
                ({ title, path, thumbnail, price, currency }) => (
                    <div
                        key={path}
                        className="tw-flex tw-items-center tw-mb-5 tw-pb-5 tw-border-b tw-border-b-gray-500 last:tw-mb-0 last:tw-pb-0 last:tw-border-b-0"
                    >
                        <div className="tw-max-w-[100px] tw-h-[100px] tw-rounded-full tw-overflow-hidden tw-relative">
                            {thumbnail?.src && (
                                <>
                                    <img
                                        className="tw-w-full tw-h-full tw-object-cover"
                                        src={thumbnail.src}
                                        alt={thumbnail?.alt || title}
                                        width={thumbnail?.width || 100}
                                        height={thumbnail?.height || 100}
                                        loading="lazy"
                                    />
                                    <Anchor
                                        path={path}
                                        className="link-overlay"
                                    >
                                        {title}
                                    </Anchor>
                                </>
                            )}
                        </div>
                        <div className="tw-pl-5 tw-flex-1">
                            <span className="tw-font-extrabold tw-leading-none tw-inline-flex tw-mr-2.5 tw-text-primary">
                                {price === 0 ? (
                                    "free"
                                ) : (
                                    <>
                                        {currency}
                                        {price}
                                        <span>.00</span>
                                    </>
                                )}
                            </span>
                            <h3 className="tw-leading-normal tw-text-h6 tw-mb-0">
                                <Anchor path={path}>{title}</Anchor>
                            </h3>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default RecentCoursesWidget;
