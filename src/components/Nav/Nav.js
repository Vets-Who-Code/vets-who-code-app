import React, { useState, useRef, useEffect } from 'react'
import Link from 'gatsby-link'
import FluidImage from '../FluidImage'

import './nav.css'

function Nav() {
  const navRef = useRef()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [opacity, setOpacity] = useState(0.9)

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll === 0) {
      setOpacity(0.9)
    }
    if (winScroll > 0) {
      setOpacity(1)
    }
  }

  return (
    <nav
      ref={navRef}
      id="fixedTopNav"
      className="navbar navbar-fixed-top main-navigation navbar-solid"
      itemScope=""
      itemType="https://schema.org/SiteNavigationElement"
      role="navigation"
      style={{ opacity: opacity }}
    >
      <div className="container">
        <div className="navbar-header">
          <div
            className="navbar-brand"
            style={{ padding: '5px 15px 5px' }}
            itemScope=""
            itemType="https://schema.org/Organization"
          >
            <span className="sr-only">#VetsWhoCode</span>
            <Link to="/">
              <FluidImage
                fileName="hashflag_white.jpg"
                alt="#VetsWhoCode Logo"
                className="logo_holder"
              />
              <div className="homeLink">VetsWhoCode</div>
            </Link>
          </div>
          <button
            type="button"
            id="hamburger-1"
            onClick={() => setIsNavOpen(!isNavOpen)}
            className={`navbar-toggle collapsed hamburger ${isNavOpen ? 'is-active' : ''}`}
            aria-expanded={isNavOpen ? 'true' : 'false'}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="sr-only">#VetsWhoCode</span>
          </button>
        </div>
        <div
          className={`navbar-collapse collapse ${isNavOpen ? 'in' : ''}`}
          id="main-nav-collapse"
          aria-expanded={isNavOpen ? 'true' : 'false'}
        >
          <ul className="nav navbar-nav navbar-right" role="menu">
            <li role="menuitem" className="donate">
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link to="/about">
                <span>About</span>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link to="/testimonials">
                <span>Testimonials</span>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link to="/syllabus">
                <span>Syllabus</span>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link to="/mentor">
                <span>Mentor</span>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link to="/apply">
                <span>Apply</span>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link to="/donate">
                <span>Donate</span>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link to="/contact">
                <span>Contact</span>
              </Link>
            </li>
            <li role="menuitem" className="donate">
              <Link to="/blog">
                <span>Blog</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
