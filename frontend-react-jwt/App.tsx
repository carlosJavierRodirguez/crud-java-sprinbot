import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigations from "./src/navigations/Navigations";
import Toast from "react-native-toast-message";
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <Navigations />
      <Toast />
    </NavigationContainer>
  );
}
