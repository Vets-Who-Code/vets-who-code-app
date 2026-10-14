import { createRequire } from "node:module";
import { afterEach, describe, expect, it, vi } from "vitest";

const require = createRequire(import.meta.url);
const nextConfig = require("../next.config.js");

async function scriptSrc() {
    const [{ headers }] = await nextConfig.headers();
    const csp = headers.find((h: { key: string }) => h.key === "Content-Security-Policy").value;
    return csp.split("; ").find((d: string) => d.startsWith("script-src"));
}

describe("Content-Security-Policy script-src", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("omits 'unsafe-eval' in production", async () => {
        vi.stubEnv("NODE_ENV", "production");
        expect(await scriptSrc()).not.toContain("'unsafe-eval'");
    });

    it("allows 'unsafe-eval' in development for HMR", async () => {
        vi.stubEnv("NODE_ENV", "development");
        expect(await scriptSrc()).toContain("'unsafe-eval'");
    });
});
