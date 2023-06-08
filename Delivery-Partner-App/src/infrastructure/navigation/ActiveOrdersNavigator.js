import React from "react";

import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";

import {ActiveOrdersScreen} from "../../features/restaurants/screens/ActiveOrders.Screen";

const RestaurantStack = createStackNavigator();

export const ActiveOrdersNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}>
      <RestaurantStack.Screen
        name="Restaurants"
        component={ActiveOrdersScreen}
      />
      {/* <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      /> */}
    </RestaurantStack.Navigator>
  );
};
