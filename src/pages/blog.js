import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allDevArticle.nodes
  return (
    <Layout>
      <PageHeader title="blog" />
      {posts.map(node => {
        const title = node.title || node.slug
        return (
          <article key={node.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: `none` }} to={`posts/${node.id}`}>
                  {title}
                </Link>
              </h3>
              <small>{node.published_at}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ArticleQuery {
    site {
      siteMetadata {
        title
      }
    }
    allDevArticle {
      nodes {
        id
        title
        slug
        published_at(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
