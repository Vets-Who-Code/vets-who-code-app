module.exports = {
  // You will want to change this to wherever your Stories will live
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-dark-mode/register", "@storybook/addon-a11y"],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push(
      [
        require.resolve('babel-plugin-remove-graphql-queries'),
        {
          stage: 'develop-html',
          staticQueryDir: 'page-data/sq/d',
        },
        'remove-graphql-queries'
     ])

    // Pass empty module instead of polyfill for the conflicting module (for webpack@5 compatibility)
    config.resolve.fallback = {
      crypto: false,
    }

    // Disable performance budgets which don't make much sense for Storybook
    config.performance = false

    return config
  },
}
