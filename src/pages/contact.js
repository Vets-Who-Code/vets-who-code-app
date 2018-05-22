import React, { Component } from 'react';
import Link from 'gatsby-link';

import thisIsUs from '../images/this_is_us.png';

export default class Contact extends Component {
  componentDidMount() {
    this.initialize();
  }

  state = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  initialize = () => {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: new google.maps.LatLng(36.1579519, -86.7708364),
      scrollwheel: false,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm = () => ({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  handleSubmit = e => {
    const gatewayUrl =
      'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/contact';
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        message: this.state.message
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
            <h2 className="text-center text-uppercase">Contact Us</h2>
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/contact" className="page-active">
                Contact Us
              </Link>
            </div>
          </div>
        </header>
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
          className="section bg-default default-section-padding">
          <div className="container">
            <div className="row">
              <div className="contact-form">
                <form id="s2do-form" onSubmit={this.handleSubmit}>
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
                        value={this.state.name}
                        onChange={this.handleChange}
                        required={true}
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
                        value={this.state.email}
                        onChange={this.handleChange}
                        required={true}
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
                        <super>*</super>
                      </label>
                      <textarea
                        id="message"
                        className="form-control form-control-dark"
                        rows="3"
                        name="message"
                        placeholder="Your Message Here.."
                        value={this.state.message}
                        onChange={this.handleChange}
                        required={true}
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
    );
  }
}
