import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import '../assets/css/blog.css'
import '../assets/css/main.css'
export const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allDevArticle.nodes
  const stockImage =
    'https://res.cloudinary.com/practicaldev/image/fetch/s--EXetaNc9--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--7VrAA2ln--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/qmb5wkoeywj06pd7p8ku.png'
  return (
    <Layout>
      <PageHeader title="blog" />
      <div id="blog-container">
        {posts.map(node => {
          const title = node.title || node.slug
          return (
            <div className="post-card" key={node.slug}>
              {node.cover_image ? (
                <img className="cover_image" src={node.cover_image} />
              ) : (
                <img className="cover_image" src={stockImage} />
              )}
              <h3 className="blog_title">{title}</h3>
              <p className="date">{node.published_at}</p>
              <p className="date">By {node.user.name}</p>
              <p
                className="blog_description"
                dangerouslySetInnerHTML={{
                  __html: node.description,
                }}
              />
              <Link className='readmore' to={`posts/${node.id}`}>Read more...</Link>
            </div>
          )
        })}
      </div>
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
        cover_image
        title
        slug
        published_at(formatString: "MMMM DD, YYYY")
        description
        positive_reactions_count
        comments_count
        user {
          name
        }
      }
    }
  }
`
