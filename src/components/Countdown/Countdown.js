import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const addLeadingZero = time => (time < 10 ? `0${time}` : time)

const calculateTimeLeft = nextClass => {
  const difference = Date.parse(nextClass) - Date.parse(new Date().toString())
  let timeLeft = {}
  if (difference > 0) {
    timeLeft = {
      Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hours: addLeadingZero(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      Minutes: addLeadingZero(Math.floor((difference / 1000 / 60) % 60)),
      Seconds: addLeadingZero(Math.floor((difference / 1000) % 60)),
    }
  }
  return timeLeft
}

const Countdown = ({ nextClass }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(nextClass))
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(nextClass))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [nextClass, timeLeft])

  const timerComponents = []

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return
    }
    timerComponents.push(
      <div className="countdown-box" key={interval}>
        <span className="counter">{timeLeft[interval]}</span>
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
