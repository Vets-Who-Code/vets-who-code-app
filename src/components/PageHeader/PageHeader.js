import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const PageHeader = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          file(relativePath: { eq: "this_is_us.jpg" }) {
            childImageSharp {
              fixed(width: 1200) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      `}
      render={data => (
        <header
          className="inner-header overlay grey text-center slim-bg"
          style={{
            backgroundImage: `url(${data.file.childImageSharp.fixed.src})`,
            backgroundPositionY: 'bottom',
            height: '45vh',
          }}
        >
          <div className="overlay-01" />
        </header>
      )}
    />
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
}

export default PageHeader
