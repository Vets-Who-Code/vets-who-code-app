import { fireEvent, render, screen } from "@testing-library/react";
import MainMenu from "@components/menu/main-menu";

const menu = [
    {
        id: 1,
        label: "About",
        path: "/about-us",
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
});
