import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import { getCategories, getJobs, getJobTypes, type Job } from "@lib/jobboardly";
import prisma from "@lib/prisma";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import React, { useMemo, useState } from "react";
import { options } from "@/pages/api/auth/options";

type PageProps = {
    jobs: Job[];
    categories: string[];
    jobTypes: string[];
    user: {
        id: string;
        name: string | null;
        email: string;
        hasEnrollment: boolean;
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

const JobsPage: PageWithLayout = ({ jobs, categories, jobTypes, user }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");

    // Filter jobs based on search and filters
    const filteredJobs = useMemo(() => {
        let filtered = jobs;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (job) =>
                    job.title.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    job.company?.toLowerCase().includes(query) ||
                    job.location?.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter((job) => job.category === selectedCategory);
        }

        // Type filter
        if (selectedType) {
            filtered = filtered.filter((job) => job.type === selectedType);
        }

        return filtered;
    }, [jobs, searchQuery, selectedCategory, selectedType]);

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedType("");
    };

    return (
        <>
            <SEO
                title="Vets Who Code Job Board - Exclusive Tech Opportunities"
                description="Access exclusive tech job opportunities curated for Vets Who Code alumni and our veteran community."
            />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Job Board"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Header */}
                <div className="tw-mb-12">
                    <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
                        <h1 className="tw-text-4xl tw-font-bold tw-text-ink">
                            Vets Who Code Job Board
                        </h1>
                        {user.hasEnrollment && (
                            <span className="tw-rounded-full tw-bg-gold-light/30 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gold-deep">
                                <i className="fas fa-check-circle tw-mr-2" />
                                VWC Alumni
                            </span>
                        )}
                    </div>
                    <p className="tw-text-xl tw-text-gray-300">
                        Exclusive tech opportunities for our veteran community
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="tw-mb-8 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                    <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-4">
                        {/* Search */}
                        <div className="md:tw-col-span-2">
                            <label
                                htmlFor="search"
                                className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                            >
                                Search Jobs
                            </label>
                            <input
                                id="search"
                                type="text"
                                placeholder="Search by title, company, location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary focus:tw-ring-opacity-50"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label
                                htmlFor="category"
                                className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary focus:tw-ring-opacity-50"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Job Type Filter */}
                        <div>
                            <label
                                htmlFor="type"
                                className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                            >
                                Job Type
                            </label>
                            <select
                                id="type"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-4 tw-py-2 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary focus:tw-ring-opacity-50"
                            >
                                <option value="">All Types</option>
                                {jobTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(searchQuery || selectedCategory || selectedType) && (
                        <div className="tw-mt-4 tw-flex tw-items-center tw-gap-2">
                            <span className="tw-text-sm tw-text-gray-300">Active filters:</span>
                            {searchQuery && (
                                <span className="tw-rounded-full tw-bg-primary tw-bg-opacity-10 tw-px-3 tw-py-1 tw-text-sm tw-text-primary">
                                    Search: &quot;{searchQuery}&quot;
                                </span>
                            )}
                            {selectedCategory && (
                                <span className="tw-rounded-full tw-bg-primary tw-bg-opacity-10 tw-px-3 tw-py-1 tw-text-sm tw-text-primary">
                                    Category: {selectedCategory}
                                </span>
                            )}
                            {selectedType && (
                                <span className="tw-rounded-full tw-bg-primary tw-bg-opacity-10 tw-px-3 tw-py-1 tw-text-sm tw-text-primary">
                                    Type: {selectedType}
                                </span>
                            )}
                            <button
                                onClick={resetFilters}
                                className="tw-ml-2 tw-text-sm tw-text-primary hover:tw-underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="tw-mb-6 tw-text-gray-300">
                    Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
                    {jobs.length !== filteredJobs.length && ` of ${jobs.length} total`}
                </div>

                {/* Job Listings */}
                {filteredJobs.length === 0 ? (
                    <div className="tw-rounded-lg tw-bg-white tw-p-12 tw-text-center tw-shadow-md">
                        <i className="fas fa-briefcase tw-mb-4 tw-text-6xl tw-text-gray-300" />
                        <h3 className="tw-mb-2 tw-text-xl tw-font-semibold tw-text-ink">
                            {jobs.length === 0
                                ? "No jobs available yet"
                                : "No jobs match your filters"}
                        </h3>
                        <p className="tw-mb-4 tw-text-gray-300">
                            {jobs.length === 0
                                ? "Check back soon for new opportunities!"
                                : "Try adjusting your search or filters to see more results."}
                        </p>
                        {jobs.length > 0 && (
                            <button
                                onClick={resetFilters}
                                className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="tw-space-y-4">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-md tw-transition-shadow hover:tw-shadow-lg"
                            >
                                <div className="tw-p-6">
                                    <div className="tw-mb-4 tw-flex tw-items-start tw-justify-between">
                                        <div className="tw-flex-1">
                                            <h2 className="tw-mb-2 tw-text-2xl tw-font-bold tw-text-ink">
                                                {job.title}
                                            </h2>
                                            <div className="tw-mb-3 tw-flex tw-flex-wrap tw-gap-3 tw-text-gray-300">
                                                {job.company && (
                                                    <div className="tw-flex tw-items-center">
                                                        <i className="fas fa-building tw-mr-2 tw-text-primary" />
                                                        {job.company}
                                                    </div>
                                                )}
                                                {job.location && (
                                                    <div className="tw-flex tw-items-center">
                                                        <i className="fas fa-map-marker-alt tw-mr-2 tw-text-primary" />
                                                        {job.location}
                                                    </div>
                                                )}
                                                {job.type && (
                                                    <div className="tw-flex tw-items-center">
                                                        <i className="fas fa-clock tw-mr-2 tw-text-primary" />
                                                        {job.type}
                                                    </div>
                                                )}
                                                {job.salary && (
                                                    <div className="tw-flex tw-items-center">
                                                        <i className="fas fa-dollar-sign tw-mr-2 tw-text-primary" />
                                                        {job.salary}
                                                    </div>
                                                )}
                                            </div>
                                            {job.category && (
                                                <span className="tw-inline-block tw-rounded-full tw-bg-navy-sky tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-blue-800">
                                                    {job.category}
                                                </span>
                                            )}
                                        </div>
                                        {job.pubDate && (
                                            <div className="tw-ml-4 tw-text-sm tw-text-gray-500">
                                                {new Date(job.pubDate).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>

                                    <p className="tw-mb-4 tw-line-clamp-3 tw-text-gray-200">
                                        {job.description}
                                    </p>

                                    <div className="tw-flex tw-items-center tw-justify-between">
                                        <Link
                                            href={`/jobs/${encodeURIComponent(job.id)}`}
                                            className="tw-text-primary hover:tw-underline"
                                        >
                                            View Details
                                        </Link>
                                        <a
                                            href={job.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white tw-transition-colors"
                                        >
                                            Apply Now
                                            <i className="fas fa-external-link-alt tw-ml-2" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Help Section */}
                <div className="tw-mt-12 tw-rounded-lg tw-border-2 tw-border-blue-200 tw-bg-navy-sky/20 tw-p-6">
                    <h3 className="tw-mb-3 tw-text-lg tw-font-semibold tw-text-ink">
                        <i className="fas fa-info-circle tw-mr-2 tw-text-navy-royal" />
                        Need Help with Your Job Search?
                    </h3>
                    <p className="tw-mb-4 tw-text-gray-200">
                        Leverage our resources to improve your chances of landing your dream role:
                    </p>
                    <div className="tw-grid tw-grid-cols-1 tw-gap-3 md:tw-grid-cols-3">
                        <Link
                            href="/courses"
                            className="tw-flex tw-items-center tw-rounded-md tw-bg-white tw-p-3 tw-shadow-sm tw-transition-shadow hover:tw-shadow-md"
                        >
                            <i className="fas fa-graduation-cap tw-mr-3 tw-text-xl tw-text-primary" />
                            <span className="tw-font-medium">Skill Development</span>
                        </Link>
                        <Link
                            href="/profile"
                            className="tw-flex tw-items-center tw-rounded-md tw-bg-white tw-p-3 tw-shadow-sm tw-transition-shadow hover:tw-shadow-md"
                        >
                            <i className="fas fa-user-edit tw-mr-3 tw-text-xl tw-text-primary" />
                            <span className="tw-font-medium">Update Profile</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

JobsPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    // In development, allow access even without session for testing
    const isDev = process.env.NODE_ENV === "development";
    const devBypass = isDev && context.req.headers.cookie?.includes("dev-bypass=true");

    if (!session?.user && !devBypass) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/jobs",
                permanent: false,
            },
        };
    }

    // Fetch jobs from Job Boardly RSS feed
    const jobs = await getJobs();
    const categories = getCategories(jobs);
    const jobTypes = getJobTypes(jobs);

    // Check if user has course enrollment (optional - for badge display)
    const enrollmentCount = session?.user?.id
        ? await prisma.enrollment.count({
              where: {
                  userId: session.user.id,
              },
          })
        : 0;

    return {
        props: {
            jobs,
            categories,
            jobTypes,
            user: {
                id: session?.user?.id || "dev-user",
                name: session?.user?.name || "Dev User",
                email: session?.user?.email || "dev@vetswhocode.io",
                hasEnrollment: enrollmentCount > 0,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default JobsPage;
