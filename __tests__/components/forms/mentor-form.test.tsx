import MentorMenteeForm from "@components/forms/mentor-form";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";

vi.mock("axios");

vi.mock("@components/EmojiRain", () => ({
    default: () => <div data-testid="emoji-rain" />,
}));

const mockPost = vi.mocked(axios.post);

const MENTOR_FIELDS: Array<[string, string]> = [
    ["Name *", "Jody Grinder"],
    ["Email *", "jody@example.com"],
    ["Military Branch Affiliation *", "Army"],
    ["GitHub Portfolio or LinkedIn *", "https://github.com/jodyvet"],
    ["Location *", "Nashville, TN"],
    ["Technical Expertise *", "React, Node"],
    ["Employer Restrictions *", "None"],
];

const fillMentorFields = () => {
    for (const [label, value] of MENTOR_FIELDS) {
        fireEvent.change(screen.getByLabelText(label), { target: { value } });
    }
};

// The role toggle above the form and the submit button inside it render the same
// text ("Register as Mentor"), so pick the submit by its type.
const submit = () => {
    const [button] = screen
        .getAllByRole("button", { name: /^Register as (Mentor|Mentee)$/ })
        .filter((el) => el.getAttribute("type") === "submit");
    fireEvent.click(button);
};

describe("MentorMenteeForm", () => {
    beforeEach(() => {
        mockPost.mockReset();
    });

    it("flags the empty required fields invalid and links each alert on submit", async () => {
        render(<MentorMenteeForm />);

        submit();

        expect(await screen.findByText("Name is required")).toBeInTheDocument();
        const name = screen.getByLabelText("Name *");
        expect(name).toBeInvalid();
        expect(name).toHaveAttribute("aria-invalid", "true");
        expect(name).toHaveAccessibleDescription("Name is required");
        expect(screen.getByLabelText("Email *")).toHaveAccessibleDescription("Email is required");
        expect(screen.getAllByRole("alert").map((el) => el.textContent)).toEqual([
            "Name is required",
            "Email is required",
            "Branch of Service is required",
            "GitHub Portfolio or LinkedIn is required",
            "Location is required",
            "Technical Expertise is required",
            "Employer Restrictions is required",
        ]);
        expect(mockPost).not.toHaveBeenCalled();
    });

    it("swaps in the mentee fields when the mentee role is chosen", () => {
        render(<MentorMenteeForm />);

        expect(screen.queryByLabelText("Availability *")).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Register as Mentee" }));

        expect(screen.getByLabelText("Availability *")).toBeInTheDocument();
        expect(screen.getByLabelText("Desired Skills to Learn *")).toBeInTheDocument();
        expect(screen.queryByLabelText("Technical Expertise *")).not.toBeInTheDocument();
    });

    it("announces the success message as a status", async () => {
        mockPost.mockResolvedValue({ data: {} } as never);
        render(<MentorMenteeForm />);

        fillMentorFields();
        submit();

        expect(await screen.findByRole("status")).toHaveTextContent(
            "Thank you for registering as a mentor!"
        );
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        expect(mockPost).toHaveBeenCalledWith(
            "/api/mentor",
            expect.objectContaining({ role: "mentor" })
        );
    });

    it("announces the failure message as an alert when the request is rejected", async () => {
        mockPost.mockRejectedValue(new Error("network down"));
        render(<MentorMenteeForm />);

        fillMentorFields();
        submit();

        expect(await screen.findByRole("alert")).toHaveTextContent(
            "Failed to submit the form. Please try again later."
        );
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
});
