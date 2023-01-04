import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader,Marker,useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};
const libraries = ["places"]

function MyComponent(props) {
  const { isLoaded,Error } = useLoadScript({
    libraries,
    googleMapsApiKey: "AIzaSyCtWBjIIdMG--m5BqfYhtWYDwHqlJqJJuo"
  }) 
  //const center = {lat: 30.1575, lng: 71.5249}
  //const [map, setMap] = React.useState(null)
  //const [center,setcenter] = useState({lat: props.coords[1], lng: props.coords[0]})
  /*const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []) */
  function mapClicked(e) {
    const res = e.latLng.lat()
    const res2 = e.latLng.lng()
    props.modifyaddress({lat : res,lng : res2})
  }
  return isLoaded ? (
      <GoogleMap
       
        mapContainerStyle={containerStyle}

        center={{lat: props.coords.lat, lng: props.coords.lng}}
        //center={{  lat: 30.1575,  lng: 71.5249}}
        zoom={12}
        //onLoad={onLoad}
        //onUnmount={onUnmount}
        onClick={(e) => mapClicked(e)}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        <Marker
        position={{lat: props.coords.lat, lng: props.coords.lng}}
        icon={{url: "/images/pin.png",
        innerWidth : 25,
        innerHeight : 25,
        //anchor: new google.maps.Point(32,32),
        width : '24px',
        height : '25px',
        scaledSize : {width : 52,height : 52}
        //scaledSize: new google.maps.Size(64,64)
      }}
        
        >
          
        </Marker>
        </>
      </GoogleMap>
  ) : <></>
}

export default MyComponent