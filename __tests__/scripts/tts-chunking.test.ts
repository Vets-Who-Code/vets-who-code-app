import { describe, expect, it } from "vitest";
import { chunkForTts, cleanMarkdownToText } from "../../scripts/generate-single-blog-audio";

const paragraph = (words: number) => Array(words).fill("word").join(" ");

describe("chunkForTts", () => {
    it("keeps short text in a single chunk", () => {
        expect(chunkForTts(`${paragraph(100)}\n\n${paragraph(100)}`)).toHaveLength(1);
    });

    it("splits past the per-request word budget", () => {
        const chunks = chunkForTts(Array(6).fill(paragraph(400)).join("\n\n"));
        expect(chunks.length).toBeGreaterThan(1);
        for (const chunk of chunks) {
            expect(chunk.split(/\s+/).length).toBeLessThanOrEqual(1500 + 400);
        }
    });

    it("loses no words when splitting", () => {
        const text = Array(6).fill(paragraph(400)).join("\n\n");
        const chunked = chunkForTts(text).join(" ").split(/\s+/).length;
        expect(chunked).toBe(text.split(/\s+/).length);
    });
});

describe("cleanMarkdownToText", () => {
    it("drops images instead of narrating their alt text", () => {
        const clean = cleanMarkdownToText("Intro.\n\n![A chart of the job market](v123/chart.jpg)\n\nOutro.");
        expect(clean).not.toContain("chart");
        expect(clean).toContain("Intro.");
        expect(clean).toContain("Outro.");
    });

    it("keeps link text", () => {
        expect(cleanMarkdownToText("See [the guide](https://example.com).")).toBe("See the guide.");
    });
});
