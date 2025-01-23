import clsx from "clsx";
import Badge from "@ui/badge";
import Anchor from "@ui/anchor";
import { useUser } from "@contexts/user-context";
import { ICurriculum } from "@utils/types";

type TProps = {
    curriculum: ICurriculum[];
    courseSlug: string;
};

const CurriculumPanel = ({ curriculum, courseSlug }: TProps) => {
    const { courseProgress } = useUser();
    const enrolledCourse = courseProgress.find(
        (cs) => cs.course === courseSlug
    );

    return (
        <div className="curriculum-sections">
            {curriculum.map(({ id, title, description, lessons }) => (
                <div
                    key={id}
                    className="tw-border tw-border-alto tw-rounded tw-mt-[50px] first:tw-mt-0"
                >
                    <div className="tw-py-5 tw-px-3.8 md:tw-py-[22px] md:tw-px-12">
                        <h5 className="tw-text-xl tw-mb-0">{title}</h5>
                        {description && (
                            <p className="tw-text-md tw-mb-0 tw-mt-[5px] tw-italic">
                                {description}
                            </p>
                        )}
                    </div>
                    {lessons.length > 0 && (
                        <ul className="section-content">
                            {lessons.map((item) => {
                                const hasAccess =
                                    enrolledCourse || item.access === "free";
                                return (
                                    <li
                                        key={item.slug}
                                        className="tw-text-md even:tw-bg-light-100 odd:tw-bg-white even:last:tw-rounded-b"
                                    >
                                        <Anchor
                                            path={item.path}
                                            className={clsx(
                                                "tw-px-3.8 md:tw-pl-12 md:tw-pr-7.5 tw-min-h-[56px] tw-flex tw-flex-wrap tw-items-center",
                                                !hasAccess &&
                                                    "tw-pointer-events-none"
                                            )}
                                        >
                                            <span className="tw-grow tw-py-2.5">
                                                <i
                                                    className={clsx(
                                                        "far tw-w-5 tw-text-md",
                                                        item.type ===
                                                            "lesson" &&
                                                            "fa-file-alt",
                                                        item.type === "quiz" &&
                                                            "fa-clock"
                                                    )}
                                                />
                                                {item.title}
                                            </span>
                                            <div className="tw-text-right tw-flex tw-items-center tw-py-2.5">
                                                <Badge className="tw-ml-2.5">
                                                    {item.duration}
                                                </Badge>
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
                                                    <span className="tw-ml-2.5 tw-font-medium tw-px-3.8">
                                                        <i className="far fa-video" />
                                                    </span>
                                                )}
                                                {item.access === "paid" && (
                                                    <span className="tw-ml-2.5 tw-font-medium tw-px-3.8">
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
