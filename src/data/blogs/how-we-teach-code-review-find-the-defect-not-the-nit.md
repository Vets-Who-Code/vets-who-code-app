---
title: "How We Teach Code Review: Find the Defect, Not the Nit"
postedAt: "2026-10-14T13:00:00.000Z"
author: "Jerome Hardaway"
description: "A review that only catches naming and formatting has not reviewed the code. How Vets Who Code teaches troops to find the defect in someone else's diff, with a worked example of a race condition hiding behind a clean-looking change."
image:
    {
        src: "v1685585775/checklist_pis3uf.jpg",
        alt: "Translucent document panels floating above a keyboard in blue light",
    }
category: "Engineering Practice"
tags:
    - engineering practice
    - code review
    - concurrency
    - typescript
    - vets who code
is_featured: false
---

Most new engineers review code the way they were reviewed: they comment on what they can see. A variable name. A missing semicolon. A function that could be a one-liner. Those comments are easy to write and easy to resolve, and a review full of them can approve a change that loses money in production.

This is the first post in a series on how Vets Who Code teaches the practices that separate a good engineer from a new one. It's written for the people who will one day review our troops' code: senior engineers, tech leads and hiring managers. We'd rather show you the bar than tell you about it.

## The Criterion

Every topic in the [Hashflag Graph](/curriculum), our curriculum, ends in an evidence criterion: a thing the troop produces that someone else can check. Code review lives on the [code review domain page](/curriculum/code-review), and the first topic there is _Review code for correctness and risk_. Its criterion:

> Finds a real defect in someone else's diff

Three words in that sentence matter. **Real** means a defect that changes behavior, not a style preference. **Someone else's** means the troop didn't write it and can't lean on what they meant to do. **Diff** means the review happens on the change as submitted, the way it does at work, not on a whole codebase with unlimited time.

The graph marks this topic's exit depth as _scaffolded_, one step short of _unassisted_. We take help away slowly here because finding defects in other people's code is a skill senior engineers are still sharpening.

## A Diff That Looks Fine

Here's a change of the kind a troop gets asked to review. A teammate adds store credit to checkout:

```diff
+export async function applyStoreCredit(customerId: string, totalCents: number) {
+    const balance = await credits.getBalance(customerId);
+    const applied = Math.min(balance, totalCents);
+    await credits.setBalance(customerId, balance - applied);
+    return totalCents - applied;
+}
```

It has a test, the test passes, and the code is short and readable. A review that stops at the surface writes something like this:

> nit: `balance` → `creditBalance`?
>
> nit: could inline `applied`.

Both comments are fine. Neither one is a review. Here's what this diff actually does.

### The Defect: Read, Then Write

`getBalance` and `setBalance` are two separate round trips to the store. Nothing stops another request for the same customer from running between them. Walk it through with a $50 balance and two tabs open on checkout:

| Step | Request A                  | Request B                  | Stored balance |
| ---- | -------------------------- | -------------------------- | -------------- |
| 1    | reads balance: 5000        |                            | 5000           |
| 2    |                            | reads balance: 5000        | 5000           |
| 3    | applies 5000, writes 0     |                            | 0              |
| 4    |                            | applies 5000, writes 0     | 0              |

The customer spent $50 of credit twice. The final balance looks correct, so nothing downstream notices. The unit test can't catch it either, because it runs one request at a time.

### The Second Defect: An Input Nobody Asked About

What does `applyStoreCredit` do when `totalCents` is negative, as it would be on a refund path that reuses this function? `Math.min(5000, -2000)` is `-2000`, so the code writes a balance of `7000` and returns `0`. Maybe that's intended. The diff doesn't say, and that silence is worth a question.

## Writing the Comment

A defect comment has to survive being read by someone who is busy and slightly defensive. We teach troops a three-part shape: what you observed, what it causes, and what you're asking for.

