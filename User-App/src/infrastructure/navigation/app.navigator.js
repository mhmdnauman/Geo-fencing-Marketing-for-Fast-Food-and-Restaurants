import React from "react";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";

import {SettingsNavigator} from "./settings.navigator";

import {RestaurantsContextProvider} from "../../services/restaurants/restaurants.context";
import {LocationContextProvider} from "../../services/location/location.context";
import {FavouritesContextProvider} from "../../services/favourites/favourites.context";
import {RestaurantsNavigator} from "./restaurants.navigator";
import {MapScreen} from "../../features/map/screens/map.screen";
import {CheckoutNavigator} from "./checkout.navigator";
import {FoodDealNavigator} from "./foodDealNavigator";
import {FoodDealContextProvider} from "../../services/foodDeal/foodDeal.context";
import {CheckoutContextProvider} from "../../services/checkout/checkout.context";
import {McDealContextProvider} from "../../services/foodDeal/foodDeal.context-McDonalds";
import {LayersDealContextProvider} from "../../services/foodDeal/foodDeal.context-Layers";
// import {CartContextProvider} from "../../services/cart/cart.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  FoodDeal: "md-fast-food",
  Checkout: "md-cart",
  TrackOrders: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = ({route}) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({size, color}) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <FoodDealContextProvider> 
          <McDealContextProvider>
            <LayersDealContextProvider>
          <CheckoutContextProvider>
            <Tab.Navigator
              screenOptions={createScreenOptions}
              tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
              }}>
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="FoodDeal" component={FoodDealNavigator} />
              <Tab.Screen name="Checkout" component={CheckoutNavigator} />
              <Tab.Screen name="TrackOrders" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </CheckoutContextProvider>
          </LayersDealContextProvider>
          </McDealContextProvider>
        </FoodDealContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
