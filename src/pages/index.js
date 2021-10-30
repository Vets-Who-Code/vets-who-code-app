import { useEffect } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import SponsorSlider from '../components/SponsorSlider'
import Countdown from '../components/Countdown'
import Header from '../components/Header'
import { SubscribeForm } from '../components/Forms'
import SEO from '../components/SEO'

function IndexPage() {
  useEffect(() => {
    let current = true
    if (current) {
      onClientEntry()
    }
    return () => (current = false)
  }, [])

  const onClientEntry = () => {
    // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
    if (window !== undefined) {
      if (window.IntersectionObserver === undefined) {
        require('intersection-observer')
      }
    }
  }

  return (
    <>
      <SEO />
      <Header />
      <section id="call-to-action" className="section bg-default call-to-action index">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-4">
              <Link to="/donate">
                <div
                  className="fluid-grid first-grid text-center"
                  style={{ backgroundColor: '#031228' }}
                >
                  <span>Help Us Teach More Veterans</span>
                  <h2>Donate</h2>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/apply">
                <div
                  className="fluid-grid second-grid text-center"
                  style={{ backgroundColor: '#0f356d' }}
                >
                  <span>Learn Programming</span>
                  <h2>APPLY</h2>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/mentor">
                <div
                  className="fluid-grid third-grid text-center"
                  style={{ backgroundColor: '#123f83' }}
                >
                  <span>Become A Mentor</span>
                  <h2>Get Involved</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id="our_stories"
        className="section pad-regular bg-default our_stories small-top-pad"
      >
        <div className="container">
          <div className="row bg-dark">
            <div className="col-md-5 col-sm-12 no_left_pad no_right_pad img-responsive">
              <StaticImage
                layout="fullWidth"
                src="../images/jerome-jsconf.jpg"
                alt="Jerome at JSConf"
              />
            </div>
            <div className="col-md-7 col-sm-12 our_story_content text-center">
              <div className="featured-heading">
                <h2>#VetsWhoCode</h2>
              </div>
              <p>
                VetsWhoCode is an inclusive, open-source, veteran-led and operated 501(c)(3)
                charitable public non-profit organization. We focus on training veterans, active
                duty military, and military spouses in practical programming paradigms by using
                mentoring and open source development with the goal of starting careers in the
                technology industry.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="our_missions" className="section pad-regular bg-light our_missions">
        <div className="container">
          <div className="row">
            <div className="featured-heading text-center">
              <h2 className="dark_color">
                RETOOL
                <i className="fa fa-code" aria-hidden="true" /> RETRAIN
                <i className="fa fa-code" aria-hidden="true" /> RELAUNCH
              </h2>
            </div>
            <div className="col-sm-12 our_mission_content text-center">
              <blockquote>
                <p>
                  Through training, mentorship, working with our open-source projects, and
                  opportunities to interact with industry experts, our goal is to ensure that our
                  troops gain the best knowledge possible while learning software skills that help
                  them become gainfully employed in the technology sector.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      <section id="event_card" className="section bg-dark pad-regular event_card">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 event_content">
              <h3 className="next-cohort">Surprising Update</h3>
              <div className="event_excerpt">
                <p>Launching something new Veteran&apos;s Day. Be sure to apply!</p>
              </div>
            </div>
            <div className="col-sm-6 event_counter_container text-center">
              <Countdown nextClass="Novemeber 11, 2021" />
              <Link className="btn btn-charity-default" to="/apply">
                Apply
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="newsletter_card" className="section bg-light pad-regular newsletter_card">
        <div className="container">
          <div className="row">
            <div className="col-md-12 newsletter_wrapper">
              <div className="newsletter_inner_wrapper">
                <div className="row">
                  <div className="col-md-4">
                    <h3 className="text-center" style={{ color: '#ECECEC' }}>
                      JOIN OUR EMAIL LIST
                    </h3>
                  </div>
                  <div className="col-sm-8">
                    <SubscribeForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="causes" className="section bg-default causes-card" style={{ padding: '75px 0' }}>
        <div className="container">
          <div className="normal_heading text-center">
            <h2>Technology Partners</h2>
          </div>
          <div className="row">
            <div className="col-sm-12 cause_content text-center" style={{ marginBottom: 40 }}>
              {/* eslint-disable-next-line max-len */}
              <h3 id="cause-title">Thank You For Supporting #VetsWhoCode!</h3>
              <hr />
              <h3 className="subtitle">
                We Are Grateful To Have These Companies That Support Us On Our Journey To Train
                Veterans In The Tech Industry.
              </h3>
            </div>
          </div>
          <div style={{ minHeight: 100, height: 100 }}>
            <SponsorSlider />
          </div>
        </div>
      </section>
    </>
  )
}

export default IndexPage
