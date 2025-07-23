import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/types";
import { Ionicons } from "@expo/vector-icons";

export default function NavbarScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const currentRoute = route.name;

    const [menuVisible, setMenuVisible] = useState(false);
    const screenWidth = Dimensions.get("window").width;
    const isMobile = screenWidth < 768;

    const getNavItemStyle = (routeName: string) => {
        return currentRoute === routeName
            ? [styles.navItem, styles.activeNavItem]
            : styles.navItem;
    };

    const toggleMenu = () => setMenuVisible(prev => !prev);

    return (
        <View style={styles.navbar}>

            <View style={styles.brandContainer}>

                <Image
                    resizeMode="contain"
                    source={require("../../assets/img/logo.jpg")}
                    style={styles.logo}
                />

                <Text style={styles.brandText}>
                    EXPLOR<Text style={styles.textGreen}>ER</Text>
                </Text>
                
            </View>

            {isMobile ? (
                <>
                    <TouchableOpacity onPress={toggleMenu}>
                        <Ionicons name="menu" size={28} color="#2a9d8f" />
                    </TouchableOpacity>

                    {menuVisible && (
                        <View style={styles.mobileMenu}>

                            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate("Home"); }}>
                                <Text style={getNavItemStyle("Home")}>Inicio</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate("Register"); }}>
                                <Text style={getNavItemStyle("Register")}>Registrar</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </>
            ) : (
                <View style={styles.linksContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Text style={getNavItemStyle("Home")}>Inicio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={getNavItemStyle("Register")}>Registrar</Text>
                    </TouchableOpacity>

                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        height: 70,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        zIndex: 10,
    },
    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        height: 48,
        width: 48,
        borderRadius: 10,
        marginRight: 10,
    },
    brandText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#222",
    },
    textGreen: {
        color: "#2a9d8f",
    },
    linksContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    navItem: {
        fontSize: 16,
        color: "#555",
        marginHorizontal: 12,
        paddingVertical: 6,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    activeNavItem: {
        borderBottomColor: "#2a9d8f",
        fontWeight: "bold",
        color: "#2a9d8f",
    },
    mobileMenu: {
        position: "absolute",
        top: 70,
        right: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        elevation: 4,
    },
});
