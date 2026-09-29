import { existsSync } from "node:fs";
import { join } from "node:path";
import HeroSection from "@containers/software-factory/hero";
import { render, screen } from "@testing-library/react";

describe("Software Factory hero", () => {
    it("keeps the Book Discovery CTA", () => {
        render(<HeroSection />);
        expect(screen.getByRole("link", { name: "Book Discovery" })).toHaveAttribute(
            "href",
            "#discovery"
        );
    });

    it("links only to files that exist in public/", () => {
        render(<HeroSection />);
        const files = screen
            .getAllByRole("link")
            .map((link) => link.getAttribute("href") ?? "")
            .filter((href) => /^\/.+\.\w+$/.test(href));
        for (const href of files) {
            expect(existsSync(join(process.cwd(), "public", href)), href).toBe(true);
        }
    });
});
