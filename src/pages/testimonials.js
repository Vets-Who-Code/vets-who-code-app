import React, { useRef } from 'react'
import Layout from '../components/Layout'
import FluidImage from '../components/FluidImage'
import PageHeader from '../components/PageHeader'
import { FaTwitter, FaGithub, FaLinkedinIn, FaBehance } from 'react-icons/fa'

function Testimonial() {
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
      <PageHeader title="Testimonials" />
      <section
        className="cause_single section bg-default single pad-regular"
        style={{ paddingTop: '0px' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Testimonials</h1>
              <p>
                <i>
                  While we are proud of all the veterans we have helped at VetsWhoCode, here are
                  just a few of our incredible success stories.
                </i>
              </p>
            </div>
            <div className="col-md-12">
              <div className="cause_section_content">
                <div className="testimonial-row">
                  <FluidImage
                    fileName="schuster.jpg"
                    alt="Schuster Braun"
                    style={{ height: 200, width: 200 }}
                  />
                  <blockquote className="testimonial-text">
                    <p>
                      &quot;#VetsWhoCode on paper is a web development boot camp. In my opinion it
                      is the best transition assistance program out there. I am so grateful for the
                      access to a new life the boot camp gave me.&quot;
                      <br /> - Schuster Braun, US Navy | Front End Engineer, Amazon Web Services
                    </p>
                  </blockquote>
                </div>
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
                      <br /> - John Garcia, US Air Force | Front End Engineer, ForUsAll
                    </p>
                  </blockquote>
                </div>
                <div className="testimonial-row">
                  <FluidImage
                    fileName="carla-kroll.jpg"
                    alt="Carla Kroll"
                    style={{ height: 200, width: 200 }}
                  />
                  <blockquote className="testimonial-text">
                    <p>
                      &quot;The course was great! I laughed, I learned, I got mad, I got
                      excited...then mad again. But in the end, I've developed skills that have
                      helped me become a successful frontend developer in Chicago and have found a
                      group of people in VWC that understand me, and we really work and grow
                      together better than anything I could have imagined.&quot;
                      <br /> - Carla Kroll, US Air Force| Frontend Developer, J. Walter Thompson
                      Worldwide
                    </p>
                  </blockquote>
                </div>
                <div className="testimonial-row">
                  <FluidImage
                    fileName="ozzie.png"
                    alt="Osvaldo Vargas"
                    style={{ height: 200, width: 200 }}
                  />
                  <blockquote className="testimonial-text">
                    <p>
                      &quot;During my transition, I have signed up for and utilized services from
                      over 14 different Non-Profits, Corporate, and State resources. I attended all
                      three US Army military transition tracks (Business, Education, Career), been a
                      part of a variety of technology training programs and transition programs. Of
                      all of these programs, only three have made a significant contribution to my
                      transition, and of these three organizations, only one has truly changed my
                      life for the better. Vets Who Code delivered more value to me than 12 of the
                      non-profits combined.&quot;
                      <br /> -Osvaldo "Ozzie" Vargas, US Army | Fullstack Developer, Application
                      Lead, Novetta
                    </p>
                  </blockquote>
                </div>
                <div className="testimonial-row">
                  <FluidImage
                    fileName="jeff-martin.JPG"
                    alt="Jeff Martin"
                    style={{ height: 200, width: 200 }}
                  />
                  <blockquote className="testimonial-text">
                    <p>
                      &quot;#VetsWhoCode's tenacious focus on language and computer science
                      fundamentals over frameworks was invaluable in my career transition from being
                      a Radiology Technician in the US Army to building cloud scale infrastructure
                      at Microsoft. The coaching from the #VetsWhoCode’s talented and passionate
                      mentor network proved to be a priceless asset even after graduating. Come
                      ready to learn and you will succeed here.&quot;
                      <br /> - Jeff Martin, US Army | DevOps Engineer, Microsoft/Github
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

export default Testimonial
