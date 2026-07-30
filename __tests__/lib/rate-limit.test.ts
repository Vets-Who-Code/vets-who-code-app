import type { NextApiRequest, NextApiResponse } from "next";
import { checkRateLimit, enforceRateLimit, getClientIp } from "@/lib/rate-limit";

describe("rate-limit", () => {
    describe("checkRateLimit", () => {
        it("should allow first request", () => {
            const result = checkRateLimit("192.168.1.1", 5, 60000);
            expect(result.allowed).toBe(true);
            expect(result.remaining).toBe(4);
        });

        it("should decrement remaining on subsequent requests", () => {
            const ip = "10.0.0.1";
            checkRateLimit(ip, 5, 60000);
            const result = checkRateLimit(ip, 5, 60000);
            expect(result.allowed).toBe(true);
            expect(result.remaining).toBe(3);
        });

        it("should block requests when limit is exceeded", () => {
            const ip = "10.0.0.2";
            for (let i = 0; i < 3; i++) {
                checkRateLimit(ip, 3, 60000);
            }
            const result = checkRateLimit(ip, 3, 60000);
            expect(result.allowed).toBe(false);
            expect(result.remaining).toBe(0);
        });

        it("should reset after window expires", () => {
            vi.useFakeTimers();
            const ip = "10.0.0.3";

            for (let i = 0; i < 3; i++) {
                checkRateLimit(ip, 3, 1000);
            }
            expect(checkRateLimit(ip, 3, 1000).allowed).toBe(false);

            vi.advanceTimersByTime(2000);

            const result = checkRateLimit(ip, 3, 1000);
            expect(result.allowed).toBe(true);
            expect(result.remaining).toBe(2);

            vi.useRealTimers();
        });
    });

    describe("getClientIp", () => {
        it("should extract IP from x-forwarded-for header string", () => {
            const req = {
                headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
                socket: { remoteAddress: "127.0.0.1" },
            } as unknown as NextApiRequest;

            expect(getClientIp(req)).toBe("1.2.3.4");
        });

        it("should extract IP from x-forwarded-for header array", () => {
            const req = {
                headers: { "x-forwarded-for": ["1.2.3.4", "5.6.7.8"] },
                socket: { remoteAddress: "127.0.0.1" },
            } as unknown as NextApiRequest;

            expect(getClientIp(req)).toBe("1.2.3.4");
        });

        it("should fall back to socket remoteAddress", () => {
            const req = {
                headers: {},
                socket: { remoteAddress: "127.0.0.1" },
            } as unknown as NextApiRequest;

            expect(getClientIp(req)).toBe("127.0.0.1");
        });

        it("should return 'unknown' when no IP is available", () => {
            const req = {
                headers: {},
                socket: {},
            } as unknown as NextApiRequest;

            expect(getClientIp(req)).toBe("unknown");
        });
    });

    describe("enforceRateLimit", () => {
        function createMockReqRes(ip: string): { req: NextApiRequest; res: NextApiResponse } {
            const req = {
                headers: { "x-forwarded-for": ip },
                socket: { remoteAddress: ip },
            } as unknown as NextApiRequest;
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn().mockReturnThis(),
                setHeader: vi.fn().mockReturnThis(),
            } as unknown as NextApiResponse;
            return { req, res };
        }

        it("should allow requests under the limit and set rate limit headers", () => {
            const { req, res } = createMockReqRes("20.0.0.1");

            const allowed = enforceRateLimit(req, res, {
                name: "test-allow",
                maxRequests: 2,
                windowMs: 60000,
            });

            expect(allowed).toBe(true);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.setHeader).toHaveBeenCalledWith("X-RateLimit-Remaining", 1);
        });

        it("should send 429 with Retry-After when the limit is exceeded", () => {
            const options = { name: "test-block", maxRequests: 2, windowMs: 60000 };
            for (let i = 0; i < 2; i++) {
                const { req, res } = createMockReqRes("20.0.0.2");
                enforceRateLimit(req, res, options);
            }

            const { req, res } = createMockReqRes("20.0.0.2");
            const allowed = enforceRateLimit(req, res, options);

            expect(allowed).toBe(false);
            expect(res.status).toHaveBeenCalledWith(429);
            expect(res.json).toHaveBeenCalledWith({
                error: "Too many requests. Please try again later.",
            });
            expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(Number));
        });

        it("should not share buckets between different names", () => {
            const ip = "20.0.0.3";
            const first = createMockReqRes(ip);
            enforceRateLimit(first.req, first.res, {
                name: "endpoint-a",
                maxRequests: 1,
                windowMs: 60000,
            });

            const { req, res } = createMockReqRes(ip);
            const allowed = enforceRateLimit(req, res, {
                name: "endpoint-b",
                maxRequests: 1,
                windowMs: 60000,
            });

            expect(allowed).toBe(true);
        });

        it("should use the provided key instead of the client IP", () => {
            const options = { name: "test-key", maxRequests: 1, windowMs: 60000 };
            const first = createMockReqRes("20.0.0.4");
            enforceRateLimit(first.req, first.res, { ...options, key: "troop:abc" });

            // Different IP, same key — still blocked.
            const { req, res } = createMockReqRes("20.0.0.5");
            const allowed = enforceRateLimit(req, res, { ...options, key: "troop:abc" });

            expect(allowed).toBe(false);
            expect(res.status).toHaveBeenCalledWith(429);
        });
    });
});
