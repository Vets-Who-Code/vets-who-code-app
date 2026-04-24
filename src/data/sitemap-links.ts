export type SitemapLink = { label: string; path: string };
export type SitemapColumn = { heading: string; links: SitemapLink[] };

export const sitemapColumns: SitemapColumn[] = [
    {
        heading: "Program",
        links: [
            { label: "About", path: "/about-us" },
            { label: "Theory of Change", path: "/theory-of-change" },
            { label: "Apply", path: "/apply" },
            { label: "FAQ", path: "/faq" },
        ],
    },
    {
        heading: "Get Involved",
        links: [
            { label: "Become a Mentor", path: "/mentor" },
            { label: "Donate", path: "/donate" },
            { label: "Hire Our Troops", path: "/jobs" },
            { label: "Sponsors", path: "/sponsors" },
        ],
    },
    {
        heading: "Learn",
        links: [
            { label: "Blog", path: "/blogs/blog" },
            { label: "Subjects", path: "/subjects/all" },
            { label: "Projects", path: "/projects" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "Team", path: "/team" },
            { label: "Events", path: "/events" },
            { label: "Press", path: "/media" },
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
        heading: "Programs",
        links: [
            { label: "All Programs", path: "/programs" },
            { label: "Core Curriculum", path: "/programs/core-curriculum" },
            { label: "Mentorship", path: "/programs/mentorship" },
            { label: "Mission Ready", path: "/programs/mission-ready" },
            { label: "Studio", path: "/programs/studio" },
        ],
    },
    {
        heading: "More",
        links: [
            { label: "Portfolio Checklist", path: "/portfolio-checklist" },
            { label: "Join Our Community", path: "/join-our-community" },
            { label: "Career Guides", path: "/career-guides" },
            { label: "Store", path: "/store" },
        ],
    },
];
