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

    // Exclude heavy AI/ML packages from server-side bundles
    serverComponentsExternalPackages: ['@xenova/transformers', 'sharp', 'onnxruntime-node'],

    // Exclude @xenova/transformers from server-side file tracing
    experimental: {
        outputFileTracingExcludes: {
            '*': [
                'node_modules/@xenova/transformers/**/*',
                'node_modules/onnxruntime-node/**/*',
                'node_modules/onnxruntime-web/**/*',
            ],
        },
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

        // Explicitly mark @xenova/transformers as external for server builds
        if (isServer) {
            config.externals = config.externals || [];
            config.externals.push({
                '@xenova/transformers': 'commonjs @xenova/transformers',
                'sharp': 'commonjs sharp',
                'onnxruntime-node': 'commonjs onnxruntime-node',
            });
        }

        return config;
    },

    images: {
        domains: [],
        remotePatterns: [],
    },
};

require("dotenv").config();

module.exports = withPWA(nextConfig);
