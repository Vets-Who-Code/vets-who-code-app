import MainMenu from "@components/menu/main-menu";
import { fireEvent, render, screen } from "@testing-library/react";

const menu = [
    {
        id: 1,
        label: "About",
        path: "/about-us",
        submenu: [{ id: 11, label: "Team", path: "/team" }],
    },
];

const disclosureMenu = [
    {
        id: 1,
        label: "About",
        path: "#!",
        submenu: [{ id: 11, label: "Team", path: "/team" }],
    },
];

describe("MainMenu", () => {
    it("keeps a submenu expanded while focus is inside it and collapses when focus leaves", () => {
        render(
            <>
                <MainMenu menu={menu} />
                <button type="button">Outside</button>
            </>
        );
        const parent = screen.getByRole("link", { name: "About" });
        const child = screen.getByRole("link", { name: "Team" });
        const outside = screen.getByRole("button", { name: "Outside" });

        fireEvent.focusIn(parent);
        expect(parent).toHaveAttribute("aria-expanded", "true");

        fireEvent.focusOut(parent, { relatedTarget: child });
        expect(parent).toHaveAttribute("aria-expanded", "true");

        fireEvent.focusOut(child, { relatedTarget: outside });
        expect(parent).toHaveAttribute("aria-expanded", "false");
    });

    it('renders a "#!" parent as a disclosure button, not a link', () => {
        render(<MainMenu menu={disclosureMenu} />);
        const parent = screen.getByRole("button", { name: "About" });

        expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument();
        expect(parent).toHaveAttribute("aria-expanded", "false");
        expect(parent).toHaveAttribute("aria-controls", "nav-1-submenu");
    });

    it("reveals the submenu on focus and hides it again on Escape without moving focus", () => {
        render(<MainMenu menu={disclosureMenu} />);
        const parent = screen.getByRole("button", { name: "About" });
        const submenu = document.getElementById("nav-1-submenu");

        fireEvent.focusIn(parent);
        expect(parent).toHaveAttribute("aria-expanded", "true");
        expect(submenu).toHaveClass("tw-opacity-100");

        fireEvent.keyDown(parent, { key: "Escape" });
        expect(parent).toHaveAttribute("aria-expanded", "false");
        expect(submenu).not.toHaveClass("tw-opacity-100");
        expect(document.activeElement).toBe(parent);
    });
});
