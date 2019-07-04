import React, { Component } from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default class Apply extends Component {
  state = {
    name: '',
    email: '',
    'branch-of-service': '',
    experience: '',
    'github-portfolio-or-linkedin': '',
    location: '',
    'favorite-mre': '',
    'tell-us-about-yourself': '',
    message:
      'Thank you for choosing to apply to Vets Who Code. We work really hard to ' +
      'train our veterans and to maintain an inclusive enviroment so our troops ' +
      'can truly thrive. Please fill out the form below and we will contact you soon.',
    formHeading: 'Apply',
    loading: false,
    formSuccess: false,
    formError: false,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  resetForm = () => ({
    name: '',
    email: '',
    'branch-of-service': '',
    experience: '',
    'github-portfolio-or-linkedin': '',
    location: '',
    'favorite-mre': '',
    'tell-us-about-yourself': '',
  })

  handleSubmit = e => {
    e.preventDefault()
    // set loading state to show in the button
    this.setState({ loading: true })
    const gatewayUrl = 'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/apply'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        'branch-of-service': this.state['branch-of-service'],
        experience: this.state.experience,
        'github-portfolio-or-linkedin': this.state['github-portfolio-or-linkedin'],
        location: this.state.location,
        'favorite-mre': this.state['favorite-mre'],
        'tell-us-about-yourself': this.state['tell-us-about-yourself'],
      }),
    }

    fetch(gatewayUrl, options)
      .then(resp => {
        if (resp.ok) {
          const message =
            'Your application has been submitted successfully! ' +
            'We look forward to contacting you soon.'
          const formHeading = 'Thank You'
          window.scrollTo(0, 0)
          this.setState({ message, formSuccess: true, formHeading })
        }
      })
      .catch(() => {
        const formHeading = 'OOPS Some thing went wrong'
        this.setState({ formError: true, formHeading })
      })

    this.setState(this.resetForm)
  }

  render() {
    const { formSuccess, message, formError, loading, formHeading } = this.state

    return (
      <Layout>
        <PageHeader title="apply" />
        <section id="contact" className="pad-regular section bg-default">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="contactus-brief">
                  <h3>{formHeading}</h3>
                  <p className={formSuccess ? 'alert alert-success' : 'section-description'}>
                    {message}
                  </p>
                  {formError && (
                    <p className="alert alert-danger fade-in">
                      There was an error trying to submit your application. Please try again.
                    </p>
                  )}
                  {!formSuccess && (
                    <form id="s2do-form" action="#" onSubmit={this.handleSubmit}>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="name" className="dark-text">
                            Name
                            <sup>*</sup>
                          </label>
                          <input
                            id="name"
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
                            id="InputEmail"
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
                            id="InputService"
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
                          <label htmlFor="Experience" className="dark-text">
                            Experience
                            <sup>*</sup>
                          </label>
                          <input
                            id="Experience"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Do you program and if so for how long?"
                            name="experience"
                            value={this.state.experience}
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
                            id="InputPortfolio"
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
                            id="InputLocation"
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
                          <label htmlFor="InputMRE" className="dark-text">
                            Favorite MRE?
                            <sup>*</sup>
                          </label>
                          <input
                            id="InputMRE"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Chilli Mac?"
                            name="favorite-mre"
                            value={this.state['favorite-mre']}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="InputInterviewStory" className="dark-text">
                            Tell Us About Yourself
                          </label>
                          <textarea
                            id="InputInterviewStory"
                            className="form-control"
                            rows="7"
                            placeholder="Here we focus on aptitude and impact, so tell
                              us about yourself and why you want to join #VetsWhoCode?"
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
                            value={loading ? 'loading...' : 'submit'}
                            href="#"
                            className="btn btn-charity-default"
                            title=""
                          />
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
