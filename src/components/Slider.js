import React, { Component } from "react";
import Slider from "react-slick";
import Link from 'gatsby-link'


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'


import codePNG from '../images/code.png'
import speakingPNG from '../images/speaking.png'
import thisIsUsPNG from '../images/this_is_us.png'

class HeaderSlider extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  play() {
    this.slider.slickPlay();
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };
    return (
      <Slider {...settings}>
        <div>
          <div style={{ backgroundImage: `url(${codePNG})`, backgroundSize: 'cover'}}>
            <div className="header-classic  wrapper-table overlay-01">
              <div className="valign-center">
                <div className="container">
                  <div className="col-md-10 col-md-offset-1">
                    <div className="intro text-left">
                      <h1>Learn</h1>
                      <p className="subtitle">How To Code With Other Veterans.</p>
                      <div className="btn-cal-group">
                        {' '}
                        <Link to="/apply" className="btn btn-charity-default">
                          Apply
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ backgroundImage: `url(${speakingPNG})`, backgroundSize: 'cover'}}>
            <div className="header-classic  wrapper-table overlay-01">
              <div className="valign-center">
                <div className="container">
                  <div className="col-md-10 col-md-offset-1">
                    <div className="intro text-left">
                      <h1>Sign Up</h1>
                      <p className="subtitle">As A Mentor.</p>
                      <div className="btn-cal-group">
                        {' '}
                        <Link to="/mentor" className="btn btn-charity-default">
                          {' '}
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ backgroundImage: `url(${thisIsUsPNG})`, backgroundSize: 'cover'}}>
            <div className="header-classic wrapper-table overlay-01">
              <div className="valign-center">
                <div className="container">
                  <div className="col-md-10 col-md-offset-1">
                    <div className="intro text-right">
                      <h1 className="red">
                        <span className="red">Help Us</span>
                      </h1>
                      <p className="subtitle red">
                        Teach More Veterans How To Code.
                      </p>
                      <div className="btn-cal-group">
                        {' '}
                        <Link to="/donate" className="btn btn-charity-default">
                          Please Donate
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    );
  }
}

export default HeaderSlider