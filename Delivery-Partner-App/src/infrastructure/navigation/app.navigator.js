import React from "react";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";

import {SettingsNavigator} from "./settings.navigator";

import {RestaurantsContextProvider} from "../../services/restaurants/restaurants.context";
import {LocationContextProvider} from "../../services/location/location.context";
import {OrdersNavigator} from "./Orders.navigator";
import {ActiveOrdersNavigator} from "./ActiveOrdersNavigator";
// import {CartContextProvider} from "../../services/cart/cart.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  OrderRequests: "fast-food-sharp",
  ActiveOrders: "bicycle-sharp",
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
  
    <LocationContextProvider>
      <RestaurantsContextProvider>
      
            <Tab.Navigator
              screenOptions={createScreenOptions}
              tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
              }}>
              <Tab.Screen name="OrderRequests" component={OrdersNavigator} />
              <Tab.Screen name="ActiveOrders" component={ActiveOrdersNavigator} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
         
      </RestaurantsContextProvider>
    </LocationContextProvider>
  
);
