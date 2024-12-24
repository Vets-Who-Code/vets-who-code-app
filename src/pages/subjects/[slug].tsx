import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import CourseDetails from "@containers/course-details";
import RelatedCourseArea from "@containers/course/layout-02";
import { ICourse, IInstructor } from "@utils/types";
import { getInstructorByID } from "../../lib/instructor";
import { getallCourses, getCourseBySlug, getFilteredCourses } from "../../lib/course";

type TProps = {
    data: {
        course: ICourse;
        instructor: IInstructor;
        relatedCourses: ICourse[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const SingleCourse: PageProps = ({ data: { course, instructor, relatedCourses } }) => {
    return (
        <>
            <SEO
                title={course.title}
                description="Introductory CS course laying out the basics."
                openGraph={{
                    type: "website",
                    images: [
                        {
                            url: `https://maxcoach-react.pages.dev${course.thumbnail.src}`,
                            width: 800,
                            height: 600,
                            alt: course.title,
                        },
                        {
                            url: `https://maxcoach-react.pages.dev${course.thumbnail.src}`,
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
                    { path: "/subjects/all", label: "subjects" },
                ]}
                currentPage={course.title}
            />
            <CourseDetails data={{ course }} />
            {relatedCourses.length > 0 && (
                <RelatedCourseArea
                    data={{
                        section_title: { title: "Related Courses​" },
                    }}
                />
            )}
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

    return {
        props: {
            data: {
                course,
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
