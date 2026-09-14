import { describe, expect, it } from "vitest";
import { capField } from "../TranslatorForm";

const MAX_FIELD = 2000;

describe("capField", () => {
    it("leaves text within the limit untouched", () => {
        const text = "Led a squad of nine.\nMaintained $2M in equipment.";
        expect(capField(text)).toBe(text);
    });

    it("cuts on a line boundary when most of the budget is still used", () => {
        const text = Array.from({ length: 40 }, (_, i) => `Duty line ${i} `.repeat(5)).join("\n");
        const capped = capField(text);
        expect(capped.length).toBeLessThanOrEqual(MAX_FIELD);
        expect(text.startsWith(capped)).toBe(true);
        expect(text[capped.length]).toBe("\n");
    });

    // Regression: air_force:81T0 formats to lines of [41, 0, 1995]. Cutting at the
    // last line break kept 42 of 2,038 characters.
    it("keeps the long line when the last line break is near the start", () => {
        const text = `${"Instructs personnel in academic subjects.\n\n"}${"duty ".repeat(399)}`;
        expect(text.length).toBeGreaterThan(MAX_FIELD);
        const capped = capField(text);
        expect(capped.length).toBeLessThanOrEqual(MAX_FIELD);
        expect(capped.length).toBeGreaterThan(MAX_FIELD / 2);
    });

    it("cuts on a word boundary when the text has no line breaks", () => {
        const text = "achievement ".repeat(400);
        const capped = capField(text);
        expect(capped.length).toBeLessThanOrEqual(MAX_FIELD);
        expect(capped.endsWith("achievement")).toBe(true);
    });

    it("falls back to a hard cut when there is no whitespace at all", () => {
        expect(capField("x".repeat(5000))).toHaveLength(MAX_FIELD);
    });
});
