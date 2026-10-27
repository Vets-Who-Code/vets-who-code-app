---
title: "Fix the Flaky Test at Its Cause"
postedAt: "2026-10-14T16:00:00.000Z"
author: "Jerome Hardaway"
description: "A retry hides a flaky test. It doesn't fix it. How Vets Who Code teaches troops to find the nondeterminism behind an intermittent failure, with a Vitest example where the test was right and the code was wrong."
image:
    {
        src: "v1736709455/evidence-based_j4ucdv.jpg",
        alt: "Paper notes pinned to a dark board and connected with red string",
    }
category: "Engineering Practice"
tags:
    - engineering practice
    - testing
    - flaky tests
    - javascript
    - vets who code
is_featured: false
---

A flaky test is a test that passes and fails on the same code. Every team has a few, and every team has the same three bad fixes: rerun the pipeline, add `retry: 3`, or skip the test "for now." Each one trains the team to ignore red builds. Sooner or later a real failure gets rerun too.

This is the fourth post in our series on how Vets Who Code teaches code review, debugging and testing.

## The Criterion

On the [testing foundations domain page](/curriculum/testing-foundations), the topic _Diagnose flaky tests_ is described as "removes nondeterminism from a test suite." Its evidence criterion:

> Fixes an intermittent failure at its cause

The words that matter are **at its cause**. A retry makes the build green and leaves the cause in place. The criterion asks for the opposite: find what varies between runs, and remove the variation.

## A Test That Fails in the Morning

Here's a function that labels tasks in a to-do list, and the test that came with it:

```typescript
export function dueLabel(due: string, now = new Date()): string {
    const dueDate = new Date(due);
    if (dueDate.toDateString() === now.toDateString()) return "Due today";
    return dueDate < now ? "Overdue" : "Upcoming";
}
```

```typescript
it("labels a task due today", () => {
    const due = new Date().toISOString().slice(0, 10);
    expect(dueLabel(due)).toBe("Due today");
});
```

CI is green on every run. One developer in Chicago sees it fail before lunch and pass after dinner:

```text
AssertionError: expected 'Overdue' to be 'Due today'
```

## Step 1: Find What Varies

The first instinct is to run it in a loop:

```bash
for i in $(seq 1 50); do npx vitest run src/lib/__tests__/due-label.test.ts || break; done
```

On the same machine at the same time of day, it gives the same answer 50 times. That's useful. It means the variable isn't the run. Nondeterminism in tests comes from a short list of places. Go down the list in order:

1. **Time:** the current date, time zone, daylight saving, slow timers
2. **Order:** shared state that one test leaves for the next
3. **Concurrency:** promises that aren't awaited, races between workers
4. **Randomness:** unseeded random data, unordered collections
5. **The outside world:** network, file system, a shared database

This test calls `new Date()` twice and touches a date string. Start at the top.

## Step 2: Make It Fail on Demand

If time is the variable, control time. Pin the clock with fake timers and run the test at two hours of the same day:

```typescript
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

it.each([
    ["morning", 10],
    ["evening", 20],
])("labels a task due today in the %s", (_, hour) => {
    vi.setSystemTime(new Date(2026, 2, 10, hour, 0)); // March 10, local time
    const due = new Date().toISOString().slice(0, 10);
    expect(dueLabel(due)).toBe("Due today");
});
```

Then pin the time zone too:

```bash
TZ=America/Chicago npx vitest run src/lib/__tests__/due-label.test.ts
#  × labels a task due today in the morning
#  ✓ labels a task due today in the evening

TZ=UTC npx vitest run src/lib/__tests__/due-label.test.ts
#  ✓ labels a task due today in the morning
#  ✓ labels a task due today in the evening
```

Now it's deterministic. It fails every time under the conditions that matter, which means you can fix it and prove the fix.

## Step 3: Find the Cause

There are two clocks in this code, and they disagree.

- `toISOString()` returns the date in **UTC**. At 10 a.m. in Chicago, that's March 10. At 8 p.m., it's already March 11.
- `new Date("2026-03-10")` parses a date-only string as **UTC midnight**. In Chicago, that's 7 p.m. on March 9.
- `toDateString()` and `now` both use **local time**.

