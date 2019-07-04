import React, { useRef, Fragment } from 'react'
import Slider from 'react-slick'
import { Link } from 'gatsby'
import BackgroundSection from '../components/BackgroundSection'

const settings = {
  infinite: true,
  speed: 500,
  fade: true,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <Fragment />, // use Fragment to disable react-slick bd
  prevArrow: <Fragment />,
}

function Header() {
  const sliderRef = useRef()

  return (
    <header id="site-header" className="site-header flexslider classic">
      <div style={{ backgroundColor: 'rgb(9, 31, 64)' }}>
        <Slider {...settings} ref={sliderRef}>
          <BackgroundSection fileName="code.jpg" critical fadeIn>
            <div className="header-classic wrapper-table overlay-01">
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
          </BackgroundSection>
          <BackgroundSection fileName="speaking.jpg">
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
          </BackgroundSection>
          <BackgroundSection fileName="this_is_us.jpg">
            <div className="header-classic wrapper-table overlay-01">
              <div className="valign-center">
                <div className="container">
                  <div className="col-md-10 col-md-offset-1">
                    <div className="intro text-right">
                      <h1 className="red">
                        <span className="red">Help Us</span>
                      </h1>
                      <p className="subtitle red">Teach More Veterans How To Code.</p>
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
          </BackgroundSection>
        </Slider>
        <ol className="flex-control-nav flex-control-paging">
          <li>
            <a className="">1</a>
          </li>
          <li>
            <a className="flex-active">2</a>
          </li>
          <li>
            <a className="">3</a>
          </li>
        </ol>
        <ul className="flex-direction-nav">
          <li className="flex-nav-prev" onClick={() => sliderRef.current.slickNext()}>
            <a className="flex-prev" href="#">
              Previous
            </a>
          </li>
          <li className="flex-nav-next" onClick={() => sliderRef.current.slickPrev()}>
            <a className="flex-next" href="#">
              Next
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
export default Header
