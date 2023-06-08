import React from "react";

import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";

import {OrdersScreen} from "../../features/restaurants/screens/OrderRequests.Screen";

const RestaurantStack = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}>
      <RestaurantStack.Screen
              name="OrdersScreen"
              component={OrdersScreen}
      />
      {/* <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      /> */}
    </RestaurantStack.Navigator>
  );
};
