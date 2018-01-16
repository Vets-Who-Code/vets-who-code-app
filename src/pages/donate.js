import React from 'react'
import Link from 'gatsby-link'

import code from '../images/code.png'
import john from '../images/profile.png'
import thisIsUs from '../images/this_is_us.png'

const Donate = () => {
  return (
    <div>
      <header
        className="inner-header overlay grey text-center slim-bg "
        style={{
          backgroundImage: `url(${thisIsUs})`,
          backgroundPositionY: 'bottom',
        }}
      >
        <div className="overlay-01" />
        <div className="container">
          <h2 className="text-center text-uppercase">Donate</h2>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/donate" className="page-active">
              Donate
            </Link>
          </div>
        </div>
      </header>
      <section
        id="cause_singe"
        className="cause_single section bg-default single pad-regular"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="cause_image_holder">
                <img src={code} className="img-responsive" alt="cause" />
              </div>
              <h4 className="cause_title">
                Help Us Continue To Train More Veterans
              </h4>
              <br />
              <div className="cause_section_content">
                <p>
                  Since 2014 we have been successfully training veterans in web
                  development. From holding speaking engagements with industry
                  leaders, to curriculum and teaching, to setting up tours and
                  meetings with top tech companies, we have been on the front
                  lines getting our troops the training and tools that they need
                  to earn the opportunities that the tech industry offers. TO do
                  that we need support from people like you, who not only
                  support veterans but who understand the value of hard work and
                  pushing yourself to obtain a goal. Please continue your
                  support by giving a small donation so that we can continue to
                  train more veterans.
                </p>
                <blockquote>
                  <p>
                    <img src={john} alt="John Garcia" />
                    <br />"VWC helped me gain the technical knowledge I needed
                    in order to get the attention of employers. The guidance,
                    support and experience I had going through the program
                    continues to help me in my role as a full time web
                    developer."
                    <br /> - John Garcia, USAF | Web Developer, Hearst Media
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate
