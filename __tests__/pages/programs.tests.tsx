import { render, screen, within } from "@testing-library/react";
import Programs, { getStaticProps } from "@/pages/programs";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

vi.mock("next/image", () => ({
    default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const renderPage = () => render(<Programs data={{ factoryStatus: "Booking Q4 2026 · Q1 2027" }} />);

describe("Programs hub page", () => {
    it("links each program card to its detail page", () => {
        renderPage();
        const expected = [
            ["View the Accelerator", "/programs/accelerator"],
            ["View Mentorship", "/programs/mentorship"],
            ["View the Factory", "/programs/software-factory"],
        ];
        for (const [label, href] of expected) {
            expect(screen.getByText(label).closest("a")).toHaveAttribute("href", href);
        }
    });

    it("routes each of the four audiences to its own destination", () => {
        renderPage();
        const expected = [
            ["Apply now →", "/apply"],
            ["Talk to us →", "/jobs"],
            ["Volunteer →", "/mentor"],
            ["Ways to give →", "/donate"],
        ];
        for (const [label, href] of expected) {
            expect(screen.getByText(label).closest("a")).toHaveAttribute("href", href);
        }
    });

    it("renders the comparison as a real table with row and column headers", () => {
        renderPage();
        const table = screen.getByRole("table");
        expect(within(table).getAllByRole("columnheader")).toHaveLength(5);
        expect(within(table).getAllByRole("rowheader")).toHaveLength(3);
    });

    it("title-cases the Software Factory status read from HERO_META", async () => {
        // HERO_META stores it upper-cased. A naive toLowerCase yields "q4"/"q1",
        // so this guards the per-word casing rather than the rendered string alone.
        const result = (await getStaticProps({} as never)) as {
            props: { data: { factoryStatus: string } };
        };
        expect(result.props.data.factoryStatus).toBe("Booking Q4 2026 · Q1 2027");
    });

    it("has exactly one h1", () => {
        renderPage();
        expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    });
});
