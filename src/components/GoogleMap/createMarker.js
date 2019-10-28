export const createMarker = map => {
  const mapOptions = {
    center: new google.maps.LatLng(36.1579519, -86.7708364),
    scrollwheel: false,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  }

  new window.google.maps.Map(map, mapOptions)
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
