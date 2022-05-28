const withPlugins = require('next-compose-plugins')
const withVideos = require('next-videos')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const purgeCSS = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
]

const postCSSFlexBugsFixes = [
  'postcss-flexbugs-fixes',
  [
    'postcss-preset-env',
    {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
  ],
]

const config = {
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  plugins: [IS_PRODUCTION ? postCSSFlexBugsFixes : [], IS_PRODUCTION ? purgeCSS : []],
}

module.exports = withPlugins([withVideos], config)
