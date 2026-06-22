import { describe, expect, it } from "vitest";
import { loadCareerGuides } from "@/lib/career-guides";

describe("loadCareerGuides", () => {
    it("includes AFSC 1D7X1K Knowledge Operations Management", () => {
        const guides = loadCareerGuides();
        const guide = guides.find((g) => g.code === "1D7X1K");

        expect(guide).toBeDefined();
        expect(guide?.title).toBe("Knowledge Operations Management");
        expect(guide?.branch).toBe("Air Force");
        expect(guide?.rank).toBe("Enlisted");
        expect(guide?.civilian).toBe("Knowledge Manager");
        expect(guide?.salaryLow).toBeGreaterThan(0);
        expect(guide?.salaryHigh).toBeGreaterThanOrEqual(guide?.salaryLow ?? 0);
    });
});
