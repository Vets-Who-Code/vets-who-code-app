import React, { Component, Fragment } from 'react'

class Countdown extends Component {
  state = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
    interval: null,
    time: null,
  }

  componentDidMount = () => {
    const interval = setInterval(() => this.getTimeRemaining(), 1000)
    this.setState({ interval })
  }

  componentWillUnmount = () => {
    this.stopCountDown()
  }

  getTimeRemaining = () => {
    const deadLine = 'August 13 2020'
    const time = Date.parse(deadLine) - Date.parse(new Date())
    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    const days = Math.floor(time / (1000 * 60 * 60 * 24))

    this.setState({
      days,
      hours,
      minutes,
      seconds,
      time,
    })
  }

  stopCountDown = () => {
    const { interval } = this.state
    clearInterval(interval)
  }

  render() {
    const { days, hours, minutes, seconds, time } = this.state
    return (
      <div>
        {time > 0 ? (
          <Fragment>
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
          </Fragment>
        ) : (
          <h3>Class Is In Session</h3>
        )}
      </div>
    )
  }
}

export default Countdown
