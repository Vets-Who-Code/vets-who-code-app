import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const addLeadingZero = time => (time < 10 ? `0${time}` : time)

const calculateTimeLeft = nextClass => {
  const difference = Date.parse(nextClass) - Date.parse(new Date().toString())
  let timeLeft = {}
  if (difference > 0) {
    timeLeft = {
      Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Minutes: Math.floor((difference / 1000 / 60) % 60),
      Seconds: Math.floor((difference / 1000) % 60),
    }
  }
  return timeLeft
}

const Countdown = ({ nextClass }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(nextClass))

  useEffect(() => {
    setInterval(() => {
      setTimeLeft(calculateTimeLeft(nextClass))
    }, 1000)
    return () => {
      clearInterval(timeLeft)
    }
  }, [nextClass, timeLeft])

  const timerComponents = []

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return
    }
    timerComponents.push(
      <div className="countdown-box" key={interval}>
        <span className="counter">{addLeadingZero(timeLeft[interval])}</span>
        <h4>{interval}</h4>
      </div>
    )
  })

  return (
    <>
      <div className="container-countdown">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <div>
            <h3 className="countdown-message">Class Is In Session</h3>
          </div>
        )}
      </div>
    </>
  )
}

Countdown.propTypes = {
  nextClass: PropTypes.string.isRequired, // String formatted 'March, 01 2021'
}

export default Countdown
