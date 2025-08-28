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
        title: "Data Engineering Fundamentals",
        description: "Introduction to data systems, ETL/ELT, and data architecture",
        duration: "24 hours",
        lessons: 28,
        status: "available",
        technologies: ["Python", "SQL", "Data Modeling", "ETL Concepts"],
    },
    {
        id: 2,
        title: "Database Systems & SQL",
        description: "Relational databases, NoSQL, query optimization, and performance",
        duration: "26 hours",
        lessons: 30,
        status: "available",
        technologies: ["PostgreSQL", "MongoDB", "Redis", "Query Optimization"],
    },
    {
        id: 3,
        title: "Python for Data Engineering",
        description: "Advanced Python, data manipulation, and automation",
        duration: "28 hours",
        lessons: 32,
        status: "available",
        technologies: ["Python", "Pandas", "NumPy", "Apache Airflow"],
    },
    {
        id: 4,
        title: "Big Data Technologies",
        description: "Hadoop, Spark, distributed computing, and data processing",
        duration: "30 hours",
        lessons: 35,
        status: "available",
        technologies: ["Apache Spark", "Hadoop", "Kafka", "Distributed Systems"],
    },
    {
        id: 5,
        title: "Cloud Data Platforms",
        description: "AWS, GCP, Azure data services and cloud architecture",
        duration: "32 hours",
        lessons: 38,
        status: "available",
        technologies: ["AWS", "GCP", "Azure", "Cloud Architecture"],
    },
    {
        id: 6,
        title: "Data Pipeline Engineering",
        description: "Building robust, scalable data pipelines and orchestration",
        duration: "28 hours",
        lessons: 34,
        status: "available",
        technologies: ["Apache Airflow", "Luigi", "Prefect", "Data Orchestration"],
    },
    {
        id: 7,
        title: "Real-time Data Processing",
        description: "Stream processing, event-driven architectures, and real-time analytics",
        duration: "26 hours",
        lessons: 30,
        status: "coming-soon",
        technologies: ["Kafka", "Apache Storm", "Flink", "Real-time Analytics"],
    },
    {
        id: 8,
        title: "Data Engineering Capstone",
        description: "Build an end-to-end data platform with real-world data",
        duration: "40 hours",
        lessons: 24,
        status: "coming-soon",
        technologies: ["Full Pipeline", "Cloud Deployment", "Monitoring", "Portfolio"],
    },
];

