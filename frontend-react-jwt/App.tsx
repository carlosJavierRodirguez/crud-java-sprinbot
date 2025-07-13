import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigations from "./src/navigations/Navigations";

export default function App() {
  return (
    <NavigationContainer>
      <Navigations />
    </NavigationContainer>
  );
}