> **blocking:** `getBalance` and `setBalance` are separate calls, so two concurrent checkouts for the same customer can both read the old balance and both apply it. With a $50 balance, two tabs can each take $50 off their orders.
>
> Could this be a single conditional update, or a transaction that locks the row? A test that fires two `applyStoreCredit` calls with `Promise.all` and asserts the total applied is at most the starting balance would pin it down.

> **question:** what should happen when `totalCents` is negative? Right now it adds credit back. If refunds aren't supposed to come through here, a guard would make that explicit.

Label severity. **blocking**, **question** and **nit** tell the author what has to change before merge and what's optional. Nits are allowed. They're just never the whole review.

The fix the author lands might look like this. Your database client will differ; the point is that the read and the write happen under one lock:

```typescript
export async function applyStoreCredit(customerId: string, totalCents: number) {
    if (totalCents < 0) throw new RangeError("totalCents must be non-negative");

    return db.transaction(async (tx) => {
        const { balance } = await tx.one(
            "SELECT balance FROM store_credit WHERE customer_id = $1 FOR UPDATE",
            [customerId]
        );
        const applied = Math.min(balance, totalCents);
        await tx.none(
            "UPDATE store_credit SET balance = balance - $2 WHERE customer_id = $1",
            [customerId, applied]
        );
        return totalCents - applied;
    });
}
```

## How to Look for Defects

Troops don't find defects like that by staring harder. They find them by asking the same questions of every diff, in the same order:

1. **Read the description and the tests before the code.** What is this change supposed to do? The tests tell you what the author thought could go wrong. The defect is usually in what they didn't think of.
2. **Find the state.** Anything that reads, then decides, then writes is a candidate for a race. Caches, counters, balances, inventory, "check if exists, then insert."
3. **Push the inputs to the edges.** Empty, zero, negative, very large, missing, duplicated, out of order. Pick one and trace it through.
4. **Follow the failure path.** What happens when the second call throws after the first one succeeded? What's left half-written?
5. **Find the trust boundary.** Where does data from outside the system enter, and is it checked before it's used?
6. **Then read for style.** If there's time.

The same questions apply when the diff came from an AI assistant. A model writes the read-then-write version of `applyStoreCredit` as readily as a person does, and it looks just as confident. Our AI engineering domains hold troops to the same standard. On the [evals domain page](/curriculum/evals), _Recognize silent LLM failure_ is judged by whether the troop "identifies a confident wrong answer in review." Building with AI makes review more important, not less.

## Why We Teach It This Way

The question our mentors bring to troop work is the one a model can't answer: would this survive code review at a real company? Troops prove each criterion alone, against a published rubric, and the work is graded by someone who is not them. Code review is where that standard gets applied. A troop who can only spot nits hasn't met the criterion. A troop who can explain a race to its author, kindly and with a test that proves it, has.

That's also the reviewer you want on your team.

The next post flips the seat: [The Reviewable Pull Request](/blogs/the-reviewable-pull-request) covers how troops write a change that a reviewer can actually check.

### The Series: How VWC Teaches Code Review, Debugging and Testing

1. **How We Teach Code Review: Find the Defect, Not the Nit** (this post)
2. [The Reviewable Pull Request](/blogs/the-reviewable-pull-request)
3. [Debug by Stepping, Not by Printing](/blogs/debug-by-stepping-not-by-printing)
4. [Fix the Flaky Test at Its Cause](/blogs/fix-the-flaky-test-at-its-cause)
5. [Tests That Survive a Refactor](/blogs/tests-that-survive-a-refactor)
6. [Three Cases Every Endpoint Test Covers](/blogs/three-cases-every-endpoint-test-covers)

### Support Vets Who Code

Vets Who Code is free for every troop, and it stays that way because people like you keep it running. If this post was useful, [**Donate**](/donate) or [sponsor us on GitHub](https://github.com/sponsors/vetswhocode).

### Know a Veteran Who Wants to Code?

Vets Who Code is a free, remote software engineering accelerator for U.S. veterans, service members and spouses. If you know one who's ready to become a software engineer, send them this post and tell them to [**Apply**](/apply). We'll take it from there.
