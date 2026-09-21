import { act, fireEvent, render, screen, within } from "@testing-library/react";
import PortfolioChecklist from "@/pages/portfolio-checklist";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@components/breadcrumb", () => ({
    default: () => <nav aria-label="Breadcrumb" />,
}));

const STORAGE_KEY = "vwc-portfolio-checklist";

const panelHeadings = () => screen.getAllByRole("heading", { level: 2 });
const tile = (name: RegExp) =>
    within(screen.getByRole("navigation", { name: "Checklist sections" })).getByRole("button", {
        name,
    });

describe("Portfolio checklist page", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("shows one section at a time, starting with the first", () => {
        render(<PortfolioChecklist />);
        expect(panelHeadings().map((h) => h.textContent)).toEqual(["First Impression"]);
        expect(
            within(screen.getByRole("navigation", { name: "Checklist sections" })).getAllByRole(
                "button"
            )
        ).toHaveLength(8);
        expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    });

    it("swaps the panel when a section tile is clicked", () => {
        render(<PortfolioChecklist />);
        fireEvent.click(tile(/Quality Bar/));
        expect(panelHeadings().map((h) => h.textContent)).toEqual(["The Quality Bar"]);
        expect(tile(/Quality Bar/)).toHaveAttribute("aria-current", "step");
        expect(tile(/First Impression/)).not.toHaveAttribute("aria-current");
    });

    it("updates every counter and persists under the existing storage key", () => {
        render(<PortfolioChecklist />);
        fireEvent.click(screen.getByRole("checkbox", { name: /Headline positioning statement/ }));

        expect(screen.getByText("1 / 62 completed")).toBeInTheDocument();
        expect(screen.getByText("2% · 61 remaining")).toBeInTheDocument();
        expect(screen.getByText("1 / 8 done")).toBeInTheDocument();
        expect(tile(/First Impression/)).toHaveTextContent("1/8");
        expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}").value).toMatchObject({
            "1-1": true,
        });
    });

    it("restores saved progress from the existing storage key", () => {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ value: { "1-1": true, "qb-2": true }, expiry: null, timestamp: 0 })
        );
        render(<PortfolioChecklist />);
        expect(screen.getByText("2 / 62 completed")).toBeInTheDocument();
        expect(
            screen.getByRole("checkbox", { name: /Headline positioning statement/ })
        ).toBeChecked();
    });

    it("steps through sections and moves focus to the new panel heading", () => {
        render(<PortfolioChecklist />);
        expect(screen.getByRole("button", { name: /Previous/ })).toBeDisabled();

        fireEvent.click(screen.getByRole("button", { name: /Next section: Proof of Work/ }));
        const heading = screen.getByRole("heading", { level: 2, name: "Proof of Work" });
        expect(heading).toHaveFocus();

        fireEvent.click(screen.getByRole("button", { name: /Previous section: First Impression/ }));
        expect(panelHeadings().map((h) => h.textContent)).toEqual(["First Impression"]);

        fireEvent.click(tile(/Quality Bar/));
        expect(screen.getByRole("button", { name: "End of checklist" })).toBeDisabled();
    });

    it("hides completed items and drops subsections left empty", () => {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                value: { "5-4": true, "5-5": true, "5-1": true },
                expiry: null,
                timestamp: 0,
            })
        );
        render(<PortfolioChecklist />);
        fireEvent.click(tile(/Authority/));
        expect(
            screen.getByRole("heading", { level: 3, name: "Press & Talks" })
        ).toBeInTheDocument();

        const toggle = screen.getByRole("button", { name: "Hide completed" });
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute("aria-pressed", "true");
        expect(screen.queryByRole("heading", { level: 3, name: "Press & Talks" })).toBeNull();
        expect(screen.queryByRole("checkbox", { name: /Blog posts that unpack/ })).toBeNull();
        expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    });

    it("renders every section while printing and restores the single panel after", () => {
        render(<PortfolioChecklist />);
        act(() => {
            window.dispatchEvent(new Event("beforeprint"));
        });
        expect(panelHeadings()).toHaveLength(8);
        expect(screen.getAllByRole("checkbox")).toHaveLength(62);

        act(() => {
            window.dispatchEvent(new Event("afterprint"));
        });
        expect(panelHeadings()).toHaveLength(1);
    });

    it("clears progress on confirmed reset only", () => {
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ value: { "1-1": true }, expiry: null, timestamp: 0 })
        );
        render(<PortfolioChecklist />);
        // happy-dom has no window.confirm
        const confirm = vi.fn();
        vi.stubGlobal("confirm", confirm);

        confirm.mockReturnValueOnce(false);
        fireEvent.click(screen.getByRole("button", { name: "Reset" }));
        expect(screen.getByText("1 / 62 completed")).toBeInTheDocument();

        confirm.mockReturnValueOnce(true);
        fireEvent.click(screen.getByRole("button", { name: "Reset" }));
        expect(screen.getByText("0 / 62 completed")).toBeInTheDocument();
        vi.unstubAllGlobals();
    });
});
