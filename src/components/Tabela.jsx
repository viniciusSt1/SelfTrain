import React, { useContext } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { grays } from '../styles/globalStyles';
import UserContext from '../contexts/UserContext';

export default function TabelaAnalise() {
    const isLightMode = useColorScheme() === 'light';
    const { user } = useContext(UserContext);

    const alturaM = (user.altura || 0) / 100; // altura em metros
    const imc = user.peso ? (user.peso / (alturaM * alturaM)).toFixed(2) : 'N/A';
    const tmb = user.idade ? (
        user.sexo === 'Masculino'
            ? (88.362 + (13.397 * (user.peso || 0)) + (4.799 * (user.altura || 0)) - (5.677 * (user.idade || 0))).toFixed(2)
            : (447.593 + (9.247 * (user.peso || 0)) + (3.098 * (user.altura || 0)) - (4.330 * (user.idade || 0))).toFixed(2)
    ) : 'N/A';
    const asc = user.peso && user.altura ? (0.20247 * Math.pow(user.altura || 0, 0.725) * Math.pow(user.peso || 0, 0.425)).toFixed(2) : 'N/A';
    const percentualGordura = user.peso && user.altura && user.idade ? (
        user.sexo === 'Masculino'
            ? (0.407 * (user.peso || 0) + 0.267 * (user.altura || 0) - 19.2).toFixed(2)
            : (0.252 * (user.peso || 0) + 0.473 * (user.altura || 0) - 48.3).toFixed(2)
    ) : 'N/A';
    const icE = user.cintura && user.altura ? (user.cintura / user.altura).toFixed(2) : 'N/A';
    const icQ = user.cintura && user.quadril ? (user.cintura / user.quadril).toFixed(2) : 'N/A';

    const valoresIdeais = {
        imc: user.sexo === 'Masculino' ? '18.5 - 24.9' : '18.5 - 24.9',
        tmb: user.sexo === 'Masculino' ? '1600 - 2000 kcal/dia' : '1400 - 1800 kcal/dia',
        asc: '1.6 - 2.0 m²', // Geralmente, não varia entre sexos
        percentualGordura: user.sexo === 'Masculino' ? '10% - 20%' : '20% - 30%',
        icE: user.sexo === 'Masculino' ? '< 0.5' : '< 0.5',
        icQ: user.sexo === 'Masculino' ? '< 0.9' : '< 0.8',
    };

    return (
        <View style={styles.table(isLightMode)}>
            <View style={styles.tableRowHeader}>
                <Text style={styles.tableCellHeader(isLightMode)}>Indicador</Text>
                <Text style={styles.tableCellHeader(isLightMode)}>Valor atual</Text>
                <Text style={styles.tableCellHeader(isLightMode)}>Valor ideal</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>IMC</Text>
                <Text style={styles.tableCell(isLightMode)}>{imc}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.imc}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>TMB</Text>
                <Text style={styles.tableCell(isLightMode)}>{tmb}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.tmb}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>ASC</Text>
                <Text style={styles.tableCell(isLightMode)}>{asc}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.asc}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>Percentual de gordura</Text>
                <Text style={styles.tableCell(isLightMode)}>{percentualGordura}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.percentualGordura}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>IC/E</Text>
                <Text style={styles.tableCell(isLightMode)}>{icE}</Text>
                <Text style={styles.tableCell(isLightMode)}>{valoresIdeais.icE}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>ICQ</Text>
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
        marginTop: 20,
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
