import Breadcrumb from "@components/breadcrumb";
import SafeHTML from "@components/safe-html";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import { getJobById, type Job } from "@lib/jobboardly";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import React from "react";
import { options } from "@/pages/api/auth/options";

type PageProps = {
    job: Job;
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const JobDetailPage: PageWithLayout = ({ job }) => {
    return (
        <>
            <SEO
                title={`${job.title} - Job Board`}
                description={job.description.substring(0, 160)}
            />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/jobs", label: "jobs" },
                ]}
                currentPage={job.title}
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Back Button */}
                <Link
                    href="/jobs"
                    className="tw-mb-6 tw-inline-flex tw-items-center tw-text-primary hover:tw-underline"
                >
                    <i className="fas fa-arrow-left tw-mr-2" />
                    Back to Job Board
                </Link>

                {/* Job Header */}
                <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md">
                    <div className="tw-mb-6 tw-flex tw-items-start tw-justify-between">
                        <div className="tw-flex-1">
                            <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-ink">
                                {job.title}
                            </h1>
                            <div className="tw-mb-4 tw-flex tw-flex-wrap tw-gap-4 tw-text-lg tw-text-gray-300">
                                {job.company && (
                                    <div className="tw-flex tw-items-center">
                                        <i className="fas fa-building tw-mr-2 tw-text-primary" />
                                        <span className="tw-font-medium">{job.company}</span>
                                    </div>
                                )}
                                {job.location && (
                                    <div className="tw-flex tw-items-center">
                                        <i className="fas fa-map-marker-alt tw-mr-2 tw-text-primary" />
                                        <span>{job.location}</span>
                                    </div>
                                )}
                                {job.type && (
                                    <div className="tw-flex tw-items-center">
                                        <i className="fas fa-clock tw-mr-2 tw-text-primary" />
                                        <span>{job.type}</span>
                                    </div>
                                )}
                                {job.salary && (
                                    <div className="tw-flex tw-items-center">
                                        <i className="fas fa-dollar-sign tw-mr-2 tw-text-primary" />
                                        <span>{job.salary}</span>
                                    </div>
                                )}
                            </div>
                            <div className="tw-flex tw-flex-wrap tw-gap-2">
                                {job.category && (
                                    <span className="tw-rounded-full tw-bg-navy-sky tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-blue-800">
                                        <i className="fas fa-tag tw-mr-1" />
                                        {job.category}
                                    </span>
                                )}
                                {job.pubDate && (
                                    <span className="tw-rounded-full tw-bg-gray-100 tw-px-4 tw-py-2 tw-text-sm tw-text-gray-200">
                                        <i className="fas fa-calendar tw-mr-1" />
                                        Posted {new Date(job.pubDate).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="tw-flex tw-gap-4">
                        <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:tw-bg-primary-dark tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-text-lg tw-font-semibold tw-text-white tw-transition-colors"
                        >
                            Apply on Job Boardly
                            <i className="fas fa-external-link-alt tw-ml-2" />
                        </a>
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator
                                        .share({
                                            title: job.title,
                                            text: `Check out this job opportunity: ${job.title}`,
                                            url: window.location.href,
                                        })
                                        .catch(() => {
                                            // User cancelled or error occurred
                                        });
                                } else {
                                    // Fallback: copy to clipboard
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Link copied to clipboard!");
                                }
                            }}
                            className="tw-inline-flex tw-items-center tw-rounded-md tw-border-2 tw-border-primary tw-bg-white tw-px-6 tw-py-3 tw-font-semibold tw-text-primary tw-transition-colors hover:tw-bg-primary hover:tw-text-white"
                        >
                            <i className="fas fa-share-alt tw-mr-2" />
                            Share
                        </button>
                    </div>
                </div>

                <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:tw-col-span-2">
                        {/* Job Description */}
                        <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md">
                            <h2 className="tw-mb-4 tw-text-2xl tw-font-bold tw-text-ink">
                                Job Description
                            </h2>
                            <SafeHTML
                                content={job.description}
                                className="prose tw-max-w-none tw-text-gray-200"
                            />
                        </div>

                        {/* Additional Info */}
                        {(job.company || job.type || job.salary) && (
                            <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md">
                                <h2 className="tw-mb-4 tw-text-2xl tw-font-bold tw-text-ink">
                                    Additional Information
                                </h2>
                                <dl className="tw-space-y-4">
                                    {job.company && (
                                        <div>
                                            <dt className="tw-font-semibold tw-text-ink">
                                                Company
                                            </dt>
                                            <dd className="tw-text-gray-200">{job.company}</dd>
                                        </div>
                                    )}
                                    {job.location && (
                                        <div>
                                            <dt className="tw-font-semibold tw-text-ink">
                                                Location
                                            </dt>
                                            <dd className="tw-text-gray-200">{job.location}</dd>
                                        </div>
                                    )}
                                    {job.type && (
                                        <div>
                                            <dt className="tw-font-semibold tw-text-ink">
                                                Employment Type
                                            </dt>
                                            <dd className="tw-text-gray-200">{job.type}</dd>
                                        </div>
                                    )}
                                    {job.salary && (
                                        <div>
                                            <dt className="tw-font-semibold tw-text-ink">
                                                Salary Range
                                            </dt>
                                            <dd className="tw-text-gray-200">{job.salary}</dd>
                                        </div>
                                    )}
                                    {job.category && (
                                        <div>
                                            <dt className="tw-font-semibold tw-text-ink">
                                                Category
                                            </dt>
                                            <dd className="tw-text-gray-200">{job.category}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Quick Apply */}
                        <div className="tw-mb-8 tw-rounded-lg tw-bg-gradient-to-br tw-from-secondary tw-to-secondary-dark tw-p-6 tw-text-white tw-shadow-md">
                            <h3 className="tw-mb-3 tw-text-xl tw-font-bold">Ready to Apply?</h3>
                            <p className="tw-mb-4 tw-text-sm tw-opacity-90">
                                Click below to submit your application through Job Boardly.
                            </p>
                            <a
                                href={job.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tw-block tw-rounded-md tw-bg-accent tw-px-6 tw-py-3 tw-text-center tw-font-semibold tw-text-secondary tw-transition-colors hover:tw-bg-accent-dark"
                            >
                                Apply Now
                                <i className="fas fa-arrow-right tw-ml-2" />
                            </a>
                        </div>

                        {/* Resources */}
                        <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                            <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-ink">
                                <i className="fas fa-tools tw-mr-2 tw-text-primary" />
                                Application Resources
                            </h3>
                            <div className="tw-space-y-3">
                                <Link
                                    href="/resume-translator"
                                    className="tw-block tw-rounded-md tw-border tw-border-gray-200 tw-p-3 tw-transition-colors hover:tw-border-primary hover:tw-bg-navy-sky/20"
                                >
                                    <div className="tw-font-medium tw-text-ink">
                                        <i className="fas fa-file-alt tw-mr-2 tw-text-primary" />
                                        Resume Translator
                                    </div>
                                    <div className="tw-text-sm tw-text-gray-300">
                                        Translate military skills to civilian terms
                                    </div>
                                </Link>
                                <Link
                                    href="/courses"
                                    className="tw-block tw-rounded-md tw-border tw-border-gray-200 tw-p-3 tw-transition-colors hover:tw-border-primary hover:tw-bg-navy-sky/20"
                                >
                                    <div className="tw-font-medium tw-text-ink">
                                        <i className="fas fa-graduation-cap tw-mr-2 tw-text-primary" />
                                        Skill Development
                                    </div>
                                    <div className="tw-text-sm tw-text-gray-300">
                                        Enhance your tech skills
                                    </div>
                                </Link>
                                <Link
                                    href="/profile"
                                    className="tw-block tw-rounded-md tw-border tw-border-gray-200 tw-p-3 tw-transition-colors hover:tw-border-primary hover:tw-bg-navy-sky/20"
                                >
                                    <div className="tw-font-medium tw-text-ink">
                                        <i className="fas fa-user-edit tw-mr-2 tw-text-primary" />
                                        Update Profile
                                    </div>
                                    <div className="tw-text-sm tw-text-gray-300">
                                        Keep your info current
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="tw-rounded-lg tw-border-2 tw-border-blue-200 tw-bg-navy-sky/20 tw-p-6">
                            <h3 className="tw-mb-3 tw-text-lg tw-font-semibold tw-text-ink">
                                <i className="fas fa-lightbulb tw-mr-2 tw-text-navy-royal" />
                                Application Tips
                            </h3>
                            <ul className="tw-space-y-2 tw-text-sm tw-text-gray-200">
                                <li className="tw-flex tw-items-start">
                                    <i className="fas fa-check tw-mr-2 tw-mt-1 tw-text-gold" />
                                    <span>Tailor your resume to the job description</span>
                                </li>
                                <li className="tw-flex tw-items-start">
                                    <i className="fas fa-check tw-mr-2 tw-mt-1 tw-text-gold" />
                                    <span>Highlight your military skills and experience</span>
                                </li>
                                <li className="tw-flex tw-items-start">
                                    <i className="fas fa-check tw-mr-2 tw-mt-1 tw-text-gold" />
                                    <span>Include relevant certifications and training</span>
                                </li>
                                <li className="tw-flex tw-items-start">
                                    <i className="fas fa-check tw-mr-2 tw-mt-1 tw-text-gold" />
                                    <span>Follow up after submitting your application</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="tw-mt-12 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center">
                    <h3 className="tw-mb-3 tw-text-2xl tw-font-bold tw-text-ink">
                        Not the right fit?
                    </h3>
                    <p className="tw-mb-6 tw-text-gray-200">
                        Browse more exclusive opportunities on our job board
                    </p>
                    <Link
                        href="/jobs"
                        className="hover:tw-bg-primary-dark tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors"
                    >
                        <i className="fas fa-search tw-mr-2" />
                        View All Jobs
                    </Link>
                </div>
            </div>
        </>
    );
};

JobDetailPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    // In development, allow access even without session for testing
    const isDev = process.env.NODE_ENV === "development";
    const devBypass = isDev && context.req.headers.cookie?.includes("dev-bypass=true");

    if (!session?.user && !devBypass) {
        return {
            redirect: {
                destination: `/login?callbackUrl=/jobs/${context.params?.id}`,
                permanent: false,
            },
        };
    }

    // Get job ID from params
    const jobId = context.params?.id as string;

    // Fetch job by ID
    const job = await getJobById(jobId);

    if (!job) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            job,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default JobDetailPage;
