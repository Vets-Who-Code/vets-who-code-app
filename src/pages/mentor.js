import React from 'react';

const Mentor = () => {
  return (
    <section id="contact" className="pad-regular section bg-default">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="contactus-brief">
              <h3>Become A Mentor</h3>
              <p className="section-description">
                Thank you for choosing to become a mentor for our veterans.
                Please fill out the form below and we will reach out to you.
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
                    <label for="InputTechnicalExpertise" className="dark-text">
                      Area Of Technical Expertise ( Javascript, Ruby, etc)
                      <super>*</super>
                    </label>
                    <input
                      className="form-control input-lg"
                      type="text"
                      placeholder="What languages you write in?"
                      name="technical-expertise"
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
                    <label
                      for="InputEmployerImplementedRestricted"
                      className="dark-text"
                    >
                      Employer Implemented Restrictions, If Any.
                    </label>
                    <textarea
                      className="form-control"
                      rows="7"
                      placeholder="Please put here any employer restrictions about writing and reading code?"
                      name="employer-restrictions"
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
  );
};

export default Mentor;
