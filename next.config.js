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

    // Exclude heavy dependencies from functions that don't need them
    outputFileTracingExcludes: {
        // Exclude @vercel/og from all API routes except /api/og/generate
        '/api/!(og)/**': ['node_modules/@vercel/og/**/*'],
        '/api/og/fetch': ['node_modules/@vercel/og/**/*'],
    },

    // Include only necessary files for specific routes
    outputFileTracingIncludes: {
        '/api/og/generate': [],
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
                usedExports: true,
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
