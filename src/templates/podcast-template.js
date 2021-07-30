import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FaRegCalendarAlt } from 'react-icons/fa'
import Image from 'gatsby-image'

import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'
import { findDescription } from './helpers'

function PodcastLink({ title, author, publishedDate, slug, description, featureImage }) {
  const excerpt = findDescription(description)

  return (
    <article className="post after">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="entry-meta">
            <Link to={`/podcast/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
              <Image
                className="img-responsive"
                alt={featureImage.title}
                fluid={featureImage.fluid}
                style={{ borderRadius: 4 }}
              />
              <h4 className="entry-title">{title}.</h4>
            </Link>

            <div className="entry-meta-data">
              <span className="author" style={{ paddingRight: 4 }}>
                {' '}
                by{' '}
                <span className="blog-author" style={{ outline: 'none' }}>
                  {author}
                </span>
              </span>

              <time className="entry-date" dateTime="">
                <span className="blog-list-icon">
                  <FaRegCalendarAlt color="#999999" />
                </span>
                {publishedDate}
              </time>
            </div>
          </div>

          <div className="entry-content">
            <p>{excerpt}</p>
          </div>

          <div className="entry-meta clearfix">
            <Link
              to={`/podcast/${slug}`}
              className="btn btn-charity-default btn-read-more"
              hidefocus="true"
              style={{ outline: 'none' }}
            >
              <span>Read More</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

PodcastLink.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  publishedDate: PropTypes.string,
  slug: PropTypes.string,
  description: PropTypes.shape({
    data: PropTypes.object,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.object,
        content: PropTypes.arrayOf(
          PropTypes.shape({
            data: PropTypes.object,
            marks: PropTypes.array,
            value: PropTypes.string,
          })
        ),
      })
    ),
    nodeType: PropTypes.string,
  }),
  featureImage: PropTypes.shape({
    fluid: PropTypes.shape({
      srcSet: PropTypes.string,
      src: PropTypes.string,
      sizes: PropTypes.string,
      aspectRatio: PropTypes.number,
    }),
    title: PropTypes.string,
  }),
}

const Podcast = ({ pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages, contentfulData } = pageContext
  const nextPage = `/podcast/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? '/podcast' : `/podcast/${String(currentPage - 1)}`

  return (
    <>
      <SEO title="Podcast" />
      <PageHeader title="podcast" />
      <section id="blog-page" className="section  bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {contentfulData.nodes.map(post => (
                <PodcastLink
                  key={post.id}
                  title={post.title}
                  author={post.author.authorName}
                  publishedDate={post.publishedDate}
                  slug={post.slug}
                  description={post.body.json}
                  featureImage={post.featureImage}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {!isFirstPage && (
              <li>
                <Link to={prevPage} rel="prev">
                  {/* <span aria-hidden="true">&laquo;</span> */}
                  <span aria-hidden="true">Previous</span>
                </Link>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <Link to={`/podcast/${index === 0 ? '' : index + 1}`}>{index + 1}</Link>
              </li>
            ))}
            {!isLastPage && (
              <li>
                <Link to={nextPage} rel="next">
                  {/* <span aria-hidden="true">&raquo;</span> */}
                  <span aria-hidden="true">Next</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}

Podcast.propTypes = {
  pageContext: PropTypes.shape({
    limit: PropTypes.number,
    skip: PropTypes.number,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    contentfulData: PropTypes.object,
  }),
}

export default Podcast
