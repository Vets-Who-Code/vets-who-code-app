export type ServiceShape =
    | "halfsquare"
    | "bars"
    | "target"
    | "diag"
    | "stack"
    | "cross"
    | "dot"
    | "square";

export type Capability = {
    shape: ServiceShape;
    title: string;
    body: string;
    tag: string;
};

export type ProcessStep = {
    phase: string;
    name: string;
    body: string;
    duration: string;
};

export type Engagement = {
    id: string;
    tag: string;
    year: string;
    title: string;
    body: string;
    stack: string;
};

export type ClientType = {
    label: string;
    title: string;
    body: string;
};

export type TeamMember = {
    name: string;
    role: string;
    branch: string;
    specialty: string;
};

export type Differentiator = {
    num: string;
    title: string;
    body: string;
};

export type Stat = {
    num: string;
    label: string;
};

export type Testimonial = {
    quote: string;
    attribution: string;
};

export type DeliverableArtifact = {
    name: string;
    description: string;
};

export const CAPABILITIES: Capability[] = [
    {
        shape: "halfsquare",
        title: "Web App Development",
        body: "Production-grade React, Next.js, TypeScript. Greenfield products through platform rebuilds.",
        tag: "T+0 · DEPLOYABLE",
    },
    {
        shape: "bars",
        title: "API & Backend Systems",
        body: "Node, Python, Go services. Postgres, queues, auth, billing — the unglamorous spine that holds up.",
        tag: "T+0 · DEPLOYABLE",
    },
    {
        shape: "target",
        title: "AI / ML Integration",
        body: "RAG, agents, model orchestration. We separate what AI can ship today from the demo-ware.",
        tag: "T+14 · DEPLOYABLE",
    },
    {
        shape: "diag",
        title: "UX / UI Design",
        body: "Research, IA, design systems, pixel-precise interfaces. Design that respects the user's time.",
        tag: "T+0 · DEPLOYABLE",
    },
    {
        shape: "stack",
        title: "DevOps & Cloud",
        body: "AWS, GCP, Vercel. CI/CD, observability, IaC. We hand back ops you can actually run.",
        tag: "T+7 · DEPLOYABLE",
    },
    {
        shape: "cross",
        title: "Discovery Sprints",
        body: "Two-week scoping engagements. Walk away with a prototype, a roadmap, and a fixed-bid proposal.",
        tag: "T+0 · DEPLOYABLE",
    },
    {
        shape: "dot",
        title: "Code Audits",
        body: "Independent review of architecture, security, and team practices. Findings ranked by what to do Monday.",
        tag: "T+30 · DEPLOYABLE",
    },
    {
        shape: "square",
        title: "Engineering Squads",
        body: "3–5 person veteran teams embedded in your product org for a defined mission. T+30 to first PR.",
        tag: "T+30 · DEPLOYABLE",
    },
];

export const PROCESS: ProcessStep[] = [
    {
        phase: "Phase 01",
        name: "Recon",
        body: "Discovery call, then a paid two-week sprint. We walk your problem space, talk to your users, produce a working prototype with a fixed-bid scope.",
        duration: "2 weeks · fixed bid",
    },
    {
        phase: "Phase 02",
        name: "Plan",
        body: 'Architecture decisions, milestones, and the "definition of done" — written down before any code. You see the whole map; nothing is held back.',
        duration: "1 week · async",
    },
    {
        phase: "Phase 03",
        name: "Build",
        body: "Two-week sprints, demo every Friday, async daily SITREP in your Slack. Code lives in your repo from day one. Pull requests, not handovers.",
        duration: "sprints · 2 weeks each",
    },
    {
        phase: "Phase 04",
        name: "Hand Off",
        body: "Documentation, runbooks, and a 30-day warranty. We can stay on retainer or train your team to take it from here. Your call.",
        duration: "30 days · warranty",
    },
];

export const DELIVERABLES: DeliverableArtifact[] = [
    { name: "SCOPE.md", description: "Fixed-bid scope statement" },
    { name: "ARCH.png", description: "System architecture diagram" },
    { name: "BACKLOG.csv", description: "Sprint-ready backlog" },
    { name: "RUNBOOK.md", description: "Hand-off runbook" },
];

