import React from 'react'
import Slider from 'react-slick'
import FluidImage from './FluidImage'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  className: 'sponsor-slider',
  centerMode: true,
  centerPadding: 30,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

function SponsorSlider() {
  return (
    <Slider {...settings}>
      <div>
        <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
          <FluidImage fileName="google.png" alt="google" style={{ height: 60, width: 60 }} />
        </a>
      </div>
      <div>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <FluidImage fileName="github.png" alt="Github" style={{ height: 60, width: 60 }} />
        </a>
      </div>
      <div>
        <a href="https://repl.it" target="_blank" rel="noopener noreferrer">
          <FluidImage fileName="repl.it.png" alt="Repl.it" style={{ height: 60, width: 60 }} />
        </a>
      </div>
      <div>
        <a href="https://slack.com/" target="_blank" rel="noopener noreferrer">
          <FluidImage fileName="slack.png" alt="Slack" style={{ height: 60, width: 60 }} />
        </a>
      </div>
      <div>
        <a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">
          <FluidImage fileName="DO.png" alt="Digital Ocean" style={{ height: 60, width: 60 }} />
        </a>
      </div>
      <div>
        <a href="https://frontendmasters.com/" target="_blank" rel="noopener noreferrer">
          <FluidImage
            fileName="fem.png"
            alt="Front End Masters"
            style={{ height: 60, width: 60 }}
          />
        </a>
      </div>
      <div>
        <a
          href="https://corporate.comcast.com/company/nbcuniversal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FluidImage fileName="comcast.png" alt="Comcast" style={{ height: 60, width: 60 }} />
        </a>
      </div>
      <div>
        <a href="https://www.contentful.com/" rel="noopener noreferrer" target="_blank">
          <FluidImage
            fileName="contentful.png"
            alt="Powered by Contentful"
            style={{ height: 60, width: 60 }}
          />
        </a>
      </div>
    </Slider>
  )
}

export default SponsorSlider
