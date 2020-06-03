<<<<<<< HEAD
const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  if (!process.env.DISPLAY_BLOG) {
    const blogDisabledTemplate = path.resolve('./src/templates/blog-disabled-template.js')
    createPage({
      path: '/blog',
      component: blogDisabledTemplate,
    })
  } else {
    const blogTemplate = path.resolve('./src/templates/blog-template.js')
    const blogPostTemplate = path.resolve('./src/templates/blog-post-template.js')
    const allBlogPostList = await graphql(`
      query {
        allContentfulBlogPost {
          totalCount
          edges {
            node {
              slug
            }
          }
        }
      }
    `)

    const postPerPage = 3
    const { totalCount } = allBlogPostList.data.allContentfulBlogPost
    const totalPages = Math.ceil(totalCount / postPerPage)

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
}
=======
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/order` page.
  if (page.path.match(/^\/post/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/posts/*'
    // Update the page.
    createPage(page)
  }
}

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
>>>>>>> f58ce8c2841882adbe91abac8b788ebaf5423f7d
