import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import PageHeader from '@/components/PageHeader'
// import BoardCards from '@/components/Board'
import { setupContentfulClient } from '@/utilities/contentful'

function BoardMemberTemplate({ boardMember }) {
  return (
    <>
      <NextSeo title="Board Member" />
      <PageHeader />
      <section id="about" className="small-top-pad section bg-default">
        <pre>{JSON.stringify(boardMember, null, 2)}</pre>
      </section>
    </>
  )
}

export async function getStaticPaths() {
  const { items } = await setupContentfulClient().getEntries({
    // eslint-disable-next-line
    content_type: 'boardMember',
  })

  const paths = Array.from({ length: items.length })
    .fill({ params: { boardMember: null }, items })
    .map(({ items }, i) => ({
      params: {
        slug: items[i]?.fields?.slug,
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
    content_type: 'boardMember',
    // query for board member based on unique slug
    'fields.slug': params.slug,
  })
  const { items } = response
  const [boardMember] = items

  return {
    props: {
      boardMember,
    },
  }
}

BoardMemberTemplate.propTypes = {}

export default BoardMemberTemplate
