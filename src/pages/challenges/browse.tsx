import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { options } from "@/pages/api/auth/options";

type Difficulty = "warmup" | "easy" | "medium" | "hard";
type Language = "javascript" | "typescript" | "python";

interface CatalogItem {
    challenge_id: string;
    title: string;
    difficulty: Difficulty;
    topic: string;
    curriculum_module: number;
    language: Language;
}

interface CatalogResponse {
    items: CatalogItem[];
    pagination: {
        limit: number;
        offset: number;
        total: number;
        next_offset: number | null;
    };
}

interface TopicsResponse {
    module: number | null;
    topics: string[];
}

const DIFFICULTIES: Difficulty[] = ["warmup", "easy", "medium", "hard"];
const PAGE_SIZE = 20;

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

const BrowseChallengesPage: PageWithLayout = () => {
    const [moduleFilter, setModuleFilter] = useState<number | "">("");
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "">("");
    const [topicFilter, setTopicFilter] = useState<string>("");
    const [topics, setTopics] = useState<string[]>([]);
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [pagination, setPagination] = useState<CatalogResponse["pagination"] | null>(null);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        if (moduleFilter !== "") params.set("module", String(moduleFilter));
        if (difficultyFilter) params.set("difficulty", difficultyFilter);
        if (topicFilter) params.set("topic", topicFilter);
        params.set("limit", String(PAGE_SIZE));
        params.set("offset", String(offset));
        return params.toString();
    }, [moduleFilter, difficultyFilter, topicFilter, offset]);

    const fetchTopics = useCallback(async (mod: number | "") => {
        try {
            const url =
                mod !== ""
                    ? `/api/j0di3/challenges/topics?module=${mod}`
                    : "/api/j0di3/challenges/topics";
            const res = await fetch(url);
            if (res.ok) {
                const body = (await res.json()) as TopicsResponse;
                setTopics(body.topics ?? []);
            }
        } catch {
            // non-critical — topic chip area just stays empty
        }
    }, []);

    const fetchCatalog = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/j0di3/challenges/list?${queryString}`);
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Failed to load catalog");
            }
            const body = (await res.json()) as CatalogResponse;
            setItems(body.items ?? []);
            setPagination(body.pagination ?? null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load catalog");
        } finally {
            setIsLoading(false);
        }
    }, [queryString]);

    useEffect(() => {
        fetchTopics(moduleFilter);
        // changing the module clears the topic filter so we don't keep a
        // topic that doesn't exist in the new module
        setTopicFilter("");
    }, [moduleFilter, fetchTopics]);

    useEffect(() => {
        fetchCatalog();
    }, [fetchCatalog]);

    const resetFilters = () => {
        setModuleFilter("");
        setDifficultyFilter("");
        setTopicFilter("");
        setOffset(0);
    };

    const difficultyColor = (d: Difficulty) => {
        switch (d) {
            case "warmup":
                return "tw-bg-emerald-100 tw-text-emerald-800";
            case "easy":
                return "tw-bg-green-100 tw-text-green-800";
            case "medium":
                return "tw-bg-yellow-100 tw-text-yellow-800";
            case "hard":
                return "tw-bg-red-100 tw-text-red-800";
        }
    };

    return (
        <>
            <SEO title="Browse Challenges" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/challenges", label: "challenges" },
                ]}
                currentPage="Browse"
                showTitle={false}
            />

            <div className="tw-container tw-py-12">
                <div className="tw-mb-8">
                    <h1 className="tw-text-3xl tw-font-bold tw-text-ink tw-mb-2">
                        Challenge Catalog
                    </h1>
                    <p className="tw-text-navy/60">
                        Browse the full Hashflag Stack challenge library. Filter by module,
                        difficulty, or topic.
                    </p>
                </div>

                {/* Filters */}
                <div className="tw-mb-6 tw-rounded-lg tw-bg-white tw-p-4 tw-shadow-sm tw-space-y-4">
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-3">
                        <div>
                            <label
                                htmlFor="module"
                                className="tw-block tw-text-xs tw-font-mono tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-1"
                            >
                                Module
                            </label>
                            <select
                                id="module"
                                value={moduleFilter}
                                onChange={(e) => {
                                    setOffset(0);
                                    setModuleFilter(e.target.value === "" ? "" : Number(e.target.value));
                                }}
                                className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                            >
                                <option value="">All modules</option>
                                {Array.from({ length: 25 }, (_, i) => i + 1).map((m) => (
                                    <option key={m} value={m}>
                                        Module {m}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="difficulty"
                                className="tw-block tw-text-xs tw-font-mono tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-1"
                            >
                                Difficulty
                            </label>
                            <select
                                id="difficulty"
                                value={difficultyFilter}
                                onChange={(e) => {
                                    setOffset(0);
                                    setDifficultyFilter(e.target.value as Difficulty | "");
                                }}
                                className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                            >
                                <option value="">Any</option>
                                {DIFFICULTIES.map((d) => (
                                    <option key={d} value={d}>
                                        {d.charAt(0).toUpperCase() + d.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="tw-flex tw-items-end">
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5"
                            >
                                Reset filters
                            </button>
                        </div>
                    </div>

                    {/* Topic chips */}
                    {topics.length > 0 && (
                        <div>
                            <div className="tw-block tw-text-xs tw-font-mono tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                                Topic
                            </div>
                            <div className="tw-flex tw-flex-wrap tw-gap-2">
                                {topics.map((t) => {
                                    const active = topicFilter === t;
                                    return (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => {
                                                setOffset(0);
                                                setTopicFilter(active ? "" : t);
                                            }}
                                            className={`tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-transition-colors ${
                                                active
                                                    ? "tw-bg-primary tw-text-white"
                                                    : "tw-bg-navy/5 tw-text-ink/80 hover:tw-bg-navy/10"
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                {error && (
                    <div className="tw-mb-4 tw-rounded-md tw-border tw-border-red-200 tw-bg-red-50 tw-p-3 tw-text-sm tw-text-red-700">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-text-center tw-shadow-sm">
                        <p className="tw-text-navy/60">Loading challenges...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-text-center tw-shadow-sm">
                        <p className="tw-text-navy/60">No challenges match these filters.</p>
                    </div>
                ) : (
                    <ul className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
                        {items.map((item) => (
                            <li key={item.challenge_id}>
                                <Link
                                    href={`/challenges/${item.challenge_id}`}
                                    className="tw-block tw-h-full tw-rounded-lg tw-bg-white tw-p-4 tw-shadow-sm tw-transition-shadow hover:tw-shadow-md hover:tw-border-primary tw-border tw-border-transparent"
                                >
                                    <div className="tw-flex tw-items-start tw-justify-between tw-gap-2 tw-mb-2">
                                        <h3 className="tw-text-base tw-font-semibold tw-text-ink tw-line-clamp-2">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="tw-flex tw-flex-wrap tw-gap-1.5 tw-mb-2">
                                        <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-blue-800">
                                            {item.topic}
                                        </span>
                                        <span
                                            className={`tw-rounded-full tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium ${difficultyColor(
                                                item.difficulty
                                            )}`}
                                        >
                                            {item.difficulty}
                                        </span>
                                        <span className="tw-rounded-full tw-bg-navy/5 tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-ink/70">
                                            Module {item.curriculum_module}
                                        </span>
                                    </div>
                                    <div className="tw-text-xs tw-text-ink/50 tw-font-mono">
                                        {item.language}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pagination */}
                {pagination && (
                    <div className="tw-mt-6 tw-flex tw-items-center tw-justify-between tw-text-sm">
                        <div className="tw-text-ink/60">
                            Showing {pagination.offset + 1}–
                            {Math.min(pagination.offset + items.length, pagination.total)} of{" "}
                            {pagination.total}
                        </div>
                        <div className="tw-flex tw-gap-2">
                            <button
                                type="button"
                                onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
                                disabled={offset === 0 || isLoading}
                                className="tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-1.5 tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5 disabled:tw-opacity-40"
                            >
                                ← Previous
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (pagination.next_offset !== null) {
                                        setOffset(pagination.next_offset);
                                    }
                                }}
                                disabled={pagination.next_offset === null || isLoading}
                                className="tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-1.5 tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5 disabled:tw-opacity-40"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

BrowseChallengesPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, options);
    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/challenges/browse",
                permanent: false,
            },
        };
    }
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

export default BrowseChallengesPage;
