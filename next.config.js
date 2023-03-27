/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
};
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withReactSvg = require("next-react-svg");
const path = require("path");

module.exports = withPWA(
    withReactSvg({
        pwa: {
            disable: process.env.NODE_ENV === "development",
            dest: "public",
            register: true,
            runtimeCaching,
            buildExcludes: [
                /\/*server\/middleware-chunks\/[0-9]*[a-z]*[A-Z]*\.js$/,
                /middleware-manifest\.json$/,
                /middleware-runtime\.js$/,
                /_middleware\.js$/,
                /^.+\\_middleware\.js$/,
            ],
            publicExcludes: ["!robots.txt"],
        },
        nextConfig,
        include: path.resolve(__dirname, "src/assets/svgs"),
        webpack(config) {
            return config;
        },
    })
);
