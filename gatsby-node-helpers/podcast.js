const { buildListFromQuery } = require('./helpers')

async function buildPaginatedPages({ graphql, createPage, pageTemplate, totalItemsCount }) {
  const postPerPage = 3
  const totalPages = Math.ceil(totalItemsCount / postPerPage)

  let index = 0
  while (index < totalPages) {
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages
    const skip = index * postPerPage
    const paginatedPodcastList = await graphql(`
        query paginatedPodcastList {
          allContentfulPodcast(skip: ${skip}, limit: 3) {
            nodes {
              author {
                authorName
                id
              }
              title
              slug
              id
              publishedDate(formatString: "MMMM Do, YYYY")
              body {
                json
              }
              featureImage {
                title
                fluid(maxWidth: 450) {
                  sizes
                  src
                  srcSet
                  aspectRatio
                }
              }
            }
          }
        }
      `)

    createPage({
      path: isFirstPage ? '/podcast' : `/podcast/${currentPage}`,
      component: pageTemplate,
      context: {
        limit: postPerPage,
        skip: index * postPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
        contentfulData: paginatedPodcastList.data.allContentfulPodcast,
      },
    })

    index++
  }
}

async function buildIndividualPodcastPage({
  graphql,
  allPodcastList,
  individualPageTemplate,
  createPage,
}) {
  for (let edge of allPodcastList.data.allContentfulPodcast.edges) {
    const podcast = await graphql(`
        query {
          contentfulPodcast(slug: { eq: "${edge.node.slug}" }) {
            id
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
            title
            body {
              json
            }
            featureImage {
              file {
                url
              }
            }
            author {
              authorName
              authorImage {
                fixed(width: 100) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      `)

    createPage({
      component: individualPageTemplate,
      path: `/podcast/${edge.node.slug}`,
      context: {
        contentfulData: podcast,
      },
    })
  }
}

async function buildPodcast({ graphql, createPage, individualPageTemplate, pageTemplate }) {
  const query = `
      allContentfulPodcast {
        totalCount
        edges {
          node {
            slug
          }
        }
      }
  `
  const allPodcastList = await buildListFromQuery({ graphql, query })
  await buildPaginatedPages({
    graphql,
    totalItemsCount: allPodcastList.data.allContentfulPodcast.totalCount,
    pageTemplate,
    createPage,
    slugName: 'podcast',
  })
  await buildIndividualPodcastPage({ graphql, individualPageTemplate, allPodcastList, createPage })
}

module.exports = { buildPodcast }
