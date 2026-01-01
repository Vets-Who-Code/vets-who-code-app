import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/options";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type Enrollment = {
    id: string;
    courseId: string;
    status: string;
    progress: number;
};

type PageProps = {
    user: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
    };
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
        title: "Programming Fundamentals",
        description: "Variables, functions, data structures, and algorithms",
        duration: "20 hours",
        lessons: 25,
        status: "available",
        technologies: ["JavaScript", "Python", "Problem Solving"],
    },
    {
        id: 2,
        title: "Frontend Development",
        description: "HTML, CSS, JavaScript, and modern frameworks",
        duration: "30 hours",
        lessons: 35,
        status: "available",
        technologies: ["HTML5", "CSS3", "JavaScript", "React"],
    },
    {
        id: 3,
        title: "Backend Development",
        description: "Server-side programming, APIs, and databases",
        duration: "28 hours",
        lessons: 32,
        status: "available",
        technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    },
    {
        id: 4,
        title: "Full-Stack Integration",
        description: "Connecting frontend and backend applications",
        duration: "24 hours",
        lessons: 28,
        status: "available",
        technologies: ["REST APIs", "GraphQL", "Authentication", "State Management"],
    },
    {
        id: 5,
        title: "DevOps & Deployment",
        description: "Version control, CI/CD, and cloud deployment",
        duration: "22 hours",
        lessons: 26,
        status: "available",
        technologies: ["Git", "Docker", "AWS", "CI/CD"],
    },
    {
        id: 6,
        title: "System Design",
        description: "Scalable architecture, design patterns, and best practices",
        duration: "26 hours",
        lessons: 30,
        status: "available",
        technologies: ["Architecture", "Design Patterns", "Scalability", "Performance"],
    },
    {
        id: 7,
        title: "Advanced Topics",
        description: "Microservices, testing, security, and performance optimization",
        duration: "24 hours",
        lessons: 28,
        status: "coming-soon",
        technologies: ["Microservices", "Testing", "Security", "Performance"],
    },
    {
        id: 8,
        title: "Capstone Project",
        description: "Build a complete full-stack application from scratch",
        duration: "40 hours",
        lessons: 20,
        status: "coming-soon",
        technologies: ["Full-Stack", "Project Management", "Portfolio", "Deployment"],
    },
];

