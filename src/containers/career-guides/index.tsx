import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { type Facet, type FamilyStat, facetLabel, facetSubject } from "@/lib/career-guide-facets";
import CategoryShowcase from "./category-showcase";
import CtaBand from "./cta-band";
import Filters from "./filters";
import GridView from "./grid-view";
import Hero from "./hero";
import Pagination from "./pagination";
import SearchBar from "./search-bar";
import StatusBar from "./status-bar";
import type { Branch, Family, GuideEntry, Rank, SortKey } from "./types";

interface Props {
    /** This page's guides (at most PAGE_SIZE) */
    rows: GuideEntry[];
    facet: Facet;
    page: number;
    totalPages: number;
    /** Guides in this facet, across all its pages */
    count: number;
    /** Guides in the whole index */
    total: number;
    branchCounts: Record<Branch, number>;
    familyStats: Record<Family, FamilyStat>;
    familiesCount: number;
    certsCount: number;
}

const RANKS: Rank[] = ["Enlisted", "Warrant", "Officer"];
const SORTS: SortKey[] = ["code", "title", "salaryHigh", "salaryLow", "demand"];

const toSearch = (q: string, rank: "all" | Rank, sort: SortKey): string => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (rank !== "all") params.set("rank", rank.toLowerCase());
    if (sort !== "code") params.set("sort", sort);
    const search = params.toString();
    return search ? `?${search}` : "";
};

const demandWeight = (g: GuideEntry) =>
    g.demand === "Very High" ? 3 : g.demand === "High" ? 2 : 1;

const CareerGuidesContainer = ({
    rows,
    facet,
    page,
    totalPages,
    count,
    total,
    branchCounts,
    familyStats,
    familiesCount,
    certsCount,
}: Props) => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [rank, setRank] = useState<"all" | Rank>("all");
    const [sort, setSort] = useState<SortKey>("code");

    // Static pages hydrate before the router knows the query string, so ?q/?rank/?sort are
    // applied once it is ready, and again after every navigation. They are read from the
    // address bar because the writes below bypass the Next router.
    useEffect(() => {
        if (!router.isReady) return undefined;
        const apply = () => {
            const params = new URLSearchParams(window.location.search);
            setQuery(params.get("q") ?? "");
            setRank(RANKS.find((r) => r.toLowerCase() === params.get("rank")) ?? "all");
            setSort(SORTS.find((s) => s === params.get("sort")) ?? "code");
        };
        apply();
        router.events.on("routeChangeComplete", apply);
        return () => router.events.off("routeChangeComplete", apply);
    }, [router.isReady, router.events]);

    // history.replaceState rather than router.replace: every router change re-runs the blur
    // effect in _app, which would pull focus out of the search box on each keystroke. Next's
    // own history state is kept so back/forward still route.
    const update = (q: string, r: "all" | Rank, s: SortKey) => {
        setQuery(q);
        setRank(r);
        setSort(s);
        const url = `${window.location.pathname}${toSearch(q, r, s)}`;
        window.history.replaceState({ ...window.history.state, as: url }, "", url);
    };

    const search = toSearch(query, rank, sort);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let visible = rows;
        if (rank !== "all") visible = visible.filter((g) => g.rank === rank);
        if (q) {
            visible = visible.filter(
                (g) =>
                    g.code.toLowerCase().includes(q) ||
                    g.title.toLowerCase().includes(q) ||
                    g.civilian.toLowerCase().includes(q) ||
                    g.certs.some((c) => c.toLowerCase().includes(q))
            );
        }
        const sorted = [...visible];
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
    }, [rows, query, rank, sort]);

    const isIndex = facet.kind === "all" && page === 1;
    const crumb = page > 1 ? `${facetLabel(facet)} · Page ${page}` : facetLabel(facet);

    return (
        <>
            <StatusBar total={total} />
            <Hero
                total={total}
                branchCount={5}
                familiesCount={familiesCount}
                certsCount={certsCount}
                branches={["Army", "Navy", "Air Force", "Marine Corps", "Coast Guard"]}
                crumb={isIndex ? undefined : crumb}
                subject={facetSubject(facet)}
            />
            {isIndex && <CategoryShowcase stats={familyStats} />}

            {/* Database */}
            <section
                id="database"
                className="tw-scroll-mt-40 tw-bg-secondary tw-py-16 md:tw-scroll-mt-24 md:tw-py-20"
            >
                <div className="tw-container tw-flex tw-flex-col tw-gap-10">
                    {/* Section title */}
                    <div className="tw-flex tw-flex-col tw-gap-4 md:tw-flex-row md:tw-items-end md:tw-justify-between">
                        <div className="tw-flex tw-flex-col tw-gap-3">
                            <div className="tw-flex tw-items-center tw-gap-3">
                                <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                                <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#DEE2E6]">
                                    Database · {count.toLocaleString()} Guides
                                </span>
                            </div>
                            <h2 className="tw-font-heading tw-font-semibold tw-uppercase tw-text-cream [letter-spacing:-0.02em] [line-height:1] [font-size:clamp(32px,4.5vw,56px)]">
                                Browse the index.
                            </h2>
                        </div>
                        <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#DEE2E6]">
                            Sourced · DoD · Validated · Lightcast
                        </span>
                    </div>

                    <SearchBar guides={rows} query={query} onQuery={(q) => update(q, rank, sort)} />

                    <Filters
                        facet={facet}
                        search={search}
                        branchCounts={branchCounts}
                        familyStats={familyStats}
                        rank={rank}
                        onRank={(r) => update(query, r, sort)}
                        sort={sort}
                        onSort={(s) => update(query, rank, s)}
                        showing={filtered.length}
                        pageRows={rows.length}
                        total={count}
                    />

                    <GridView rows={filtered} />

                    <Pagination facet={facet} page={page} totalPages={totalPages} search={search} />
                </div>
            </section>

            <CtaBand />
        </>
    );
};

export default CareerGuidesContainer;
