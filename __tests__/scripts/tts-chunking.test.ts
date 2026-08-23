import { describe, expect, it } from "vitest";
import {
    chunkForTts,
    cleanMarkdownToText,
    normalizeLoudness,
} from "../../scripts/generate-single-blog-audio";

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

const tone = (seconds: number, amplitude: number) => {
    const samples = Math.round(24000 * seconds);
    const pcm = Buffer.alloc(samples * 2);
    for (let i = 0; i < samples; i++) {
        pcm.writeInt16LE(Math.round(Math.sin((i / 24000) * 2 * Math.PI * 220) * amplitude * 32767), i * 2);
    }
    return pcm;
};

const rms = (pcm: Buffer, from: number, to: number) => {
    let sum = 0;
    let count = 0;
    for (let i = from * 24000; i < to * 24000; i++) {
        const v = pcm.readInt16LE(i * 2) / 32768;
        sum += v * v;
        count++;
    }
    return 20 * Math.log10(Math.sqrt(sum / count));
};

describe("normalizeLoudness", () => {
    it("pulls a quiet half and a loud half toward each other", () => {
        const input = Buffer.concat([tone(8, 0.05), tone(8, 0.7)]);
        const before = Math.abs(rms(input, 1, 7) - rms(input, 9, 15));
        const after = normalizeLoudness(input);
        expect(Math.abs(rms(after, 1, 7) - rms(after, 9, 15))).toBeLessThan(before / 2);
    });

    it("leaves headroom instead of clipping", () => {
        const out = normalizeLoudness(tone(4, 0.99));
        let peak = 0;
        for (let i = 0; i < out.length / 2; i++) {
            peak = Math.max(peak, Math.abs(out.readInt16LE(i * 2) / 32768));
        }
        expect(peak).toBeLessThanOrEqual(0.892);
    });

    it("does not amplify silence into noise", () => {
        const out = normalizeLoudness(Buffer.alloc(24000 * 2 * 2));
        expect(out.every((byte) => byte === 0)).toBe(true);
    });
});
