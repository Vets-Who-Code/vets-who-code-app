import React from 'react'

import vwcGIF from '../images/vwc.gif'
import jerome from '../images/team/jerome.png'
import noel from '../images/team/noel.png'
import andrew from '../images/team/andrew.png'

const About = () => (
  <div>
    <section id="about" className="small-top-pad section bg-default">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="story-title">Our Success story</h3>
          </div>
          <div className="col-md-5">
            <div
              className="success-story-video"
              style={{ backgroundImage: `url(${vwcGIF})` }}
            >
              <a className="popup-vimeo" href="//vimeo.com/45830194">
                <i className="fa fa-play-circle-o" />
              </a>{' '}
            </div>
          </div>
          <div className="col-md-7">
            <div className="success-story">
              <p className="story">
                Launched in 2014, Vets Who Code is a non-profit dedicated to
                filling the nations technical skills gap with America’s best. We
                achieve this by using technology to connect and train veterans
                remotely in web development in order to close the digital talent
                gap and ease career transition for military veterans and to give
                military spouses skills to provide stability as they move to
                support their families. We believe that those who serve in
                uniform can be the digital economy’s most productive and
                innovative . Vets Who Code prepares them to enter the civilian
                work force with tangible skills for new careers.
              </p>
              <p className="story-last">
                Vets Who Code is a reintegration solution for veterans that
                believes in the principle of "To Teach a Man To Fish" to better
                prepare early stage transitioning veterans for returning to the
                workforce. Many veterans are not homeless, but are un- and
                under-employed. Some have a deep desire to be independent
                business owners. Their skill sets are desperately needed to
                enhance local economies and to drive innovation. Vets Who Code
                serves as a launch pad for our veterans and military spouses.
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
                  <img className="img-responsive" src={jerome} alt="Image" />
                  <div className="meet-social">
                    <a href="https://twitter.com/JeromeHardaway">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="https://github.com/jeromehardaway">
                      <i className="fa fa-github" />
                    </a>
                    <a href="https://www.linkedin.com/in/jeromehardaway/">
                      <i className="fa fa-linkedin" />
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
                  <img className="img-responsive" src={andrew} alt="Image" />
                  <div className="meet-social">
                    <a href="https://twitter.com/witzcreative">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="https://www.behance.net/WitzCreative">
                      <i className="fa fa-behance" />
                    </a>
                    <a href="https://www.linkedin.com/in/witzcreative">
                      <i className="fa fa-linkedin" />
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
                  <img className="img-responsive" src={noel} alt="Image" />
                  <div className="meet-social">
                    <a href="https://twitter.com/MrBernnz">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="https://github.com/mrbernnz">
                      <i className="fa fa-github" />
                    </a>
                    <a href="https://www.linkedin.com/in/mrbernnz">
                      <i className="fa fa-linkedin" />
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
  </div>
)

export default About
