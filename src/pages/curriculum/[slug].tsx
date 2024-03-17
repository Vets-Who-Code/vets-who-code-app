import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseDetails from "@containers/course-details";
import { ICourse, IInstructor, ICurriculum } from "@utils/types";
import { getInstructorByID } from "../../lib/instructor";
import {
    getallCourses,
    getCourseBySlug,
    getFilteredCourses,
} from "../../lib/course";
import { getCurriculum } from "../../lib/curriculum";

type TProps = {
    data: {
        course: ICourse;
        instructor: IInstructor;
        relatedCourses: ICourse[];
        curriculum: ICurriculum[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const SingleCourse: PageProps = ({
    data: { course, curriculum, instructor },
}) => {
    return (
        <>
            <SEO
                title={course.title}
                description="Introductory CS course laying out the basics."
                openGraph={{
                    type: "website",
                    images: [
                        {
                            url: `https://vetswhocode.io.pages.dev${course.thumbnail.src}`,
                            width: 800,
                            height: 600,
                            alt: course.title,
                        },
                        {
                            url: `https://vetswhocode.io-react.pages.dev${course.thumbnail.src}`,
                            width: 900,
                            height: 800,
                            alt: course.title,
                        },
                    ],
                }}
                jsonLdType="course"
                instructor={{ name: instructor.name, path: course.path }}
            />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/curriculum/subjects", label: "Modules" },
                ]}
                currentPage={course.title}
            />
            <CourseDetails data={{ course, curriculum, instructor }} />
        </>
    );
};

SingleCourse.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const courses = getallCourses(["slug"]);
    return {
        paths: courses.map((course) => {
            return {
                params: {
                    slug: course.slug,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        slug: string;
    };
};

export const getStaticProps = ({ params }: Params) => {
    const course = getCourseBySlug(params.slug, "all");
    const instructor = getInstructorByID(course.instructor, "all");
    const relatedCourses = getFilteredCourses(
        ["category", "title", "slug", "thumbnail"],
        "category",
        course.category
    );

    const curriculum = getCurriculum(
        course.curriculum,
        ["id", "title", "type", "access", "video", "duration"],
        course.slug
    );

    return {
        props: {
            data: {
                course,
                curriculum,
                instructor,
                relatedCourses,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default SingleCourse;
