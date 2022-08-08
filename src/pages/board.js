import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import PageHeader from '@/components/PageHeader'
import BoardCards from '@/components/Board'
import { setupContentfulClient } from '@/utilities/conentful'

function BoardTemplate({ boardMemberCollection }) {
  return (
    <>
      <NextSeo title="Board" />
      <PageHeader />
      <section id="about" className="small-top-pad section bg-default">
        <div id="skip_to_content" className="container-fluid">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Board of Directors</h1>
            </div>
          </div>
          <div className="container">
            <div className="row is-flex">
              <BoardCards boardMemberCollection={boardMemberCollection} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const response = await setupContentfulClient().getEntries({
    // eslint-disable-next-line
    content_type: 'boardMember',
    order: 'fields.lastName',
  })

  const { items } = response

  return {
    props: {
      boardMemberCollection: items,
    },
  }
}

BoardTemplate.propTypes = {
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

export default BoardTemplate
