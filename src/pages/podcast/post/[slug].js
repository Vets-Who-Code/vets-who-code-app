import PropTypes from 'prop-types'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import format from 'date-fns/format'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import PageHeader from '@/components/PageHeader'
import { setupContentfulClient, options, findDescription } from '@/utilities/conentful'

const Podcast = ({ podcast }) => {
  const { author, publishedDate, title, body, slug, featureImage } = podcast.fields
  const { authorImage, authorName } = author.fields
  const podcastPostContent = documentToReactComponents(body, options)
  const excerpt = findDescription(body)

  return (
    <>
      <NextSeo
        title={title}
        description={excerpt}
        openGraph={{
          title,
          url: `https://vetswhocode.io/podcast/post/${slug}`,
          images: [
            {
              url: `https:${featureImage.fields.file.url}?fm=jpg&q=90`,
              width: 800,
              height: 600,
              alt: featureImage.fields.description,
            },
          ],
        }}
      />
      <PageHeader />
      <section id="blog-page" className="section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <article className="post">
                <div className="entry-content">
                  <div className="align-left">
                    <Image
                      className="img-responsive round"
                      alt={authorName}
                      placeholder="blur"
                      blurDataURL={authorImage.fields.file.url}
                      height={50}
                      width={50}
                      src={`https:${authorImage.fields.file.url}?w=50&h=50&fm=jpg&q=90`}
                    />
                  </div>
                  <div className="entry-meta">
                    <h2 className="entry-title">{title}</h2>
                    <div className="entry-meta-data" style={{ marginBottom: 0 }}>
                      <span className="author">
                        <p>
                          by{' '}
                          <span className="blog-author" style={{ outline: 'none' }}>
                            {author.fields.authorName}
                          </span>{' '}
                          {format(new Date(publishedDate), 'MMMM dd, yyyy')}
                        </p>
                      </span>
                    </div>
                  </div>
                  {podcastPostContent}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticPaths() {
  const response = await setupContentfulClient().getEntries({
    // eslint-disable-next-line
    content_type: 'podcast',
  })

  const paths = response.items.map(p => ({
    params: {
      slug: p.fields.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const response = await setupContentfulClient().getEntries({
    // eslint-disable-next-line
    content_type: 'podcast',
    // query for blog post with based on unique slug
    'fields.slug': params.slug,
  })
  const { items } = response
  const [podcast] = items

  return {
    props: {
      podcast,
    },
  }
}

Podcast.propTypes = {
  podcast: PropTypes.shape({
    metadata: PropTypes.shape({
      tags: PropTypes.array,
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string,
      publishedDate: PropTypes.string,
      title: PropTypes.string,
      featureImage: PropTypes.shape({
        fields: PropTypes.shape({
          file: PropTypes.shape({
            url: PropTypes.string,
          }),
        }),
      }),
      author: PropTypes.shape({
        fields: PropTypes.shape({
          authorName: PropTypes.string,
          authorImage: PropTypes.shape({
            fields: PropTypes.shape({
              file: PropTypes.shape({
                url: PropTypes.string,
              }),
            }),
          }),
        }),
      }),
      body: PropTypes.object,
    }),
  }),
  children: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
}

export default Podcast
