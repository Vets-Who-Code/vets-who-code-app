import clsx from "clsx";
import { useCurriculumContext } from "@contexts/curriculum-context";
import { useUser } from "@contexts/user-context";
import Anchor from "@ui/anchor";
import ProgressBar from "@ui/progress-bar";

type TProps = {
    className?: string;
    course: {
        title: string;
        path: string;
        slug: string;
    };
};

const Header = ({ className, course }: TProps) => {
    const { totalLessons } = useCurriculumContext();
    const { courseProgress } = useUser();
    const progress =
        courseProgress.find((cs) => cs.course === course.slug)?.completedLessons
            .length || 0;
    const percentage = Math.round((progress / totalLessons) * 100);

    return (
        <div
            className={clsx(
                "tw-bg-secondary tw-min-h-[60px] tw-py-3.8 md:tw-py-0 tw-fixed tw-right-0 tw-top-0 tw-z-20 tw-transition-all tw-duration-300",
                className
            )}
        >
            <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-min-h-[60px] tw-max-w-[930px] tw-px-3.8 tw-mx-auto">
                <h1 className="tw-text-white tw-text-lg md:tw-text-[22px] tw-leading-tight tw-m-0">
                    <Anchor path={course.path}>{course.title}</Anchor>
                </h1>
                <div className="tw-flex tw-items-center">
                    <span className="tw-text-white tw-font-light tw-pr-2.5 tw-text-md">
                        {progress} of {totalLessons} items
                    </span>
                    <ProgressBar
                        now={percentage}
                        size="sm"
                        className="tw-w-[100px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
