import AcceleratorContainer from "@containers/accelerator";
import { NOT_FOR_YOU, WE_WONT } from "@data/accelerator";
import { render, screen, within } from "@testing-library/react";

describe("Accelerator: What we won't do", () => {
    it("renders every WE_WONT line under its own heading", () => {
        render(<AcceleratorContainer />);
        const heading = screen.getByRole("heading", { name: "What we won't do" });
        const section = heading.closest("section") as HTMLElement;
        const items = within(section).getAllByRole("listitem");
        expect(items.map((li) => li.textContent)).toEqual(WE_WONT);
    });

    it("states no percentages, counts or rates", () => {
        for (const line of WE_WONT) {
            expect(line).not.toMatch(/%/);
            expect(line).not.toMatch(/\d/);
        }
    });

    it("does not repeat NOT_FOR_YOU word for word", () => {
        for (const line of WE_WONT) {
            expect(NOT_FOR_YOU).not.toContain(line);
        }
    });

    it("never says bootcamp", () => {
        for (const line of WE_WONT) {
            expect(line.toLowerCase()).not.toContain("bootcamp");
        }
    });
});
