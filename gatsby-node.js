const path = require('path')
const { buildBlog, buildPodcast, buildBoardOfDirectorsPage } = require('./gatsby-node-helpers')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  if (process.env.VWC_ACTIVE_ENV !== 'production') {
    const disabledPageTemplate = path.resolve('./src/templates/page-disabled-template.js')
    const disabledPages = ['blog', 'board', 'podcast']

    for (let page of disabledPages) {
      createPage({
        path: `/${page}`,
        component: disabledPageTemplate,
        context: {
          page,
        },
      })
    }
  } else {
    const blogTemplate = path.resolve('./src/templates/blog-template.js')
    const blogPostTemplate = path.resolve('./src/templates/blog-post-template.js')
    const podcastsTemplate = path.resolve('./src/templates/podcast-template.js')
    const podcastPostTemplate = path.resolve('./src/templates/podcast-post-template.js')
    const boardOfDirectorsTemplate = path.resolve('./src/templates/board-of-directors-template.js')

    await buildBlog({ graphql, createPage, blogPostTemplate, blogTemplate })
    await buildPodcast({
      graphql,
      createPage,
      individualPageTemplate: podcastPostTemplate,
      pageTemplate: podcastsTemplate,
    })
    await buildBoardOfDirectorsPage({ graphql, createPage, boardOfDirectorsTemplate })
  }
}
