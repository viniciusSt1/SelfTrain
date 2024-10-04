import { Button, ScrollView, Text, View, StyleSheet, useColorScheme, TextInput, Image, Pressable } from "react-native";
import styles, { grays } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import agrupamentos, { requireIcon } from "../utils/agrupamentos";
import firestore from "@react-native-firebase/firestore";

export default function Explorar({ navigation }) {
    const isLightMode = useColorScheme() == 'light'
    const [textSearch, setTextSearch] = useState('')
    const exerciciosAgrupados = {};

    async function getExerciciosAgrupados() {
        const snapshot = await firestore().collection('exercicios').get();

        snapshot.forEach((doc) => {
            const data = doc.data();
            const agrupMusc = data.agrupMusc;
            exerciciosAgrupados['Cardio'] = []

            agrupMusc.forEach(agrupamento => {
                if (!exerciciosAgrupados[agrupamento])
                    exerciciosAgrupados[agrupamento] = []

                exerciciosAgrupados[agrupamento].push(data);
                
                if (data.tipoSubTreino == 'Cardio')
                    exerciciosAgrupados['Cardio'].push(data);
            })

        });

        return exerciciosAgrupados;
    }

    //useEffect(() => {
    getExerciciosAgrupados().then((exerciciosAgrupados) => {
        //console.log(exerciciosAgrupados);
    });
    //},[])


    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Explorar</Text>
                    <Text style={style.subheader(isLightMode)}>Busque por exercícios específicos</Text>
                    <TextInput
                        style={style.input(isLightMode)}
                        value={textSearch} onChangeText={setTextSearch}
                        placeholder="Buscar"
                        placeholderTextColor={isLightMode ? grays.gray5 : grays.gray4}
                    />
                    {agrupamentos.map((agrupamento, index) => (
                        <Pressable style={style.list_item(isLightMode)} key={index}
                            onPress={() => navigation.navigate("ExerciciosExplorar", {exercicios: exerciciosAgrupados[agrupamento], agrupamento: agrupamento})}>

                            <Image source={requireIcon(agrupamento)} style={style.icon} />
                            <Text style={style.agrupamentoText(isLightMode)}>{agrupamento}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    subheader: (isLightMode) => ({
        fontFamily: 'Outfit',
        fontSize: 16,
        color: isLightMode ? grays.gray5 : grays.gray4
    }),
    input: (isLightMode) => ({
        width: "100%",
        backgroundColor: isLightMode ? "white" : grays.gray7,
        borderRadius: 40,
        fontSize: 16,
        //fontFamily: 'RobotoCondensed',
        paddingHorizontal: 40,
        height: 40,
        color: isLightMode ? "black" : "white",
    }),
    list_item: (isLightMode) => ({
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 20,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: isLightMode ? grays.gray3 : grays.gray7
    }),
    icon: {
        height: 70,
        width: 70
    },
    agrupamentoText: (isLightMode) => ({
        fontSize: 22,
        fontFamily: "Outfit",
        color: isLightMode ? "black" : "white"
    })
})