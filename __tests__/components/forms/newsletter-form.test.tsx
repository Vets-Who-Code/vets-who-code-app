import NewsletterForm from "@components/forms/newsletter-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockFetch = vi.fn();

function jsonResponse(payload: unknown) {
    return { json: () => Promise.resolve(payload) } as unknown as Response;
}

function renderForm() {
    render(<NewsletterForm />);
    return {
        input: screen.getByLabelText("Newsletter") as HTMLInputElement,
        submit: screen.getByRole("button", { name: "Subscribe" }),
    };
}

describe("NewsletterForm", () => {
    beforeEach(() => {
        mockFetch.mockReset();
        vi.stubGlobal("fetch", mockFetch);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("renders the email input and the Subscribe button", () => {
        const { input, submit } = renderForm();

        expect(input).toHaveAttribute("type", "email");
        expect(input).toHaveAttribute("placeholder", "Your E-mail");
        expect(submit).toHaveAttribute("type", "submit");
    });

    it("shows the required error and does not call fetch when submitted empty", async () => {
        const { submit } = renderForm();

        fireEvent.click(submit);

        expect(await screen.findByText("Email is required")).toBeInTheDocument();
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it("shows the format error and does not call fetch for an invalid email", async () => {
        const { input, submit } = renderForm();

        // Passes the browser's native type="email" check (so the submit event fires)
        // but fails validateEmail, which requires a dotted top-level domain.
        fireEvent.change(input, { target: { value: "jody@example" } });
        fireEvent.click(submit);

        expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it("posts a valid email to /api/newsletter, then shows success and clears the input", async () => {
        mockFetch.mockResolvedValue(jsonResponse({ ok: true }));
        const { input, submit } = renderForm();

        fireEvent.change(input, { target: { value: "jody@example.com" } });
        fireEvent.click(submit);

        expect(await screen.findByText("Thank you for subscribing!")).toBeInTheDocument();
        expect(mockFetch).toHaveBeenCalledTimes(1);
        const [url, options] = mockFetch.mock.calls[0];
        expect(url).toBe("/api/newsletter");
        expect(options.method).toBe("POST");
        expect(JSON.parse(options.body)).toEqual({ newsletter_email: "jody@example.com" });
        await waitFor(() => {
            expect(input.value).toBe("");
        });
    });

    it("shows the server error and no success message when the API rejects the email", async () => {
        mockFetch.mockResolvedValue(jsonResponse({ ok: false, error: "Already subscribed" }));
        const { input, submit } = renderForm();

        fireEvent.change(input, { target: { value: "jody@example.com" } });
        fireEvent.click(submit);

        expect(await screen.findByText("Already subscribed")).toBeInTheDocument();
        expect(screen.queryByText("Thank you for subscribing!")).not.toBeInTheDocument();
    });

    it("falls back to a generic error when the API fails without a message", async () => {
        mockFetch.mockResolvedValue(jsonResponse({ ok: false }));
        const { input, submit } = renderForm();

        fireEvent.change(input, { target: { value: "jody@example.com" } });
        fireEvent.click(submit);

        expect(await screen.findByText("OOPS Something went wrong")).toBeInTheDocument();
    });

    it("shows the thrown error message when fetch rejects", async () => {
        mockFetch.mockRejectedValue(new Error("Network down"));
        const { input, submit } = renderForm();

        fireEvent.change(input, { target: { value: "jody@example.com" } });
        fireEvent.click(submit);

        expect(await screen.findByText("Network down")).toBeInTheDocument();
        expect(screen.queryByText("Thank you for subscribing!")).not.toBeInTheDocument();
    });

    it("clears the error message when the user types again", async () => {
        mockFetch.mockResolvedValue(jsonResponse({ ok: false, error: "Already subscribed" }));
        const { input, submit } = renderForm();

        fireEvent.change(input, { target: { value: "jody@example.com" } });
        fireEvent.click(submit);
        expect(await screen.findByText("Already subscribed")).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "jody+new@example.com" } });

        expect(screen.queryByText("Already subscribed")).not.toBeInTheDocument();
    });
});
