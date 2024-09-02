import React, { useState } from 'react';
import { Pressable, Text, TextInput, useColorScheme, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles, { colors, grays } from '../styles/globalStyles';
import HeaderBack from '../components/HeaderBack';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';

export default function EditarMedidas({ navigation }) {
    const isLightMode = useColorScheme() === 'light';
    const { user, updateUser } = useContext(UserContext);

    const [altura, setAltura] = useState(user.altura || '');
    const [peso, setPeso] = useState(user.peso || '');
    const [ombros, setOmbros] = useState(user.ombros || '');
    const [peito, setPeito] = useState(user.peito || '');
    const [antebraco, setAntebraco] = useState(user.antebraco || '');
    const [braco, setBraco] = useState(user.braco || '');
    const [cintura, setCintura] = useState(user.cintura || '');
    const [quadril, setQuadril] = useState(user.quadril || '');
    const [perna, setPerna] = useState(user.perna || '');
    const [panturrilha, setPanturrilha] = useState(user.panturrilha || '');

    return (
        <SafeAreaView style={styles.background(isLightMode)}>
            <ScrollView>
                <View style={styles.screen}>
                    <HeaderBack titulo="Editar Medidas" navigation={navigation} />
                    <View style={style.inputsContainer}>
                        <TextInput
                            placeholder="Altura"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={altura.toString()}
                            autoCapitalize="none"
                            onChangeText={setAltura}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Peso"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={peso.toString()}
                            autoCapitalize="none"
                            onChangeText={setPeso}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Ombros"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={ombros.toString()}
                            autoCapitalize="none"
                            onChangeText={setOmbros}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Peito"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={peito.toString()}
                            autoCapitalize="none"
                            onChangeText={setPeito}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Antebraço"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={antebraco.toString()}
                            autoCapitalize="none"
                            onChangeText={setAntebraco}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Braço"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={braco.toString()}
                            autoCapitalize="none"
                            onChangeText={setBraco}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Cintura"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={cintura.toString()}
                            autoCapitalize="none"
                            onChangeText={setCintura}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Quadril"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={quadril.toString()}
                            autoCapitalize="none"
                            onChangeText={setQuadril}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Perna"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={perna.toString()}
                            autoCapitalize="none"
                            onChangeText={setPerna}
                            keyboardType='numeric'
                        />
                        <TextInput
                            placeholder="Panturrilha"
                            placeholderTextColor={grays.gray5}
                            style={styles.input(isLightMode)}
                            value={panturrilha.toString()}
                            autoCapitalize="none"
                            onChangeText={setPanturrilha}
                            keyboardType='numeric'
                        />
                        <Pressable style={style.editButton(isLightMode)} onPress={() => updateUser({ altura, peso, ombros, peito, antebraco, braco, cintura, quadril, perna, panturrilha }).then(() => navigation.goBack())}>
                            <Text style={style.editButtonText(isLightMode)}>Editar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    imgContainer:{
        alignItems:'center',
        position:'relative',
        height:100,
        width:100
    },
    imgProfile:{
        height:100,
        width:100,
    },
    pencil:{
        position:'absolute',
        right:5,
        bottom:2
    },
    inputsContainer:{
        width:'100%',
        paddingHorizontal: 40,
        gap:20
    },
    sexoInput:(isLightMode,sexo) => ({
        color: sexo == '' ? grays.gray5 : isLightMode ? 'black' : 'white' 
    }),
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
