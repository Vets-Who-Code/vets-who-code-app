import { fireEvent, render, screen } from "@testing-library/react";
import NiceSelect from "@ui/nice-select";

const options = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
];

describe("NiceSelect", () => {
    it("exposes the trigger as a listbox disclosure", () => {
        render(<NiceSelect options={options} setValue={vi.fn()} prefix="Event Type:" />);
        const trigger = screen.getByRole("button", { name: /Event Type:/ });

        expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
        expect(trigger).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(trigger);
        expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("renders options as buttons that select on activation and close the list", () => {
        const setValue = vi.fn();
        render(<NiceSelect options={options} setValue={setValue} prefix="Event Type:" />);
        const trigger = screen.getByRole("button", { name: /Event Type:/ });

        fireEvent.click(trigger);
        const items = screen.getAllByRole("option");
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveAttribute("aria-selected", "true");
        expect(items[1].tagName).toBe("BUTTON");

        fireEvent.click(items[1]);
        expect(setValue).toHaveBeenCalledWith("upcoming");
        expect(trigger).toHaveAttribute("aria-expanded", "false");
        expect(trigger).toHaveTextContent("Upcoming");
    });

    it("closes on Escape", () => {
        render(<NiceSelect options={options} setValue={vi.fn()} prefix="Event Type:" />);
        const trigger = screen.getByRole("button", { name: /Event Type:/ });

        fireEvent.click(trigger);
        fireEvent.keyUp(document, { key: "Escape" });
        expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
});
