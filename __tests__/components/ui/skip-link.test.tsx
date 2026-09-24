import Layout01 from "@layout/layout-01";
import { render, screen } from "@testing-library/react";
import SkipLink from "@ui/skip-link";

vi.mock("@layout/headers/header", () => ({ default: () => <header>Header</header> }));
vi.mock("@layout/footers/footer-01", () => ({ default: () => <footer>Footer</footer> }));

describe("SkipLink", () => {
    it("links to the main-content landmark", () => {
        render(<SkipLink />);
        expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute(
            "href",
            "#main-content"
        );
    });

    it("is the first tab stop in the layout and targets a focusable <main>", () => {
        const { container } = render(
            <Layout01>
                <p>Page body</p>
            </Layout01>
        );
        const link = screen.getByRole("link", { name: "Skip to main content" });
        const main = screen.getByRole("main");

        expect(container.querySelector("a, button, input")).toBe(link);
        expect(main).toHaveAttribute("id", "main-content");
        expect(main).toHaveAttribute("tabindex", "-1");
    });
});
