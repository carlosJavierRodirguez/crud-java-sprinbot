import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RecoverPasswordScreen  from "../screens/RecoveryPasswordScreen";

const Stack = createNativeStackNavigator();

export default function Navigations() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }} // ✅ Ocultar barra en login
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }} // ✅ Ocultar barra en registro
            />
            <Stack.Screen
                name="PasswordRecover"
                component={RecoverPasswordScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
