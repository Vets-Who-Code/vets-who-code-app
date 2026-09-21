import { afterEach, describe, expect, it, vi } from "vitest";

// The status strings are computed when the module is evaluated, so each case has to
// drop the module cache before re-importing with a different env.
async function loadConfig() {
    vi.resetModules();
    return (await import("@data/site-config")).default;
}

describe("site-config applications window", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("defaults to open when the env override is unset", async () => {
        const cfg = await loadConfig();
        expect(cfg.applicationsOpen).toBe(true);
        expect(cfg.applicationsStatus).toBe("Applications Open");
        expect(cfg.cohortStatus).toBe(`${cfg.cohortYear} Cohort · Applications Open`);
        expect(cfg.cohortStatusShort).toBe(`${cfg.cohortYear} Cohort · Open`);
    });

    it('closes on NEXT_PUBLIC_APPLICATIONS_OPEN="false"', async () => {
        vi.stubEnv("NEXT_PUBLIC_APPLICATIONS_OPEN", "false");
        const cfg = await loadConfig();
        expect(cfg.applicationsOpen).toBe(false);
        expect(cfg.applicationsStatus).toBe("Applications Closed");
        expect(cfg.cohortStatus).toBe(`${cfg.cohortYear} Cohort · Applications Closed`);
        expect(cfg.cohortStatusShort).toBe(`${cfg.cohortYear} Cohort · Closed`);
    });

    it("stays open for any other value", async () => {
        vi.stubEnv("NEXT_PUBLIC_APPLICATIONS_OPEN", "true");
        expect((await loadConfig()).applicationsOpen).toBe(true);
    });
});
