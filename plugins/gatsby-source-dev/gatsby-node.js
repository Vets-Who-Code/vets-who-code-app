const axios = require(`axios`)
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  const result = await axios.get(`https://dev.to/api/articles?username=vetswhocode`, {})

  result.data.forEach(post => {
    // Destructure id field and assign the rest to `data`
    const { id, ...data } = post

    // Create the node object
    const node = {
      // Create a node id
      id: `${id}`,
      internal: {
        // Tell Gatsby this is a new node type, so you can query it
        type: `DevArticle`,
        // Set the markdown content
      },
      // Spread in the rest of the data
      ...data,
    }
    const contentDigest = createContentDigest(node)
    node.internal.contentDigest = contentDigest

    createNode(node)
  })
}