export const ENGAGEMENTS: Engagement[] = [
    {
        id: "ENG/01",
        tag: "PUBLIC SECTOR",
        year: "2025",
        title: "Veteran Resource Locator",
        body: "A nationwide directory of vetted veteran services, built in 12 weeks for a state VA office.",
        stack: "Next.js · Postgres · Mapbox",
    },
    {
        id: "ENG/02",
        tag: "NONPROFIT",
        year: "2024–25",
        title: "Cohort Management Platform",
        body: "Application, interview scheduling, and curriculum tracking for a workforce-development partner.",
        stack: "Remix · Prisma · AWS",
    },
    {
        id: "ENG/03",
        tag: "STARTUP",
        year: "2024",
        title: "AI-Assisted Resume Translator",
        body: "Turns military OERs into civilian resumes. Open-sourced after launch — used by 11k vets.",
        stack: "Next.js · OpenAI · Vercel",
    },
    {
        id: "ENG/04",
        tag: "OPEN SOURCE",
        year: "Ongoing",
        title: "HashFlag VS Code Theme",
        body: "Distributed via the official Marketplace. 40k+ installs across the developer community.",
        stack: "TypeScript · VS Code API",
    },
];

export const CLIENT_TYPES: ClientType[] = [
    {
        label: "01",
        title: "Veteran-Owned Startups",
        body: "You vibe-coded your way to a demo and now you need an MVP that won't collapse under real users. We've taken founder-built prototypes and turned them into production software customers actually pay for — without throwing away the work that got you here.",
    },
    {
        label: "02",
        title: "Veteran-Owned Small Businesses",
        body: "Something is broken and it's costing you money. A checkout that double-charges. A scheduling system that lost last Tuesday. A platform the original developer ghosted on. We've walked into catastrophic-error situations and shipped the fix — fast, documented, and with a runbook so it doesn't happen again.",
    },
    {
        label: "03",
        title: "Nonprofits",
        body: "You don't need another deck about digital transformation. You need engineers who can train your team, ship the tool, and leave you running. We've done both — built the software and trained the staff at some of the largest nonprofits in America.",
    },
];

export const TEAM: TeamMember[] = [
    {
        name: "Jerome Hardaway",
        role: "Founder · CO",
        branch: "USAF · 2003–2010",
        specialty: "Frontend · Engineering Mgmt",
    },
    {
        name: "Engineer 02",
        role: "Staff Engineer",
        branch: "USMC · 2008–2014",
        specialty: "Backend · Infra",
    },
    {
        name: "Engineer 03",
        role: "Design Lead",
        branch: "US Army · 2010–2018",
        specialty: "UX · Design Systems",
    },
    {
        name: "Engineer 04",
        role: "Staff Engineer",
        branch: "USN · 2012–2020",
        specialty: "AI/ML · Data",
    },
];

export const DIFFERENTIATORS: Differentiator[] = [
    {
        num: "01",
        title: "US Veterans, On Our Team",
        body: "Every engineer on your project is a US veteran, full-time on the VWC team. No offshoring, no surprise subcontracting, no contractor-of-a-contractor chain.",
    },
    {
        num: "02",
        title: "Code in Your Repo, Day One",
        body: "Pull requests, not handovers. You see the work as it's written. No two-month black-box phase ending in a zip file.",
    },
    {
        num: "03",
        title: "Fixed Scope, Written Down",
        body: "Definition of done lives in SCOPE.md before any code is written. Change requests are change requests, not surprises on the invoice.",
    },
    {
        num: "04",
        title: "Documentation Is a Deliverable",
        body: "RUNBOOK.md, ARCH.png, and a 30-day warranty ship with every engagement. Your team can run what we hand back, or we'll train them to.",
    },
];

export const STATS_HEADER = "Factory engagements since 2022";

export const STATS: Stat[] = [
    { num: "4", label: "projects shipped" },
    { num: "2", label: "active clients" },
    { num: "37,000", label: "lines of production code in the wild" },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "They shipped what three previous vendors couldn't. The veteran-led team brings an operations cadence we weren't getting anywhere else.",
        attribution: "Director, Veteran-Owned SaaS Startup",
    },
    {
        quote: "Funding the Software Factory was the highest-leverage line item in our annual giving. We got a working product and our donation paid the salaries of vets who built it.",
        attribution: "Program Officer, Family Foundation",
    },
];

export const SERVICE_CHIPS: string[] = [
    "Web App",
    "AI / ML",
    "Backend",
    "Design",
    "DevOps",
    "Discovery",
    "Audit",
    "Squad",
];

export const BUDGET_CHIPS: string[] = [
    "<$50k",
    "$50–150k",
    "$150–500k",
    "$500k+",
    "Sponsor / grant",
];

export const HERO_META: Array<[string, string]> = [
    ["UNIT", "VWC SOFTWARE FACTORY"],
    ["ESTABLISHED", "2016 · FACTORY 2022"],
    ["CO", "JEROME HARDAWAY · USAF"],
    ["STATUS", "BOOKING Q3 2026"],
    ["POSTURE", "2 SQUADS AVAILABLE"],
];
