const gatsby = jest.requireActual('gatsby')
module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: () => 'gatsby-link',
  StaticQuery: () => 'static-query',
}
