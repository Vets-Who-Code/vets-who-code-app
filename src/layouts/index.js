import React from 'react';
import PropTypes from 'prop-types';
import Link, { withPrefix } from 'gatsby-link';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';

import Nav from '../components/Nav';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

import '../assets/lib/bootstrap/dist/css/bootstrap.min.css';
import '../assets/lib/owlcarousel/owl-carousel/owl.carousel.css';
import '../assets/lib/owlcarousel/owl-carousel/owl.theme.css';
import '../assets/lib/ionicons/css/ionicons.css';
import '../assets/lib/fontawesome/css/font-awesome.min.css';
import '../assets/extras/swipebox/css/swipebox.min.css';
import '../assets/extras/rotating-carousel/css/style.css';
import '../assets/extras/slick/slick.css';
import '../assets/extras/magnificpopup/magnific-popup.css';
import '../assets/lib/FlexSlider/flexslider.css';
import '../assets/css/main.css';
import '../assets/css/custom.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="#VetsWhoCode 🇺🇸 ">
      <script src={withPrefix('/vendor/jquery/dist/jquery.js')} />
      <script src={withPrefix('/vendor/bootstrap/dist/js/bootstrap.min.js')} />
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQt6WATWNedQ8TSM7sCKOI1uoPR2JrG-4" />
      <script src="https://linked.chat/web/a9LB63" />

      <title>🇺🇸 #VetsWhoCode</title>
      <meta
        name="description"
        content="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching veterans how to program free of charge so that they may find gainful employment after service."
      />

      <meta itemProp="name" content="#VetsWhoCode 🇺🇸 " />
      <meta
        itemProp="description"
        content="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching veterans how to program free of charge so that they may find gainful employment after service."
      />
      <meta itemProp="image" content="https://cdn-images-1.medium.com/max/1000/1*idlh1wOIqUQOj1LkOt51gA.png" />

      <meta property="og:url" content="http://www.vetswhocode.io" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="#VetsWhoCode 🇺🇸 " />
      <meta
        property="og:description"
        content="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching veterans how to program free of charge so that they may find gainful employment after service."
      />
      <meta property="og:image" content="https://cdn-images-1.medium.com/max/1000/1*idlh1wOIqUQOj1LkOt51gA.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="#VetsWhoCode 🇺🇸 " />
      <meta
        name="twitter:description"
        content="#VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching veterans how to program free of charge so that they may find gainful employment after service."
      />
      <meta name="twitter:image" content="https://cdn-images-1.medium.com/max/1000/1*idlh1wOIqUQOj1LkOt51gA.png" />
    </Helmet>

    <main className="main_container">
      <Loader />
      <Nav />
      {children()}
      <Footer />
    </main>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
