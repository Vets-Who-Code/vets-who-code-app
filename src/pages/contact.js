import React, { Component } from 'react'

class Contact extends Component {
  initialize() {
    var mapCanvas = document.getElementById('map-canvas')
    var mapOptions = {
      center: new google.maps.LatLng(36.1579519, -86.7708364),
      scrollwheel: false,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var map = new google.maps.Map(mapCanvas, mapOptions)
  }

  componentDidMount() {
    this.initialize()
  }

  render() {
    return (
      <div>
        <section id="contact" className="pad-regular section bg-default">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="contactus-brief">
                  <h3>Contact us</h3>
                  <p className="section-description">
                    Fill out the from below and someone will contact you within
                    24 hours. Can't wait to hear from you!
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 clearfix">
                <div id="map-canvas" className="map-default-height" />
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact-form"
          className="section bg-default default-section-padding"
        >
          <div className="container">
            <div className="row">
              <div className="contact-form">
                <form id="s2do-form" action="#" method="POST">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="InputName" className="dark-text">
                        Your Display Name
                        <super>*</super>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-dark"
                        name="name"
                        id="InputName"
                        placeholder="Jody"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="InputEmail" className="dark-text">
                        Your Email Address
                        <super>*</super>
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-dark"
                        name="email"
                        id="InputEmail"
                        placeholder="jody@example.com"
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
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="message" className="dark-text">
                        Your Message
                        <super>*</super>
                      </label>
                      <textarea
                        id="message"
                        className="form-control form-control-dark"
                        rows="3"
                        name="message"
                        placeholder="Your Message Here.."
                        required
                      />
                    </div>
                    <input
                      id="cfsubmit"
                      type="submit"
                      name="submit"
                      value="SEND MESSAGE"
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
      </div>
    )
  }
}

export default Contact
