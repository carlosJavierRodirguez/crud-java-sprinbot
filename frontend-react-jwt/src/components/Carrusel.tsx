import React, { useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { AntDesign } from '@expo/vector-icons';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';


const screenWidth = Dimensions.get('window').width;
const carouselWidth = screenWidth * 0.65;
const carouselHeight = carouselWidth * 9 / 16;

const data = [
    {
        title: 'Criatura mitológica',
        image: { uri: 'https://www.clarin.com/2016/06/05/r1Vgy-14e_720x0.jpg' },
    },
    {
        title: 'Explorador en las montañas',
        image: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' },
    },
    {
        title: 'Manuscrito antiguo',
        image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Irk_bitig_07.jpg' },
    },
];

export default function CarruselComponent() {

    const carouselRef = useRef<ICarouselInstance>(null);

    return (
        <View style={styles.container}>
            <View style={styles.carouselWrapper}>

                {/* Botón Izquierda */}
                <TouchableOpacity onPress={() => carouselRef.current?.prev()} style={styles.arrow}>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>

                {/* Carrusel */}
                <Carousel
                    ref={carouselRef}
                    width={carouselWidth}
                    height={carouselHeight}
                    data={data}
                    autoPlay
                    autoPlayInterval={5000}
                    scrollAnimationDuration={800}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image} resizeMode="cover" />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    )}
                    loop
                />

                {/* Botón Derecha */}
                <TouchableOpacity onPress={() => carouselRef.current?.next()} style={styles.arrow}>
                    <AntDesign name="right" size={24} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
    },
    carouselWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrow: {
        width: 30,
        height: carouselHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    item: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
});
