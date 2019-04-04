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
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        purgeOnly : ['components/', '/main.css', 'bootstrap/', 'css/'], // Purge only these files/folders
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://vetswhocode.us12.list-manage.com/subscribe/post?u=80af3c15cfdb9ee5ad4bc6ee6&amp;id=642229d1fe',
      },
    }
  ],
  pathPrefix: `/`
};
