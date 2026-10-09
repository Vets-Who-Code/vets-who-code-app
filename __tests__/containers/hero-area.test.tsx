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
});
