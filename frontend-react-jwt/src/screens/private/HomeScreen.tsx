import React from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
} from "react-native";
import NavbarScreen from "../../components/Navbar";
import CarruselComponent from "../../components/Carrusel";
import FooterComponent from "../../components/Footer";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={Platform.OS === 'ios'}
            >
                <View style={styles.mainContent}>
                    <NavbarScreen />
                    <CarruselComponent />
                </View>

                {/* El footer siempre estará al final */}
                <FooterComponent />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        ...Platform.select({
            web: {
                minHeight: '100%', // Asegura altura mínima en web
            },
        }),
    },
    scrollContent: {
        flexGrow: 1, // Permite que el contenido crezca
    },
    mainContent: {
        flex: 1, // El contenido principal toma el espacio disponible
    },
});