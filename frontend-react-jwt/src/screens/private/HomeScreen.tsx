import React from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    Text,
} from "react-native";
import NavbarScreen from "../../components/Navbar";
import CarruselComponent from "../../components/Carrusel";
import FooterComponent from "../../components/Footer";
import { validateAuth } from "../../api/Token";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/types";

export default function HomeScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


    useEffect(() => {
        validateAuth(navigation);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={Platform.OS === 'ios'}
            >
                <View >
                    <NavbarScreen />

                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <CarruselComponent />
                    </View>

                    {/* Secciones con diseño limpio */}
                    <View style={styles.sectionsContainer}>

                        {/* Sección Artefactos */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionSubtitle}>Algunos</Text>
                                <Text style={styles.sectionTitle}>Artefactos</Text>
                                <Text style={styles.sectionDescription}>Encontrados en el mundo</Text>
                                <View style={styles.decorativeLine} />
                            </View>

                            {/* Contenido de artefactos */}
                            <View style={styles.contentArea}>
                                <Text style={styles.placeholderText}>🏺 Contenido de Artefactos</Text>
                            </View>
                        </View>

                        {/* Sección Exploradores */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionSubtitle}>Nuestros</Text>
                                <Text style={styles.sectionTitle}>Mejores Exploradores</Text>
                                <Text style={styles.sectionDescription}>Descubridores de mundos ocultos</Text>
                                <View style={styles.decorativeLine} />
                            </View>

                            {/* Contenido de exploradores */}
                            <View style={styles.contentArea}>
                                <Text style={styles.placeholderText}>🧭 Contenido de Exploradores</Text>
                            </View>
                        </View>

                        {/* Sección Criaturas */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionSubtitle}>Criaturas</Text>
                                <Text style={styles.sectionTitle}>Misteriosas</Text>
                                <Text style={styles.sectionDescription}>Encontradas en el mundo</Text>
                                <View style={styles.decorativeLine} />
                            </View>

                            {/* Contenido de criaturas */}
                            <View style={styles.contentArea}>
                                <Text style={styles.placeholderText}>🐉 Contenido de Criaturas</Text>
                            </View>

                        </View>

                    </View>
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
        backgroundColor: '#ffffff',
        ...Platform.select({
            web: {
                minHeight: '100%',
            },
        }),
    },
    scrollContent: {
        flexGrow: 1,
    },
    heroSection: {
        marginBottom: 50,
    },
    sectionsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        alignItems: 'center',
        marginBottom: 40,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#2a9d8f',
        fontWeight: '600',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 8,
        ...Platform.select({
            web: {
                fontFamily: 'system-ui, -apple-system, sans-serif',
            },
        }),
    },
    sectionTitle: {
        fontSize: Platform.OS === 'web' ? 36 : 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.8,
        ...Platform.select({
            web: {
                fontFamily: 'system-ui, -apple-system, sans-serif',
            },
        }),
    },
    sectionDescription: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        fontWeight: '400',
        lineHeight: 26,
        marginBottom: 20,
        maxWidth: 400,
    },
    decorativeLine: {
        width: 80,
        height: 4,
        backgroundColor: '#2a9d8f',
        borderRadius: 2,
        alignSelf: 'center',
    },
    contentArea: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: '#f8fafb',
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#2a9d8f',
        ...Platform.select({
            web: {
                minHeight: 200,
            },
            default: {
                minHeight: 150,
            }
        }),
    },
    placeholderText: {
        fontSize: 20,
        color: '#888',
        fontWeight: '500',
        textAlign: 'center',
    },
});