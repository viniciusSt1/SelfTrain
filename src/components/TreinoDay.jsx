import React from 'react';
import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { colors, grays } from '../styles/globalStyles';
import { requireBackground } from '../utils/agrupamentos';

export default function TreinoDay({ navigation, agrupamentos, numero, tempo, qntExerc, onPress }) {
    return (
        <Pressable onPress={onPress}>
            <ImageBackground
                source={style.backgroundImage(agrupamentos)}
                style={style.container}
                resizeMode="cover"
            >
                <View style={style.content}>
                    <Text style={style.title}>{agrupamentos.join(" + ")}</Text>
                    <Text style={style.dia}>{numero}º treino</Text>
                    <Text style={style.musculo}>Tempo de execução {tempo}</Text>
                    <Text style={style.musculo}>{qntExerc} exercícios</Text>
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
    backgroundImage: (agrupamentos) => {
        if (agrupamentos.length == 1)
            return requireBackground(agrupamentos[0])
        else
            return require('../assets/imgs/generic_train.jpg');
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
