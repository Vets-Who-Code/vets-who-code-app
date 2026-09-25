import { render, screen } from "@testing-library/react";
import Checkbox from "@ui/form-elements/checkbox";
import Input from "@ui/form-elements/input";
import Textarea from "@ui/form-elements/textarea";

describe("form-elements accessibility wiring", () => {
    it("Input flags itself invalid and links the error feedback as its description", () => {
        render(<Input id="email" name="email" state="error" feedbackText="Bad" showState={true} />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAttribute("aria-describedby", "email-feedback");
        expect(input).toBeInvalid();
        expect(input).toHaveAccessibleDescription("Bad");

        const alert = screen.getByRole("alert");
        expect(alert).toHaveAttribute("id", "email-feedback");
        expect(alert).toHaveTextContent("Bad");
    });

    it("Input emits no aria wiring when the feedback does not render", () => {
        render(
            <Input
                id="email"
                name="email"
                state="success"
                feedbackText="Looks good"
                showState={false}
            />
        );

        const input = screen.getByRole("textbox");
        expect(input).not.toHaveAttribute("aria-invalid");
        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input).not.toBeInvalid();
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("Input renders non-error feedback as a status, not an alert", () => {
        render(
            <Input
                id="email"
                name="email"
                state="success"
                feedbackText="Looks good"
                showState={true}
                showErrorOnly={false}
            />
        );

        const input = screen.getByRole("textbox");
        expect(input).not.toHaveAttribute("aria-invalid");
        expect(input).toHaveAttribute("aria-describedby", "email-feedback");
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent("Looks good");
    });

    it("Textarea carries the same wiring", () => {
        render(
            <Textarea id="bio" name="bio" state="error" feedbackText="Too short" showState={true} />
        );

        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveAttribute("aria-invalid", "true");
        expect(textarea).toHaveAttribute("aria-describedby", "bio-feedback");
        expect(textarea).toHaveAccessibleDescription("Too short");
        expect(screen.getByRole("alert")).toHaveAttribute("id", "bio-feedback");
    });

    it("Checkbox label points at the input and carries the same wiring", () => {
        render(
            <Checkbox
                id="agree"
                name="agree"
                label="Agree"
                state="error"
                feedbackText="Required"
                showState={true}
            />
        );

        const checkbox = screen.getByLabelText("Agree");
        expect(checkbox).toHaveAttribute("type", "checkbox");
        expect(checkbox).toHaveAttribute("id", "agree");
        expect(screen.getByText("Agree")).toHaveAttribute("for", "agree");
        expect(checkbox).toHaveAttribute("aria-invalid", "true");
        expect(checkbox).toHaveAttribute("aria-describedby", "agree-feedback");
        expect(checkbox).toHaveAccessibleDescription("Required");
        expect(screen.getByRole("alert")).toHaveAttribute("id", "agree-feedback");
    });
});
