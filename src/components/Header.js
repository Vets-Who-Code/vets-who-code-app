import React from 'react'
import Link from 'gatsby-link'

import codePNG from '../images/code.png'
import speakingPNG from '../images/speaking.png'
import thisIsUsPNG from '../images/this_is_us.png'

const Header = () => {
  return (
    <header id="site-header" className="site-header flexslider classic">
      <ul className="slides">
        <li style={{ backgroundImage: `url(${codePNG})` }}>
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
        </li>
        <li style={{ backgroundImage: `url(${speakingPNG})` }}>
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
        </li>
        <li style={{ backgroundImage: `url(${thisIsUsPNG})` }}>
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
        </li>
      </ul>
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
        <li className="flex-nav-prev">
          <a className="flex-prev" href="#">
            Previous
          </a>
        </li>
        <li className="flex-nav-next">
          <a className="flex-next" href="#">
            Next
          </a>
        </li>
      </ul>
    </header>
  )
}

export default Header
