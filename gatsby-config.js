// const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `VetsWhoCode`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-73856435-2`,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        purgeOnly: ['components/', '/main.css', 'bootstrap/', 'css/'], // Purge only these files/folders
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `${__dirname}/src/images/favicon.png`,
      },
    },
    `gatsby-source-dev`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto Slab`,
            variants: [`100`, `300`, `400`, `700`],
          },
          {
            family: `Open Sans`,
            variants: [`300`, `300i`, `400`, `400i`, `800`],
          },
          {
            family: `Lato`,
            variants: [`300`, `400`, `700`, `900`],
          },
        ],
      },
    },
  ],
  pathPrefix: `/`,
}
