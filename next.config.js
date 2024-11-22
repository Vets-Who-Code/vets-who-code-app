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

    webpack(config, { isServer }) {
        // Handle SVG files
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        // Handle fs fallback for client-side
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

// Load environment variables
require("dotenv").config();

module.exports = withPWA(nextConfig);
