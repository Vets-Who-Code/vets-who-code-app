import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title, description, image }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image ? `https:${image}` : `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet htmlAttributes={{ lang: 'en' }} title={seo.title} titleTemplate={titleTemplate}>
      <title>#VetsWhoCode</title>
      <meta name="image" content={seo.image} />
      <meta itemProp="name" content="#VetsWhoCode 🇺🇸 " />

      <meta name="description" content={seo.description} />
      <meta itemProp="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      <meta property="og:type" content="website" />
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      <meta property="og:image" content={seo.image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="#VetsWhoCode 🇺🇸 " />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}
