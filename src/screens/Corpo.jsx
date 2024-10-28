import React, { useState, useContext, useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../contexts/UserContext";
import styles, { colors, grays } from "../styles/globalStyles";
import medidas from "../utils/medidas";
import Tabela from "../components/Tabela";
import firestore from "@react-native-firebase/firestore";

export default function Corpo({ navigation }) {
    const isLightMode = useColorScheme() == 'light';
    const { user } = useContext(UserContext);
    const [selectedPeriod, setSelectedPeriod] = useState('30 dias');
    const [filteredMeasurements, setFilteredMeasurements] = useState([]);
    const [percentageChange, setPercentageChange] = useState({});

    const periods = ['30 dias', '90 dias', '1 ano', 'Sempre'];

    const alturaM = (user.medidas.altura || 0) / 100; // altura em metros
    const imc = user.medidas.peso && user.medidas.altura ? (user.medidas.peso / (alturaM * alturaM)).toFixed(2) : 'N/A';
    const tmb = user.medidas.peso && user.medidas.altura && user.idade ? (
        user.sexo === 'Masculino'
            ? (88.362 + (13.397 * (user.medidas.peso || 0)) + (4.799 * (user.medidas.altura)) - (5.677 * (user.idade))).toFixed(2)
            : (447.593 + (9.247 * (user.medidas.peso || 0)) + (3.098 * (user.medidas.altura)) - (4.330 * (user.idade))).toFixed(2)
    ) : 'N/A';
    const asc = user.medidas.peso && user.medidas.altura ? (Math.pow(user.medidas.peso * user.medidas.altura / 3600, 0.5)).toFixed(2) : 'N/A';
    const percentualGordura = user.medidas.peso && user.medidas.altura ? (
        user.sexo === 'Masculino'
            ? (0.407 * (user.medidas.peso || 0) + 0.267 * (user.medidas.altura || 0) - 19.2).toFixed(2)
            : (0.252 * (user.medidas.peso || 0) + 0.473 * (user.medidas.altura || 0) - 48.3).toFixed(2)
    ) : 'N/A';
    const icE = user.medidas.cintura && user.medidas.altura ? (user.medidas.cintura / user.medidas.altura).toFixed(2) : 'N/A';
    const icQ = user.medidas.cintura && user.medidas.quadril ? (user.medidas.cintura / user.medidas.quadril).toFixed(2) : 'N/A';

    const valoresIdeais = {
        imc: user.sexo === 'Masculino' ? '18.5 - 24.9' : '18.5 - 24.9',
        tmb: user.sexo === 'Masculino' ? '1600 - 2000 kcal/dia' : '1400 - 1800 kcal/dia',
        asc: '1.6 - 2.0 m²', // Geralmente, não varia entre sexos
        percentualGordura: user.sexo === 'Masculino' ? '10% - 20%' : '20% - 30%',
        icE: user.sexo === 'Masculino' ? '< 0.5' : '< 0.5',
        icQ: user.sexo === 'Masculino' ? '< 0.9' : '< 0.8',
    };

    const filterMeasurementsByPeriod = async () => {
        if (!user) return [];

        const now = new Date();
        const measurementDocs = await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('medidas')
            .orderBy('data', 'desc')
            .get();

        const measurements = measurementDocs.docs.map(doc => ({
            ...doc.data(),
            data: doc.data().data.toDate() // Converter o timestamp do Firebase
        }));

        const filtered = measurements.filter(measure => {
            const measureDate = measure.data;
            const diffTime = now - measureDate;

            switch (selectedPeriod) {
                case '30 dias':
                    return diffTime <= 30 * 24 * 60 * 60 * 1000;
                case '90 dias':
                    return diffTime <= 90 * 24 * 60 * 60 * 1000;
                case '1 ano':
                    return diffTime <= 365 * 24 * 60 * 60 * 1000;
                case 'Sempre':
                    return true;
                default:
                    return true;
            }
        });

        //console.log(filtered)
        return filtered;
    };

    // Função para calcular a porcentagem de variação
    const calculatePercentageChange = () => {
        let porcentagens = {};
        let primeirasMedidas = {}
        let ultimasMedidas = {}

        if (filteredMeasurements.length === 0) {
            medidas.forEach(medida => {
                porcentagens[medida] = null
            })
        } else if (filteredMeasurements.length === 1) {
            medidas.forEach(medida => {
                porcentagens[medida] = 0.0
            })
        } else {
            medidas.forEach(medida => {
                ultimasMedidas[medida] = null
                let nomeMedida = medida === 'Braço' ? 'braco' : medida === 'Antebraço' ? 'antebraco' : medida.toLowerCase()

                for (let i = 0; i < filteredMeasurements.length; i++) {
                    if (filteredMeasurements[i][nomeMedida] !== null) {
                        ultimasMedidas[medida] = filteredMeasurements[i][nomeMedida];
                        break;
                    }
                }
            });

            medidas.forEach(medida => {
                primeirasMedidas[medida] = null
                let nomeMedida = medida === 'Braço' ? 'braco' : medida === 'Antebraço' ? 'antebraco' : medida.toLowerCase()

                for (let i = filteredMeasurements.length - 1; i >= 0; i--) {
                    if (filteredMeasurements[i][nomeMedida] !== null) {
                        primeirasMedidas[medida] = filteredMeasurements[i][nomeMedida];
                        break;
                    }
                }
            });

            medidas.forEach(medida => {
                if (primeirasMedidas[medida] === null || ultimasMedidas[medida] === null)
                    porcentagens[medida] = 'N/A'
                else
                    porcentagens[medida] = (((ultimasMedidas[medida] - primeirasMedidas[medida]) / primeirasMedidas[medida])*100).toFixed(2)
            })

        }

        return porcentagens;
    };

    useEffect(() => {
        const fetchMeasurements = async () => {
            const measurements = await filterMeasurementsByPeriod();
            setFilteredMeasurements(measurements);
        };
        fetchMeasurements();
    }, [selectedPeriod, user]);
    
    useEffect(() => {
        const percentage = calculatePercentageChange();
        setPercentageChange(percentage);
    }, [filteredMeasurements]);    

    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <Text style={styles.header(isLightMode)}>Corpo</Text>

                    <View style={style.timePeriodContainer}>
                        {periods.map((period, index) => (
                            <Pressable
                                key={index}
                                style={[
                                    style.timePeriodButton(isLightMode, selectedPeriod === period),
                                ]}
                                onPress={() => setSelectedPeriod(period)}
                            >
                                <Text style={style.timePeriodText(isLightMode, selectedPeriod === period)}>{period}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <Text style={style.measuresHeader(isLightMode)}>Medidas</Text>

                    <View style={style.measuresContainer}>
                        {medidas.map((measure, index) => (
                            <View key={index} style={style.measureItem(isLightMode)}>
                                <Text style={style.measureLabel(isLightMode)}>{measure}</Text>
                                <Text style={style.measureValue(isLightMode)}>
                                    {measure === 'Braço' ? user.medidas.braco : measure === 'Antebraço' ? user.medidas.antebraco : user.medidas[measure.toLowerCase()] || '?'}
                                    {measure === 'Peso' ? ' Kg' : ' cm'}
                                </Text>
                                <Text style={style.measurePerc(isLightMode, percentageChange[measure])}>
                                    {percentageChange[measure] !== 'N/A' && percentageChange[measure] > 0 ? '+' : ''}
                                    {percentageChange[measure]}
                                    {percentageChange[measure] !== 'N/A' ? '%' : ''}
                                </Text>
                            </View>
                        ))}
                        <Text style={style.lastEdit}>Última edição {user.medidas.data.toLocaleDateString('pt-BR')}</Text>
                    </View>

                    <Text style={style.measuresHeader(isLightMode)}>Análise</Text>

                    <Tabela imc={imc} tmb={tmb} asc={asc} percentualGordura={percentualGordura} icE={icE} icQ={icQ} valoresIdeais={valoresIdeais} />

                    <Text style={style.measuresHeader(isLightMode)}>Alertas</Text>

                    {imc !== 'N/A' && (imc < 18.5 || imc > 24.9) && (
                        <Text style={style.alerta(isLightMode)}>
                            IMC: Seu IMC está fora do ideal ({valoresIdeais.imc}).
                        </Text>
                    )}

                    {tmb !== 'N/A' &&
                        (tmb < parseInt(valoresIdeais.tmb.split(' - ')[0]) || tmb > parseInt(valoresIdeais.tmb.split(' - ')[1])) && (
                            <Text style={style.alerta(isLightMode)}>
                                TMB: Seu metabolismo basal está fora do ideal ({valoresIdeais.tmb}).
                            </Text>
                        )}

                    {asc !== 'N/A' && (asc < 1.6 || asc > 2.0) && (
                        <Text style={style.alerta(isLightMode)}>
                            ASC: Área de superfície corporal fora do ideal ({valoresIdeais.asc}).
                        </Text>
                    )}

                    {percentualGordura !== 'N/A' &&
                        (percentualGordura < parseFloat(valoresIdeais.percentualGordura.split('% - ')[0]) ||
                            percentualGordura > parseFloat(valoresIdeais.percentualGordura.split('% - ')[1])) && (
                            <Text style={style.alerta(isLightMode)}>
                                Percentual de Gordura: Fora do ideal ({valoresIdeais.percentualGordura}).
                            </Text>
                        )}

                    {icE !== 'N/A' && icE > parseFloat(valoresIdeais.icE) && (
                        <Text style={style.alerta(isLightMode)}>
                            Índice Cintura-Estatura (IC-E): Está acima do ideal ({valoresIdeais.icE}).
                        </Text>
                    )}

                    {icQ !== 'N/A' && icQ > parseFloat(valoresIdeais.icQ) && (
                        <Text style={style.alerta(isLightMode)}>
                            Índice Cintura-Quadril (IC-Q): Está acima do ideal ({valoresIdeais.icQ}).
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    timePeriodContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timePeriodButton: (isLightMode, selected) => ({
        backgroundColor: selected ? isLightMode ? colors.primary2 : colors.primary1 : 'transparent',  // Cor do botão selecionado
        borderStyle: 'solid',
        borderWidth: 2,
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderColor: selected ? 'transparent' : isLightMode ? 'black' : 'white'
    }),
    timePeriodText: (isLightMode, selected) => ({
        fontSize: 16,
        fontFamily: "Outfit", // Ajuste conforme a sua fonte
        color: isLightMode ? selected ? 'white' : 'black' : selected ? 'black' : 'white'
    }),
    measuresHeader: (isLightMode) => ({
        fontSize: 22,
        fontFamily: "Outfit", // Ajuste conforme a sua fonte
        color: isLightMode ? 'black' : 'white',
        textAlign: "center"
    }),
    measuresContainer: {
        borderRadius: 10,
        gap: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    measureItem: (isLightMode) => ({
        paddingVertical: 10,
        //paddingHorizontal:20,
        //flexGrow:1,
        backgroundColor: isLightMode ? 'white' : grays.gray7,
        borderRadius: 10,
        width: 110,
        alignItems: 'center'
    }),
    measureLabel: (isLightMode) => ({
        fontSize: 14,
        fontFamily: "Outfit",
        color: isLightMode ? colors.secondary1 : colors.primary1
    }),
    measureValue: (isLightMode) => ({
        fontSize: 22,
        fontFamily: "Outfit",
        color: isLightMode ? 'black' : 'white',
    }),
    measurePerc: (isLightMode, valor) => ({
        fontSize: 12,
        fontFamily: "Outfit",
        color: isLightMode ? 
            valor > 0 ? colors.primary2 : valor < 0 ? colors.secondary3 : grays.gray5
            : valor > 0 ? colors.tertiary1 : valor < 0 ? colors.secondary3 : grays.gray4,
    }),
    lastEdit: {
        fontSize: 14,
        fontFamily: "Rubik", // Ajuste conforme a sua fonte
        color: "#999", // Ajuste conforme a sua paleta de cores
        textAlign: "center",
        width: "100%"
    },
    alerta: (isLightMode) => ({
        color: isLightMode ? colors.secondary1 : 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255,0,0,0.2)',
        fontFamily: 'Outfit',
        fontSize: 18,
        borderRadius: 10
    })
});
