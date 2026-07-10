import clsx from "clsx";
import Link from "next/link";
import { BRANCH_META } from "./branch-meta";
import type { GuideEntry } from "./types";

interface Props {
    rows: GuideEntry[];
}

const GuideCard = ({ g }: { g: GuideEntry }) => {
    const meta = BRANCH_META[g.branch];
    const visibleCerts = g.certs.slice(0, 4);
    const extra = g.certs.length - visibleCerts.length;

    return (
        <Link
            href={`/career-guides/${g.slug}`}
            className={clsx(
                "tw-group tw-relative tw-flex tw-flex-col tw-gap-5 tw-border-t tw-border-l tw-border-cream/10 tw-bg-secondary tw-p-6 tw-transition-colors tw-duration-150",
                "hover:tw-border-accent hover:tw-bg-[#003559]"
            )}
        >
            {/* Top: code + branch */}
            <div className="tw-flex tw-items-start tw-justify-between">
                <span className="tw-font-mono tw-text-[13.5px] tw-tracking-[0.04em] tw-text-cream">
                    {g.featured && (
                        <span aria-hidden={true} className="tw-mr-1 tw-text-accent">
                            ★
                        </span>
                    )}
                    {g.code}
                </span>
                <span className="tw-flex tw-items-center tw-gap-2 tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#DEE2E6]">
                    <span
                        aria-hidden={true}
                        className="tw-h-2 tw-w-2"
                        style={{ backgroundColor: meta.color }}
                    />
                    {meta.short}
                </span>
            </div>

            {/* Title + civilian */}
            <div className="tw-flex tw-flex-col tw-gap-1.5">
                <span className="tw-font-heading tw-text-[19px] tw-font-medium tw-uppercase tw-leading-[1.2] tw-text-cream [letter-spacing:-0.01em]">
                    {g.title}
                </span>
                <span className="tw-font-body tw-text-[13.5px] tw-leading-[1.45] tw-text-[#6C757D]">
                    → {g.civilian}
                </span>
            </div>

            {/* Salary + rank */}
            <div className="tw-flex tw-items-center tw-justify-between tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                <span>
                    <span className="tw-text-cream tw-tabular-nums">
                        ${g.salaryLow}–{g.salaryHigh}
                    </span>
                    <span className="tw-ml-1 tw-text-[#495057]">K</span> civilian
                </span>
                <span>{g.rank}</span>
            </div>

            {/* Certs row + arrow */}
            <div className="tw-mt-auto tw-flex tw-items-end tw-justify-between tw-gap-3">
                <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                    {visibleCerts.map((c) => (
                        <span
                            key={c}
                            className="tw-border tw-border-cream/10 tw-px-2 tw-py-1 tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-[0.08em] tw-text-[#DEE2E6]"
                        >
                            {c}
                        </span>
                    ))}
                    {extra > 0 && (
                        <span className="tw-border tw-border-dashed tw-border-cream/[0.18] tw-px-2 tw-py-1 tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-[0.08em] tw-text-[#6C757D]">
                            +{extra}
                        </span>
                    )}
                </div>
                <span
                    aria-hidden={true}
                    className="tw-shrink-0 tw-font-mono tw-text-[16px] tw-text-[#6C757D] tw-transition-colors group-hover:tw-text-accent"
                >
                    →
                </span>
            </div>
        </Link>
    );
};

const GridView = ({ rows }: Props) => {
    if (rows.length === 0) {
        return (
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-2 tw-py-24 tw-text-center">
                <span className="tw-font-heading tw-text-[28px] tw-font-semibold tw-uppercase tw-text-cream [letter-spacing:-0.02em]">
                    No matches.
                </span>
                <span className="tw-font-body tw-text-[15px] tw-text-[#6C757D]">
                    Try a different code, branch, or career family.
                </span>
            </div>
        );
    }

    return (
        <div
            className="tw-grid tw-border-r tw-border-b tw-border-cream/10"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
        >
            {rows.map((g) => (
                <GuideCard key={`${g.branch}-${g.code}`} g={g} />
            ))}
        </div>
    );
};

export default GridView;
