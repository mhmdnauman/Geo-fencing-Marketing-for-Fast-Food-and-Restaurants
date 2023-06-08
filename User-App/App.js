import {StatusBar as ExpoStatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {ThemeProvider} from "styled-components/native";
import {initializeApp} from "firebase/app";
import {Navigation} from "./src/infrastructure/navigation";
import LocationTracker from "./src/features/GeofencingMarketing/LocationTracker";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {useFonts as useLato, Lato_400Regular} from "@expo-google-fonts/lato";

import {theme} from "./src/infrastructure/theme";

import {AuthenticationContextProvider} from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyCOQqn9KpFT_flLSn57nwUmaSb0Wva0IPo",
  authDomain: "couchpotato-fbffe.firebaseapp.com",
  projectId: "couchpotato-fbffe",
  storageBucket: "couchpotato-fbffe.appspot.com",
  messagingSenderId: "793316324971",
  appId: "1:793316324971:web:c3fea78475010b9b75a32e",
};

initializeApp(firebaseConfig);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
      <LocationTracker/>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
