import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Img from 'gatsby-image'

export const TroopsAtGoogleImage = ({ data }) => <Img fluid={data.file.childImageSharp.fluid} />

export const TroopsAtGoogle = props => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "troops-at-google.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <TroopsAtGoogleImage data={data} {...props} />}
  />
)

export default TroopsAtGoogle

TroopsAtGoogleImage.propTypes = {
  data: PropTypes.object,
}
