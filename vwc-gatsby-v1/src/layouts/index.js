/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Link, { withPrefix } from 'gatsby-link';
import Helmet from 'react-helmet';

import Nav from '../components/Nav';
import Loader from '../components/Loader';
import Header from '../components/Header';
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
    <Helmet
      title="#VetsWhoCode 🇺🇸 "
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <script async src="./static/vendor/components-modernizr/modernizr.js" />
      <script async src="./static/vendor/jquery/dist/jquery.js" />
      <script async src="./static/vendor/bootstrap/dist/js/bootstrap.min.js" />
      <script
        async
        src="./static/vendor/owlcarousel/owl-carousel/owl.carousel.min.js"
      />
      <script async src="./static/vendor/swipebox/js/jquery.swipebox.min.js" />
      <script
        async
        src="./static/vendor/rotating-carousel/js/jquery.gallery.js"
      />
      <script async src="./static/vendor/slick/slick.js" />
      <script
        async
        src="./static/vendor/magnificpopup/jquery.magnific-popup.min.js"
      />
      <script async src="./static/vendor/scrollspeed/jQuery.scrollSpeed.js" />
      <script async src="./static/vendor/FlexSlider/jquery.flexslider.js" />
      <script
        async
        src="./static/vendor/waypoints/lib/jquery.waypoints.min.js"
      />
      <script
        async
        src="./static/vendor/waypoints/lib/shortcuts/inview.min.js"
      />
      <script
        async
        src="./static/vendor/countdown/dest/jquery.countdown.min.js"
      />
      <script async src="./static/js/main.js" />
      <script async src="https://linked.chat/web/a9LB63" />
    </Helmet>

    <main className="main_container">
      <Loader />
      <Nav />
      <Header />
      {children()}
      <Footer />
    </main>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
