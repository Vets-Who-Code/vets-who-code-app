import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { useMemo, useState } from "react";

interface GuideEntry {
    code: string;
    title: string;
    branch: string;
}

type TProps = {
    guides: GuideEntry[];
    branches: string[];
};

type PageWithLayout = NextPage<TProps> & {
    Layout?: typeof Layout01;
};

const BRANCH_ORDER = ["Army", "Navy", "Air Force", "Marine Corps", "Coast Guard"];

const CareerGuidesPage: PageWithLayout = ({ guides, branches }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");

    const filteredGuides = useMemo(() => {
        let filtered = guides;
        if (selectedBranch) {
            filtered = filtered.filter((g) => g.branch === selectedBranch);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (g) =>
                    g.code.toLowerCase().includes(q) ||
                    g.title.toLowerCase().includes(q)
            );
        }
        return filtered;
    }, [guides, searchQuery, selectedBranch]);

    const sortedBranches = useMemo(
        () => branches.sort((a, b) => BRANCH_ORDER.indexOf(a) - BRANCH_ORDER.indexOf(b)),
        [branches]
    );

    return (
        <>
            <SEO
                title="Military Career Guides by Job Code"
                description="Browse career guides for every military job code. Find civilian career pathways, certification equivalencies, training data, and salary information for your MOS, rating, or AFSC."
            />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Career Guides"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                <div className="tw-mx-auto tw-max-w-5xl">
                    <div className="tw-mb-10">
                        <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-[#091f40] tw-mb-2">
                            Military Career Guides
                        </h1>
                        <p className="tw-text-lg tw-text-gray-600">
                            Browse {guides.length.toLocaleString()} career guides across all branches. Each guide includes civilian career pathways, certification equivalencies, training data, and salary information.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 tw-mb-8">
                        <div className="tw-flex-1">
                            <input
                                type="text"
                                placeholder="Search by job code or title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-lg tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#091f40] focus:tw-border-transparent"
                                aria-label="Search job codes"
                            />
                        </div>
                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedBranch("")}
                                className={`tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-medium tw-transition-colors ${
                                    selectedBranch === ""
                                        ? "tw-bg-[#091f40] tw-text-white"
                                        : "tw-bg-gray-100 tw-text-gray-700 hover:tw-bg-gray-200"
                                }`}
                            >
                                All
                            </button>
                            {sortedBranches.map((branch) => (
                                <button
                                    key={branch}
                                    type="button"
                                    onClick={() => setSelectedBranch(branch)}
                                    className={`tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-medium tw-transition-colors ${
                                        selectedBranch === branch
                                            ? "tw-bg-[#091f40] tw-text-white"
                                            : "tw-bg-gray-100 tw-text-gray-700 hover:tw-bg-gray-200"
                                    }`}
                                >
                                    {branch}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="tw-text-sm tw-text-gray-500 tw-mb-4">
                        Showing {filteredGuides.length.toLocaleString()} of {guides.length.toLocaleString()} guides
                    </p>

                    {/* Guide list */}
                    {filteredGuides.length === 0 ? (
                        <div className="tw-text-center tw-py-12">
                            <p className="tw-text-gray-500 tw-text-lg">No guides found matching your search.</p>
                            <button
                                type="button"
                                onClick={() => { setSearchQuery(""); setSelectedBranch(""); }}
                                className="tw-mt-4 tw-text-[#091f40] tw-underline tw-text-sm"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-3">
                            {filteredGuides.map((guide) => (
                                <Link
                                    key={guide.code}
                                    href={`/career-guides/${guide.code.toLowerCase()}`}
                                    className="tw-block tw-border tw-border-gray-200 tw-rounded-lg tw-p-4 hover:tw-border-[#091f40] hover:tw-shadow-sm tw-transition-all"
                                >
                                    <div className="tw-flex tw-items-start tw-justify-between">
                                        <div>
                                            <span className="tw-font-bold tw-text-[#091f40] tw-text-sm">
                                                {guide.code}
                                            </span>
                                            <p className="tw-text-sm tw-text-gray-700 tw-mt-0.5">
                                                {guide.title}
                                            </p>
                                        </div>
                                        <span className="tw-text-xs tw-bg-gray-100 tw-text-gray-500 tw-px-2 tw-py-0.5 tw-rounded tw-whitespace-nowrap tw-ml-2">
                                            {guide.branch}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    {/* Resume Translator CTA */}
                    <div className="tw-mt-12 tw-bg-gradient-to-r tw-from-[#091f40] tw-to-[#1a3a6b] tw-rounded-lg tw-p-8 tw-text-white">
                        <h2 className="tw-text-2xl tw-font-bold tw-mb-2 tw-text-white">
                            Translate Your Resume
                        </h2>
                        <p className="tw-text-white tw-mb-4">
                            Use our AI-powered translator to convert your military experience into ATS-optimized civilian resume language.
                        </p>
                        <Link
                            href="/resume-translator"
                            className="tw-inline-block tw-bg-[#c5a44e] tw-text-[#091f40] tw-font-bold tw-px-6 tw-py-3 tw-rounded-lg hover:tw-bg-[#d4b55e] tw-transition-colors"
                        >
                            Start Free Translation
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

CareerGuidesPage.Layout = Layout01;

export const getStaticProps: GetStaticProps = async () => {
    const trainingMap = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "src/data/training-pipeline.json"), "utf-8")
    ) as Record<string, { branch: string; title: string }>;

    const guides: GuideEntry[] = Object.entries(trainingMap)
        .map(([code, data]) => ({
            code,
            title: data.title,
            branch: data.branch,
        }))
        .sort((a, b) => a.code.localeCompare(b.code));

    const branches = [...new Set(guides.map((g) => g.branch))];

    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
            guides,
            branches,
        },
    };
};

export default CareerGuidesPage;
