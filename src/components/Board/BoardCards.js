import PropTypes from 'prop-types'
import Image from 'next/image'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'

function BoardCards({ boardMemberCollection }) {
  return (
    <>
      {boardMemberCollection.map(boardMember => {
        const { firstName, lastName, work, image, linkedin, twitter, bio } = boardMember.fields
        const { file } = image.fields
        return (
          <div
            tabIndex={'0'}
            key={`${firstName}-${lastName}`}
            className="col-md-6 col-lg-3 col-sm-6"
          >
            <div className="card-box text-center">
              <div className="upper">
                <div className="user-pic">
                  <Image
                    className="user-pic img-fluid"
                    placeholder="blur"
                    blurDataURL={file.url}
                    // layout="fill"
                    src={`https:${file.url}`}
                    alt={`${firstName} ${lastName}`}
                    width={200}
                    height={200}
                  />
                </div>
                <h2>{`${firstName} ${lastName}`}</h2>
                <h3>{work}</h3>
              </div>
              <div className="bio">
                <p className="board-bio">{bio}</p>
              </div>
              <div className="board-links">
                {linkedin && (
                  <a
                    aria-label={`${firstName} ${lastName} linkedin`}
                    rel="noopener noreferrer"
                    href={linkedin}
                    target="_blank"
                  >
                    <FaLinkedinIn className="board-icons" size="40" />
                  </a>
                )}
                {twitter && (
                  <a
                    aria-label={`${firstName} ${lastName} twitter`}
                    rel="noopener noreferrer"
                    href={twitter}
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
  boardMemberCollection: PropTypes.arrayOf(
    PropTypes.shape({
      metadata: PropTypes.shape({
        tags: PropTypes.array,
      }),
      fields: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        title: PropTypes.string,
        bio: PropTypes.string,
        image: PropTypes.shape({
          file: PropTypes.shape({
            url: PropTypes.string,
            fileName: PropTypes.string,
            contentType: PropTypes.string,
            details: PropTypes.shape({
              image: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
              }),
            }),
          }),
        }),
      }),
    })
  ),
}

export default BoardCards
