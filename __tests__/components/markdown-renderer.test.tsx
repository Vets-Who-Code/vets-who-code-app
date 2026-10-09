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

const PYTHON_FENCE = "```python\ndef go():\n    return True\n```";
const PLAIN_FENCE = "```\nnpm run dev\n```";

describe("MarkdownRenderer code blocks", () => {
    it("highlights a fenced block in a registered language", () => {
        const { container } = render(<MarkdownRenderer content={PYTHON_FENCE} />);

        const code = container.querySelector("code");
        expect(code).toHaveClass("hljs", "language-python");
        expect(code?.querySelector(".hljs-keyword")).toHaveTextContent("def");
        expect(code).toHaveTextContent("def go(): return True");
    });

    it("leaves an unlabelled block as plain text", () => {
        const { container } = render(<MarkdownRenderer content={PLAIN_FENCE} />);

        const code = container.querySelector("code");
        expect(code).toHaveTextContent("npm run dev");
        expect(code?.querySelector("span")).toBeNull();
    });
});
