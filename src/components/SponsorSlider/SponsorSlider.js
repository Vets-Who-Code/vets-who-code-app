import React, { useState, useEffect } from 'react'
import FluidImage from '../FluidImage'
import Carousel from 'nuka-carousel'

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
    darkElement: <Contentful size={`60`} color="#ffffff" />,
  },
]
function SponsorSlider() {
  const [viewport, setViewport] = useState(800)
  const [colorMode, setColorMode] = useState(undefined)
  function updateWindowDimensions() {
    setViewport(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions)
    const root = window.document.documentElement
    const initialColorMode = root.getAttribute('color-mode')
    setColorMode(initialColorMode)
    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [colorMode])

  const isMobile = Boolean(viewport < 800)

  const modeChange = () => {
    elements.map(data => {
      console.log(data)
      return (
        <>
          <a
            href={data.href}
            aria-label={data.label}
            title={data.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            {colorMode === 'light' ? (
              <FluidImage fileName={data.lightElement} alt={data.title} style={alignmentStyles} />
            ) : (
              data.darkElement
            )}
          </a>
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
      {modeChange}
    </Carousel>
  )
}

export default SponsorSlider

{
  /*       <a
        href="https://www.google.com/"
        aria-label="Link to Google"
        title="Google"
        target="_blank"
        rel="noopener noreferrer"
      >
        {colorMode === 'light' ? (
          <FluidImage fileName="google.png" alt="google" style={alignmentStyles} />
        ) : (
          <Contentful size="60" color="#000" />
        )}
      </a>
      <a
        href="https://github.com/"
        aria-label="Link to Github"
        title="GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FluidImage fileName="github.png" alt="Github" style={alignmentStyles} />
      </a>
      <a
        href="https://repl.it"
        aria-label="Link to Replit "
        title="Repl.it"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FluidImage fileName="repl.it.png" alt="Repl.it" style={alignmentStyles} />
      </a>
      <a
        href="https://slack.com/"
        aria-label="Link to Slack"
        title="Slack"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FluidImage fileName="slack.png" alt="Slack" style={alignmentStyles} />
      </a>
      <a
        href="https://frontendmasters.com/"
        aria-label="Link to Front End Masters"
        title="Front End Masters"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FluidImage fileName="fem.png" alt="Front End Masters" style={alignmentStyles} />
      </a>
      <a
        href="https://www.contentful.com/"
        aria-label="Link to Contentful"
        title="Contentful"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FluidImage fileName="contentful.png" alt="Powered by Contentful" style={alignmentStyles} />
      </a> */
}
