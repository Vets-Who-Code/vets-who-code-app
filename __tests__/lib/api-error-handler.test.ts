import type { NextApiResponse } from "next";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleApiError } from "@/lib/api-error-handler";

function mockRes() {
    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });
    return { status, json, res: { status } as unknown as NextApiResponse };
}

describe("handleApiError", () => {
    beforeEach(() => {
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
    });

    it("returns a 500 with the custom message and no details", () => {
        const { status, json, res } = mockRes();

        handleApiError(new Error("boom"), res, "Failed to fetch jobs");

        expect(status).toHaveBeenCalledWith(500);
        expect(json).toHaveBeenCalledWith({ error: "Failed to fetch jobs" });
    });

    it("falls back to a generic message when none is given", () => {
        const { json, res } = mockRes();

        handleApiError(new Error("boom"), res);

        expect(json).toHaveBeenCalledWith({ error: "An unexpected error occurred" });
    });

    it("exposes the error text as details in development", () => {
        vi.stubEnv("NODE_ENV", "development");
        const { json, res } = mockRes();

        handleApiError(new Error("boom"), res, "Failed to fetch jobs");

        expect(json).toHaveBeenCalledWith({ error: "Failed to fetch jobs", details: "boom" });
    });

    it("omits details in development when the throwable is not an Error", () => {
        vi.stubEnv("NODE_ENV", "development");
        const { json, res } = mockRes();

        handleApiError("boom", res, "Failed to fetch jobs");

        expect(json).toHaveBeenCalledWith({ error: "Failed to fetch jobs" });
    });
});
