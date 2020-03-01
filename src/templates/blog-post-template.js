import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import readingTime from 'reading-time'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import { options } from './blog-helpers'
import { useScript } from '../hooks'

const BlogPost = ({ data /*navigate*/ }) => {
  const src = 'https://assets.codepen.io/assets/embed/ei.js'
  useScript(src)

  const contentfulBlogContent = documentToReactComponents(
    data.contentfulBlogPost.body.json,
    options
  )

  let text = ''
  contentfulBlogContent.forEach(reactElement => (text += reactElement.props.children))
  const readingStats = readingTime(text)

  return (
    <Layout>
      <PageHeader title={data.contentfulBlogPost.title} link={'blog'} />
      <section id="blog-page" className="section  bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <article className="post">
                <div className="entry-content">
                  <Image
                    className="align-left"
                    alt={data.contentfulBlogPost.author.authorName}
                    fixed={data.contentfulBlogPost.author.authorImage.fixed}
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                  />
                  <div className="entry-meta">
                    <h2 className="entry-title">{data.contentfulBlogPost.title}</h2>
                    <div className="entry-meta-data" style={{ marginBottom: 0 }}>
                      <span className="author">
                        <p>
                          by{' '}
                          <span style={{ outline: 'none', color: '#C5203E' }}>
                            {data.contentfulBlogPost.author.authorName}
                          </span>{' '}
                          <span>&middot;</span> {readingStats.text} <span>&middot;</span>{' '}
                          {data.contentfulBlogPost.publishedDate}
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
    </Layout>
  )
}

BlogPost.propTypes = {
  contentfulBlogPost: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    publishedDate: PropTypes.string,
    title: PropTypes.string,
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
  children: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
}

export const query = graphql`
  query($slug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      slug
      publishedDate(formatString: "MMMM Do, YYYY")
      title
      body {
        json
      }
      author {
        authorName
        authorImage {
          fixed(width: 100) {
            width
            height
            src
            width
            srcSet
          }
        }
      }
    }
  }
`

BlogPost.propTypes = {
  data: PropTypes.object,
}

export default BlogPost
