import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, { colors, grays } from '../styles/globalStyles';
import HeaderBack from '../components/HeaderBack';

export default function Treino({ route, navigation }) {
    const { titulo, agrupamento, exercicios } = route.params;
    const isLightMode = useColorScheme() === 'light';

    function requireIcon(agrupamento) {
        switch (agrupamento) {
            case 'Abdomen':
                return require('../assets/icons/abdomen.png'); 
            case 'Bíceps':
                return require('../assets/icons/biceps.png');
            case 'Costas':
                return require('../assets/icons/back.png'); 
            case 'Perna':
                return require('../assets/icons/leg.png'); 
            case 'Peito':
                return require('../assets/icons/chest.png'); 
            case 'Tríceps':
                return require('../assets/icons/triceps.png'); 
            default:
                return null;
        }
    }

    return (
        <ScrollView style={style.scrollView(isLightMode)}>
            <SafeAreaView style={styles.screen}>
                <HeaderBack titulo={titulo} navigation={navigation} />

                <View style={style.subHeader}>
                    <Image source={requireIcon(agrupamento)} style={style.iconImage} />
                    <Text style={style.titleText(isLightMode)}>{agrupamento}</Text>
                </View>
                
                <View style={style.exercisesContainer}>
                    {exercicios.map((exercicio, index) => (
                        <View style={style.exercicioBox(isLightMode)}>
                            <Image 
                                source={isLightMode ? require('../assets/icons/exercicio-light.png') : require('../assets/icons/exercicio-dark.png')}
                                style={style.exercicioIcon}/>
                            <Text style={style.exerciseText(isLightMode)}>{exercicio}</Text>
                        </View>
                        
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    scrollView: (isLightMode) =>  ({
        flex: 1,
        backgroundColor: isLightMode ? grays.background_light : grays.background_dark
    }),
    subHeader: {
        flexDirection:"row",
        gap:20,
        justifyContent:"center",
        alignItems:"center"
    },
    iconImage: {
        width: 70,
        height: 70,
    },
    titleText: (isLightMode) => ({
        color: isLightMode ? "black" : "white",
        fontSize:22,
        fontFamily:"Poppins"
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
        fontFamily:"Poppins"
    }),
});
