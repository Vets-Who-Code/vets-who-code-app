import MobileMenu from "@components/menu/mobile-menu";
import { fireEvent, render, screen } from "@testing-library/react";

// useKeyboardFocus needs the panel ref, so the motion mock must forward it.
vi.mock("motion/react", async () => {
    const { forwardRef } = await import("react");
    return {
        AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        motion: {
            div: forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
                ({ children, ...rest }, ref) => (
                    <div ref={ref} {...rest}>
                        {children}
                    </div>
                )
            ),
        },
    };
});

const menu = [
    {
        id: 1,
        label: "About",
        path: "#!",
        submenu: [{ id: 11, label: "Team", path: "/team" }],
    },
    { id: 2, label: "Contact", path: "/contact" },
];

const renderMenu = async (onClose = vi.fn()) => {
    render(<MobileMenu menu={menu} onClose={onClose} isOpen={true} />);
    await screen.findByRole("dialog", { name: "Navigation menu" });
    return onClose;
};

describe("MobileMenu", () => {
    it('renders a "#!" parent as a disclosure button that toggles its submenu', async () => {
        await renderMenu();
        const parent = screen.getByRole("button", { name: "About" });
        const child = screen.getByRole("link", { name: "Team", hidden: true });

        expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument();
        expect(parent).toHaveAttribute("aria-expanded", "false");
        expect(parent).toHaveAttribute("aria-controls", "mobile-submenu-1");
        expect(child).toHaveAttribute("tabindex", "-1");
        expect(child.closest("#mobile-submenu-1")).toHaveAttribute("aria-hidden", "true");

        fireEvent.click(parent);
        expect(parent).toHaveAttribute("aria-expanded", "true");
        expect(child).toHaveAttribute("tabindex", "0");
        expect(child.closest("#mobile-submenu-1")).toHaveAttribute("aria-hidden", "false");
    });

    it("moves focus into the drawer and names the close button", async () => {
        const onClose = await renderMenu();
        const dialog = screen.getByRole("dialog", { name: "Navigation menu" });

        expect(dialog.contains(document.activeElement)).toBe(true);

        fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes on Escape", async () => {
        const onClose = await renderMenu();

        fireEvent.keyDown(window, { key: "Escape" });
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
