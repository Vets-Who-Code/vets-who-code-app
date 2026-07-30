import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Issue #1195: certificate-number generation must not collide under concurrency.
 * generateCertificateNumber is count-based; issueCertificateWithUniqueNumber must
 * retry on the certificateNumber unique-constraint violation so concurrent
 * issuance yields unique numbers and never crashes on the constraint.
 */

const certCount = vi.fn();
vi.mock("@/lib/prisma", () => ({
    default: { certificate: { count: (...a: unknown[]) => certCount(...a) } },
}));

// Freeze the year so generated numbers are deterministic.
beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-01T00:00:00Z"));
});
afterEach(() => {
    vi.useRealTimers();
});

function p2002(target: string[]) {
    return Object.assign(new Error("Unique constraint failed"), {
        code: "P2002",
        meta: { target },
    });
}

describe("issueCertificateWithUniqueNumber", () => {
    it("retries with a fresh number when certificateNumber collides", async () => {
        const { issueCertificateWithUniqueNumber } = await import("@/lib/certificates");
        // count grows as if another issuance landed between attempts
        certCount.mockResolvedValueOnce(4).mockResolvedValueOnce(5);
        const numbersTried: string[] = [];
        let calls = 0;

        const result = await issueCertificateWithUniqueNumber(async (certificateNumber) => {
            numbersTried.push(certificateNumber);
            calls += 1;
            if (calls === 1) throw p2002(["certificateNumber"]);
            return { certificateNumber };
        });

        expect(calls).toBe(2);
        expect(numbersTried).toEqual(["VWC-2026-000005", "VWC-2026-000006"]);
        expect(result).toEqual({ certificateNumber: "VWC-2026-000006" });
    });

    it("succeeds on the first attempt with no collision", async () => {
        const { issueCertificateWithUniqueNumber } = await import("@/lib/certificates");
        certCount.mockResolvedValue(0);
        const result = await issueCertificateWithUniqueNumber(async (n) => ({ n }));
        expect(result).toEqual({ n: "VWC-2026-000001" });
    });

    it("does not retry on an unrelated unique violation (e.g. userId_courseId)", async () => {
        const { issueCertificateWithUniqueNumber } = await import("@/lib/certificates");
        certCount.mockResolvedValue(0);
        let calls = 0;
        await expect(
            issueCertificateWithUniqueNumber(async () => {
                calls += 1;
                throw p2002(["userId", "courseId"]);
            })
        ).rejects.toMatchObject({ code: "P2002" });
        expect(calls).toBe(1);
    });

    it("gives up after maxAttempts of persistent collisions", async () => {
        const { issueCertificateWithUniqueNumber } = await import("@/lib/certificates");
        certCount.mockResolvedValue(0);
        let calls = 0;
        await expect(
            issueCertificateWithUniqueNumber(async () => {
                calls += 1;
                throw p2002(["certificateNumber"]);
            }, 3)
        ).rejects.toMatchObject({ code: "P2002" });
        expect(calls).toBe(3);
    });
});
