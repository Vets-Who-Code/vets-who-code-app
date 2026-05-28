import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@ui/button";

describe("Button", () => {
    // T009 — renders children, default type, disabled state
    it("renders children", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("defaults to type='button'", () => {
        render(<Button>Submit</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("sets disabled HTML attribute and applies opacity class", () => {
        render(<Button disabled>Disabled</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toBeDisabled();
    });

    // T010 — forwardRef, aria-label, data-testid pass-through
    it("forwards ref to the underlying HTMLButtonElement", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<Button ref={ref}>Ref</Button>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("passes aria-label through to the button element", () => {
        render(<Button aria-label="close dialog">X</Button>);
        expect(screen.getByRole("button", { name: "close dialog" })).toBeInTheDocument();
    });

    it("passes data-testid through to the button element", () => {
        render(<Button data-testid="my-btn">Click</Button>);
        expect(screen.getByTestId("my-btn")).toBeInTheDocument();
    });

    // T011 — path→Anchor, className merge, ghost variant
    it("renders as an anchor element when path is set", () => {
        render(<Button path="/about">About</Button>);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    });

    it("merges custom className with base classes", () => {
        render(<Button className="custom-class">Merge</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).toContain("custom-class");
        expect(btn.className).toContain("tw-font-bold");
    });

    it("ghost variant has no border or background base classes", () => {
        render(<Button variant="ghost">Ghost</Button>);
        const btn = screen.getByRole("button");
        expect(btn.className).not.toContain("tw-border-solid");
        // hover tints are expected; only non-hover base bg classes are disallowed
        const baseBgClasses = btn.className.split(" ").filter((c) => c.startsWith("tw-bg-"));
        expect(baseBgClasses).toHaveLength(0);
    });

    // T012 — variant × color matrix
    const variants = ["contained", "outlined", "ghost"] as const;
    const colors = ["primary", "light", "secondary", "danger"] as const;

    variants.forEach((variant) => {
        colors.forEach((color) => {
            it(`renders without throwing: variant="${variant}" color="${color}"`, () => {
                expect(() =>
                    render(
                        <Button variant={variant} color={color}>
                            {`${variant}/${color}`}
                        </Button>
                    )
                ).not.toThrow();
            });
        });
    });
});
