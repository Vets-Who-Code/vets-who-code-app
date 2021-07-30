const { buildListFromQuery } = require('./helpers')

async function buildPaginatedPages({ graphql, createPage, blogTemplate, totalBlogPostCount }) {
  const postPerPage = 3
  const totalPages = Math.ceil(totalBlogPostCount / postPerPage)

  let index = 0
  while (index < totalPages) {
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages
    const skip = index * postPerPage
    const paginatedBlogPostsList = await graphql(`
        query paginatedBlogPostsList {
          allContentfulBlogPost(skip: ${skip}, limit: 3) {
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
      path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
      component: blogTemplate,
      context: {
        limit: postPerPage,
        skip: index * postPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
        contentfulData: paginatedBlogPostsList.data.allContentfulBlogPost,
      },
    })

    index++
  }
}

async function buildIndividualBlogPostPage({
  graphql,
  allBlogPostList,
  blogPostTemplate,
  createPage,
}) {
  for (let edge of allBlogPostList.data.allContentfulBlogPost.edges) {
    const blogPost = await graphql(`
        query {
          contentfulBlogPost(slug: { eq: "${edge.node.slug}" }) {
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
      component: blogPostTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        contentfulData: blogPost,
      },
    })
  }
}

async function buildBlog({ graphql, createPage, blogPostTemplate, blogTemplate }) {
  const query = `
      allContentfulBlogPost {
        totalCount
        edges {
          node {
            slug
          }
        }
      }
  `
  const allBlogPostList = await buildListFromQuery({ graphql, query })
  await buildPaginatedPages({
    graphql,
    totalBlogPostCount: allBlogPostList.data.allContentfulBlogPost.totalCount,
    blogTemplate,
    createPage,
  })
  await buildIndividualBlogPostPage({ graphql, blogPostTemplate, allBlogPostList, createPage })
}

module.exports = { buildBlog }
