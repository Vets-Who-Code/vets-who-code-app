import { inspect } from "node:util";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toSafeError } from "../safe-error";

const API_KEY = "test-api-key-5f3c9a";
const EMAIL = "veteran@example.com";

// A client set up like the server-side ones: a default secret header. The
// adapter stands in for the network so the error carries the real merged config.
function clientThatFailsWith(fail: (config: InternalAxiosRequestConfig) => AxiosError) {
    return axios.create({
        baseURL: "https://upstream.example.com",
        headers: { "X-API-Key": API_KEY, "Content-Type": "application/json" },
        adapter: (config) => Promise.reject(fail(config)),
    });
}

async function captureError(promise: Promise<unknown>): Promise<unknown> {
    try {
        await promise;
    } catch (error) {
        return error;
    }
    throw new Error("expected the request to fail");
}

describe("toSafeError", () => {
    it("drops headers and request body from an axios error with no response", async () => {
        const client = clientThatFailsWith(
            (config) =>
                new AxiosError("timeout of 300000ms exceeded", "ECONNABORTED", config, {
                    _header: `POST /api/v1/items HTTP/1.1\r\nX-API-Key: ${API_KEY}\r\n`,
                })
        );
        const error = await captureError(
            client.post("/api/v1/items?session=abc123", { email: EMAIL })
        );

        // console.error formats objects with util.inspect. Logging the raw error
        // (the old behavior) prints both the key and the body.
        const raw = inspect(error, { depth: null });
        expect(raw).toContain(API_KEY);
        expect(raw).toContain(EMAIL);

        const logged = inspect(toSafeError(error), { depth: null });
        expect(logged).not.toContain(API_KEY);
        expect(logged).not.toContain(EMAIL);
        expect(logged).not.toContain("abc123");
        expect(toSafeError(error)).toEqual({
            name: "AxiosError",
            message: "timeout of 300000ms exceeded",
            code: "ECONNABORTED",
            method: "POST",
            path: "/api/v1/items",
        });
    });

    it("keeps the status but drops response data and config", async () => {
        const client = clientThatFailsWith(
            (config) =>
                new AxiosError(
                    "Request failed with status code 502",
                    "ERR_BAD_RESPONSE",
                    config,
                    {},
                    {
                        status: 502,
                        statusText: "Bad Gateway",
                        headers: {},
                        config,
                        data: { detail: `upstream rejected ${EMAIL}` },
                    }
                )
        );
        const error = await captureError(client.patch("/api/v1/items/42", { email: EMAIL }));

        const safe = toSafeError(error);
        const logged = inspect(safe, { depth: null });

        expect(logged).not.toContain(API_KEY);
        expect(logged).not.toContain(EMAIL);
        expect(safe).toEqual({
            name: "AxiosError",
            message: "Request failed with status code 502",
            code: "ERR_BAD_RESPONSE",
            status: 502,
            method: "PATCH",
            path: "/api/v1/items/42",
        });
    });

    it("keeps name and message for a plain Error", () => {
        expect(toSafeError(new TypeError("boom"))).toEqual({ name: "TypeError", message: "boom" });
    });

    it("stringifies non-Error values", () => {
        expect(toSafeError("boom")).toEqual({ message: "boom" });
    });
});
