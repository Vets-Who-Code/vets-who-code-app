/**
 * Copy and facts for the Software Engineering Accelerator program page.
 *
 * This file deliberately holds no curriculum structure. What is taught, in what order, and
 * why, lives in the Hashflag Graph at /curriculum — keeping it in one place is what stops
 * the two pages from drifting into contradicting each other.
 */

export const PROGRAM_FACTS: Array<[string, string]> = [
    ["Length", "17 weeks"],
    ["Commitment", "20–30 hrs/week"],
    ["Format", "Remote-first · platform + sessions"],
    ["Cost", "$0"],
    ["Eligibility", "U.S. veterans, service members & spouses"],
    ["Outcome", "Software engineer"],
];

export const FOR_YOU = [
    "You served, and you are ready to work like it — showing up to sessions and doing the reps between them.",
    "You want to build software, not collect certificates.",
    "You can hold a job, a family, or a recovery alongside 20–30 focused hours a week.",
    "You would rather be told the standard than be told you are doing great.",
];

export const NOT_FOR_YOU = [
    "You want a credential you can finish by watching videos.",
    "You want someone to place you in a job rather than help you earn one.",
    "You want to work entirely alone. The sessions are the program, not an add-on.",
];

export const HOW_IT_RUNS = [
    {
        index: "01",
        title: "Remote-first, with people on the calendar",
        body: "Remote-first is not self-serve. Sessions are scheduled and you are expected at them. Nobody is handed a login and left alone with a video library.",
    },
    {
        index: "02",
        title: "The platform teaches what doesn't change",
        body: "Syntax, fundamentals, the things that are the same this year as they were last year — those live on the learning platform, where you can take them at your speed and repeat them as many times as you need.",
    },
    {
        index: "03",
        title: "So human time goes to pairing and building",
        body: "That is the whole point of moving the durable material onto the platform: it buys back the hours. We spend them pairing with you, reviewing your code and building real things — the work that actually needs another engineer in the room.",
    },
    {
        index: "04",
        title: "Every rep leaves an artifact",
        body: "Nothing completes because a video ended. Each concept names the thing you produce and the criterion it is judged against, and you meet it three times at decreasing support. Trained to standard, or not trained — and the artifacts accumulate.",
    },
];

/**
 * There is no capstone. Engineers do not finish; they accumulate evidence. This section
 * exists to say that plainly, because "capstone" implies a finish line the program does
 * not have.
 */
export const BODY_OF_WORK = [
    {
        kind: "Blogs",
        body: "Engineers think in writing. Explaining a decision is how you find out whether you actually understood it — and it is the thing a hiring manager can read before they ever speak to you.",
    },
    {
        kind: "Pull requests",
        body: "Opened, reviewed, revised, merged, with the conversation still attached. A PR history is the most honest record there is of how someone works with other people.",
    },
    {
        kind: "Features",
        body: "Real functionality in real codebases, shipped to real users — not a demo built to be graded and then abandoned.",
    },
    {
        kind: "Verified work",
        body: "Every concept names the artifact that proves it and the criterion it is judged against, and the learning platform records what you met. The claim is checkable, not asserted.",
    },
];

export const PROOF = [
    {
        stat: "$0",
        label: "Tuition",
        gloss: "Funded by donors and partners. No income share, no loan, no catch.",
    },
    {
        stat: "17",
        label: "Weeks",
        gloss: "Remote-first, built around the life you already have.",
    },
    {
        stat: "501(c)(3)",
        label: "Nonprofit",
        gloss: "EIN 86-2122804. What we teach is public and auditable.",
    },
];
