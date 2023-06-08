import React from "react";

import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";

import {FoodDealScreen} from "../../features/FoodDeal/screens/foodDeal.screen";
import {FoodDealDetailScreen} from "../../features/FoodDeal/screens/foodDeal-detail.screen";

const RestaurantStack = createStackNavigator();

export const FoodDealNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}>
      <RestaurantStack.Screen name="FoodDeal" component={FoodDealScreen} />
      <RestaurantStack.Screen
        name="FoodDealDetail"
        component={FoodDealDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
