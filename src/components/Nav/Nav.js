import { useReducer, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiFillCaretDown } from 'react-icons/ai'
import Toggle from '../Toggle'

import hashFlag from '../../images/hashflag_white.jpg'
import { useRouter } from 'next/router'

const NAV = {
  TOGGLE_MOBILE_NAVIGATION: 'TOGGLE_MOBILE_NAVIGATION',
  TOGGLE_MEDIA_DROPDOWN: 'TOGGLE_MEDIA_DROPDOWN',
  TOGGLE_OUR_STORY_DROPDOWN: 'TOGGLE_OUR_STORY_DROPDOWN',
  TOGGLE_APPLY_DROPDOWN: 'TOGGLE_APPLY_DROPDOWN',
  RESET_NAVIGATION: 'RESET_NAVIGATION',
}

const initialNavState = {
  mobileNavOpen: false,
  mediaDropdownOpen: false,
  ourStoryDropdownOpen: false,
  applyDropdownOpen: false,
}

function navReducer(state, action) {
  switch (action.type) {
    case NAV.TOGGLE_MOBILE_NAVIGATION:
      return { ...state, mobileNavOpen: !state.mobileNavOpen }
    case NAV.TOGGLE_MEDIA_DROPDOWN:
      return {
        ...state,
        mediaDropdownOpen: !state.mediaDropdownOpen,
        ourStoryDropdownOpen: initialNavState.ourStoryDropdownOpen,
        applyDropdownOpen: initialNavState.applyDropdownOpen,
      }
    case NAV.TOGGLE_OUR_STORY_DROPDOWN:
      return {
        ...state,
        ourStoryDropdownOpen: !state.ourStoryDropdownOpen,
        mediaDropdownOpen: initialNavState.mediaDropdownOpen,
        applyDropdownOpen: initialNavState.applyDropdownOpen,
      }
    case NAV.TOGGLE_APPLY_DROPDOWN:
      return {
        ...state,
        applyDropdownOpen: !state.applyDropdownOpen,
        mediaDropdownOpen: initialNavState.mediaDropdownOpen,
        ourStoryDropdownOpen: initialNavState.ourStoryDropdownOpen,
      }
    case NAV.RESET_NAVIGATION:
      return initialNavState
    default:
      return state
  }
}

