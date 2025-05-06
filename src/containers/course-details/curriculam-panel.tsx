import clsx from "clsx";
import Badge from "@ui/badge";
import Anchor from "@ui/anchor";
import { useUser } from "@contexts/user-context";
import { ICurriculum } from "@utils/types";

type TProps = {
    curriculum: ICurriculum[];
    courseSlug: string;
};

interface UserContextType {
    courseProgress?: Array<{ course: string }>;
}

const CurriculumPanel = ({ curriculum, courseSlug }: TProps) => {
    const user = useUser() as UserContextType;
    const courseProgress = user?.courseProgress ?? [];
    const enrolledCourse = courseProgress.find((cs) => cs.course === courseSlug);

    return (
        <div className="curriculum-sections">
            {curriculum.map(({ id, title, description, lessons }) => (
                <div
                    key={id}
                    className="tw-mt-[50px] tw-rounded tw-border tw-border-alto first:tw-mt-0"
                >
                    <div className="tw-px-3.8 tw-py-5 md:tw-px-12 md:tw-py-[22px]">
                        <h5 className="tw-mb-0 tw-text-xl">{title}</h5>
                        {description && (
                            <p className="tw-mb-0 tw-mt-[5px] tw-text-md tw-italic">
                                {description}
                            </p>
                        )}
                    </div>
                    {lessons.length > 0 && (
                        <ul className="section-content">
                            {lessons.map((item) => {
                                const hasAccess = enrolledCourse || item.access === "free";
                                return (
                                    <li
                                        key={item.slug}
                                        className="tw-text-md odd:tw-bg-white even:tw-bg-light-100 even:last:tw-rounded-b"
                                    >
                                        <Anchor
                                            path={item.path}
                                            className={clsx(
                                                "tw-flex tw-min-h-[56px] tw-flex-wrap tw-items-center tw-px-3.8 md:tw-pl-12 md:tw-pr-7.5",
                                                !hasAccess && "tw-pointer-events-none"
                                            )}
                                        >
                                            <span className="tw-grow tw-py-2.5">
                                                <i
                                                    className={clsx(
                                                        "far tw-w-5 tw-text-md",
                                                        item.type === "lesson" && "fa-file-alt",
                                                        item.type === "quiz" && "fa-clock"
                                                    )}
                                                />
                                                {item.title}
                                            </span>
                                            <div className="tw-flex tw-items-center tw-py-2.5 tw-text-right">
                                                <Badge className="tw-ml-2.5">{item.duration}</Badge>
                                                {item.type === "lesson" &&
                                                    item.access === "free" && (
                                                        <Badge
                                                            className="tw-ml-2.5"
                                                            color="primary"
                                                        >
                                                            Preview
                                                        </Badge>
                                                    )}
                                                {item?.video && (
                                                    <span className="tw-ml-2.5 tw-px-3.8 tw-font-medium">
                                                        <i className="far fa-video" />
                                                    </span>
                                                )}
                                                {item.access === "paid" && (
                                                    <span className="tw-ml-2.5 tw-px-3.8 tw-font-medium">
                                                        <i className="fas fa-lock-alt" />
                                                    </span>
                                                )}
                                            </div>
                                        </Anchor>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CurriculumPanel;
