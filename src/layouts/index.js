import React from 'react';
import PropTypes from 'prop-types';
import Link, { withPrefix } from 'gatsby-link';
import Helmet from 'react-helmet';

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
      <script src={withPrefix('/vendor/components-modernizr/modernizr.js')} />
      <script src={withPrefix('/vendor/jquery/dist/jquery.js')} />
      <script src={withPrefix('/vendor/bootstrap/dist/js/bootstrap.min.js')} />
      <script
        src={withPrefix('/vendor/owlcarousel/owl-carousel/owl.carousel.min.js')}
      />
      <script src={withPrefix('/vendor/swipebox/js/jquery.swipebox.min.js')} />
      <script
        src={withPrefix('/vendor/rotating-carousel/js/jquery.gallery.js')}
      />
      <script src={withPrefix('/vendor/slick/slick.js')} />
      <script
        src={withPrefix('/vendor/magnificpopup/jquery.magnific-popup.min.js')}
      />
      <script src={withPrefix('/vendor/scrollspeed/jQuery.scrollSpeed.js')} />
      <script src={withPrefix('/vendor/FlexSlider/jquery.flexslider.js')} />
      <script
        src={withPrefix('/vendor/waypoints/lib/jquery.waypoints.min.js')}
      />
      <script
        src={withPrefix('/vendor/waypoints/lib/shortcuts/inview.min.js')}
      />
      <script
        src={withPrefix('/vendor/countdown/dest/jquery.countdown.min.js')}
      />
      <script src={withPrefix('/js/main.js')} />
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQt6WATWNedQ8TSM7sCKOI1uoPR2JrG-4" />
      <script src="https://linked.chat/web/a9LB63" />
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
  children: PropTypes.func
};

export default TemplateWrapper;
