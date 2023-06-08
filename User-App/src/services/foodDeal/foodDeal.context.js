import React, {useState, useContext, createContext, useEffect} from "react";

import {restaurantsRequest, restaurantsTransform} from "./foodDeal.service";

import {LocationContext} from "../location/location.context";

export const FoodDealContext = createContext();

export const FoodDealContextProvider = ({children}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {location} = useContext(LocationContext);

  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);

    setTimeout(() => {
      restaurantsRequest(loc)
        .then(restaurantsTransform)
        .then((results) => {
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <FoodDealContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
        setRestaurants
      }}>
      {children}
    </FoodDealContext.Provider>
  );
};
