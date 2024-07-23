import React from 'react';
import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { colors, grays } from '../styles/globalStyles';

export default function GroupDay({ navigation, agrupamento, dia, musculos, onPress }) {
    return (
        <Pressable onPress={onPress}>
            <ImageBackground
                source={style.backgroundImage(agrupamento)}
                style={style.container}
                resizeMode="cover"
            >
                <View style={style.content}>
                    <Text style={style.title}>{agrupamento}</Text>
                    <Text style={style.dia}>Dia {dia}</Text>
                    <Text style={style.musculo}>{musculos[0]}</Text>
                    <Text style={style.musculo}>{musculos[1]}</Text>
                    <Text style={style.musculo}>{musculos[2]}</Text>
                </View>
            </ImageBackground>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        elevation:5
    },
    backgroundImage: (agrupamento) => {
        switch (agrupamento) {
            case 'Abdomen':
                return require('../assets/imgs/abdomen.jpg'); 
            case 'Bíceps':
                return require('../assets/imgs/biceps.jpg');
            case 'Costas':
                return require('../assets/imgs/costas.jpg'); 
            case 'Perna':
                return require('../assets/imgs/leg.jpg'); 
            case 'Peito':
                return require('../assets/imgs/peito.jpg'); 
            case 'Tríceps':
                return require('../assets/imgs/triceps.jpg'); 
            default:
                return null;
        }
    },
    content: {
        width: "100%",
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    title: {
        color: colors.primary1,
        fontFamily: "Poppins",
        fontSize: 14,
        fontWeight: "500" // Ajuste a propriedade fontWeight
    },
    dia: {
        color: "white",
        fontFamily: "Poppins",
        fontSize: 26,
        fontWeight: "500", // Ajuste a propriedade fontWeight
        marginBottom: 20
    },
    musculo: {
        fontFamily: "Rubik",
        fontSize: 16,
        color: "white"
    }
});
