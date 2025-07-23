import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FooterComponent() {
    const handleLinkPress = (url: string) => {
        if (Platform.OS === 'web') {
            window.open(url);
        } else {
            Linking.openURL(url);
        }
    };

    return (
        <View style={styles.footerContainer}>
            <View style={styles.footer}>
                <View style={styles.footerTop}>
                    <Text style={styles.brandText}>
                        EXPLOR<Text style={styles.textGreen}>ER</Text>
                    </Text>

                    <Text style={styles.description}>
                        Explora el mundo sin límites. Aventuras épicas, destinos ocultos y experiencias inolvidables
                        te esperan. Únete a la comunidad de exploradores.
                    </Text>
                </View>

                <View style={styles.footerBottom}>
                    <View style={styles.socials}>
                        <TouchableOpacity
                            onPress={() => handleLinkPress('www.linkedin.com/in/carlos-javier-rodriguez-manchola')}
                            style={styles.socialButton}
                            accessibilityLabel="LinkedIn"
                        >
                            <FontAwesome name="linkedin-square" size={24} color="#0077B5" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleLinkPress('carlosjavi1887@gmail.com')}
                            style={styles.socialButton}
                            accessibilityLabel="Email"
                        >
                            <FontAwesome name="envelope" size={24} color="#888" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.smallText}>Hecho en Colombia 🇨🇴</Text>
                    <Text style={styles.copyright}>© 2025 Explorer. Todos los derechos reservados.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 50, // Esto empuja el footer hacia abajo
        ...Platform.select({
            web: {
                position: 'relative',
                bottom: 0,
                width: '100%',
            },
            default: {
                // Para móvil no necesitamos position absolute
            }
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
    footerTop: {
        marginBottom: 20,
        alignItems: 'center',
        maxWidth: width > 768 ? 600 : '100%',
        alignSelf: 'center',
    },
    brandText: {
        fontSize: Platform.OS === 'web' ? 28 : 24,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
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
        textAlign: 'center',
        lineHeight: Platform.OS === 'web' ? 24 : 20,
        paddingHorizontal: 10,
        maxWidth: Platform.OS === 'web' ? 500 : '100%',
    },
    footerBottom: {
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    socials: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            web: {
                gap: 24,
            },
            default: {
                // Para móvil usamos marginHorizontal en socialButton
            }
        }),
    },
    socialButton: {
        padding: 8,
        borderRadius: 8,
        marginHorizontal: Platform.OS === 'web' ? 0 : 12,
        ...Platform.select({
            web: {
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                ':hover': {
                    transform: 'scale(1.1)',
                },
            },
        }),
    },
    smallText: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
        fontWeight: '500',
    },
    copyright: {
        fontSize: 10,
        color: '#aaa',
        textAlign: 'center',
    },
});