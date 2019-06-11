import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = ({ fileName, className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(quality: 90, maxWidth: 4100) {
                ...GatsbyImageSharpFluid_withWebp
                originalName
              }
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const image = data.allImageSharp.edges.find(edge => edge.node.fluid.originalName === fileName)
      if (!image) {
        return null
      }
      return (
        <BackgroundImage
          Tag="section"
          className={className}
          fluid={image.node.fluid}
          style={{ height: '80vh' }}
        >
          {children}
        </BackgroundImage>
      )
    }}
  />
)

BackgroundSection.propTypes = {
  fileName: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default BackgroundSection
