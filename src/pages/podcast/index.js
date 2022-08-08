import PropTypes from 'prop-types'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { FaRegCalendarAlt } from 'react-icons/fa'
import Image from 'next/image'
import format from 'date-fns/format'
import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import { setupContentfulClient, findDescription } from '@/utilities/conentful'

function PodcastLink({ title, author, publishedDate, slug, description, featureImage }) {
  const excerpt = findDescription(description)

  return (
    <article id="skip_to_content" className="post after">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="entry-meta">
            <Link href={`/podcast/post/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
              <a>
                <Image
                  className="img-responsive border-radius-4"
                  alt={featureImage.title}
                  src={`https:${featureImage.fields.file.url}?w=800&h=700&fit=fill&fm=jpg&q=75`}
                  placeholder="blur"
                  blurDataURL={featureImage.fields.file.url}
                  width={800}
                  height={700}
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

          <div className="entry-content">
            <p>{excerpt}</p>
          </div>

          <div className="entry-meta clearfix">
            <Link href={`/podcast/post/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
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
    url: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    title: PropTypes.string,
  }),
}

const Podcast = ({
  podcastCollection,
  currentPage,
  nextPage,
  prevPage,
  totalPages,
  isFirstPage,
  isLastPage,
}) => {
  return (
    <>
      <NextSeo title="Podcast" />
      <PageHeader />
      <section id="blog-page" className="section  bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {podcastCollection.map(podcast => {
                const { title, author, publishedDate, slug, featureImage, body } = podcast.fields
                const { authorName } = author.fields

                return (
                  <PodcastLink
                    key={podcast.sys.id}
                    title={title}
                    author={authorName}
                    publishedDate={publishedDate}
                    slug={slug}
                    description={body}
                    featureImage={featureImage}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <nav aria-label="Page navigation">
        <Pagination
          pageContext={podcastCollection}
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          type="route"
          path="podcast"
        />
      </nav>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const postPerPage = 3
  const currentPage = ctx?.query?.page ?? '1'

  const response = await setupContentfulClient().getEntries({
    // eslint-disable-next-line
    content_type: 'podcast',
    // order by published date
    order: '-fields.publishedDate',
    // use skip and limit for Pagination
    skip: Number(currentPage) * 3 - 3,
    limit: postPerPage,
  })
  const { items, total } = response

  const totalPages = Math.ceil(total / postPerPage)
  const nextPage = `/podcast?page=${String(Number(currentPage) + 1)}`
  const prevPage =
    currentPage === '1' ? '/podcast' : `/podcast?page=${String(Number(currentPage) - 1)}`
  const isFirstPage = currentPage === '1'
  const isLastPage = currentPage === String(totalPages)

  return {
    props: {
      podcastCollection: items,
      nextPage,
      prevPage,
      totalPages,
      isFirstPage,
      isLastPage,
    },
  }
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
