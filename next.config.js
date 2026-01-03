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
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.clarity.ms https://va.vercel-scripts.com",
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' data: blob: https://res.cloudinary.com https://avatars.githubusercontent.com https://cdn.shopify.com https://widgets.guidestar.org",
                            "font-src 'self' data:",
                            "connect-src 'self' https://www.clarity.ms https://vitals.vercel-insights.com https://github.com https://api.github.com https://hashflagswag.myshopify.com https://res.cloudinary.com",
                            "frame-src 'self'",
                            "media-src 'self'",
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

    // Optimize file tracing for smaller serverless bundles
    outputFileTracingIncludes: {
        // Only include specific data files that are needed at runtime
        '/': ['src/data/site-config.ts', 'src/data/homepages/**/*'],
        '/api/**': [], // API routes don't need static data files
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
            'src/data/blogs/**',
            'src/data/curriculum/lessons/**',
            '**/*.md',
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
