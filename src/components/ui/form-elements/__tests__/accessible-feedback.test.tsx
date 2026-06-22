import { render, screen } from "@testing-library/react";
import Input from "../input";
import Textarea from "../textarea";

describe("form element error feedback accessibility", () => {
    it("connects input errors with aria-describedby and alert feedback", () => {
        render(
            <Input
                id="email"
                name="email"
                state="error"
                feedbackText="Enter a valid email address"
            />
        );

        const input = screen.getByRole("textbox");
        const alert = screen.getByRole("alert");

        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAttribute("aria-describedby", "email-error");
        expect(alert).toHaveAttribute("id", "email-error");
        expect(alert).toHaveTextContent("Enter a valid email address");
    });

    it("connects textarea errors with aria-describedby and alert feedback", () => {
        render(
            <Textarea
                id="message"
                name="message"
                state="error"
                feedbackText="Message is required"
            />
        );

        const textarea = screen.getByRole("textbox");
        const alert = screen.getByRole("alert");

        expect(textarea).toHaveAttribute("aria-invalid", "true");
        expect(textarea).toHaveAttribute("aria-describedby", "message-error");
        expect(alert).toHaveAttribute("id", "message-error");
        expect(alert).toHaveTextContent("Message is required");
    });

    it("uses a custom feedback id when provided", () => {
        render(
            <Input
                id="email"
                name="email"
                state="error"
                feedbackId="signup-email-feedback"
                feedbackText="Enter a valid email address"
            />
        );

        const input = screen.getByRole("textbox");
        const alert = screen.getByRole("alert");

        expect(input).toHaveAttribute("aria-describedby", "signup-email-feedback");
        expect(alert).toHaveAttribute("id", "signup-email-feedback");
    });
});
