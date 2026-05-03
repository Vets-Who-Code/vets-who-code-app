export type SitemapLink = { label: string; path: string };
export type SitemapColumn = { heading: string; links: SitemapLink[] };

export const sitemapColumns: SitemapColumn[] = [
    {
        heading: "Programs",
        links: [
            { label: "Overview", path: "/programs" },
            { label: "Core Curriculum", path: "/programs/core-curriculum" },
            { label: "Mission-Ready", path: "/programs/mission-ready" },
            { label: "Mentorship", path: "/programs/mentorship" },
            { label: "Software Factory", path: "/programs/software-factory" },
        ],
    },
    {
        heading: "Get Involved",
        links: [
            { label: "Apply", path: "/apply" },
            { label: "Mentor", path: "/mentor" },
            { label: "Donate", path: "/donate" },
            { label: "Sponsors", path: "/sponsors" },
            { label: "Hire Our Troops", path: "/jobs" },
        ],
    },
    {
        heading: "Learn",
        links: [
            { label: "Blog", path: "/blogs/blog" },
            { label: "Career Guides", path: "/career-guides" },
            { label: "Events", path: "/events" },
            { label: "Media", path: "/media" },
            { label: "Game", path: "/game" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About Us", path: "/about-us" },
            { label: "Theory of Change", path: "/theory-of-change" },
            { label: "Team", path: "/team" },
            { label: "Open Source Projects", path: "/projects" },
            { label: "FAQ", path: "/faq" },
            { label: "Contact", path: "/contact-us" },
            { label: "Sitemap", path: "/sitemap" },
            { label: "Code of Conduct", path: "/code-of-conduct" },
        ],
    },
];

// Extra sections shown on the human-readable /sitemap page but not in the footer,
// where real estate is tight.
export const sitemapExtraColumns: SitemapColumn[] = [
    {
        heading: "Curriculum Tracks",
        links: [
            { label: "All Subjects", path: "/subjects/all" },
            { label: "Foundations", path: "/subjects/foundations" },
            { label: "Software Engineering", path: "/subjects/software-engineering" },
            { label: "AI Engineering", path: "/subjects/ai-engineering" },
            { label: "Production Mastery", path: "/subjects/production-mastery" },
        ],
    },
    {
        heading: "Member Tools",
        links: [
            { label: "Profile", path: "/profile" },
            { label: "Reps (Challenges)", path: "/challenges" },
            { label: "Assessment", path: "/assessment" },
            { label: "J0d!e", path: "/jodie" },
            { label: "Portfolio Checklist", path: "/portfolio-checklist" },
        ],
    },
    {
        heading: "More",
        links: [
            { label: "Resume Translator", path: "/resume-translator" },
            { label: "Join Our Community", path: "/join-our-community" },
            { label: "Store", path: "/store" },
        ],
    },
];
