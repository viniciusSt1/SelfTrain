import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { grays } from '../styles/globalStyles';

export default function TabelaAnalise() {
    const isLightMode = useColorScheme() === 'light'

    return (
        <View style={styles.table(isLightMode)}>
            <View style={styles.tableRowHeader}>
                <Text style={styles.tableCellHeader(isLightMode)}>Indicador</Text>
                <Text style={styles.tableCellHeader(isLightMode)}>Valor atual</Text>
                <Text style={styles.tableCellHeader(isLightMode)}>Valor ideal</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>Dado 1</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 2</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 3</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>Dado 4</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 5</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 6</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>Dado 7</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 8</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 9</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>Dado 10</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 11</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 12</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>Dado 13</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 14</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 15</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell(isLightMode)}>Dado 16</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 17</Text>
                <Text style={styles.tableCell(isLightMode)}>Dado 18</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    table: (isLightMode) => ({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: isLightMode ? grays.gray3 : grays.gray5,
        borderRadius:4
    }),
    tableRowHeader: {
        flexDirection: 'row',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCellHeader: (isLightMode) => ({
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: isLightMode ? grays.gray3 : grays.gray5,
        color: isLightMode ? 'black' : 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }),
    tableCell: (isLightMode) => ({
        flex: 1,
        padding: 10,
        textAlign: 'center',
        color: isLightMode ? 'black' : 'white'
    }),
});
