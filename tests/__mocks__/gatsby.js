const gatsby = jest.requireActual('gatsby')
const { parse } = require('graphql')

module.exports = {
  ...gatsby,
  graphql: args => args,
  Link: () => 'gatsby-link',
  StaticQuery: () => 'static-query',
  useStaticQuery: args => {
    const parsedQuery = parse(args[0])
    const mockedQueryValue = parsedQuery.definitions[0].selectionSet.selections[0].alias.value
    // mock for useStaticQuery
    return {
      [mockedQueryValue]: {
        childImageSharp: {},
      },
    }
  },
}
