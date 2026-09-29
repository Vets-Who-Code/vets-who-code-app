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
                      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                      safelist: {
                          // FontAwesome icon classes also live in src/data JSON and .ts files,
                          // which `content` doesn't scan. Standard only, so the unused
                          // `.fad.fa-*` duotone rules still get purged.
                          standard: [...safelist, /^fa-/],
                          deep: safelist,
                          greedy: safelist,
                      },
                  },
              ]
            : null,
    ],
};
