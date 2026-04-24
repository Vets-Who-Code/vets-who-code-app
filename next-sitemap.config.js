/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vetswhocode.io";

// Routes that must not appear in the XML sitemap or be crawled.
// Grouped by reason so future additions are easy to slot in.
const exclude = [
    // Admin panel
    "/admin",
    "/admin/*",

    // Auth & account
    "/auth/*",
    "/login",
    "/profile",
    "/profile/*",
    "/orders",
    "/orders/*",

    // Gated troop experience
    "/assessment",
    "/assignments",
    "/assignments/*",
    "/certificates",
    "/certificates/*",
    "/challenges",
    "/challenges/*",
    "/courses",
    "/courses/*",
    "/jodie",
    "/jodie/*",
    "/resume-translator",
    "/resume-translator/*",
    "/submissions",
    "/submissions/*",
    "/zoom-meetings",
    "/zoom-meetings/*",

    // Internal / dev-only
    "/dev-access",
    "/editor-page",
    "/url-preview-demo",
    "/_offline",

    // Theme scaffolding variants (canonical blog lives at /blogs/blog)
    "/blogs/blog-classic",
    "/blogs/blog-classic/*",
    "/blogs/blog-grid-sidebar",
    "/blogs/blog-grid-sidebar/*",
    "/blogs/blog-list",
    "/blogs/blog-list/*",

    // Search endpoints (index blog posts directly, not search UIs)
    "/blogs/search",
    "/courses/search",

    // Legacy duplicate (canonical contact lives at /contact-us)
    "/contact-me",
];

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    exclude,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: exclude,
            },
        ],
    },
};
