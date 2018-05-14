import React from 'react';
import Link from 'gatsby-link';
import SponsorSlider from '../components/SponsorSlider';
import Countdown from '../components/Countdown';

import Header from '../components/Header';
import troopsAtGooglePNG from '../images/troops-at-google.jpg';


class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.getTimeRemaining = this.getTimeRemaining.bind(this);
  }

  componentWillMount() {
    this.getTimeRemaining();
  }

  componentDidMount() {
    window.setInterval(() => {
      this.getTimeRemaining();
    }, 1000);
  }

  componentWillUnmount() {
    this.getTimeRemaining();
  }

  getTimeRemaining() {
    const endTime = 'September 04 2018';
    const t = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    this.setState({
      days,
      hours,
      minutes,
      seconds,
    });
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div>
        <Header />
        <section id="our_stories" className="section pad-regular bg-default our_stories small-top-pad">
          <div className="container">
            <div className="row bg-dark">
              <div className="col-md-5 col-sm-12 no_left_pad no_right_pad">
                <img className="img-responsive" src={troopsAtGooglePNG} alt="Our Troops at a Google event." />
              </div>
              <div className="col-md-7 col-sm-12 our_story_content text-center">
                <div className="featured-heading">
                  <h2>#VetsWhoCode</h2>
                </div>
                <p>
                  #VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching veterans how to
                  program free of charge so that they may find gainful employment after service.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 our_story_content text-center">
            <div className="featured-heading">
              <h2>#VetsWhoCode</h2>
            </div>
            <p>
              #VetsWhoCode is a veteran-led 501(c)(3) charitable non-profit that focuses on teaching veterans how to
              program free of charge so that they may find gainful employment after service.
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
                Through training, mentorship, and opportunities to connect with industry experts, we ensure that our
                troops get the best knowledge in Computer Science and JavaScript.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
    <section id="causes" className="section bg-default causes-card" style={{ padding: '75px 0' }}>
      <div className="container">
        <div className="normal_heading text-center">
          <h2>Technology Donors</h2>
        </div>
        <div className="row">
          <div className="col-sm-12 cause_content text-center" style={{ marginBottom: 40 }}>
            <h4 className="cause_title">Thank You For Supporting #VetsWhoCode!</h4>
            <hr />
            <h3 className="subtitle">We Are Grateful To Be Supported By These Companies.</h3>
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
              <p>Our next #VetsWhoCode Cohort will begin at this time.</p>
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
                  <h3 className="text-center">SIGN UP FOR OUR NEWSLETTER</h3>
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

export default IndexPage;
