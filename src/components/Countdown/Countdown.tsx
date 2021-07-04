import { useState, useEffect } from 'react'

interface CountdownProps {
  nextClass: string
}

type TLeadingZero = string | number

interface ITimeLeft {
  [key: string]: TLeadingZero
}

const addLeadingZero = (time: number): TLeadingZero => (time < 10 ? `0${time}` : time)

const calculateTimeLeft = (nextClass: string): ITimeLeft => {
  const difference: number = Date.parse(nextClass) - Date.parse(new Date().toString())
  let timeLeft: ITimeLeft = {}
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

const Countdown = ({ nextClass }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(nextClass))

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(nextClass))
    }, 1000)
  })

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
export default Countdown
