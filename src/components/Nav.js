import React, { Component } from 'react'

import Link from 'gatsby-link'
import logo from '../images/flag.gif'

class Nav extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const $nav = $('#fixedTopNav')

    if ($(window).scrollTop() > 0) {
      $nav.addClass('navbar-solid')
      return
    }

    $nav.removeClass('navbar-solid')
    $('.navbar-nav > li > a').blur()
  }

  render() {
    return (
      <nav
        id="fixedTopNav"
        className="navbar navbar-fixed-top main-navigation"
        itemScope=""
        itemType="https://schema.org/SiteNavigationElement"
        role="navigation"
      >
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#main-nav-collapse"
              aria-expanded="false"
            >
              {' '}
              <span className="sr-only">#VetsWhoCode</span>{' '}
              <span className="ion-drag" />
            </button>
            <div
              className="navbar-brand"
              itemScope=""
              itemType="https://schema.org/Organization"
            >
              {' '}
              <span itemProp="name" className="sr-only">
                #VetsWhoCode
              </span>
              <Link itemProp="url" to="/">
                <img
                  src={logo}
                  alt="#VetsWhoCode Logo"
                  className="logo_holder"
                />
              </Link>
            </div>
          </div>
          <div
            className="navbar-collapse collapse"
            id="main-nav-collapse"
            aria-expanded="false"
            style={{ height: '1px' }}
          >
            <ul className="nav navbar-nav navbar-right" role="menu">
              <li>
                {' '}
                <Link to="/">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/about">
                  <span>About</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/syllabus">
                  <span>Syllabus</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/mentor">
                  <span>Mentor</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/apply">
                  <span>Apply</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/donate">
                  <span>Donate</span>
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/contact">
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                {' '}
                <a href="https://medium.com/vets-who-code" target="_blank">
                  <span>Blog</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav
