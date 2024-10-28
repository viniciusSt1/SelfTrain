import React, { useState, useContext } from 'react';
import { Pressable, Text, TextInput, useColorScheme, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles, { colors, grays } from '../styles/globalStyles';
import HeaderBack from '../components/HeaderBack';
import UserContext from '../contexts/UserContext';

export default function EditarMedidas({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const { user, updateUserMeasurements } = useContext(UserContext);
    //console.log(user.medidas)

    const [altura, setAltura] = useState(user.medidas.altura || '');
    const [peso, setPeso] = useState(user.medidas.peso || '');
    const [ombros, setOmbros] = useState(user.medidas.ombros || '');
    const [peito, setPeito] = useState(user.medidas.peito || '');
    const [antebraco, setAntebraco] = useState(user.medidas.antebraco || '');
    const [braco, setBraco] = useState(user.medidas.braco || '');
    const [cintura, setCintura] = useState(user.medidas.cintura || '');
    const [quadril, setQuadril] = useState(user.medidas.quadril || '');
    const [perna, setPerna] = useState(user.medidas.perna || '');
    const [panturrilha, setPanturrilha] = useState(user.medidas.panturrilha || '');

    const renderInput = (value, setValue, placeholder) => {
        return (
            <View style={style.inputContainer}>
                <Text style={style.floatingLabel(value)}>
                    {placeholder}
                </Text>
                <TextInput
                    placeholder=""
                    placeholderTextColor={grays.gray5}
                    style={[styles.input(isLightMode), { paddingTop: value ? 24 : 16 }]}
                    value={value}
                    autoCapitalize="none"
                    onChangeText={setValue}
                    keyboardType='numeric'
                    onFocus={() => setValue(value)}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <HeaderBack titulo="Editar Medidas" navigation={navigation} />
                    <View style={style.inputsContainer}>
                        {renderInput(altura, setAltura, "Altura (cm)")}
                        {renderInput(peso, setPeso, "Peso (Kg)")}
                        {renderInput(ombros, setOmbros, "Ombros (cm)")}
                        {renderInput(peito, setPeito, "Peito (cm)")}
                        {renderInput(antebraco, setAntebraco, "Antebraço (cm)")}
                        {renderInput(braco, setBraco, "Braço (cm)")}
                        {renderInput(cintura, setCintura, "Cintura (cm)")}
                        {renderInput(quadril, setQuadril, "Quadril (cm)")}
                        {renderInput(perna, setPerna, "Perna (cm)")}
                        {renderInput(panturrilha, setPanturrilha, "Panturrilha (cm)")}
                        <Pressable style={style.editButton(isLightMode)} onPress={() => updateUserMeasurements({ altura, peso, ombros, peito, antebraco, braco, cintura, quadril, perna, panturrilha }).then(() => navigation.goBack())}>
                            <Text style={style.editButtonText(isLightMode)}>Editar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    inputsContainer:{
        width:'100%',
        paddingHorizontal: 40,
        gap:20
    },
    floatingLabel: (value) => ({
        position: 'absolute',
        left: 0,
        color: grays.gray5,
        fontSize: value ? 12 : 16,
        backgroundColor: 'transparent',
        zIndex: 1,
        transition: 'all 0.3s',
        bottom: value ? 35 : 10 , 
        left: value ? 20 : 40
    }),
    inputContainer: {
        height:60,
        //backgroundColor:'red',
        position: 'relative',
        justifyContent:'flex-end'
    },
    editButton: (isLightMode) => ({
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: isLightMode ? colors.primary1 : colors.secondary1,
        paddingVertical:8,
        borderRadius: 20,
        elevation:5
    }),
    editButtonText: (isLightMode) => ({
        fontFamily: 'Tauri',
        color: isLightMode ? 'black' : 'white',
        fontSize:18,
    })
});
