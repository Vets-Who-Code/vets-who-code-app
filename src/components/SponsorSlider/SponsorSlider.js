import React, { useState, useEffect, useContext } from 'react'
import FluidImage from '../FluidImage'
import Carousel from 'nuka-carousel'
import { ThemeContext } from '../../store/ThemeProvider'
import { FaSlack, FaGoogle, FaGithub } from 'react-icons/fa'
import { SiReplDotIt } from 'react-icons/si'
import { Contentful, Fem } from '../../icons'

const baseSettlings = {
  autoplay: true,
  enableKeyboardControls: true,
  pauseOnHover: true,
  speed: 500,
  wrapAround: true,
  withoutControls: true,
}

const alignmentStyles = {
  height: 60,
  width: 60,
  margin: '0 auto',
}

const elements = [
  {
    href: 'https://www.google.com/',
    label: 'Link to Google',
    title: 'Google',
    lightElement: 'google.png',
    darkElement: <FaGoogle size={60} color="#ffffff" />,
  },
  {
    href: 'https://github.com/',
    label: 'Link to Github',
    title: 'GitHub',
    lightElement: 'github.png',
    darkElement: <FaGithub size={60} color="#ffffff" />,
  },
  {
    href: 'https://repl.it',
    label: 'Link to Replit ',
    title: 'Repl.it',
    lightElement: 'repl.it.png',
    darkElement: <SiReplDotIt size={60} color="#ffffff" />,
  },
  {
    href: 'https://slack.com/',
    label: 'Link to Slack',
    title: 'Slack',
    lightElement: 'slack.png',
    darkElement: <FaSlack size={60} color="#ffffff" />,
  },
  {
    href: 'https://frontendmasters.com/',
    label: 'Link to Front End Masters',
    title: 'Front End Masters',
    lightElement: 'fem.png',
    darkElement: <Fem size={`60`} color="#ffffff" />,
  },
  {
    href: 'https://www.contentful.com/',
    label: 'Link to Contentful',
    title: 'Contentful',
    lightElement: 'contentful.png',
    darkElement: <Contentful size={`60`} color="#091f40" />,
  },
]

function SponsorSlider() {
  const { colorMode } = useContext(ThemeContext)

  const [viewport, setViewport] = useState(800)

  function updateWindowDimensions() {
    setViewport(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions)
    //const root = window.document.documentElement
    //const initialColorMode = root.getAttribute('color-mode')
    //setColorMode(initialColorMode)
    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [])

  const isMobile = Boolean(viewport < 800)

  const lightElements = () => {
    return elements.map(data => {
      return (
        <>
          <a
            key={data.title}
            href={data.href}
            aria-label={data.label}
            title={data.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FluidImage fileName={data.lightElement} alt={data.title} style={alignmentStyles} />
          </a>
        </>
      )
    })
  }

  const darkElements = () => {
    return elements.map(data => {
      return (
        <>
          <div key={data.title} style={{ textAlign: 'center' }}>
            <a
              href={data.href}
              aria-label={data.label}
              title={data.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.darkElement}
            </a>
          </div>
        </>
      )
    })
  }

  return (
    <Carousel
      {...baseSettlings}
      slidesToShow={isMobile ? 4 : 6}
      transitionMode={isMobile ? 'scroll' : 'fade'}
    >
      {colorMode === 'light' ? lightElements() : darkElements()}
    </Carousel>
  )
}

export default SponsorSlider
