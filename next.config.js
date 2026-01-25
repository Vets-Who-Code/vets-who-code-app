/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
    runtimeCaching: require("next-pwa/cache"),
    buildExcludes: [
        /middleware-manifest\.json$/,
        /middleware-runtime\.js$/,
        /_middleware\.js$/,
        /^.+\\_middleware\.js$/,
    ],
    publicExcludes: ["!robots.txt"],
    fallbacks: {
        document: "/_offline",
    },
});

const nextConfig = {
    reactStrictMode: true,

    experimental: {},

    // Security Headers
    async headers() {
        return [
            {
                // Apply security headers to all routes
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.clarity.ms https://va.vercel-scripts.com https://www.googletagmanager.com https://maps.googleapis.com https://pro.fontawesome.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://pro.fontawesome.com",
                            "img-src 'self' data: blob: https://res.cloudinary.com https://avatars.githubusercontent.com https://cdn.shopify.com https://widgets.guidestar.org https://maps.googleapis.com https://maps.gstatic.com https://*.googleapis.com https://images.huffingtonpost.com https://images.ctfassets.net https://www.hackerrank.com https://*.businessinsider.com https://i.insider.com https://cdn.sstatic.net https://i.stack.imgur.com https://stackoverflow.blog https://cdn.stackoverflow.co",
                            "font-src 'self' data: https://fonts.gstatic.com https://pro.fontawesome.com",
                            "connect-src 'self' https://www.clarity.ms https://vitals.vercel-insights.com https://github.com https://api.github.com https://hashflagswag.myshopify.com https://res.cloudinary.com https://widgets.guidestar.org https://www.google-analytics.com https://maps.googleapis.com",
                            "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://donorbox.org",
                            "media-src 'self' https://res.cloudinary.com",
                            "object-src 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                            "frame-ancestors 'self'",
                            "upgrade-insecure-requests"
                        ].join('; ')
                    },
                ],
            },
        ];
    },

    // Redirects for old blog pagination URLs
    async redirects() {
        return [
            {
                source: '/blogs/blog/page/:page',
                destination: '/blogs/blog?page=:page',
                permanent: true,
            },
        ];
    },

    // Optimize file tracing for smaller serverless bundles
    outputFileTracingIncludes: {
        // Only include specific data files that are needed at runtime
        '/': ['src/data/site-config.ts', 'src/data/homepages/**/*'],
        '/api/**': [], // API routes don't need static data files
        '/blogs/blog': ['src/data/blogs/**/*.md'], // Blog listing page needs blog markdown files for SSR
    },

    // Exclude unnecessary files from serverless functions
    outputFileTracingExcludes: {
        '/**': [
            'node_modules/@playwright/**',
            'node_modules/ace-builds/**',
            'node_modules/@swc/core-linux-x64-gnu/**',
            'node_modules/@swc/core-linux-x64-musl/**',
            'node_modules/@swc/core-darwin-x64/**',
            'node_modules/@swc/core-win32-x64-msvc/**',
            '.git/**',
            '.next/cache/**',
            'src/data/curriculum/lessons/**',
            '**/*.map',
            '**/test/**',
            '**/tests/**',
            '**/__tests__/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/*.spec.{js,jsx,ts,tsx}',
        ],
    },

    webpack(config, { isServer }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
            };
        }

        // Optimize for serverless functions
        if (isServer) {
            // Enable tree-shaking for server bundles
            config.optimization = {
                ...config.optimization,
                // Note: usedExports removed for Next.js 15 compatibility
                sideEffects: false,
            };
        }

        return config;
    },

    images: {
        domains: ['res.cloudinary.com', 'avatars.githubusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
        unoptimized: false,
    },
};

require("dotenv").config();

module.exports = withPWA(nextConfig);
