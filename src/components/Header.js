import React, { Component } from 'react';

// import HeaderSlider from './Slider'

import Slider from "react-slick";
import Link from 'gatsby-link'


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'


import codePNG from '../images/code.png'
import speakingPNG from '../images/speaking.png'
import thisIsUsPNG from '../images/this_is_us.png'

class Header extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  play() {
    this.slider.slickPlay();
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    }
    return (
      <header id="site-header" className="site-header flexslider classic">
        <Slider {...settings} ref={slider => this.slider = slider }>
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
      <ul className="flex-direction-nav" onClick={this.previous}>
        <li className="flex-nav-prev">
          <a className="flex-prev" href="#">
            Previous
          </a>
        </li>
        <li className="flex-nav-next" onClick={this.next}>
          <a className="flex-next" href="#">
            Next
          </a>
        </li>
      </ul>
    </header>
    );
  }
}

// const Header = () => {
//   return (


//   )
// }

export default Header