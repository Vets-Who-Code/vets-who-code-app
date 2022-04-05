import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Carousel from 'nuka-carousel'
import { ThemeContext } from '../../store/ThemeProvider'
import { FaSlack, FaGoogle, FaGithub } from 'react-icons/fa'
import { SiReplit } from 'react-icons/si'
import { Contentful, Fem, Netlify, Vercel } from '../../icons'

const baseSettlings = {
  autoplay: true,
  enableKeyboardControls: true,
  pauseOnHover: true,
  speed: 500,
  wrapAround: true,
  withoutControls: true,
}

const alignmentStyles = {
  position: 'relative',
  overflow: 'hidden',
  height: 60,
  width: 60,
  margin: '0px auto',
}

const elements = [
  {
    href: 'https://www.google.com/',
    label: 'Link to Google',
    title: 'Google',
    // /images is in the public folder
    lightElement: '/images/supporters/google.png',
    darkElement: {
      component: FaGoogle,
      props: {
        size: 60,
        color: '#ffffff',
      },
    },
  },
  {
    href: 'https://github.com/',
    label: 'Link to Github',
    title: 'GitHub',
    // /images is in the public folder
    lightElement: '/images/supporters/github.png',
    darkElement: {
      component: FaGithub,
      props: {
        size: 60,
        color: '#ffffff',
      },
    },
  },
  {
    href: 'https://repl.it',
    label: 'Link to Replit ',
    title: 'Repl.it',
    // /images is in the public folder
    lightElement: '/images/supporters/repl.it.png',
    darkElement: {
      component: SiReplit,
      props: {
        size: 60,
        color: '#ffffff',
      },
    },
  },
  {
    href: 'https://slack.com/',
    label: 'Link to Slack',
    title: 'Slack',
    // /images is in the public folder
    lightElement: '/images/supporters/slack.png',
    darkElement: {
      component: FaSlack,
      props: {
        size: 60,
        color: '#ffffff',
      },
    },
  },
  {
    href: 'https://frontendmasters.com/',
    label: 'Link to Front End Masters',
    title: 'Front End Masters',
    // /images is in the public folder
    lightElement: '/images/supporters/fem.png',
    darkElement: {
      component: Fem,
      props: {
        size: 60,
        color: '#ffffff',
      },
    },
  },
  {
    href: 'https://www.contentful.com/',
    label: 'Link to Contentful',
    title: 'Contentful',
    // /images is in the public folder
    lightElement: '/images/supporters/contentful.png',
    darkElement: {
      component: Contentful,
      props: {
        size: 60,
        color: '#0191f40',
      },
    },
  },
  {
    href: 'https://www.netlify.com/',
    label: 'Link to Netlify',
    title: 'Netlify',
    // /images is in the public folder
    lightElement: '/images/supporters/netlify.png',
    darkElement: {
      component: Netlify,
      props: {
        size: 60,
        color: '#ffffff',
      },
    },
  },
  {
    href: 'https://www.vercel.com/',
    label: 'Link to Vercel',
    title: 'Vercel',
    // /image is in the public folder
    lightElement: '/images/supporters/vercel.png',
    darkElement: {
      component: Vercel,
      props: {
        size: 60,
        color: '#ffffff',
      },
    },
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
        <div key={data.title} style={{ textAlign: 'center' }}>
          <a
            href={data.href}
            aria-label={data.label}
            title={data.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={data.lightElement}
              alt={data.title}
              height={alignmentStyles.height}
              width={alignmentStyles.width}
            />
          </a>
        </div>
      )
    })
  }

  const darkElements = () => {
    return elements.map(data => {
      const Icon = data.darkElement.component
      const IconProps = data.darkElement.props
      return (
        <div key={data.title} style={{ textAlign: 'center' }}>
          <a
            href={data.href}
            aria-label={data.label}
            title={data.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon {...IconProps} />
          </a>
        </div>
      )
    })
  }

  return (
    <Carousel
      {...baseSettlings}
      slidesToShow={isMobile ? 4 : 8}
      transitionMode={isMobile ? 'scroll' : 'fade'}
    >
      {colorMode === 'light' ? lightElements() : darkElements()}
    </Carousel>
  )
}

export default SponsorSlider
