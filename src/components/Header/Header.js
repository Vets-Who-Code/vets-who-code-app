import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Typed from 'react-typed'
import Toggle from '../Toggle'
import '../../assets/css/custom.css'
function Header() {
  const data = useStaticQuery(graphql`
    query {
      codeImage: file(relativePath: { eq: "code.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)

  return (
    <BackgroundImage
      Tag="section"
      className="site-header flexslider classic overlay main-overlay grey"
      backgroundColor="#091f40"
      fluid={data.codeImage.childImageSharp.fluid}
      style={{ height: '80vh' }}
      loading="eager"
    >
      <div className="header-classic wrapper-table">
        <div className="valign-center">
          <div className="container">
            <div className="col-md-10 col-md-offset-1">
              <div className="intro text-left" style={{ color: '#fff' }}>
                <h1>
                  <Typed
                    className="typedString"
                    strings={['Learn Javascript', 'Network', 'Get A Job']}
                    typeSpeed={70}
                    backSpeed={80}
                    smartBackspace
                    loop
                  />
                </h1>
                <p className="subtitle">With Vets Who Code.</p>
                <div className="btn-cal-group">
                  <Link to="/apply" className="btn btn-charity-default">
                    Apply
                  </Link>
                  &nbsp;
                  <Link to="/donate" className="btn btn-charity-default">
                    Donate
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
