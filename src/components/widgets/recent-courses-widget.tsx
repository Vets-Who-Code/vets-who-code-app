import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";

type TProps = {
    recentCourses: Pick<ICourse, "title" | "path" | "thumbnail">[];
    className?: string;
};

const RecentCoursesWidget = ({ recentCourses, className }: TProps) => {
    return (
        <div className={clsx("recent-courses-widget", className)}>
            <h2 className="tw-mb-7.5 tw-text-h3">Recent Courses</h2>

            {recentCourses.map(({ title, path, thumbnail }) => (
                <div
                    key={path}
                    className="tw-mb-5 tw-flex tw-items-center tw-border-b tw-border-b-gray-500 tw-pb-5 last:tw-mb-0 last:tw-border-b-0 last:tw-pb-0"
                >
                    <div className="tw-relative tw-h-[100px] tw-max-w-[100px] tw-overflow-hidden tw-rounded-full">
                        {thumbnail?.src && (
                            <>
                                <img
                                    className="tw-h-full tw-w-full tw-object-cover"
                                    src={thumbnail.src}
                                    alt={thumbnail?.alt || title}
                                    width={thumbnail?.width || 100}
                                    height={thumbnail?.height || 100}
                                    loading="lazy"
                                />
                                <Anchor path={path} className="link-overlay">
                                    {title}
                                </Anchor>
                            </>
                        )}
                    </div>
                    <div className="tw-flex-1 tw-pl-5">
                        <h3 className="tw-mb-0 tw-text-h6 tw-leading-normal">
                            <Anchor path={path}>{title}</Anchor>
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentCoursesWidget;
