import { Map, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import { useCallback, useEffect, useRef, useState } from "react"
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import { geosearch } from 'esri-leaflet-geocoder';


const MapFiledLeafLet = ({ onPoint, defaultPoints, disabled }) => {
  const position = [47.545449978946756, 56.37917854573184]
  const [marker, setMarker] = useState(defaultPoints || null)

  console.log(marker)

  const onMapClick = useCallback((e) => {
    const newPoint = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    }
    console.log(newPoint)
    !disabled && setMarker(newPoint)
    !disabled && onPoint && onPoint(newPoint)
  }, [])

  const mapRef = useRef()
  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if ( !map ) return;
    console.log(map)

    const control = geosearch();

    control.addTo(map);

    control.on('results', handleOnSearchResuts);

    return () => {
      control.off('results', handleOnSearchResuts);
    }
  }, []);

//   const onMapLoad = useCallback((map) => {
//       console.log(map)
//     mapRef.current = map
//   }, [])

  function handleOnSearchResuts(data) {
    console.log('Search results', data);
  }

  return (
    <Map
      center={marker}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    //   onLoad={onMapLoad}
      ref={mapRef}
      onClick={onMapClick}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
      />
      <Marker
    //   eventHandlers={{click: (e) => onMapClick(e.target)}}
      position={marker}>
        {/* <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup> */}
      </Marker>
    </Map>
  )
}

export default MapFiledLeafLet
