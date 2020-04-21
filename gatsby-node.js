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
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)

    const postPerPage = 2
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
        },
      })
    })

    res.data.allContentfulBlogPost.edges.forEach(edge => {
      createPage({
        component: blogPostTemplate,
        path: `/blog/${edge.node.slug}`,
        context: {
          slug: edge.node.slug,
        },
      })
    })
  }
}
