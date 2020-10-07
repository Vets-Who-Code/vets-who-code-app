import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import Helmet from 'react-helmet'
import ThemeProvider from '../store/ThemeProvider'
import Nav from './Nav'
import Footer from './Footer'

import metaImage from '../images/meta-image.jpg'
import 'react-toastify/dist/ReactToastify.css'

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
    <ThemeProvider>
      <main className="main_container">
        <ToastContainer />
        <Nav />
        {children}
        <Footer />
      </main>
    </ThemeProvider>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.any,
}

export default TemplateWrapper
