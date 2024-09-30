import { Button, ScrollView, StyleSheet, Text, View, useColorScheme, ImageBackground, Pressable } from "react-native";
import styles from "../styles/globalStyles";
import { colors, grays } from "../styles/globalStyles";
import TreinoDay from "../components/TreinoDay";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import BoxTreinosDay from "../components/BoxTreinosDay";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { binding } from "../IE/binding";
import { traceValues } from "../IE/ie";


export default function Home({ route, navigation }) {
    const isLightMode = useColorScheme() === "light"
    //const treinos = false 

    // navigation.getParent().navigate('ExplorarTab') navegar para outra tabBar

    const { user, updateUser } = useContext(UserContext)

    const convertTimestamp = (timestamp) => new Date(timestamp.seconds * 1000);

    const getNomeDoDia = (data) => {
        const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
        const dia = data.getDay(); 
        return diasSemana[dia]; 
    };

    let data_atual = new Date().toLocaleDateString('pt-BR') //Formato dd/mm/yyyy
    let dia_atual = getNomeDoDia(new Date())

    function IA() {
        traceValues('Usuario')
        var treinos = binding["Usuario.planoTreino.treinos"]

        updateUser({ treinos }).then(() => console.log("Usuario atualizado com os treinos"))
    }

    return user.treinos ? (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Treino de Hoje: </Text>
                    <View style={style.data}>
                        <Ionicons name="calendar-sharp" size={32} color={isLightMode ? "black" : "white"} />
                        <Text style={style.dataText(isLightMode)}>{dia_atual} {data_atual}</Text>
                    </View>

                    <TreinoDay agrupamentos={["Pernas", "Costas"]} numero={19} tempo="70 min" qntExerc={12}
                        onPress={() => navigation.navigate("Treino",
                            {
                                agrupamentos: ["Pernas", "Costas"],
                                titulo: "19º treino",
                                exercicios_agrup: [["agachamento", "ex2", "ex3"], ["barra1", "barra2", "barra3", "barra4", 'b', 'bb', 'bbb']]
                            })}
                    />

                    <Text style={style.subtitle(isLightMode)}>Próximos Treinos</Text>

                    {/*
                    <BoxTreinosDay
                        navigation={navigation} agrupamentos={["Peitoral", "Costas"]} numero={20} data={data_atual} dia="Sábado" isLightMode={isLightMode}
                        onPress={() => navigation.navigate("Treino",
                            {
                                titulo: data_atual,
                                agrupamentos: ["Peitoral", "Costas"],
                                exercicios_agrup: [["agachamento", "ex2", "ex3"], ["barra1", "barra2", "barra3", "barra4", 'b', 'bb', 'bbb']],
                                startButton: true
                            }
                        )} />
                    */}
                    {user.treinos
                        .map((treino, originalIndex) => {
                            const dataTreino = convertTimestamp(treino.data); // Mantém como objeto Date
                            return { ...treino, originalIndex, dataTreino }; // Inclui o índice original e a data Date
                        })
                        .filter(treino => treino.dataTreino.getTime() >= new Date().getTime()) // Compara diretamente os timestamps
                        .slice(0, 5) // Pega os 5 primeiros treinos
                        .map((treino, index) => {
                            const diaSemana = getNomeDoDia(treino.dataTreino); // Obtém o nome do dia da semana dinamicamente

                            return (
                                <BoxTreinosDay
                                    key={treino.originalIndex} // Usa o índice original como chave única
                                    navigation={navigation}
                                    agrupamentos={treino.agrupMusc}
                                    numero={treino.originalIndex + 1} // Exibe o índice original + 1
                                    data={treino.dataTreino.toLocaleDateString('pt-BR')} // Formato dd/mm/yyyy
                                    dia={diaSemana} // Nome do dia da semana
                                    isLightMode={isLightMode}
                                    onPress={() => navigation.navigate("Treino",
                                        {
                                            titulo: treino.dataTreino.toLocaleDateString('pt-BR'),
                                            agrupamentos: treino.agrupMusc,
                                            exercicios_agrup: treino.tabExercicios.map(exercicios => exercicios.nomeExercicios),
                                            startButton: true
                                        }
                                    )}
                                />
                            );
                        })}

                </View>

            </ScrollView>
        </SafeAreaView>
    ) : (
        <SafeAreaView style={styles.background(isLightMode)}>
            <View style={styles.screen}>
                <Text style={styles.header(isLightMode)}>Não perca seu treino de hoje!</Text>
                < ImageBackground
                    source={require('../assets/imgs/empty.jpg')}
                    style={style.empty}
                    resizeMode="cover"
                >
                    <View style={style.emptyCover}>
                        <Text style={style.emptyText}>Ainda não há treinos por aqui ...</Text>
                    </View>
                </ImageBackground >
                <Pressable style={style.gerarTreinoBox} onPress={//() => navigation.getParent().navigate('QuestionarioTab')
                    () => IA()
                }>
                    <Text style={style.gerarTreinoText}>Gerar treino agora</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    data: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dataText: (isLightMode) => ({
        color: isLightMode ? "black" : "white",
        fontFamily: "Actor",
        fontSize: 18
    }),
    subtitle: (isLightMode) => ({
        fontFamily: "Outfit",
        color: isLightMode ? "black" : "white",
        fontSize: 22
    }),
    empty: {
        borderRadius: 20,
        overflow: "hidden",
        flex: 1
    },
    emptyCover: {
        backgroundColor: "rgba(0,0,0,0.3)",
        flex: 1,
        justifyContent: "flex-end",
        padding: 40
    },
    emptyText: {
        color: "white",
        fontFamily: "Rubik",
        fontSize: 26
    },
    gerarTreinoBox: {
        backgroundColor: colors.secondary1,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        elevation: 8
    },
    gerarTreinoText: {
        color: "white",
        fontFamily: "Tauri",
        fontSize: 16
    }
})