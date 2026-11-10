/**
 * Copy and data for /job-hunting-in-the-age-of-ai, the resource hub for Jerome Hardaway's
 * Master.dev workshop "Job Hunting in the Age of AI" (Nov 11, 2026). Nothing on the page is
 * hard-coded in JSX; edit it here.
 */
import type { StatCell } from "@components/ui/design-system";

// ===== Kit and slides links =====
// A URL still set to "#" renders its button disabled. The zip and slides come from the kit's
// tagged release, so a download matches the version printed on the page.
export const KIT_VERSION = "v1.1.0";
export const KIT_REPO_SLUG = "Vets-Who-Code/ai-era-job-kit";
export const KIT_REPO_URL = `https://github.com/${KIT_REPO_SLUG}`;
export const KIT_ZIP_URL = `${KIT_REPO_URL}/archive/refs/tags/${KIT_VERSION}.zip`;
export const SLIDES_PDF_URL = `${KIT_REPO_URL}/releases/download/${KIT_VERSION}/Getting-the-Job-in-the-Era-of-AI-Presentation.pdf`;

export const RSVP_URL = "https://master.dev/workshops/getting-a-job-v4/";

export const isPending = (url: string) => url === "#";

export interface Cta {
    label: string;
    href: string;
    variant: "primary" | "light" | "ghost";
}

export const SEO = {
    title: "Job Hunting in the Age of AI | Vets Who Code",
    description:
        "Free resources from Jerome Hardaway's Master.dev workshop: the AI-Era Job Kit, take-home labs, the scoring chain and public, keyless market data sources.",
};

export const HERO: {
    eyebrow: string;
    title: string;
    subhead: string;
    lede: string;
    ctas: Cta[];
    stats: StatCell[];
    meta: string;
} = {
    eyebrow: "Master.dev workshop · formerly Frontend Masters · Nov 11, 2026 · 9:30 AM–4:30 PM CST",
    title: "Job Hunting in the Age of AI",
    subhead: "Run your job search like a data and AI project",
    lede: "Everything from the workshop, in one place. Score your skills against live market data, rebuild what's weak from one source of truth, and keep running the system long after class ends.",
    ctas: [
        { label: "RSVP free on Master.dev", href: RSVP_URL, variant: "primary" },
        { label: "Download the kit", href: "#kit", variant: "light" },
        { label: "Get the slides →", href: "#slides", variant: "ghost" },
    ],
    stats: [
        { value: "7", label: "Skills" },
        { value: "7", label: "Agents" },
        { value: "3", label: "Commands" },
        { value: "11", label: "Python scripts" },
        { value: "$0", label: "API keys, all public data" },
    ],
    meta: "Taught by Jerome Hardaway · Founder, Vets Who Code · Google Developer Expert",
};

export interface SectionIntro {
    eyebrow: string;
    title: string;
    lede: string;
}

export interface TitledItem {
    title: string;
    body: string;
}

export const OUTCOMES: SectionIntro & { items: TitledItem[] } = {
    eyebrow: "What you'll leave with",
    title: "Know the system. Then run it.",
    lede: "You don't have to finish it all this week. Start with Module 1 and work down. You can do this.",
    items: [
        {
            title: "How the sausage is made",
            body: "How AI-powered screeners read, score and pass you along.",
        },
        {
            title: "How the data works",
            body: "On every side: your skills, the market, the screener.",
        },
        {
            title: "Your documentation, current",
            body: "One source of truth that everything flows to and from: your portfolio.",
        },
        { title: "Skills and resources", body: "Skills, scripts and agents to run after today." },
    ],
};

export const LAWS: TitledItem[] = [
    { title: "Measure everything.", body: "If you don't track it, you can't fix it." },
    {
        title: "Never list what you can't defend.",
        body: "Every line is a potential interview question.",
    },
    {
        title: "Distribution beats talent.",
        body: "The best candidate nobody sees loses to the average candidate who's everywhere.",
    },
];

