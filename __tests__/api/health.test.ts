import { NextApiRequest, NextApiResponse } from "next";
import type { Mock } from "vitest";
import handler from "@/pages/api/health";

vi.mock("@/lib/prisma", () => ({
    default: {
        $queryRaw: vi.fn(),
    },
}));

import prisma from "@/lib/prisma";

const mockQueryRaw = prisma.$queryRaw as Mock;

function createMockReqRes(method = "GET"): {
    req: NextApiRequest;
    res: NextApiResponse;
} {
    const req = { method } as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe("GET /api/health", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = {
            ...originalEnv,
            DATABASE_URL: "postgresql://localhost:5432/test",
            NEXTAUTH_SECRET: "test-secret",
            NEXTAUTH_URL: "http://localhost:3000",
        };
        mockQueryRaw.mockResolvedValue([{ "?column?": 1 }]);
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it("returns 200 and status healthy when DB is reachable and env vars are set", async () => {
        const { req, res } = createMockReqRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const body = (res.json as Mock).mock.calls[0][0];
        expect(body.status).toBe("healthy");
    });

    it("returns 200 and status degraded when env vars are missing but DB works", async () => {
        delete process.env.NEXTAUTH_SECRET;
        delete process.env.NEXTAUTH_URL;
        const { req, res } = createMockReqRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const body = (res.json as Mock).mock.calls[0][0];
        expect(body.status).toBe("degraded");
    });

    it("returns 503 and status unhealthy when DB query throws", async () => {
        mockQueryRaw.mockRejectedValue(new Error("Connection refused"));
        const { req, res } = createMockReqRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        const body = (res.json as Mock).mock.calls[0][0];
        expect(body.status).toBe("unhealthy");
    });

    it("returns 405 for non-GET methods", async () => {
        for (const method of ["POST", "PUT", "DELETE"]) {
            const { req, res } = createMockReqRes(method);

            await handler(req, res);

            expect(res.status).toHaveBeenCalledWith(405);
            expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
        }
    });

    it("response includes version, timestamp, uptime, and checks array", async () => {
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
        expect(Array.isArray(body.checks)).toBe(true);
        expect(body.checks).toHaveLength(2);
    });

    it("database check includes responseTime as a number", async () => {
        const { req, res } = createMockReqRes();

        await handler(req, res);

        const body = (res.json as Mock).mock.calls[0][0];
        const dbCheck = body.checks.find((c: { name: string }) => c.name === "database");
        expect(dbCheck).toBeDefined();
        expect(dbCheck.status).toBe("healthy");
        expect(typeof dbCheck.responseTime).toBe("number");
        expect(dbCheck.responseTime).toBeGreaterThanOrEqual(0);
    });

    it("environment check lists missing variable names when applicable", async () => {
        delete process.env.NEXTAUTH_SECRET;
        const { req, res } = createMockReqRes();

        await handler(req, res);

        const body = (res.json as Mock).mock.calls[0][0];
        const envCheck = body.checks.find((c: { name: string }) => c.name === "environment");
        expect(envCheck).toBeDefined();
        expect(envCheck.status).toBe("unhealthy");
        expect(envCheck.missing).toEqual(["NEXTAUTH_SECRET"]);
    });

    it("reports all missing env vars correctly", async () => {
        delete process.env.DATABASE_URL;
        delete process.env.NEXTAUTH_SECRET;
        delete process.env.NEXTAUTH_URL;
        const { req, res } = createMockReqRes();

        await handler(req, res);

        const body = (res.json as Mock).mock.calls[0][0];
        const envCheck = body.checks.find((c: { name: string }) => c.name === "environment");
        expect(envCheck.missing).toEqual(["DATABASE_URL", "NEXTAUTH_SECRET", "NEXTAUTH_URL"]);
    });

    it("database check reports responseTime even when unhealthy", async () => {
        mockQueryRaw.mockRejectedValue(new Error("timeout"));
        const { req, res } = createMockReqRes();

        await handler(req, res);

        const body = (res.json as Mock).mock.calls[0][0];
        const dbCheck = body.checks.find((c: { name: string }) => c.name === "database");
        expect(dbCheck.status).toBe("unhealthy");
        expect(typeof dbCheck.responseTime).toBe("number");
    });
});
