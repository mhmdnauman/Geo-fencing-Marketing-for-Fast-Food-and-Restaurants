import React, { useEffect, useState } from 'react';
import { Geolocation, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import SERVERACCESS from "../../../SERVERACCESS";
import axios from 'axios';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


const LocationTracker = (props) => {
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    (async () => {
      setLongitude (props.lat);
      setLatitude (props.long);
      fetchNotification(latitude, longitude);

    })();
  }, []);

  
};


const fetchNotification = async (latitude, longitude) => {

  /*
  const response = await fetch(SERVERACCESS + "/geofence/processnotification",{
  
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      latitude: "33.695313",
      longitude: "73.013813"
    })
  
  });

  */

  try {

    const json = JSON.stringify({ 
      latitude: latitude, 
    longitude: longitude 
  });


    const response = await axios.post(SERVERACCESS + "/geofence/processnotification", json, {
 
 
      headers: {
    // Overwrite Axios's automatically set Content-Type
    'Content-Type': 'application/json'
  }
});


    const dataAsString = JSON.stringify(response.data);
    
    if(dataAsString!="false"){
    sendLocationNotification(dataAsString);
  }  
    // Use the dataAsString as needed
  } catch (error) {
    console.error(error);
  }


  
}


const sendLocationNotification = async (notification) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Try this Out!`,
        body: `${notification}`,
      },
      trigger: null, // Send immediately
    });
  };



export default LocationTracker;
