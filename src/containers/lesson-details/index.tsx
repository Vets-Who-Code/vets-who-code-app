/* eslint-disable react/jsx-no-useless-fragment */
import Router from "next/router";
import { useUser } from "@contexts/user-context";
import Button from "@ui/button";
import Alert from "@ui/alert";
import { ILesson } from "@utils/types";
import MarkdownRenderer from "@components/markdown-renderer";
import NavLink from "./nav-link";

type TProps = {
    data: {
        lesson: Pick<ILesson, "title" | "slug" | "video" | "content">;
        prevNextLesson: {
            prev: ILesson;
            next: ILesson;
        };
        courseSlug: string;
    };
};

const LessonDetails = ({
    data: {
        lesson,
        prevNextLesson: { prev, next },
        courseSlug,
    },
}: TProps) => {
    const { lessonComplete, courseProgress } = useUser();

    const enrolledCourse = courseProgress.find(
        (cs) => cs.course === courseSlug
    );

    const isCompleted = Boolean(
        courseProgress
            .find((cs) => cs.course === courseSlug)
            ?.completedLessons.includes(lesson.slug)
    );
    const onLessonComplete = () => {
        lessonComplete({
            course: courseSlug,
            lessonLink: next?.path || "",
            lesson: lesson.slug,
        });
        if (next?.path) {
            void Router.push(next.path);
        }
    };

    return (
        <div className="tw-mx-auto tw-px-3.8 tw-py-[100px] tw-max-w-[930px]">
            <h2 className="tw-mb-[18px]">{lesson.title}</h2>
            {lesson?.video && (
                <iframe
                    src={lesson.video}
                    title={lesson.title}
                    className="tw-mb-10"
                />
            )}
            <MarkdownRenderer content={lesson.content} />

            {enrolledCourse && (
                <>
                    {isCompleted ? (
                        <Alert
                            className="tw-mt-8 tw-text-center"
                            color="secondary"
                        >
                            Completed <i className="fa fa-check" />
                        </Alert>
                    ) : (
                        <Button className="tw-mt-8" onClick={onLessonComplete}>
                            Complete
                        </Button>
                    )}
                </>
            )}
            {enrolledCourse && (
                <div className="tw-mt-7 tw-flex tw-justify-between tw-items-center">
                    {prev && (
                        <NavLink
                            title={prev.title}
                            path={prev.path}
                            variant="prev"
                        />
                    )}
                    {next && (
                        <NavLink
                            title={next.title}
                            path={next.path}
                            variant="next"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default LessonDetails;
