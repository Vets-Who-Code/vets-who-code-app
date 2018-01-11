import React, { Component } from 'react';

import troopsAtGooglePNG from '../images/troops-at-google.jpg';
import pluralsightPNG from '../images/supporters/ps.png';
import basecampPNG from '../images/supporters/basecamp-logo.png';
import replItPNG from '../images/supporters/repl.it.png';
import slackPNG from '../images/supporters/slack.png';
import doPNG from '../images/supporters/DO.png';
import icPNG from '../images/supporters/IC.png';
import honeyBadgerPNG from '../images/supporters/honeybadger.png';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.handleSlider = this.handleSlider.bind(this);
  }

  componentDidMount() {
    this.handleTimer();
    this.handleSlider();
  }

  handleTimer() {
    $(document).ready(() => {
      if ($('.container-countdown').length == 0) return;
      $('.container-countdown').countdown({
        date: 'March 05, 2018 00:00:00',
        render(data) {
          const el = $(this.el);
          el
            .empty()
            .append(
              `<div class='countdown-box'><span class='counter'>${this.leadingZeros(
                data.days,
                2,
              )}</span><h4>Days</h4></div>`,
            )
            .append(
              `<div class='countdown-box'><span class='counter'>${this.leadingZeros(
                data.hours,
                2,
              )}</span><h4>Hours</h4></div>`,
            )
            .append(
              `<div class='countdown-box'><span class='counter'>${this.leadingZeros(
                data.min,
                2,
              )}</span><h4>Minutes</h4></div>`,
            )
            .append(
              `<div class='countdown-box'><span class='counter'>${this.leadingZeros(
                data.sec,
                2,
              )}</span><h4>Seconds</h4></div>`,
            );
        },
      });
    });
  }

  handleSlider() {}

  render() {
    return (
      <div>
        <section
          id="our_stories"
          className="section pad-regular bg-default our_stories small-top-pad"
        >
          <div className="container">
            <div className="row bg-dark">
              <div className="col-md-5 col-sm-12 no_left_pad no_right_pad">
                <img className="img-responsive" src={troopsAtGooglePNG} />
              </div>
              <div className="col-md-7 col-sm-12 our_story_content text-center">
                <div className="featured-heading">
                  <h2>#VetsWhoCode</h2>
                </div>
                <p>
                  #VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit
                  that focuses on teaching veterans how to program free of
                  charge so that they may find gainful employment after service.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="our_missions"
          className="section pad-regular bg-light our_missions"
        >
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
                    Through training, mentorship, and opportunities to connect
                    with industry experts, we ensure that our troops get the
                    best knowledge in Computer Science and JavaScript.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        <section
          id="causes"
          className="section bg-default causes-card pad-regular"
        >
          <div className="container">
            <div className="normal_heading text-center">
              <h2>Technology Donors</h2>
            </div>
            <div className="row">
              <div className="col-sm-12 cause_content text-center">
                <h4 className="cause_title">
                  Thank You For Supporting #VetsWhoCode!
                </h4>
                <hr />
                <h3 className="subtitle">
                  We Are Grateful To Be Supported By These Companies.
                </h3>
                <div id="causesCarousel" className="owl-carousel owl-theme">
                  <div className="item">
                    <a href="#">
                      <img
                        src={pluralsightPNG}
                        alt="Pluralsight"
                        height="60"
                        width="60"
                      />
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <img
                        src={basecampPNG}
                        alt="Basecamp"
                        height="60"
                        width="60"
                      />
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <img
                        src={replItPNG}
                        alt="repl.it"
                        height="60"
                        width="60"
                      />
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <img src={slackPNG} alt="Slack" height="60" width="60" />
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <img
                        src={doPNG}
                        alt="Digital Ocean"
                        height="60"
                        width="60"
                      />
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <img
                        src={icPNG}
                        alt="Interview Cake"
                        height="60"
                        width="60"
                      />
                    </a>
                  </div>
                  <div className="item">
                    <a href="#">
                      <img
                        src={honeyBadgerPNG}
                        alt="Honeybadger"
                        height="60"
                        width="60"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="event_card"
          className="section bg-dark pad-regular event_card"
        >
          <div className="container">
            <div className="row">
              <div className="col-sm-6 event_content">
                <h4>Next Cohort</h4>
                <div className="event_excerpt">
                  <p>Our next #VetsWhoCode Cohort will begin at this time.</p>
                </div>
              </div>
              <div className="col-sm-6 event_counter_container text-center">
                <div className="container-countdown" />
                <a className="btn btn-charity-default" href="apply.html">
                  Apply
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          id="newsletter_card"
          className="section bg-light pad-regular newsletter_card"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 newsletter_wrapper">
                <div className="newsletter_inner_wrapper">
                  <div className="row">
                    <div className="col-md-4">
                      <h3 className="text-center">
                        SIGN UP FOR OUR NEWSLETTER
                      </h3>
                    </div>
                    <div className="col-md-8">
                      <form id="s2do-form" action="#" method="POST">
                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group">
                              <input
                                name="email"
                                type="email"
                                id="subscriber-email"
                                className="form-control"
                                placeholder="Enter your email address"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-3 subscribe-button_box">
                            <button
                              id="subscribe-button"
                              type="submit"
                              className="btn btn-subscribe"
                            >
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
