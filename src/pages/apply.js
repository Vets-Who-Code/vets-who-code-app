import React from 'react'
import Link from 'gatsby-link'

import thisIsUs from '../images/this_is_us.png'

const Apply = () => {
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
          <h2 className="text-center text-uppercase">Apply</h2>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/apply" className="page-active">
              Apply
            </Link>
          </div>
        </div>
      </header>
      <section id="contact" className="pad-regular section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="contactus-brief">
                <h3>Apply</h3>
                <p className="section-description">
                  Thank thank you for choosing to apply to Vets Who Code. We
                  work really hard to train our veterans and to maintain an
                  inclusive enviroment so our troops can truly thrive. Please
                  fill out the form below and we will contact you soon.
                </p>
                <form id="s2do-form" action="#" method="POST">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="InputName" className="dark-text">
                        Name
                        <super>*</super>
                      </label>
                      <input
                        className="form-control input-lg"
                        type="text"
                        placeholder="Name"
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="InputEmail" className="dark-text">
                        Email
                        <super>*</super>
                      </label>
                      <input
                        className="form-control input-lg"
                        type="text"
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="InputService" className="dark-text">
                        Military Branch Of Service
                        <super>*</super>
                      </label>
                      <input
                        className="form-control input-lg"
                        type="text"
                        placeholder="Thank you for your service"
                        name="branch-of-service"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="Experience" className="dark-text">
                        Experience
                        <super>*</super>
                      </label>
                      <input
                        className="form-control input-lg"
                        type="text"
                        placeholder="Do you program and if so for how long?"
                        name="experience"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="InputPortfolio" className="dark-text">
                        Github, Portfolio or Linkedin
                        <super>*</super>
                      </label>
                      <input
                        className="form-control input-lg"
                        type="text"
                        placeholder="Share your work"
                        name="github-portfolio-or-linkedin"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="InputLocation" className="dark-text">
                        Location ( City and State )
                        <super>*</super>
                      </label>
                      <input
                        className="form-control input-lg"
                        type="text"
                        placeholder="Location"
                        name="location"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="InputMRE" className="dark-text">
                        Favorite MRE?
                        <super>*</super>
                      </label>
                      <input
                        className="form-control input-lg"
                        type="text"
                        placeholder="Chilli Mac?"
                        name="favorite-mre"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="InputInterviewStory" className="dark-text">
                        Tell Us About Yourself
                      </label>
                      <textarea
                        className="form-control"
                        rows="7"
                        placeholder="Here we focus on aptitude and impact, so tell us about yourself and why you want to join #VetsWhoCode?"
                        name="tell-us-about-yourself"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <input
                        type="submit"
                        name="submit"
                        href="#"
                        className="btn btn-charity-default"
                        title=""
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Apply
