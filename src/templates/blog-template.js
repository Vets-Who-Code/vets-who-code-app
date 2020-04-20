import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/Layout'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'

function BlogPostLink({ title, author, publishedDate, slug, description, featureImage }) {
  const excerpt = description.content[0].content[0].value

  return (
    <article className="post">
      <div className="row">
        <div className="col-xs-2" />
        <div className="col-md-8">
          <div className="entry-meta">
            <Link to={`/blog/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
              <Image
                alt={featureImage.title}
                fixed={featureImage.fixed}
                style={{ borderRadius: 4 }}
              />
              <h4 className="entry-title">{title}.</h4>
            </Link>

            <div className="entry-meta-data">
              <span className="author" style={{ paddingRight: 4 }}>
                {' '}
                by <span style={{ outline: 'none', color: '#C5203E' }}>{author}</span>
              </span>

              <time className="entry-date" dateTime="">
                <span className="blog-list-icon">
                  <Icon iconName="calendar-alt" fill="#999999" />
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
              to={`/blog/${slug}`}
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

BlogPostLink.propTypes = {
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
  featureImage: PropTypes.shape({ fixed: PropTypes.shape({ srcSet: PropTypes.string }) }),
}

const Blog = ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`

  return (
    <Layout>
      <PageHeader title="blog" />
      <section id="blog-page" className="section  bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {data.allContentfulBlogPost.nodes.map(post => (
                <BlogPostLink
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
                <Link to={`/blog/${index === 0 ? '' : index + 1}`}>{index + 1}</Link>
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
    </Layout>
  )
}

export const query = graphql`
  query($limit: Int!, $skip: Int!) {
    allContentfulBlogPost(
      sort: { fields: publishedDate, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      nodes {
        author {
          authorName
        }
        id
        title
        slug
        publishedDate(formatString: "MMMM Do, YYYY")
        body {
          json
        }
        featureImage {
          title
          fixed(width: 500) {
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

Blog.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    limit: PropTypes.number,
    skip: PropTypes.number,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
}

export default Blog
