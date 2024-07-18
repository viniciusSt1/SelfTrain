import { Button, ScrollView, StyleSheet, Text, View, useColorScheme, Image, TouchableOpacity} from "react-native";
import styles from "../styles/globalStyles";
import { colors, grays } from "../styles/globalStyles";
import GroupDay from "../components/GroupDay";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import BoxGroupsDay from "../components/BoxGroupsDay";

export default function Home({navigation}){
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
    
        return {day,dd,mm,aaaa};
    }
    
    let objday = getDate()
    
    return (
        <ScrollView>
            <SafeAreaView style = { [styles.screen, style.background(isLightMode)] }>
                <Text style= { style.header(isLightMode)}>Treino de Hoje:</Text>
                <View style={style.data}>
                    <Ionicons name="calendar-sharp" size={40} color={isLightMode ? "black" : "white"} />
                    <Text style={style.dataText(isLightMode)}>{objday.day} {objday.dd}/{objday.mm}/{objday.aaaa}</Text>
                </View>

                <GroupDay navigation={navigation} agrupamento={"Perna"} dia = {19} musculos={["Quadriceps","Panturrilha","Gluteos"]} 
                    onPress={() => navigation.navigate("Treino", { agrupamento: "Perna", titulo : "Dia 19", exercicios: ["agachamento", "ex2", "ex3"] })}
                />
 
                <GroupDay navigation={navigation} agrupamento={"Abdomen"} dia = {19} musculos={["Superior","Lateral","Obliquo"]} />
                <GroupDay navigation={navigation} agrupamento={"Costas"} dia = {19} musculos={["Ombro","Dorsal","Clavicula"]} />
                <GroupDay navigation={navigation} agrupamento={"Tríceps"} dia = {19} musculos={["g1","g2","g3"]} />
                <GroupDay navigation={navigation} agrupamento={"Bíceps"} dia = {19} musculos={["g1","g2","g3"]} />
                <GroupDay navigation={navigation} agrupamento={"Peito"} dia = {19} musculos={["Superior","Medio","Inferior"]} />

                <Text style={style.subtitle(isLightMode)}>Próximos Treinos</Text>

                <BoxGroupsDay navigation={navigation} agrupamentos={["Peito","Costas"]} dia={20} objday={objday} isLightMode={isLightMode} />
                <BoxGroupsDay navigation={navigation} agrupamentos={["Perna","Abdomen"]} dia={21} objday={objday} isLightMode={isLightMode} />
                <BoxGroupsDay navigation={navigation} agrupamentos={["Bíceps","Tríceps"]} dia={22} objday={objday} isLightMode={isLightMode} />
                <BoxGroupsDay navigation={navigation} agrupamentos={["Peito","Costas"]} dia={23} objday={objday} isLightMode={isLightMode} />
                
            </SafeAreaView>
        </ScrollView>

    )
}

const style = StyleSheet.create({
    background: (isLightMode) => ({
        backgroundColor: isLightMode ? grays.background_light : grays.background_dark
    }),
    header: (isLightMode) => ({
        color:isLightMode? "black" : "white",
        fontFamily:'Poppins',
        fontSize:26
    }),
    data:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    dataText:(isLightMode) => ({
        color:isLightMode ? "black":"white",
        fontFamily:"Actor",
        fontSize:18
    }),
    subtitle:(isLightMode) => ({
        fontFamily:"Poppins",
        color: isLightMode ? "black" : "white",
        fontSize:22
    })
})