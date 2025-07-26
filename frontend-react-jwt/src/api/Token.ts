import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { RootStackParamList } from "../navigations/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const setToken = async (token: string) => {
    try {
        await AsyncStorage.setItem("token", token);
    } catch (error) {
        console.log(error);
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem("token");
    } catch (error) {
        return null;
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        console.log(error);
    }
};

export const validateAuth = async (navigation: NativeStackNavigationProp<RootStackParamList>) => {
    const token = await getToken();
    if (!token) {
        navigation.navigate("Login");
        return;
    }

    try {
        const decoded: any = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
            await removeToken();
            navigation.navigate("Login");
        }
    } catch (e) {
        await removeToken();
        navigation.navigate("Login");
    }
};