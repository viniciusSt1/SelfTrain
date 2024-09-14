import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import styles, { colors, grays } from '../styles/globalStyles';

const exercises = [
    {
        name: 'Supino Reto',
        repetitions: 12,
        agrupamentos:['Peito']
    },
    {
        name: 'Agachamento',
        repetitions: 15,
        agrupamentos:['Peito']
    },
    {
        name: 'Rosca Direta',
        repetitions: 10,
        agrupamentos:['Peito','Braço']
    },
];

export default function Treinamento() {
    const navigation = useNavigation();
    const isLightMode = useColorScheme() === 'light';
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    const handleNextExercise = () => {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        } else {
            // Lógica ao finalizar o treino
            alert('Você concluiu o treino!');
        }
    };

    const { name, repetitions, agrupamentos} = exercises[currentExerciseIndex];
    const totalExercises = exercises.length;
    const currentExercise = currentExerciseIndex + 1;

    return (
        <View style={styles.background(isLightMode)}>
            <ImageBackground
                source={require('../assets/imgs/exercicio.jpg')}
                style={style.backgroundImage}
            >
                <View style={style.content}>
                    <SafeAreaView style={style.header}>
                        <Pressable onPress={() => currentExerciseIndex === 0 ? navigation.goBack() : setCurrentExerciseIndex(currentExerciseIndex - 1)}>
                            <MaterialIcons
                                name="keyboard-backspace"
                                size={45}
                                color={'white'}
                            />
                        </Pressable>
                        <View style={style.progression}>
                            <Text style={style.exerciseCount}>{currentExercise}/{totalExercises}</Text>
                            <Entypo name="dots-three-horizontal" size={40} color="white" />
                        </View>
                    </SafeAreaView>
                    <View style={style.agrupamentobox}>
                        {agrupamentos.map((agrup,index) => (
                            <Text key={index} style={style.agrupamentotxt}>{agrup}</Text>
                        ))}
                    </View>
                </View>

            </ImageBackground>

            <View style={style.exerciseContainer}>
                <Text style={style.exerciseName(isLightMode)}>{name}</Text>
                <Text style={style.repetitions(isLightMode)}>{repetitions}x repetições</Text>

                <Pressable style={style.continueButton(isLightMode)} onPress={handleNextExercise}>
                    <Text style={style.buttonText(isLightMode)}>
                        {currentExercise < totalExercises ? 'Continuar' : 'Finalizar'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    content: {
        flex:1,
        backgroundColor: "rgba(0,0,50,0.2)",
    },
    backgroundImage: {
        width: '100%',
        height: 300,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    progression:{
        flexDirection:'row',
        alignItems:'center',
        gap:20
    },
    exerciseCount: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Rubik'
    },
    agrupamentobox:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        gap:20,
        padding:20
    },
    agrupamentotxt:{
        color:'white',
        backgroundColor:'#94000090',
        paddingHorizontal:20,
        paddingVertical:6,
        borderRadius:10
    },
    exerciseContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical:40
    },
    exerciseName: (isLightMode) => ({
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'OutFit',
        color:isLightMode ? 'black' : 'white'
    }),
    repetitions: (isLightMode) => ({
        fontSize: 40,
        color:isLightMode ? 'black' : 'white'
    }),
    continueButton: (isLightMode) => ({
        backgroundColor: isLightMode ? colors.primary2 : colors.primary1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        width:'80%'
    }),
    buttonText: (isLightMode) => ({
        color: isLightMode ? 'white' : 'black',
        fontSize: 18,
        textAlign:'center',
        fontFamily: 'Tauri'
    }),
});
