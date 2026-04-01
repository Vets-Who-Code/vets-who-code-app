import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import type { NextApiRequest } from "next";

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
});
