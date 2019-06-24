import React, { Component } from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

export default class Contact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    message: '',
    description:
      'Fill out the from below and someone will contact you within 24 hours. Can&apos;t wait to hear from you!',
    formHeading: 'Contact Us',
    loading: false,
    formSuccess: false,
    formError: false,
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBQt6WATWNedQ8TSM7sCKOI1uoPR2JrG-4'
      var x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', () => {
        this.initialize()
      })
    } else {
      this.initialize()
    }
  }

  initialize = () => {
    const mapCanvas = document.getElementById('map-canvas')
    const mapOptions = {
      center: new google.maps.LatLng(36.1579519, -86.7708364),
      scrollwheel: false,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    const map = new google.maps.Map(mapCanvas, mapOptions)
    const contentString = `
      <div id="content">
        <h2>#VetsWhoCode</h2>
        <div id="bodyContent">41 N Peabody st, Nashville Tn, 37120</div>
      </div>
    `
    const myLatLng = { lat: 36.1577981, lng: -86.7707313 }
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    })

    const marker = new google.maps.Marker({
      position: myLatLng,
      map,
      title: '#VetsWhoCode',
    })

    marker.addListener('click', () => {
      infowindow.open(map, marker)
    })
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
        this.setState({ description, formError: true, formHeading })
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
            {!formSuccess && (
              <div className="row">
                <div className="col-md-12 clearfix">
                  <div id="map-canvas" className="map-default-height" />
                </div>
              </div>
            )}
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
