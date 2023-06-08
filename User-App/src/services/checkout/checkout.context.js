import React, {createContext, useState, useEffect, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthenticationContext} from "../../services/authentication/authentication.context";
export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({children}) => {
  const {user} = useContext(AuthenticationContext);
  const [Checkout, setCheckout] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const saveCheckout = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@Checkout-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const loadCheckout = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@Checkout-${uid}`);
      if (value !== null) {
        setCheckout(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };

  const add = (restaurant) => {
    setCheckout([...Checkout, restaurant]);
  };

  const remove = (restaurant) => {
    const newCheckout = Checkout.filter(
      (x) => x.placeId !== restaurant.placeId
    );

    setCheckout(newCheckout);
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCheckout(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && Checkout.length) {
      saveCheckout(Checkout, user.uid);
    }
  }, [Checkout, user]);
  return (
    <CheckoutContext.Provider
      value={{
        Checkout,
        addToCheckout: add,
        removeFromCheckout: remove,
        quantity, updateQuantity
      }}>
      {children}
    </CheckoutContext.Provider>
  );
};
