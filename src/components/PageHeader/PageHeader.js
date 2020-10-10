import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'

function PageHeader() {
  const data = useStaticQuery(graphql`
    query {
      headerImage: file(relativePath: { eq: "this_is_us.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <BackgroundImage
      Tag="section"
      className="inner-header overlay grey text-center slim-bg"
      fluid={data.headerImage.childImageSharp.fluid}
      style={{
        backgroundPositionY: 'bottom',
        height: '25vh',
      }}
    >
      <div className="overlay-01" />
    </BackgroundImage>
  )
}

export default PageHeader
