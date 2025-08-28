import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type PageProps = {
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const modules = [
    {
        id: 1,
        title: "HTML Fundamentals",
        description: "Learn the building blocks of the web with semantic HTML",
        duration: "8 hours",
        lessons: 12,
        status: "available",
    },
    {
        id: 2,
        title: "CSS Styling & Layout",
        description: "Master styling, flexbox, grid, and responsive design",
        duration: "12 hours",
        lessons: 18,
        status: "available",
    },
    {
        id: 3,
        title: "JavaScript Basics",
        description: "Variables, functions, DOM manipulation, and events",
        duration: "16 hours",
        lessons: 24,
        status: "available",
    },
    {
        id: 4,
        title: "Modern JavaScript",
        description: "ES6+, async/await, modules, and best practices",
        duration: "14 hours",
        lessons: 20,
        status: "available",
    },
    {
        id: 5,
        title: "React Fundamentals",
        description: "Components, state, props, and hooks",
        duration: "20 hours",
        lessons: 28,
        status: "available",
    },
    {
        id: 6,
        title: "React Advanced",
        description: "Context, routing, state management, and testing",
        duration: "18 hours",
        lessons: 26,
        status: "available",
    },
    {
        id: 7,
        title: "Node.js & Express",
        description: "Server-side JavaScript and API development",
        duration: "16 hours",
        lessons: 22,
        status: "available",
    },
    {
        id: 8,
        title: "Databases & Deployment",
        description: "MongoDB, PostgreSQL, and cloud deployment",
        duration: "14 hours",
        lessons: 18,
        status: "available",
    },
    {
        id: 9,
        title: "Final Project",
        description: "Build a full-stack web application from scratch",
        duration: "40 hours",
        lessons: 8,
        status: "available",
    },
];

const WebDevelopmentCourse: PageWithLayout = () => {
    const { data: session, status } = useSession();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrolling, setEnrolling] = useState(false);

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading course...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <>
                <SEO title="Web Development Course - Sign In Required" />
                <Breadcrumb
                    pages={[
                        { path: "/", label: "home" },
                        { path: "/courses", label: "courses" },
                    ]}
                    currentPage="Web Development"
                    showTitle={false}
                />
                <div className="tw-container tw-py-16">
                    <div className="tw-text-center">
                        <div className="tw-mb-8">
                            <i className="fas fa-lock tw-mb-4 tw-text-6xl tw-text-gray-400" />
                            <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                                Course Access Restricted
                            </h1>
                            <p className="tw-mx-auto tw-max-w-2xl tw-text-xl tw-text-gray-600">
                                Please sign in to access the Web Development course content and
                                enrollment.
                            </p>
                        </div>

                        <Link
                            href="/login"
                            className="hover:tw-bg-primary-dark tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors"
                        >
                            <i className="fas fa-sign-in-alt tw-mr-2" />
                            Sign In to Access Course
                        </Link>

                        <div className="tw-mt-6 tw-text-gray-600">
                            <p>Want to explore course topics first?</p>
                            <Link
                                href="/subjects/all"
                                className="hover:tw-text-primary-dark tw-text-primary tw-transition-colors"
                            >
                                Browse our subjects page →
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const handleEnroll = async () => {
        if (!session) {
            // Redirect to login
            window.location.href = "/login";
            return;
        }

        setEnrolling(true);
        try {
            // TODO: Implement enrollment API
            await new Promise<void>((resolve) => {
                setTimeout(() => resolve(), 1000);
            }); // Simulate API call
            setIsEnrolled(true);
        } catch (error) {
            // Handle error silently for now
        } finally {
            setEnrolling(false);
        }
    };

    return (
        <>
            <SEO title="Web Development Course" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/courses", label: "courses" },
                ]}
                currentPage="Web Development"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Course Header */}
                <div className="tw-mb-12 tw-rounded-lg tw-bg-gradient-to-r tw-from-blue-500 tw-to-blue-600 tw-p-8 tw-text-white">
                    <div className="tw-flex tw-flex-col tw-items-start tw-justify-between lg:tw-flex-row lg:tw-items-center">
                        <div className="tw-mb-6 tw-flex-1 lg:tw-mb-0">
                            <div className="tw-mb-4 tw-flex tw-items-center">
                                <i className="fab fa-html5 tw-mr-4 tw-text-4xl" />
                                <div>
                                    <h1 className="tw-mb-2 tw-text-4xl tw-font-bold">
                                        Web Development
                                    </h1>
                                    <p className="tw-text-lg tw-text-blue-100">
                                        Build modern, responsive web applications from frontend to
                                        backend
                                    </p>
                                </div>
                            </div>

                            <div className="tw-mb-6 tw-grid tw-grid-cols-2 tw-gap-6 md:tw-grid-cols-4">
                                <div>
                                    <div className="tw-text-2xl tw-font-bold">12-16</div>
                                    <div className="tw-text-blue-100">weeks</div>
                                </div>
                                <div>
                                    <div className="tw-text-2xl tw-font-bold">158</div>
                                    <div className="tw-text-blue-100">hours</div>
                                </div>
                                <div>
                                    <div className="tw-text-2xl tw-font-bold">176</div>
                                    <div className="tw-text-blue-100">lessons</div>
                                </div>
                                <div>
                                    <div className="tw-text-2xl tw-font-bold">9</div>
                                    <div className="tw-text-blue-100">modules</div>
                                </div>
                            </div>

                            <div className="tw-flex tw-flex-wrap tw-gap-2">
                                <span className="tw-rounded-full tw-bg-blue-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    HTML5
                                </span>
                                <span className="tw-rounded-full tw-bg-blue-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    CSS3
                                </span>
                                <span className="tw-rounded-full tw-bg-blue-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    JavaScript
                                </span>
                                <span className="tw-rounded-full tw-bg-blue-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    React
                                </span>
                                <span className="tw-rounded-full tw-bg-blue-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    Node.js
                                </span>
                                <span className="tw-rounded-full tw-bg-blue-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    Express
                                </span>
                            </div>
                        </div>

                        <div className="tw-min-w-[300px] tw-rounded-lg tw-bg-white tw-p-6 tw-text-gray-900">
                            <div className="tw-mb-4 tw-text-center">
                                <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-green-600">
                                    FREE
                                </div>
                                <p className="tw-text-gray-600">For veterans & military spouses</p>
                            </div>

                            {session ? (
                                <div>
                                    {isEnrolled ? (
                                        <div className="tw-text-center">
                                            <div className="tw-mb-4 tw-rounded-md tw-bg-green-100 tw-px-4 tw-py-2 tw-text-green-800">
                                                ✓ Enrolled
                                            </div>
                                            <Link
                                                href="/dashboard"
                                                className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors"
                                            >
                                                Go to Dashboard
                                            </Link>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleEnroll}
                                            disabled={enrolling}
                                            className="hover:tw-bg-primary-dark tw-w-full tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors disabled:tw-opacity-50"
                                        >
                                            {enrolling ? "Enrolling..." : "Enroll Now"}
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="hover:tw-bg-primary-dark tw-block tw-w-full tw-rounded-md tw-bg-primary tw-px-6 tw-py-3 tw-text-center tw-font-semibold tw-text-white tw-transition-colors"
                                >
                                    Sign In to Enroll
                                </Link>
                            )}

                            <div className="tw-mt-4 tw-text-center tw-text-sm tw-text-gray-600">
                                <p>Includes:</p>
                                <ul className="tw-mt-2 tw-space-y-1">
                                    <li>• Lifetime access</li>
                                    <li>• 1:1 mentorship</li>
                                    <li>• Career support</li>
                                    <li>• Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Description */}
                <div className="tw-mb-16 tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-3">
                    <div className="lg:tw-col-span-2">
                        <h2 className="tw-mb-6 tw-text-3xl tw-font-bold tw-text-gray-900">
                            Course Overview
                        </h2>
                        <div className="tw-prose tw-prose-lg tw-max-w-none">
                            <p>
                                This comprehensive web development course is designed specifically
                                for veterans and military spouses looking to start a career in tech.
                                You&apos;ll learn to build modern, responsive web applications using
                                industry-standard technologies and best practices.
                            </p>
                            <p>
                                Starting with the fundamentals of HTML and CSS, you&apos;ll
                                progressively build your skills through JavaScript, React, and
                                backend development with Node.js. By the end of the course,
                                you&apos;ll have built multiple projects including a full-stack web
                                application that you can showcase to potential employers.
                            </p>
                            <p>
                                Our curriculum is constantly updated to reflect current industry
                                needs, and you&apos;ll receive personalized mentorship from
                                experienced developers throughout your journey.
                            </p>
                        </div>

                        <h3 className="tw-mb-4 tw-mt-8 tw-text-2xl tw-font-bold tw-text-gray-900">
                            What You&apos;ll Learn
                        </h3>
                        <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>HTML5 semantic markup and accessibility</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>CSS3, Flexbox, and Grid layouts</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>JavaScript fundamentals and ES6+ features</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>React components, hooks, and state management</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Node.js and Express.js backend development</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Database integration (MongoDB & PostgreSQL)</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>RESTful API design and development</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Version control with Git and GitHub</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Testing and debugging techniques</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Deployment and hosting best practices</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="tw-mb-4 tw-text-xl tw-font-bold tw-text-gray-900">
                            Prerequisites
                        </h3>
                        <ul className="tw-mb-6 tw-space-y-2 tw-text-gray-600">
                            <li>• Basic computer literacy</li>
                            <li>• Willingness to learn and practice</li>
                            <li>• Military background (veteran or spouse)</li>
                            <li>• Commitment to 15-20 hours/week</li>
                        </ul>

                        <h3 className="tw-mb-4 tw-text-xl tw-font-bold tw-text-gray-900">
                            Career Outcomes
                        </h3>
                        <ul className="tw-mb-6 tw-space-y-2 tw-text-gray-600">
                            <li>• Frontend Developer</li>
                            <li>• Full-Stack Developer</li>
                            <li>• React Developer</li>
                            <li>• JavaScript Developer</li>
                            <li>• Web Application Developer</li>
                        </ul>

                        <div className="tw-rounded-lg tw-bg-gray-50 tw-p-4">
                            <h4 className="tw-mb-2 tw-font-semibold tw-text-gray-900">
                                Average Salary Range
                            </h4>
                            <div className="tw-text-2xl tw-font-bold tw-text-green-600">
                                $65K - $120K
                            </div>
                            <p className="tw-mt-1 tw-text-sm tw-text-gray-600">
                                Based on location and experience
                            </p>
                        </div>
                    </div>
                </div>

                {/* Course Curriculum */}
                <div className="tw-mb-16">
                    <h2 className="tw-mb-8 tw-text-3xl tw-font-bold tw-text-gray-900">
                        Course Curriculum
                    </h2>
                    <div className="tw-space-y-4">
                        {modules.map((module, index) => (
                            <div
                                key={module.id}
                                className="tw-overflow-hidden tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white"
                            >
                                <div className="tw-p-6">
                                    <div className="tw-flex tw-items-center tw-justify-between">
                                        <div className="tw-flex tw-items-center tw-space-x-4">
                                            <div className="tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-full tw-bg-primary tw-font-bold tw-text-white">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                                                    {module.title}
                                                </h3>
                                                <p className="tw-text-gray-600">
                                                    {module.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-items-center tw-space-x-4">
                                            <div className="tw-text-right tw-text-sm tw-text-gray-500">
                                                <div>{module.duration}</div>
                                                <div>{module.lessons} lessons</div>
                                            </div>
                                            {session && isEnrolled && (
                                                <Link
                                                    href={`/courses/web-development/${module.id}/1`}
                                                    className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-transition-colors"
                                                >
                                                    Start Module
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                {!isEnrolled && (
                    <div className="tw-to-primary-dark tw-rounded-lg tw-bg-gradient-to-r tw-from-primary tw-p-8 tw-text-center tw-text-white">
                        <h2 className="tw-mb-4 tw-text-3xl tw-font-bold">
                            Ready to Start Your Web Development Journey?
                        </h2>
                        <p className="tw-mb-6 tw-text-xl tw-opacity-90">
                            Join hundreds of veterans who have successfully launched their tech
                            careers with us.
                        </p>
                        {session ? (
                            <button
                                type="button"
                                onClick={handleEnroll}
                                disabled={enrolling}
                                className="tw-rounded-md tw-bg-white tw-px-8 tw-py-3 tw-font-semibold tw-text-primary tw-transition-colors hover:tw-bg-gray-100 disabled:tw-opacity-50"
                            >
                                {enrolling ? "Enrolling..." : "Enroll for Free"}
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="tw-inline-block tw-rounded-md tw-bg-white tw-px-8 tw-py-3 tw-font-semibold tw-text-primary tw-transition-colors hover:tw-bg-gray-100"
                            >
                                Sign In to Enroll
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

WebDevelopmentCourse.Layout = Layout01;

export const getStaticProps: GetStaticProps<PageProps> = () => {
    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default WebDevelopmentCourse;
