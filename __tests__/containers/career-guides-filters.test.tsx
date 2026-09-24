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

const renderFilters = (overrides: Partial<ComponentProps<typeof Filters>> = {}) => {
    const props: ComponentProps<typeof Filters> = {
        facet: { kind: "branch", value: "Army" },
        search: "",
        branchCounts,
        familyStats,
        rank: "all",
        onRank: vi.fn(),
        sort: "code",
        onSort: vi.fn(),
        showing: 60,
        total: 990,
        ...overrides,
    };
    render(<Filters {...props} />);
    return props;
};

const hrefOf = (name: RegExp) => screen.getByRole("link", { name }).getAttribute("href");

describe("career-guides Filters", () => {
    it("navigates between facets with plain links instead of local state", () => {
        renderFilters();
        expect(hrefOf(/^All/)).toBe("/career-guides");
        expect(hrefOf(/^ARMY/)).toBe("/career-guides/branch/army");
        expect(hrefOf(/^USAF/)).toBe("/career-guides/branch/air-force");
        expect(hrefOf(/^USMC/)).toBe("/career-guides/branch/marine-corps");
        expect(hrefOf(/^IT \/ Comms/)).toBe("/career-guides/family/it-comms");
        expect(hrefOf(/^Other/)).toBe("/career-guides/family/other");
        // The family facet is links now, not a <select>: only the sort control remains.
        expect(screen.getAllByRole("combobox")).toHaveLength(1);
    });

    it("marks the current facet", () => {
        renderFilters({ facet: { kind: "family", value: "Cyber" } });
        expect(screen.getByRole("link", { name: /^Cyber/ })).toHaveAttribute(
            "aria-current",
            "true"
        );
        expect(screen.getByRole("link", { name: /^ARMY/ })).not.toHaveAttribute("aria-current");
        expect(screen.getByRole("link", { name: /^All/ })).not.toHaveAttribute("aria-current");
    });

    it("carries the current rank, sort and search onto the facet links", () => {
        renderFilters({ search: "?rank=officer&sort=salaryHigh" });
        expect(hrefOf(/^NAVY/)).toBe("/career-guides/branch/navy?rank=officer&sort=salaryHigh");
        expect(hrefOf(/^Medical/)).toBe(
            "/career-guides/family/medical?rank=officer&sort=salaryHigh"
        );
    });

    it("hands rank and sort changes back to the listing", () => {
        const props = renderFilters();
        fireEvent.click(screen.getByRole("button", { name: "Officer" }));
        expect(props.onRank).toHaveBeenCalledWith("Officer");
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "salaryHigh" } });
        expect(props.onSort).toHaveBeenCalledWith("salaryHigh");
    });
});
