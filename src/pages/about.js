import React, { useRef, useEffect } from 'react'

import PageHeader from '../components/PageHeader'
import '../assets/css/custom.css'
import vwcGIF from '../images/vwc.gif'
import facebookVideo from '../video/vwc-facebook-reel.mp4'

function About() {
  const videoRef = useRef()

  function play() {
    videoRef.current.play()
    videoRef.current.onended = end
  }

  useEffect(() => {
    let current = true

    if (current) {
      play()
    }

    return () => (current = false)
  })

  function end() {
    document.querySelector('.success-video').style.display = 'none'
    document.querySelector('.vwc-animated-gif').style.display = 'block'
  }

  return (
    <>
      <PageHeader title="about" />
      <section id="about" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">About Us</h1>
              <p>
                <i>
                  #VetsWhoCode is a Non-For Profit where veterans teach veterans how to program and
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
                  backgroundSize: 'auto',
                  display: 'none',
                }}
              />
            </div>
            <div className="col-md-12">
              <div className="success-story">
                <h2>Who We Are</h2>
                <p className="story">
                  Launched in 2014, Vets Who Code is a non-profit dedicated to filling the nations
                  technical skills gap with America’s best. In order to close the digital talent
                  gap, ease career transition for military veterans, and give military spouses
                  skills to provide stability, we connect and train veterans remotely in web
                  development as they move to support their families. We believe that those who
                  serve in uniform can be the digital economy’s most productive and innovative. Vets
                  Who Code prepares veterans to enter the civilian work force with tangible skills
                  for new careers.
                </p>
                <p className="story">
                  Vets Who Code is a reintegration solution for veterans who believe in the
                  principle of &quot;To Teach a Man To Fish&quot; to better prepare early-stage
                  transitioning veterans who are returning to the workforce. Many veterans are un-
                  and under-employed. Some have a deep desire to be independent business owners.
                  Their skill sets are desperately needed to enhance local economies and drive
                  innovation. Vets Who Code serves as a launch pad for our veterans and military
                  spouses.
                </p>

                <h2>What We Do</h2>
                <p className="story">
                  At Vets Who Code, we take a small cohort of veterans and spouses twice a year and
                  train them in programming with a deep focus on JavaScript, the language of the
                  web, over the course of sixteen weeks. We do this all remotely using the best
                  tools and resources the tech community has to offer. In addition to contributing
                  and helping each other become better programmers, we do this at zero cost.
                </p>

                <h2>How We Do This</h2>
                <p className="story">
                  How we accomplish this mission is through a process of <i>Crawl, Walk, Run </i>
                  where we build upon each lesson in deeper dives so that veterans become better
                  programmers through each iteration. Instructors leading the program are also
                  veterans, programmers, and alumni of the program. There are no excuses, the
                  instructor has been through every success and failure you will experience and has
                  ultimately succeeded on the path of becoming a paid programmer.
                </p>

                <h2>WE NEED YOUR HELP</h2>
                <p className="story-last">
                  As our country is going through this unprecedented time with COVID-19, people are
                  wanting to learn the skills of today and tomorrow to future-proof themselves, in
                  order to provide for their families. Due to the nature of for-profit coding
                  schools, many are now learning to work remotely, which we have been doing for
                  years. As a result, we are having an unprecedented amount of applicants and are
                  looking to expand our abilities to support more teams. Help us by making a
                  tax-deductible{' '}
                  <a className="donate-span" href="/donate">
                    donation
                  </a>{' '}
                  so that not only can we continue the work we are doing for our troops now, but
                  expand our capabilities to help even more veterans and military spouses on the
                  journey of becoming programmers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
