import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

function Header() {
  const data = useStaticQuery(graphql`
    query {
      codeImage: file(relativePath: { eq: "code.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <BackgroundImage
      Tag="section"
      className="site-header flexslider classic overlay main-overlay grey"
      fluid={data.codeImage.childImageSharp.fluid}
      style={{ height: '80vh' }}
    >
      <div className="header-classic wrapper-table">
        <div className="valign-center">
          <div className="container">
            <div className="col-md-10 col-md-offset-1">
              <div className="intro text-left" style={{ color: '#fff' }}>
                <h1>Learn</h1>
                <p className="subtitle">How To Code With Other Veterans.</p>
                <div className="btn-cal-group">
                  <Link to="/apply" className="btn btn-charity-default">
                    Apply
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundImage>
  )
}

export default Header
