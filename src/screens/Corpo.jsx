import React, { useState, useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../contexts/UserContext";
import styles, { colors, grays } from "../styles/globalStyles";
import medidas from "../utils/medidas";
import Tabela from "../components/Tabela";

export default function Corpo({ navigation }) {
    const isLightMode = useColorScheme() == 'light';
    const { user } = useContext(UserContext);
    const [selectedPeriod, setSelectedPeriod] = useState('30 dias');

    const periods = ['30 dias', '90 dias', '1 ano', 'Sempre'];

    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Corpo</Text>

                    <View style={style.timePeriodContainer}>
                        {periods.map((period, index) => (
                            <Pressable
                                key={index}
                                style={[
                                    style.timePeriodButton(isLightMode,selectedPeriod === period),
                                ]}
                                onPress={() => setSelectedPeriod(period)}
                            >
                                <Text style={style.timePeriodText(isLightMode,selectedPeriod === period)}>{period}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <Text style={style.measuresHeader(isLightMode)}>Medidas</Text>

                    <View style={style.measuresContainer}>
                        {medidas.map((measure, index) => (
                            <View key={index} style={style.measureItem(isLightMode)}>
                                <Text style={style.measureLabel(isLightMode)}>{measure}</Text>
                                <Text style={style.measureValue(isLightMode)}>{user[measure.toLowerCase()] || '?'}</Text>
                                <Text style={style.measurePerc(isLightMode)}>+X%</Text>
                            </View>
                        ))}
                        <Text style={style.lastEdit}>Última edição 99/99/9999</Text>
                    </View>

                    <Text style={style.measuresHeader(isLightMode)}>Análise</Text>

                    <Tabela />

                    <Text style={style.measuresHeader(isLightMode)}>Alertas</Text>

                    <Text style={style.alerta(isLightMode)}>IMC: Alerta! Seu IMC está acima do normal, considere uma avaliação médica.</Text>
                    <Text style={style.alerta(isLightMode)}>IMC: Alerta! Seu IMC está acima do normal, considere uma avaliação médica.</Text>
                    <Text style={style.alerta(isLightMode)}>IMC: Alerta! Seu IMC está acima do normal, considere uma avaliação médica.</Text>
                    <Text style={style.alerta(isLightMode)}>IMC: Alerta! Seu IMC está acima do normal, considere uma avaliação médica.</Text>
                    <Text style={style.alerta(isLightMode)}>IMC: Alerta! Seu IMC está acima do normal, considere uma avaliação médica.</Text>
                    <Text style={style.alerta(isLightMode)}>IMC: Alerta! Seu IMC está acima do normal, considere uma avaliação médica.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    timePeriodContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timePeriodButton: (isLightMode, selected) => ({
        backgroundColor: selected ? isLightMode? colors.primary2 : colors.primary1 : 'transparent',  // Cor do botão selecionado
        borderStyle:'solid',
        borderWidth:2,
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderColor: selected ? 'transparent' : isLightMode ? 'black' : 'white'
    }),
    timePeriodText: (isLightMode, selected) => ({
        fontSize: 16,
        fontFamily: "Outfit", // Ajuste conforme a sua fonte
        color: isLightMode ? selected ? 'white' : 'black' : selected ? 'black' : 'white'
    }),
    measuresHeader: (isLightMode) => ({
        fontSize: 22,
        fontFamily: "Outfit", // Ajuste conforme a sua fonte
        color: isLightMode ? 'black' : 'white',
        textAlign:"center"
    }),
    measuresContainer: {
        borderRadius: 10,
        gap:10,
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'center',
    },
    measureItem: (isLightMode) => ({
        paddingVertical:10,
        //paddingHorizontal:20,
        //flexGrow:1,
        backgroundColor: isLightMode ? 'white' : grays.gray7,
        borderRadius:10,
        width:110,
        alignItems:'center'
    }),
    measureLabel: (isLightMode) => ({
        fontSize: 14,
        fontFamily: "Outfit", 
        color: isLightMode ? colors.secondary1 : colors.primary1
    }),
    measureValue: (isLightMode) => ({
        fontSize: 22,
        fontFamily: "Outfit", 
        color: isLightMode ? 'black' : 'white',
    }),
    measurePerc: (isLightMode) => ({
        fontSize: 12,
        fontFamily: "Outfit", 
        color: isLightMode ? colors.primary3 : colors.secondary3,
    }),
    lastEdit: {
        fontSize: 14,
        fontFamily: "Rubik", // Ajuste conforme a sua fonte
        color: "#999", // Ajuste conforme a sua paleta de cores
        textAlign: "center",
    },
    alerta:(isLightMode) => ({
        color: isLightMode ? colors.secondary1 : 'white',
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor: 'rgba(255,0,0,0.2)',
        fontFamily: 'Outfit',
        fontSize: 18,
        borderRadius: 10
    })
});
