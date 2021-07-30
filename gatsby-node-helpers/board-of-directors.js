async function buildBoardOfDirectorsPage({ graphql, createPage, boardOfDirectorsTemplate }) {
  const allContentfulBoardMember = await graphql(`
    query {
      allContentfulBoardMember {
        edges {
          node {
            id
            bio {
              bio
            }
            linkedin
            firstName
            lastName
            twitter
            work
            image {
              fluid(maxWidth: 200) {
                sizes
                src
                srcSet
                aspectRatio
              }
            }
          }
        }
      }
    }
  `)

  createPage({
    component: boardOfDirectorsTemplate,
    path: `/board`,
    context: {
      boardMembersList: allContentfulBoardMember.data.allContentfulBoardMember.edges,
    },
  })
}

module.exports = { buildBoardOfDirectorsPage }
