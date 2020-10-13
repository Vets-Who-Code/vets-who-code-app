import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

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
    <header className="overlay grey">
      <BackgroundImage
        Tag="div"
        fluid={data.headerImage.childImageSharp.fluid}
        style={{
          backgroundPositionY: 'bottom',
          height: '25vh',
        }}
      ></BackgroundImage>
    </header>
  )
}

export default PageHeader
