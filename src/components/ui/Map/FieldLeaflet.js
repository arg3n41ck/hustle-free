import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
import { DARK_THEME_MAP } from '../../../services/constants'
import L from 'leaflet'

const iconPerson = new L.Icon({
  iconUrl: '/assets/icons/mapIcon.svg',
  iconRetinaUrl: '/assets/icons/mapIcon.svg',
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: 'leaflet-div-icon',
})

const MapFieldLeafLet = ({ onPoint, points = null, disabled }) => {
  const mapRef = useRef()

  const LocationMarker = useCallback(() => {
    useMapEvents({
      click(e) {
        const newPoint = {
          lat: e.latlng?.lat,
          lng: e.latlng?.lng,
        }

        onPoint && !disabled && onPoint(newPoint)
      },
    })
    return points === null ? null : <Marker position={points} icon={iconPerson} />
  }, [points])

  return points ? (
    <MapContainer center={points} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${DARK_THEME_MAP}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <LocationMarker />
    </MapContainer>
  ) : null
}

export default MapFieldLeafLet
