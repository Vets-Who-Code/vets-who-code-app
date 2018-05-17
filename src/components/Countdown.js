import React, { Component } from 'react';
import Link from 'gatsby-link';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.getTimeRemaining = this.getTimeRemaining.bind(this);
  }

  componentWillMount() {
    this.getTimeRemaining();
  }

  componentDidMount() {
    this.getTimeRemaining();
  }

  componentDidUpdate() {
    clearTimeout(this.timer);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
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
    this.timer = setTimeout(this.getTimeRemaining.bind(this), 1000);
  }
  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div className="col-sm-6 event_counter_container text-center">
        <div className="container-countdown">
          <div className="countdown-box">
            <span className="counter">{days}</span>
            <h4>Days</h4>
          </div>
          <div className="countdown-box">
            <span className="counter">{hours}</span>
            <h4>Hours</h4>
          </div>
          <div className="countdown-box">
            <span className="counter">{minutes}</span>
            <h4>Minutes</h4>
          </div>
          <div className="countdown-box">
            <span className="counter">{seconds}</span>
            <h4>Seconds</h4>
          </div>
        </div>
        <Link className="btn btn-charity-default" to="/apply">
          Apply
        </Link>
      </div>
    );
  }
}

export default Countdown;
