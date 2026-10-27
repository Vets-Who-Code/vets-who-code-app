---
title: "The Reviewable Pull Request"
postedAt: "2026-10-14T14:00:00.000Z"
author: "Jerome Hardaway"
description: "A pull request is a message to a busy reader. How Vets Who Code teaches troops to scope, sequence and describe a change so it merges without a round of confusion, with a before-and-after PR description and a split commit history."
image:
    {
        src: "v1685585775/checklist_pis3uf.jpg",
        alt: "Translucent document panels floating above a keyboard in blue light",
    }
category: "Engineering Practice"
tags:
    - engineering practice
    - code review
    - pull requests
    - git
    - vets who code
is_featured: false
---

Every reviewer knows the first comment on a confusing pull request. It isn't about the code. It's "What is this for?", or "Why is this file in here?", or "How did you test this?" That comment costs a round trip, often a day, and it's entirely the author's fault.

This is the second post in our series on how Vets Who Code teaches code review, debugging and testing. [The first post](/blogs/how-we-teach-code-review-find-the-defect-not-the-nit) covered the reviewer's seat. This one covers the author's.

## The Criterion

On the [code review domain page](/curriculum/code-review), the topic _Write a reviewable pull request_ is described as "scopes and explains a change so review is fast." Its evidence criterion:

> Opens a PR merged without a round of confusion

Notice what it doesn't say. It doesn't say "merged without comments." Good reviewers will still find things, and a troop who argues with every comment hasn't met the bar either. It says no round of _confusion_: the reviewer never has to ask what the change is, why it exists or how the author knows it works. The graph lists this topic at exit depth _unassisted_. A troop does it alone, every time.

## A Description That Causes Confusion

Here's a description of the kind every reviewer has seen:

> **Fix credit bug**
>
> Fixed the credit issue and cleaned some stuff up. Also updated deps.

The diff behind it touches 14 files. Three of them change how store credit is applied. Nine are a rename of `balance` to `creditBalance` across the module. Two are a lockfile and a `package.json` bump. The reviewer now has to work out which lines carry the fix, whether the rename hides a behavior change and whether the dependency bump is related. They'll ask, and the round of confusion begins.

## The Same Change, Reviewable

### 1. One concern per pull request

Split it into three PRs, or at least three clearly separated commits:

- the dependency bump, on its own, so CI proves it changes nothing
- the rename, as a pure refactor with no behavior change
- the fix, small enough to hold in your head

A reviewer can approve a 200-line rename in a minute when they trust it's only a rename. They can't when the fix is buried in it.

### 2. A history that tells the story

If the pieces have to ship together, make the commits do the explaining. Stage by hunk, not by file:

```bash
git add -p src/lib/store-credit.ts
git commit -m "test(credit): Reproduce double-spend under concurrent checkout"
git add -p src/lib/store-credit.ts
git commit -m "fix(credit): Apply store credit inside a row lock"
```

Then read your own branch the way the reviewer will:

```bash
git log --oneline master..HEAD
git diff --stat master...HEAD
```

If `--stat` shows a file you can't explain in one sentence, it doesn't belong in this PR. The [version control domain](/curriculum/version-control) has the criteria behind this habit: _Stage and commit changes_ is judged by whether a troop "produces a readable history of small commits," and _Rebase and rewrite history_ by whether they "clean a messy branch before review."

Leading with a failing test is deliberate. A reviewer can check out the first commit, watch the test fail, then check out the second and watch it pass. That's proof, not a promise.

### 3. A description that answers the three questions

Here's the description for the fix, under the headings we use on pull requests to the Vets Who Code website itself:

```markdown
## Problem
Two concurrent checkouts for the same customer can both apply the full
store credit balance. `applyStoreCredit` reads the balance and writes it
back in separate calls, with no lock between them.

## Solution
- Read and update the balance inside one transaction with `SELECT ... FOR UPDATE`.
- Reject a negative `totalCents`. Refunds don't go through this function.

## Verification
- New test fires two `applyStoreCredit` calls with `Promise.all` and asserts
  the total applied never exceeds the starting balance. It fails on the first
  commit and passes on the second.
- `npm test`: all suites pass.

## Risk and follow-ups
- Checkout now holds a row lock for one extra query. No other code path
  writes `store_credit`.
- The refund path should get its own function. Not in this PR.
```

**Problem** answers "what is this for?" **Solution** is a map of the diff, so the reviewer knows what to expect before they open it. **Verification** answers "how do you know it works?" with commands a reviewer can rerun, not "tested locally." **Risk** says what could break and what's deliberately left out, which heads off the "what about X?" round.

### 4. Review it yourself first

Before you request review, open the diff in the review tool and read every line as if someone else wrote it. Leave comments on your own PR where a line will surprise the reader: "This lock is held across the second query on purpose; see the test." Delete the debug log you forgot. Most rounds of confusion are things the author would have caught in five minutes of reading their own diff.

## When an AI Assistant Wrote Part of It

Troops learn to build with AI, and a lot of PRs now include code an assistant drafted. The criterion doesn't change. If a reviewer asks why a line is there, "the model suggested it" isn't an answer they can check. The author owns every line in the diff, so the author explains every line. If you can't explain a line, you're not ready to open the PR.

## What a Reviewer Gets

A reviewable PR respects the reviewer's time, and it gets faster, better reviews in return. The reviewer from [the first post](/blogs/how-we-teach-code-review-find-the-defect-not-the-nit) spends their attention on defects instead of archaeology. That's the trade we want troops to make by habit, long before anyone is paying them to.

Next in the series: [Debug by Stepping, Not by Printing](/blogs/debug-by-stepping-not-by-printing).

### The Series: How VWC Teaches Code Review, Debugging and Testing

1. [How We Teach Code Review: Find the Defect, Not the Nit](/blogs/how-we-teach-code-review-find-the-defect-not-the-nit)
2. **The Reviewable Pull Request** (this post)
3. [Debug by Stepping, Not by Printing](/blogs/debug-by-stepping-not-by-printing)
4. [Fix the Flaky Test at Its Cause](/blogs/fix-the-flaky-test-at-its-cause)
5. [Tests That Survive a Refactor](/blogs/tests-that-survive-a-refactor)
6. [Three Cases Every Endpoint Test Covers](/blogs/three-cases-every-endpoint-test-covers)

### Support Vets Who Code

Vets Who Code is free for every troop, and it stays that way because people like you keep it running. If this post was useful, [**Donate**](/donate) or [sponsor us on GitHub](https://github.com/sponsors/vetswhocode).

### Know a Veteran Who Wants to Code?

Vets Who Code is a free, remote software engineering accelerator for U.S. veterans, service members and spouses. If you know one who's ready to become a software engineer, send them this post and tell them to [**Apply**](/apply). We'll take it from there.
