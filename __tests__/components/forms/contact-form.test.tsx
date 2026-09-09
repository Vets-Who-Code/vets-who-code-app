import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios, { type AxiosResponse } from "axios";
import ContactUsForm from "@/components/forms/contact-us-form";

vi.mock("axios");

const mockPost = vi.mocked(axios.post);

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
    });

    it("rejects a malformed email address", async () => {
        render(<ContactUsForm />);

        fillRequiredFields();
        // Native type="email" validation would block the submit for an address with no
        // "@", so use one the browser accepts but the app validator (which wants a TLD) rejects.
        fireEvent.change(field("Email"), { target: { value: "jane@example" } });
        submit();

        expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
        expect(mockPost).not.toHaveBeenCalled();
    });

    it("treats phone as optional but validates a typed value", async () => {
        mockPost.mockResolvedValue({ status: 200 } as AxiosResponse);
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
        mockPost.mockResolvedValue({ status: 200 } as AxiosResponse);
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
        mockPost.mockResolvedValue({ status: 200 } as AxiosResponse);
        render(<ContactUsForm />);

        fireEvent.click(roleButton("Partner"));
        fillRequiredFields();
        fireEvent.change(field("Phone"), { target: { value: "(555) 555-5555" } });
        submit();

        expect(await screen.findByText(SUCCESS)).toBeInTheDocument();
        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(mockPost).toHaveBeenCalledWith("/api/contact", {
            ...VALID,
            phone: "(555) 555-5555",
            role: "Partner",
            website: "",
        });

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
        expect(screen.queryByText(SUCCESS)).not.toBeInTheDocument();
        expect(field("Name")).toHaveValue(VALID.name);
    });

    it("shows the error message when the response is not a 200", async () => {
        mockPost.mockResolvedValue({ status: 202 } as AxiosResponse);
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        expect(await screen.findByText(FAILURE)).toBeInTheDocument();
        expect(screen.queryByText(SUCCESS)).not.toBeInTheDocument();
        expect(field("Name")).toHaveValue(VALID.name);
    });

    it("disables the submit button while the request is pending", async () => {
        let settle: (value: AxiosResponse) => void = () => {};
        mockPost.mockReturnValue(
            new Promise<AxiosResponse>((resolve) => {
                settle = resolve;
            })
        );
        render(<ContactUsForm />);

        fillRequiredFields();
        submit();

        const button = screen.getByRole("button", { name: "Send Message" });
        await waitFor(() => expect(button).toBeDisabled());

        await act(async () => {
            settle({ status: 200 } as AxiosResponse);
        });

        expect(await screen.findByText(SUCCESS)).toBeInTheDocument();
        expect(button).toBeEnabled();
    });
});
