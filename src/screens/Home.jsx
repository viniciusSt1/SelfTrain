import { Button, ScrollView, StyleSheet, Text, View, useColorScheme, ImageBackground, Pressable } from "react-native";
import styles from "../styles/globalStyles";
import { colors, grays } from "../styles/globalStyles";
import TreinoDay from "../components/TreinoDay";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import BoxTreinosDay from "../components/BoxTreinosDay";
import If from "../components/If";

export default function Home({ route, navigation }) {
    const treinos = true //treinos de hoje, deve vir de algum lugar

    const isLightMode = useColorScheme() === "light"

    function getDate() {
        const data = new Date();
        let day;

        const n = data.getDay();
        switch (n) {
            case 0:
                day = "Domingo";
                break;
            case 1:
                day = "Segunda-feira";
                break;
            case 2:
                day = "Terça-feira";
                break;
            case 3:
                day = "Quarta-feira";
                break;
            case 4:
                day = "Quinta-feira";
                break;
            case 5:
                day = "Sexta-feira";
                break;
            case 6:
                day = "Sábado";
                break;
        }

        const dd = data.getDate().toString().padStart(2, '0');
        const mm = (data.getMonth() + 1).toString().padStart(2, '0'); // Meses são indexados de 0 a 11
        const aaaa = data.getFullYear();

        return { day, dd, mm, aaaa };
    }

    let objday = getDate()
    
    return treinos ? (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={style.header(isLightMode)}>Treino de Hoje:</Text>
                    <View style={style.data}>
                        <Ionicons name="calendar-sharp" size={35} color={isLightMode ? "black" : "white"} />
                        <Text style={style.dataText(isLightMode)}>{objday.day} {objday.dd}/{objday.mm}/{objday.aaaa}</Text>
                    </View>

                    <TreinoDay navigation={navigation} agrupamento={"Perna"} dia={19} musculos={["Quadriceps", "Panturrilha", "Gluteos"]}
                        onPress={() => navigation.navigate("Treino", { agrupamento: "Perna", titulo: "Dia 19", exercicios: ["agachamento", "ex2", "ex3"] })}
                    />

                    <TreinoDay navigation={navigation} agrupamento={"Abdomen"} dia={19} musculos={["Superior", "Lateral", "Obliquo"]} />
                    <TreinoDay navigation={navigation} agrupamento={"Costas"} dia={19} musculos={["Ombro", "Dorsal", "Clavicula"]} />
                    <TreinoDay navigation={navigation} agrupamento={"Tríceps"} dia={19} musculos={["g1", "g2", "g3"]} />
                    <TreinoDay navigation={navigation} agrupamento={"Bíceps"} dia={19} musculos={["g1", "g2", "g3"]} />
                    <TreinoDay navigation={navigation} agrupamento={"Peito"} dia={19} musculos={["Superior", "Medio", "Inferior"]} />

                    <Text style={style.subtitle(isLightMode)}>Próximos Treinos</Text>

                    <BoxTreinosDay 
                        navigation={navigation} agrupamentos={["Peito", "Costas"]} dia={20} objday={objday} isLightMode={isLightMode} 
                        onPress={() => navigation.navigate("Treinos", {objday:objday, agrupamentos:["Peito", "Costas"]})}/>
                    
                    <BoxTreinosDay  navigation={navigation} agrupamentos={["Perna", "Abdomen"]} dia={21} objday={objday} isLightMode={isLightMode} />
                    <BoxTreinosDay  navigation={navigation} agrupamentos={["Bíceps", "Tríceps"]} dia={22} objday={objday} isLightMode={isLightMode} />
                    <BoxTreinosDay  navigation={navigation} agrupamentos={["Peito", "Costas"]} dia={23} objday={objday} isLightMode={isLightMode} />
                </View>

            </ScrollView>
        </SafeAreaView>
    ) : (
        <SafeAreaView style={styles.background(isLightMode)}>
            <View style={styles.screen}>
                <Text style={style.header(isLightMode)}>Não perca seu treino de hoje!</Text>
                < ImageBackground
                    source = { require('../assets/imgs/empty.jpg') }
                    style = { style.empty }
                    resizeMode="cover"
                >
                    <View style={style.emptyCover}>
                        <Text style={style.emptyText}>Ainda não há treinos por aqui ...</Text>
                    </View>
                </ImageBackground >
                <Pressable style={style.gerarTreinoBox}>
                    <Text style={style.gerarTreinoText}>Gerar treino agora</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    header: (isLightMode) => ({
        color: isLightMode ? "black" : "white",
        fontFamily: 'Poppins',
        fontSize: 26
    }),
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
        fontFamily: "Poppins",
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