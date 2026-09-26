import { fireEvent, render, screen } from "@testing-library/react";
import NiceSelect from "@ui/nice-select";

const options = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
];

describe("NiceSelect", () => {
    it("exposes the trigger as a disclosure over a plain list of buttons", () => {
        render(<NiceSelect options={options} setValue={vi.fn()} prefix="Event Type:" />);
        const trigger = screen.getByRole("button", { name: /Event Type:/ });

        expect(trigger).toHaveAttribute("aria-expanded", "false");
        // No listbox role: it would need its own name and arrow-key navigation.
        expect(trigger).not.toHaveAttribute("aria-haspopup");
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

        fireEvent.click(trigger);
        expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("renders options as buttons that select on activation and close the list", () => {
        const setValue = vi.fn();
        render(<NiceSelect options={options} setValue={setValue} prefix="Event Type:" />);
        const trigger = screen.getByRole("button", { name: /Event Type:/ });

        fireEvent.click(trigger);
        const all = screen.getByRole("button", { name: "All" });
        const upcoming = screen.getByRole("button", { name: "Upcoming" });
        expect(all).toHaveAttribute("aria-pressed", "true");
        expect(upcoming).toHaveAttribute("aria-pressed", "false");

        upcoming.focus();
        fireEvent.click(upcoming);
        expect(setValue).toHaveBeenCalledWith("upcoming");
        expect(trigger).toHaveAttribute("aria-expanded", "false");
        expect(trigger).toHaveTextContent("Upcoming");
        // The list is now display:none, so focus must not stay on a hidden option.
        expect(document.activeElement).toBe(trigger);
    });

    it("closes on Escape and returns focus to the trigger from inside the list", () => {
        render(<NiceSelect options={options} setValue={vi.fn()} prefix="Event Type:" />);
        const trigger = screen.getByRole("button", { name: /Event Type:/ });

        fireEvent.click(trigger);
        screen.getByRole("button", { name: "Upcoming" }).focus();
        fireEvent.keyUp(document, { key: "Escape" });
        expect(trigger).toHaveAttribute("aria-expanded", "false");
        expect(document.activeElement).toBe(trigger);
    });
});
