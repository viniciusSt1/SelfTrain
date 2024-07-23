import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import styles, { colors, grays } from '../styles/globalStyles';

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
                <View style={style.header}>
                    <MaterialIcons 
                        name="keyboard-backspace" 
                        size={45} 
                        color={isLightMode ? "black" : "white"} 
                        onPress={() => {navigation.goBack()}} 
                    />
                    <Text style={[style.title, { color: isLightMode ? "black" : "white" }]}>{titulo}</Text>
                </View>
                <Image source={requireIcon(agrupamento)} style={style.iconImage} />
                <View style={style.exercisesContainer}>
                    {exercicios.map((exercicio, index) => (
                        <Text key={index} style={style.exerciseText}>{exercicio}</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    exercisesContainer: {
        paddingHorizontal: 20,
    },
    exerciseText: {
        fontSize: 18,
        marginVertical: 5,
    },
});
