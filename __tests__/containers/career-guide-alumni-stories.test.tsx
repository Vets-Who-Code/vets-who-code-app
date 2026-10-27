import AlumniStories from "@containers/career-guide-detail/alumni-stories";
import { render, screen } from "@testing-library/react";

const story = {
    title: "From Coast Guard Yeoman (YN) to Tech",
    slug: "cameron-porter-testimonial",
    excerpt: "A former Coast Guard Yeoman on moving into tech.",
    image: { src: "https://res.cloudinary.com/x/image.jpg" },
};

describe("AlumniStories", () => {
    it("renders a card linking to each matching story", () => {
        render(<AlumniStories code="YN_CG" stories={[story]} />);
        expect(screen.getByRole("heading", { name: story.title })).toBeInTheDocument();
        expect(screen.getByText(story.excerpt)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /read the story/i })).toHaveAttribute(
            "href",
            "/blogs/cameron-porter-testimonial"
        );
        expect(screen.getByRole("img", { name: story.title })).toHaveAttribute(
            "src",
            story.image.src
        );
    });

    it("renders nothing when no story matches", () => {
        const { container } = render(<AlumniStories code="11B" stories={[]} />);
        expect(container).toBeEmptyDOMElement();
    });
});
