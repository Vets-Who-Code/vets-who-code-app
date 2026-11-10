import type { NextApiRequest, NextApiResponse } from "next";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { withApiLogging } from "@/lib/api-logger";

function mockReq(): NextApiRequest {
    return {
        method: "POST",
        url: "/api/contact?token=abc",
        headers: { "x-forwarded-for": "203.0.113.7", authorization: "Bearer secret" },
        socket: {},
        body: { email: "jane@example.com" },
    } as unknown as NextApiRequest;
}

function mockRes() {
    const res = {
        statusCode: 200,
        headersSent: false,
        body: undefined as unknown,
        status(code: number) {
            res.statusCode = code;
            return res;
        },
        json(body: unknown) {
            res.body = body;
            res.headersSent = true;
            return res;
        },
    };
    return res;
}

function entries(spy: { mock: { calls: unknown[][] } }) {
    return spy.mock.calls.map((call) => JSON.parse(call[0] as string));
}

describe("withApiLogging", () => {
    let info: ReturnType<typeof vi.spyOn>;
    let error: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        info = vi.spyOn(console, "info").mockImplementation(() => {});
        error = vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("logs method, path, status, duration and ip for each request", async () => {
        const res = mockRes();
        const handler = withApiLogging(async (_req, r) => {
            r.status(201).json({ ok: true });
        });

        await handler(mockReq(), res as unknown as NextApiResponse);

        const [entry] = entries(info);
        expect(entry.msg).toBe("API request");
        expect(entry.context).toMatchObject({
            method: "POST",
            path: "/api/contact",
            status: 201,
            ip: "203.0.113.7",
        });
        expect(typeof entry.context.durationMs).toBe("number");
        expect(res.body).toEqual({ ok: true });
    });

    it("converts a thrown error into a safe 500 and logs it", async () => {
        const res = mockRes();
        const handler = withApiLogging(async () => {
            throw new Error("database exploded");
        });

        await handler(mockReq(), res as unknown as NextApiResponse);

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: "An unexpected error occurred" });

        const [logged] = entries(error);
        expect(logged.context.error.message).toBe("database exploded");
        expect(typeof logged.context.error.stack).toBe("string");
        expect(entries(info)[0].context.status).toBe(500);
    });

    it("never logs the request body, headers or query string", async () => {
        const handler = withApiLogging(async () => {
            throw new Error("boom");
        });

        await handler(mockReq(), mockRes() as unknown as NextApiResponse);

        const output = [...info.mock.calls, ...error.mock.calls].map((c) => c[0]).join("\n");
        expect(output).not.toContain("jane@example.com");
        expect(output).not.toContain("Bearer secret");
        expect(output).not.toContain("token=abc");
    });

    it("only logs when the error happens after the response was sent", async () => {
        const res = mockRes();
        const handler = withApiLogging(async (_req, r) => {
            r.status(200).json({ ok: true });
            throw new Error("late failure");
        });

        await handler(mockReq(), res as unknown as NextApiResponse);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ ok: true });
        expect(entries(error)[0].msg).toBe("Unhandled API error after response was sent");
    });
});
