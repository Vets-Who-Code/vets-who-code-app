import React from 'react'
import PropTypes from 'prop-types'
import Image from 'gatsby-image'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import './boardCards.css'

function BoardCards({ boardMembersList }) {
  const sortedBoardMembers = boardMembersList.sort((a, b) => {
    const [, aLastName] = a.node.name.split(' ')
    const [, bLastName] = b.node.name.split(' ')
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
                <h5>{node.name}</h5>
                <h6>{node.work}</h6>
              </div>
              <div className="bio">
                <p>{node?.bio?.bio}</p>
              </div>
              <div className="board-links">
                {node.linkedin && (
                  <a rel="noopener noreferrer" href={node.linkedin} target="_blank">
                    <FaLinkedinIn className="board-icons" size="40" />
                  </a>
                )}
                {node.twitter && (
                  <a rel="noopener noreferrer" href={node.twitter} target="_blank">
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
      id: PropTypes.string,
      bio: PropTypes.shape({ bio: PropTypes.string }),
      linkedin: PropTypes.string,
      twitter: PropTypes.string,
      work: PropTypes.string,
      name: PropTypes.string,
      fluid: PropTypes.shape({
        srcSet: PropTypes.string,
        src: PropTypes.string,
        sizes: PropTypes.string,
        aspectRatio: PropTypes.number,
      }),
    })
  ),
}

export default BoardCards
