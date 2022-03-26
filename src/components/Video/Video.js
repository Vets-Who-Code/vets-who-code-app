import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import veteranVideo from '../../video/vwc-facebook-reel.mp4'

function Video({ isSubmitted }) {
  const videoRef = useRef()

  async function play() {
    try {
      await videoRef.current.play()
    } catch (err) {
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    let current = true

    if (current) {
      play()
    }

    return () => (current = false)
  }, [])

  return (
    <video
      className={`veteran-video img-responsive ${isSubmitted ? 'hidden' : ''}`}
      loop
      muted
      preload="auto"
      onPlay={play}
      ref={videoRef}
      type="video/mp4"
    >
      <source src={veteranVideo} />
    </video>
  )
}

Video.propTypes = {
  isSubmitted: PropTypes.bool,
}

export default Video
