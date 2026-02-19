/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
    safelist: ["group-hover:tw-animate-wiggle"],
    content: ["./src/**/*.tsx"],
    prefix: "tw-",
    theme: {
        extend: {
            animation: {
                wiggle: "wiggle 0.5s ease-in-out",
                headerSlideDown: "headerSlideDown .95s ease forwards",
                gradationMask: "gradationMask 3s linear infinite",
                rotatePlane: "rotatePlane 1.2s infinite ease-in-out",
                "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
                "pulse-soft": "pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "slide-up": "slide-up 0.5s ease-out",
                "fade-in": "fade-in 0.6s ease-out",
            },
            keyframes: {
                wiggle: {
                    "0%": { transform: "rotate(0deg)" },
                    "50%": { transform: "rotate(5deg)" },
                    "100%": { transform: "rotate(-5deg)" },
                },
                headerSlideDown: {
                    "0%": {
                        transform: "translateY(-100%)",
                    },
                    "100%": {
                        transform: "translateY(0)",
                    },
                },
                gradationMask: {
                    "0%": {
                        transform: "translate(-50%, -50%) scale(0)",
                        opacity: 1,
                    },
                    "90%": {
                        opacity: 1,
                    },
                    "100%": {
                        transform: "translate(-50%, -50%) scale(1)",
                        opacity: 0,
                        borderColor: "transparent",
                    },
                },
                rotatePlane: {
                    "0%": {
                        transform: "perspective(120px) rotateX(0deg) rotateY(0deg)",
                    },
                    "50%": {
                        transform: "perspective(120px) rotateX(-180.1deg) rotateY(0deg)",
                    },
                    "100%": {
                        transform: "perspective(120px) rotateX(-180deg) rotateY(-179.9deg)",
                    },
                },
                "bounce-subtle": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
                "pulse-soft": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.8" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",

                // ===== PRIMARY BRAND COLORS =====
                // Based on VetsWhoCode Brand Style Guide

                // Navy Blue (Pantone 282 C) - Primary Brand Color
                navy: {
                    DEFAULT: "#091f40",
                    midnight: "#061A40", // Alternative to primary navy
                    deep: "#003559", // Dark accents, hover states
                    royal: "#0353A4", // Secondary buttons
                    ocean: "#006DAA", // Links, interactive elements
                    sky: "#B9D6F2", // Light backgrounds, info boxes
                },

                // Red (Pantone 193 C) - Primary Accent, CTAs
                red: {
                    DEFAULT: "#c5203e",
                    signal: "#C52233", // Near primary, alternative
                    crimson: "#A51C30", // Hover/pressed states
                    dark: "#74121D", // Error borders, deep accents
                    maroon: "#580C1F", // Darkest gradients
                },

                // Amber Gold - Highlights, Success States
                gold: {
                    DEFAULT: "#FDB330",
                    light: "#FFE169", // Highlight backgrounds
                    bright: "#FAD643", // Badges, success indicators
                    rich: "#DBB42C", // Hover state for gold
                    deep: "#C9A227", // Darker gold accents
                },

                // Cream White - Backgrounds
                cream: "#EEEDE9",

                // Ink Black - Body Text
                ink: "#1A1823",

                // ===== UI GRAYS (Light Mode) =====
                gray: {
                    DEFAULT: "#6C757D", // Slate - secondary text
                    50: "#F8F9FA", // Off White - light cards
                    100: "#DEE2E6", // Silver - borders, dividers
                    200: "#6C757D", // Slate - secondary text, captions
                    300: "#495057", // Charcoal - muted labels
                    400: "#343A40", // Dark Gray - softer text blocks
                },

                // ===== SEMANTIC COLORS (Mapped to Brand Colors) =====
                primary: {
                    DEFAULT: "#c5203e", // Brand Red
                    light: "#C52233", // Signal Red
                    dark: "#A51C30", // Crimson
                },

                // Accent color for use on navy/dark backgrounds (WCAG AA compliant)
                accent: {
                    DEFAULT: "#FDB330", // Gold — 9.5:1 on navy
                    light: "#FFE169", // Light Gold
                    dark: "#C9A227", // Deep Gold — 6.3:1 on navy
                },

                secondary: {
                    DEFAULT: "#091f40", // Navy Blue
                    light: "#0353A4", // Royal Blue
                    dark: "#061A40", // Midnight
                },

                success: {
                    DEFAULT: "#FDB330", // Amber Gold
                    light: "#FFE169", // Light Gold
                    dark: "#DBB42C", // Rich Gold
                },

                warning: {
                    DEFAULT: "#FAD643", // Bright Gold
                    light: "#FFE169", // Light Gold
                    dark: "#C9A227", // Deep Gold
                },

                danger: {
                    DEFAULT: "#c5203e", // Brand Red
                    light: "#C52233", // Signal Red
                    dark: "#74121D", // Dark Red
                },

                info: {
                    DEFAULT: "#006DAA", // Ocean Blue
                    light: "#B9D6F2", // Sky Blue
                    dark: "#0353A4", // Royal Blue
                },

                // ===== DARK MODE COLORS =====
                dark: {
                    DEFAULT: "#1A1823", // Ink Black - primary dark background
                    surface: "#212529", // Charcoal - elevated surfaces
                    elevated: "#343A40", // Dark Gray - tertiary surfaces
                    text: "#F8F9FA", // Off White - primary text
                    "text-muted": "#DEE2E6", // Silver - secondary text
                    "text-disabled": "#6C757D", // Slate - disabled text
                    accent: "#84C1FF", // Light Blue - links, interactive
                    "accent-hover": "#B9D6F2", // Sky Blue - hover state
                    error: "#F38375", // Coral - errors
                    success: "#FFE169", // Light Gold - success
                    badge: "#FAD643", // Bright Gold - badges
                },

                // ===== UTILITY COLORS =====
                white: "#FFFFFF",
                black: "#000000",

                // ===== LEGACY MAPPINGS (for prose/typography) =====
                body: "#1A1823", // Ink Black for body text
                heading: "#091f40", // Navy for headings
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        "--tw-prose-body": theme("colors.body"),
                        "--tw-prose-headings": theme("colors.heading"),
                        iframe: {
                            "margin-top": "2.5rem",
                            "margin-bottom": "2.5rem",
                        },
                    },
                },
            }),
            fontFamily: {
                body: ["Gilroy", "sans-serif"],
                heading: ["Gilroy", "sans-serif"],
                playfair: ["Playfair Display", "serif"],
                rossela: ["Conv_Rossela-Demo-2", "serif"],
            },
            fontSize: {
                sm: "0.75rem",
                md: "0.875rem",
                base: "0.938rem",
                h1: "2.5rem",
                h2: "2.125rem",
                h3: "1.5rem",
                h4: "1.3125rem",
                h5: "1.09375rem",
                h6: "0.938rem",
            },
            lineHeight: {
                body: 1.74,
                heading: 1.3,
            },
            boxShadow: {
                xs: "4px 4px 8px",
                "2xs": "0 0 10px",
                sm: "0 3px 9px",
                "2sm": "0 0 20px",
                "3sm": "0 2px 20px",
                md: "0 0 30px",
                "2md": "0 2px 29px",
                "3md": "0 8px 20px 0",
                "4md": "0 10px 30px",
                lg: "0 0 40px",
                "2lg": "0 16px 40px -40px",
                "3lg": "0 2px 45px 0",
                xl: "0 20px 50px",
                "2xl": "0 15px 50px",
                "3xl": "0 30px 50px",
                "4xl": "0 14px 59px",
                xxl: "0 130px 50px -100px",
            },
            letterSpacing: {
                tightest: "-0.125rem",
                wider: "1px",
            },
            borderRadius: {
                DEFAULT: "0.313rem",
            },
            spacing: {
                // Legacy spacing (keep for backwards compatibility)
                1.3: "0.313rem",
                3.8: "0.938rem",
                6.1: "1.5625rem",
                7.5: "1.875rem",
                15: "3.75rem",
                37: "9.375rem",
                // Modern 8px grid spacing
                xs: "0.5rem", // 8px
                sm: "0.75rem", // 12px
                md: "1rem", // 16px
                lg: "1.5rem", // 24px
                xl: "2rem", // 32px
                "2xl": "3rem", // 48px
                "3xl": "4rem", // 64px
                "4xl": "6rem", // 96px
            },
            screens: {
                maxSm: { max: "575px" },
                // => @media (max-width: 575px) { ... }
                maxXl: { max: "1199px" },
                // => @media (max-width: 1199px) { ... }
                maxLg: { max: "991px" },
                // => @media (max-width: 991px) { ... }
                smToMd: { min: "576px", max: "767px" },
                sm: "576px",
                // => @media (min-width: 576px) { ... }

                md: "768px",
                // => @media (min-width: 768px) { ... }

                lg: "992px",
                // => @media (min-width: 992px) { ... }

                xl: "1200px",
                // => @media (min-width: 1200px) { ... }

                "2xl": "1400px",
                // => @media (min-width: 1400px) { ... }

                "3xl": "1600px",
                // => @media (min-width: 1600px) { ... }
            },
            zIndex: {
                1: 1,
            },
            flex: {
                auto0: "1 0 auto",
                100: "1 0 100%",
            },
            transitionDuration: {
                400: "400ms",
                600: "600ms",
                1500: "1500ms",
            },
            transitionTimingFunction: {
                "in-expo": "cubic-bezier(.165,.84,.44,1)",
                "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
            },
            transitionDelay: {
                0: "0ms",
            },
            // (Removed duplicate keyframes and animation blocks to prevent overwriting 'wiggle')
            backgroundImage: {
                darkGradient: "linear-gradient(-180deg,transparent 0,rgba(0,0,0,.3) 100%)",
                lightGradient: "linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)",
                bodyGradient: "linear-gradient(-180deg, rgba(51, 51, 51, 0) 0%, #000 80%)",
                strawGradient: "linear-gradient(45deg,#fe378c 0,#fe5b34 100%)",
            },
        },
    },
    corePlugins: {
        container: false,
    },
    variants: {
        extend: {
            animation: ["group-hover"],
        },
    },
    plugins: [
        function addVariantFunc({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("nextIcon", "& > i");
            addVariant("child-hover", "& > *:hover");
            addVariant("second", "&:nth-child(2)");
            addVariant("third", "&:nth-child(3)");
        },
        require("@tailwindcss/typography"),
        function addComponentsFunc({ addComponents }) {
            addComponents({
                ".container": {
                    maxWidth: "100%",
                    marginInline: "auto",
                    paddingInline: "15px",
                    position: "relative",
                    zIndex: 20,
                    "@screen sm": {
                        maxWidth: "576px",
                    },
                    "@screen md": {
                        maxWidth: "768px",
                    },
                    "@screen lg": {
                        maxWidth: "992px",
                    },
                    "@screen xl": {
                        maxWidth: "1230px",
                    },
                },
            });
        },
        require("tailwindcss-animate"),
        require("tailwindcss-animate"),
    ],
};
