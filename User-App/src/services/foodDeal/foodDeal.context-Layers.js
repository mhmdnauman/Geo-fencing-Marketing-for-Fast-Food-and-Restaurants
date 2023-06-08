import React, {useState, useContext, createContext, useEffect} from "react";

import {LayersrestaurantsRequest, LayersrestaurantsTransform} from "./foodDeal.service-Layers";

import {LocationContext} from "../location/location.context";

export const LayersDealContext = createContext();

export const LayersDealContextProvider = ({children}) => {
  const [Layersrestaurants, setLayersrestaurants] = useState([]);
  const [isLayersLoading, setisLayersLoading] = useState(false);
  const [error, setError] = useState(null);
  const {location} = useContext(LocationContext);

  const retrieveLayersrestaurants = (loc) => {
    setisLayersLoading(true);
    setLayersrestaurants([]);

    setTimeout(() => {
      LayersrestaurantsRequest(loc)
        .then(LayersrestaurantsTransform)
        .then((results) => {
          setisLayersLoading(false);
          setLayersrestaurants(results);
        })
        .catch((err) => {
          setisLayersLoading(false);
          setError(err);
        });
    }, 2000);
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveLayersrestaurants(locationString);
    }
  }, [location]);

  return (
    <LayersDealContext.Provider
      value={{
        Layersrestaurants,
        isLayersLoading,
        error,
      }}>
      {children}
    </LayersDealContext.Provider>
  );
};
