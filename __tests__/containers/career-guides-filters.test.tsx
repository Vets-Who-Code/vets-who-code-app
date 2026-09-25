import Filters from "@containers/career-guides/filters";
import type { Branch, Family } from "@containers/career-guides/types";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { FAMILIES, type FamilyStat } from "@/lib/career-guide-facets";

const branchCounts: Record<Branch, number> = {
    Army: 990,
    Navy: 633,
    "Air Force": 1853,
    "Marine Corps": 685,
    "Coast Guard": 41,
};

const familyStats = Object.fromEntries(
    FAMILIES.map((f) => [f, { count: 10, medianLow: 50, medianHigh: 90 }])
) as Record<Family, FamilyStat>;

// Stand-in for the listing's URL builder, so the tests see which pair each chip asks for.
const hrefFor = (branch?: Branch, family?: Family) => `${branch ?? "any"}|${family ?? "any"}`;

const renderFilters = (overrides: Partial<ComponentProps<typeof Filters>> = {}) => {
    const props: ComponentProps<typeof Filters> = {
        branch: "Army",
        hrefFor,
        branchCounts,
        familyStats,
        rank: "all",
        onRank: vi.fn(),
        sort: "code",
        onSort: vi.fn(),
        showing: 60,
        pageRows: 60,
        total: 990,
        ...overrides,
    };
    render(<Filters {...props} />);
    return props;
};

const hrefOf = (name: RegExp) => screen.getByRole("link", { name }).getAttribute("href");

describe("career-guides Filters", () => {
    it("switches one dimension with plain links and keeps the other", () => {
        renderFilters();
        // On a branch page, a family chip narrows the branch rather than leaving it.
        expect(hrefOf(/^All \d/)).toBe("any|any");
        expect(hrefOf(/^USAF/)).toBe("Air Force|any");
        expect(hrefOf(/^IT \/ Comms/)).toBe("Army|IT / Comms");
        expect(hrefOf(/^All families/)).toBe("Army|any");
        // The family facet is links now, not a <select>: only the sort control remains.
        expect(screen.getAllByRole("combobox")).toHaveLength(1);
    });

    it("marks the current branch and family and drops counts the pair would overstate", () => {
        renderFilters({ family: "Cyber" });
        expect(screen.getByRole("link", { name: "ARMY" })).toHaveAttribute("aria-current", "true");
        expect(screen.getByRole("link", { name: "Cyber" })).toHaveAttribute("aria-current", "true");
        expect(screen.getByRole("link", { name: "NAVY" })).not.toHaveAttribute("aria-current");
        expect(hrefOf(/^NAVY/)).toBe("Navy|Cyber");
        expect(hrefOf(/^All$/)).toBe("any|Cyber");
        expect(screen.getByRole("link", { name: "All families" })).not.toHaveAttribute(
            "aria-current"
        );
    });

    it("shows whole-branch and whole-family counts when only one is picked", () => {
        renderFilters({ branch: undefined, family: undefined });
        expect(screen.getByRole("link", { name: "ARMY 990" })).toHaveAttribute("href", "Army|any");
        expect(screen.getByRole("link", { name: "Medical 10" })).toHaveAttribute(
            "href",
            "any|Medical"
        );
        expect(screen.getByRole("link", { name: /^All 4,202/ })).toHaveAttribute(
            "aria-current",
            "true"
        );
    });

    it("counts search against this page and the rest against every page", () => {
        renderFilters({ showing: 19, pageRows: 60, total: 64 });
        expect(screen.getByText(/^Showing/)).toHaveTextContent(
            "Showing 19 of 60 on this page · 64 total"
        );
    });

    it("says so while the rest of the facet loads", () => {
        renderFilters({ loading: true });
        expect(screen.getByText("Loading…")).toBeInTheDocument();
        expect(screen.queryByText(/^Showing/)).not.toBeInTheDocument();
    });

    it("hands rank and sort changes back to the listing", () => {
        const props = renderFilters();
        fireEvent.click(screen.getByRole("button", { name: "Officer" }));
        expect(props.onRank).toHaveBeenCalledWith("Officer");
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "salaryHigh" } });
        expect(props.onSort).toHaveBeenCalledWith("salaryHigh");
    });
});
