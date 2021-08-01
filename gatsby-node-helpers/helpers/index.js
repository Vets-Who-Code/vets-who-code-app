async function buildListFromQuery({ graphql, query }) {
  const listFromQuery = await graphql(`
    query { ${query}   }
  `)

  return listFromQuery
}

module.exports = {
  buildListFromQuery,
}
