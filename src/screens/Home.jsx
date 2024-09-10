import { Button, ScrollView, StyleSheet, Text, View, useColorScheme, ImageBackground, Pressable } from "react-native";
import styles from "../styles/globalStyles";
import { colors, grays } from "../styles/globalStyles";
import TreinoDay from "../components/TreinoDay";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import BoxTreinosDay from "../components/BoxTreinosDay";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";

export default function Home({ route, navigation }) {
    const treinos = false //treinos de hoje, deve vir de algum lugar
    //var users = [];
    //const { user } = useContext(UserContext)

    /*
    async function getusers() {
        const snapshot = await firestore().collection('users').get();
        users = snapshot.docs.map(doc => doc.data()); // Extrair os dados dos documentos
    }
    
    getusers().then(() => {
        console.warn(users); // Agora users conterá os dados da coleção
    });
    */

    const isLightMode = useColorScheme() === "light"

    function getDate(n) {
        switch (n) {
            case 0:
                return "Domingo";
            case 1:
                return "Segunda-feira";
            case 2:
                return "Terça-feira";
            case 3:
                return "Quarta-feira";
            case 4:
                day = "Quinta-feira";
            case 5:
                return "Sexta-feira";
            case 6:
                return "Sábado";

        }
    }

    let data_atual = new Date().toLocaleDateString('pt-BR')
    let dia_atual = getDate(new Date().getDay())
    
    return treinos ? (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Treino de Hoje: </Text>
                    <View style={style.data}>
                        <Ionicons name="calendar-sharp" size={32} color={isLightMode ? "black" : "white"} />
                        <Text style={style.dataText(isLightMode)}>{dia_atual} {data_atual}</Text>
                    </View>

                    <TreinoDay agrupamentos={["Pernas","Costas"]} numero={19} tempo="70 min" qntExerc={12}
                        onPress={() => navigation.navigate("Treino", 
                            { agrupamentos: ["Pernas","Costas"], 
                            titulo: "19º treino", 
                            exercicios_agrup: [["agachamento", "ex2", "ex3"],["barra1","barra2","barra3","barra4",'b','bb','bbb']] 
                        })}
                    />

                    <Text style={style.subtitle(isLightMode)}>Próximos Treinos</Text>

                    <BoxTreinosDay 
                        navigation={navigation} agrupamentos={["Peitoral", "Costas"]} numero={20} data={data_atual} dia="Sábado" isLightMode={isLightMode} 
                        onPress={() => navigation.navigate("Treino", 
                            {titulo:data_atual, 
                            agrupamentos:["Peitoral", "Costas"], 
                            exercicios_agrup: [["agachamento", "ex2", "ex3"],["barra1","barra2","barra3","barra4",'b','bb','bbb']], 
                            startButton:true}
                        )}/>
                    
                    <BoxTreinosDay  navigation={navigation} agrupamentos={["Perna", "Abdomen"]} numero={21} data={data_atual} dia="Segunda-feira" isLightMode={isLightMode} />
                    <BoxTreinosDay  navigation={navigation} agrupamentos={["Bíceps", "Tríceps"]} numero={22} data={data_atual} dia="Quarta-feira" isLightMode={isLightMode} />
                    <BoxTreinosDay  navigation={navigation} agrupamentos={["Peitoral", "Costas"]} numero={23} data={data_atual} dia="Sexta feira" isLightMode={isLightMode} />
                </View>

            </ScrollView>
        </SafeAreaView>
    ) : (
        <SafeAreaView style={styles.background(isLightMode)}>
            <View style={styles.screen}>
                <Text style={styles.header(isLightMode)}>Não perca seu treino de hoje!</Text>
                < ImageBackground
                    source = { require('../assets/imgs/empty.jpg') }
                    style = { style.empty }
                    resizeMode="cover"
                >
                    <View style={style.emptyCover}>
                        <Text style={style.emptyText}>Ainda não há treinos por aqui ...</Text>
                    </View>
                </ImageBackground >
                <Pressable style={style.gerarTreinoBox} onPress={() => navigation.navigate("Question")}>
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
        fontFamily:"Rubik",
        fontSize:26
    },
    gerarTreinoBox:{
        backgroundColor:colors.secondary1,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:40,
        elevation:8
    },
    gerarTreinoText:{
        color:"white",
        fontFamily:"Tauri",
        fontSize:16
    }
})