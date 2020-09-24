import React from 'react'
import PropTypes from 'prop-types'
import PageHeader from '../../src/components/PageHeader'
import BoardCards from '../../src/components/Board'

function BoardTemplate({ pageContext }) {
  const { boardMembersList } = pageContext
  return (
    <>
      <PageHeader title="Board of Directors" />
      <section id="about" className="small-top-pad section bg-default">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Board of Directors</h1>
            </div>
          </div>
          <div className="container">
            <div className="row is-flex">
              <BoardCards boardMembersList={boardMembersList} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

BoardTemplate.propTypes = {
  pageContext: PropTypes.shape({
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
  }),
}

export default BoardTemplate
