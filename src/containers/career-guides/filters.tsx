import clsx from "clsx";
import { BRANCH_META, BRANCH_ORDER } from "./branch-meta";
import { FAMILIES } from "@/lib/career-guides";
import type { Branch, Family, Rank, SortKey } from "./types";

interface Props {
    branchCounts: Record<Branch, number>;
    branch: "all" | Branch;
    onBranch: (v: "all" | Branch) => void;
    rank: "all" | Rank;
    onRank: (v: "all" | Rank) => void;
    family: "all" | Family;
    onFamily: (v: "all" | Family) => void;
    sort: SortKey;
    onSort: (v: SortKey) => void;
    showing: number;
    total: number;
}

const RANK_OPTS: Array<{ key: "all" | Rank; label: string }> = [
    { key: "all", label: "All" },
    { key: "Enlisted", label: "Enlisted" },
    { key: "Warrant", label: "Warrant" },
    { key: "Officer", label: "Officer" },
];

const SORT_OPTS: Array<{ key: SortKey; label: string }> = [
    { key: "code", label: "Code (A→Z)" },
    { key: "title", label: "Title (A→Z)" },
    { key: "salaryHigh", label: "Salary (High→Low)" },
    { key: "salaryLow", label: "Salary (Low→High)" },
    { key: "demand", label: "Demand" },
];

const RAINBOW =
    "linear-gradient(90deg, #6b8050 0%, #6b8050 20%, #5b87c4 20%, #5b87c4 40%, #8eb4d8 40%, #8eb4d8 60%, #d9514a 60%, #d9514a 80%, #e89149 80%, #e89149 100%)";

const Filters = ({
    branchCounts,
    branch,
    onBranch,
    rank,
    onRank,
    family,
    onFamily,
    sort,
    onSort,
    showing,
    total,
}: Props) => {
    const allCount = BRANCH_ORDER.reduce((sum, b) => sum + branchCounts[b], 0);

    return (
        <div className="tw-flex tw-flex-col tw-gap-6">
            {/* Branch chips */}
            <div className="tw-flex tw-flex-wrap tw-gap-2">
                <button
                    type="button"
                    onClick={() => onBranch("all")}
                    className={clsx(
                        "tw-flex tw-items-center tw-gap-2.5 tw-border tw-px-3.5 tw-py-2 tw-font-mono tw-text-[11.5px] tw-uppercase tw-tracking-[0.08em] tw-transition-colors",
                        branch === "all"
                            ? "tw-border-accent tw-bg-accent tw-text-secondary"
                            : "tw-border-cream/[0.18] tw-bg-secondary tw-text-[#c4cad6] hover:tw-border-[#8590a6] hover:tw-text-cream",
                    )}
                >
                    <span
                        aria-hidden
                        className="tw-h-2 tw-w-2"
                        style={{ backgroundImage: RAINBOW }}
                    />
                    All
                    <span
                        className={clsx(
                            "tw-tabular-nums",
                            branch === "all" ? "tw-text-secondary/60" : "tw-text-[#8590a6]",
                        )}
                    >
                        {allCount.toLocaleString()}
                    </span>
                </button>
                {BRANCH_ORDER.map((b) => {
                    const active = branch === b;
                    return (
                        <button
                            type="button"
                            key={b}
                            onClick={() => onBranch(b)}
                            className={clsx(
                                "tw-flex tw-items-center tw-gap-2.5 tw-border tw-px-3.5 tw-py-2 tw-font-mono tw-text-[11.5px] tw-uppercase tw-tracking-[0.08em] tw-transition-colors",
                                active
                                    ? "tw-border-accent tw-bg-accent tw-text-secondary"
                                    : "tw-border-cream/[0.18] tw-bg-secondary tw-text-[#c4cad6] hover:tw-border-[#8590a6] hover:tw-text-cream",
                            )}
                        >
                            <span
                                aria-hidden
                                className="tw-h-2 tw-w-2"
                                style={{ backgroundColor: BRANCH_META[b].color }}
                            />
                            {BRANCH_META[b].short}
                            <span
                                className={clsx(
                                    "tw-tabular-nums",
                                    active ? "tw-text-secondary/60" : "tw-text-[#8590a6]",
                                )}
                            >
                                {branchCounts[b].toLocaleString()}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Facet bar */}
            <div className="tw-flex tw-flex-col tw-gap-6 tw-border-t tw-border-cream/10 tw-border-b tw-py-5 lg:tw-flex-row lg:tw-flex-wrap lg:tw-items-center">
                {/* Rank segmented */}
                <div className="tw-flex tw-items-center tw-gap-3">
                    <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                        Rank
                    </span>
                    <div className="tw-flex tw-border tw-border-cream/[0.18]">
                        {RANK_OPTS.map((r) => (
                            <button
                                key={r.key}
                                type="button"
                                onClick={() => onRank(r.key)}
                                className={clsx(
                                    "tw-px-3 tw-py-1.5 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-transition-colors",
                                    rank === r.key
                                        ? "tw-bg-accent tw-text-secondary"
                                        : "tw-bg-secondary tw-text-[#c4cad6] hover:tw-text-cream",
                                )}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Family */}
                <label className="tw-flex tw-items-center tw-gap-3">
                    <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                        Family
                    </span>
                    <select
                        value={family}
                        onChange={(e) => onFamily(e.target.value as Family | "all")}
                        className="tw-border tw-border-cream/[0.18] tw-bg-secondary tw-px-3 tw-py-1.5 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-cream tw-outline-none focus:tw-border-accent"
                    >
                        <option value="all">All families</option>
                        {FAMILIES.map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Sort */}
                <label className="tw-flex tw-items-center tw-gap-3">
                    <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                        Sort
                    </span>
                    <select
                        value={sort}
                        onChange={(e) => onSort(e.target.value as SortKey)}
                        className="tw-border tw-border-cream/[0.18] tw-bg-secondary tw-px-3 tw-py-1.5 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-cream tw-outline-none focus:tw-border-accent"
                    >
                        {SORT_OPTS.map((s) => (
                            <option key={s.key} value={s.key}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </label>

                <span className="tw-ml-auto tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#8590a6]">
                    Showing{" "}
                    <span className="tw-font-bold tw-text-cream tw-tabular-nums">
                        {showing.toLocaleString()}
                    </span>{" "}
                    of{" "}
                    <span className="tw-font-bold tw-text-cream tw-tabular-nums">
                        {total.toLocaleString()}
                    </span>{" "}
                    Guides
                </span>
            </div>
        </div>
    );
};

export default Filters;
