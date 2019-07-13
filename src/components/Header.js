import React from 'react'
import { Link } from 'gatsby'
import Carousel from 'nuka-carousel'
import BackgroundSection from '../components/BackgroundSection'

const settings = {
  autoplay: true,
  enableKeyboardControls: true,
  pauseOnHover: true,
  speed: 500,
  transitionMode: 'fade',
}

function Header() {
  return (
    <BackgroundSection
      id="site-header"
      className="site-header flexslider classic"
      style={{ minHeight: '80vh', backgroundColor: '#0f356d' }}
      fileName="code.jpg"
      critical
    >
      <Carousel
        {...settings}
        wrapAround
        renderCenterLeftControls={({ previousSlide }) => (
          <a
            className="flex-nav-next"
            tabIndex="0"
            onClick={previousSlide}
            onKeyDown={previousSlide}
          >
            <svg
              width="48"
              height="48"
              fill="#fff"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1216 448v896q0 26-19 45t-45 19-45-19l-448-448q-19-19-19-45t19-45l448-448q19-19 45-19t45 19 19 45z" />
            </svg>
          </a>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <a
            className="arrow arrow-next"
            tabIndex="0"
            onClick={nextSlide}
            onKeyDown={nextSlide}
            href="#"
          >
            <svg
              width="48"
              height="48"
              fill="#fff"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1152 896q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45v-896q0-26 19-45t45-19 45 19l448 448q19 19 19 45z" />
            </svg>
          </a>
        )}
        renderBottomCenterControls={null}
      >
        <BackgroundSection fileName="code.jpg">
          <div className="header-classic wrapper-table overlay-01">
            <div className="valign-center">
              <div className="container">
                <div className="col-md-10 col-md-offset-1">
                  <div className="intro text-left">
                    <h1>Learn</h1>
                    <p className="subtitle">How To Code With Other Veterans.</p>
                    <div className="btn-cal-group">
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
                      <Link to="/mentor" className="btn btn-charity-default">
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
      </Carousel>
    </BackgroundSection>
  )
}
export default Header
