import React from 'react';
import Slider from 'react-slick';

import pluralsightPNG from '../images/supporters/ps.png';
import basecampPNG from '../images/supporters/basecamp-logo.png';
import replItPNG from '../images/supporters/repl.it.png';
import slackPNG from '../images/supporters/slack.png';
import doPNG from '../images/supporters/DO.png';
import icPNG from '../images/supporters/IC.png';
import honeyBadgerPNG from '../images/supporters/honeybadger.png';

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
};

const SponsorSlider = () => (
  <Slider {...settings}>
    <div>
      <a href="#">
        <img src={pluralsightPNG} alt="Pluralsight" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="#">
        <img src={basecampPNG} alt="Basecamp" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="#">
        <img src={replItPNG} alt="repl.it" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="#">
        <img src={slackPNG} alt="Slack" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="#">
        <img src={doPNG} alt="Digital Ocean" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="#">
        <img src={icPNG} alt="Interview Cake" height="60" width="60" />
      </a>
    </div>
    <div>
      <a href="#">
        <img src={honeyBadgerPNG} alt="Honeybadger" height="60" width="60" />
      </a>
    </div>
  </Slider>
);

export default SponsorSlider;
