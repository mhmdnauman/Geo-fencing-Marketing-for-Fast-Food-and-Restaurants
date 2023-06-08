const express = require("express");
const router = express.Router();
const Restaurants = require("../models/restaurants");
const Items = require("../models/Items");

router.post("/resloc", async (req, res) => {

  let KFC = [];
  let MC = [];
  let LAY = [];
  try {
    let restaurantsLocKFC = await Restaurants.findById(
      "642d20830a49e5e0eca5a887"
    );

    for (let i = 0; i < restaurantsLocKFC.location.length; i++) {
      console.log(restaurantsLocKFC.location[i]);
      KFC.push(restaurantsLocKFC.location[i])
    }

    let restaurantsLocMc = await Restaurants.findById(
      "642d20dc0a49e5e0eca5a888"
    );

    for (let i = 0; i < restaurantsLocMc.location.length; i++) {
      console.log(restaurantsLocMc.location[i]);
      MC.push(restaurantsLocMc.location[i]);
    }

    let restaurantsLocLayers = await Restaurants.findById(
      "642d210d0a49e5e0eca5a889"
    );

    for (let i = 0; i < restaurantsLocLayers.location.length; i++) {
      console.log(restaurantsLocLayers.location[i]);
      LAY.push(restaurantsLocLayers.location[i]);
    }



    let Locations = {
      KFC: KFC,
      MC: MC,
      LAY: LAY
    }

    res.send(Locations.KFC[0]);


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

router.post("/processnotification", async (req, res) => {
  let IsInsideGeofence = false;
  let restaurantsLoc = await Restaurants.findById("642d20830a49e5e0eca5a887");

  for (let i = 0; i < restaurantsLoc.location.length; i++) {
    try {
      const latitude = await req.body.latitude;
      const longitude = await req.body.longitude;

      const [geofenceLatitude, geofenceLongitude] = restaurantsLoc.location[i];

      const geofenceRadius = 5000000; // in meters

      // Calculate distance between user's location and geofence center
      const distance = calculateDistance(
        latitude,
        longitude,
        geofenceLatitude,
        geofenceLongitude
      );

      // Check if the user is inside the geofence
      if (distance <= geofenceRadius) {
        IsInsideGeofence = true;
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error checking geofence:", error);
    }
  }

  if (IsInsideGeofence) {
    let items = [];
    items.push(await Items.find({ resname: "KFC" }));

    const randomIndex = Math.floor(Math.random() * items.length);

    // Access a random instance from the array
    const randomInstance = items[randomIndex];
    const randomFoodIndex = Math.floor(Math.random() * randomInstance.length);
    // Extract the price and title
    const DealPrice = randomInstance[randomFoodIndex].price;
    const Dealname = randomInstance[randomFoodIndex].title;
    const Dealresname = randomInstance[randomFoodIndex].resname;

    Notification =
      "Check Out this new " +
      Dealresname +
      " deal " +
      Dealname +
      " for Only Rs. " +
      DealPrice;
    res.json(Notification);
    return;
  }

  restaurantsLoc = await Restaurants.findById("642d20dc0a49e5e0eca5a888");

  for (let i = 0; i < restaurantsLoc.location.length; i++) {
    try {
      const latitude = await req.body.latitude;
      const longitude = await req.body.longitude;

      const [geofenceLatitude, geofenceLongitude] = restaurantsLoc.location[i];

      const geofenceRadius = 5000000; // in meters

      // Calculate distance between user's location and geofence center
      const distance = calculateDistance(
        latitude,
        longitude,
        geofenceLatitude,
        geofenceLongitude
      );

      // Check if the user is inside the geofence
      if (distance <= geofenceRadius) {
        IsInsideGeofence = true;
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error checking geofence:", error);
    }
  }

  if (IsInsideGeofence) {
    let items = [];
    items.push(await Items.find({ resname: "McDonalds" }));

    const randomIndex = Math.floor(Math.random() * items.length);

    // Access a random instance from the array
    const randomInstance = items[randomIndex];
    const randomFoodIndex = Math.floor(Math.random() * randomInstance.length);
    // Extract the price and title
    const DealPrice = randomInstance[randomFoodIndex].price;
    const Dealname = randomInstance[randomFoodIndex].title;
    const Dealresname = randomInstance[randomFoodIndex].resname;

    Notification =
      "Check Out this new " +
      Dealresname +
      " deal " +
      Dealname +
      " for Only Rs. " +
      DealPrice;
    res.json(Notification);
    return;
  }

  restaurantsLoc = await Restaurants.findById("642d210d0a49e5e0eca5a889");

  for (let i = 0; i < restaurantsLoc.location.length; i++) {
    try {
      const latitude = await req.body.latitude;
      const longitude = await req.body.longitude;

      const [geofenceLatitude, geofenceLongitude] = restaurantsLoc.location[i];

      const geofenceRadius = 500000; // in meters

      // Calculate distance between user's location and geofence center
      const distance = calculateDistance(
        latitude,
        longitude,
        geofenceLatitude,
        geofenceLongitude
      );

      // Check if the user is inside the geofence
      if (distance <= geofenceRadius) {
        IsInsideGeofence = true;
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error checking geofence:", error);
    }
  }

  if (IsInsideGeofence) {
    let items = [];
    items.push(await Items.find({ resname: "Layers" }));

    const randomIndex = Math.floor(Math.random() * items.length);

    // Access a random instance from the array
    const randomInstance = items[randomIndex];
    const randomFoodIndex = Math.floor(Math.random() * randomInstance.length);
    // Extract the price and title
    const DealPrice = randomInstance[randomFoodIndex].price;
    const Dealname = randomInstance[randomFoodIndex].title;
    const Dealresname = randomInstance[randomFoodIndex].resname;

    Notification =
      "Check Out this new " +
      Dealresname +
      " deal " +
      Dealname +
      " for Only Rs. " +
      DealPrice;
    res.json(Notification);
    return;
  }

  if (IsInsideGeofence == false) {
    res.json("False");
  }
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Convert to meters
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

module.exports = router;
