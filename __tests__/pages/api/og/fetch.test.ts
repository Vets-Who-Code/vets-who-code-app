import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/og/fetch";

function createMockReqRes(ip: string): { req: NextApiRequest; res: NextApiResponse } {
    const req = {
        method: "GET",
        query: {},
        headers: { "x-forwarded-for": ip },
        socket: {},
    } as unknown as NextApiRequest;
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
    return { req, res };
}

describe("rate limiting /api/og/fetch", () => {
    it("returns 429 with Retry-After after 10 requests in 15 minutes from one IP", async () => {
        const ip = "203.0.113.30";

        for (let i = 0; i < 10; i++) {
            const { req, res } = createMockReqRes(ip);
            await handler(req, res);
            // Under the limit: requests reach URL validation, not the limiter.
            expect(res.status).toHaveBeenCalledWith(400);
        }

        const { req, res } = createMockReqRes(ip);
        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(429);
        expect(res.json).toHaveBeenCalledWith({
            error: "Too many requests. Please try again later.",
        });
        expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(Number));
    });
});
