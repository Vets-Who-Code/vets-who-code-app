import { afterEach, describe, expect, it, vi } from "vitest";
import { logger } from "@/lib/logger";

function lastEntry(spy: { mock: { calls: unknown[][] } }) {
    return JSON.parse(spy.mock.calls[spy.mock.calls.length - 1][0] as string);
}

describe("logger", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("writes a JSON line with level, msg, timestamp and context", () => {
        const spy = vi.spyOn(console, "info").mockImplementation(() => {});

        logger.info("Hello", { route: "/api/health" });

        const entry = lastEntry(spy);
        expect(entry.level).toBe("info");
        expect(entry.msg).toBe("Hello");
        expect(Number.isNaN(Date.parse(entry.timestamp))).toBe(false);
        expect(entry.context).toEqual({ route: "/api/health" });
    });

    it("routes each level to the matching console method", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const error = vi.spyOn(console, "error").mockImplementation(() => {});

        logger.warn("careful");
        logger.error("broken");

        expect(lastEntry(warn).level).toBe("warn");
        expect(lastEntry(error).level).toBe("error");
    });

    it("redacts sensitive keys at any depth, whatever their casing", () => {
        const spy = vi.spyOn(console, "info").mockImplementation(() => {});

        logger.info("Outbound call", {
            headers: {
                Authorization: "Bearer abc",
                Cookie: "session=1",
                "x-api-key": "k-123",
                "content-type": "application/json",
            },
            accessToken: "t-1",
            client_secret: "s-1",
            password: "hunter2",
            apiKey: "a-1",
            items: [{ token: "nested" }],
            count: 3,
        });

        const line = spy.mock.calls[0][0] as string;
        for (const secret of [
            "Bearer abc",
            "session=1",
            "k-123",
            "t-1",
            "s-1",
            "hunter2",
            "a-1",
            "nested",
        ]) {
            expect(line).not.toContain(secret);
        }
        const { context } = JSON.parse(line);
        expect(context.headers.Authorization).toBe("[REDACTED]");
        expect(context.headers["content-type"]).toBe("application/json");
        expect(context.items[0].token).toBe("[REDACTED]");
        expect(context.count).toBe(3);
    });

    it("serializes errors to name, message and stack", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});

        logger.error("Failed", { error: new TypeError("bad input") });

        const { context } = lastEntry(spy);
        expect(context.error.name).toBe("TypeError");
        expect(context.error.message).toBe("bad input");
        expect(typeof context.error.stack).toBe("string");
    });
});
