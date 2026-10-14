import { postJson } from "@utils/post-json";

const mockFetch = vi.fn();

describe("postJson", () => {
    beforeEach(() => {
        mockFetch.mockReset();
        vi.stubGlobal("fetch", mockFetch);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("POSTs the body as JSON and resolves with the response", async () => {
        const response = { ok: true, status: 200 };
        mockFetch.mockResolvedValue(response);

        await expect(postJson("/api/contact", { name: "Jody" })).resolves.toBe(response);
        expect(mockFetch).toHaveBeenCalledWith("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Jody" }),
        });
    });

    it("rejects on a non-2xx status", async () => {
        mockFetch.mockResolvedValue({ ok: false, status: 500 });

        await expect(postJson("/api/contact", {})).rejects.toThrow(
            "Request failed with status code 500"
        );
    });

    it("attaches the response to the rejection", async () => {
        const response = { ok: false, status: 429 };
        mockFetch.mockResolvedValue(response);

        await expect(postJson("/api/contact", {})).rejects.toMatchObject({ response });
    });

    it("rejects on a network failure", async () => {
        mockFetch.mockRejectedValue(new TypeError("Failed to fetch"));

        await expect(postJson("/api/contact", {})).rejects.toThrow("Failed to fetch");
    });
});
