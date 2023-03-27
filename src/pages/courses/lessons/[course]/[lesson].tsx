import { useEffect, useState } from "react";
import type { GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Layout04 from "@layout/layout-04";
import LessonDetails from "@containers/lesson-details";
import Spinner from "@ui/spinner";
import { flatDeep } from "@utils/methods";
import { ILesson } from "@utils/types";
import { useUser } from "@contexts/user-context";
import { getallCourses, getCourseBySlug } from "../../../../lib/course";
import {
    getLessonSlugByChapter,
    getCurriculum,
    getLessonBySlug,
    getPrevNextLesson,
} from "../../../../lib/curriculum";

type TProps = {
    data: {
        lesson: ILesson;
        prevNextLesson: {
            prev: ILesson;
            next: ILesson;
        };
        courseSlug: string;
        coursePath: string;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout04;
};

const Lesson: PageProps = ({
    data: { lesson, prevNextLesson, courseSlug, coursePath },
}) => {
    const { isLoggedIn, courseProgress } = useUser();
    const [render, setRender] = useState(false);
    const router = useRouter();
    const enrolledCourse = courseProgress.find(
        (cs) => cs.course === courseSlug
    );
    const hasAccess = enrolledCourse || lesson.access === "free";

    useEffect(() => {
        if (!render) {
            if (!hasAccess && !isLoggedIn) {
                void router.push("/login-register");
            } else if (!hasAccess) {
                void router.push(coursePath);
            }
            setRender(true);
        }
    }, [render, router, isLoggedIn, hasAccess, coursePath]);

    return (
        <>
            <SEO title={lesson.title} />
            {!render && (
                <div className="tw-fixed tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
                    <Spinner />
                </div>
            )}
            {render && (
                <LessonDetails data={{ lesson, prevNextLesson, courseSlug }} />
            )}
        </>
    );
};

Lesson.Layout = Layout04;

type Param = {
    course: string;
    lesson: string;
};

export const getStaticPaths: GetStaticPaths = () => {
    const courses = getallCourses(["slug", "curriculum"]);
    const params = courses.map((course) => {
        const curriculum = getLessonSlugByChapter(course.curriculum);
        return curriculum.map((lesson) => {
            return { course: course.slug, lesson: lesson.slug };
        });
    });

    const pages = flatDeep<Param>(params);
    return {
        paths: pages.map(({ course, lesson }) => {
            return {
                params: {
                    course,
                    lesson,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: Param;
};

export function getStaticProps({ params }: Params) {
    const course = getCourseBySlug(params.course, [
        "title",
        "slug",
        "curriculum",
    ]);
    const curriculum = getCurriculum(
        course.curriculum,
        ["id", "title", "type", "access", "duration", "video"],
        params.course
    );
    const lesson = getLessonBySlug(
        params.lesson,
        ["title", "video", "content", "access"],
        params.course
    );
    const prevNextLesson = getPrevNextLesson(
        course.curriculum,
        params.course,
        params.lesson
    );

    return {
        props: {
            className: "tw-overflow-y-hidden tw-relative",
            data: {
                lesson,
                prevNextLesson,
                courseSlug: params.course,
                coursePath: course.path,
            },
            layout: {
                course,
                curriculum,
            },
        },
    };
}

export default Lesson;
