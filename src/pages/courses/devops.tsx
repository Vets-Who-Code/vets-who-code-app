import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import React, { useState } from "react";
import { options } from "@/pages/api/auth/options";

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
        title: "DevOps Fundamentals",
        description: "Introduction to DevOps culture, practices, and tools",
        duration: "6 hours",
        lessons: 10,
        status: "available",
    },
    {
        id: 2,
        title: "Linux System Administration",
        description: "Essential Linux skills for DevOps engineers",
        duration: "12 hours",
        lessons: 16,
        status: "available",
    },
    {
        id: 3,
        title: "Version Control with Git",
        description: "Advanced Git workflows and collaboration strategies",
        duration: "8 hours",
        lessons: 12,
        status: "available",
    },
    {
        id: 4,
        title: "Containerization with Docker",
        description: "Container fundamentals and Docker best practices",
        duration: "14 hours",
        lessons: 18,
        status: "available",
    },
    {
        id: 5,
        title: "Container Orchestration",
        description: "Kubernetes fundamentals and cluster management",
        duration: "16 hours",
        lessons: 22,
        status: "available",
    },
    {
        id: 6,
        title: "CI/CD Pipelines",
        description: "Automated testing and deployment workflows",
        duration: "12 hours",
        lessons: 16,
        status: "available",
    },
    {
        id: 7,
        title: "Infrastructure as Code",
        description: "Terraform and infrastructure automation",
        duration: "14 hours",
        lessons: 18,
        status: "available",
    },
    {
        id: 8,
        title: "Monitoring & Observability",
        description: "Application and infrastructure monitoring",
        duration: "10 hours",
        lessons: 14,
        status: "available",
    },
    {
        id: 9,
        title: "Cloud Platforms",
        description: "AWS, Azure, and GCP fundamentals",
        duration: "16 hours",
        lessons: 20,
        status: "available",
    },
    {
        id: 10,
        title: "Capstone Project",
        description: "Deploy a full application using DevOps practices",
        duration: "30 hours",
        lessons: 8,
        status: "available",
    },
];

