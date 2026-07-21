import { getCohortStartDate, isCohortUpcoming } from "@utils/cohort";
import { afterEach, describe, expect, it } from "vitest";

/**
 * Issue #1208: the header countdown must not show a dead 0:0:0:0 timer once the
 * cohort date has passed, and the date must be configurable.
 */
describe("isCohortUpcoming", () => {
    const now = Date.parse("2026-07-18T00:00:00Z");

    it("is true for a future date", () => {
        expect(isCohortUpcoming("2026/09/01", now)).toBe(true);
    });

    it("is false for a past date (the dead-timer case)", () => {
        expect(isCohortUpcoming("2026/04/07", now)).toBe(false);
    });

    it("is false for missing or malformed dates", () => {
        expect(isCohortUpcoming(undefined, now)).toBe(false);
        expect(isCohortUpcoming(null, now)).toBe(false);
        expect(isCohortUpcoming("", now)).toBe(false);
        expect(isCohortUpcoming("not-a-date", now)).toBe(false);
    });
});

describe("getCohortStartDate", () => {
    afterEach(() => {
        delete process.env.NEXT_PUBLIC_COHORT_START_DATE;
    });

    it("falls back to the config default", () => {
        expect(getCohortStartDate("2026/04/07")).toBe("2026/04/07");
    });

    it("prefers the env override (editable without a code change)", () => {
        process.env.NEXT_PUBLIC_COHORT_START_DATE = "2027/01/15";
        expect(getCohortStartDate("2026/04/07")).toBe("2027/01/15");
    });
});
