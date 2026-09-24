export type SitemapLink = { label: string; path: string };
export type SitemapColumn = { heading: string; links: SitemapLink[] };

// Decision landing pages, one per search query veterans use when choosing a
// program. Also linked from /apply and /programs.
export const decisionGuideLinks: SitemapLink[] = [
    {
        label: "Free Software Engineering Training",
        path: "/for-veterans/free-software-engineering-training",
    },
    {
        label: "Software Engineer After the Military",
        path: "/for-veterans/become-a-software-engineer-after-the-military",
    },
    {
        label: "What a Veteran Software Engineer Earns",
        path: "/for-veterans/software-engineer-salary",
    },
    {
        label: "Learn to Code Without a Degree",
        path: "/for-veterans/learn-to-code-without-a-degree",
    },
];

export const sitemapColumns: SitemapColumn[] = [
    {
        heading: "Programs",
        links: [
            { label: "Overview", path: "/programs" },
            { label: "Software Engineering Accelerator", path: "/programs/accelerator" },
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
            ...decisionGuideLinks,
            { label: "Portfolio Checklist", path: "/portfolio-checklist" },
            { label: "Events", path: "/events" },
            { label: "Media", path: "/media" },
            { label: "Game", path: "/game" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "About Us", path: "/about-us" },
            { label: "Curriculum", path: "/curriculum" },
            { label: "Theory of Change", path: "/theory-of-change" },
            { label: "Team", path: "/team" },
            { label: "Open Source Projects", path: "/projects" },
            { label: "FAQ", path: "/faq" },
            { label: "Contact", path: "/contact-us" },
            { label: "Press Kit", path: "/press-kit" },
            { label: "Sitemap", path: "/sitemap" },
            { label: "Code of Conduct", path: "/code-of-conduct" },
        ],
    },
];

// Extra sections shown on the human-readable /sitemap page but not in the footer,
// where real estate is tight.
export const sitemapExtraColumns: SitemapColumn[] = [
    {
        heading: "Member Tools",
        links: [
            { label: "Profile", path: "/profile" },
            { label: "Reps (Challenges)", path: "/challenges" },
            { label: "Assessment", path: "/assessment" },
            { label: "J0d!e", path: "/jodie" },
        ],
    },
    {
        heading: "More",
        links: [
            { label: "Join Our Community", path: "/join-our-community" },
            { label: "Store", path: "/store" },
        ],
    },
];
