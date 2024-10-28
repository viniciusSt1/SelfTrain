import React, { useContext } from 'react';
import { View, Text, StyleSheet, useColorScheme, Alert } from 'react-native';
import { grays } from '../styles/globalStyles';
import UserContext from '../contexts/UserContext';

export default function TabelaAnalise({ imc, tmb, asc, percentualGordura, icE, icQ, valoresIdeais }) {
    const isLightMode = useColorScheme() === 'light';

    const handleAlertInfo = (indicator) => {
        let message = '';
        switch (indicator) {
            case 'IMC':
                message = 'O Índice de Massa Corporal (IMC) avalia se o peso está adequado em relação à altura.';
                break;
            case 'TMB':
                message = 'A Taxa Metabólica Basal (TMB) é a quantidade mínima de energia (calorias) que o corpo precisa para funcionar em repouso.';
                break;
            case 'ASC':
                message = 'A Área de Superfície Corporal (ASC) mede a área da pele, usada para dosagens de medicamentos e outras avaliações de saúde.';
                break;
            case 'Percentual de Gordura':
                message = 'O percentual de gordura é a proporção de gordura corporal em relação ao peso total.';
                break;
            case 'IC/E':
                message = 'O Índice Cintura-Estatura (IC/E) avalia a distribuição da gordura corporal em relação à altura.';
                break;
            case 'ICQ':
                message = 'O Índice Cintura-Quadril (ICQ) avalia a distribuição da gordura corporal entre a cintura e o quadril.';
                break;
            default:
                message = 'Indicador desconhecido.';
        }
        Alert.alert(indicator, message);
    };

    return (
        <View style={styles.table(isLightMode)}>
            <View style={styles.tableRowHeader}>
                <Text style={styles.tableCellHeader(isLightMode)}>Indicador</Text>
                <Text style={styles.tableCellHeader(isLightMode)}>Valor atual</Text>
                <Text style={styles.tableCellHeader(isLightMode)}>Valor ideal</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)} onPress={() => handleAlertInfo('IMC')}>IMC</Text>
                <Text style={styles.tableCell(isLightMode)}>{imc}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.imc}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)} onPress={() => handleAlertInfo('TMB')}>TMB</Text>
                <Text style={styles.tableCell(isLightMode)}>{tmb}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.tmb}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)} onPress={() => handleAlertInfo('ASC')}>ASC</Text>
                <Text style={styles.tableCell(isLightMode)}>{asc}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.asc}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)} onPress={() => handleAlertInfo('Percentual de Gordura')}>Percentual de gordura</Text>
                <Text style={styles.tableCell(isLightMode)}>{percentualGordura}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.percentualGordura}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)} onPress={() => handleAlertInfo('IC/E')}>IC/E</Text>
                <Text style={styles.tableCell(isLightMode)}>{icE}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.icE}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)} onPress={() => handleAlertInfo('ICQ')}>ICQ</Text>
                <Text style={styles.tableCell(isLightMode)}>{icQ}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.icQ}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    table: (isLightMode) => ({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: isLightMode ? grays.gray3 : grays.gray5,
        borderRadius: 4,
    }),
    tableRowHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableCellHeader: (isLightMode) => ({
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: isLightMode ? grays.gray3 : grays.gray5,
        color: isLightMode ? 'black' : 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }),
    tableCell: (isLightMode) => ({
        flex: 1,
        padding: 10,
        textAlign: 'center',
        color: isLightMode ? 'black' : 'white',
    }),
});
