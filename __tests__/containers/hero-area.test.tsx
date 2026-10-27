import HeroArea from "@containers/hero/layout-04";
import { render, screen } from "@testing-library/react";

const headings = [
    { id: 1, content: "From Service To" },
    { id: 2, content: "Software Engineer" },
    { id: 3, content: "Production Code" },
];

describe("Home hero", () => {
    it("gives the h1 the full headline, not just its opening words", () => {
        render(<HeroArea data={{ headings }} />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            "From Service To Software Engineer"
        );
    });

    it("loads the background image eagerly at high priority across the full viewport", () => {
        const { container } = render(
            <HeroArea
                data={{
                    headings,
                    images: [
                        { src: "https://res.cloudinary.com/vetswhocode/image/upload/hero.png" },
                    ],
                }}
            />
        );
        const img = container.querySelector("img");
        expect(img).toHaveAttribute("fetchpriority", "high");
        expect(img).toHaveAttribute("sizes", "100vw");
        expect(img).not.toHaveAttribute("loading", "lazy");
        expect(img?.getAttribute("srcset")).toContain("/_next/image?url=");
    });
});
