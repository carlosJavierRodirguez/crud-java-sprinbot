import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FooterComponent() {
    const handleLinkPress = (url: string) => {
        if (Platform.OS === 'web') {
            window.open(url, '_blank');
        } else {
            Linking.openURL(url);
        }
    };

    const handleEmailPress = () => {
        handleLinkPress('mailto:carlosjavi1887@gmail.com');
    };

    const handleLinkedInPress = () => {
        handleLinkPress('https://www.linkedin.com/in/carlos-javier-rodriguez-manchola');
    };

    const handlePhonePress = () => {
        handleLinkPress('https://wa.me/3117657164');
    };

    return (
        <View style={styles.footerContainer}>
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    {/* Columna Izquierda - Brand */}
                    <View style={styles.leftColumn}>
                        <Text style={styles.brandText}>
                            EXPLOR<Text style={styles.textGreen}>ER</Text>
                        </Text>
                        <Text style={styles.description}>
                            Embárcate en una aventura sin fronteras. Descubre lugares ocultos, vive historias legendarias y
                            conecta con una comunidad apasionada por explorar lo desconocido.
                            Tu próxima gran aventura comienza aquí.
                        </Text>
                    </View>

                    {/* Columna Derecha - Contacto */}
                    <View style={styles.rightColumn}>
                        <Text style={styles.contactTitle}>Contacto</Text>

                        <View style={styles.contactItem}>
                            <TouchableOpacity
                                onPress={handleLinkedInPress}
                                style={styles.contactButton}
                                accessibilityLabel="LinkedIn"
                            >
                                <FontAwesome name="linkedin-square" size={20} color="#0077B5" />
                                <Text style={styles.contactText}>Carlos Javier Rodriguez Manchola</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.contactItem}>
                            <TouchableOpacity
                                onPress={handleEmailPress}
                                style={styles.contactButton}
                                accessibilityLabel="Email"
                            >
                                <FontAwesome name="envelope" size={20} color="#888" />
                                <Text style={styles.contactText}>carlosjavi1887@gmail.com</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.contactItem}>
                            <TouchableOpacity
                                onPress={handlePhonePress}
                                style={styles.contactButton}
                                accessibilityLabel="Email"
                            >
                                <FontAwesome name="phone" size={20} color="#888" />
                                <Text style={styles.contactText}>+57 311 765 7164</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                {/* Footer Bottom - Copyright */}
                <View style={styles.footerBottom}>
                    <View style={styles.divider} />
                    <View style={styles.bottomContent}>
                        <Text style={styles.copyright}>© 2025 Explorer. Todos los derechos reservados.</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 50,
        ...Platform.select({
            web: {
                position: 'relative',
                bottom: 0,
                width: '100%',
            },
            default: {},
        }),
    },
    footer: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        backgroundColor: '#e0dbdbff',
        borderTopWidth: 1,
        borderColor: '#ddd',
        minHeight: Platform.OS === 'web' ? 200 : 180,
        ...Platform.select({
            web: {
                boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            },
            default: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: -2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 5,
            }
        }),
    },
    footerContent: {
        flexDirection: width > 768 ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: width > 768 ? 'flex-start' : 'center',
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
    },
    leftColumn: {
        flex: width > 768 ? 2 : 1,
        alignItems: width > 768 ? 'flex-start' : 'center',
        marginBottom: width > 768 ? 0 : 24,
        paddingRight: width > 768 ? 20 : 0,
    },
    rightColumn: {
        flex: width > 768 ? 1 : 1,
        alignItems: width > 768 ? 'flex-start' : 'stretch', // 'stretch' hace que los elementos ocupen todo el ancho
        minWidth: width > 768 ? 250 : '100%',
        width: '100%', // Asegura que ocupe todo el ancho disponible
    },
    brandText: {
        fontSize: Platform.OS === 'web' ? 28 : 24,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 12,
        textAlign: width > 768 ? 'left' : 'center',
        ...Platform.select({
            web: {
                fontFamily: 'system-ui, -apple-system, sans-serif',
            },
        }),
    },
    textGreen: {
        color: '#2a9d8f',
    },
    description: {
        fontSize: Platform.OS === 'web' ? 16 : 14,
        color: '#444',
        textAlign: width > 768 ? 'left' : 'center',
        lineHeight: Platform.OS === 'web' ? 24 : 20,
        maxWidth: width > 768 ? 400 : '100%',
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 16,
        textAlign: width > 768 ? 'left' : 'center',
    },
    contactItem: {
        marginBottom: 12,
        width: '100%',
        minHeight: 40, // Altura mínima consistente para todos los items
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: '100%', // Ocupa todo el ancho disponible
        justifyContent: 'flex-start', // Alinea el contenido a la izquierda
        ...Platform.select({
            web: {
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ':hover': {
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    transform: 'translateX(5px)',
                },
            },
        }),
    },
    contactText: {
        marginLeft: 12,
        fontSize: 14,
        color: '#444',
        fontWeight: '500',
        flex: 1, // Permite que el texto ocupe el espacio restante
        flexWrap: 'wrap', // Permite que el texto se divida en líneas si es necesario
    },
    footerBottom: {
        alignItems: 'center',
        width: '100%',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginBottom: 16,
    },
    bottomContent: {
        alignItems: 'center',
        justifyContent: width > 768 ? 'space-between' : 'center',
        width: '100%',
        maxWidth: 1200,
    },
    smallText: {
        fontSize: 12,
        color: '#888',
        marginBottom: width > 768 ? 0 : 4,
        fontWeight: '500',
    },
    copyright: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
    },
});