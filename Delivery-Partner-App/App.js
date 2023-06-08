import {StatusBar as ExpoStatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {ThemeProvider} from "styled-components/native";
import {initializeApp} from "firebase/app";
import {Navigation} from "./src/infrastructure/navigation";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {useFonts as useLato, Lato_400Regular} from "@expo-google-fonts/lato";

import {theme} from "./src/infrastructure/theme";

import {AuthenticationContextProvider} from "./src/services/authentication/authentication.context";

const firebaseConfig = {
 apiKey: "AIzaSyAQdoSsBoWluy4JaNgaSOpBfsOBsL2WlFs",
  authDomain: "deliverypartnerapp-6a4e8.firebaseapp.com",
  projectId: "deliverypartnerapp-6a4e8",
  storageBucket: "deliverypartnerapp-6a4e8.appspot.com",
  messagingSenderId: "253496641814",
  appId: "1:253496641814:web:6ebb0de238aac41fcee837"
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
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
