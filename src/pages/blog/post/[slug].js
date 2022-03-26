import PropTypes from 'prop-types'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import format from 'date-fns/format'
import readingTime from 'reading-time'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import PageHeader from '@/components/PageHeader'
import { useScript } from '@/hooks'
import { setupContentfulClient, options, findDescription } from '@/utilities/conentful'

const BlogPost = ({ blogPost }) => {
  const { title, author, body, publishedDate, slug, featureImage } = blogPost.fields
  const { authorImage, authorName } = author.fields
  const src = 'https://assets.codepen.io/assets/embed/ei.js'
  useScript(src)

  const excerpt = findDescription(body)
  const blogPostConent = documentToReactComponents(body, options)

  let text = ''
  blogPostConent.forEach(reactElement => (text += reactElement.props.children))
  const readingStats = readingTime(text)

  return (
    <>
      <NextSeo
        title={title}
        description={excerpt}
        openGraph={{
          title,
          url: `https://vetswhocode.io/blog/post/${slug}`,
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
                      className="round"
                      src={`https:${authorImage.fields.file.url}?w=50&h=50&fm=jpg&q=90`}
                      placeholder="blur"
                      blurDataURL={authorImage.fields.file.url}
                      alt={authorName}
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="entry-meta">
                    <h2 className="entry-title">{title}</h2>
                    <div className="entry-meta-data" style={{ marginBottom: 0 }}>
                      <span className="author">
                        <p>
                          by{' '}
                          <span className="blog-author" style={{ outline: 'none' }}>
                            {authorName}
                          </span>{' '}
                          <span>&middot;</span> {readingStats.text} <span>&middot;</span>{' '}
                          {format(new Date(publishedDate), 'MMMM dd, yyyy')}
                        </p>
                      </span>
                    </div>
                  </div>
                  {blogPostConent}
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
    content_type: 'blogPost',
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
    content_type: 'blogPost',
    // query for blog post with based on unique slug
    'fields.slug': params.slug,
  })

  const { items } = response
  const [blogPost] = items

  return {
    props: {
      blogPost,
    },
  }
}

BlogPost.propTypes = {
  blogPost: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string.isRequired,
      publishedDate: PropTypes.string.isRequired,
      body: PropTypes.shape({
        json: PropTypes.object,
      }),
      author: PropTypes.shape({
        fields: PropTypes.shape({
          authorImage: PropTypes.shape({
            fields: PropTypes.shape({
              file: PropTypes.shape({
                url: PropTypes.string.isRequired,
              }),
            }),
          }),
          authorName: PropTypes.string.isRequired,
        }),
      }),
    }),
  }),
}

export default BlogPost