function Nav({ setApplyTabIndex, applyTabIndex }) {
  const navRef = useRef()
  const [opacity, setOpacity] = useState(0.9)
  const [mainContentLink, setMainContentLink] = useState('/#our_stories')
  const [navState, dispatch] = useReducer(navReducer, initialNavState)
  const router = useRouter()
  const isMobileNavOpen = navState.mobileNavOpen
  const isMediaDropdownOpen = navState.mediaDropdownOpen
  const isOurStoryDropDownOpen = navState.ourStoryDropdownOpen
  const isApplyDropdownOpen = navState.applyDropdownOpen

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  useEffect(() => {
    if (router.pathname === '/') {
      setMainContentLink('/#our_stories')
    } else if (router.pathname === '/board') {
      setMainContentLink('/board#board-cards')
    } else if (router.pathname === '/syllabus') {
      setMainContentLink('/syllabus#contact')
    } else if (router.pathname === '/jobs') {
      setMainContentLink('/jobs#contact')
    } else if (router.pathname === '/contact') {
      setMainContentLink('/contact#contact')
    } else if (router.pathname === '/code-of-conduct') {
      setMainContentLink('/code-of-conduct#about')
    } else if (router.pathname === '/donate') {
      setMainContentLink('/donate#cause_single')
    }
  }, [router.pathname])

  useEffect(() => {
    if (applyTabIndex) {
      console.log(`i'm in!`)
      const elementId = mainContentLink.substring(
        mainContentLink.length,
        mainContentLink.indexOf('#') + 1
      )
      console.log(elementId)
      const element = document.getElementById(`our_stories`)
      element.focus()
      setApplyTabIndex(false)
    }
  }, [applyTabIndex])

  function handleSkipNav() {
    setApplyTabIndex(true)
  }

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
      resetNavigation()
    }
  }

  function resetNavigation() {
    dispatch({ type: NAV.RESET_NAVIGATION })
  }

  function toggleMenuItem(type) {
    dispatch({ type })
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
            <Link href="/">
              <a id="navbar-brand">
                <Image
                  src={hashFlag}
                  alt="#VetsWhoCode Logo"
                  className="logo_holder"
                  height={40}
                  width={40}
                />
                <div className="homeLink">VetsWhoCode</div>
              </a>
            </Link>
            <button id="skip-to-main-link" className="a" onClick={handleSkipNav}>
              Skip to main
            </button>
          </div>
          <button
            type="button"
            id="hamburger-1"
            onClick={() => toggleMenuItem(NAV.TOGGLE_MOBILE_NAVIGATION)}
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
            <li
              role="menuitem"
              className="nav"
              onClick={() => toggleMenuItem(NAV.TOGGLE_MOBILE_NAVIGATION)}
            >
              <span>
                <Toggle size={30} />
              </span>
            </li>
            <li role="menuitem" className="nav" onClick={resetNavigation}>
              <Link href="/">
                <a>
                  <span>Home</span>
                </a>
              </Link>
            </li>
            <li
              className={`dropdown nav ${isOurStoryDropDownOpen ? 'open' : ''}`}
              role="menuitem"
              style={{ marginRight: 10 }}
            >
              <a
                aria-expanded={isOurStoryDropDownOpen}
                aria-haspopup="true"
                data-toggle="dropdown"
                className="nav"
                href="#"
                role="button"
                onClick={() => toggleMenuItem(NAV.TOGGLE_OUR_STORY_DROPDOWN)}
              >
                Our Story
                <AiFillCaretDown className="dropdown-caret" />
              </a>
              <ul className="dropdown-menu">
                <li role="menuitem" className="nav media-dropdown-item" onClick={resetNavigation}>
                  <Link href="/about" passHref>
                    <a>
                      <span>About</span>
                    </a>
                  </Link>
                </li>
                <li role="menuitem" className="nav media-dropdown-item" onClick={resetNavigation}>
                  <Link href="/board">
                    <a>
                      <span>Board</span>
                    </a>
                  </Link>
                </li>
                <li role="menuitem" className="nav" onClick={resetNavigation}>
                  <Link href="/testimonials">
                    <a>
                      <span>Testimonials</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`dropdown nav ${isMediaDropdownOpen ? 'open' : ''}`}
              role="menuitem"
              style={{ marginRight: 10 }}
            >
              <a
                aria-expanded={isMediaDropdownOpen}
                aria-haspopup="true"
                data-toggle="dropdown"
                className="nav"
                href="#"
                role="button"
                onClick={() => toggleMenuItem(NAV.TOGGLE_MEDIA_DROPDOWN)}
              >
                Media
                <AiFillCaretDown className="dropdown-caret" />
              </a>
              <ul className="dropdown-menu">
                <li role="menuitem" className="nav media-dropdown-item" onClick={resetNavigation}>
                  <Link href="/blog">
                    <a>
                      <span>Blog</span>
                    </a>
                  </Link>
                </li>
                <li role="menuitem" className="nav media-dropdown-item" onClick={resetNavigation}>
                  <Link href="/podcast">
                    <a>
                      <span>Podcast</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`dropdown nav ${isApplyDropdownOpen ? 'open' : ''}`}
              role="menuitem"
              style={{ marginRight: 10 }}
            >
              <a
                aria-expanded={isApplyDropdownOpen}
                aria-haspopup="true"
                data-toggle="dropdown"
                className="nav"
                href="#"
                role="button"
                onClick={() => toggleMenuItem(NAV.TOGGLE_APPLY_DROPDOWN)}
              >
                Apply
                <AiFillCaretDown className="dropdown-caret" />
              </a>
              <ul className="dropdown-menu">
                <li role="menuitem" className="nav" onClick={resetNavigation}>
                  <Link href="/apply">
                    <a>
                      <span>Veteran</span>
                    </a>
                  </Link>
                </li>
                <li role="menuitem" className="nav" onClick={resetNavigation}>
                  <Link href="/mentor">
                    <a>
                      <span>Mentor</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li role="menuitem" className="nav" onClick={resetNavigation}>
              <Link href="/syllabus">
                <a>
                  <span>Syllabus</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={resetNavigation}>
              <Link href="/jobs">
                <a>
                  <span>Job Search</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={resetNavigation}>
              <Link href="/contact">
                <a>
                  <span>Contact</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="nav" onClick={resetNavigation}>
              <Link href="/code-of-conduct">
                <a>
                  <span>Code Of Conduct</span>
                </a>
              </Link>
            </li>
            <li role="menuitem" className="donate" onClick={resetNavigation}>
              <Link href="/donate">
                <a>Donate</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
