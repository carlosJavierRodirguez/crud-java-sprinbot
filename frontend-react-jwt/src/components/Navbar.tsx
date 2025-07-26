import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/types";
import { Ionicons } from "@expo/vector-icons";
import { removeToken } from "../api/Token";
import { getProfile } from "../api/UserApi";
import { useEffect } from 'react';

export default function NavbarScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const currentRoute = route.name;

    // Datos del usuario 
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        role: '',
        // avatar: ''
    });

    const [menuVisible, setMenuVisible] = useState(false);
    const [profileVisible, setProfileVisible] = useState(false);

    const screenWidth = Dimensions.get("window").width;
    const isMobile = screenWidth < 768;

    const getNavItemStyle = (routeName: string) => {
        return currentRoute === routeName
            ? [styles.navItem, styles.activeNavItem]
            : styles.navItem;
    };

    // Cargar el perfil cuando se monta el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getProfile();
                if (data && data.username && data.email) {
                    setUserData(data);
                } else {
                    console.warn("No se pudo obtener información del usuario:", data);
                }
            } catch (error) {
                console.error("Error al obtener el perfil:", error);
            }
        };

        fetchUserData();
    }, []);

    const toggleMenu = () => setMenuVisible(prev => !prev);
    const toggleProfile = () => setProfileVisible(prev => !prev);

    const ProfileModal = () => (
        <Modal
            visible={profileVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setProfileVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setProfileVisible(false)}
            >
                <View style={styles.profileModal}>
                    <View style={styles.profileHeader}>
                        {/* <Image
                            source={{ uri: userData.avatar }}
                            style={styles.avatarLarge}
                        /> */}
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{userData.username}</Text>
                            <Text style={styles.profileRole}>{userData.role}</Text>
                            <Text style={styles.profileEmail}>{userData.email}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.profileActions}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.logoutButton]}
                            onPress={() => {
                                // Elimina el token
                                removeToken();

                                // Cierra el modal
                                setProfileVisible(false);

                                // Navega a la pantalla de inicio
                                navigation.navigate("Login");

                                console.log("Cerrando sesión...");
                            }}>

                            <Ionicons name="log-out-outline" size={16} color="#fff" />
                            <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );

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

            {/* Navegação Central */}
            {!isMobile && (
                <View style={styles.linksContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Text style={getNavItemStyle("Home")}>Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Explorer")}>
                        <Text style={getNavItemStyle("Explorer")}>Exploradores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("LegendsCreatures")}>
                        <Text style={getNavItemStyle("LegendsCreatures")}>Legendas y criaturas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("GodsArtifacts")}>
                        <Text style={getNavItemStyle("GodsArtifacts")}>Dioses y artefactos</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Área de Usuario y Menu */}
            <View style={styles.rightSection}>
                {/* Perfil de Usuario */}
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={toggleProfile}
                >
                    {/* <Image
                        source={{ uri: userData.avatar }}
                        style={styles.avatar}
                    /> */}
                    {!isMobile && (
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{userData.username.split(' ')[0]}</Text>
                            <Text style={styles.userRole}>{userData.role}</Text>
                        </View>
                    )}
                    <Ionicons
                        name="chevron-down"
                        size={16}
                        color="#666"
                        style={styles.dropdownIcon}
                    />
                </TouchableOpacity>

                {/* Menu Mobile */}
                {isMobile && (
                    <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                        <Ionicons name="menu" size={28} color="#2a9d8f" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Mobile Menu */}
            {isMobile && menuVisible && (
                <View style={styles.mobileMenu}>
                    <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate("Home"); }}>
                        <Text style={getNavItemStyle("Home")}>Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate("Explorer"); }}>
                        <Text style={getNavItemStyle("Explorer")}>Exploradores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate("LegendsCreatures"); }}>
                        <Text style={getNavItemStyle("LegendsCreatures")}>Legendas y criaturas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate("GodsArtifacts"); }}>
                        <Text style={getNavItemStyle("GodsArtifacts")}>Dioses y artefactos</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Profile Modal */}
            <ProfileModal />
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
    }, separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
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
        justifyContent: "center",
        flex: 1,
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
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#f8f9fa",
        marginRight: 10,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#2a9d8f",
    },
    userInfo: {
        marginLeft: 8,
        marginRight: 4,
    },
    userName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    userRole: {
        fontSize: 12,
        color: "#666",
    },
    dropdownIcon: {
        marginLeft: 4,
    },
    menuButton: {
        marginLeft: 8,
    },
    mobileMenu: {
        position: "absolute",
        top: 70,
        right: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        minWidth: 200,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    profileModal: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        margin: 20,
        maxWidth: 350,
        width: "90%",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    avatarLarge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#2a9d8f",
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    profileRole: {
        fontSize: 14,
        color: "#2a9d8f",
        fontWeight: "600",
        marginBottom: 2,
    },
    profileEmail: {
        fontSize: 12,
        color: "#666",
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    statText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#555",
    },
    profileActions: {
        alignItems: 'center',
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2a9d8f",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        minWidth: 140,
        justifyContent: "center",
    },
    logoutButton: {
        backgroundColor: "#e74c3c",
    },
    actionButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 6,
    },
});