import PropTypes from 'prop-types'
import PageHeader from '../../src/components/PageHeader'
import BoardCards from '../../src/components/Board'
import SEO from '../../src/components/SEO'

function BoardTemplate({ pageContext }) {
  const { boardMembersList } = pageContext
  return (
    <>
      <SEO title="Board of Directors" />
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
        node: PropTypes.shape({
          id: PropTypes.string,
          bio: PropTypes.shape({ bio: PropTypes.string }),
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
  }),
}

export default BoardTemplate
