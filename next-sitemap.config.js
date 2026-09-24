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
    "/challenges",
    "/challenges/*",
    "/jodie",
    "/jodie/*",
    "/zoom-meetings",
    "/zoom-meetings/*",

    // Internal / dev-only
    "/dev-access",
    "/editor-page",
    "/url-preview-demo",
    "/_offline",

    // Search endpoints (index blog posts directly, not search UIs)
    "/blogs/search",

    // Legacy duplicate (canonical contact lives at /contact-us)
    "/contact-me",
];

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    exclude,
    // Per-route crawl hints. Everything not matched falls back to 0.5 / weekly.
    transform: async (config, path) => {
        let priority = 0.5;
        let changefreq = "weekly";

        if (path === "/") {
            priority = 1.0;
            changefreq = "daily";
        } else if (path.startsWith("/programs")) {
            priority = 0.9;
        } else if (path.startsWith("/blogs")) {
            priority = 0.8;
        } else if (path === "/about-us" || path === "/contact-us" || path.startsWith("/team")) {
            priority = 0.7;
            changefreq = "monthly";
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        };
    },
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
