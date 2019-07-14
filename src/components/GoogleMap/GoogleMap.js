import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const apiKey = 'AIzaSyBQt6WATWNedQ8TSM7sCKOI1uoPR2JrG-4'

function GoogleMap({ createMarker }) {
  const props = { ref: useRef() }
  const onLoad = () => {
    const map = new window.google.maps.Map(props.ref.current, {
      zoom: 16,
      scrollwheel: false,
      center: {
        lat: 36.1579519,
        lng: -86.7708364,
      },
      disableDefaultUI: true,
    })
    createMarker && createMarker(map)
  }

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`)
      script.type = `text/javascript`
      script.src = `https://maps.google.com/maps/api/js?key=${apiKey}`

      const headScript = document.getElementsByTagName(`script`)[0]
      headScript.parentNode.insertBefore(script, headScript)

      script.addEventListener(`load`, onLoad)

      return () => script.removeEventListener(`load`, onLoad)
    } else {
      onLoad()
    }
  })

  return (
    <div
      {...props}
      id="map-canvas"
      className="map-default-height"
      style={{ width: '100%', height: '300px' }}
    />
  )
}

GoogleMap.propTypes = {
  createMarker: PropTypes.func,
  ref: PropTypes.instanceOf(Object),
}

export default React.memo(GoogleMap)
