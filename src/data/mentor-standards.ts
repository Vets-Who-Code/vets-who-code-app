// Published mentor standards and development guide (issue #1435).
// Stage descriptions and support items are the owner's draft matrix, verbatim.
// The self-assessment form, reviewer notes and mentee feedback are internal and
// never belong here; see docs/mentor-development-guide.md.

export const GROWTH_STAGES = ["Learning", "Practicing", "Proficient", "Coaching Others"] as const;

export type GrowthStage = (typeof GROWTH_STAGES)[number];

export interface MentorStandard {
    criterion: string;
    stages: Record<GrowthStage, string>;
    support: string;
    note?: string;
}

export const MENTOR_STANDARDS: MentorStandard[] = [
    {
        criterion: "Cadence",
        stages: {
            Learning: "Misses or reschedules often",
            Practicing: "Holds most sessions; slow replies",
            Proficient: "Holds 90% or more of sessions; replies within 48 hours",
            "Coaching Others": "Models cadence; helps new mentors set theirs",
        },
        support: "Session templates and an async check-in format",
        // The mentor model settled in #1434.
        note: "Measured against the commitment: one-on-one, up to three troops, at least two hours a week.",
    },
    {
        criterion: "Evidence-Based Feedback",
        stages: {
            Learning: "Gives general advice",
            Practicing: "References the code but not the process",
            Proficient: "Reviews the spec, agent log, tests, and the mentee's own review notes",
            "Coaching Others": "Writes sample reviews other mentors use",
        },
        support: "Sample PR reviews and a guide to reviewing an agent session log",
    },
    {
        criterion: "Gradual Release",
        stages: {
            Learning: "Fixes problems for the mentee",
            Practicing: "Explains fixes, but still drives",
            Proficient: "Mentee drives; mentor asks questions",
            "Coaching Others": "Teaches other mentors when to step back",
        },
        support: "A short playbook on when to step back and let the troop drive the agent",
    },
    {
        criterion: "Market Anchoring",
        stages: {
            Learning: "Advice from own experience only",
            Practicing: "Uses job postings occasionally",
            Proficient:
                "Ties advice to live postings; runs a mock interview and a portfolio review",
            "Coaching Others": "Contributes interview scripts and posting pulls",
        },
        support: "Current job-posting pulls and mock interview scripts",
    },
];

// Conduct is not a growth stage. It is pass or fail.
export const CONDUCT_STANDARD = {
    criterion: "Conduct",
    covers: ["Confidentiality", "No soliciting", "Data handling"],
    support: "Onboarding on confidentiality and AI-tool data rules",
} as const;
