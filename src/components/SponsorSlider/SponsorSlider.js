import { useState, useEffect, useContext } from 'react'
import Carousel from 'nuka-carousel'
import { StaticImage } from 'gatsby-plugin-image'
import { ThemeContext } from '../../store/ThemeProvider'
import { FaSlack, FaGoogle, FaGithub } from 'react-icons/fa'
import { SiReplDotIt } from 'react-icons/si'
import { Contentful, Fem, Netlify } from '../../icons'

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
    lightElement: (
      <StaticImage
        src={'../../images/supporters/google.png'}
        alt="Google"
        style={alignmentStyles}
      />
    ),
    darkElement: <FaGoogle size={60} color="#ffffff" />,
  },
  {
    href: 'https://github.com/',
    label: 'Link to Github',
    title: 'GitHub',
    lightElement: (
      <StaticImage
        src={'../../images/supporters/github.png'}
        alt="GitHub"
        style={alignmentStyles}
      />
    ),
    darkElement: <FaGithub size={60} color="#ffffff" />,
  },
  {
    href: 'https://repl.it',
    label: 'Link to Replit ',
    title: 'Repl.it',
    lightElement: (
      <StaticImage
        src={'../../images/supporters/repl.it.png'}
        alt="Repl.it"
        style={alignmentStyles}
      />
    ),
    darkElement: <SiReplDotIt size={60} color="#ffffff" />,
  },
  {
    href: 'https://slack.com/',
    label: 'Link to Slack',
    title: 'Slack',
    lightElement: (
      <StaticImage src={'../../images/supporters/slack.png'} alt="Slack" style={alignmentStyles} />
    ),
    darkElement: <FaSlack size={60} color="#ffffff" />,
  },
  {
    href: 'https://frontendmasters.com/',
    label: 'Link to Front End Masters',
    title: 'Front End Masters',
    lightElement: (
      <StaticImage
        src={'../../images/supporters/fem.png'}
        alt="Front End Masters"
        style={alignmentStyles}
      />
    ),
    darkElement: <Fem size={`60`} color="#ffffff" />,
  },
  {
    href: 'https://www.contentful.com/',
    label: 'Link to Contentful',
    title: 'Contentful',
    lightElement: (
      <StaticImage
        src={'../../images/supporters/contentful.png'}
        alt="Contentful"
        style={alignmentStyles}
      />
    ),
    darkElement: <Contentful size={`60`} color="#091f40" />,
  },
  {
    href: 'https://www.netlify.com/',
    label: 'Link to Netlify',
    title: 'Netlify',
    lightElement: (
      <StaticImage
        src={'../../images/supporters/netlify.png'}
        alt="Netlify"
        style={alignmentStyles}
      />
    ),
    darkElement: <Netlify size={`60`} color="#ffffff" />,
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
    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [])

  const isMobile = Boolean(viewport < 800)

  const lightElements = () => {
    return elements.map(data => {
      return (
        <a
          key={data.title}
          href={data.href}
          aria-label={data.label}
          title={data.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.lightElement}
        </a>
      )
    })
  }

  const darkElements = () => {
    return elements.map(data => {
      return (
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
      )
    })
  }

  return (
    <Carousel
      {...baseSettlings}
      slidesToShow={isMobile ? 4 : 7}
      transitionMode={isMobile ? 'scroll' : 'fade'}
    >
      {colorMode === 'light' ? lightElements() : darkElements()}
    </Carousel>
  )
}

export default SponsorSlider