export interface Module {
    id: string;
    title: string;
    lab: string;
    tools: string[];
}

export const MODULES: SectionIntro & { items: Module[] } = {
    eyebrow: "Modules and take-home labs",
    title: "Work the labs in order.",
    lede: "No labs run during the live session. Each module has one take-home lab and the tools to run it.",
    items: [
        {
            id: "M0",
            title: "Intro, history and the lay of the land",
            lab: "Coding has been declared dead before. Every time, the level of abstraction went up. (No lab. Read the market history in the kit's references.)",
            tools: [],
        },
        {
            id: "M1",
            title: "Score your skills",
            lab: 'Save 10 real postings for your lane, run step 1 of the chain on your resume, and mark each skill "can prove now" or "need proof."',
            tools: ["resume-scorer", "resume_score.py", "market_snapshot.py", "/score-resume"],
        },
        {
            id: "M2",
            title: "How the ATS parses, and how resumes are read",
            lab: "Run the parse test, decode one real posting (highlight, sort, count, map), then run a Screen Grade and note every qualification marked Not Met.",
            tools: ["resume-scorer", "screen_grade.py", "ats-screener"],
        },
        {
            id: "M3",
            title: "Your resume",
            lab: "Rebuild one lane resume from your portfolio record with the lift list, fill every [ask] and run the spec check. Save the PDF outside any repo.",
            tools: ["resume-rebuilder", "resume_rebuild.py", "resume_score.py"],
        },
        {
            id: "M4",
            title: "Your portfolio: the single source of truth",
            lab: "Run your first Friday Setup and curate five Brag Database entries. Pin only manicured repos, then run the GitHub score, the portfolio score and the sync check.",
            tools: [
                "friday_setup.py",
                "brag-curator",
                "github-scorer",
                "portfolio-scorer",
                "sync_check.py",
            ],
        },
        {
            id: "M5",
            title: "LinkedIn",
            lab: "Score LinkedIn against the same target, fix it to match your portfolio, then run the two scores and the improvement plan.",
            tools: ["linkedin-scorer", "composite-scorer", "improvement-plan", "recruiter-screen"],
        },
        {
            id: "M6",
            title: "AI interviewers and defending every line",
            lab: "Run one mock AI screen on your rebuilt resume, grade every line Defended, Thin or Cut, rerun your two weakest answers, and build a Stack Defense Doc.",
            tools: [
                "/mock-screen",
                "ai-interviewer",
                "final-round-panel",
                "story-table.md",
                "stack-defense.md",
            ],
        },
        {
            id: "M7",
            title: "Funnel, postmortems and offers",
            lab: "Start your funnel tracker, write one blameless postmortem, fill the offer matrix, and rerun the whole chain to see what moved.",
            tools: [
                "funnel.py",
                "postmortem.md",
                "offer-matrix.md",
                "career-scorecard",
                "/job-hunt",
            ],
        },
    ],
};

export const SCORING_CHAIN: SectionIntro & { steps: TitledItem[]; footnote: string } = {
    eyebrow: "The scoring chain",
    title: "Seven steps. One live target.",
    lede: "Every surface is scored against the same live O*NET target. The career-scorecard agent runs all seven in order.",
    steps: [
        {
            title: "resume-scorer",
            body: "Parse gate, lane score 0–100 and lift list; an A–D Screen Grade per posting.",
        },
        {
            title: "linkedin-scorer",
            body: "LinkedIn scored against the same target and your record.",
        },
        {
            title: "github-scorer",
            body: "Your profile and pinned repos, read from the keyless public API.",
        },
        {
            title: "portfolio-scorer",
            body: "Your site, the portfolio checklist and the sync check.",
        },
        {
            title: "composite-scorer",
            body: "Two reads, machine and human, plus a resume gate at 70.",
        },
        {
            title: "improvement-plan",
            body: "What to fix in each section, biggest gain first.",
        },
        {
            title: "resume-rebuilder",
            body: "Your resume rebuilt to spec from the portfolio, linted, defended, rescored.",
        },
    ],
    footnote:
        "Weights and the gate are a VWC design judgment, not research or any employer's. Change them with --machine-weights, --human-weights and --gate.",
};

