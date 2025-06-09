/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    runtimeCaching: require("next-pwa/cache"),
    buildExcludes: [
        /middleware-manifest\.json$/,
        /middleware-runtime\.js$/,
        /_middleware\.js$/,
        /^.+\\_middleware\.js$/,
    ],
    publicExcludes: ["!robots.txt"],
});

const nextConfig = {
    reactStrictMode: true,

    eslint: {
        ignoreDuringBuilds: true, // ✅ This prevents ESLint errors from failing `next build`
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

        return config;
    },

    images: {
        domains: [],
        remotePatterns: [],
    },

    experimental: {},
};

require("dotenv").config();

module.exports = withPWA(nextConfig);
