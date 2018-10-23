import React, { Component } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'

import thisIsUs from '../images/this_is_us.png'

export default class Mentor extends Component {
  state = {
    name: '',
    email: '',
    'branch-of-service': '',
    'technical-expertise': '',
    'github-portfolio-or-linkedin': '',
    location: '',
    'employer-restrictions': '',
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  resetForm = () => ({
    name: '',
    email: '',
    'branch-of-service': '',
    'technical-expertise': '',
    'github-portfolio-or-linkedin': '',
    location: '',
    'employer-restrictions': '',
  })

  handleSubmit = e => {
    const gatewayUrl = 'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/mentor'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        'branch-of-service': this.state['branch-of-service'],
        'technical-expertise': this.state['technical-expertise'],
        'github-portfolio-or-linkedin': this.state['github-portfolio-or-linkedin'],
        location: this.state.location,
        'employer-restrictions': this.state['employer-restrictions'],
      }),
    }
    fetch(gatewayUrl, options)
    e.preventDefault()
    this.setState(this.resetForm)
  }

  render() {
    return (
      <Layout>
        <header
          className="inner-header overlay grey text-center slim-bg "
          style={{
            backgroundImage: `url(${thisIsUs})`,
            backgroundPositionY: 'bottom',
          }}
        >
          <div className="overlay-01" />
          <div className="container">
            <h2 className="text-center text-uppercase">Mentor</h2>
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/mentor" className="page-active">
                Mentor
              </Link>
            </div>
          </div>
        </header>
        <section id="contact" className="pad-regular section bg-default">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="contactus-brief">
                  <h3>Become A Mentor</h3>
                  <p className="section-description">
                    Thank you for choosing to become a mentor for our veterans. Please fill out the
                    form below and we will reach out to you.
                  </p>
                  <form id="s2do-form" onSubmit={this.handleSubmit}>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputName" className="dark-text">
                          Name
                          <sup>*</sup>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputEmail" className="dark-text">
                          Email
                          <sup>*</sup>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputService" className="dark-text">
                          Military Branch Of Service
                          <sup>*</sup>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Thank you for your service"
                          name="branch-of-service"
                          value={this.state['branch-of-service']}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputTechnicalExpertise" className="dark-text">
                          Area Of Technical Expertise ( Javascript, Ruby, etc)
                          <sup>*</sup>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="What languages you write in?"
                          name="technical-expertise"
                          value={this.state['technical-expertise']}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputPortfolio" className="dark-text">
                          Github, Portfolio or Linkedin
                          <sup>*</sup>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Share your work"
                          name="github-portfolio-or-linkedin"
                          value={this.state['github-portfolio-or-linkedin']}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputLocation" className="dark-text">
                          Location ( City and State )<sup>*</sup>
                        </label>
                        <input
                          className="form-control input-lg"
                          type="text"
                          placeholder="Location"
                          name="location"
                          value={this.state.location}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="InputEmployerImplementedRestricted" className="dark-text">
                          Employer Implemented Restrictions, If Any.
                        </label>
                        <textarea
                          className="form-control"
                          rows="7"
                          placeholder="Please put here any employer restrictions about writing and reading code?"
                          name="employer-restrictions"
                          value={this.state['employer-restrictions']}
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
      </Layout>
    )
  }
}
