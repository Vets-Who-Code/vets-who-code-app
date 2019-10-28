import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const FluidImage = ({ fileName, alt, style, className }) => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(maxWidth: 500) {
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
      return <Img fluid={image.node.fluid} alt={alt} style={style} className={className} />
    }}
  />
)

FluidImage.propTypes = {
  fileName: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default FluidImage
