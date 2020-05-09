import React from 'react'
import Layout from '../components/Layout'
import FluidImage from '../components/FluidImage'
import PageHeader from '../components/PageHeader'

function Donate() {
  return (
    <Layout>
      <PageHeader title="donate" />
      <section id="cause_singe" className="cause_single section bg-default single pad-regular">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="cause_title">Help Us Continue To Train More Veterans</h4>
              <br />
              <div className="cause_section_content">
                <p>
                  Since 2014 we have been successfully training veterans in web development. From
                  holding speaking engagements with industry leaders, to curriculum and teaching, to
                  setting up tours and meetings with top tech companies, we have been on the front
                  lines getting our troops the training and tools that they need to earn the
                  opportunities that the tech industry offers. TO do that we need support from
                  people like you, who not only support veterans but who understand the value of
                  hard work and pushing yourself to obtain a goal. Please continue your support by
                  giving a small donation so that we can continue to train more veterans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="iframe-container embed-responsive">
                <iframe
                  src="https://donorbox.org/embed/vetswhocode-donation?show_content=true"
                  seamless="seamless"
                  name="donorbox"
                  scrolling="yes"
                  allowpaymentrequest="true"
                  frameBorder={0}
                  tabIndex={0}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="cause_single section bg-default single pad-regular"
        style={{ paddingTop: '0px' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="cause_section_content">
                <div className="testimonial-row">
                  <FluidImage
                    fileName="profile.png"
                    alt="John Garcia"
                    style={{ height: 200, width: 200 }}
                  />
                  <blockquote className="testimonial-text">
                    <p>
                      &quot;VWC helped me gain the technical knowledge I needed in order to get the
                      attention of employers. The guidance, support and experience I had going
                      through the program continues to help me in my role as a full time web
                      developer.&quot;
                      <br /> - John Garcia, USAF | Web Developer, Hearst Media
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="call-to-action-small" className="call-to-action-small">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h3>
                Help Us Teach More Veterans How To Code &nbsp;
                <a className="btn btn-charity-default" href="/donate">
                  DONATE
                </a>
              </h3>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Donate
