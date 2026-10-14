import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { postJson } from "@utils/post-json";
import ContactUsForm from "@/components/forms/contact-us-form";

vi.mock("@utils/post-json");

const mockPost = vi.mocked(postJson);

const VALID = {
    name: "Jane Engineer",
    email: "jane@example.com",
    subject: "Hiring question",
    reason: "Hiring our troops",
    message: "We want to hire two of your software engineers.",
};

const SUCCESS = "Thank you for your message!";
const FAILURE = "There was an error. Please try again later.";

const field = (label: string) => screen.getByLabelText(label);

const fillRequiredFields = () => {
    fireEvent.change(field("Name"), { target: { value: VALID.name } });
    fireEvent.change(field("Email"), { target: { value: VALID.email } });
    fireEvent.change(field("Subject"), { target: { value: VALID.subject } });
    fireEvent.change(field("Reason for reaching out"), { target: { value: VALID.reason } });
    fireEvent.change(field("Message"), { target: { value: VALID.message } });
};

const submit = () => fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

const roleButton = (name: string) => screen.getByRole("button", { name });

// What postJson rejects with on a non-2xx status: an Error carrying the Response.
const httpError = (status: number, body: unknown) => {
    const response = new Response(typeof body === "string" ? body : JSON.stringify(body), {
        status,
    });
    return Object.assign(new Error(`Request failed with status code ${status}`), { response });
};

describe("ContactUsForm", () => {
    beforeEach(() => {
        mockPost.mockReset();
    });

    it("renders the labelled fields, role toggles and submit button", () => {
        render(<ContactUsForm />);

        expect(field("Name")).toBeInTheDocument();
        expect(field("Email")).toBeInTheDocument();
        expect(field("Phone")).toBeInTheDocument();
        expect(field("Subject")).toBeInTheDocument();
        expect(field("Reason for reaching out")).toBeInTheDocument();
        expect(field("Message")).toBeInTheDocument();

        expect(roleButton("Applicant")).toHaveAttribute("aria-pressed", "true");
        expect(roleButton("Partner")).toHaveAttribute("aria-pressed", "false");
        expect(roleButton("Press")).toHaveAttribute("aria-pressed", "false");

        expect(screen.getByRole("button", { name: "Send Message" })).toHaveAttribute(
            "type",
            "submit"
        );
    });

    it("shows required-field errors on an empty submit and does not post", async () => {
        render(<ContactUsForm />);

        submit();

        expect(await screen.findByText("Name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(screen.getByText("Subject is required")).toBeInTheDocument();
        expect(screen.getByText("Reason is required")).toBeInTheDocument();
        expect(screen.getByText("Message is required")).toBeInTheDocument();
        expect(mockPost).not.toHaveBeenCalled();

        expect(field("Name")).toBeInvalid();
        expect(field("Name")).toHaveAttribute("aria-invalid", "true");
        expect(field("Name")).toHaveAccessibleDescription("Name is required");
        expect(field("Email")).toBeInvalid();
        expect(field("Email")).toHaveAccessibleDescription("Email is required");
        expect(field("Reason for reaching out")).toBeInvalid();
        expect(field("Reason for reaching out")).toHaveAccessibleDescription("Reason is required");
        expect(field("Message")).toHaveAccessibleDescription("Message is required");
        expect(field("Phone")).not.toBeInvalid();
        expect(field("Phone")).not.toHaveAttribute("aria-describedby");
        expect(screen.getAllByRole("alert").map((el) => el.textContent)).toEqual([
            "Name is required",
            "Email is required",
            "Subject is required",
            "Reason is required",
            "Message is required",
        ]);
    });

    it("rejects a malformed email address", async () => {
        render(<ContactUsForm />);

        fillRequiredFields();
        // Native type="email" validation would block the submit for an address with no
        // "@", so use one the browser accepts but the app validator (which wants a TLD) rejects.
        fireEvent.change(field("Email"), { target: { value: "jane@example" } });
        submit();

        expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
        expect(field("Email")).toHaveAttribute("aria-invalid", "true");
        expect(field("Email")).toHaveAccessibleDescription("Invalid email format");
        expect(mockPost).not.toHaveBeenCalled();
    });

    it("treats phone as optional but validates a typed value", async () => {
        mockPost.mockResolvedValue({ status: 200 } as Response);
        render(<ContactUsForm />);

        fillRequiredFields();
        fireEvent.change(field("Phone"), { target: { value: "not a number" } });
        submit();

        expect(await screen.findByText("Invalid phone number format")).toBeInTheDocument();
        expect(mockPost).not.toHaveBeenCalled();

        fireEvent.change(field("Phone"), { target: { value: "" } });
        submit();

        await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));
        expect(screen.queryByText("Invalid phone number format")).not.toBeInTheDocument();
        expect(mockPost).toHaveBeenCalledWith(
            "/api/contact",
            expect.objectContaining({ phone: "" })
        );
    });

    it("sends the selected role with the submission", async () => {
        mockPost.mockResolvedValue({ status: 200 } as Response);
        render(<ContactUsForm />);

        fireEvent.click(roleButton("Press"));
        expect(roleButton("Press")).toHaveAttribute("aria-pressed", "true");
        expect(roleButton("Applicant")).toHaveAttribute("aria-pressed", "false");

        fillRequiredFields();
        submit();

        await waitFor(() =>
            expect(mockPost).toHaveBeenCalledWith(
                "/api/contact",
                expect.objectContaining({ role: "Press" })
            )
        );
    });

    it("posts the form, thanks the sender and resets everything on success", async () => {
        mockPost.mockResolvedValue({ status: 200 } as Response);
        render(<ContactUsForm />);

        fireEvent.click(roleButton("Partner"));
        fillRequiredFields();
        fireEvent.change(field("Phone"), { target: { value: "(555) 555-5555" } });
        submit();

        expect(await screen.findByText(SUCCESS)).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent(SUCCESS);
        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(mockPost).toHaveBeenCalledWith("/api/contact", {
            ...VALID,
            phone: "(555) 555-5555",
            role: "Partner",
            website: "",
        });

        expect(field("Name")).not.toBeInvalid();
        expect(field("Name")).not.toHaveAttribute("aria-describedby");
        expect(field("Name")).toHaveValue("");
        expect(field("Email")).toHaveValue("");
        expect(field("Phone")).toHaveValue("");
        expect(field("Subject")).toHaveValue("");
        expect(field("Reason for reaching out")).toHaveValue("");
        expect(field("Message")).toHaveValue("");
        expect(roleButton("Applicant")).toHaveAttribute("aria-pressed", "true");
        expect(roleButton("Partner")).toHaveAttribute("aria-pressed", "false");
    });

    it("shows the error message when the request is rejected", async () => {
        mockPost.mockRejectedValue(new Error("Network Error"));
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        expect(await screen.findByText(FAILURE)).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent(FAILURE);
        expect(screen.queryByText(SUCCESS)).not.toBeInTheDocument();
        expect(field("Name")).toHaveValue(VALID.name);
    });

    it("shows the rate-limit message from a 429 response body", async () => {
        mockPost.mockRejectedValue(
            httpError(429, { error: "Too many requests. Please try again later." })
        );
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        expect(await screen.findByRole("status")).toHaveTextContent(
            "Too many requests. Please try again later."
        );
        expect(field("Name")).toHaveValue(VALID.name);
    });

    it("shows the validation message from a 400 response body", async () => {
        mockPost.mockRejectedValue(
            httpError(400, { error: "Message is too short for submission" })
        );
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        expect(await screen.findByRole("status")).toHaveTextContent(
            "Message is too short for submission"
        );
    });

    it("falls back to a per-status message when a 4xx body is unreadable", async () => {
        mockPost.mockRejectedValue(httpError(429, "not json"));
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        expect(await screen.findByRole("status")).toHaveTextContent(
            "Too many messages sent. Please wait a minute and try again."
        );
    });

    it("never shows the body of a 500 response", async () => {
        mockPost.mockRejectedValue(
            httpError(500, { message: "Failed post to #contact channel: secret detail" })
        );
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        expect(await screen.findByRole("status")).toHaveTextContent(FAILURE);
        expect(screen.queryByText(/secret detail/)).not.toBeInTheDocument();
    });

    it("shows the error message when the response is not a 200", async () => {
        mockPost.mockResolvedValue({ status: 202 } as Response);
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        expect(await screen.findByText(FAILURE)).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent(FAILURE);
        expect(screen.queryByText(SUCCESS)).not.toBeInTheDocument();
        expect(field("Name")).toHaveValue(VALID.name);
    });

    it("disables the submit button while the request is pending", async () => {
        let settle: (value: Response) => void = () => {};
        mockPost.mockReturnValue(
            new Promise<Response>((resolve) => {
                settle = resolve;
            })
        );
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        const button = screen.getByRole("button", { name: "Send Message" });
        await waitFor(() => expect(button).toBeDisabled());

        await act(async () => {
            settle({ status: 200 } as Response);
        });

        expect(await screen.findByText(SUCCESS)).toBeInTheDocument();
        expect(button).toBeEnabled();
    });
});
