import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from "../styles/globalStyles";
import { colors, grays } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function Questionario({ navigation }) {
    /*
    useFocusEffect( //executar uma função sempre que a tela ganhar foco
        React.useCallback(() => {
            const hideTabBar = () => {
                navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
            };
    
            hideTabBar();
    
            return () => {
                navigation.getParent()?.setOptions({ tabBarStyle: true });
            };
        }, []) // Reexecutar quando uma variaevl dentro de [] executar
    );*/

    const isLightMode = useColorScheme() === 'light';
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const questions = [
        {
            title: "Quantos anos você tem?",
            options: [
                { text: "Menos de 18", icon: <FontAwesome name="child" size={20} color="#333333" /> },
                { text: "18-24", icon: <FontAwesome name="user" size={20} color="#333333" /> },
                { text: "25-34", icon: <FontAwesome name="user" size={20} color="#333333" /> },
                { text: "35-44", icon: <FontAwesome name="user" size={20} color="#333333" /> },
                { text: "45+", icon: <FontAwesome name="user" size={20} color="#333333" /> }
            ],
            multiple: false,
        },
        {
            title: "Qual é o seu nível de atividade física?",
            options: [
                { text: "Sedentário", icon: null },
                { text: "Leve", icon: null },
                { text: "Moderado", icon: null },
                { text: "Intenso", icon: null }
            ],
            multiple: false,
        },
        {
            title: "Quais dias da semana você está disponível?",
            options: [
                { text: "Segunda", icon: null },
                { text: "Terça", icon: null },
                { text: "Quarta", icon: null },
                { text: "Quinta", icon: null },
                { text: "Sexta", icon: null },
                { text: "Sábado", icon: null },
                { text: "Domingo", icon: null }
            ],
            multiple: true,
        }
        // ...
    ];

    const totalQuestions = questions.length;
    const progress = (currentQuestionIndex + 1) / totalQuestions;

    const handleAnswer = (option) => {
        const updatedAnswers = [...answers];
        if (questions[currentQuestionIndex].multiple) {
            if (!updatedAnswers[currentQuestionIndex]) {
                updatedAnswers[currentQuestionIndex] = [];
            }
            const optionIndex = updatedAnswers[currentQuestionIndex].indexOf(option.text);
            if (optionIndex > -1) {
                // Remove a opção se já estiver selecionada
                updatedAnswers[currentQuestionIndex].splice(optionIndex, 1);
            } else {
                // Adiciona a opção se ainda não estiver selecionada
                updatedAnswers[currentQuestionIndex].push(option.text);
            }
        } else {
            updatedAnswers[currentQuestionIndex] = [option.text];
        }
        setAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) 
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        else{
            console.log("Questionário finalizado");
            console.log(answers)
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) 
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        else
            navigation.goBack()
    };

    return (
        <SafeAreaView style={[styles.screen, styles.background(isLightMode)]}>
            <View style={style.progressBarContainer(isLightMode)}>
                <View style={style.progressBar(isLightMode, `${progress * 100}%`)} />
            </View>
            <Text style={style.questionTitle(isLightMode)}>
                {questions[currentQuestionIndex].title}
            </Text>
            <ScrollView>
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <Pressable
                        key={index}
                        style={[
                            style.optionButton(isLightMode),
                            answers[currentQuestionIndex] && answers[currentQuestionIndex].includes(option.text)
                                ? style.selectedOption(isLightMode)
                                : null
                        ]}
                        onPress={() => handleAnswer(option)}
                    >
                        <Text style={style.optionText(isLightMode, answers[currentQuestionIndex] && answers[currentQuestionIndex].includes(option.text))}>{option.text}</Text>
                        {option.icon}
                    </Pressable>
                ))}
            </ScrollView>

            <View style={style.buttonContainer}>
                <Pressable
                    style={style.backButton(isLightMode)}
                    onPress={handlePreviousQuestion}
                >
                    <View style={style.backButtonIcon}> 
                        <MaterialIcons size={45} color="white" name="keyboard-backspace" /> 
                    </View>
                </Pressable>
                <Pressable
                    style={style.continueButton(isLightMode, answers[currentQuestionIndex] && answers[currentQuestionIndex].length > 0)}
                    onPress={handleNextQuestion}
                >
                    <Text style={style.continueButtonText(isLightMode, answers[currentQuestionIndex] && answers[currentQuestionIndex].length > 0)}>Continuar</Text>
                </Pressable>
            </View>
        </SafeAreaView>


    );
}

const style = StyleSheet.create({
    progressBarContainer: (isLightMode) => ({
        height: 10,
        backgroundColor: isLightMode ? grays.gray2 : grays.gray10,
        borderRadius: 10,
        overflow: 'hidden'
    }),
    progressBar: (isLightMode, progress) => ({
        height: "100%",
        width: progress,
        backgroundColor: isLightMode ? colors.primary2 : colors.primary1,
    }),
    questionTitle: (isLightMode) => ({
        fontFamily: "Outfit",
        fontSize: 24,
        textAlign: "center",
        color: isLightMode ? 'black' : 'white',
    }),
    optionButton: (isLightMode) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
        paddingHorizontal: 25,
        borderRadius: 35,
        backgroundColor: isLightMode ? 'white' : grays.gray7,
        marginBottom: 20,
        gap:20
    }),
    selectedOption: (isLightMode) => ({
        backgroundColor: isLightMode ? colors.primary9 : colors.primary1,
    }),
    iconStyle: {
        marginRight: 10,
    },
    optionText: (isLightMode, selected) => ({
        fontSize: 20,
        fontFamily: "Tauri",
        color: isLightMode ? (selected ? 'white' : 'black') : (selected ? 'black' : 'white'),
    }),
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap:10
    },
    backButton: (isLightMode) => ({
        borderRadius: 8,
        backgroundColor: colors.secondary3,
        flex: 1,
        height:"100%",
    }),
    backButtonIcon: {
        justifyContent:'center',
        alignItems:"center",
        flex:1
    },
    continueButton: (isLightMode, selection) => ({
        padding: 10,
        borderRadius: 8,
        backgroundColor: selection ? (isLightMode ? colors.primary2 : colors.primary1) : grays.gray10 ,
        flex: 3,
    }),
    continueButtonText: (isLightMode, selection) => ({
        color: isLightMode ? "white" : selection ? "black" : "white",
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Tauri"
    }),
});