In the morning, the test builds "2026-03-10", the code reads it as March 9 local and calls it overdue. In the evening, the two UTC conversions cancel out by accident and the test passes. CI runs in UTC, where there's nothing to cancel, so it always passes.

So the flakiness wasn't the real problem. **The code has a time zone bug**: for anyone west of Greenwich, a task due today reads as overdue, all day long. The test only caught it in the morning because it built its input with the same UTC mistake, which cancelled the bug out every evening. A retry would have hidden a production bug behind a green build.

## Step 4: Fix the Cause, Then the Test

Parse a date-only string as a local date, so it's on the same clock as `now`:

```typescript
export function dueLabel(due: string, now = new Date()): string {
    const [year, month, day] = due.split("-").map(Number);
    const dueDate = new Date(year, month - 1, day); // local midnight, same clock as `now`
    if (dueDate.toDateString() === now.toDateString()) return "Due today";
    return dueDate < now ? "Overdue" : "Upcoming";
}
```

Then make the test say what it means. Use a literal date instead of deriving one from the clock, pin the clock, and keep both hours:

```typescript
describe("dueLabel", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it.each([
        ["morning", 9],
        ["evening", 20],
    ])("labels a task due today in the %s", (_, hour) => {
        vi.setSystemTime(new Date(2026, 2, 10, hour, 0)); // March 10, local time
        expect(dueLabel("2026-03-10")).toBe("Due today");
    });
});
```

It passes in Chicago and in UTC, morning and evening. Run the suite under a non-UTC `TZ` in CI as well, so the next time zone bug fails where everyone can see it.

## The Other Common Cause: Order

If the loop in Step 1 had failed only sometimes, suspect order. Vitest can shuffle test order and report the seed, so you can replay the exact order that failed:

```bash
npx vitest run --sequence.shuffle
npx vitest run --sequence.shuffle --sequence.seed=1234
```

An order-dependent failure almost always traces to state that outlives a test: a module-level cache, a mock that's never restored, a database row nobody cleans up. The fix is the same shape as above. Find the shared thing and give each test its own.

## A Note on AI Features

Model output is nondeterministic on purpose, so tests for AI features need a different tool. Troops learn that on the [evals domain page](/curriculum/evals), where _Write deterministic checks_ is judged by whether a troop "catches malformed output without a model." Building with AI doesn't excuse a flaky suite. It raises the bar for knowing which parts of the system should be deterministic.

## What a Reviewer Should See

A PR that fixes a flaky test should explain the cause and include the reproduction: the `TZ`, the seed, the pinned time. "Added a retry" is not a fix. "The code parsed date-only strings as UTC; this pins the clock and fixes the parse" is.

Next in the series: [Tests That Survive a Refactor](/blogs/tests-that-survive-a-refactor).

### The Series: How VWC Teaches Code Review, Debugging and Testing

1. [How We Teach Code Review: Find the Defect, Not the Nit](/blogs/how-we-teach-code-review-find-the-defect-not-the-nit)
2. [The Reviewable Pull Request](/blogs/the-reviewable-pull-request)
3. [Debug by Stepping, Not by Printing](/blogs/debug-by-stepping-not-by-printing)
4. **Fix the Flaky Test at Its Cause** (this post)
5. [Tests That Survive a Refactor](/blogs/tests-that-survive-a-refactor)
6. [Three Cases Every Endpoint Test Covers](/blogs/three-cases-every-endpoint-test-covers)

### Support Vets Who Code

Vets Who Code is free for every troop, and it stays that way because people like you keep it running. If this post was useful, [**Donate**](/donate) or [sponsor us on GitHub](https://github.com/sponsors/vetswhocode).

### Know a Veteran Who Wants to Code?

Vets Who Code is a free, remote software engineering accelerator for U.S. veterans, service members and spouses. If you know one who's ready to become a software engineer, send them this post and tell them to [**Apply**](/apply). We'll take it from there.
