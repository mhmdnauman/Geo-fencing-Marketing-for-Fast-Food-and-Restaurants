// Define the geofence coordinates
const geofenceCoordinates = [
    { latitude: 37.7749, longitude: -122.4194 }, // Example coordinate 1 (San Francisco)
    { latitude: 34.0522, longitude: -118.2437 }, // Example coordinate 2 (Los Angeles)
    // Add more coordinates as needed
  ];
  
  // Function to check if a device is within the geofence
  function checkGeofence(latitude, longitude) {
    for (const coordinate of geofenceCoordinates) {
      const { latitude: fenceLat, longitude: fenceLng } = coordinate;
      const distance = getDistance(latitude, longitude, fenceLat, fenceLng);
  
      // Define the radius in meters for the geofence
      const radius = 1000; // 1000 meters = 1 kilometer
  
      if (distance <= radius) {
        // Device is within the geofence
        return true;
      }
    }
  
    // Device is outside the geofence
    return false;
  }
  
  // Function to calculate the distance between two coordinates using the Haversine formula
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Convert distance to meters
    return distance;
  }
  
  // Function to convert degrees to radians
  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }
  
  // Usage example
  const currentLatitude = 37.7749; // Example current latitude
  const currentLongitude = -122.4194; // Example current longitude
  
  if (checkGeofence(currentLatitude, currentLongitude)) {
    console.log("Device is within the geofence");
  } else {
    console.log("Device is outside the geofence");
  }
  