import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import Helmet from 'react-helmet'

import Nav from './Nav'
import Footer from './Footer'

import 'react-toastify/dist/ReactToastify.css'
import '../assets/lib/bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/main.css'
import '../assets/css/custom.css'

import metaImage from '../images/meta-image.jpg'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>#VetsWhoCode</title>
      <meta
        name="description"
        content="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching
    veterans how to program free of charge so that they may find gainful employment after service."
      />

      <meta itemProp="name" content="#VetsWhoCode 🇺🇸 " />
      <meta
        itemProp="description"
        content="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on
    teaching veterans how to program free of charge so that they may find gainful employment after service."
      />
      <meta itemProp="image" content={metaImage} />

      <meta property="og:url" content="http://www.vetswhocode.io" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="#VetsWhoCode 🇺🇸 " />
      <meta
        property="og:description"
        content="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on
    teaching veterans how to program free of charge so that they may find gainful employment after service."
      />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="#VetsWhoCode 🇺🇸 " />
      <meta
        name="twitter:description"
        content="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on
    teaching veterans how to program free of charge so that they may find gainful employment after service."
      />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>

    <main className="main_container">
      <ToastContainer />
      <Nav />
      {children}
      <Footer />
    </main>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.any,
}

export default TemplateWrapper
