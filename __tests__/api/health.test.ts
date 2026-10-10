import { NextApiRequest, NextApiResponse } from "next";
import type { Mock } from "vitest";
import handler from "@/pages/api/health";

// Each call gets a unique IP by default so the per-IP rate limiter
// never interferes across tests. Pass `ip` to share a bucket on purpose.
let nextIp = 0;

function createMockReqRes(
    method = "GET",
    ip?: string
): {
    req: NextApiRequest;
    res: NextApiResponse;
} {
    nextIp++;
    const req = {
        method,
        headers: { "x-forwarded-for": ip ?? `198.51.100.${nextIp}` },
        socket: {},
    } as unknown as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe("GET /api/health", () => {
    it("returns 200 and status healthy", async () => {
        const { req, res } = createMockReqRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const body = (res.json as Mock).mock.calls[0][0];
        expect(body.status).toBe("healthy");
    });

    it("returns 405 for non-GET methods", async () => {
        for (const method of ["POST", "PUT", "DELETE"]) {
            const { req, res } = createMockReqRes(method);

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(405);
            expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
        }
    });

    it("response includes version, timestamp, and uptime", async () => {
        const { req, res } = createMockReqRes();

        await handler(req, res);

        const body = (res.json as Mock).mock.calls[0][0];
        expect(body).toHaveProperty("version");
        expect(typeof body.version).toBe("string");
        expect(body).toHaveProperty("timestamp");
        expect(new Date(body.timestamp).toISOString()).toBe(body.timestamp);
        expect(body).toHaveProperty("uptime");
        expect(typeof body.uptime).toBe("number");
        expect(body.uptime).toBeGreaterThanOrEqual(0);
    });

    it("returns 429 with Retry-After after 30 requests per minute from one IP", async () => {
        const ip = "203.0.113.50";

        for (let i = 0; i < 30; i++) {
            const { req, res } = createMockReqRes("GET", ip);
            await handler(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        }

        const { req, res } = createMockReqRes("GET", ip);
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(429);
        expect(res.json).toHaveBeenCalledWith({
            error: "Too many requests. Please try again later.",
        });
        expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(Number));
    });
});
