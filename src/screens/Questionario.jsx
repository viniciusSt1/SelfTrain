import React, { useState, useEffect, useContext } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator, useColorScheme, Alert } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../styles/globalStyles";
import { colors, grays } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../contexts/UserContext";
import { binding } from "../IE/binding";
import { traceValues } from "../IE/ie";

export default function Questionario({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());
    const { updateUserTraining } = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }

        return idade;
    }

    function IA() {
        setLoading(true)

        const idade = calcularIdade(new Date(answers[0]));

        const disponibilidade = answers[1].map(dia => diasDaSemana.indexOf(dia)).sort();

        const objetivoMap = {
            'Emagrecimento': 'emagrecimento',
            'Hipertrofia': 'hipertrofia',
            'Prática esportiva': 'esporte'
        }
        const objetivo = objetivoMap[answers[2][0]]

        const nivelMap = {
            "Pouco experiente": 1,
            "Intermediário": 2,
            "Muito experiente": 3
        };

        const nivel = nivelMap[answers[3][0]];

        binding["Usuario.idade"] = idade
        binding["Usuario.objetivo"] = objetivo
        binding["Usuario.nivel"] = nivel
        binding["Usuario.disponibilidade"] = disponibilidade

        traceValues('Usuario');
        var treinos = binding["Usuario.planoTreino.treinos"];
        console.log(treinos)

        updateUserTraining(treinos).then(() => {
            navigation.goBack()
            setLoading(false)
        });
    }

    const questions = [
        {
            title: "Qual é a sua data de nascimento?",
            isDateQuestion: true,
        },
        {
            title: "Quais dias da semana você está disponível?",
            options: [
                { text: "Segunda" },
                { text: "Terça" },
                { text: "Quarta" },
                { text: "Quinta" },
                { text: "Sexta" },
                { text: "Sábado" },
                { text: "Domingo" }
            ],
            multiple: true,
        },
        {
            title: "Qual é o seu principal objetivo com musculação?",
            options: [
                { text: "Emagrecimento" },
                { text: "Hipertrofia" },
                { text: "Prática esportiva" }
            ],
            multiple: false,
        },
        {
            title: "Qual a sua experiência com musculação?",
            options: [
                { text: "Pouco experiente" },
                { text: "Intermediário" },
                { text: "Muito experiente" }
            ],
            multiple: false,
        },
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
                updatedAnswers[currentQuestionIndex].splice(optionIndex, 1);
            } else {
                updatedAnswers[currentQuestionIndex].push(option.text);
            }
        } else {
            updatedAnswers[currentQuestionIndex] = [option.text];
        }
        setAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        if (questions[currentQuestionIndex].isDateQuestion) {
            const updatedAnswers = [...answers];
            updatedAnswers[currentQuestionIndex] = birthDate.toISOString(); // Salvando a data no formato ISO
            setAnswers(updatedAnswers);
        }

        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            if (answers.every(answer => answer.length !== 0) && answers.length === questions.length) 
                IA(); // Chama a função somente se todas as respostas estiverem preenchidas
            else
                Alert.alert("Respostas incompletas", "Preencha todas as respostas para gerar seu planejamento")
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);
    };

    return (
        <SafeAreaView style={[styles.screen, styles.background(isLightMode)]}>
            <View style={style.progressBarContainer(isLightMode)}>
                <View style={style.progressBar(isLightMode, `${progress * 100}%`)} />
            </View>
            <Text style={style.questionTitle(isLightMode)}>
                {questions[currentQuestionIndex].title}
            </Text>

            {questions[currentQuestionIndex].isDateQuestion ? (
                <View style={style.dateContainer}>
                    <Pressable onPress={() => setShowDatePicker(true)} style={style.dateInput(isLightMode)}>
                        <Text style={style.dateBirthdayText(isLightMode)}>
                            {birthDate.toLocaleDateString()}
                        </Text>
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            value={birthDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>
            ) : (
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
                            <Text style={style.optionText(isLightMode, answers[currentQuestionIndex] && answers[currentQuestionIndex].includes(option.text))}>
                                {option.text}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            )}

            <View style={style.buttonContainer}>
                <Pressable
                    style={style.backButton(isLightMode)}
                    onPress={() => currentQuestionIndex === 0 ? navigation.goBack() : setCurrentQuestionIndex(currentQuestionIndex - 1)}
                >
                    <View style={style.backButtonIcon}>
                        <MaterialIcons size={45} color="white" name="keyboard-backspace" />
                    </View>
                </Pressable>
                <Pressable
                    style={style.continueButton(isLightMode, true)}
                    onPress={handleNextQuestion}
                >
                    <Text style={style.continueButtonText(isLightMode, true)}>{loading ? 
                        <ActivityIndicator
                            size={32}
                            color={isLightMode ? 'white' : grays.gray6}
                            style={styles.loadingIndicator}
                        /> : currentQuestionIndex === questions.length - 1 ? 'Gerar planejamento' : 'Continuar' }</Text>
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
        overflow: 'hidden',
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
    dateBirthdayText: (isLightMode) => ({
        color: isLightMode ? 'black' : 'white',
        fontSize: 20,
        fontFamily: "Tauri",
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
    }),
    selectedOption: (isLightMode) => ({
        backgroundColor: isLightMode ? colors.primary9 : colors.primary1,
    }),
    optionText: (isLightMode, selected) => ({
        fontSize: 20,
        fontFamily: "Tauri",
        color: isLightMode ? (selected ? 'white' : 'black') : (selected ? 'black' : 'white'),
    }),
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    backButton: (isLightMode) => ({
        borderRadius: 8,
        backgroundColor: colors.secondary3,
        flex: 1,
        height: "100%",
    }),
    backButtonIcon: {
        justifyContent: 'center',
        alignItems: "center",
        flex: 1,
    },
    continueButton: (isLightMode, selection) => ({
        padding: 15,
        borderRadius: 10,
        backgroundColor: selection ? (isLightMode ? colors.primary3 : colors.primary1) : colors.disabled,
        justifyContent: "center",
        alignItems: "center",
        flex: 5,
        marginLeft: 10,
    }),
    continueButtonText: (isLightMode, selection) => ({
        fontSize: 20,
        fontFamily: "Outfit",
        color: selection ? (isLightMode ? colors.textPrimaryLight : colors.textPrimaryDark) : colors.disabledText,
    }),
    dateContainer: {
        justifyContent: 'center',
        //alignItems: 'center',
        flex: 1,
    },
    dateInput: (isLightMode) => ({
        backgroundColor: isLightMode ? 'white' : grays.gray7,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    })
});
