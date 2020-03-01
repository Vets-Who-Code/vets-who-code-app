import React, { useRef } from 'react'
import Layout from '../components/Layout'
import FluidImage from '../components/FluidImage'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'

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
            <div className="col-md-12">
              <h3 className="story-title">Our Success story</h3>
            </div>
            <div className="col-md-5" style={{ marginBottom: 20 }}>
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
            <div className="col-md-7">
              <div className="success-story">
                <p className="story">
                  Launched in 2014, Vets Who Code is a non-profit dedicated to filling the nations
                  technical skills gap with America’s best. We achieve this by using technology to
                  connect and train veterans remotely in web development in order to close the
                  digital talent gap and ease career transition for military veterans and to give
                  military spouses skills to provide stability as they move to support their
                  families. We believe that those who serve in uniform can be the digital economy’s
                  most productive and innovative . Vets Who Code prepares them to enter the civilian
                  work force with tangible skills for new careers.
                </p>
                <p className="story-last">
                  Vets Who Code is a reintegration solution for veterans that believes in the
                  principle of &quot;To Teach a Man To Fish&quot; to better prepare early stage
                  transitioning veterans for returning to the workforce. Many veterans are not
                  homeless, but are un- and under-employed. Some have a deep desire to be
                  independent business owners. Their skill sets are desperately needed to enhance
                  local economies and to drive innovation. Vets Who Code serves as a launch pad for
                  our veterans and military spouses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="team" className="section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="meet-us-heading">Our Team</h3>
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="team-wiget clearfix">
                    <FluidImage
                      className="img-responsive"
                      fileName="jerome.jpg"
                      alt="Jerome Hardaway Head Geek"
                    />
                    <div className="meet-social">
                      <a href="https://twitter.com/JeromeHardaway" aria-label="Hardaway Twitter">
                        <Icon iconName="twitter" height={20} />
                      </a>
                      <a href="https://github.com/jeromehardaway" aria-label="Hardaway Github">
                        <Icon iconName="github" height={20} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/jeromehardaway/"
                        aria-label="Hardaway Linkedin"
                      >
                        <Icon iconName="linkedin-in" height={20} />
                      </a>
                    </div>
                    <div className="personal-info">
                      <p className="title">Jerome Hardaway</p>
                      <p className="designation">Head Geek</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="team-wiget clearfix">
                    <FluidImage
                      className="img-responsive"
                      fileName="andrew.jpg"
                      alt="Andrew Lebowitz Brand Geek"
                    />
                    <div className="meet-social">
                      <a href="https://twitter.com/witzcreative" aria-label="Lebowitz Twitter">
                        <Icon iconName="twitter" height={20} />
                      </a>
                      <a href="https://www.behance.net/WitzCreative" aria-label="Lebowitz Behance">
                        <Icon iconName="behance" height={20} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/witzcreative"
                        aria-label="Lebowitz Linkedin"
                      >
                        <Icon iconName="linkedin-in" height={20} />
                      </a>
                    </div>
                    <div className="personal-info">
                      <p className="title">Andrew Lebowitz</p>
                      <p className="designation">Brand Geek</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="team-wiget clearfix">
                    <FluidImage
                      className="img-responsive"
                      fileName="noel.jpg"
                      alt="Noel Sagaille Devops Geek"
                    />
                    <div className="meet-social">
                      <a href="https://twitter.com/MrBernnz" aria-label="Sagaille Twitter">
                        <Icon iconName="twitter" height={20} />
                      </a>
                      <a href="https://github.com/mrbernnz" aria-label="Sagaille Github">
                        <Icon iconName="github" height={20} />
                      </a>
                      <a href="https://www.linkedin.com/in/mrbernnz" aria-label="Sagaille Linkedin">
                        <Icon iconName="linkedin-in" height={20} />
                      </a>
                    </div>
                    <div className="personal-info">
                      <p className="title">Noel Sagaille</p>
                      <p className="designation">Devops Geek</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About
