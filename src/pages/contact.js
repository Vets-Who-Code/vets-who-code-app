import React, { Component } from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import GoogleMap, { createMarker } from '../components/GoogleMap'

export default class Contact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    message: '',
    description:
      "Fill out the from below and someone will contact you within 24 hours. Can't wait to hear from you!",
    formHeading: 'Contact Us',
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
    phone: '',
    message: '',
  })

  handleSubmit = e => {
    e.preventDefault()
    const gatewayUrl = 'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/contact'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        message: this.state.message,
      }),
    }
    fetch(gatewayUrl, options)
      .then(resp => {
        if (resp.ok) {
          const description =
            'Your application has been submitted successfully! ' +
            'We look forward to contacting you soon.'
          const formHeading = 'Thank You'
          window.scrollTo(0, 0)
          this.setState({ description, formSuccess: true, formHeading })
        }
      })
      .catch(() => {
        const formHeading = 'OOPS Some thing went wrong'
        window.scrollTo(0, 0)
        this.setState({ formError: true, formHeading })
      })

    this.setState(this.resetForm)
  }

  render() {
    const { formSuccess, description, formError, loading, formHeading } = this.state

    return (
      <Layout>
        <PageHeader title="contact us" />
        <section id="contact" className="pad-regular section bg-default">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="contactus-brief">
                  <h3>{formHeading}</h3>
                  <p className={formSuccess ? 'alert alert-success' : 'section-description'}>
                    {description}
                  </p>
                  {formError && (
                    <p className="alert alert-danger fade-in">
                      There was an error trying to submit your application. Please try again.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 clearfix">
                <GoogleMap createMarker={createMarker} />
              </div>
            </div>
          </div>
        </section>
        {!formSuccess && (
          <section id="contact-form" className="section bg-default default-section-padding">
            <div className="container">
              <div className="row">
                <div className="contact-form">
                  <form id="s2do-form" onSubmit={this.handleSubmit}>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="InputName" className="dark-text">
                          Your Display Name
                          <sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-dark"
                          name="name"
                          id="InputName"
                          placeholder="Jody"
                          value={this.state.name}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="InputEmail" className="dark-text">
                          Your Email Address
                          <sup>*</sup>
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-dark"
                          name="email"
                          id="InputEmail"
                          placeholder="jody@example.com"
                          value={this.state.email}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="InputPhoneNumber" className="dark-text">
                          Your Phone Number
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-dark"
                          name="phone"
                          id="InputPhoneNumber"
                          placeholder="123-456-789"
                          value={this.state.phone}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="message" className="dark-text">
                          Your Message
                          <sup>*</sup>
                        </label>
                        <textarea
                          id="message"
                          className="form-control form-control-dark"
                          rows="3"
                          name="message"
                          placeholder="Your Message Here.."
                          value={this.state.message}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <input
                        id="cfsubmit"
                        type="submit"
                        name="submit"
                        value={loading ? 'loading...' : 'Submit Message'}
                        href="#"
                        className="btn btn-charity-default"
                        title=""
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </Layout>
    )
  }
}
