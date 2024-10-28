import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet, Modal, ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import styles, { colors, grays } from '../styles/globalStyles';
import { exercicios as exerciciosdb } from '../IE/exercicios';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Treinamento({ route }) {
    const navigation = useNavigation();
    const isLightMode = useColorScheme() === 'light';
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const { treino } = route.params;

    const exercicios = treino.tabExercicios.flatMap(tabexercicio =>
        tabexercicio.idExercicios.map((idexercicio, index) => (
            {
                ...exerciciosdb[idexercicio],    // Dados do banco de exercícios
                repeticoes: tabexercicio.repeticoes[index],  // Repetições do exercício
                series: tabexercicio.sets[index],  // Sets (agrupamento de repetições)
                tempoDescanso: tabexercicio.tempoDescanso[index], // Tempo de descanso
                tempoTotal: tabexercicio.tempoTotal[index],
                intensidade: tabexercicio.intensidade[index],  // Intensidade
                modTempoExec: tabexercicio.modTempoExec[index]  // Modulação de tempo de execução
            }
        ))
    );

    const handleNextExercise = () => {
        if (currentExerciseIndex < exercicios.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        } else {
            alert('Você concluiu o treino!');
            navigation.goBack()
        }
    };

    const handleExerciseClick = (index) => {
        setCurrentExerciseIndex(index);
        setModalVisible(false);  // Fecha o modal após a seleção
    };

    const { nome, repeticoes, agrupMusc, series, tipoContagem, tempoTotal } = exercicios[currentExerciseIndex];
    const totalExercises = exercicios.length;
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
                            <Pressable onPress={() => setModalVisible(true)}>
                                <Entypo name="dots-three-horizontal" size={35} color="white" />
                            </Pressable>
                        </View>
                    </SafeAreaView>
                    <View style={style.agrupamentobox}>
                        {agrupMusc.map((agrup, index) => (
                            <Text key={index} style={style.agrupamentotxt}>{agrup}</Text>
                        ))}
                    </View>
                </View>
            </ImageBackground>

            <View style={style.exerciseContainer}>
                <View style={style.blocks_exercices}>
                   <Text style={style.exerciseName(isLightMode)}>{nome}</Text> 
                   <AntDesign name="questioncircleo" size={24} color={isLightMode ? "black" : 'white'} />
                </View>
                
                <View style={style.blocks_exercices}>
                    <Text style={style.repetitions(isLightMode)}>{tipoContagem ==='time' ? tempoTotal/series : repeticoes} {tipoContagem ==='time' ? 'segundos' : 'repetições'}</Text>
                    <Text style={style.repetitions(isLightMode)}>{series} séries</Text>
                </View>

                <Pressable style={style.continueButton(isLightMode)} onPress={handleNextExercise}>
                    <Text style={style.buttonText(isLightMode)}>
                        {currentExercise < totalExercises ? 'Continuar' : 'Finalizar'}
                    </Text>
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalOverlay}>

                    <View style={style.modalContent(isLightMode)}>
                        <Pressable style={style.x(isLightMode)} onPress={() => setModalVisible(false)}>
                            <AntDesign name="down" size={24} color={isLightMode ? "black" : 'white'} />
                        </Pressable>
                        <ScrollView>
                            {exercicios.map((exercicio, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => handleExerciseClick(index)}
                                    style={currentExerciseIndex === index ? style.currentExerciseItem(isLightMode) : style.exerciseItem}
                                >
                                    <Text style={style.exerciseNameModal(isLightMode, currentExerciseIndex === index)}>{exercicio.nome}</Text>
                                    <Text style={style.repetitionsModal(isLightMode, currentExerciseIndex === index)}>{exercicio.tipoContagem==='time' ? exercicio.tempoTotal/exercicio.series : exercicio.repeticoes} {exercicio.tipoContagem==='time' ? 'segundos' : 'repetições'}</Text>
                                    <Text style={style.repetitionsModal(isLightMode, currentExerciseIndex === index)}>{exercicio.series} series</Text>
                                    {currentExerciseIndex !== index && currentExerciseIndex !== index + 1 && index !== exercicios.length - 1 ? <View style={style.divisor}></View> : null}
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const style = StyleSheet.create({
    content: {
        flex: 1,
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
    progression: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    exerciseCount: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Rubik'
    },
    agrupamentobox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 10,
        padding: 20
    },
    agrupamentotxt: {
        color: 'white',
        backgroundColor: '#94000090',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 10
    },
    exerciseContainer: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    blocks_exercices:{
        alignItems:'center',
        gap:10,
        flex:1
    },
    exerciseName: (isLightMode) => ({
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'OutFit',
        color: isLightMode ? 'black' : 'white'
    }),
    repetitions: (isLightMode) => ({
        fontSize: 30,
        color: isLightMode ? 'black' : 'white'
    }),
    continueButton: (isLightMode) => ({
        backgroundColor: isLightMode ? colors.primary2 : colors.primary1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        width: '80%',
    }),
    buttonText: (isLightMode) => ({
        color: isLightMode ? 'white' : 'black',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Tauri'
    }),
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: (isLightMode) => ({
        width: '90%',
        backgroundColor: isLightMode ? "#EDEDEDEE" : "#222222EE",
        //paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        position: 'relative'
    }),
    x: (isLightMode) => ({
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 99,
        //backgroundColor: isLightMode ? "#EDEDED20" : "#22222220",
        borderRadius: 20,
        padding: 5
    }),
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exerciseItem: {
        padding: 10,
        //borderTopWidth: 1,
        //borderBottomColor: 'lightgray',
        marginHorizontal: 20,
        alignItems: 'center'
    },
    currentExerciseItem: (isLightMode) => ({
        padding: 20,
        backgroundColor: isLightMode ? colors.primary2 : colors.primary1, // Cor de destaque para o exercício atual
        marginVertical: 10,
    }),
    closeButton: {
        backgroundColor: colors.primary2,
        padding: 10,
        marginHorizontal: 40,
        borderRadius: 5,
    },
    exerciseNameModal: (isLightMode, current) => ({
        color: isLightMode ? current ? 'white' : 'black' : current ? 'black' : 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }),
    repetitionsModal: (isLightMode, current) => ({
        color: isLightMode ? current ? 'white' : 'black' : current ? 'black' : 'white',
        fontSize: 14,
        textAlign: 'center'
    }),
    divisor: {
        height: 1,
        backgroundColor: grays.gray3,
        marginTop: 20,
        width: '50%'
    }
});
