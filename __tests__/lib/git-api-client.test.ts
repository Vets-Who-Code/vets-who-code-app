import { gitAPI } from "@/lib/git-api-client";

const mockFetch = vi.fn();

describe("gitAPI.get", () => {
    beforeEach(() => {
        mockFetch.mockReset();
        vi.stubGlobal("fetch", mockFetch);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("GETs from the GitHub API and returns the status and parsed body", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ login: "user1" }),
        });

        const result = await gitAPI.get("/users/user1");

        expect(mockFetch).toHaveBeenCalledWith(
            "https://api.github.com/users/user1",
            expect.objectContaining({ headers: expect.any(Object) })
        );
        expect(result).toEqual({ status: 200, data: { login: "user1" } });
    });

    it("returns the status without a body on a non-2xx response", async () => {
        const json = vi.fn();
        mockFetch.mockResolvedValue({ ok: false, status: 404, json });

        const result = await gitAPI.get("/repos/owner/missing");

        expect(result).toEqual({ status: 404, data: undefined });
        expect(json).not.toHaveBeenCalled();
    });

    it.each(["//evil.com/x", "@evil.com/x", "https://evil.com/x"])(
        "refuses %s without sending the token",
        async (path) => {
            await expect(gitAPI.get(path)).rejects.toThrow("Refusing non-GitHub API path");
            expect(mockFetch).not.toHaveBeenCalled();
        }
    );
});
