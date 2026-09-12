import { render, screen } from "@testing-library/react";
import BlogMetaItem from "@/components/blog-meta/meta-item";
import Social01 from "@/components/socials/social-01";

const fontAwesomeIcons = (container: HTMLElement) =>
    Array.from(container.querySelectorAll("i[class*='fa']"));

describe("decorative FontAwesome icons", () => {
    it("hides every social icon while each link keeps its accessible name", () => {
        const { container } = render(<Social01 />);

        const icons = fontAwesomeIcons(container);
        expect(icons).toHaveLength(4);
        for (const icon of icons) {
            expect(icon).toHaveAttribute("aria-hidden", "true");
        }

        for (const name of ["github", "facebook", "linkedin", "youtube"]) {
            expect(screen.getByRole("link", { name })).toHaveAttribute("aria-label", name);
        }
    });

    it("hides the blog meta icon whether or not the item links somewhere", () => {
        const { container } = render(
            <>
                <BlogMetaItem icon="far fa-calendar" text="Sep 9, 2026" />
                <BlogMetaItem icon="far fa-user" text="Jerome" path="/team/jerome" />
            </>
        );

        const icons = fontAwesomeIcons(container);
        expect(icons).toHaveLength(2);
        for (const icon of icons) {
            expect(icon).toHaveAttribute("aria-hidden", "true");
        }

        expect(screen.getByText("Sep 9, 2026")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Jerome" })).toHaveAttribute(
            "href",
            "/team/jerome"
        );
    });
});
