import React, {useState, useContext, createContext, useEffect} from "react";

import {McrestaurantsRequest, McrestaurantsTransform} from "./foodDeal.service-McDonalds";

import {LocationContext} from "../location/location.context";

export const McDealContext = createContext();

export const McDealContextProvider = ({children}) => {
  const [Mcrestaurants, setMcrestaurants] = useState([]);
  const [isMcLoading, setisMcLoading] = useState(false);
  const [error, setError] = useState(null);
  const {location} = useContext(LocationContext);

  const retrieveMcrestaurants = (loc) => {
    setisMcLoading(true);
    setMcrestaurants([]);

    setTimeout(() => {
      McrestaurantsRequest(loc)
        .then(McrestaurantsTransform)
        .then((results) => {
          setisMcLoading(false);
          setMcrestaurants(results);
        })
        .catch((err) => {
          setisMcLoading(false);
          setError(err);
        });
    }, 2000);
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveMcrestaurants(locationString);
    }
  }, [location]);

  return (
    <McDealContext.Provider
      value={{
        Mcrestaurants,
        isMcLoading,
        error,
      }}>
      {children}
    </McDealContext.Provider>
  );
};
