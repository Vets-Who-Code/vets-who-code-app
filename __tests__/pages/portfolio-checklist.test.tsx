import { act, fireEvent, render, screen, within } from "@testing-library/react";
import PortfolioChecklist from "@/pages/portfolio-checklist";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@components/breadcrumb", () => ({
    default: () => <nav aria-label="Breadcrumb" />,
}));

const STORAGE_KEY = "vwc-portfolio-checklist-2027";

const seed = (value: Record<string, boolean>, key = STORAGE_KEY) =>
    window.localStorage.setItem(key, JSON.stringify({ value, expiry: null, timestamp: 0 }));

const panelHeadings = () => screen.getAllByRole("heading", { level: 2 });
const tile = (name: RegExp) =>
    within(screen.getByRole("navigation", { name: "Checklist sections" })).getByRole("button", {
        name,
    });

describe("Portfolio checklist page", () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.location.hash = "";
    });

    it("shows one section at a time, starting with the first", () => {
        render(<PortfolioChecklist />);
        expect(panelHeadings().map((h) => h.textContent)).toEqual(["First Impression"]);
        expect(
            within(screen.getByRole("navigation", { name: "Checklist sections" })).getAllByRole(
                "button"
            )
        ).toHaveLength(11);
        expect(screen.getAllByRole("checkbox")).toHaveLength(7);
        expect(screen.getByText("81 items · 10 sections · gate")).toBeInTheDocument();
    });

    it("swaps the panel when a section tile is clicked", () => {
        render(<PortfolioChecklist />);
        fireEvent.click(tile(/Quality Bar/));
        expect(panelHeadings().map((h) => h.textContent)).toEqual(["The Quality Bar"]);
        expect(tile(/Quality Bar/)).toHaveAttribute("aria-current", "step");
        expect(tile(/First Impression/)).not.toHaveAttribute("aria-current");
        expect(screen.getByText("0 / 5 cleared")).toBeInTheDocument();
    });

    it("updates every counter and persists under the 2027 storage key", () => {
        render(<PortfolioChecklist />);
        fireEvent.click(screen.getByRole("checkbox", { name: "Headline positioning statement" }));

        expect(screen.getByText("1 / 81 completed")).toBeInTheDocument();
        expect(screen.getByText("1% · 80 remaining")).toBeInTheDocument();
        expect(screen.getByText("1 / 7 done")).toBeInTheDocument();
        expect(tile(/First Impression/)).toHaveTextContent("1/7");
        expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}").value).toMatchObject({
            "1-1": true,
        });
    });

    it("leaves the Quality Bar gate out of the item count", () => {
        seed({ "1-1": true, "qb-1": true, "qb-2": true });
        render(<PortfolioChecklist />);
        expect(screen.getByText("1 / 81 completed")).toBeInTheDocument();
        expect(tile(/Quality Bar/)).toHaveTextContent("2/5");
    });

    it("starts the 2027 edition fresh instead of reusing 2026 progress", () => {
        seed({ "1-1": true, "1-2": true }, "vwc-portfolio-checklist");
        render(<PortfolioChecklist />);
        expect(screen.getByText("0 / 81 completed")).toBeInTheDocument();
    });

    it("steps through sections and moves focus to the new panel heading", () => {
        render(<PortfolioChecklist />);
        expect(screen.getByRole("button", { name: /Previous/ })).toBeDisabled();

        fireEvent.click(screen.getByRole("button", { name: /Next section: Hiring Channels/ }));
        const heading = screen.getByRole("heading", { level: 2, name: "Hiring Channels" });
        expect(heading).toHaveFocus();

        fireEvent.click(screen.getByRole("button", { name: /Previous section: First Impression/ }));
        expect(panelHeadings().map((h) => h.textContent)).toEqual(["First Impression"]);

        fireEvent.click(tile(/Quality Bar/));
        expect(screen.getByRole("button", { name: "End of checklist" })).toBeDisabled();
    });

    it("opens the section named in the URL hash", () => {
        window.location.hash = "#ai-search-visibility";
        render(<PortfolioChecklist />);
        expect(panelHeadings().map((h) => h.textContent)).toEqual(["AI Search Visibility"]);
    });

    it("hides completed items and drops subsections left empty", () => {
        seed({ "4-8": true, "4-9": true, "4-1": true });
        render(<PortfolioChecklist />);
        fireEvent.click(tile(/Artifact Deep Dives/));
        expect(
            screen.getByRole("heading", { level: 3, name: "AI Collaboration" })
        ).toBeInTheDocument();

        const toggle = screen.getByRole("button", { name: "Hide completed" });
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute("aria-pressed", "true");
        expect(screen.queryByRole("heading", { level: 3, name: "AI Collaboration" })).toBeNull();
        expect(screen.queryByRole("checkbox", { name: /Problem statement/ })).toBeNull();
        expect(screen.getAllByRole("checkbox")).toHaveLength(11);
    });

    it("keeps focus on the next item when checking one hides it", () => {
        render(<PortfolioChecklist />);
        fireEvent.click(screen.getByRole("button", { name: "Hide completed" }));

        const cta = screen.getByRole("checkbox", { name: "CTA above the fold" });
        cta.focus();
        fireEvent.click(cta);

        expect(screen.queryByRole("checkbox", { name: "CTA above the fold" })).toBeNull();
        expect(
            screen.getByRole("checkbox", { name: "Contact links visible on every page" })
        ).toHaveFocus();
    });

    it("renders every section while printing and restores the single panel after", () => {
        render(<PortfolioChecklist />);
        act(() => {
            window.dispatchEvent(new Event("beforeprint"));
        });
        expect(panelHeadings()).toHaveLength(11);
        expect(screen.getAllByRole("checkbox")).toHaveLength(86);

        act(() => {
            window.dispatchEvent(new Event("afterprint"));
        });
        expect(panelHeadings()).toHaveLength(1);
    });

    it("clears progress on confirmed reset only", () => {
        seed({ "1-1": true });
        render(<PortfolioChecklist />);
        // happy-dom has no window.confirm
        const confirm = vi.fn();
        vi.stubGlobal("confirm", confirm);

        confirm.mockReturnValueOnce(false);
        fireEvent.click(screen.getByRole("button", { name: "Reset" }));
        expect(screen.getByText("1 / 81 completed")).toBeInTheDocument();

        confirm.mockReturnValueOnce(true);
        fireEvent.click(screen.getByRole("button", { name: "Reset" }));
        expect(screen.getByText("0 / 81 completed")).toBeInTheDocument();
        vi.unstubAllGlobals();
    });
});
