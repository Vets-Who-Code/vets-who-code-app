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
