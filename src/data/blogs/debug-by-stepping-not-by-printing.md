---
title: "Debug by Stepping, Not by Printing"
postedAt: "2026-10-14T15:00:00.000Z"
author: "Jerome Hardaway"
description: "Print statements answer the questions you already thought to ask. A debugger answers the ones you didn't. How Vets Who Code teaches troops to find a bug by stepping, with a git bisect session and a VS Code debugging walkthrough of a real JavaScript trap."
image:
    {
        src: "v1736709455/evidence-based_j4ucdv.jpg",
        alt: "Paper notes pinned to a dark board and connected with red string",
    }
category: "Engineering Practice"
tags:
    - engineering practice
    - debugging
    - git
    - javascript
    - vets who code
is_featured: false
---

Every engineer has debugged with `console.log`. It's fast, it works everywhere and it's often enough. The trouble is that a print statement can only answer a question you already knew to ask. When the bug lives somewhere you didn't expect, you add a print, rerun, add another, rerun again, and slowly surround the problem. A debugger lets you stop the program at the moment things go wrong and look at everything.

This is the third post in our series on how Vets Who Code teaches code review, debugging and testing, written for the engineers who'll work alongside our troops.

## The Criterion

The [editor domain page](/curriculum/editor) lists _Debug with breakpoints_: "sets breakpoints, inspects state and walks the call stack." Its evidence criterion:

> Finds a bug by stepping rather than by print

The exit depth is _unassisted_. The neighboring topic, _Configure a debug launcher_, goes one step further, and its criterion is that the troop "attaches a debugger to a running server."

We don't ban print debugging. We require that a troop can do the other thing, so they can choose.

## The Bug Report

> The weekly calendar shows every event on every day.

Here's the function that groups events by weekday:

```javascript
export function bucketByWeekday(events) {
    const buckets = new Array(7).fill([]);
    for (const event of events) {
        buckets[event.date.getDay()].push(event);
    }
    return buckets;
}
```

## Step 1: Find Where to Look With Bisect

The calendar worked last release. Before setting a single breakpoint, find the commit that broke it. `git bisect` does a binary search through history. You tell it one good commit and one bad one, and give it a command that exits `0` for good and non-zero for bad. A failing test is the perfect command:

```bash
$ git bisect start
$ git bisect bad
$ git bisect good v1.4.0
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[c056b27] chore(calendar): Update empty-state copy
$ git bisect run npx vitest run src/lib/__tests__/calendar.test.ts
...
e9e8e2d is the first bad commit
commit e9e8e2d
    refactor(calendar): Preallocate weekday buckets

 src/lib/calendar.ts | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
bisect found first bad commit
$ git bisect reset
```

Eleven commits, four test runs. The first bad commit is a one-line "refactor" that swapped a working initializer for `new Array(7).fill([])`. That's the [version control domain](/curriculum/version-control) criterion for _Find a regression with bisect_: "identifies the commit that introduced a bug."

Bisect tells you _where_. It doesn't tell you _why_. The diff looks harmless, which is exactly why it got merged.

## Step 2: What Printing Shows

The print-debugging instinct is to log the output:

```javascript
console.log(buckets.map((b) => b.length));
// [2, 2, 2, 2, 2, 2, 2]
```

Every bucket has both events. So the day index must be wrong. Add another print:

```javascript
console.log(event.title, event.date.getDay());
// Standup 1
// Review 3
```

The indexes are right. Each event is pushed into one bucket, yet each bucket ends up holding both events. The prints contradict each other, and the next move is guessing.

## Step 3: What Stepping Shows

Set a breakpoint on the `push` line and run the failing test under the debugger. In VS Code, a launch configuration for Vitest looks like this:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug current test file",
            "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
            "args": ["run", "${relativeFile}"],
            "autoAttachChildProcesses": true,
            "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
            "console": "integratedTerminal"
        }
    ]
}
```

Execution stops before the first push. Open `buckets` in the Variables panel: seven empty arrays. Press **Step Over** once. All seven buckets now have length 1.

One push changed seven arrays. That isn't a grouping bug. It means the seven slots aren't seven arrays. Add a watch expression to confirm:

```javascript
buckets[0] === buckets[6]; // true
```

`Array.prototype.fill` puts the _same value_ in every slot. When that value is an object, every slot holds a reference to one array. The fix creates a new array per slot:

```javascript
const buckets = Array.from({ length: 7 }, () => []);
```

The debugger didn't make us smarter. It showed us the state at the instant it changed, including the thing we hadn't thought to print: one action touched every bucket. That observation is the bug.

## The Techniques Worth Practicing

- **Conditional breakpoints.** Right-click a breakpoint and add a condition such as `event.title === "Review"`. Stop on the one iteration that matters instead of pressing Continue 400 times.
- **Logpoints.** When you do want a print, use a logpoint. It logs from the debugger without editing the file, so there's nothing to forget to delete before review.
- **The call stack.** When a value is wrong, click up the stack to see who passed it in. Most bugs aren't where the symptom is.
- **Attach, don't relaunch.** Start a Node server with `node --inspect` and attach to port 9229 to debug the real request path. In Python, a `breakpoint()` call drops you into `pdb` at that line.

The same discipline applies when an AI assistant suggests a fix. A model can propose changing `getDay()` to `getUTCDay()`, and that won't fix anything. A troop who has stepped through the function knows why.

## Why This Matters to a Hiring Manager

An engineer who can only print-debug is fine until the bug is in code they didn't write, in a process they can't easily restart, or in state they didn't think to log. Those are the bugs that take a team a week. We'd rather troops meet them here, with a mentor nearby, than on their first on-call rotation.

Next in the series: [Fix the Flaky Test at Its Cause](/blogs/fix-the-flaky-test-at-its-cause), where the bug is in time itself.

### The Series: How VWC Teaches Code Review, Debugging and Testing

1. [How We Teach Code Review: Find the Defect, Not the Nit](/blogs/how-we-teach-code-review-find-the-defect-not-the-nit)
2. [The Reviewable Pull Request](/blogs/the-reviewable-pull-request)
3. **Debug by Stepping, Not by Printing** (this post)
4. [Fix the Flaky Test at Its Cause](/blogs/fix-the-flaky-test-at-its-cause)
5. [Tests That Survive a Refactor](/blogs/tests-that-survive-a-refactor)
6. [Three Cases Every Endpoint Test Covers](/blogs/three-cases-every-endpoint-test-covers)

### Support Vets Who Code

Vets Who Code is free for every troop, and it stays that way because people like you keep it running. If this post was useful, [**Donate**](/donate) or [sponsor us on GitHub](https://github.com/sponsors/vetswhocode).

### Know a Veteran Who Wants to Code?

Vets Who Code is a free, remote software engineering accelerator for U.S. veterans, service members and spouses. If you know one who's ready to become a software engineer, send them this post and tell them to [**Apply**](/apply). We'll take it from there.
