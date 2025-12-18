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

    eslint: {
        ignoreDuringBuilds: true, // ✅ This prevents ESLint errors from failing `next build`
    },

    experimental: {},

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
        domains: [],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        unoptimized: false,
    },
};

require("dotenv").config();

module.exports = withPWA(nextConfig);
