import React, { useRef } from 'react'
import Layout from '../components/Layout'
import FluidImage from '../components/FluidImage'
import PageHeader from '../components/PageHeader'
import { FaTwitter, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa'

import vwcGIF from '../images/vwc.gif'
import facebookVideo from '../video/vwc-facebook-reel.mp4'

function About() {
  const videoRef = useRef()

  function play() {
    videoRef.current.play()
    videoRef.current.onended = end
  }

  function end() {
    document.querySelector('.success-video').style.display = 'none'
    document.querySelector('.vwc-animated-gif').style.display = 'block'
  }

  return (
    <Layout>
      <PageHeader title="about" />
      <section id="about" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">About Us</h1>
              <p>
                <i>
                  #VetsWhoCode Is a Non-ForProfit where veterans teach veterans how to program and
                  get jobs.
                </i>
              </p>
            </div>
            <div className="col-md-12" style={{ marginBottom: 20 }}>
              <div className="success-video" style={{ position: 'relative' }}>
                <video
                  onPlay={play}
                  ref={videoRef}
                  type="video/mp4"
                  className="img-responsive"
                  muted
                  controls
                >
                  <source src={facebookVideo} />
                </video>
              </div>
              <div
                className="vwc-animated-gif"
                style={{
                  backgroundImage: `url(${vwcGIF})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  display: 'none',
                }}
              />
            </div>
            <div className="col-md-12">
              <div className="success-story">
                <p className="story">
                  <h2>Who We Are</h2>
                  Launched in 2014, Vets Who Code is a non-profit dedicated to filling the nations
                  technical skills gap with America’s best. We achieve this by using technology to
                  connect and train veterans remotely in web development in order to close the
                  digital talent gap and ease career transition for military veterans and to give
                  military spouses skills to provide stability as they move to support their
                  families. We believe that those who serve in uniform can be the digital economy’s
                  most productive and innovative . Vets Who Code prepares them to enter the civilian
                  work force with tangible skills for new careers.
                </p>
                <p className="story">
                  Vets Who Code is a reintegration solution for veterans that believes in the
                  principle of &quot;To Teach a Man To Fish&quot; to better prepare early stage
                  transitioning veterans for returning to the workforce. Many veterans are not
                  homeless, but are un- and under-employed. Some have a deep desire to be
                  independent business owners. Their skill sets are desperately needed to enhance
                  local economies and to drive innovation. Vets Who Code serves as a launch pad for
                  our veterans and military spouses.
                </p>

                <p className="story">
                  <h2>What We Do</h2>
                  At Vets Who Code, we take a small cohort of veterans and spouses twice a year and
                  over the course of sixteen weeks train them in programming with a deep focus on
                  Javascript, the language of the web. We do this all remotely using the best tools
                  and resources the tech community has to offer. We do this at zero cost to the
                  troop beyond them contributing to one of our teams and helping each other become
                  better programmers.
                </p>

                <p className="story">
                  <h2>How We Do This</h2>
                  How we accomplish this mission is through a process of <i>
                    Crawl, Walk, Run
                  </i>{' '}
                  where as we teach them programming we build upon each lesson in deeper dives so
                  that they become better programmers through each iteration. All this while being
                  lead by instructors who are also veterans, and programmers, and alumni of the
                  program. That way there are no excuses, the person teaching you the craft has been
                  through every success and failure you will experience and has ultimately succeeded
                  on the path of becoming a paid programmer.
                </p>

                <p className="story-last">
                  <h2>WE NEED YOUR HELP</h2>
                  As our country is going through this unprecedented time with COVID-19, people are
                  wanting to learn the skills of today and tomorrow to future-proof themselves so
                  that they can provide for thier families. Furthermore due to the nature of
                  for-profit code schools many are just now learning how to do the work remotely,
                  which we have been doing for years. As a result we are having an unprecendented
                  amount of applicants and are looking to expand our abilities to support more
                  teams. Help us by making a tax-deductible <a href="/donate">donation</a> so that
                  not only can we continue the work we are doing for our troops now, but expand our
                  capabilities to help even more veterans and military spouses on the journey of
                  becoming programmers.
                </p>
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

export default About
