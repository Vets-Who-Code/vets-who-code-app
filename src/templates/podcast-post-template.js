import PropTypes from 'prop-types'
import Image from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'
import { options } from './helpers'

const Podcast = ({ pageContext }) => {
  const { contentfulData } = pageContext
  const { data } = contentfulData

  const contentfulBlogContent = documentToReactComponents(data.contentfulPodcast.body.json, options)

  return (
    <>
      <SEO
        title={data.contentfulPodcast.title}
        image={data.contentfulPodcast.featureImage.file.url}
      />
      <PageHeader title={data.contentfulPodcast.title} link={'blog'} />
      <section id="blog-page" className="section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <article className="post">
                <div className="entry-content">
                  <Image
                    className="align-left"
                    alt={data.contentfulPodcast.author.authorName}
                    fixed={data.contentfulPodcast.author.authorImage.fixed}
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                  />
                  <div className="entry-meta">
                    <h2 className="entry-title">{data.contentfulPodcast.title}</h2>
                    <div className="entry-meta-data" style={{ marginBottom: 0 }}>
                      <span className="author">
                        <p>
                          by{' '}
                          <span className="blog-author" style={{ outline: 'none' }}>
                            {data.contentfulPodcast.author.authorName}
                          </span>{' '}
                          {data.contentfulPodcast.publishedDate}
                        </p>
                      </span>
                    </div>
                  </div>
                  {contentfulBlogContent}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

Podcast.propTypes = {
  pageContext: PropTypes.shape({
    contentfulData: PropTypes.shape({
      data: PropTypes.shape({
        contentfulPodcast: PropTypes.shape({
          id: PropTypes.string,
          slug: PropTypes.string,
          publishedDate: PropTypes.string,
          title: PropTypes.string,
          featureImage: PropTypes.shape({
            file: PropTypes.shape({
              url: PropTypes.string,
            }),
          }),
          author: PropTypes.shape({
            authorName: PropTypes.string,
            authorImage: PropTypes.shape({
              fixed: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
                src: PropTypes.string,
                srcSet: PropTypes.string,
              }),
            }),
          }),
          body: PropTypes.shape({
            json: PropTypes.shape({
              data: PropTypes.object,
              content: PropTypes.arrayOf(
                PropTypes.shape({
                  data: PropTypes.object,
                  content: PropTypes.arrayOf(
                    PropTypes.shape({
                      data: PropTypes.object,
                      marks: PropTypes.array,
                      value: PropTypes.string,
                      nodeType: PropTypes.string,
                    })
                  ),
                })
              ),
            }),
          }),
        }),
      }),
    }),
  }),
  children: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
}

export default Podcast
