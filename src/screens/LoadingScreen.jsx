import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground, Dimensions } from 'react-native';

const LoadingScreen = () => {
    const [randomImage, setRandomImage] = useState(null);

    // Imagens aleatórias
    const images = [
        require('../assets/imgs/loading1.jpg'),
        require('../assets/imgs/loading2.jpg'),
        require('../assets/imgs/loading3.jpg'),
    ];

    // Escolher uma imagem aleatória
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
    }, []);

    return (
        <View style={styles.container}>
            {randomImage && (
                <ImageBackground
                    source={randomImage}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <ActivityIndicator
                        size="large"
                        color="#ffffff"
                        style={styles.loadingIndicator}
                    />
                </ImageBackground>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIndicator: {
        position: 'absolute',
    },
});

export default LoadingScreen;
