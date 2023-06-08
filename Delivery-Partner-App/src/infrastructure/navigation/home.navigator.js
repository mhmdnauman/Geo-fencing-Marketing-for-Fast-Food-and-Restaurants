import React from "react";
import { HomeScreen } from "../../features/home/home.screen";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const HomeStack = createStackNavigator();

export const HomeNavigator = ({route, navigation}) => {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <HomeStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={HomeScreen}
      />
      
     
    </HomeStack.Navigator>
  );
};
