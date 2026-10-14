---
title: "Tests That Survive a Refactor"
postedAt: "2026-10-14T17:00:00.000Z"
author: "Jerome Hardaway"
description: "A test that breaks when behavior stays the same is a tax on every change. How Vets Who Code teaches troops to test React components the way a user sees them, with a brittle test and a durable one run against the same refactor."
image:
    {
        src: "v1685585775/checklist_pis3uf.jpg",
        alt: "Translucent document panels floating above a keyboard in blue light",
    }
category: "Engineering Practice"
tags:
    - engineering practice
    - testing
    - react
    - react testing library
    - vets who code
is_featured: false
---

There are two ways a test can fail. It can catch a real regression, which is its job. Or it can break because someone renamed a class, moved some state or split a component in two, while the user sees exactly the same thing. The second kind of failure teaches a team that red tests are noise, and that's how test suites rot.

This is the fifth post in our series on how Vets Who Code teaches code review, debugging and testing.

## The Criterion

On the [frontend testing domain page](/curriculum/testing-frontend), the topic _Test components as a user would_ is described as "queries by role and text, not implementation." Its evidence criterion:

> Test survives a refactor that changes internals

That's a criterion you can check mechanically. Change the internals. Don't change the behavior. Run the test. It passes or it doesn't. The exit depth is _unassisted_.

## The Component

A quantity picker for a shop: a minus button, a number, a plus button, with a floor of 1 and a ceiling of `max`.

```typescript
export function QuantityPicker({ max }: { max: number }) {
    const [qty, setQty] = useState(1);
    return (
        <div className="qty">
            <button
                type="button"
                className="qty__btn qty__btn--dec"
                aria-label="Decrease quantity"
                disabled={qty === 1}
                onClick={() => setQty(qty - 1)}
            >
                −
            </button>
            <label>
                Quantity
                <input className="qty__value" type="number" value={qty} readOnly />
            </label>
            <button
                type="button"
                className="qty__btn qty__btn--inc"
                aria-label="Increase quantity"
                disabled={qty === max}
                onClick={() => setQty(qty + 1)}
            >
                +
            </button>
        </div>
    );
}
```

## The Brittle Test

```typescript
it("increments", () => {
    const { container } = render(<QuantityPicker max={10} />);
    fireEvent.click(container.querySelector(".qty__btn--inc") as Element);
    expect((container.querySelector(".qty__value") as HTMLInputElement).value).toBe("2");
});
```

It passes. It also knows three things a user never sees: two CSS class names and the fact that the number lives in an element with one of them. Each of those is an internal detail the test has made permanent.

## The Durable Test

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("adds one when the shopper presses Increase", async () => {
    const user = userEvent.setup();
    render(<QuantityPicker max={10} />);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));

    expect(screen.getByLabelText("Quantity")).toHaveValue(2);
});

it("stops at the maximum", async () => {
    const user = userEvent.setup();
    render(<QuantityPicker max={2} />);
    const increase = screen.getByRole("button", { name: "Increase quantity" });

    await user.click(increase);

    expect(screen.getByLabelText("Quantity")).toHaveValue(2);
    expect(increase).toBeDisabled();
});
```

Everything this test touches is something a user can perceive: a button with the accessible name "Increase quantity," a field labelled "Quantity" and whether a button is disabled. It clicks the way a user does, through `user-event`, and asserts on the outcome the user would see. That second habit has its own criterion on the same page: _Test user interactions_ is judged by whether a troop "asserts on outcome after an interaction."

## The Refactor

Now refactor. The team moves to Tailwind, swaps `useState` for a reducer that clamps the value, and pulls the buttons into a shared `IconButton`:

```typescript
export function QuantityPicker({ max }: { max: number }) {
    const [qty, dispatch] = useReducer(
        (n: number, action: "increase" | "decrease") =>
            action === "increase" ? Math.min(n + 1, max) : Math.max(n - 1, 1),
        1
    );
    return (
        <div className="tw-flex tw-items-center">
            <IconButton
                label="Decrease quantity"
                icon="−"
                disabled={qty === 1}
                onPress={() => dispatch("decrease")}
            />
            <label htmlFor="qty">Quantity</label>
            <input id="qty" type="number" value={qty} readOnly />
            <IconButton
                label="Increase quantity"
                icon="+"
                disabled={qty === max}
                onPress={() => dispatch("increase")}
            />
        </div>
    );
}
```

The user sees no difference. Run both tests against it:

```text
 × brittle: increments
   Error: Unable to fire a "click" event - please provide a DOM element.
 ✓ adds one when the shopper presses Increase
 ✓ stops at the maximum
```

The brittle test fails on a change that broke nothing. Someone now has to either fix the test, which teaches them nothing, or delete it, which loses coverage. The durable test passed without a single edit, which is exactly what the criterion asks for.

## When the Durable Test Should Fail

Querying by role isn't only about surviving refactors. Suppose the refactor had dropped the `aria-label` from `IconButton`. The button's accessible name would fall back to its text, a bare `+`, and a screen reader user would hear "plus, button" with no idea what it adds. `getByRole("button", { name: "Increase quantity" })` would fail.

That's a correct failure. The accessible name is behavior. A test that queries the way assistive technology does catches accessibility regressions for free, and the brittle test never would.

## The Rules Behind the Criterion

1. **Query by what a user perceives.** In order of preference: role and accessible name, label text, visible text. Reach for a test ID only when nothing a user can perceive identifies the element.
2. **Act like a user.** Use `user-event` instead of firing synthetic events at internal nodes.
3. **Assert on outcomes.** What's on screen, what's enabled, what was sent over the network. Not what's in state, not which hook was called.
4. **Mock at the boundary, not inside the component.** Mock the network, not the child component or the custom hook. Mocking internals glues the test to them.
5. **Check the criterion directly.** Refactor something, run the test, and see whether it survives.

The same thinking carries into end-to-end tests. In Playwright, `page.getByRole("button", { name: "Increase quantity" })` survives markup changes for the same reason, and that's a criterion on the same page: _Write durable selectors_, judged by whether the "test survives a markup change."

AI assistants are good at generating tests, and they're just as happy to generate the brittle kind. A troop who knows this criterion can tell the difference in review and send the test back.

Next, the last post in the series: [Three Cases Every Endpoint Test Covers](/blogs/three-cases-every-endpoint-test-covers).

### The Series: How VWC Teaches Code Review, Debugging and Testing

1. [How We Teach Code Review: Find the Defect, Not the Nit](/blogs/how-we-teach-code-review-find-the-defect-not-the-nit)
2. [The Reviewable Pull Request](/blogs/the-reviewable-pull-request)
3. [Debug by Stepping, Not by Printing](/blogs/debug-by-stepping-not-by-printing)
4. [Fix the Flaky Test at Its Cause](/blogs/fix-the-flaky-test-at-its-cause)
5. **Tests That Survive a Refactor** (this post)
6. [Three Cases Every Endpoint Test Covers](/blogs/three-cases-every-endpoint-test-covers)

### Support Vets Who Code

Vets Who Code is free for every troop, and it stays that way because people like you keep it running. If this post was useful, [**Donate**](/donate) or [sponsor us on GitHub](https://github.com/sponsors/vetswhocode).

### Know a Veteran Who Wants to Code?

Vets Who Code is a free, remote software engineering accelerator for U.S. veterans, service members and spouses. If you know one who's ready to become a software engineer, send them this post and tell them to [**Apply**](/apply). We'll take it from there.
