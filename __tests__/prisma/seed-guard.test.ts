import { describe, expect, it } from "vitest";
import { assertSafeToSeed, isSafeSeedTarget } from "../../prisma/seed-guard";

/**
 * Issue #1227: the seed must refuse to wipe a non-local database.
 */
describe("isSafeSeedTarget", () => {
    it("accepts local SQLite and localhost Postgres", () => {
        expect(isSafeSeedTarget("file:./dev.db")).toBe(true);
        expect(isSafeSeedTarget("postgresql://user:pass@localhost:5432/app")).toBe(true);
        expect(isSafeSeedTarget("postgresql://user:pass@127.0.0.1:5432/app")).toBe(true);
    });

    it("rejects remote databases", () => {
        expect(
            isSafeSeedTarget(
                "postgresql://owner:pw@ep-lucky-sun-a8e2ckje-pooler.eastus2.azure.neon.tech/db?sslmode=require"
            )
        ).toBe(false);
        expect(isSafeSeedTarget("postgresql://u:p@db.example.com:5432/app")).toBe(false);
        expect(isSafeSeedTarget(undefined)).toBe(false);
        expect(isSafeSeedTarget("")).toBe(false);
    });
});

describe("assertSafeToSeed", () => {
    it("throws on a production URL", () => {
        expect(() =>
            assertSafeToSeed({
                DATABASE_URL: "postgresql://o:p@x.neon.tech/db",
            })
        ).toThrow(/Refusing to run the destructive seed/);
    });

    it("passes for a local URL", () => {
        expect(() => assertSafeToSeed({ DATABASE_URL: "file:./dev.db" })).not.toThrow();
    });

    it("honors the explicit override", () => {
        expect(() =>
            assertSafeToSeed({
                DATABASE_URL: "postgresql://o:p@x.neon.tech/db",
                ALLOW_DESTRUCTIVE_SEED: "true",
            })
        ).not.toThrow();
    });
});
