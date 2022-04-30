import React from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import mapStyles from "../../../styles/mapStyles"

const libraries = ["places"]
const mapContainerStyle = {
  height: "300px",
  width: "100%",
  borderRadius: "16px",
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}
const center = { lat: 47.62453103078936, lng: 64.59334709431583 }

function MapField({ onPoint }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API,
    libraries,
  })
  const [marker, setMarker] = React.useState(null)

  const onMapClick = React.useCallback((e) => {
    const newPoint = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    setMarker(newPoint)
    onPoint && onPoint(newPoint)
  }, [])

  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng })
  //   mapRef.current.setZoom(14)
  // }, [])

  if (loadError) return "Error"
  if (!isLoaded) return "Loading..."

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={5}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {marker && (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          // icon={{
          //   url: "../../../public/svg/map-pointer.svg",
          //   origin: new window.google.maps.Point(0, 0),
          //   anchor: new window.google.maps.Point(15, 15),
          //   scaledSize: new window.google.maps.Size(30, 30),
          // }}
        />
      )}
    </GoogleMap>
  )
}

export default MapField