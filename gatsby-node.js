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
    const res = await graphql(`
      query {
        allContentfulBlogPost(limit: 10, sort: { fields: publishedDate, order: DESC }) {
          edges {
            node {
              slug
              id
            }
          }
          totalCount
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
              fixed(width: 500) {
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

    const postPerPage = 3
    const posts = res.data.allContentfulBlogPost.edges
    const totalPages = Math.ceil(posts.length / postPerPage)

    Array.from({ length: totalPages }).forEach((_, index) => {
      const currentPage = index + 1
      const isFirstPage = index === 0
      const isLastPage = currentPage === totalPages

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
          contentfulData: res.data.allContentfulBlogPost,
        },
      })
    })

    for (let edge of res.data.allContentfulBlogPost.edges) {
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
