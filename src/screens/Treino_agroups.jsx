import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import styles, { colors, grays } from '../styles/globalStyles';
import TreinoDay from '../components/TreinoDay';
import HeaderBack from '../components/HeaderBack';
import { requireIcon } from '../utils/agrupamentos';

export default function Treino_agroups({ route, navigation }) {
    const { data, agrupamentos } = route.params;
    const isLightMode = useColorScheme() === 'light';

    const renderSubHeader = () => {
        const elements = [];
        agrupamentos.forEach((agrupamento, index) => {
            elements.push(
                <Image key={`image-${index}`} source={requireIcon(agrupamento)} style={style.iconImage} />
            );
            if (index < agrupamentos.length - 1) {
                elements.push(
                    <Text key={`plus-${index}`} style={style.plusText}>+</Text>
                );
            }
        });
        return elements;
    };

    return (
        <ScrollView style={style.scrollView(isLightMode)}>
            <SafeAreaView style={styles.screen}>
                <HeaderBack titulo={data} navigation={navigation}/>

                <View style={style.subHeader}>
                    {renderSubHeader()}
                </View>

                {agrupamentos.map((agrupamento) => (
                    <TreinoDay 
                        key={agrupamento} 
                        agrupamentos={[agrupamento]} 
                        tempo = '10 min'
                        numero={20} 
                        qntExerc={8}
                        onPress={() => navigation.navigate("Treino", { agrupamentos: ["Peitoral"], titulo: "19º treino", exercicios_agrup: [["agachamento", "ex2", "ex3"]] })}
                    />
                ))}
                
            </SafeAreaView>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    scrollView: (isLightMode) =>  ({
        flex: 1,
        backgroundColor: isLightMode ? grays.background_light : grays.background_dark
    }),
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap:20
    },
    title:(isLightMode) => ({
        fontSize:24,
        color : isLightMode ? "black" : "white",
        fontFamily:"Outfit",
    }),
    subHeader: {
        flexDirection:"row",
        gap:10,
        justifyContent:"center",
        alignItems:"center"
    },
    iconImage: {
        width: 70,
        height: 70,
    },
    plusText: {
        fontSize: 24,
        color: 'gray',
    },
    titleText: (isLightMode) => ({
        color: isLightMode ? "black" : "white",
        fontSize:22,
        fontFamily:"Outfit"
    }),
    exercisesContainer: {
        gap:20
    },
    exercicioBox: (isLightMode) => ({
        flexDirection:"row",
        paddingHorizontal:40,
        gap:40,
        borderStyle:'solid',
        borderBottomWidth:1,
        borderColor: isLightMode ? grays.gray3 : grays.gray7,
        paddingBottom:5,
        alignItems:'center'
    }),
    exercicioIcon:{
        width:40,
        height:40
    },
    exerciseText: (isLightMode) => ({
        fontSize: 18,
        color: isLightMode ? 'black' : 'white',
        fontFamily:"Outfit"
    }),
});
