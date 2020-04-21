import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'

const PageHeader = ({ title, link }) => {
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
          <div className="container">
            <h2 className="text-center text-uppercase">{title}</h2>
            <div className="breadcrumb">
              <Link to={link === undefined ? '/' : `/${link}`}>
                {link === undefined ? 'home' : link}
              </Link>
              <span> / </span>
              <Link to="/donate" /*className="page-active"*/>Donate</Link>
            </div>
          </div>
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
