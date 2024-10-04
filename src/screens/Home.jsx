import { ScrollView, StyleSheet, Text, View, useColorScheme, ImageBackground, Pressable } from "react-native";
import styles, { colors, grays } from "../styles/globalStyles";
import TreinoDay from "../components/TreinoDay";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import BoxTreinosDay from "../components/BoxTreinosDay";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { getNomeDoDia } from "../utils/function_datas";

export default function Home({ route, navigation }) {
    const isLightMode = useColorScheme() === "light"

    // navigation.getParent().navigate('ExplorarTab') navegar para outra tabBar

    const { user } = useContext(UserContext)

    let data_atual = new Date()
    let dia_atual = getNomeDoDia(new Date())

    const isToday = (dataTreino) => {
        return (
            dataTreino.getDate() === data_atual.getDate() &&
            dataTreino.getMonth() === data_atual.getMonth() &&
            dataTreino.getFullYear() === data_atual.getFullYear()
        );
    };

    const indiceTreinoDeHoje = user.treinos.findIndex(treino => {
        const dataTreino = treino.data; // Converte o timestamp para Date
        return isToday(dataTreino); // Verifica se é hoje
    });

    const treinoDeHoje = user.treinos.length !== 0 && indiceTreinoDeHoje !== -1 ? user.treinos[indiceTreinoDeHoje] : null;

    const calcDiasParaProxTreino = () => {
        //console.log(user.treinos);

        const treinoProximo = user.treinos.find(treino => {
            const dataTreino = treino.data;
            return dataTreino > new Date(); // Encontra o próximo treino após hoje
        });

        //console.log(treinoProximo)

        if (!treinoProximo) {
            // Não há próximos treinos
            return null; // Ou um valor apropriado que faça sentido na sua aplicação
        }

        const dataTreino = treinoProximo.data; // Converte o timestamp para Date
        const diffTime = dataTreino - data_atual; // Diferença em milissegundos
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Converte para dias
        return diffDays;
    };


    //console.log(treinoDeHoje)

    return user.treinos.length !== 0 ? (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Treino de Hoje: </Text>
                    <View style={style.data}>
                        <Ionicons name="calendar-sharp" size={32} color={isLightMode ? "black" : "white"} />
                        <Text style={style.dataText(isLightMode)}>{dia_atual} {data_atual.toLocaleDateString('pt-BR')}</Text>
                    </View>

                    {treinoDeHoje ? <TreinoDay agrupamentos={treinoDeHoje.agrupMusc} numero={indiceTreinoDeHoje + 1} tempo="70 min" qntExerc={12}
                        onPress={() => navigation.navigate("Treino",
                            {
                                treino: treinoDeHoje,
                                titulo: `${indiceTreinoDeHoje + 1}º treino`,
                            })}
                    /> :
                        <TreinoDay agrupamentos={null} qntDiasProxTreino={calcDiasParaProxTreino() || 999} />
                    }


                    <Text style={style.subtitle(isLightMode)}>Próximos Treinos</Text>

                    {user.treinos
                        .map((treino, originalIndex) => {
                            const dataTreino = treino.data; // Mantém como objeto Date
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
                                            treino: {
                                                ...treino,
                                                dataTreino: treino.dataTreino.toISOString() // Converte dataTreino para string ISO
                                            }
                                        }
                                    )}
                                />
                            );
                        })}

                    {/*<Text>Montar outro planejamento</Text>*/}
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
                <Pressable style={style.gerarTreinoBox} onPress={() => navigation.getParent().navigate('QuestionarioTab')}>
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