import { useReducer, useState, useRef, useEffect } from 'react'
import Link from 'gatsby-link'
import { StaticImage } from 'gatsby-plugin-image'
import { AiFillCaretDown } from 'react-icons/ai'
import Toggle from '../Toggle'
import './nav.css'

const NAV = {
  OPEN_MOBILE_NAVIGATION: 'OPEN_MOBILE_NAVIGATION',
  CLOSE_MOBILE_NAVIGATION: 'CLOSE_MOBILE_NAVIGATION',
  OPEN_MEDIA_DROPDOWN: 'OPEN_MEDIA_DROPDOWN',
  CLOSE_MEDIA_DROPDOWN: 'CLOSE_MEDIA_DROPDOWN',
  RESET_NAVIGATION: 'RESET_NAVIGATION',
}

const initialNavState = { mobileNavOpen: false, mediaDropdownOpen: false }

function navReducer(state, action) {
  switch (action.type) {
    case NAV.OPEN_MOBILE_NAVIGATION:
      return { ...state, mobileNavOpen: true }
    case NAV.CLOSE_MOBILE_NAVIGATION:
      return { ...state, mobileNavOpen: false }
    case NAV.OPEN_MEDIA_DROPDOWN:
      return { ...state, mediaDropdownOpen: true }
    case NAV.CLOSE_MEDIA_DROPDOWN:
      return { ...state, mediaDropdownOpen: false }
    case NAV.RESET_NAVIGATION:
      return initialNavState
    default:
      return state
  }
}

function Nav() {
  const navRef = useRef()
  const [opacity, setOpacity] = useState(0.9)
  const [navState, dispatch] = useReducer(navReducer, initialNavState)
  const isMobileNavOpen = navState.mobileNavOpen
  const isMediaDropdownOpen = navState.mediaDropdownOpen

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
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

  function handleClickOutside(event) {
    if (!navRef?.current?.contains(event.target)) {
      dispatch({ type: NAV.RESET_NAVIGATION })
    }
  }

  function toggleMobileNavigation() {
    if (isMobileNavOpen) {
      dispatch({ type: NAV.CLOSE_MOBILE_NAVIGATION })
    } else {
      dispatch({ type: NAV.OPEN_MOBILE_NAVIGATION })
    }
  }

  function toggleMediaDropdown() {
    if (isMediaDropdownOpen) {
      dispatch({ type: NAV.CLOSE_MEDIA_DROPDOWN })
    } else {
      dispatch({ type: NAV.OPEN_MEDIA_DROPDOWN })
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
      <div className="container-fluid">
        <div className="navbar-header">
          <div
            className="navbar-brand"
            style={{ padding: '5px 15px 5px' }}
            itemScope=""
            itemType="https://schema.org/Organization"
          >
            <span className="sr-only">#VetsWhoCode</span>
            <Link to="/" id="navbar-brand">
              <StaticImage
                src="../../images/hashflag_white.jpg"
                alt="#VetsWhoCode Logo"
                className="logo_holder"
              />
              <div className="homeLink">VetsWhoCode</div>
            </Link>
          </div>
          <button
            type="button"
            id="hamburger-1"
            onClick={toggleMobileNavigation}
            className={`navbar-toggle collapsed hamburger ${isMobileNavOpen ? 'is-active' : ''}`}
            aria-expanded={isMobileNavOpen ? 'true' : 'false'}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="sr-only">#VetsWhoCode</span>
          </button>
        </div>
        <div
          className={`navbar-collapse collapse ${isMobileNavOpen ? 'in' : ''}`}
          id="main-nav-collapse"
          aria-expanded={isMobileNavOpen ? 'true' : 'false'}
        >
          <ul className="nav navbar-nav navbar-right" role="menu" id="navbar-list">
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <span>
                <Toggle size={30} />
              </span>
            </li>
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <Link to="/about">
                <span>About</span>
              </Link>
            </li>
            <li
              className={`dropdown nav ${isMediaDropdownOpen ? 'open' : ''}`}
              role="menuitem"
              onClick={toggleMediaDropdown}
              style={{ marginRight: 10 }}
            >
              <a
                aria-expanded={isMediaDropdownOpen}
                aria-haspopup="true"
                data-toggle="dropdown"
                className="nav"
                href="#"
                role="button"
              >
                Media
                <AiFillCaretDown className="dropdown-caret" />
              </a>
              <ul className="dropdown-menu">
                <li role="menuitem" className="nav media-dropdown-item">
                  <Link
                    onClick={() => {
                      toggleMediaDropdown()
                      toggleMobileNavigation()
                    }}
                    to="/blog"
                  >
                    <span>Blog</span>
                  </Link>
                </li>
                <li role="menuitem" className="nav media-dropdown-item">
                  <Link
                    onClick={() => {
                      toggleMediaDropdown()
                      toggleMobileNavigation()
                    }}
                    to="/podcast"
                  >
                    <span>Podcast</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <Link to="/board">
                <span>Board</span>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <Link to="/testimonials">
                <span>Testimonials</span>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <Link to="/syllabus">
                <span>Syllabus</span>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <Link to="/mentor">
                <span>Mentor</span>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <Link to="/apply">
                <span>Apply</span>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={toggleMobileNavigation}>
              <Link to="/contact">
                <span>Contact</span>
              </Link>
            </li>
            <li role="menuitem" className="donate" onClick={toggleMobileNavigation}>
              <Link to="/donate">
                <span>Donate</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
