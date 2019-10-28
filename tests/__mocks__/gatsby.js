const gatsby = jest.requireActual('gatsby')
module.exports = {
  ...gatsby,
  graphql: args => args,
  Link: () => 'gatsby-link',
  StaticQuery: () => 'static-query',
  useStaticQuery: args => {
    // mock for useStaticQuery
    const query = args[0]
    if (query.indexOf('codeImage') > -1) {
      return {
        codeImage: {
          childImageSharp: {},
        },
      }
    }
  },
}
