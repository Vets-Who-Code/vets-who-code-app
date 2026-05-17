import { useCallback, useEffect, useMemo, useState } from "react";
import CategoryShowcase from "./category-showcase";
import CtaBand from "./cta-band";
import Filters from "./filters";
import GridView from "./grid-view";
import Hero from "./hero";
import SearchBar from "./search-bar";
import StatusBar from "./status-bar";
import type { Branch, Family, GuideEntry, Rank, SortKey } from "./types";

interface Props {
    guides: GuideEntry[];
    branchCounts: Record<Branch, number>;
    familiesCount: number;
    certsCount: number;
}

const PAGE_SIZE = 60;
const SCROLL_OFFSET = 96;

const demandWeight = (g: GuideEntry) =>
    g.demand === "Very High" ? 3 : g.demand === "High" ? 2 : 1;

const CareerGuidesContainer = ({ guides, branchCounts, familiesCount, certsCount }: Props) => {
    const [query, setQuery] = useState("");
    const [branch, setBranch] = useState<"all" | Branch>("all");
    const [rank, setRank] = useState<"all" | Rank>("all");
    const [family, setFamily] = useState<"all" | Family>("all");
    const [sort, setSort] = useState<SortKey>("code");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let rows = guides;
        if (branch !== "all") rows = rows.filter((g) => g.branch === branch);
        if (rank !== "all") rows = rows.filter((g) => g.rank === rank);
        if (family !== "all") rows = rows.filter((g) => g.family === family);
        if (q) {
            rows = rows.filter(
                (g) =>
                    g.code.toLowerCase().includes(q) ||
                    g.title.toLowerCase().includes(q) ||
                    g.civilian.toLowerCase().includes(q) ||
                    g.certs.some((c) => c.toLowerCase().includes(q)),
            );
        }
        const sorted = [...rows];
        sorted.sort((a, b) => {
            switch (sort) {
                case "title":
                    return a.title.localeCompare(b.title);
                case "salaryHigh":
                    return b.salaryHigh - a.salaryHigh;
                case "salaryLow":
                    return a.salaryLow - b.salaryLow;
                case "demand":
                    return demandWeight(b) - demandWeight(a);
                default:
                    return a.code.localeCompare(b.code);
            }
        });
        return sorted;
    }, [guides, query, branch, rank, family, sort]);

    // Reset pagination whenever the filtered set changes shape.
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [query, branch, rank, family, sort]);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    const scrollToDatabase = useCallback(() => {
        if (typeof window === "undefined") return;
        const el = document.getElementById("database");
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
    }, []);

    const onPickCategory = useCallback(
        (f: Family) => {
            setFamily(f);
            scrollToDatabase();
        },
        [scrollToDatabase],
    );

    return (
        <>
            <StatusBar total={guides.length} />
            <Hero
                total={guides.length}
                branchCount={5}
                familiesCount={familiesCount}
                certsCount={certsCount}
                branches={["Army", "Navy", "Air Force", "Marine Corps", "Coast Guard"]}
            />
            <CategoryShowcase guides={guides} onPick={onPickCategory} />

            {/* Database */}
            <section
                id="database"
                className="tw-bg-secondary tw-py-16 md:tw-py-20"
            >
                <div className="tw-container tw-flex tw-flex-col tw-gap-10">
                    {/* Section title */}
                    <div className="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row md:tw-items-end md:tw-justify-between">
                        <div className="tw-flex tw-flex-col tw-gap-3">
                            <div className="tw-flex tw-items-center tw-gap-3">
                                <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                                <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                                    Database · {guides.length.toLocaleString()} Guides
                                </span>
                            </div>
                            <h2 className="tw-font-heading tw-font-semibold tw-uppercase tw-text-cream [letter-spacing:-0.02em] [line-height:1] [font-size:clamp(32px,4.5vw,56px)]">
                                Search the index.
                            </h2>
                        </div>
                        <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#8590a6]">
                            Sourced · DoD · Validated · Lightcast
                        </span>
                    </div>

                    <SearchBar guides={guides} query={query} onQuery={setQuery} />

                    <Filters
                        branchCounts={branchCounts}
                        branch={branch}
                        onBranch={setBranch}
                        rank={rank}
                        onRank={setRank}
                        family={family}
                        onFamily={setFamily}
                        sort={sort}
                        onSort={setSort}
                        showing={filtered.length}
                        total={guides.length}
                    />

                    <GridView rows={visible} />

                    {hasMore && (
                        <div className="tw-flex tw-justify-center">
                            <button
                                type="button"
                                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                                className="tw-inline-flex tw-items-center tw-gap-2 tw-border tw-border-cream/[0.18] tw-px-7 tw-py-4 tw-font-mono tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-[0.1em] tw-text-cream tw-transition-colors hover:tw-border-accent hover:tw-text-accent active:tw-scale-[0.97]"
                            >
                                Load {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default CareerGuidesContainer;
