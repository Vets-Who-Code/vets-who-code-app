import { handleClientError } from "../handle-client-error";

describe("handleClientError", () => {
    it("logs with context and returns the error message", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        const message = handleClientError(new Error("Request failed"), "challenges:hint");
        expect(spy).toHaveBeenCalledWith("[challenges:hint]", expect.any(Error));
        expect(message).toBe("Request failed");
        spy.mockRestore();
    });

    it("returns a generic message for non-Error values", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        expect(handleClientError("boom", "ctx")).toBe("Something went wrong. Please try again.");
        spy.mockRestore();
    });

    it("returns a generic message for an Error without a message", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        expect(handleClientError(new Error(), "ctx")).toBe(
            "Something went wrong. Please try again."
        );
        spy.mockRestore();
    });
});
