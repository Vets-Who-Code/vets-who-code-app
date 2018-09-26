import React, { Component } from 'react';
import Link from 'gatsby-link';
import SponsorSlider from '../components/SponsorSlider';
import Countdown from '../components/Countdown';

import Header from '../components/Header';
import troopsAtGooglePNG from '../images/troops-at-google.jpg';

class IndexPage extends Component {
  state = {
    email: ''
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleUserSubscribe = event => {
    event.preventDefault();
    const { email } = this.state;

    const url = 'https://still-oasis-71573.herokuapp.com/subscribe';

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    };

    fetch(url, options);
    this.setState({ email: '' });
  }

  render() {
    const { email } = this.state;

    return (
      <div>
        <Header />
        <section id="our_stories" className="section pad-regular bg-default our_stories small-top-pad">
          <div className="container">
            <div className="row bg-dark">
              <div className="col-md-5 col-sm-12 no_left_pad no_right_pad">
                <img className="img-responsive" src={troopsAtGooglePNG} alt="Vets Who Code veterans at Google event." />
              </div>
              <div className="col-md-7 col-sm-12 our_story_content text-center">
                <div className="featured-heading">
                  <h2>#VetsWhoCode</h2>
                </div>
                <p>
              #VetsWhoCode is a veteran-led and operated 501(c)(3) charitable non-profit that focuses on training veterans in web development and software engineering
              principles free of charge with the focus of starting careeers as javascript developers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="our_missions" className="section pad-regular bg-light our_missions">
          <div className="container">
            <div className="row">
              <div className="featured-heading text-center">
                <h2 className="dark_color">
              RETOOL
                  <i className="fa fa-code" aria-hidden="true" /> RETRAIN
                  <i className="fa fa-code" aria-hidden="true" /> RELAUNCH
                </h2>
              </div>
              <div className="col-sm-12 our_mission_content text-center">
                <blockquote>
                  <p>
                Through training, building projects, mentorship, and opportunities to connect with industry experts, we ensure that our
                troops gain the best knowledge possible in web development and software engineering.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        <section id="causes" className="section bg-default causes-card" style={{ padding: '75px 0' }}>
          <div className="container">
            <div className="normal_heading text-center">
              <h2>Our Partners</h2>
            </div>
            <div className="row">
              <div className="col-sm-12 cause_content text-center" style={{ marginBottom: 40 }}>
                <h4 className="cause_title">Thank You For Working With #VetsWhoCode!</h4>
                <hr />
                <h3 className="subtitle">We Are Grateful To Have These Companies Partner With Us On Our Journey To Train Veterans How To Code!.</h3>
              </div>
            </div>
            <SponsorSlider />
          </div>
        </section>
        <section id="event_card" className="section bg-dark pad-regular event_card">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 event_content">
                <h4>Next Cohort</h4>
                <div className="event_excerpt">
                  <p>Countdown until our next #VetsWhoCode Cohort gets started:</p>
                </div>
              </div>
              <Countdown />
            </div>
          </div>
        </section>
        <section id="newsletter_card" className="section bg-light pad-regular newsletter_card">
          <div className="container">
            <div className="row">
              <div className="col-md-12 newsletter_wrapper">
                <div className="newsletter_inner_wrapper">
                  <div className="row">
                    <div className="col-md-4">
                      <h3 className="text-center">JOIN OUR EMAIL LIST</h3>
                    </div>
                    <div className="col-md-8">
                      <form
                        id="s2do-form"
                        onSubmit={this.handleUserSubscribe}
                      >
                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group">
                              <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={this.handleInputChange}
                                id="subscriber-email"
                                className="form-control"
                                placeholder="Enter your email address"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-3 subscribe-button_box">
                            <button id="subscribe-button" type="submit" className="btn btn-subscribe">
                          subscribe
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    );
  }
}

export default IndexPage;
