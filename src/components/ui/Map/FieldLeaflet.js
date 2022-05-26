import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import { useCallback, useRef, useState } from "react"
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css"
import { DARK_THEME_MAP } from "../../../services/constants"

const MapFieldLeafLet = ({ onPoint, defaultPoints, disabled }) => {
  const [marker, setMarker] = useState(defaultPoints || null)
  const mapRef = useRef()

  const LocationMarker = useCallback(() => {
    useMapEvents({
      click(e) {
        const newPoint = {
          lat: e.latlng?.lat,
          lng: e.latlng?.lng,
        }
        !disabled && setMarker(newPoint)
        onPoint && !disabled && onPoint(newPoint)
      },
    })

    return marker === null ? null : (
      <Marker position={marker}/>
    )
  }, [marker])



  return (
    <MapContainer
      center={marker}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
    >
        <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${DARK_THEME_MAP}`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
      <LocationMarker />
    </MapContainer>
  )
}

export default MapFieldLeafLet
