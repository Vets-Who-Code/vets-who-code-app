import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import format from 'date-fns/format'
import { FaRegCalendarAlt } from 'react-icons/fa'
import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import { setupContentfulClient, findDescription } from '@/utilities/conentful'

function BlogPostLink({ title, author, publishedDate, slug, description, featureImage }) {
  const excerpt = findDescription(description)

  return (
    <article className="post after">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="entry-meta">
            <Link href={`/blog/post/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
              <a>
                <Image
                  className="img-responsive border-radius-4"
                  alt={featureImage.fields.title}
                  src={`https:${featureImage.fields.file.url}?w=800&h=600&fit=fill&fm=jpg&q=80`}
                  placeholder="blur"
                  blurDataURL={featureImage.fields.file.url}
                  width={800}
                  height={600}
                />
                <h4 className="entry-title">{title}.</h4>
              </a>
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
                {format(new Date(publishedDate), 'MMMM dd, yyyy')}
              </time>
            </div>
          </div>

          <div className="entry-content">{<p>{excerpt}</p>}</div>

          <div className="entry-meta clearfix">
            <Link href={`/blog/post/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
              <a className="btn btn-charity-default btn-read-more">
                <span>Read More</span>
              </a>
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
  featureImage: PropTypes.shape({
    url: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    title: PropTypes.string,
  }),
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
  }),
}

const Blog = ({ totalPages, isFirstPage, isLastPage, blogPostCollection, nextPage, prevPage }) => {
  return (
    <>
      <NextSeo title="Blog" />
      <PageHeader />
      <section id="blog-page" className="section  bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {blogPostCollection?.map(post => (
                <BlogPostLink
                  key={post.fields.slug}
                  title={post.fields.title}
                  author={post.fields.author.fields.authorName}
                  publishedDate={post.fields.publishedDate}
                  slug={post.fields.slug}
                  description={post.fields.body}
                  featureImage={post.fields.featureImage}
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
          <Pagination
            pageContext={{}}
            totalPages={totalPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            nextPage={nextPage}
            prevPage={prevPage}
            type="route"
            path="blog"
          />
        </nav>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const postPerPage = 3
  const currentPage = ctx?.query?.page ?? '1'

  const response = await setupContentfulClient().getEntries({
    // eslint-disable-next-line
    content_type: 'blogPost',
    // order by published date
    order: '-fields.publishedDate',
    // use skip and limit for Pagination
    skip: Number(currentPage) * 3 - 3,
    limit: postPerPage,
  })
  const { items, total } = response

  const totalPages = Math.ceil(total / postPerPage)
  const nextPage = `/blog?page=${String(Number(currentPage) + 1)}`
  const prevPage = currentPage === '1' ? '/blog' : `/blog?page=${String(Number(currentPage) - 1)}`
  const isFirstPage = currentPage === '1'
  const isLastPage = currentPage === String(totalPages)

  return {
    props: {
      blogPostCollection: items,
      nextPage,
      prevPage,
      totalPages,
      isFirstPage,
      isLastPage,
    },
  }
}

Blog.propTypes = {
  blogPostCollection: PropTypes.array,
  limit: PropTypes.number,
  skip: PropTypes.number,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  nextPage: PropTypes.string,
  prevPage: PropTypes.string,
}

export default Blog
