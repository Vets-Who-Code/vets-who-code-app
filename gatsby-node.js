const path = require('path')
const {
  buildAllBlogPostList,
  buildPaginatedPages,
  buildIndividualBlogPostPage,
  buildBoardOfDirectorsPage,
} = require('./gatsby-node-helpers')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  if (!process.env.DISPLAY_CONTENTFUL_CONTENT) {
    const blogDisabledTemplate = path.resolve('./src/templates/page-disabled-template.js')
    const disabledPages = ['blog', 'board']

    for (let page of disabledPages) {
      createPage({
        path: `/${page}`,
        component: blogDisabledTemplate,
        context: {
          page,
        },
      })
    }
  } else {
    const blogTemplate = path.resolve('./src/templates/blog-template.js')
    const blogPostTemplate = path.resolve('./src/templates/blog-post-template.js')
    const boardOfDirectorsTemplate = path.resolve('./src/templates/board-of-directors-template.js')

    const allBlogPostList = await buildAllBlogPostList(graphql)
    await buildPaginatedPages({
      graphql,
      totalBlogPostCount: allBlogPostList.data.allContentfulBlogPost.totalCount,
      blogTemplate,
      createPage,
    })
    await buildIndividualBlogPostPage({ graphql, blogPostTemplate, allBlogPostList, createPage })
    await buildBoardOfDirectorsPage({ graphql, createPage, boardOfDirectorsTemplate })
  }
}
