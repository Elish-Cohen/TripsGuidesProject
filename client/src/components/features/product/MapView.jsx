import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle={
    width: '100%',
  height: '300px'
};
export default function MapView({lat, lng}){
  console.log("lat:", lat, "lng:", lng);

    const {isLoaded} =useLoadScript({
        googleMapsApiKey: 'AIzaSyCJNKjIq3ZI-I9-aQoLUd37u07hp2bGXCE',
    });
    if(!isLoaded) return <p>טוען צפנ....</p>
    return(
        <GoogleMap 
          mapContainerStyle={containerStyle}
          center={{lat,lng}}
          zoom={13}
        >
       <Marker position={{lat,lng}}></Marker>
        </GoogleMap>
    )
}