import DonateForm from "@components/forms/donate-form";
import { render, screen } from "@testing-library/react";

const CONTACT = "mailto:hello@vetswhocode.io";

describe("DonateForm", () => {
    it("points every contact link at the published address", () => {
        render(<DonateForm />);

        const mailtos = screen
            .getAllByRole("link")
            .filter((link) => link.getAttribute("href")?.startsWith("mailto:"));

        expect(mailtos).toHaveLength(2);
        for (const link of mailtos) {
            expect(link).toHaveAttribute("href", CONTACT);
        }
    });

    it("shows the same address it links to", () => {
        render(<DonateForm />);

        const link = screen.getByRole("link", { name: /@vetswhocode\.io/ });

        expect(link).toHaveAttribute("href", `mailto:${link.textContent?.trim()}`);
    });
});
