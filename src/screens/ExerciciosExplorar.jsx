import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, useColorScheme, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, { colors, grays } from '../styles/globalStyles';
import HeaderBack from '../components/HeaderBack';
import { requireIcon } from '../utils/agrupamentos';

export default function ExerciciosExplorar({ route, navigation }) {
    const { exercicios, agrupamento } = route.params;
    const isLightMode = useColorScheme() === 'light';

    return (
        <>
            <ScrollView style={style.scrollView(isLightMode)}>
                <SafeAreaView style={styles.screen}>
                    <HeaderBack titulo={agrupamento} navigation={navigation} />

                    <View style={style.subHeader}>
                        <Image source={requireIcon(agrupamento)} style={style.iconImage} />
                    </View>

                    {exercicios.map((exercicio, index) => (
                        <View style={style.exercicioBox(isLightMode)} key={index}>
                            <Image
                                source={isLightMode ? require('../assets/icons/exercicio-light.png') : require('../assets/icons/exercicio-dark.png')}
                                style={style.exercicioIcon} />
                            <Text style={style.exerciseText(isLightMode)}>{exercicio.nome}</Text>
                        </View>
                    ))}

                </SafeAreaView>
            </ScrollView>
        </>
    );
}

const style = StyleSheet.create({
    scrollView: (isLightMode) => ({
        flex: 1,
        backgroundColor: isLightMode ? grays.background_light : grays.background_dark
    }),
    plusText: {
        fontSize: 24,
        color: 'gray',
    },
    subHeader: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    iconImage: {
        width: 70,
        height: 70,
    },
    titleText: (isLightMode) => ({
        color: isLightMode ? "black" : "white",
        fontSize: 22,
        fontFamily: "Outfit"
    }),
    exercisesContainer: {
        gap: 20,
    },
    exercicioBox: (isLightMode) => ({
        flexDirection: "row",
        paddingHorizontal: 40,
        gap: 40,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: isLightMode ? grays.gray3 : grays.gray7,
        paddingBottom: 5,
        alignItems: 'center'
    }),
    exercicioIcon: {
        width: 40,
        height: 40
    },
    exerciseText: (isLightMode) => ({
        fontSize: 18,
        color: isLightMode ? 'black' : 'white',
        fontFamily: "Outfit",
        flexShrink: 1,  // Permite que o texto encolha se necessário
        //backgroundColor:'red'
    }),
    buttonSpace: (isLightMode) => ({
        backgroundColor: isLightMode ? grays.background_light : grays.background_dark,
        alignItems: 'center',
        paddingVertical: 10
    }),
    comecarTreinoButton: (isLightMode) => ({
        width: '50%',
        backgroundColor: colors.primary1,
        paddingVertical: 10,
        borderRadius: 30
    }),
    comecarTreinoText: (isLightMode) => ({
        textAlign: "center",
        fontFamily: 'Tauri'
    }),
});
