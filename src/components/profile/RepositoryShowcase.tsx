import { useState } from "react";
import { motion } from "framer-motion";
import type { GitHubRepo } from "@/types/profile";
import { GITHUB_LANGUAGE_COLORS } from "@/types/profile";

interface RepositoryShowcaseProps {
    repos: GitHubRepo[];
    isLoading: boolean;
}

type SortKey = "stars" | "updated" | "name";

const RepositoryShowcase = ({ repos, isLoading }: RepositoryShowcaseProps) => {
    const [sortBy, setSortBy] = useState<SortKey>("stars");
    const [filterLang, setFilterLang] = useState<string>("");

    if (isLoading) {
        return (
            <div className="tw-space-y-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="tw-h-32 tw-rounded-lg tw-bg-navy/5 tw-animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (repos.length === 0) {
        return (
            <div className="tw-rounded-lg tw-border tw-border-dashed tw-border-navy/20 tw-p-12 tw-text-center">
                <i className="fas fa-box-open tw-text-4xl tw-text-navy/20 tw-mb-3" />
                <p className="tw-font-mono tw-text-sm tw-text-gray-300">No repositories found</p>
            </div>
        );
    }

    // Get unique languages for filter
    const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[];

    const sorted = [...repos]
        .filter((r) => !filterLang || r.language === filterLang)
        .sort((a, b) => {
            if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
            if (sortBy === "updated")
                return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
            return a.name.localeCompare(b.name);
        })
        .slice(0, 20);

    return (
        <div>
            {/* Controls */}
            <div className="tw-mb-4 tw-flex tw-flex-wrap tw-gap-3 tw-items-center">
                <div className="tw-flex tw-gap-1 tw-font-mono tw-text-xs">
                    {(["stars", "updated", "name"] as SortKey[]).map((key) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setSortBy(key)}
                            className={`tw-rounded tw-px-3 tw-py-1 tw-uppercase tw-tracking-wider tw-transition-all ${
                                sortBy === key
                                    ? "tw-bg-navy tw-text-gold"
                                    : "tw-bg-navy/5 tw-text-gray-300 hover:tw-bg-navy/10"
                            }`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
                {languages.length > 1 && (
                    <select
                        value={filterLang}
                        onChange={(e) => setFilterLang(e.target.value)}
                        title="Filter by language"
                        className="tw-rounded tw-border tw-border-navy/10 tw-bg-white tw-px-3 tw-py-1 tw-font-mono tw-text-xs tw-text-navy"
                    >
                        <option value="">All Languages</option>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Repo list */}
            <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                {sorted.map((repo, i) => (
                    <motion.a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="tw-block tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-5 tw-shadow-sm tw-transition-all hover:tw-border-gold/30 hover:tw-shadow-md hover:-tw-translate-y-0.5"
                    >
                        <div className="tw-flex tw-items-start tw-justify-between">
                            <h4 className="tw-font-mono tw-text-sm tw-font-bold tw-text-navy">
                                {repo.name}
                            </h4>
                            <div className="tw-flex tw-gap-3 tw-font-mono tw-text-xs tw-text-gray-300">
                                {repo.stargazers_count > 0 && (
                                    <span>
                                        <i className="fas fa-star tw-mr-1 tw-text-gold" />
                                        {repo.stargazers_count}
                                    </span>
                                )}
                                {repo.forks_count > 0 && (
                                    <span>
                                        <i className="fas fa-code-branch tw-mr-1" />
                                        {repo.forks_count}
                                    </span>
                                )}
                            </div>
                        </div>
                        {repo.description && (
                            <p className="tw-mt-2 tw-text-xs tw-text-gray-300 tw-line-clamp-2">
                                {repo.description}
                            </p>
                        )}
                        <div className="tw-mt-3 tw-flex tw-flex-wrap tw-items-center tw-gap-2">
                            {repo.language && (
                                <span className="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-gray-300">
                                    <span
                                        className="tw-inline-block tw-h-2.5 tw-w-2.5 tw-rounded-full"
                                        style={{
                                            backgroundColor:
                                                GITHUB_LANGUAGE_COLORS[repo.language] || "#8b8b8b",
                                        }}
                                    />
                                    {repo.language}
                                </span>
                            )}
                            {repo.topics?.slice(0, 3).map((topic) => (
                                <span
                                    key={topic}
                                    className="tw-rounded-full tw-bg-navy/5 tw-px-2 tw-py-0.5 tw-font-mono tw-text-[10px] tw-text-navy/60"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

export default RepositoryShowcase;
