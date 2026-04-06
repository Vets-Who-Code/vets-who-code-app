import type { Mock } from "vitest";

vi.mock("axios", () => {
    const create = vi.fn(() => ({
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    }));
    return { default: { create } };
});

import axios from "axios";

describe("j0di3-client", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        vi.resetModules();
        process.env = {
            ...originalEnv,
            J0DI3_API_URL: "https://j0di3.example.com",
            J0DI3_API_KEY: "test-api-key-123",
        };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it("creates an axios instance with correct baseURL and headers", async () => {
        await import("@/lib/j0di3-client");

        expect(axios.create).toHaveBeenCalledWith(
            expect.objectContaining({
                baseURL: "https://j0di3.example.com",
                headers: expect.objectContaining({
                    "X-API-Key": "test-api-key-123",
                    "Content-Type": "application/json",
                }),
                timeout: 300000,
            })
        );
    });

    it("sets timeout to 5 minutes", async () => {
        await import("@/lib/j0di3-client");

        const callArgs = (axios.create as Mock).mock.calls[0][0];
        expect(callArgs.timeout).toBe(300000);
    });
});
