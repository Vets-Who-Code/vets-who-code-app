import PropTypes from 'prop-types'
// CURRENTLY NEW GATSBY-IMAGE-PLUGIN DOES NOT INTEGRATE WITH CONTENTFUL USING
// GATSBY-IMAGE UNTIL THE API SUPPORTS CONTENTFUL
import Image from 'gatsby-image'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import './boardCards.css'

function BoardCards({ boardMembersList }) {
  const sortedBoardMembers = boardMembersList.sort((a, b) => {
    const aLastName = a.node.lastName
    const bLastName = b.node.lastName
    if (aLastName < bLastName) {
      return -1
    }
    if (aLastName > bLastName) {
      return 1
    }
    return 0
  })

  return (
    <>
      {sortedBoardMembers.map(({ node }) => {
        return (
          <div key={node.id} className="col-md-6 col-lg-3 col-sm-6">
            <div className="card-box text-center">
              <div className="upper">
                <div className="user-pic">
                  <Image fluid={node.image.fluid} alt={node.name} className="img-fluid" />
                </div>
                <h1>
                  {node.firstName} {node.lastName}
                </h1>
                <h2>{node.work}</h2>
              </div>
              <div className="board-links">
                {node.linkedin && (
                  <a
                    aria-label={`${node.firstName} ${node.lastName} linkedin`}
                    rel="noopener noreferrer"
                    href={node.linkedin}
                    target="_blank"
                  >
                    <FaLinkedinIn className="board-icons" size="40" />
                  </a>
                )}
                {node.twitter && (
                  <a
                    aria-label={`${node.firstName} ${node.lastName} twitter`}
                    rel="noopener noreferrer"
                    href={node.twitter}
                    target="_blank"
                  >
                    <FaTwitter className="board-icons" size="40" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

BoardCards.propTypes = {
  boardMembersList: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
        linkedin: PropTypes.string,
        twitter: PropTypes.string,
        work: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        fluid: PropTypes.shape({
          srcSet: PropTypes.string,
          src: PropTypes.string,
          sizes: PropTypes.string,
          aspectRatio: PropTypes.number,
        }),
      }),
    })
  ),
}

export default BoardCards
