/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
    content: ["./src/**/*.tsx"],
    prefix: "tw-",
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                primary: {
                    DEFAULT: "#c5203e", // hashflag red
                    light: "#8fd6ca",
                },
                secondary: {
                    DEFAULT: "#091f40", // hashflag blue
                    light: "#8C89A2",
                },
                body: "#696969",
                heading: "#333333",
                success: {
                    DEFAULT: "#4CAF50",
                    100: "#7ed321",
                },
                warning: {
                    DEFAULT: "#FFC107",
                    100: "#fdb494",
                },
                danger: {
                    DEFAULT: "#F44336",
                    100: "#d85554",
                },
                info: {
                    DEFAULT: "#17A2B8",
                },
                light: {
                    DEFAULT: "#F8F9FA",
                    50: "#f8f9fd",
                    100: "#f8f8f8",
                },
                dark: {
                    DEFAULT: "#333333",
                    50: "#111111",
                    100: "#171621",
                },
                white: {
                    DEFAULT: "#FFFFFF",
                    inverse: "#f6f2ed",
                    catskill: "#f5f7fa",
                },
                orange: {
                    DEFAULT: "#ef6f31",
                    light: "rgba(239,111,49,0.1)",
                    100: "#ff4c24",
                    200: "#ff4d24",
                    300: "#fa7d61",
                },
                yellow: {
                    DEFAULT: "#f6b500",
                    100: "#ffbb00",
                },
                gray: {
                    100: "#faf8f6",
                    200: "#f5f5f5",
                    300: "#7e7e7e",
                    350: "#e0e0e0",
                    400: "#ababab",
                    450: "#F3F3F3",
                    500: "#EEEEEE",
                    550: "#ededed",
                    600: "#e8e8e8",
                    650: "#e7e7e7",
                    700: "#9b9b9b",
                    750: "#F1F1F1",
                    800: "#b6b7d2",
                    850: "#666666",
                },
                blue: {
                    100: "#7288e8",
                },
                spring: "#F5F1ED",
                desert: {
                    DEFAULT: "#ecc5ab",
                    100: "#e6dcd2",
                },
                pearl: "#EAE1D6",
                putty: "#e5c791",
                brunt: "#ee7455",
                jagged: "#BCE6DF",
                azure: "#00adff",
                alto: "#dedede",
                teracotta: {
                    DEFAULT: "#dd7d5a",
                    light: "#f4ebe7",
                },
                scooter: {
                    DEFAULT: "#2dbbc4",
                    light: "#e3f1f2",
                },
                ebb: "#e9e6e3",
                pampas: "#ece8e4",
                gore: "#1f1f52",
                porsche: "#ebb860",
                mandy: "#df5b6c",
                tan: "#d2a98e",
                mishcka: "#e2e2e8",
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
                1.3: "0.313rem",
                3.8: "0.938rem",
                6.1: "1.5625rem",
                7.5: "1.875rem",
                15: "3.75rem",
                37: "9.375rem",
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
            keyframes: {
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
                        transform:
                            "perspective(120px) rotateX(0deg) rotateY(0deg)",
                    },
                    "50%": {
                        transform:
                            "perspective(120px) rotateX(-180.1deg) rotateY(0deg)",
                    },
                    "100%": {
                        transform:
                            "perspective(120px) rotateX(-180deg) rotateY(-179.9deg)",
                    },
                },
            },
            animation: {
                headerSlideDown: "headerSlideDown .95s ease forwards",
                gradationMask: "gradationMask 3s linear infinite",
                rotatePlane: "rotatePlane 1.2s infinite ease-in-out",
            },
            backgroundImage: {
                darkGradient:
                    "linear-gradient(-180deg,transparent 0,rgba(0,0,0,.3) 100%)",
                lightGradient:
                    "linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)",
                bodyGradient:
                    "linear-gradient(-180deg, rgba(51, 51, 51, 0) 0%, #000 80%)",
                strawGradient: "linear-gradient(45deg,#fe378c 0,#fe5b34 100%)",
            },
        },
    },
    corePlugins: {
        container: false,
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
        require("tailwindcss-animate")
    ],
};