const DataEngineeringCourse: PageWithLayout = () => {
    const { data: session, status } = useSession();
    const [selectedModule, setSelectedModule] = useState<number | null>(null);

    // Check for dev session as fallback
    const [devSession, setDevSession] = React.useState<{
        user: { id: string; name: string; email: string; image: string };
    } | null>(null);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("dev-session");
            if (stored) {
                try {
                    const user = JSON.parse(stored);
                    setDevSession({ user });
                } catch {
                    localStorage.removeItem("dev-session");
                }
            }
        }
    }, []);

    // Use either real session or dev session
    const currentSession = session || devSession;

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-secondary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading course...</p>
                </div>
            </div>
        );
    }

    if (!currentSession) {
        return (
            <>
                <SEO title="Data Engineering - Sign In Required" />
                <div className="tw-container tw-py-16">
                    <div className="tw-text-center">
                        <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                            Authentication Required
                        </h1>
                        <p className="tw-mb-8 tw-text-xl tw-text-gray-600">
                            Please sign in to access the Data Engineering vertical.
                        </p>
                        <Link
                            href="/dev-login"
                            className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-secondary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-secondary/90"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO title="Data Engineering Vertical" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/courses", label: "courses" },
                ]}
                currentPage="Data Engineering"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Header */}
                <div className="tw-mb-16 tw-text-center">
                    <div className="tw-mb-8">
                        <div className="tw-mb-6 tw-flex tw-items-center tw-justify-center">
                            <div className="tw-rounded-lg tw-bg-secondary/10 tw-p-4">
                                <i className="fas fa-database tw-text-4xl tw-text-secondary" />
                            </div>
                        </div>
                        <h1 className="tw-mb-4 tw-text-5xl tw-font-bold tw-text-secondary md:tw-text-6xl">
                            Data Engineering
                        </h1>
                        <div className="tw-mx-auto tw-mb-6 tw-h-1 tw-w-24 tw-rounded tw-bg-secondary" />
                        <p className="tw-mx-auto tw-max-w-3xl tw-text-xl tw-leading-relaxed tw-text-gray-700 md:tw-text-2xl">
                            Build data pipelines, work with big data technologies, and create robust
                            data infrastructure systems that power modern analytics.
                        </p>
                    </div>

                    {/* Course Stats */}
                    <div className="tw-grid tw-grid-cols-2 tw-gap-6 tw-rounded-xl tw-bg-gradient-to-r tw-from-secondary tw-to-secondary/80 tw-p-8 tw-text-white md:tw-grid-cols-4">
                        <div className="tw-text-center">
                            <div className="tw-text-3xl tw-font-bold">8</div>
                            <div className="tw-text-sm tw-opacity-90">Modules</div>
                        </div>
                        <div className="tw-text-center">
                            <div className="tw-text-3xl tw-font-bold">251</div>
                            <div className="tw-text-sm tw-opacity-90">Lessons</div>
                        </div>
                        <div className="tw-text-center">
                            <div className="tw-text-3xl tw-font-bold">234</div>
                            <div className="tw-text-sm tw-opacity-90">Hours</div>
                        </div>
                        <div className="tw-text-center">
                            <div className="tw-text-3xl tw-font-bold">18-22</div>
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
                                    <div className="tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-full tw-bg-secondary tw-font-bold tw-text-white">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="tw-text-xl tw-font-bold tw-text-gray-900">
                                            {module.title}
                                        </h3>
                                        <p className="tw-text-gray-600">{module.description}</p>
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
                                            className="tw-rounded-lg tw-bg-secondary tw-px-4 tw-py-2 tw-text-white tw-transition-colors hover:tw-bg-secondary/90"
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
                                        <h4 className="tw-mb-3 tw-font-semibold tw-text-gray-900">
                                            Technologies Covered:
                                        </h4>
                                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                                            {module.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="tw-rounded-lg tw-bg-secondary/10 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-secondary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {module.status === "available" && (
                                        <div className="tw-flex tw-space-x-3">
                                            <Link
                                                href={`/courses/data-engineering/${module.id}`}
                                                className="tw-inline-flex tw-items-center tw-rounded-lg tw-bg-secondary tw-px-6 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-secondary/90"
                                            >
                                                <i className="fas fa-play tw-mr-2" />
                                                Start Module
                                            </Link>
                                            <button
                                                type="button"
                                                className="tw-inline-flex tw-items-center tw-rounded-lg tw-border tw-border-gray-300 tw-bg-white tw-px-6 tw-py-3 tw-font-semibold tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-50"
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
                        <h3 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-gray-900">
                            Prerequisites
                        </h3>
                        <ul className="tw-space-y-3 tw-text-gray-700">
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-check tw-mr-3 tw-text-success" />
                                Programming experience (Python preferred)
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-check tw-mr-3 tw-text-success" />
                                Basic SQL knowledge
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-check tw-mr-3 tw-text-success" />
                                Understanding of databases and data concepts
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-check tw-mr-3 tw-text-success" />
                                Military experience (veteran or military spouse)
                            </li>
                        </ul>
                    </div>

                    <div className="tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-p-8 tw-shadow-lg">
                        <h3 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-gray-900">
                            What You&apos;ll Build
                        </h3>
                        <ul className="tw-space-y-3 tw-text-gray-700">
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-rocket tw-mr-3 tw-text-secondary" />
                                Automated ETL data pipeline
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-rocket tw-mr-3 tw-text-secondary" />
                                Real-time data streaming system
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-rocket tw-mr-3 tw-text-secondary" />
                                Cloud-based data warehouse
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-rocket tw-mr-3 tw-text-secondary" />
                                End-to-end analytics platform
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

DataEngineeringCourse.Layout = Layout01;

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

export default DataEngineeringCourse;
