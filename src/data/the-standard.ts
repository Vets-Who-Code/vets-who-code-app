/**
 * Hand-written copy for /the-standard (#1428). Every count, evidence string, depth and domain
 * title on the page is read from the Hashflag Graph in getStaticProps (src/lib/the-standard.ts);
 * nothing here restates the graph.
 *
 * The page describes the standard VWC trains every troop to. It is not an exit: there is no
 * graduation line, and mentorship doesn't end (owner decision on #1427 / #1428).
 */
import type { ExitDepth } from "@lib/curriculum-graph";

export const SEO_TITLE = "The Standard for Software Engineers";

export const HERO = {
    title: "The Standard",
    lede: "What we train every troop to do, and how we check it.",
    body: [
        "A good software engineer finds the bug instead of guessing at it. Proves the fix with a test. Opens a pull request another engineer can review, and reviews someone else's code honestly. None of that comes from watching. It comes from reps, and from people who read your work and tell you the truth about it.",
        "So we wrote the standard down and made it public.",
    ],
};

/**
 * Plain-words definitions of a topic's `exitDepth`, mapped from the "To what depth?" layer on
 * /curriculum: "we show it, then you do it with a spotter, then you do it alone".
 */
export const EXIT_DEPTHS: Array<{ id: ExitDepth; label: string; gloss: string }> = [
    { id: "guided", label: "Guided", gloss: "We walk you through it." },
    { id: "scaffolded", label: "Scaffolded", gloss: "You do it, with a spotter." },
    { id: "unassisted", label: "Unassisted", gloss: "You do it alone." },
];

/**
 * The selected criteria, by topic id. Labels, evidence, depths and domains are read from
 * TOPICS. Ordered by prerequisite depth; the two review domains are featured on purpose.
 */
export const FEATURED_BANDS: Array<{ title: string; topicIds: string[] }> = [
    { title: "Find it and fix it", topicIds: ["tst-flaky", "ed-debug"] },
    {
        title: "Review it and prove it",
        topicIds: ["git-pr", "rev-read", "rev-write", "tsb-client"],
    },
    { title: "Operate it and guard it", topicIds: ["del-rollback", "hrn-policy"] },
];

/** Each line restates copy already published elsewhere on the site, named per entry. */
export const EVIDENCE_NOT_ATTENDANCE: Array<{ title: string; body: string }> = [
    // src/data/accelerator.ts HOW_IT_RUNS 04
    {
        title: "Nothing completes because a video ended",
        body: "Each concept names the thing you produce and the criterion it is judged against. Trained to standard, or not trained.",
    },
    // src/pages/programs/mentorship.tsx RELEASE Phase 03
    {
        title: "Someone else grades the gate",
        body: "At an evidence gate you prove it alone, graded by someone other than your mentor.",
    },
    // src/data/innerpages/faq.json mentor answer; mentorship.tsx Track 1
    {
        title: "A working engineer reviews your code",
        body: "Within your first month we pair you with a working software engineer who runs 1-on-1s, reviews your code and challenges your thinking. The question they bring to your work: would this survive code review at a real company?",
    },
    // src/data/accelerator.ts HOW_IT_RUNS 02–03; mentorship.tsx COMMITMENT 02
    {
        title: "The human hours go to pairing, review and building",
        body: "The platform teaches the material that doesn't change, so people spend their time pairing with you, reviewing your code and building real things. Your mentor reads your pre-gate artifact and returns it within 48 hours.",
    },
    // src/pages/programs/mentorship.tsx ARC, weeks 07–10
    {
        title: "Some mistakes only a reviewer catches",
        body: "In weeks 07–10, the data layer, your mentor's job is correctness review. Bad schema and query decisions fail quietly, and gates alone will not catch them.",
    },
];

/** Owner decision on #1427 and #1428: there is no graduation line. */
export const OPEN_DOOR = {
    title: "The door stays open",
    body: "The standard is what we train to, not a finish line. Meeting it doesn't end your mentorship, and the accelerator ending doesn't either.",
    quote: "You never truly graduate. Here you truly are family. The door is open for as long as you need it.",
    // Name and designation from src/data/team-members.json.
    attribution: "Jerome Hardaway, Founder & Executive Director",
};
