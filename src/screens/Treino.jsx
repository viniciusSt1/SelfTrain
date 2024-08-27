import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, useColorScheme, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, { colors, grays } from '../styles/globalStyles';
import HeaderBack from '../components/HeaderBack';
import { requireIcon } from '../utils/agrupamentos';

export default function Treino({ route, navigation }) {
    const { titulo, agrupamentos, exercicios_agrup, startButton } = route.params;
    const isLightMode = useColorScheme() === 'light';

    return (
        <>
            <ScrollView style={style.scrollView(isLightMode)}>
                <SafeAreaView style={styles.screen}>
                    <HeaderBack titulo={titulo} navigation={navigation} />

                    {agrupamentos.map((agrupamento, index) => (
                        <View key={index}>
                            <View style={style.subHeader}>
                                <Image source={requireIcon(agrupamento)} style={style.iconImage} />
                                <Text style={style.titleText(isLightMode)}>{agrupamento}</Text>
                            </View>

                            <View style={style.exercisesContainer}>
                                {exercicios_agrup[index].map((exercicio, idx) => (
                                    <View style={style.exercicioBox(isLightMode)} key={idx}>
                                        <Image
                                            source={isLightMode ? require('../assets/icons/exercicio-light.png') : require('../assets/icons/exercicio-dark.png')}
                                            style={style.exercicioIcon} />
                                        <Text style={style.exerciseText(isLightMode)}>{exercicio}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}

                </SafeAreaView>
            </ScrollView>
            
            {!startButton && (
                <View style={style.buttonSpace(isLightMode)}>
                    <Pressable style={style.comecarTreinoButton(isLightMode)}>
                        <Text style={style.comecarTreinoText(isLightMode)}>Iniciar Treino</Text>
                    </Pressable>
                </View>
            )}
        </>
    );
}

const style = StyleSheet.create({
    scrollView: (isLightMode) => ({
        flex: 1,
        backgroundColor: isLightMode ? grays.background_light : grays.background_dark
    }),
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
        gap: 20
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
        fontFamily: "Outfit"
    }),
    buttonSpace: (isLightMode) => ({
        backgroundColor: isLightMode ? grays.background_light : grays.background_dark,
        alignItems:'center',
        paddingVertical:10
    }),
    comecarTreinoButton: (isLightMode) => ({
        width:'50%',
        backgroundColor: colors.primary1,
        paddingVertical:10,
        borderRadius:30
    }),
    comecarTreinoText: (isLightMode) => ({
        textAlign:"center",
        fontFamily:'Tauri'
    }),
});
