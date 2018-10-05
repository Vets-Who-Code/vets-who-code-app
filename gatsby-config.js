// const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `VetsWhoCode`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet'
  ],
  pathPrefix: `/`
};
