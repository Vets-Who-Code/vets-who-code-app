import React from 'react';
import Slider from 'react-slick';

import googlePNG from '../images/supporters/google.png';
import githubPNG from '../images/supporters/github.png';
import replItPNG from '../images/supporters/repl.it.png';
import slackPNG from '../images/supporters/slack.png';
import doPNG from '../images/supporters/DO.png';
import femPNG from '../images/supporters/fem.png';
import comcastPNG from '../images/supporters/comcast.png';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  className: 'slider',
  centerMode: true,
  centerPadding: 0,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
};

const SponsorSlider = () => (
  <Slider {...settings}>
    <div>
      <a
        href="https://www.pluralsight.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={googlePNG} alt="google" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
        <img src={githubPNG} alt="GitHub" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="https://repl.it" target="_blank" rel="noopener noreferrer">
        <img src={replItPNG} alt="repl.it" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="https://slack.com/" target="_blank" rel="noopener noreferrer">
        <img src={slackPNG} alt="Slack" height="60" width="60" />
      </a>
    </div>
    <div>
      <a
        href="https://www.digitalocean.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={doPNG} alt="Digital Ocean" height="60" width="60" />
      </a>
    </div>
    <div>
      <a
        href="https://frontendmasters.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={femPNG} alt="Front End Masters" height="60" width="60" />
      </a>
    </div>
    <div>
      <a
        href="https://corporate.comcast.com/company/nbcuniversal/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={comcastPNG} alt="Comcast" height="60" width="80" />
      </a>
    </div>
  </Slider>
);

export default SponsorSlider;
