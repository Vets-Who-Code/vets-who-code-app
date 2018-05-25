import React, { Component } from 'react';
import Link from 'gatsby-link';

import thisIsUs from '../images/this_is_us.png';

export default class Apply extends Component {
  state = {
    name: '',
    email: '',
    'branch-of-service': '',
    experience: '',
    'github-portfolio-or-linkedin': '',
    location: '',
    'favorite-mre': '',
    'tell-us-about-yourself': ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm = () => ({
    name: '',
    email: '',
    'branch-of-service': '',
    experience: '',
    'github-portfolio-or-linkedin': '',
    location: '',
    'favorite-mre': '',
    'tell-us-about-yourself': ''
  });

  handleSubmit = e => {
    const gatewayUrl =
      'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/apply';
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        'branch-of-service': this.state['branch-of-service'],
        experience: this.state.experience,
        'github-portfolio-or-linkedin': this.state[
          'github-portfolio-or-linkedin'
        ],
        location: this.state.location,
        'favorite-mre': this.state['favorite-mre'],
        'tell-us-about-yourself': this.state['tell-us-about-yourself']
      })
    };
    fetch(gatewayUrl, options);
    e.preventDefault();
    this.setState(this.resetForm);
  };

  render() {
    return (
      <div>
        <header
          className="inner-header overlay grey text-center slim-bg "
          style={{
            backgroundImage: `url(${thisIsUs})`,
            backgroundPositionY: 'bottom'
          }}>
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
                  <form id="s2do-form" action="#" onSubmit={this.handleSubmit}>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputName" className="dark-text">
                          Name
                          <super>*</super>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputEmail" className="dark-text">
                          Email
                          <super>*</super>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputService" className="dark-text">
                          Military Branch Of Service
                          <super>*</super>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Thank you for your service"
                          name="branch-of-service"
                          value={this.state['branch-of-service']}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="Experience" className="dark-text">
                          Experience
                          <super>*</super>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Do you program and if so for how long?"
                          name="experience"
                          value={this.state.experience}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputPortfolio" className="dark-text">
                          Github, Portfolio or Linkedin
                          <super>*</super>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Share your work"
                          name="github-portfolio-or-linkedin"
                          value={this.state['github-portfolio-or-linkedin']}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputLocation" className="dark-text">
                          Location ( City and State )
                          <super>*</super>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Location"
                          name="location"
                          value={this.state.location}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputMRE" className="dark-text">
                          Favorite MRE?
                          <super>*</super>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Chilli Mac?"
                          name="favorite-mre"
                          value={this.state['favorite-mre']}
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label
                          htmlFor="InputInterviewStory"
                          className="dark-text">
                          Tell Us About Yourself
                        </label>
                        <textarea
                          className="form-control"
                          rows="7"
                          placeholder="Here we focus on aptitude and impact, so tell us about yourself and why you want to join #VetsWhoCode?"
                          name="tell-us-about-yourself"
                          value={this.state['tell-us-about-yourself']}
                          onChange={this.handleChange}
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
    );
  }
}
