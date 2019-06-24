import React, { useEffect, useRef } from 'react'

function GoogleMap() {
  const googleMapRef = useRef()

  useEffect(() => {
    let current = true
    if (current) {
      mapInit()
    }
    return () => (current = false)
  })

  function mapInit() {
    const googleMapScript = document.createElement('script')
    googleMapScript.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBQt6WATWNedQ8TSM7sCKOI1uoPR2JrG-4'
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', () => {
      createGoogleMap()
      createMarker()
    })
  }

  function createGoogleMap() {
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 16,
      scrollwheel: false,
      center: {
        lat: 36.1579519,
        lng: -86.7708364,
      },
      disableDefaultUI: true,
    })
  }

  function createMarker() {
    const mapCanvas = googleMapRef.current
    const mapOptions = {
      center: new google.maps.LatLng(36.1579519, -86.7708364),
      scrollwheel: false,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    const map = new google.maps.Map(mapCanvas, mapOptions)
    const contentString = `
      <div id="content">
        <h2>#VetsWhoCode</h2>
        <div id="bodyContent">41 N Peabody st, Nashville Tn, 37120</div>
      </div>
    `
    const myLatLng = { lat: 36.1577981, lng: -86.7707313 }
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    })

    const marker = new google.maps.Marker({
      position: myLatLng,
      map,
      title: '#VetsWhoCode',
    })

    marker.addListener('click', () => {
      infowindow.open(map, marker)
    })
  }

  return (
    <div
      id="map-canvas"
      ref={googleMapRef}
      className="map-default-height"
      style={{ width: '100%', height: '300px' }}
    />
  )
}

export default GoogleMap
