import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export const PureCodeImage = ({ data, width }) => (
  <Img
    style={{
      position: '',
      left: 0,
      top: 0,
      width: width < 700 ? 690 : '100%',
      maxHeight: width < 700 ? '100%' : 457,
    }}
    fluid={data.file.childImageSharp.fluid}
  />
)

export const CodeImage = props => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "code.png" }) {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <PureCodeImage data={data} {...props} />}
  />
)

export default CodeImage

PureCodeImage.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number,
}