export interface CodeBlock {
    label: string;
    lines: string[];
    highlight?: boolean;
}

export const KIT: SectionIntro & {
    bullets: string[];
    ctas: Cta[];
    slides: { label: string; href: string };
    codeBlocks: CodeBlock[];
} = {
    eyebrow: `AI-Era Job Kit · ${KIT_VERSION}`,
    title: "Get the kit.",
    lede: "A free, portfolio-first toolkit. Your portfolio is the base; your resume, LinkedIn and GitHub are scored against the market and rebuilt from it.",
    bullets: [
        "Python 3.10+, standard library only. Nothing to pip install.",
        "GitHub CLI for Friday Setup. The GitHub scorer needs no token.",
        "Works in Claude Code, or load any SKILL.md into the AI tool you use.",
    ],
    ctas: [
        { label: "Download the kit (.zip)", href: KIT_ZIP_URL, variant: "primary" },
        { label: "View on GitHub", href: KIT_REPO_URL, variant: "light" },
    ],
    slides: { label: "Slides: Getting the Job in the Era of AI (PDF)", href: SLIDES_PDF_URL },
    codeBlocks: [
        {
            label: "Install as a Claude Code plugin",
            lines: [
                `/plugin marketplace add ${KIT_REPO_SLUG}`,
                "/plugin install ai-era-job-kit@ai-era-job-kit",
            ],
        },
        {
            label: "Or copy into your user config",
            lines: [
                "cp -r skills/* ~/.claude/skills/",
                "cp agents/*.md ~/.claude/agents/",
                "cp commands/*.md ~/.claude/commands/",
            ],
        },
        { label: "Then run", lines: ["/job-hunt"], highlight: true },
    ],
};

export interface DataSource extends TitledItem {
    href?: string;
}

export const DATA_SOURCES: SectionIntro & { items: DataSource[] } = {
    eyebrow: "Data sources",
    title: "All public. All keyless.",
    lede: "Anyone can rerun every number. The scorers pull live on every run and stop if a source can't be reached. They never fall back to cached numbers.",
    items: [
        {
            title: "O*NET database",
            body: "Occupations and technology skills, with Hot Technology and In Demand flags.",
            href: "https://www.onetcenter.org/database.html",
        },
        {
            title: "O*NET OnLine",
            body: "Look up the occupation code for your lane.",
            href: "https://www.onetonline.org/find/",
        },
        {
            title: "BLS Employment Projections",
            body: "10-year growth, annual openings and median wage.",
            href: "https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm",
        },
        {
            title: "BLS Public Data API",
            body: "OEWS wages, no registration needed.",
            href: "https://www.bls.gov/developers/",
        },
        {
            title: "Real postings",
            body: "Your saved postings, or public Greenhouse, Lever and Ashby boards. What employers ask for now, including tools O*NET hasn't added yet.",
        },
    ],
};

export const PRIVACY = {
    eyebrow: "Privacy",
    title: "Your data stays yours.",
    body: "Keep resumes and your funnel tracker outside any git repository. Nothing in this kit sends, posts or applies for you. Every message is a draft you send yourself. Friday Setup redacts tokens, keys, emails and internal hostnames.",
};

export const CLOSE: { title: string; body: string; ctas: Cta[] } = {
    title: "Start with Module 1.",
    body: "Score your skills first. Everything else builds from the data. Free online, with limited in-person seats in downtown Minneapolis.",
    ctas: [
        { label: "RSVP free on Master.dev", href: RSVP_URL, variant: "primary" },
        { label: "Download the kit", href: "#kit", variant: "light" },
    ],
};
