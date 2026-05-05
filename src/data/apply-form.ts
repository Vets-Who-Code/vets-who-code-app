export type Step = {
    id: number;
    num: string;
    short: string;
    label: string;
    briefHead: string;
    context: string;
};

export type ChipOption = {
    id: string;
    label: string;
};

export type RadioCardOption = {
    id: string;
    t: string;
    s: string;
};

export type ApplyFormData = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    timezone?: string;
    branch?: string;
    yearJoined?: string;
    yearSeparated?: string;
    mos?: string;
    priorBootcamp?: boolean;
    priorList?: string;
    concurrent?: boolean;
    concurrentList?: string;
    hours?: string;
    github?: string;
    linkedin?: string;
    prework?: string;
    preworkLink?: string;
    preworkRepo?: string;
    journey?: string;
    goal?: string;
    interests?: string[];
    why?: string;
};

export const STEPS: Step[] = [
    {
        id: 1,
        num: "01",
        short: "Personal",
        label: "Let's get to know you",
        briefHead: "Personal Info",
        context:
            "This goes on your cohort roster — keep it the way you'd want a recruiter to see it.",
    },
    {
        id: 2,
        num: "02",
        short: "Location",
        label: "Where you're stationed",
        briefHead: "Location",
        context:
            "Cohorts run on US Eastern hours. We use this to time your stand-up and pair you with mentors in your timezone.",
    },
    {
        id: 3,
        num: "03",
        short: "Service",
        label: "Your service",
        briefHead: "Military Background",
        context:
            "You don't have to be separated. Currently-serving troops get the same shot at a seat.",
    },
    {
        id: 4,
        num: "04",
        short: "Training",
        label: "Your training so far",
        briefHead: "Education History",
        context:
            "No prior coding experience required. We just want to know what you've already touched.",
    },
    {
        id: 5,
        num: "05",
        short: "Profiles",
        label: "Where you build in public",
        briefHead: "Technical Profiles",
        context:
            "This is where we look first. A scrappy GitHub beats a polished resume — every time.",
    },
    {
        id: 6,
        num: "06",
        short: "Fit",
        label: "Why VWC, why now",
        briefHead: "Cohort Fit",
        context:
            "Three minutes here decides the next sixteen weeks. Be honest. Generic answers get triaged out.",
    },
];

export const BRANCHES: ChipOption[] = [
    { id: "army", label: "Army" },
    { id: "navy", label: "Navy" },
    { id: "usaf", label: "Air Force" },
    { id: "usmc", label: "Marines" },
    { id: "cg", label: "Coast Guard" },
    { id: "ssf", label: "Space Force" },
    { id: "ng", label: "National Guard" },
    { id: "res", label: "Reserves" },
];

export const JOURNEY: RadioCardOption[] = [
    { id: "serving", t: "Still serving", s: "Active duty / Guard / Reserves" },
    { id: "fresh", t: "Just discharged", s: "Last 6 months" },
    { id: "six-plus", t: "6+ months out", s: "Job hunting now" },
    { id: "bootcamp", t: "In a bootcamp", s: "Already studying code" },
    { id: "self", t: "Self-taught 1+ yr", s: "Built things on my own" },
    { id: "other", t: "Something else", s: "Tell us in the next field" },
];

export const HOURS: RadioCardOption[] = [
    { id: "5-10", t: "5–10 hrs", s: "Light commitment" },
    { id: "10-20", t: "10–20 hrs", s: "Recommended pace" },
    { id: "20+", t: "20+ hrs", s: "All-in" },
];

export const GOALS: RadioCardOption[] = [
    { id: "asap", t: "Job ASAP", s: "I need the income within ~6 months" },
    { id: "careful", t: "Switch carefully", s: "I have runway. Aiming for the right job." },
    { id: "explore", t: "Still exploring", s: "I'm checking whether code is for me" },
];

export const PREWORK: RadioCardOption[] = [
    { id: "not-started", t: "Haven't started", s: "That's fine — we'll point you at it" },
    { id: "started", t: "Started it", s: "In progress" },
    { id: "done", t: "Completed", s: "Repo + live link ready" },
];

export const TECH_INTERESTS: string[] = [
    "Frontend",
    "Backend",
    "Full-stack",
    "AI / ML",
    "DevOps / Cloud",
    "Data",
    "Mobile",
    "Security",
    "I don't know yet",
];

export const TIMEZONES: string[] = [
    "Eastern (ET)",
    "Central (CT)",
    "Mountain (MT)",
    "Pacific (PT)",
    "Alaska (AKT)",
    "Hawaii (HT)",
    "Outside CONUS",
];

export const STORAGE_KEY = "vwc.apply.draft.v1";
export const STORAGE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const WHY: Record<string, string> = {
    email: "We'll use this for your interview invitation. We don't add you to lists.",
    branch: "We use this to pair you with mentors who came up the same lane. Branch rivalry is welcome.",
    github: "Public profile only. We look at it. Not to gatekeep — to brag about you in your cohort intro.",
    prework:
        "Your prework demonstrates commitment. If you haven't started, we'll point you at it. It's not a blocker.",
    goal: "Self-selection helps us put you in the right cohort with the right tempo. There is no wrong answer.",
};
