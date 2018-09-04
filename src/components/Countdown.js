import React, { Component } from 'react'
import Link from 'gatsby-link'

class Countdown extends Component {
  state = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
    interval: null
  }

  componentWillMount = () => {
    this.getTimeRemaining()
  }

  componentDidMount = () => {
    this.state.interval = setInterval(() => this.getTimeRemaining(), 1000)
  }

  componentWillUnmount = () => {
    this.stopCountDown()
  }

  getTimeRemaining = () => {
    const deadLine = 'September 19 2018'
    const time = Date.parse(deadLine) - Date.parse(new Date())
    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    const days = Math.floor(time / (1000 * 60 * 60 * 24))

    this.setState({
      days,
      hours,
      minutes,
      seconds
    })
  }

  stopCountDown = () => {
    const { interval } = this.state
    clearInterval(interval)
  };

  render() {
    const { days, hours, minutes, seconds } = this.state
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
    )
  }
}

export default Countdown
