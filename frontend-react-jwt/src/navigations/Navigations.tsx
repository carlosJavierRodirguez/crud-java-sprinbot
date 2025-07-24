import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/public/LoginScreen";
import RegisterScreen from "../screens/public/RegisterScreen";
import RecoverPasswordScreen from "../screens/public/RecoveryPasswordScreen";
import HomeScreen from "../screens/private/HomeScreen";
import ExplorerScreen from "../screens/private/ExplorerScreen";
import LegendsCreaturesScreen from "../screens/private/LegendsCreaturesScreen";
import GodsArtifactsScreen from "../screens/private/GodsArtifactsScreen";

const Stack = createNativeStackNavigator();

export default function Navigations() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PasswordRecover"
                component={RecoverPasswordScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Explorer"
                component={ExplorerScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LegendsCreatures"
                component={LegendsCreaturesScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="GodsArtifacts"
                component={GodsArtifactsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
