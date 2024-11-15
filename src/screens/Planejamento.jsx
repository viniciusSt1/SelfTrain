import { Button, ScrollView, Text, useColorScheme, View, StyleSheet, Pressable } from "react-native";
import styles, { colors, grays } from "../styles/globalStyles";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import BoxTreinosDay from '../components/BoxTreinosDay';
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { getNomeDoDia } from "../utils/function_datas";

LocaleConfig.locales['br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar,', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: "Hoje"
};

LocaleConfig.defaultLocale = 'br';

export default function Planejamento({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const { user } = useContext(UserContext);

    const [n, setN] = useState(10);

    const convertTimes = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
    };

    // Marca as datas de treino do usuário
    const getMarkedDates = () => {
        const markedDates = {};

        user.treinos.forEach(treino => {
            const treinoDate = convertTimes(treino.data); // Converte o Timestamp para o formato YYYY-MM-DD
            markedDates[treinoDate] = { marked: true };
        });

        return markedDates;
    };

    // Função para encontrar o treino pela data
    const findTreinoByDate = (selectedDate) => {
        return user.treinos.find(treino => convertTimes(treino.data) === selectedDate);
    };

    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Planejamento</Text>
                    <Calendar
                        style={style.calendario(isLightMode)}
                        theme={{
                            calendarBackground: 'transparent',
                            monthTextColor: 'white',
                            arrowColor: 'white',
                            textSectionTitleColor: 'white',
                            todayTextColor: 'black',
                            todayBackgroundColor: colors.primary1,
                            dayTextColor: grays.gray2,
                            textDisabledColor: grays.gray5,
                            dotColor: colors.secondary1,
                        }}
                        markedDates={getMarkedDates()}
                        onDayPress={day => {
                            const treino = findTreinoByDate(day.dateString); // Encontra o treino pela data
                            if (treino) {
                                navigation.navigate("Treino", {
                                    titulo: treino.data.toLocaleDateString('pt-BR'),
                                    treino: treino
                                });
                            } else {
                                console.log('Nenhum treino marcado para essa data.');
                            }
                        }}
                    />

                    {user.treinos.length === 0 ?
                        <Pressable style={style.gerarTreinoBox} onPress={() => navigation.getParent().navigate('QuestionarioTab')}>
                            <Text style={style.gerarTreinoText}>Gerar treino agora</Text>
                        </Pressable> :
                        <>
                            <Text style={style.subheader(isLightMode)}>Próximos treinos</Text>

                            {user.treinos
                                .map((treino, originalIndex) => {
                                    const dataTreino = treino.data; // Mantém como objeto Date
                                    return { ...treino, originalIndex, dataTreino }; // Inclui o índice original e a data Date
                                })
                                .filter(treino => {
                                    const hoje = new Date()
                                    const amanha = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1, 0, 0, 0, 0);
                                    return treino.dataTreino.getTime() >= amanha.getTime();
                                })
                                .slice(0, n)
                                .map((treino, index) => {
                                    const diaSemana = getNomeDoDia(treino.dataTreino); // Obtém o nome do dia da semana dinamicamente

                                    return (
                                        <BoxTreinosDay
                                            key={treino.originalIndex} // Usa o índice original como chave única
                                            navigation={navigation}
                                            agrupamentos={treino.agrupMusc}
                                            numero={treino.originalIndex + 1} // Exibe o índice original + 1
                                            data={treino.dataTreino.toLocaleDateString('pt-BR')} // Formato dd/mm/yyyy
                                            dia={diaSemana} // Nome do dia da semana
                                            isLightMode={isLightMode}
                                            onPress={() => navigation.navigate("Treino", {
                                                titulo: treino.dataTreino.toLocaleDateString('pt-BR'),
                                                treino: {
                                                    ...treino,
                                                    dataTreino: treino.dataTreino.toISOString() // Converte dataTreino para string ISO
                                                }
                                            })}
                                        />
                                    );
                                })}
                            <Pressable onPress={() => setN(n + 10)}>
                                <Text style={style.vermais(isLightMode)}>Ver mais</Text>
                            </Pressable>
                        </>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    calendario: (isLightMode) => ({
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.8)'
    }),
    subheader: (isLightMode) => ({
        fontSize: 22,
        color: isLightMode ? 'black' : 'white',
        fontFamily: 'Outfit'
    }),
    vermais: (isLightMode) => ({
        textAlign: 'center',
        color: isLightMode ? 'black' : 'white',
        fontSize: 16,
        fontFamily: 'Inter'
    }),
    gerarTreinoBox: {
        backgroundColor: colors.secondary1,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        elevation: 8
    },
    gerarTreinoText: {
        color: "white",
        fontFamily: "Tauri",
        fontSize: 16
    }
});
