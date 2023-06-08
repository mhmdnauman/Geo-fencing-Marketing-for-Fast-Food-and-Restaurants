import React from "react";
import {SettingsScreen} from "../../features/settings/screens/settings.screen";
import {FavouritesScreen} from "../../features/settings/screens/favourites.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import {CameraScreen} from "../../features/settings/screens/camera.screen";
import { RateScreen } from "../../features/RateandReview/screens/rateandreview.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({route, navigation}) => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favourites" component={FavouritesScreen} />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
      <SettingsStack.Screen
        name="Rate"
        component={RateScreen}
      />
    </SettingsStack.Navigator>
  );
};
