import { BRANCH_ORDER } from "@containers/career-guides/branch-meta";
import type { GuideEntry } from "@containers/career-guides/types";
import {
    ALL_FACETS,
    BRANCH_SLUGS,
    computeFamilyStats,
    FAMILIES,
    FAMILY_SLUGS,
    facetHref,
    facetRows,
    facetSeo,
    loadFacetGuides,
    PAGE_SIZE,
    paginate,
    parseFacetSegments,
} from "@/lib/career-guide-facets";

const guide = (overrides: Partial<GuideEntry>): GuideEntry => ({
    code: "0000",
    slug: "0000",
    title: "Title",
    branch: "Army",
    rank: "Enlisted",
    family: "Other",
    civilian: "Civilian",
    salaryLow: 50,
    salaryHigh: 80,
    certs: [],
    demand: "Steady",
    ...overrides,
});

const segmentsOf = (href: string) => href.split("/").slice(2);

describe("career-guide-facets", () => {
    it("gives every branch and family a distinct slug that parses back to it", () => {
        for (const branch of BRANCH_ORDER) {
            expect(parseFacetSegments(["branch", BRANCH_SLUGS[branch]])).toEqual({
                facet: { kind: "branch", value: branch },
                page: 1,
            });
        }
        for (const family of FAMILIES) {
            expect(parseFacetSegments(["family", FAMILY_SLUGS[family]])).toEqual({
                facet: { kind: "family", value: family },
                page: 1,
            });
        }
        const slugs = [...Object.values(BRANCH_SLUGS), ...Object.values(FAMILY_SLUGS)];
        expect(new Set(slugs).size).toBe(slugs.length);
        expect(ALL_FACETS).toHaveLength(1 + BRANCH_ORDER.length + FAMILIES.length);
    });

    it("builds facet URLs without ever emitting /page/1", () => {
        expect(facetHref({ kind: "all" }, 1)).toBe("/career-guides");
        expect(facetHref({ kind: "all" }, 2)).toBe("/career-guides/page/2");
        expect(facetHref({ kind: "branch", value: "Air Force" }, 1)).toBe(
            "/career-guides/branch/air-force"
        );
        expect(facetHref({ kind: "branch", value: "Air Force" }, 7)).toBe(
            "/career-guides/branch/air-force/page/7"
        );
        expect(facetHref({ kind: "family", value: "IT / Comms" }, 3)).toBe(
            "/career-guides/family/it-comms/page/3"
        );
    });

    it("parses exactly the URLs facetHref builds", () => {
        for (const facet of ALL_FACETS) {
            for (const page of [2, 31]) {
                expect(parseFacetSegments(segmentsOf(facetHref(facet, page)))).toEqual({
                    facet,
                    page,
                });
            }
        }
        expect(parseFacetSegments(["branch", "army", "page", "2"])).toEqual({
            facet: { kind: "branch", value: "Army" },
            page: 2,
        });
    });

    it.each([
        [[]],
        [["page"]],
        [["page", "1"]],
        [["page", "0"]],
        [["page", "02"]],
        [["page", "x"]],
        [["branch", "army", "page", "1"]],
        [["branch", "army", "pages", "2"]],
        [["branch", "army", "page"]],
        [["branch", "space-force"]],
        [["branch", "Army"]],
        [["family", "it"]],
        [["rank", "officer"]],
        [["page", "2", "page", "3"]],
    ])("rejects %j", (segments) => {
        expect(parseFacetSegments(segments)).toBeNull();
    });

    it("slices pages of PAGE_SIZE and counts the last partial page", () => {
        const items = Array.from({ length: PAGE_SIZE + 1 }, (_, i) => i);
        expect(paginate(items, 1).rows).toHaveLength(PAGE_SIZE);
        expect(paginate(items, 2)).toEqual({ rows: [PAGE_SIZE], totalPages: 2 });
        expect(paginate(items, 3).rows).toEqual([]);
    });

    it("filters rows to the facet", () => {
        const rows = [
            guide({ slug: "a", branch: "Army", family: "Cyber" }),
            guide({ slug: "b", branch: "Navy", family: "Cyber" }),
            guide({ slug: "c", branch: "Navy", family: "Medical" }),
        ];
        expect(facetRows(rows, { kind: "all" })).toHaveLength(3);
        expect(facetRows(rows, { kind: "branch", value: "Navy" }).map((g) => g.slug)).toEqual([
            "b",
            "c",
        ]);
        expect(facetRows(rows, { kind: "family", value: "Cyber" }).map((g) => g.slug)).toEqual([
            "a",
            "b",
        ]);
    });

    it("computes family counts and the showcase's median salary band", () => {
        const stats = computeFamilyStats([
            guide({ family: "Cyber", salaryLow: 90, salaryHigh: 150 }),
            guide({ family: "Cyber", salaryLow: 60, salaryHigh: 100 }),
            guide({ family: "Cyber", salaryLow: 70, salaryHigh: 110 }),
            guide({ family: "Medical", salaryLow: 40, salaryHigh: 70 }),
            guide({ family: "Medical", salaryLow: 50, salaryHigh: 90 }),
        ]);
        // Same arithmetic the showcase used client-side: sorted, element at floor(n / 2).
        expect(stats.Cyber).toEqual({ count: 3, medianLow: 70, medianHigh: 110 });
        expect(stats.Medical).toEqual({ count: 2, medianLow: 50, medianHigh: 90 });
        expect(stats.Aviation).toEqual({ count: 0, medianLow: 0, medianHigh: 0 });
    });

    it("writes titles and descriptions for the query, numbered past page 1", () => {
        expect(facetSeo({ kind: "branch", value: "Army" }, 1, 990, 17)).toEqual({
            title: "Army MOS to Civilian Tech Careers",
            description:
                "Browse 990 Army MOS career guides. Each job code maps to a civilian career with salary bands, certifications, and demand signals from Lightcast labor data.",
        });
        const page2 = facetSeo({ kind: "branch", value: "Army" }, 2, 990, 17);
        expect(page2.title).toBe("Army MOS to Civilian Tech Careers — Page 2 of 17");
        expect(page2.description).toMatch(/ Page 2 of 17\.$/);
        expect(facetSeo({ kind: "family", value: "Cyber" }, 1, 192, 4).title).toBe(
            "Military Cyber Jobs to Civilian Tech Careers"
        );
        expect(facetSeo({ kind: "family", value: "Other" }, 1, 1545, 26).title).toBe(
            "Other Military Jobs to Civilian Tech Careers"
        );
        expect(facetSeo({ kind: "all" }, 3, 4202, 71).title).toBe(
            "Military Job Codes to Civilian Tech Careers — Page 3 of 71"
        );
    });

    it("reads every page of a facet from Next's page data, and retries after a failed load", async () => {
        Object.assign(window, { __NEXT_DATA__: { buildId: "b1" } });
        let missing = true;
        const fetchMock = vi.fn(async (url: string) => {
            const n = url.endsWith("/page/2.json") ? 2 : 1;
            if (missing && n === 2) return { ok: false, status: 404, url };
            return {
                ok: true,
                url,
                json: async () => ({ pageProps: { rows: [guide({ slug: `g${n}` })] } }),
            };
        });
        vi.stubGlobal("fetch", fetchMock);

        await expect(loadFacetGuides({ kind: "all" }, PAGE_SIZE + 1)).rejects.toThrow("404");
        missing = false;
        const all = await loadFacetGuides({ kind: "all" }, PAGE_SIZE + 1);
        expect(all.map((g) => g.slug)).toEqual(["g1", "g2"]);
        expect(fetchMock).toHaveBeenLastCalledWith("/_next/data/b1/career-guides/page/2.json");
        expect(fetchMock).toHaveBeenCalledWith("/_next/data/b1/career-guides.json");

        // Loaded once per visit.
        await loadFacetGuides({ kind: "all" }, PAGE_SIZE + 1);
        expect(fetchMock).toHaveBeenCalledTimes(4);
        vi.unstubAllGlobals();
    });
});
