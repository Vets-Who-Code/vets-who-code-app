import { describe, expect, it } from "vitest";
import { cardTitle, MAX_TITLE, OG_FALLBACK_TITLE } from "@/lib/og-card";

describe("cardTitle", () => {
    it("falls back when the title is missing or empty", () => {
        expect(cardTitle(null)).toBe(OG_FALLBACK_TITLE);
        expect(cardTitle("   ")).toBe(OG_FALLBACK_TITLE);
        // A title that is nothing but the site name leaves no headline behind.
        expect(cardTitle("Vets Who Code")).toBe(OG_FALLBACK_TITLE);
    });

    it("strips the site name the SEO template appends", () => {
        expect(cardTitle("Our Programs | Vets Who Code")).toBe("Our Programs");
        expect(cardTitle("Our Programs - Vets Who Code")).toBe("Our Programs");
        // Only a trailing occurrence — a mid-title mention is real content.
        expect(cardTitle("Why Vets Who Code Works")).toBe("Why Vets Who Code Works");
    });

    it("truncates long titles on a word boundary, never mid-word", () => {
        const long =
            "Software Factory Ship Production Code With Veteran Engineers Every Single Cohort Year Round";
        const result = cardTitle(long);
        const body = result.slice(0, -1); // drop the ellipsis

        expect(result.length).toBeLessThanOrEqual(MAX_TITLE + 1); // +1 for the ellipsis
        expect(result.endsWith("…")).toBe(true);
        expect(long.startsWith(body)).toBe(true);
        // The cut must land on a word boundary. Asserting `long.includes(body)`
        // would pass for a mid-word cut too — the next character is what matters.
        expect(long[body.length]).toBe(" ");
    });

    it("still bounds a single unbroken word with no space to cut on", () => {
        const result = cardTitle("A".repeat(200));
        expect(result.length).toBeLessThanOrEqual(MAX_TITLE + 1);
        expect(result.endsWith("…")).toBe(true);
    });

    it("leaves a title that already fits untouched", () => {
        expect(cardTitle("Apply Now")).toBe("Apply Now");
    });
});
