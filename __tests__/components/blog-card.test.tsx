import BlogCard from "@components/blog-card/blog-03";
import { render, screen } from "@testing-library/react";

const PROPS = {
    path: "/blog/combat-to-code",
    title: "From Combat to Code",
    category: { title: "Career", slug: "career", path: "/blog/category/career" },
    postedAt: "Jan 1, 2026",
};

describe("BlogCard (blog-03)", () => {
    it("falls back to the post title for the image alt when none is provided", () => {
        render(<BlogCard {...PROPS} image={{ src: "/images/combat-to-code.png" }} />);

        expect(screen.getByRole("img")).toHaveAttribute("alt", "From Combat to Code");
    });

    it("uses the image's own alt text when it is provided", () => {
        render(
            <BlogCard
                {...PROPS}
                image={{ src: "/images/combat-to-code.png", alt: "Marine at a laptop" }}
            />
        );

        expect(screen.getByRole("img")).toHaveAttribute("alt", "Marine at a laptop");
    });

    it("marks the image figure as presentational", () => {
        const { container } = render(
            <BlogCard {...PROPS} image={{ src: "/images/combat-to-code.png" }} />
        );

        expect(container.querySelector("figure")).toHaveAttribute("role", "none");
    });
});
