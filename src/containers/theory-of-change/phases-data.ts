export type BranchId = "b1" | "b2" | "b3" | "b4" | "b5";

export interface DiffRow {
    label: string;
    text: string;
}

export interface Phase {
    step: string;
    n: string;
    title: string;
    accent: string;
    branchName: string;
    metaDescription: string;
    hash: string;
    tag: string;
    headline: string;
    lede: string;
    diffs: DiffRow[];
    footAdd: string;
    footMiddle: string;
    theme: "light" | "dark";
    branchId: BranchId;
}

export const PHASES: Phase[] = [
    {
        step: "Step 01 / 05",
        n: "01",
        title: "Phase 01 — ",
        accent: "Inputs.",
        branchName: "feat/inputs",
        metaDescription: "who we recruit · what we equip",
        hash: "9a1c3f2",
        tag: "phase-01",
        headline: "We start with motivated operators.",
        lede: "U.S. military veterans and military spouses who are ready to transition into tech, and who can carry a 17-week sprint to completion. Our inputs are deliberately small in number and high in signal.",
        diffs: [
            {
                label: "cohort/learners.md",
                text: "A curated selection of veteran learners with high aptitude and drive.",
            },
            {
                label: "platform/curriculum.md",
                text: "The VWC learning platform — open-source curriculum, projects, blog, all under one roof.",
            },
            {
                label: "network/mentors.md",
                text: "A network of experienced mentors, industry veterans, and alumni coaches.",
            },
            {
                label: "infra/community.md",
                text: "Community infrastructure for remote collaboration and code reviews.",
            },
            {
                label: "tools/devkit.md",
                text: "Access to development tools, GitHub repositories, and cloud environments.",
            },
        ],
        footAdd: "+5 inputs added",
        footMiddle: "5 files changed",
        theme: "dark",
        branchId: "b1",
    },
    {
        step: "Step 02 / 05",
        n: "02",
        title: "Phase 02 — ",
        accent: "Activities.",
        branchName: "feat/activities",
        metaDescription: "17 weeks · 100% remote · product-driven",
        hash: "3c47b08",
        tag: "phase-02",
        headline: "We run a real engineering workflow.",
        lede: "Troops don't watch lectures — they ship. Every week mirrors the cadence of a working software team: tickets, pull requests, code review, deploy.",
        diffs: [
            {
                label: "curriculum/12-modules.md",
                text: "Platform-based learning — a rigorous 12-module open-source curriculum, from core web fundamentals to backend APIs and DevOps.",
            },
            {
                label: "mentorship/pair.md",
                text: "Every troop pairs with mentors from our alumni and industry network: weekly check-ins, code reviews, career strategy.",
            },
            {
                label: "contrib/open-source.md",
                text: "Learners contribute to internal and external open-source projects — scalable, readable code that integrates into production.",
            },
            {
                label: "products/shipped.md",
                text: "Troops ship into real VWC products — this Next.js platform, VetsAI's MOS translator, the Hashflag VS Code theme, the API List. Production code with real users.",
            },
            {
                label: "career/weekly.md",
                text: "Resume reviews, GitHub audits, behavioral interview prep, async job-search drills — every week.",
            },
        ],
        footAdd: "+5 workflows added",
        footMiddle: "17 weeks scheduled",
        theme: "light",
        branchId: "b2",
    },
    {
        step: "Step 03 / 05",
        n: "03",
        title: "Phase 03 — ",
        accent: "Outputs.",
        branchName: "build/outputs",
        metaDescription: "what graduates leave with",
        hash: "f5d92ae",
        tag: "phase-03",
        headline: "A graduate is a deployable artifact.",
        lede: "By end-of-program, every troop has a build that compiles in front of a hiring manager — portfolio, references, fluency, and the social proof to back it.",
        diffs: [
            {
                label: "profile/github.md",
                text: "A strong GitHub profile reflecting open-source and production-level contributions.",
            },
            {
                label: "portfolio/shipped.md",
                text: "Completed software products deployed or used by actual users.",
            },
            {
                label: "skills/stack.md",
                text: "Job-ready skills: TypeScript, React, Next.js, Python, FastAPI, Git, CI/CD.",
            },
            {
                label: "network/references.md",
                text: "Direct mentorship and professional guidance from engineers already in the field.",
            },
        ],
        footAdd: "+4 outputs added",
        footMiddle: "portfolio: ready",
        theme: "light",
        branchId: "b3",
    },
    {
        step: "Step 04 / 05",
        n: "04",
        title: "Phase 04 — ",
        accent: "Outcomes.",
        branchName: "release/outcomes",
        metaDescription: "6–12 months post-graduation",
        hash: "b27e914",
        tag: "phase-04",
        headline: "The build runs in production.",
        lede: "Within a year of graduating, the program's measurable results show up on resumes, payroll, and in the open-source contributions our alumni go back to author.",
        diffs: [
            {
                label: "jobs/placed.log",
                text: "Veterans hired into six-figure tech roles in software engineering, DevOps, or data.",
            },
            {
                label: "alumni/return.log",
                text: "Alumni re-engage as mentors, speakers, and open-source contributors.",
            },
            {
                label: "mobility/economic.log",
                text: "Economic mobility — especially among underrepresented and minority veterans.",
            },
            {
                label: "product/in-use.log",
                text: "Tools and apps they built are running in front of real users.",
            },
            {
                label: "pipeline/visibility.log",
                text: "Portfolio visibility — troops stand out in competitive hiring funnels.",
            },
        ],
        footAdd: "+5 outcomes recorded",
        footMiddle: "cycle: 6–12 mo",
        theme: "dark",
        branchId: "b4",
    },
    {
        step: "Step 05 / 05",
        n: "05",
        title: "Phase 05 — ",
        accent: "Impact.",
        branchName: "impact/long",
        metaDescription: "generational · structural",
        hash: "0d8f1c6",
        tag: "phase-05",
        headline: "The narrative changes with the build.",
        lede: "Repeated, replicable wins reshape the system that produced them — for the individual veteran, for their family, and for the tech industry's idea of who belongs at the keyboard.",
        diffs: [
            {
                label: "ecosystem/veteran.md",
                text: "A visible, high-performing ecosystem of veteran technologists rooted in service and real engineering.",
            },
            {
                label: "family/wealth.md",
                text: "Generational wealth creation and stability for veteran families.",
            },
            {
                label: "industry/narrative.md",
                text: "A transformed narrative: veterans aren't just hires — they're builders, maintainers, innovators.",
            },
            {
                label: "model/replicable.md",
                text: "A proven, replicable nonprofit model: product-based learning + mentorship + community.",
            },
            {
                label: "workforce/diversity.md",
                text: "A more diverse, mission-driven U.S. tech workforce reflecting service, resilience, contribution.",
            },
        ],
        footAdd: "+5 long-term effects",
        footMiddle: "horizon: generational",
        theme: "light",
        branchId: "b5",
    },
];

/* Branch palette — `currentColor` for each commit's marker and diff `+` glyph. */
export const BRANCH_COLOR_LIGHT: Record<BranchId, string> = {
    b1: "#C5203E", // red
    b2: "#FDB330", // gold
    b3: "#0353A4", // navy-royal
    b4: "#A51C30", // red-crimson
    b5: "#C9A227", // gold-deep
};

export const BRANCH_COLOR_DARK: Record<BranchId, string> = {
    b1: "#C5203E",
    b2: "#FDB330",
    b3: "#B9D6F2", // navy-sky
    b4: "#F38375", // coral-on-dark
    b5: "#FFE169", // gold-light
};

export const branchColor = (b: BranchId, theme: "light" | "dark") =>
    theme === "dark" ? BRANCH_COLOR_DARK[b] : BRANCH_COLOR_LIGHT[b];
