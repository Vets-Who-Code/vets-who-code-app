const safelist = [
    /html/,
    /body/,
    /^-tw-/,
    /^tw-/,
    /^maxSm:/,
    /^maxXl:/,
    /^maxLg:/,
    /^smToMd:/,
    /^sm:/,
    /^md:/,
    /^lg:/,
    /^xl:/,
    /^2xl:/,
    /^3xl:/,
    /^child:/,
    /^hover:/,
    /^focus:/,
    /^group/,
    /^group-hover:tw-/,
    /^last:/,
    /^first:/,
    /^even:/,
    /^before:/,
    /^after:/,
    /^nextIcon^/,
    /^modal-/,
    /^swiper/,
    /^react-tabs/,
];

module.exports = {
    plugins: [
        "tailwindcss",
        "autoprefixer",
        process.env.NODE_ENV === "production"
            ? [
                  "@fullhuman/postcss-purgecss",
                  {
                      content: ["./src/**/*.tsx"],
                      defaultExtractor: (content) =>
                          content.match(/[\w-/:]+(?<!:)/g) || [],
                      safelist: {
                          standard: safelist,
                          deep: safelist,
                          greedy: safelist,
                      },
                  },
              ]
            : null,
    ],
};
