/* eslint-disable */
const gatsby = jest.requireActual('gatsby')
const { parse } = require('graphql')

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: () => ({
    pathname: 'localhost:3000',
  }),
}))

module.exports = {
  ...gatsby,
  graphql: args => args,
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement('a', {
        ...rest,
        href: to,
      })
  ),
  StaticQuery: () => 'static-query',
  useStaticQuery: args => {
    const parsedQuery = parse(args[0])
    const mockedImageQueryValue =
      parsedQuery?.definitions[0]?.selectionSet?.selections[0]?.alias?.value

    return {
      [mockedImageQueryValue]: {
        childImageSharp: {},
      },
      site: {
        siteMetadata: {
          defaultDescription: 'words in quotes',
          siteUrl: `https://www.vetswhocode.io`,
          defaultImage: `/images/meta-image.jpg`,
          twitterUsername: `@vetswhocode`,
          defaultTitle: `#VetsWhoCode 🇺🇸 `,
        },
      },
    }
  },
}