const DevOpsCourse: PageWithLayout = ({ user: _user }) => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrolling, setEnrolling] = useState(false);

    const handleEnroll = async () => {
        setEnrolling(true);
        try {
            await new Promise<void>((resolve) => {
                setTimeout(() => resolve(), 1000);
            });
            setIsEnrolled(true);
        } catch (_error) {
            // Handle error silently for now
        } finally {
            setEnrolling(false);
        }
    };

    return (
        <>
            <SEO title="DevOps Engineering Course" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/courses", label: "courses" },
                ]}
                currentPage="DevOps Engineering"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Course Header */}
                <div className="tw-mb-12 tw-rounded-lg tw-bg-gradient-to-r tw-from-green-500 tw-to-green-600 tw-p-8 tw-text-white">
                    <div className="tw-flex tw-flex-col tw-items-start tw-justify-between lg:tw-flex-row lg:tw-items-center">
                        <div className="tw-mb-6 tw-flex-1 lg:tw-mb-0">
                            <div className="tw-mb-4 tw-flex tw-items-center">
                                <i className="fas fa-cogs tw-mr-4 tw-text-4xl" />
                                <div>
                                    <h1 className="tw-mb-2 tw-text-4xl tw-font-bold">
                                        DevOps Engineering
                                    </h1>
                                    <p className="tw-text-lg tw-text-green-100">
                                        Master the tools and practices that enable rapid, reliable
                                        software delivery
                                    </p>
                                </div>
                            </div>

                            <div className="tw-mb-6 tw-grid tw-grid-cols-2 tw-gap-6 md:tw-grid-cols-4">
                                <div>
                                    <div className="tw-text-2xl tw-font-bold">14-18</div>
                                    <div className="tw-text-green-100">weeks</div>
                                </div>
                                <div>
                                    <div className="tw-text-2xl tw-font-bold">138</div>
                                    <div className="tw-text-green-100">hours</div>
                                </div>
                                <div>
                                    <div className="tw-text-2xl tw-font-bold">154</div>
                                    <div className="tw-text-green-100">lessons</div>
                                </div>
                                <div>
                                    <div className="tw-text-2xl tw-font-bold">10</div>
                                    <div className="tw-text-green-100">modules</div>
                                </div>
                            </div>

                            <div className="tw-flex tw-flex-wrap tw-gap-2">
                                <span className="tw-rounded-full tw-bg-green-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    Docker
                                </span>
                                <span className="tw-rounded-full tw-bg-green-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    Kubernetes
                                </span>
                                <span className="tw-rounded-full tw-bg-green-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    CI/CD
                                </span>
                                <span className="tw-rounded-full tw-bg-green-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    Terraform
                                </span>
                                <span className="tw-rounded-full tw-bg-green-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    AWS
                                </span>
                                <span className="tw-rounded-full tw-bg-green-400 tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white">
                                    Linux
                                </span>
                            </div>
                        </div>

                        <div className="tw-min-w-[300px] tw-rounded-lg tw-bg-white tw-p-6 tw-text-ink">
                            <div className="tw-mb-4 tw-text-center">
                                <div className="tw-mb-2 tw-text-3xl tw-font-bold tw-text-gold">
                                    FREE
                                </div>
                                <p className="tw-text-gray-300">For veterans & military spouses</p>
                            </div>

                            {isEnrolled ? (
                                <div className="tw-text-center">
                                    <div className="tw-mb-4 tw-rounded-md tw-bg-gold-light/30 tw-px-4 tw-py-2 tw-text-gold-deep">
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

                            <div className="tw-mt-4 tw-text-center tw-text-sm tw-text-gray-300">
                                <p>Includes:</p>
                                <ul className="tw-mt-2 tw-space-y-1">
                                    <li>• Lifetime access</li>
                                    <li>• 1:1 mentorship</li>
                                    <li>• Cloud lab environment</li>
                                    <li>• Industry certification prep</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Description */}
                <div className="tw-mb-16 tw-grid tw-grid-cols-1 tw-gap-12 lg:tw-grid-cols-3">
                    <div className="lg:tw-col-span-2">
                        <h2 className="tw-mb-6 tw-text-3xl tw-font-bold tw-text-ink">
                            Course Overview
                        </h2>
                        <div className="tw-prose tw-prose-lg tw-max-w-none">
                            <p>
                                This comprehensive DevOps engineering course is designed for
                                veterans and military spouses who want to break into one of the
                                highest-paying areas of technology. You&apos;ll learn the tools,
                                practices, and mindset that enable modern software teams to deploy
                                code faster and more reliably.
                            </p>
                            <p>
                                Starting with Linux fundamentals and progressing through
                                containerization, orchestration, and cloud platforms, you&apos;ll
                                gain hands-on experience with the same tools used by top tech
                                companies. Your military background in systems thinking and
                                operational excellence provides the perfect foundation for DevOps
                                success.
                            </p>
                            <p>
                                Our curriculum includes real-world projects and prepares you for
                                industry certifications like AWS Solutions Architect and Certified
                                Kubernetes Administrator (CKA).
                            </p>
                        </div>

                        <h3 className="tw-mb-4 tw-mt-8 tw-text-2xl tw-font-bold tw-text-ink">
                            What You&apos;ll Master
                        </h3>
                        <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Linux system administration and scripting</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Docker containerization and optimization</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Kubernetes orchestration and management</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>CI/CD pipeline design and implementation</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Infrastructure as Code with Terraform</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>AWS, Azure, and GCP cloud platforms</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Monitoring and observability strategies</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Security best practices and compliance</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Automation and configuration management</span>
                            </div>
                            <div className="tw-flex tw-items-start tw-space-x-3">
                                <i className="fas fa-check tw-mt-1 tw-text-green-500" />
                                <span>Site reliability engineering principles</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="tw-mb-4 tw-text-xl tw-font-bold tw-text-ink">
                            Prerequisites
                        </h3>
                        <ul className="tw-mb-6 tw-space-y-2 tw-text-gray-300">
                            <li>• Basic command line familiarity</li>
                            <li>• Programming fundamentals (any language)</li>
                            <li>• Military background (veteran or spouse)</li>
                            <li>• Commitment to 20-25 hours/week</li>
                        </ul>

                        <h3 className="tw-mb-4 tw-text-xl tw-font-bold tw-text-ink">
                            Career Outcomes
                        </h3>
                        <ul className="tw-mb-6 tw-space-y-2 tw-text-gray-300">
                            <li>• DevOps Engineer</li>
                            <li>• Site Reliability Engineer (SRE)</li>
                            <li>• Cloud Infrastructure Engineer</li>
                            <li>• Platform Engineer</li>
                            <li>• Release Engineer</li>
                        </ul>

                        <div className="tw-rounded-lg tw-bg-gray-50 tw-p-4">
                            <h4 className="tw-mb-2 tw-font-semibold tw-text-ink">
                                Average Salary Range
                            </h4>
                            <div className="tw-text-2xl tw-font-bold tw-text-gold">
                                $90K - $180K
                            </div>
                            <p className="tw-mt-1 tw-text-sm tw-text-gray-300">
                                Based on location and experience
                            </p>
                        </div>
                    </div>
                </div>

                {/* Course Curriculum */}
                <div className="tw-mb-16">
                    <h2 className="tw-mb-8 tw-text-3xl tw-font-bold tw-text-ink">
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
                                                <h3 className="tw-text-xl tw-font-semibold tw-text-ink">
                                                    {module.title}
                                                </h3>
                                                <p className="tw-text-gray-300">
                                                    {module.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="tw-text-right tw-text-sm tw-text-gray-500">
                                            <div>{module.duration}</div>
                                            <div>{module.lessons} lessons</div>
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
                            Ready to Launch Your DevOps Career?
                        </h2>
                        <p className="tw-mb-6 tw-text-xl tw-opacity-90">
                            Join veterans who have transitioned into high-paying DevOps roles with
                            our comprehensive training.
                        </p>
                        <button
                            type="button"
                            onClick={handleEnroll}
                            disabled={enrolling}
                            className="tw-rounded-md tw-bg-white tw-px-8 tw-py-3 tw-font-semibold tw-text-primary tw-transition-colors hover:tw-bg-gray-100 disabled:tw-opacity-50"
                        >
                            {enrolling ? "Enrolling..." : "Enroll for Free"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

DevOpsCourse.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/courses/devops",
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

export default DevOpsCourse;
