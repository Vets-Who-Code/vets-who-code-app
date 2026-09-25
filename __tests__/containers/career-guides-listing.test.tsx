import CareerGuidesContainer from "@containers/career-guides";
import type { Branch, Family, GuideEntry } from "@containers/career-guides/types";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
    FAMILIES,
    type Facet,
    type FamilyStat,
    facetHref,
    PAGE_SIZE,
} from "@/lib/career-guide-facets";

const { replace } = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("next/router", () => ({
    useRouter: () => ({ isReady: true, events: { on: vi.fn(), off: vi.fn() }, replace }),
}));

const guide = (slug: string, overrides: Partial<GuideEntry> = {}): GuideEntry => ({
    code: slug.toUpperCase(),
    slug,
    title: `Guide ${slug}`,
    branch: "Army",
    rank: "Enlisted",
    family: "Cyber",
    civilian: "Analyst",
    salaryLow: 50,
    salaryHigh: 80,
    certs: [],
    demand: "Steady",
    ...overrides,
});

const pad = (i: number) => String(i).padStart(3, "0");

// 150 Cyber guides over three pages: officers on each page, the best salary on the last one.
const cyber = Array.from({ length: 150 }, (_, i) =>
    guide(`c${pad(i)}`, {
        rank: [5, 70, 130].includes(i) ? "Officer" : "Enlisted",
        salaryHigh: i === 140 ? 200 : 80,
    })
);
// 130 Army guides, three of them Cyber, one on each page.
const army = Array.from({ length: 130 }, (_, i) =>
    guide(`a${pad(i)}`, { family: [10, 75, 125].includes(i) ? "Cyber" : "Medical" })
);

const served = new Map<string, GuideEntry[]>();
const serve = (facet: Facet, guides: GuideEntry[]) => {
    for (let n = 1; n <= Math.ceil(guides.length / PAGE_SIZE); n += 1) {
        const rows = guides.slice((n - 1) * PAGE_SIZE, n * PAGE_SIZE);
        served.set(`/_next/data/test-build${facetHref(facet, n)}.json`, rows);
    }
};
serve({ kind: "family", value: "Cyber" }, cyber);
serve({ kind: "branch", value: "Army" }, army);

const fetchMock = vi.fn(async (url: string) => {
    const rows = served.get(url);
    return rows
        ? { ok: true, url, json: async () => ({ pageProps: { rows } }) }
        : { ok: false, status: 404, url };
});

beforeAll(() => {
    vi.stubGlobal("fetch", fetchMock);
    Object.assign(window, { __NEXT_DATA__: { buildId: "test-build" } });
});

afterAll(() => {
    vi.unstubAllGlobals();
});

beforeEach(() => {
    fetchMock.mockClear();
    replace.mockClear();
});

const branchCounts: Record<Branch, number> = {
    Army: 130,
    Navy: 0,
    "Air Force": 0,
    "Marine Corps": 0,
    "Coast Guard": 0,
};
const familyStats = Object.fromEntries(
    FAMILIES.map((f) => [f, { count: 10, medianLow: 50, medianHigh: 90 }])
) as Record<Family, FamilyStat>;

const renderListing = (url: string, facet: Facet, guides: GuideEntry[], page = 1) => {
    window.history.replaceState(null, "", url);
    render(
        <CareerGuidesContainer
            rows={guides.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
            facet={facet}
            page={page}
            totalPages={Math.ceil(guides.length / PAGE_SIZE)}
            count={guides.length}
            total={4202}
            branchCounts={branchCounts}
            familyStats={familyStats}
            familiesCount={11}
            certsCount={0}
        />
    );
};

// Guide detail links only, in grid order.
const shownSlugs = () =>
    screen
        .getAllByRole("link")
        .map((a) => a.getAttribute("href") ?? "")
        .filter((href) => /^\/career-guides\/[ac]\d{3}$/.test(href))
        .map((href) => href.slice("/career-guides/".length));

describe("career-guides listing", () => {
    it("filters rank across every page of the facet, not just this one", async () => {
        renderListing(
            "/career-guides/family/cyber?rank=officer",
            { kind: "family", value: "Cyber" },
            cyber
        );
        await waitFor(() => expect(shownSlugs()).toEqual(["c005", "c070", "c130"]));
        expect(screen.getByText(/^Showing/)).toHaveTextContent(
            "Showing 3 of 3 on this page · 3 total"
        );
        expect(fetchMock).toHaveBeenCalledWith(
            "/_next/data/test-build/career-guides/family/cyber.json"
        );
        expect(fetchMock).toHaveBeenCalledWith(
            "/_next/data/test-build/career-guides/family/cyber/page/3.json"
        );
    });

    it("sorts the whole facet", async () => {
        renderListing(
            "/career-guides/family/cyber?sort=salaryHigh",
            { kind: "family", value: "Cyber" },
            cyber
        );
        await waitFor(() => expect(shownSlugs()[0]).toBe("c140"));
        expect(shownSlugs()).toHaveLength(PAGE_SIZE);
    });

    it("combines a branch with ?family across the branch's pages", async () => {
        renderListing(
            "/career-guides/branch/army?family=cyber",
            { kind: "branch", value: "Army" },
            army
        );
        await waitFor(() => expect(shownSlugs()).toEqual(["a010", "a075", "a125"]));
        expect(screen.getByRole("link", { name: "Cyber" })).toHaveAttribute("aria-current", "true");
        expect(screen.getByRole("link", { name: "All families" })).toHaveAttribute(
            "href",
            "/career-guides/branch/army#database"
        );
    });

    it("keeps search on this page without loading the rest of the facet", () => {
        // c070–c079 are on page 2.
        renderListing(
            "/career-guides/family/cyber?q=c07",
            { kind: "family", value: "Cyber" },
            cyber
        );
        expect(shownSlugs()).toEqual([]);
        expect(screen.getByText("No matches on this page.")).toBeInTheDocument();
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("says the whole facet is empty when a filter, not a search, finds nothing", async () => {
        // Every Army guide here is Enlisted.
        renderListing(
            "/career-guides/branch/army?rank=officer",
            { kind: "branch", value: "Army" },
            army
        );
        await waitFor(() =>
            expect(
                screen.getByText("Try a different branch, career family, or rank.")
            ).toBeInTheDocument()
        );
        expect(screen.getByText("No matches.")).toBeInTheDocument();
        expect(screen.queryByText(/Search only looks at/)).not.toBeInTheDocument();
    });

    it("restarts at page 1 when rank changes on a later page", () => {
        renderListing(
            "/career-guides/family/cyber/page/2",
            { kind: "family", value: "Cyber" },
            cyber,
            2
        );
        fireEvent.click(screen.getByRole("button", { name: "Officer" }));
        expect(replace).toHaveBeenCalledWith("/career-guides/family/cyber?rank=officer#database");
    });

    it("stays on this page's guides when the rest of the facet cannot load", async () => {
        const medical = Array.from({ length: 70 }, (_, i) =>
            guide(`c${pad(i)}`, { family: "Medical", rank: i === 3 ? "Officer" : "Enlisted" })
        );
        renderListing(
            "/career-guides/family/medical?rank=officer",
            { kind: "family", value: "Medical" },
            medical
        );
        await waitFor(() => expect(shownSlugs()).toEqual(["c003"]));
        expect(screen.getByText(/^Showing/)).toHaveTextContent(
            "Showing 1 of 1 on this page · 70 total"
        );
    });
});