const SoftwareEngineeringCourse: PageWithLayout = ({ user: _user }) => {
    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [enrollmentError, setEnrollmentError] = useState<string | null>(null);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/enrollment/enroll");
            const data = await response.json();

            if (response.ok) {
                setEnrollments(data.enrollments);
            }
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        } finally {
            setLoading(false);
        }
    };

    // Check if enrolled in Software Engineering vertical
    const isEnrolled = (): boolean => {
        const matchingTitles = ["Software Engineering", "Full-Stack Development", "Web Development"];
        return enrollments.some(
            (enrollment) =>
                enrollment.status === "ACTIVE" &&
                matchingTitles.some((title) =>
                    enrollment.courseId.toLowerCase().includes(title.toLowerCase())
                )
        );
    };

    const handleEnroll = async () => {
        // For now, this is a placeholder since we don't have a courseId
        // In a real implementation, you'd need to map the vertical to an actual course
        setEnrollmentError("Enrollment is not yet configured for this vertical. Please contact an administrator.");
    };

    return (
        <>
            <SEO title="Software Engineering Vertical" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/courses", label: "courses" },
                ]}
                currentPage="Software Engineering"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Header */}
                <div className="tw-mb-16 tw-text-center">
                    <div className="tw-mb-8">
                        <div className="tw-mb-6 tw-flex tw-items-center tw-justify-center">
                            <div className="tw-rounded-lg tw-bg-primary/10 tw-p-4">
                                <i className="fas fa-code tw-text-4xl tw-text-primary" />
                            </div>
                        </div>
                        <h1 className="tw-mb-4 tw-text-5xl tw-font-bold tw-text-secondary md:tw-text-6xl">
                            Software Engineering
                        </h1>
                        <div className="tw-mx-auto tw-mb-6 tw-h-1 tw-w-24 tw-rounded tw-bg-primary" />
                        <p className="tw-mx-auto tw-max-w-3xl tw-text-xl tw-leading-relaxed tw-text-gray-200 md:tw-text-2xl">
                            Master full-stack development, system design, and software architecture
                            to build scalable applications that solve real-world problems.
                        </p>
                    </div>

                    {/* Enrollment Status/CTA */}
                    {!loading && (
                        <div className="tw-mb-8 tw-text-center">
                            {isEnrolled() ? (
                                <div className="tw-inline-flex tw-items-center tw-rounded-lg tw-bg-success/10 tw-px-6 tw-py-3 tw-text-success">
                                    <i className="fas fa-check-circle tw-mr-2 tw-text-xl" />
                                    <span className="tw-font-semibold">
                                        You&apos;re enrolled in this vertical
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleEnroll}
                                        className="tw-inline-flex tw-items-center tw-rounded-lg tw-bg-primary tw-px-8 tw-py-4 tw-text-lg tw-font-semibold tw-text-white tw-transition-all hover:tw-bg-primary/90 hover:tw-shadow-lg"
                                    >
                                        <i className="fas fa-user-plus tw-mr-2" />
                                        Enroll in Vertical
                                    </button>
                                    {enrollmentError && (
                                        <p className="tw-mt-3 tw-text-sm tw-text-red-600">
                                            {enrollmentError}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Course Stats */}
                    <div className="tw-grid tw-grid-cols-2 tw-gap-6 tw-rounded-xl tw-bg-gradient-to-r tw-from-primary tw-to-primary/80 tw-p-8 tw-text-white md:tw-grid-cols-4">
                        <div className="tw-text-center">
                            <div className="tw-text-3xl tw-font-bold">8</div>
                            <div className="tw-text-sm tw-opacity-90">Modules</div>
                        </div>
                        <div className="tw-text-center">
                            <div className="tw-text-3xl tw-font-bold">244</div>
                            <div className="tw-text-sm tw-opacity-90">Lessons</div>
                        </div>
                        <div className="tw-text-center">
                            <div className="tw-text-3xl tw-font-bold">194</div>
                            <div className="tw-text-sm tw-opacity-90">Hours</div>
                        </div>
                        <div className="tw-text-center">
                            <div className="tw-text-3xl tw-font-bold">16-20</div>
                            <div className="tw-text-sm tw-opacity-90">Weeks</div>
                        </div>
                    </div>
                </div>

                {/* Course Modules */}
                <div className="tw-space-y-6">
                    {modules.map((module, index) => (
                        <div
                            key={module.id}
                            className="tw-overflow-hidden tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-shadow-lg tw-transition-all tw-duration-300 hover:tw-shadow-xl"
                        >
                            <div className="tw-flex tw-items-center tw-justify-between tw-p-6">
                                <div className="tw-flex tw-items-center tw-space-x-4">
                                    <div className="tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-full tw-bg-primary tw-font-bold tw-text-white">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="tw-text-xl tw-font-bold tw-text-ink">
                                            {module.title}
                                        </h3>
                                        <p className="tw-text-gray-300">{module.description}</p>
                                    </div>
                                </div>
                                <div className="tw-flex tw-items-center tw-space-x-4">
                                    <div className="tw-text-right tw-text-sm tw-text-gray-500">
                                        <div>{module.lessons} lessons</div>
                                        <div>{module.duration}</div>
                                    </div>
                                    {module.status === "available" ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedModule(
                                                    selectedModule === module.id ? null : module.id
                                                )
                                            }
                                            className="tw-rounded-lg tw-bg-primary tw-px-4 tw-py-2 tw-text-white tw-transition-colors hover:tw-bg-primary/90"
                                        >
                                            {selectedModule === module.id
                                                ? "Hide Details"
                                                : "View Details"}
                                        </button>
                                    ) : (
                                        <span className="tw-rounded-lg tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-gray-500">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                            </div>

                            {selectedModule === module.id && (
                                <div className="tw-border-t tw-border-gray-200 tw-bg-gray-50 tw-p-6">
                                    <div className="tw-mb-4">
                                        <h4 className="tw-mb-3 tw-font-semibold tw-text-ink">
                                            Technologies Covered:
                                        </h4>
                                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                                            {module.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="tw-rounded-lg tw-bg-primary/10 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-primary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {module.status === "available" && (
                                        <div className="tw-flex tw-space-x-3">
                                            <Link
                                                href={`/courses/software-engineering/${module.id}`}
                                                className="tw-inline-flex tw-items-center tw-rounded-lg tw-bg-primary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary/90"
                                            >
                                                <i className="fas fa-play tw-mr-2" />
                                                Start Module
                                            </Link>
                                            <button
                                                type="button"
                                                className="tw-inline-flex tw-items-center tw-rounded-lg tw-border tw-border-gray-300 tw-bg-white tw-px-6 tw-py-3 tw-font-semibold tw-text-gray-200 tw-transition-colors hover:tw-bg-gray-50"
                                            >
                                                <i className="fas fa-bookmark tw-mr-2" />
                                                Save for Later
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Prerequisites & What You'll Build */}
                <div className="tw-mt-16 tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-2">
                    <div className="tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-p-8 tw-shadow-lg">
                        <h3 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-ink">
                            Prerequisites
                        </h3>
                        <ul className="tw-space-y-3 tw-text-gray-200">
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-check tw-mr-3 tw-text-success" />
                                Basic computer skills and familiarity with the internet
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-check tw-mr-3 tw-text-success" />
                                High school mathematics (algebra recommended)
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-check tw-mr-3 tw-text-success" />
                                Dedication to practice 10-15 hours per week
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-check tw-mr-3 tw-text-success" />
                                Military experience (veteran or military spouse)
                            </li>
                        </ul>
                    </div>

                    <div className="tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-p-8 tw-shadow-lg">
                        <h3 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-ink">
                            What You&apos;ll Build
                        </h3>
                        <ul className="tw-space-y-3 tw-text-gray-200">
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-rocket tw-mr-3 tw-text-primary" />
                                Personal portfolio website
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-rocket tw-mr-3 tw-text-primary" />
                                REST API with authentication
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-rocket tw-mr-3 tw-text-primary" />
                                Full-stack web application
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-rocket tw-mr-3 tw-text-primary" />
                                Microservices architecture project
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

SoftwareEngineeringCourse.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/courses/software-engineering",
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: {
                id: session.user.id,
                name: session.user.name || null,
                email: session.user.email || "",
                image: session.user.image || null,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default SoftwareEngineeringCourse;
