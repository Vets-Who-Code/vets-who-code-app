import { withGeneratedAt } from "../../scripts/lib/generated-at";

describe("withGeneratedAt", () => {
    it("stamps the entry with the provided date as an ISO string", () => {
        const now = new Date("2026-02-22T00:00:00.000Z");
        const result = withGeneratedAt({ branch: "Army", hours: 1144 }, now);
        expect(result.generatedAt).toBe("2026-02-22T00:00:00.000Z");
    });

    it("preserves the original fields", () => {
        const entry = { branch: "Navy", title: "Cryptologic Technician" };
        const result = withGeneratedAt(entry, new Date("2026-02-22T00:00:00.000Z"));
        expect(result).toMatchObject(entry);
    });

    it("defaults to the current time when no date is given", () => {
        const before = Date.now();
        const { generatedAt } = withGeneratedAt({ branch: "Army" });
        const stamped = new Date(generatedAt).getTime();
        expect(stamped).toBeGreaterThanOrEqual(before);
        expect(stamped).toBeLessThanOrEqual(Date.now());
    });

    it("does not mutate the input entry", () => {
        const entry = { branch: "Army" };
        withGeneratedAt(entry, new Date("2026-02-22T00:00:00.000Z"));
        expect(entry).not.toHaveProperty("generatedAt");
    });
});
