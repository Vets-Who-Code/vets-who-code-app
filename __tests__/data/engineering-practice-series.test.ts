import topics from "@data/curriculum-graph/topics.json";
import { getPostBySlug } from "@lib/blog";

// Each post in the series teaches one curriculum criterion (#1433).
const SERIES: Array<[slug: string, topicId: string]> = [
    ["how-we-teach-code-review-find-the-defect-not-the-nit", "rev-read"],
    ["the-reviewable-pull-request", "rev-write"],
    ["debug-by-stepping-not-by-printing", "ed-debug"],
    ["fix-the-flaky-test-at-its-cause", "tst-flaky"],
    ["tests-that-survive-a-refactor", "tsf-component"],
    ["three-cases-every-endpoint-test-covers", "tsb-client"],
];

const APPLY_BLOCK =
    /### Know a Veteran Who Wants to Code\?\n\n[^\n]*\[\*\*Apply\*\*\]\(\/apply\)[^\n]*\n?$/;

describe.each(SERIES)("%s", (slug, topicId) => {
    const post = getPostBySlug(slug, "all");
    const topic = topics.find((t) => t.id === topicId);

    it("shares the series category and tag", () => {
        expect(post.category.title).toBe("Engineering Practice");
        expect(post.tags.map((tag) => tag.title)).toContain("engineering practice");
    });

    it("has a header image with alt text", () => {
        expect(post.image.src).toBeTruthy();
        expect(post.image.alt).toBeTruthy();
    });

    it("quotes its criterion and links its domain page", () => {
        expect(post.content).toContain(`> ${topic?.evidence}`);
        expect(post.content).toContain(`(/curriculum/${topic?.domain})`);
    });

    it("links every other post in the series", () => {
        for (const [other] of SERIES) {
            if (other !== slug) expect(post.content).toContain(`(/blogs/${other})`);
        }
    });

    it("ends with the Apply block", () => {
        expect(post.content).toMatch(APPLY_BLOCK);
    });
});
