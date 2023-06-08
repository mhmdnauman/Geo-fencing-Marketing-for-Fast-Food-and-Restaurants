import React from "react";

import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";

import {RestaurantsScreen} from "../../features/restaurants/screens/restaurants.screen";
import {KFCRestaurantDetailScreen} from "../../features/restaurants/screens/KFCrestaurant-detail.screen";
import {McRestaurantDetailScreen} from "../../features/restaurants/screens/Mcrestaurant-detail.screen";
import {LayersRestaurantDetailScreen} from "../../features/restaurants/screens/Layersrestaurant-detail.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}>
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="KFCRestaurantDetail"
        component={KFCRestaurantDetailScreen}
      />
      <RestaurantStack.Screen
        name="McRestaurantDetail"
        component={McRestaurantDetailScreen}
      />
      <RestaurantStack.Screen
        name="LayersRestaurantDetail"
        component={LayersRestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
