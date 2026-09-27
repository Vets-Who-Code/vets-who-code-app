import MarkdownRenderer from "@components/markdown-renderer";
import { render, screen } from "@testing-library/react";

describe("MarkdownRenderer links", () => {
    it("keeps internal links in the same tab and followed", () => {
        render(<MarkdownRenderer content="[Apply](/apply)" />);

        const link = screen.getByRole("link", { name: "Apply" });
        expect(link).toHaveAttribute("href", "/apply");
        expect(link).not.toHaveAttribute("target");
        expect(link).not.toHaveAttribute("rel");
    });

    it("opens external links in a new tab with nofollow", () => {
        render(<MarkdownRenderer content="[GitHub](https://github.com/vetswhocode)" />);

        const link = screen.getByRole("link", { name: "GitHub" });
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "nofollow");
    });
});
